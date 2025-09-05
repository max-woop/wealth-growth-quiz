import { useCallback, useEffect, useState } from 'react';
import { supabase, testSupabaseConnection, validateEnvironment } from '../lib/supabase';
import type { SurveyResponse } from '../types/survey';
declare global {
  interface Window {
    fxcLanding: any;
    llLanding: any;
    utag: any;
    utag_data: any;
    _vis_opt_queue: any[];
    _vis_opt_goal_conversion: (goalId: number) => void;
    fbq: any;
    gtag: any;
  }
}

// Generate a unique visitor ID that persists across sessions
const generateVisitorId = (): string => {
  // First, try to get actual visitor_id from various tracking sources
  if (typeof window !== 'undefined') {
    // Check Tealium utag_data first
    if (window.utag_data && window.utag_data.visitor_id) {
      const tealiumVisitorId = window.utag_data.visitor_id;
      localStorage.setItem('libertex_visitor_id', tealiumVisitorId);
      return tealiumVisitorId;
    }
    
    // Check if utag is available and has visitor data
    if (window.utag && window.utag.data && window.utag.data.visitor_id) {
      const utagVisitorId = window.utag.data.visitor_id;
      localStorage.setItem('libertex_visitor_id', utagVisitorId);
      return utagVisitorId;
    }
    
    // Check for Facebook Pixel visitor ID
    if (window.fbq && window.fbq.getState && window.fbq.getState().pixels) {
      try {
        const pixels = window.fbq.getState().pixels;
        const pixelKeys = Object.keys(pixels);
        if (pixelKeys.length > 0) {
          const pixelId = pixels[pixelKeys[0]].id;
          if (pixelId) {
            localStorage.setItem('libertex_visitor_id', pixelId);
            return pixelId;
          }
        }
      } catch (error) {
        console.warn('Error getting Facebook Pixel visitor ID:', error);
      }
    }
    
    // Check for Google Analytics client ID
    if (window.gtag) {
      try {
        window.gtag('get', 'GA_MEASUREMENT_ID', 'client_id', (clientId: string) => {
          if (clientId) {
            localStorage.setItem('libertex_visitor_id', clientId);
            return clientId;
          }
        });
      } catch (error) {
        console.warn('Error getting Google Analytics client ID:', error);
      }
    }
    
    // Check for any existing tracking cookies
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      // Look for common visitor ID cookie patterns
      if (name.includes('visitor') || name.includes('client') || name.includes('user_id') || name.includes('_ga')) {
        if (value && value.length > 10) {
          localStorage.setItem('libertex_visitor_id', value);
          return value;
        }
      }
    }
    
    // Check for session storage visitor ID
    const sessionVisitorId = sessionStorage.getItem('visitor_id') || sessionStorage.getItem('client_id');
    if (sessionVisitorId) {
      localStorage.setItem('libertex_visitor_id', sessionVisitorId);
      return sessionVisitorId;
    }
  }
  
  // Check if visitor ID already exists in localStorage
  const existingVisitorId = localStorage.getItem('libertex_visitor_id');
  if (existingVisitorId) {
    return existingVisitorId;
  }
  
  // Generate new visitor ID with format similar to the example (019884844703006301aa27cf230000122019611a00521)
  const timestamp = Date.now().toString(16);
  const random1 = Math.random().toString(16).substr(2, 8);
  const random2 = Math.random().toString(16).substr(2, 8);
  const random3 = Math.random().toString(16).substr(2, 8);
  const visitorId = `${timestamp}${random1}${random2}${random3}`.substr(0, 32);
  
  localStorage.setItem('libertex_visitor_id', visitorId);
  return visitorId;
};

interface TrackingData {
  trustElementsViewed?: string[];
  formCompleted?: boolean;
  resultsViewed?: boolean;
  facebookEvents?: Array<{
    event: string;
    timestamp: string;
    data?: any;
  }>;
  userAgent?: string;
  referrer?: string;
  utmParams?: Record<string, string>;
  userEmail?: string; // Add email tracking
  visitorId?: string; // Add visitor ID tracking
}

interface SessionState {
  sessionId: string | null;
  responses: Partial<SurveyResponse>;
  trackingData: TrackingData;
  lastTrustElementTime: number | null;
  shouldTrack: boolean;
  isQuizCompleted: boolean;
  timeoutId: ReturnType<typeof setTimeout> | null;
  lastRowId?: string | null;
}

export function useQuizSession() {
  const [sessionState, setSessionState] = useState<SessionState>({
    sessionId: null,
    responses: {},
    trackingData: {
      trustElementsViewed: [],
      formCompleted: false,
      resultsViewed: false,
      facebookEvents: [],
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      utmParams: {},
      userEmail: undefined
    },
    lastTrustElementTime: null,
    shouldTrack: false,
    isQuizCompleted: false,
    timeoutId: null
  });

  const [error, setError] = useState<Error | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionAttempts, setConnectionAttempts] = useState<number>(0);

  const getInitialTrackingData = (): TrackingData => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: Record<string, string> = {};
    
    // Extract UTM parameters
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
      const value = urlParams.get(param);
      if (value) {
        utmParams[param] = value;
      }
    });

    return {
      trustElementsViewed: [],
      formCompleted: false,
      resultsViewed: false,
      facebookEvents: [],
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      utmParams,
      userEmail: undefined
    };
  };

  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  const initializeSession = useCallback(() => {
    const sessionId = generateSessionId();
    
    // Get visitor ID first, then initialize tracking data
    const visitorId = generateVisitorId();
    const trackingData = {
      ...getInitialTrackingData(),
      visitorId
    };
    
    setSessionState(prev => ({
      ...prev,
      sessionId,
      trackingData,
      responses: {},
      lastTrustElementTime: null,
      shouldTrack: false,
      isQuizCompleted: false,
      timeoutId: null
    }));

    setError(null);
    setIsLoading(false);
  }, []);

  // Wait for Tealium/GA to provide a stable visitor_id and update state/DB once
  const waitForAccurateVisitorId = useCallback(async (): Promise<string | null> => {
    const tryGet = (): string | null => {
      try {
        if (typeof window !== 'undefined') {
          if (window.utag_data && window.utag_data.visitor_id) return window.utag_data.visitor_id as string;
          if (window.utag && window.utag.data && window.utag.data.visitor_id) return window.utag.data.visitor_id as string;
          // Common GA cookie fallback
          const gaCookie = document.cookie.split(';').map(c => c.trim()).find(c => c.startsWith('_ga='));
          if (gaCookie) {
            const val = gaCookie.split('=')[1];
            if (val && val.length > 10) return val;
          }
        }
      } catch {}
      return null;
    };

    const immediate = tryGet();
    if (immediate) return immediate;

    return await new Promise(resolve => {
      let attempts = 0;
      const maxAttempts = 50; // up to ~5s
      const interval = setInterval(() => {
        attempts++;
        const id = tryGet();
        if (id || attempts >= maxAttempts) {
          clearInterval(interval);
          resolve(id || null);
        }
      }, 100);
    });
  }, []);

  const updateVisitorIdInDb = useCallback(async (rowId: string, newVisitorId: string) => {
    try {
      if (!isConnected) return;
      await supabase
        .from('quiz_sessions')
        .update({ visitor_id: newVisitorId })
        .eq('id', rowId);
    } catch (e) {
      console.warn('Failed to update visitor_id in Supabase:', e);
    }
  }, [isConnected]);

  const sendDataToSupabase = useCallback(async (finalData: SessionState) => {
    if (!isConnected) {
      console.warn('Not connected to Supabase, skipping data send');
      return;
    }

    try {
      
      // Prepare user profile with email if available
      const userProfile = finalData.trackingData.userEmail ? {
        name: finalData.responses.name || 'Anonymous User',
        role: 'user',
        email: finalData.trackingData.userEmail
      } : (finalData.responses.name ? {
        name: finalData.responses.name,
        role: 'user'
      } : null);

      const { data, error } = await supabase
        .from('quiz_sessions')
        .insert([
          {
            current_step: finalData.isQuizCompleted ? 'results' : 'incomplete',
            responses: finalData.responses, // Save all user answers
            user_profile: userProfile,
            visitor_id: finalData.trackingData.visitorId,
            total_steps: 20,
            completed_steps: Object.keys(finalData.responses).length,
            progress_percentage: (Object.keys(finalData.responses).length / 20) * 100,
            trust_elements_viewed: finalData.trackingData.trustElementsViewed,
            form_completed: finalData.trackingData.formCompleted,
            results_viewed: finalData.trackingData.resultsViewed,
            facebook_events: finalData.trackingData.facebookEvents,
            user_agent: finalData.trackingData.userAgent,
            referrer: finalData.trackingData.referrer,
            utm_params: finalData.trackingData.utmParams,
            completed_at: finalData.isQuizCompleted ? new Date().toISOString() : null,
            metadata: {
              sessionId: finalData.sessionId,
              userEmail: finalData.trackingData.userEmail,
              totalResponses: Object.keys(finalData.responses).length,
              lastTrustElementTime: finalData.lastTrustElementTime,
              trackingReason: finalData.isQuizCompleted ? 'quiz_completed' : 'trust_element_timeout',
              visitorId: finalData.trackingData.visitorId
            }
          }
        ])
        .select()
        .single();

      if (error) {
        console.error('Supabase error details:', error);
        throw new Error(`Database error: ${error.message}`);
      }
      
      setError(null);
      // Store last inserted row id for potential visitor_id correction later
      if (data && data.id) {
        setSessionState(prev => ({ ...prev, lastRowId: data.id }));
      }
      return data?.id;
    } catch (err) {
      console.error('Error sending data to Supabase:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      const newError = new Error(`Failed to send data: ${errorMessage}`);
      setError(newError);
      throw newError;
    }
  }, [isConnected]);

  const checkAndSendData = useCallback(async (reason: string) => {
    const responsesCount = Object.keys(sessionState.responses).length;
    const hasSignificantData = responsesCount >= 3;
    const shouldSend = sessionState.shouldTrack || sessionState.isQuizCompleted || hasSignificantData || isConnected;

    if (shouldSend && isConnected) {
      try {
        await sendDataToSupabase(sessionState);
      } catch (error) {
        console.error(`Failed to send data (${reason}):`, error);
      }
    } else {
    }
  }, [sessionState, sendDataToSupabase]);

  // Force send data for debugging
  const forceSendData = useCallback(async () => {
    await sendDataToSupabase({ ...sessionState, shouldTrack: true });
  }, [sessionState, sendDataToSupabase]);

  const setupTrustElementTimeout = useCallback(() => {
    // Clear existing timeout
    if (sessionState.timeoutId) {
      clearTimeout(sessionState.timeoutId);
    }

    // Set new timeout for 5 minutes
    const timeoutId = setTimeout(() => {
      setSessionState(prev => ({ ...prev, shouldTrack: true }));
      checkAndSendData('trust element timeout');
    }, 5 * 60 * 1000); // 5 minutes

    setSessionState(prev => ({ ...prev, timeoutId }));
  }, [sessionState.timeoutId, checkAndSendData]);

  const testConnection = useCallback(async () => {
    setIsLoading(true);
    setConnectionAttempts(prev => prev + 1);
    
    try {
      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn(`Environment configuration issues: ${envValidation.issues.join(', ')}`);
        // Proceed in offline mode (do not throw here)
        setIsConnected(false);
        setError(null);
        return;
      }

      const connectionTest = await testSupabaseConnection(2);
      setIsConnected(connectionTest);
      
      if (!connectionTest) {
        console.warn('Unable to establish connection to Supabase - running in offline mode');
      } else {
      }
      
      setError(null);
    } catch (err) {
      console.error('Connection test failed:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(new Error(errorMessage));
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateSession = useCallback(async (
    step: string,
    responses: Partial<SurveyResponse>,
    trackingData?: Partial<TrackingData>
  ) => {
    
    setSessionState(prev => {
      const newState = {
        ...prev,
        responses: { ...prev.responses, ...responses },
        trackingData: {
          ...prev.trackingData,
          ...trackingData,
          // Ensure visitorId is always present
          visitorId: (trackingData && trackingData.visitorId) || prev.trackingData.visitorId || localStorage.getItem('libertex_visitor_id') || generateVisitorId()
        }
      };

      // Capture email when it's provided
      if (responses.email) {
        newState.trackingData.userEmail = responses.email;
      }

      // Check if quiz is completed (user reached results)
      if (step === 'results') {
        newState.isQuizCompleted = true;
        newState.shouldTrack = true;
      }

      // Always try to save data for users who have made significant progress
      const significantProgress = Object.keys(newState.responses).length >= 3;
      if (significantProgress && !newState.shouldTrack) {
        newState.shouldTrack = true;
        // Send data after a short delay to allow state to update
        setTimeout(() => checkAndSendData('significant progress'), 1000);
      }

      return newState;
    });
  }, []);

  const trackTrustElement = useCallback(async (trustElement: string) => {
    
    setSessionState(prev => {
      const currentElements = prev.trackingData.trustElementsViewed || [];
      if (currentElements.includes(trustElement)) {
        return prev; // Already tracked
      }

      const updatedElements = [...currentElements, trustElement];
      const newState = {
        ...prev,
        trackingData: {
          ...prev.trackingData,
          trustElementsViewed: updatedElements
        },
        lastTrustElementTime: Date.now()
      };

      // If this is the first trust element, start tracking
      if (updatedElements.length === 1) {
        newState.shouldTrack = true;
      }

      return newState;
    });

    // Setup timeout for 5 minutes after viewing trust element
    setupTrustElementTimeout();
  }, [setupTrustElementTimeout]);

  const trackFormCompletion = useCallback(async (email?: string) => {
    
    setSessionState(prev => ({
      ...prev,
      trackingData: {
        ...prev.trackingData,
        formCompleted: true,
        userEmail: email || prev.trackingData.userEmail
      }
    }));
  }, []);

  const trackResultsView = useCallback(async () => {
    
    setSessionState(prev => ({
      ...prev,
      trackingData: {
        ...prev.trackingData,
        resultsViewed: true
      },
      isQuizCompleted: true,
      shouldTrack: true
    }));

    // Send data immediately when results are viewed
    setTimeout(() => checkAndSendData('results viewed'), 100);
  }, [checkAndSendData]);

  const trackFacebookEvent = useCallback(async (eventName: string, eventData?: any) => {
    const newEvent = {
      event: eventName,
      timestamp: new Date().toISOString(),
      data: eventData
    };
    
    setSessionState(prev => ({
      ...prev,
      trackingData: {
        ...prev.trackingData,
        facebookEvents: [...(prev.trackingData.facebookEvents || []), newEvent]
      }
    }));
    
  }, []);

  const completeSession = useCallback(async (responses: Partial<SurveyResponse>) => {
    
    setSessionState(prev => ({
      ...prev,
      responses: { ...prev.responses, ...responses },
      isQuizCompleted: true,
      shouldTrack: true,
      trackingData: {
        ...prev.trackingData,
        userEmail: responses.email || prev.trackingData.userEmail
      }
    }));

    // Send data immediately when session is completed
    setTimeout(() => checkAndSendData('session completed'), 100);
  }, [checkAndSendData]);

  const retryConnection = useCallback(() => {
    setError(null);
    testConnection();
  }, [testConnection]);

  // Initialize session and test connection on mount
  useEffect(() => {
    initializeSession();
    testConnection();
  }, [initializeSession, testConnection]);

  // Attempt to refine visitor_id after initial mount when Tealium/GA are ready
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const accurateId = await waitForAccurateVisitorId();
      if (cancelled || !accurateId) return;
      const currentId = sessionState.trackingData.visitorId;
      if (accurateId && accurateId !== currentId) {
        localStorage.setItem('libertex_visitor_id', accurateId);
        setSessionState(prev => ({
          ...prev,
          trackingData: { ...prev.trackingData, visitorId: accurateId }
        }));
        if (sessionState.lastRowId) {
          updateVisitorIdInDb(sessionState.lastRowId, accurateId);
        }
      }
    })();
    return () => { cancelled = true; };
  }, [waitForAccurateVisitorId, updateVisitorIdInDb, sessionState.trackingData.visitorId, sessionState.lastRowId]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (sessionState.timeoutId) {
        clearTimeout(sessionState.timeoutId);
      }
    };
  }, [sessionState.timeoutId]);

  // Send data when page is about to unload (if tracking is enabled)
  useEffect(() => {
    const handleBeforeUnload = () => {
      const responsesCount = Object.keys(sessionState.responses).length;
      const hasSignificantData = responsesCount >= 3;
      const shouldSend = sessionState.shouldTrack || sessionState.isQuizCompleted || hasSignificantData;
      
      if (shouldSend && isConnected) {
        // Use sendBeacon for reliable data sending on page unload
        const data = JSON.stringify({
          sessionId: sessionState.sessionId,
          responses: sessionState.responses,
          trackingData: sessionState.trackingData,
          isQuizCompleted: sessionState.isQuizCompleted,
          unloadReason: 'page_unload'
        });
        
        navigator.sendBeacon('/api/quiz-session', data);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [sessionState, isConnected]);

  return {
    sessionId: sessionState.sessionId,
    error,
    isConnected,
    isLoading,
    connectionAttempts,
    updateSession,
    completeSession,
    retryConnection,
    trackTrustElement,
    trackFormCompletion,
    trackResultsView,
    trackFacebookEvent,
    forceSendData // Add for debugging
  };
}