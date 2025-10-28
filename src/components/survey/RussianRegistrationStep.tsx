import React, { useEffect, useRef } from 'react';
import { trackFacebookEvent, FacebookEvents } from '../../utils/facebookPixel';

interface RussianRegistrationStepProps {
  onNext: (name: string, email: string) => void;
}

const RussianRegistrationStep: React.FC<RussianRegistrationStepProps> = ({ onNext }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const initializeForm = () => {
      // Remove any existing scripts
      const existingScripts = document.querySelectorAll('script[src*="lib.libertex.org"], script[src*="partner-code"]');
      existingScripts.forEach(script => script.remove());

      // Load the Libertex landing API script for Russian market
      const script = document.createElement('script');
      script.src = 'https://lib.libertex.org/landing/js/landing-api.min.2.8.0.js';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Libertex script');
      };
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Libertex script loaded successfully');
        
        // Load partner code scripts
        const partnerCodeScript1 = document.createElement('script');
        partnerCodeScript1.src = 'https://lib.libertex.org/partner-code/v/partner-code.2.4.2.js';
        partnerCodeScript1.defer = true;
        document.body.appendChild(partnerCodeScript1);

        const partnerCodeScript2 = document.createElement('script');
        partnerCodeScript2.src = 'https://promo.libertex.org/lp/partner-code/partnerCodeLibertex.js';
        partnerCodeScript2.defer = true;
        document.body.appendChild(partnerCodeScript2);

        // Wait for form and API to be ready
        let attempts = 0;
        const maxAttempts = 50;
        
        const initForm = () => {
          attempts++;
          
          if (attempts > maxAttempts) {
            console.warn('Libertex form initialization timeout after', maxAttempts, 'attempts');
            return;
          }
          
          if (!formRef.current || typeof (window as any).llLanding === 'undefined') {
            setTimeout(initForm, 100);
            return;
          }

          // Check if required elements exist
          const loginInput = document.getElementById('login');
          const passwordInput = document.getElementById('password');
          const phoneInput = document.getElementById('phone');

          if (!loginInput || !passwordInput || !phoneInput) {
            setTimeout(initForm, 100);
            return;
          }

          try {
            const body = document.querySelector('body');
            const regForm = (window as any).llLanding.create({
              form: "#email-form",
              apiKey: "a7e2cea9c8e9094439563c899175660318c1916c",
              registrationCallback: function (data: any, goFurther: () => void) {
                const eventData = {
                  "page_broker": "bvi",
                  "page_language": "ru",
                  "page_system": "promo",
                  "product_category": "registration",
                  "event_type": "order",
                  "customer_profile_id": data.data?.clientID,
                };

                if (data.data?.registrationMethod === "deferred") {
                  eventData.product_category = "customer_profile_email";
                  (eventData as any).customer_profile_email = data.landing.$form.login.value;
                }

                if ((window as any).utag) {
                  try {
                    (window as any).utag.view(eventData, goFurther);
                  } catch (e) {
                    console.warn('utag.view failed', e);
                    goFurther();
                  }
                } else {
                  goFurther();
                }

                // Track Facebook event and proceed
                setTimeout(() => {
                  try { 
                    trackFacebookEvent(FacebookEvents.REGISTRATION_SUCCESS, { 
                      email: data.data?.email || (loginInput as HTMLInputElement).value 
                    }); 
                  } catch {}
                  
                  const email = data.data?.email || (loginInput as HTMLInputElement).value || 'user@example.com';
                  const firstName = data.data?.firstName || (document.getElementById('firstName') as HTMLInputElement)?.value || '';
                  const lastName = data.data?.lastName || (document.getElementById('lastName') as HTMLInputElement)?.value || '';
                  const name = firstName && lastName ? `${firstName} ${lastName}` : firstName || email.split('@')[0];
                  
                  onNext(name, email);
                }, 500);
              }
            });
            
            console.log('Libertex form initialized successfully');
          } catch (error) {
            console.error('Error initializing Libertex form:', error);
          }
          
          // Apply error styles
          const applyErrorStyles = () => {
            const errorElements = document.querySelectorAll('.error, .error-message, .field-error, .validation-error, [class*="error"], [class*="Error"]');
            errorElements.forEach((element: any) => {
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
          
          applyErrorStyles();
          setInterval(applyErrorStyles, 1000);
        };

        setTimeout(initForm, 500);

        setTimeout(() => {
          if (typeof (window as any).llLanding === 'undefined') {
            console.warn('Libertex SDK did not initialize in time; keeping local fallback');
          }
        }, 8000);
      };

      script.onerror = (error) => {
        console.error('Failed to load Libertex script:', error);
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
          className="horizontal_form space-y-3"
          data-name="Email Form" 
          id="email-form" 
          name="email-form"
        >
          <div className="form-view space-y-3">
            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
                id="firstName"
                name="firstName"
                placeholder="Имя"
                type="text"
                autoComplete="given-name"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
                id="lastName"
                name="lastName"
                placeholder="Фамилия"
                type="text"
                autoComplete="family-name"
                required
              />
            </div>

            <div className="inputcontainer">
              <select 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm bg-white" 
                id="iso3"
                name="iso3"
                required
              >
                <option value="">Страна</option>
              </select>
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
                id="city"
                name="city"
                placeholder="Город"
                type="text"
                autoComplete="address-level2"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
                id="birthday"
                name="birthday"
                placeholder="Дата рождения"
                type="date"
                autoComplete="bday"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
                id="login"
                name="login"
                placeholder="E-mail"
                type="email"
                autoComplete="email"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
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
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" 
                id="phone"
                name="phone"
                placeholder="Телефон"
                type="tel"
                autoComplete="tel"
                required
              />
            </div>

            <script className="ll-captcha-template" type="text/template" dangerouslySetInnerHTML={{
              __html: `
                <div class="ll-captcha-container">
                  <div class="field">
                    <div data-ll-pending-for="captcha">
                      <img src="" class="ll-captcha-image" width="150" height="40" alt="captcha">
                      <button class="ll-captcha-refresh" type="button">Обновить</button>
                    </div>
                  </div>
                  <div class="field">
                    <input class="f-text horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-sm" type="text" id="captcha" placeholder="Капча" name="captcha">
                  </div>
                </div>
              `
            }} />

            <div className="inputcontainer">
              <div className="form-agree-input flex items-start gap-2">
                <input 
                  className="fx-form-checkbox-agree mt-1 flex-shrink-0" 
                  type="checkbox" 
                  name="agreedToTermsAndConditions"
                  id="fx-form-agree"
                  required
                />
                <label htmlFor="fx-form-agree" className="text-xs text-gray-600 leading-tight">
                  Я согласен с{' '}
                  <a href="https://libertex.org/personal-data-processing" className="text-[#00B915] hover:underline" target="_blank" rel="noopener noreferrer">
                    обработкой
                  </a>
                  {' '}моих персональных данных и{' '}
                  <a href="https://libertex.org/terms-and-conditions" className="text-[#00B915] hover:underline" target="_blank" rel="noopener noreferrer">
                    условиями использования
                  </a>
                  {' '}сервиса
                </label>
              </div>
            </div>

            <input 
              className="btn w-full bg-[#00B915] hover:bg-[#008F10] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer" 
              data-wait="Пожалуйста, подождите..."
              type="submit"
              value="Открыть счет"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

// Extend Window interface for TypeScript
declare global {
  interface Window {
    llLanding: any;
    utag: any;
  }
}

export default RussianRegistrationStep;