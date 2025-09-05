// @ts-nocheck
import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { SurveyResponse, SurveyStep, TradingPersona } from '../types/survey';
import { calculateTradingPersona } from '../utils/personaCalculator';
import { useQuizSession } from '../hooks/useQuizSession';
import { useTranslation, Language } from '../utils/translations';
import { initFacebookPixel, FacebookEvents } from '../utils/facebookPixel';

interface SurveyProviderProps {
  children: any;
  initialLanguage?: Language;
}

interface SurveyContextType {
  currentStep: SurveyStep;
  stepNumber: number;
  totalSteps: number;
  responses: Partial<SurveyResponse>;
  persona: TradingPersona | null;
  error: Error | null;
  isConnected: boolean;
  language: Language;
  t: ReturnType<typeof useTranslation>;
  setStep: (step: SurveyStep) => void;
  updateResponses: (updates: Partial<SurveyResponse>) => void;
  restart: () => void;
  calculatePersona: () => void;
  setLanguage: (language: Language) => void;
  forceSendData?: () => Promise<void>; // Add for debugging
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider = ({ children, initialLanguage = 'en' }: SurveyProviderProps) => {
  const steps: SurveyStep[] = ['welcome', 'age', 'main-goal', 'income-source', 'financial-situation', 'monthly-income', 'job-challenges', 'life-satisfaction', 'money-barrier', 'extra-money-use', 'financial-confidence', 'wealthy-retirement', 'saving-money', 'money-earning', 'wealth-growth', 'trading-knowledge', 'passive-income', 'market-interests', 'investment-readiness', 'special-achievement', 'time-commitment', 'results'];
  const [currentStep, setCurrentStep] = useState<SurveyStep>('welcome');
  const [responses, setResponses] = useState<Partial<SurveyResponse>>({});
  const [persona, setPersona] = useState<TradingPersona | null>(null);
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  
  const { 
    updateSession, 
    error, 
    isConnected, 
    trackTrustElement, 
    trackFormCompletion, 
    trackResultsView, 
    trackFacebookEvent: trackFBEvent,
    forceSendData
  } = useQuizSession();
  const t = useTranslation(language);
  
  const stepNumber = steps.indexOf(currentStep) + 1;
  const totalSteps = steps.length;

  // Define updateResponses BEFORE any usage (effects/deps) to avoid TDZ errors
  const updateResponses = useCallback(async (updates: Partial<SurveyResponse>) => {
    try {
      const newResponses = { ...responses, ...updates };
      setResponses(newResponses);
      
      
      // Track specific events based on updates
      if (updates.marketInterests) {
        trackFBEvent(FacebookEvents.MARKET_INTEREST_SELECTED, { 
          markets: updates.marketInterests 
        });
      }
      
      // Track form completion if email is provided
      if (updates.email) {
        trackFormCompletion(updates.email);
        trackFBEvent(FacebookEvents.LEAD_FORM_COMPLETED, { 
          email: updates.email 
        });
      }
      
      // Update session with new responses and email tracking
      await updateSession(currentStep, newResponses, {
        userEmail: updates.email
      });
      
    } catch (err) {
      console.error('Error updating responses:', err);
      // Don't prevent the user from continuing even if session update fails
    }
  }, [responses, currentStep, updateSession, trackFormCompletion, trackFBEvent]);

  // Update language when initialLanguage prop changes
  useEffect(() => {
    setLanguageState(initialLanguage);
    updateResponses({ language: initialLanguage });
  }, [initialLanguage]); // Убрали updateResponses из зависимостей

  // Initialize Facebook Pixel on component mount
  useEffect(() => {
    // Replace with your actual Facebook Pixel ID
    const FACEBOOK_PIXEL_ID = '1234567890123456';
    initFacebookPixel(FACEBOOK_PIXEL_ID);
    
    // Track initial page view
    trackFBEvent(FacebookEvents.QUIZ_STARTED);
  }, []);
  
  const setStep = useCallback((step: SurveyStep) => {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Track step completion
    trackFBEvent(FacebookEvents.QUIZ_STEP_COMPLETED, { step });
    
    // Track trust elements
    if (step.startsWith('trust-element')) {
      trackTrustElement(step);
      trackFBEvent(FacebookEvents.TRUST_ELEMENT_VIEWED, { trustElement: step });
    }
    
    // Track results view
    if (step === 'results') {
      trackResultsView();
      trackFBEvent(FacebookEvents.RESULTS_VIEWED);
    }
    
    // Track lead capture start
    if (step === 'lead-capture') {
      trackFBEvent(FacebookEvents.LEAD_FORM_STARTED);
    }
  }, [trackTrustElement, trackResultsView, trackFBEvent]);
  
  const setLanguage = useCallback((newLanguage: Language) => {
    setLanguageState(newLanguage);
    updateResponses({ language: newLanguage });
    
    // Track language selection
    trackFBEvent(FacebookEvents.LANGUAGE_SELECTED, { language: newLanguage });
  }, [trackFBEvent]); // Убрали updateResponses из зависимостей
  
  const calculatePersona = useCallback(() => {
    const requiredFields: (keyof SurveyResponse)[] = [
      'gender',
      'age',
      'mainGoal',
      'incomeSource',
      'financialSituation',
      'monthlyIncome',
      'jobChallenges',
      'lifeSatisfaction',
      'moneyBarrier',
      'extraMoneyUse',
      'financialConfidence',
      'wealthyRetirement',
      'savingMoney',
      'moneyEarningExperience',
      'wealthGrowthInterest',
      'tradingKnowledge',
      'passiveIncomeKnowledge',
      'marketInterests',
      'investmentReadiness',
      'specialAchievement',
      'timeCommitment'
    ];

    const hasAllFields = requiredFields.every(field => {
      const value = responses[field];
      return value !== undefined && value !== null && value !== '';
    });
    
    if (hasAllFields) {
      const calculatedPersona = calculateTradingPersona(responses as SurveyResponse);
      setPersona(calculatedPersona);
      setStep('results');
    }
  }, [responses, setStep]);
  
  const restart = useCallback(() => {
    setCurrentStep('welcome');
    setResponses({});
    setPersona(null);
    setLanguageState(initialLanguage);
    
    // Track quiz restart
    trackFBEvent(FacebookEvents.QUIZ_STARTED);
  }, [trackFBEvent, initialLanguage]);
  
  return (
    <SurveyContext.Provider
      value={{
        currentStep,
        stepNumber,
        totalSteps,
        responses,
        persona,
        error,
        isConnected,
        language,
        t,
        setStep,
        updateResponses,
        restart,
        calculatePersona,
        setLanguage,
        forceSendData
      }}
    >
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = (): SurveyContextType => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};