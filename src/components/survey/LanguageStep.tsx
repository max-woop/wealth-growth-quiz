import React from 'react';
import { Globe } from 'lucide-react';

interface LanguageStepProps {
  onNext: (language: 'en' | 'ru') => void;
}

const LanguageStep: React.FC<LanguageStepProps> = ({ onNext }) => {
  const languages = [
    {
      code: 'en' as const,
      name: 'English',
      flag: '🇺🇸'
    },
    {
      code: 'ru' as const,
      name: 'Русский',
      flag: '🇷🇺'
    }
  ];

  return (
    <div className="animate-fadeIn py-8">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <Globe size={32} className="text-blue-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Select Language / Выберите язык
        </h1>
        <p className="text-gray-600">
          Choose your preferred language for the quiz
        </p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        {languages.map((language) => (
          <button 
            key={language.code}
            onClick={() => onNext(language.code)}
            className="w-full bg-white border-2 border-gray-100 rounded-xl p-6 
                     hover:border-[#4F46E5] hover:bg-[#F8F7FF] transition-all duration-300
                     flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{language.flag}</span>
              <span className="text-xl font-medium text-gray-900 group-hover:text-[#4F46E5]">
                {language.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageStep;