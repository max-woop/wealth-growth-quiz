import React, { useEffect, useRef } from 'react';

interface RussianRegistrationStepProps {
  onNext: (name: string, email: string) => void;
}

const RussianRegistrationStep: React.FC<RussianRegistrationStepProps> = ({ onNext }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const integrationReadyRef = useRef<boolean>(false);

  useEffect(() => {
    const initializeForm = () => {
      // Remove any existing scripts
      const existingScript = document.querySelector('script[src*="lib.fxclub.org"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Load the FXClub landing API script (always, to match provided integration)
      const script = document.createElement('script');
      script.src = 'https://lib.fxclub.org/landing/js/landing-api.min.2.8.0.js';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load FXClub script');
      };
      document.body.appendChild(script);

      script.onload = () => {
        console.log('FXClub script loaded successfully');
        // Wait for form and API to be ready
        let attempts = 0;
        const maxAttempts = 50; // Максимум 5 секунд (50 * 100ms)
        
        const initForm = () => {
          attempts++;
          
          if (attempts > maxAttempts) {
            console.warn('FXClub form initialization timeout after', maxAttempts, 'attempts');
            return;
          }
          
          if (!formRef.current || typeof (window as any).fxcLanding === 'undefined') {
            setTimeout(initForm, 100);
            return;
          }

          // Check if required elements exist
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          const phoneInput = document.getElementById('phone');
          const captchaContainer = document.getElementById('fxc-captcha-container');

          if (!emailInput || !passwordInput || !phoneInput || !captchaContainer) {
            setTimeout(initForm, 100);
            return;
          }

          try {
            (window as any).fxcLanding.create({
              form: "#email-form",
              apiKey: "d24c74c0d020796a1f7c81c1d0689b00bad73716",
              registrationCallback: function (data: any, goFurther: () => void) {
                // Route to Results inside the app, not to terminal
                try {
                  if ((window as any).utag) {
                    try {
                      (window as any).utag.view({
                        "page_broker": "bvi",
                        "page_language": "ru-ru",
                        "page_system": "promo",
                        "product_category": "registration",
                        "event_type": "order",
                        "customer_profile_id": data.data?.FxBankClientID,
                      });
                    } catch (e) {
                      console.warn('utag.view failed', e);
                    }
                  }
                  const email = data.data?.email || (emailInput as HTMLInputElement).value || 'user@example.com';
                  const name = data.data?.name || data.data?.firstName || 'User';
                  onNext(name, email);
                } catch (err) {
                  console.warn('registrationCallback error, using local fallback', err);
                  const localEmail = (emailInput as HTMLInputElement)?.value || 'user@example.com';
                  const localName = (localEmail.split('@')[0]) || 'Пользователь';
                  onNext(localName, localEmail);
                }
              }
            });
            integrationReadyRef.current = true;
          } catch (error) {
            console.error('Error initializing FXClub form:', error);
          }
          
          // Принудительно применяем стили к сообщениям об ошибках
          const applyErrorStyles = () => {
            const errorElements = document.querySelectorAll('.error, .error-message, .field-error, .validation-error, [class*="error"], [class*="Error"]');
            errorElements.forEach((element: any) => {
              // Стилизуем только сообщения об ошибках (не поля ввода)
              if (element.tagName !== 'INPUT') {
                element.style.fontSize = '12px';
                element.style.color = '#dc2626';
                element.style.marginTop = '4px';
                element.style.display = 'block';
                element.style.lineHeight = '1.2';
                element.style.fontWeight = '400';
              }
            });
            
          };
          
          // Применяем стили сразу и через интервалы
          applyErrorStyles();
          setInterval(applyErrorStyles, 1000);
        };

        // Start initialization after a delay
        setTimeout(initForm, 500);

        // Watchdog: if SDK never becomes ready within 8s, fallback silently
        setTimeout(() => {
          if (typeof (window as any).fxcLanding === 'undefined') {
            console.warn('FXClub SDK did not initialize in time; keeping local fallback');
          }
        }, 8000);
      };

      script.onerror = (error) => {
        console.error('Failed to load FXClub script:', error);
      };

      return script;
    };

    // Check if DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeForm);
    } else {
      // DOM is already ready
      const script = initializeForm();
      
      return () => {
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    }

    return () => {
      document.removeEventListener('DOMContentLoaded', initializeForm);
    };
  }, [onNext]);

  // Local fallback submit handler when integration is not ready
  const handleLocalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (integrationReadyRef.current) return; // Remote integration will handle
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const email = (form.querySelector('#email') as HTMLInputElement)?.value || 'user@example.com';
    const name = email.includes('@') ? email.split('@')[0] : 'Пользователь';
    onNext(name, email);
  };

  return (
    <div className="animate-fadeIn py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Создайте свой торговый счет
        </h2>
        <p className="text-gray-600 text-sm">
          Начните свой торговый путь сегодня
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
          onSubmit={handleLocalSubmit}
        >
          <div className="form-view space-y-4">
            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="email"
                name="login"
                placeholder="E-mail"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="password"
                name="password"
                placeholder="Пароль"
                type="password"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="phone"
                name="phone"
                placeholder="Телефон"
                type="tel"
                autoComplete="tel"
                required
              />
            </div>

            <div id="fxc-captcha-container"></div>

            <input 
              className="btn w-full bg-[#00B915] hover:bg-[#008F10] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer" 
              data-wait="Пожалуйста, подождите..."
              type="submit"
              value="Открыть счет"
            />
          </div>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Создавая аккаунт, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности.
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

export default RussianRegistrationStep;
