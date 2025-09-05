import React, { useEffect, useRef } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { trackFacebookEvent, FacebookEvents } from '../../utils/facebookPixel';
import RussianRegistrationStep from './RussianRegistrationStep';
import SpanishRegistrationStep from './SpanishRegistrationStep';

interface LeadCaptureStepProps {
  onNext: (name: string, email: string) => void;
}

const LeadCaptureStep: React.FC<LeadCaptureStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  const formRef = useRef<HTMLFormElement>(null);
  
  // Use dedicated components for Russian and Spanish
  if (language === 'ru') {
    return <RussianRegistrationStep onNext={onNext} />;
  }
  
  if (language === 'es') {
    return <SpanishRegistrationStep onNext={onNext} />;
  }
  
  // English fallback form (basic form without external API)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const name = formData.get('name') as string || 'User';
    
    // Track form completion
    trackFacebookEvent(FacebookEvents.LEAD_FORM_COMPLETED, {
      content_name: 'Trading Quiz Registration EN',
      content_category: 'lead_generation',
      value: 1,
      currency: 'USD'
    });
    
    onNext(name, email);
  };

  return (
    <div className="animate-fadeIn py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
          {t.leadCaptureTitle}
        </h2>
        <p className="text-lg text-gray-600">
          {t.leadCaptureDescription}
        </p>
      </div>
      
      <div className="max-w-md mx-auto">
        <form 
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-lg"
            name="name"
            placeholder={t.firstName || 'Name'}
            type="text"
            required
          />
          
          <input 
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#00B915] focus:ring-1 focus:ring-[#00B915] outline-none transition-colors text-lg"
            name="email"
            placeholder={t.email}
            type="email"
            autoComplete="email"
            required
          />
          
          <button 
            type="submit"
            className="w-full bg-[#00B915] hover:bg-[#008F10] text-white py-4 px-4 rounded-lg font-medium transition-colors text-lg"
          >
            {t.continue}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          {t.privacyNotice}
        </p>
      </div>
    </div>
  );
};

export default LeadCaptureStep;