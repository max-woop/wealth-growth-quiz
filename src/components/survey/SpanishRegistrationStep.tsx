import React, { useEffect, useRef, useState } from 'react';

interface SpanishRegistrationStepProps {
  onNext: (name: string, email: string) => void;
}

const SpanishRegistrationStep: React.FC<SpanishRegistrationStepProps> = ({ onNext }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [integrationReady, setIntegrationReady] = useState(false);
  const [integrationError, setIntegrationError] = useState<string | null>(null);

  useEffect(() => {
    // Skip remote integration in dev/local to avoid CORS/network errors
    // Always load remote script to match provided integration
    const shouldUseRemote = true;

    const initializeForm = () => {
      // Remove any existing scripts
      const existingScript = document.querySelector('script[src*="lib.libertex.org"]');
      if (existingScript) {
        existingScript.remove();
      }

      // For strict integration, do not early return; always attempt remote

      // Load the Libertex landing API script (PROD only)
      const script = document.createElement('script');
      script.src = 'https://lib.libertex.org/landing/js/landing-api.min.2.8.0.js';
      script.async = true;
      script.onerror = () => {
        console.error('Failed to load Libertex script');
        setIntegrationError('Error al cargar la biblioteca Libertex — usando formulario local.');
        // Form will work locally without external API
      };
      document.body.appendChild(script);

      script.onload = () => {
        console.log('Libertex script loaded successfully');
        // Wait for form and API to be ready
        let attempts = 0;
        const maxAttempts = 50; // Максимум 5 секунд (50 * 100ms)
        
        const initForm = () => {
          attempts++;
          
          if (attempts > maxAttempts) {
            console.warn('Libertex form initialization timeout after', maxAttempts, 'attempts');
            setIntegrationError('Timeout al inicializar el formulario — usando formulario local.');
            // Fallback to local form
            return;
          }
          
          console.log(`Attempt ${attempts}: Checking form and API...`);
          console.log('formRef.current:', !!formRef.current);
          console.log('llLanding available:', typeof (window as any).llLanding !== 'undefined');
          
          if (!formRef.current || typeof (window as any).llLanding === 'undefined') {
            setTimeout(initForm, 100);
            return;
          }

          // Check if required elements exist
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          const phoneInput = document.getElementById('phone');
          const captchaContainer = document.getElementById('ll-captcha-container');

          console.log('Form elements check:');
          console.log('emailInput:', !!emailInput);
          console.log('passwordInput:', !!passwordInput);
          console.log('phoneInput:', !!phoneInput);
          console.log('captchaContainer:', !!captchaContainer);

          if (!emailInput || !passwordInput || !phoneInput || !captchaContainer) {
            console.log('Some form elements missing, retrying...');
            setTimeout(initForm, 100);
            return;
          }

          try {
            const body = document.querySelector('body');
            const regForm = (window as any).llLanding.create({
              form: "#email-form",
              apiKey: "0f0db22798ae5405f30e5c1233bb3152863102af",
              registrationCallback: function (data: any, goFurther: () => void) {
                // Always route to Results inside the app (do not redirect to terminal)
                try {
                  if ((window as any).utag) {
                    try {
                      (window as any).utag.view({
                        "page_broker": "bvi",
                        "page_language": "es-lm",
                        "page_system": "promo",
                        "product_category": "registration",
                        "event_type": "order",
                        "customer_profile_id": data.data?.clientID,
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
                  const email = (emailInput as HTMLInputElement)?.value || 'user@example.com';
                  const name = (email.split('@')[0]) || 'Usuario';
                  onNext(name, email);
                }
              }
            });
            console.log('Libertex form initialized successfully');
            setIntegrationReady(true);
          } catch (error) {
            console.error('Error initializing Libertex form:', error);
            setIntegrationError('No se pudo inicializar la integración remota — usando formulario local.');
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

        // Watchdog: if SDK never becomes ready within 8s, fallback to local
        setTimeout(() => {
          if (!integrationReady && typeof (window as any).llLanding === 'undefined') {
            console.warn('Libertex SDK did not initialize in time; falling back to local form');
            setIntegrationError('No se pudo conectar al servicio. Usando formulario local.');
            setIntegrationReady(false);
          }
        }, 8000);
      };

      script.onerror = (error) => {
        console.error('Failed to load Libertex script:', error);
        setIntegrationError('No se pudo cargar el script remoto.');
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

  const handleLocalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (integrationReady) return; // Let remote integration handle
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const email = (form.querySelector('#email') as HTMLInputElement)?.value || 'user@example.com';
    const name = email.includes('@') ? email.split('@')[0] : 'Usuario';
    onNext(name, email);
  };

  return (
    <div className="animate-fadeIn py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Crea tu cuenta de trading
        </h2>
        <p className="text-gray-600 text-sm">
          Comienza tu viaje de trading hoy
        </p>
      </div>

      <div className="max-w-sm mx-auto">
        <form 
          ref={formRef} 
          method="post" 
          className="space-y-4"
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
                placeholder="Nombre de usuario"
                type="email"
                autoComplete="username"
                required
              />
            </div>

            <div className="inputcontainer">
              <input 
                className="horizontalfield w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors" 
                id="password"
                name="password"
                placeholder="Contraseña"
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
                placeholder="Teléfono"
                type="tel"
                autoComplete="tel"
                required
              />
            </div>

            <div id="ll-captcha-container"></div>

            <input 
              className="btn w-full bg-[#00B915] hover:bg-[#008F10] text-white py-3 px-4 rounded-lg font-medium transition-colors cursor-pointer" 
              data-wait="Por favor espera..."
              type="submit"
              value="Abrir cuenta"
            />
          </div>
        </form>

        {integrationError && (
          <div 
            className="integration-error"
            style={{
              fontSize: '12px',
              color: '#dc2626',
              textAlign: 'center',
              marginTop: '8px',
              padding: '8px 12px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '6px',
              lineHeight: '1.3',
              fontWeight: '400'
            }}
          >
            <span style={{ display: 'inline-block', marginRight: '4px', fontSize: '10px' }}>⚠️</span>
            {integrationError} — usando formulario local.
          </div>
        )}
        <p className="text-sm text-gray-500 text-center mt-4">
          Al crear una cuenta, aceptas nuestros Términos de Servicio y Política de Privacidad.
        </p>
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

export default SpanishRegistrationStep;