import React, { useEffect } from 'react';
import { useSurvey } from '../../context/SurveyContext';
import { preloadImages } from '../../utils/imagePreloader';
import OptimizedImage from '../OptimizedImage';
import { withBase } from '../../utils/imagePreloader';

interface AgeStepProps {
  onNext: (age: string) => void;
  onPrevious: () => void;
  gender?: string;
}

const AgeStep: React.FC<AgeStepProps> = ({ onNext, onPrevious, gender = 'Male' }) => {
  const { t } = useSurvey();
  
  const maleImages = {
    "18-24": withBase("/assets/male_18_24_600x600_1x.webp"),
    "25-34": withBase("/assets/male_25_34_600x600_1x.webp"),
    "35-44": withBase("/assets/male_35_44_600x600_1x.webp"),
    "45+": withBase("/assets/male_45_600x600_1x.webp")
  };

  const femaleImages = {
    "18-24": withBase("/assets/female_18_24_600x600_1x.webp"),
    "25-34": withBase("/assets/female_25_34_600x600_1x.webp"),
    "35-44": withBase("/assets/female_35_44_600x600_1x.webp"),
    "45+": withBase("/assets/female_45_600x600_1x.webp")
  };

  const ageRanges = [
    {
      value: "18-24"
    },
    {
      value: "25-34"
    },
    {
      value: "35-44"
    },
    {
      value: "45+"
    }
  ];

  const images = gender === 'Male' ? maleImages : femaleImages;

  // Preload main goal images when age step loads
  useEffect(() => {
    const mainGoalImages = [
      '/assets/financial_freedom_770x770_1x.webp',
      '/assets/professional_growth_770x770_1x.webp',
      '/assets/work_life_balance_770x770_1x.webp',
      '/assets/be_my_own_boss_770x770_1x.webp'
    ].map(withBase);
    preloadImages(mainGoalImages, false);
  }, []);

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.ageRangeQuestion}
      </h2>
      
      <p className="text-base md:text-lg text-center text-gray-600 mb-4">
        {t.ageRangeDescription}
      </p>
      
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {ageRanges.map((range) => (
          <button 
            key={range.value}
            onClick={() => onNext(range.value)}
            className="bg-white border border-gray-100 rounded-lg p-3 
                     hover:border-[#00B915] transition-all duration-300 group overflow-hidden"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="w-full h-48 overflow-hidden rounded-lg">
                <OptimizedImage
                  src={images[range.value]}
                  alt={range.value}
                  className="w-full h-full group-hover:scale-110 transition-transform duration-300"
                  priority={true}
                  sizes="(max-width: 768px) 150px, 200px"
                />
              </div>
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg">
                {range.value}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AgeStep;