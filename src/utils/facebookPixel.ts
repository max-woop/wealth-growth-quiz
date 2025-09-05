// Facebook Pixel utility functions
declare global {
  interface Window {
    fbq: any;
  }
}

export const initFacebookPixel = (pixelId: string) => {
  if (typeof window === 'undefined') return;

  // Check if Facebook Pixel is already loaded
  if (window.fbq) return;

  // Facebook Pixel Code
  (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = !0;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = !0;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', pixelId);
  window.fbq('track', 'PageView');
};

export const trackFacebookEvent = (eventName: string, parameters?: any) => {
  if (typeof window === 'undefined' || !window.fbq) return;

  try {
    if (parameters) {
      window.fbq('track', eventName, parameters);
    } else {
      window.fbq('track', eventName);
    }
  } catch (error) {
    console.error('Error tracking Facebook event:', error);
  }
};

// Predefined Facebook events for the quiz
export const FacebookEvents = {
  // Quiz progression events
  QUIZ_STARTED: 'InitiateCheckout', // User starts the quiz
  QUIZ_STEP_COMPLETED: 'AddToCart', // User completes a quiz step
  TRUST_ELEMENT_VIEWED: 'ViewContent', // User views a trust element
  
  // Lead generation events
  LEAD_FORM_STARTED: 'Lead', // User starts filling the lead form
  LEAD_FORM_COMPLETED: 'CompleteRegistration', // User completes the lead form
  
  // Conversion events
  RESULTS_VIEWED: 'Purchase', // User reaches results page (main conversion)
  GUIDE_DOWNLOAD_CLICKED: 'Subscribe', // User clicks download guide
  
  // Engagement events
  LANGUAGE_SELECTED: 'Search', // User selects language
  MARKET_INTEREST_SELECTED: 'AddToWishlist', // User selects market interests
  
  // Additional tracking events
  REGISTRATION_SUCCESS: 'CompleteRegistration', // Successful registration
  GUIDE_CTA_CLICKED: 'Purchase', // Guide CTA button clicked
} as const;

export type FacebookEventName = typeof FacebookEvents[keyof typeof FacebookEvents];