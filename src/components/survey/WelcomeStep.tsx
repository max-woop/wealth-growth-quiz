import React, { useEffect } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { preloadImages, getAgeImages, getTrustElementImages } from '../../utils/imagePreloader';
import OptimizedImage from '../OptimizedImage';
import { withBase } from '../../utils/imagePreloader';

interface WelcomeStepProps {
  onNext: (gender: string) => void;
}

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const { t, language, forceSendData } = useSurvey();
  
  const genderOptions = [
    {
      value: "Male",
      image: withBase("/assets/male_600x600_1x.webp"),
      description: t.male
    },
    {
      value: "Female",
      image: withBase("/assets/female_600x600_1x.webp"),
      description: t.female
    }
  ];

  // Preload critical images when component mounts
  useEffect(() => {
    const preloadCriticalImages = async () => {
      try {
        // Preload trust element images immediately
        const trustImages = getTrustElementImages();
        preloadImages(trustImages, false); // Don't wait for these
        
        // Preload age images for both genders
        const maleAgeImages = getAgeImages('Male');
        const femaleAgeImages = getAgeImages('Female');
        preloadImages([...maleAgeImages, ...femaleAgeImages], false);
      } catch (error) {
        console.warn('Failed to preload some images:', error);
      }
    };

    preloadCriticalImages();
  }, []);

  const handleGenderSelect = (gender: string) => {
    // Preload age-specific images when gender is selected
    const ageImages = getAgeImages(gender);
    preloadImages(ageImages, false);
    onNext(gender);
  };

  // Add debug button (remove in production)
  const handleDebugSend = async () => {
    if (forceSendData) {
      try {
        await forceSendData();
      } catch (error) {
        console.error('Debug: Force send failed:', error);
      }
    }
  };

  return (
    <div className="animate-fadeIn py-4 min-h-[calc(100vh-8rem)] flex flex-col">
      {/* Trust Badges */}
      <div className="flex justify-center gap-4 mb-6">
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <div className="text-center">
            <div className="text-xs font-bold text-gray-900">
              {language === 'ru' ? 'Выбор 1М+ пользователей' : 
               language === 'es' ? 'Elección de 1M+ usuarios' : 
               '1M+ users\' choice'}
            </div>
            <div className="text-xs text-gray-600">
              {language === 'ru' ? 'Освоили новые навыки' : 
               language === 'es' ? 'Aprendieron nuevas habilidades' : 
               'Learned new skills'}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
          <div className="text-center">
            <div className="text-xs font-bold text-gray-900">
              {language === 'ru' ? 'Рейтинг на Trustpilot' : 
               language === 'es' ? 'Calificado en Trustpilot' : 
               'Rated on Trustpilot'}
            </div>
            <div className="text-xs text-gray-600">
              {language === 'ru' ? '4.1 балла удовлетворенности' : 
               language === 'es' ? '4.1 Puntuación de satisfacción' : 
               '4.1 Satisfaction Score'}
            </div>
          </div>
        </div>
      </div>

      {/* Removed hero image for cleaner mobile layout */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-[#222834] to-[#2C3444] bg-clip-text text-transparent">
            {t.wealthGrowthChallenge}
          </h1>
          
          {/* Add 1-minute badge */}
          <div className="inline-block bg-gradient-to-r from-[#00B915] to-[#00A012] text-white px-4 py-2 rounded-full mb-3 shadow-lg">
            <span className="text-sm font-semibold">{t.oneMinuteBadge}</span>
          </div>
          
          <p className="text-sm sm:text-base text-gray-600 mb-4 max-w-md mx-auto">
            {t.takeQuizDescription}
          </p>
        </div>

        {/* Gender Selection */}
        <div className="max-w-xs mx-auto mb-6">        
          <div className="flex justify-center gap-3">
            {genderOptions.map((option) => (
              <button 
                key={option.value}
                onClick={() => handleGenderSelect(option.value)}
                className="flex-1 bg-white border-2 border-gray-100 rounded-xl p-2 
                         hover:border-[#00B915] transition-all duration-300 group overflow-hidden"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-full h-32 overflow-hidden rounded-lg">
                    <OptimizedImage
                      src={option.image}
                      alt={option.description}
                      className="w-full h-full"
                      priority={true}
                      sizes="(max-width: 768px) 150px, 200px"
                    />
                  </div>
                  <span className="font-medium text-sm text-gray-900 group-hover:text-[#00B915]">
                    {option.description}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Debug button - remove in production */}
      <div className="text-center mt-4">
        <button onClick={handleDebugSend} className="text-xs text-gray-400 underline">
          Debug: Force Send Data
        </button>
      </div>

      {/* Language indicator - show current language */}
      <div className="flex-shrink-0 pb-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
          <span>
            {language === 'en' && '🇺🇸 English'}
            {language === 'ru' && '🇷🇺 Русский'}
            {language === 'es' && '🇪🇸 Español'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeStep;