import React, { useEffect, useRef } from 'react';

interface RegistrationStepProps {
  onNext: () => void;
}

const RegistrationStep: React.FC<RegistrationStepProps> = ({ onNext }) => {
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    const loadScript = () => {
      // Load the FXClub landing API script
      const script = document.createElement('script');
      script.src = 'https://lib.fxclub.org/landing/js/landing-api.min.2.6.0.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        // Use polling mechanism to ensure both script and DOM are ready
        const pollForReady = () => {
          // Check if script is loaded
          if (!window.fxcLanding) {
            requestAnimationFrame(pollForReady);
            return;
          }

          // Check if form element exists
          if (!formRef.current) {
            requestAnimationFrame(pollForReady);
            return;
          }

          // Check if all required input fields exist
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          const phoneInput = document.getElementById('phone');
          const captchaContainer = document.getElementById('fxc-captcha-container');

          if (!emailInput || !passwordInput || !phoneInput || !captchaContainer) {
            requestAnimationFrame(pollForReady);
            return;
          }

          // All elements are ready, initialize the form
          try {
            const regForm = window.fxcLanding.create({
              form: "#email-form",
              apiKey: "cd381720dc68ca892b82b7d2064ad315630ffa4a",
              registrationCallback: function (data: any, goFurther: () => void) {
                // Analytics tracking
                if (window.utag) {
                  window.utag.view({
                    "page_broker": "bvi",
                    "page_language": "ru-ru",
                    "page_system": "promo",
                    "product_category": "registration",
                    "event_type": "order",
                    "customer_profile_id": data.data?.FxBankClientID,
                  }, goFurther);
                } else {
                  goFurther();
                }
                onNext(); // Proceed to next step after successful registration
              }
            });
          } catch (error) {
            console.error('Error initializing FXClub landing form:', error);
            // Retry after a short delay
            setTimeout(() => requestAnimationFrame(pollForReady), 1000);
          }
        };

        // Start polling
        requestAnimationFrame(pollForReady);
      };

      return script;
    };

    let script: HTMLScriptElement;

    // Check if DOM is already ready
    if (document.readyState === 'loading') {
      // DOM is still loading, wait for it to be ready
      const handleDOMContentLoaded = () => {
        script = loadScript();
        document.removeEventListener('DOMContentLoaded', handleDOMContentLoaded);
      };
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    } else {
      // DOM is already ready
      script = loadScript();
    }

    return () => {
      // Cleanup script on unmount
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [onNext]);

  return (
    <div className="animate-fadeIn py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Create Your Trading Account
        </h2>
        <p className="text-gray-600 text-sm">
          Start your trading journey today
        </p>
      </div>
      
      <div className="max-w-sm mx-auto">
        <form 
          ref={formRef}
          method="post" 
          className="horizontal_form space-y-4" 
          data-name="Email_Form" 
          id="email-form" 
          name="email-form"
        >
          <div className="form-view space-y-4">
            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="email" 
                name="email" 
                placeholder="E-mail" 
                type="email"
                required
              />
            </div>
            
            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="password" 
                name="password" 
                placeholder="Password" 
                type="password"
                required
              />
            </div>
            
            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="phone" 
                name="phone" 
                placeholder="Phone" 
                type="tel"
                required
              />
            </div>

            <div id="fxc-captcha-container"></div>

            <input 
              className="btn w-full bg-[#00B915] hover:bg-[#008F10] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer" 
              data-wait="Please wait..." 
              type="submit" 
              value="Open Account"
            />
          </div>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    fxcLanding: any;
    utag: any;
  }
}

export default RegistrationStep;