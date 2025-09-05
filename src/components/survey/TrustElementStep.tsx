import React from 'react';
import SurveyButton from '../SurveyButton';
import { useSurvey } from '../../context/SurveyContext';
import OptimizedImage from '../OptimizedImage';
import { withBase } from '../../utils/imagePreloader';

interface TrustElementStepProps {
  onNext: () => void;
  variant: 1 | 2 | 3 | 4 | 5;
  financialSituation?: string;
  financialConfidence?: string;
}

const TrustElementStep: React.FC<TrustElementStepProps> = ({ 
  onNext, 
  variant,
  financialSituation,
  financialConfidence 
}) => {
  const { t } = useSurvey();
  
  const getContent = () => {
    switch (variant) {
      case 1:
        return {
          title: t.trustElement1,
          image: withBase("/assets/trust_element_1_1x.webp")
        };
      case 2:
        // Check if user answered "Comfortable" or "Very Comfortable" to financial situation
        return (financialSituation === "Comfortable" || financialSituation === "Very Comfortable") ? {
          title: t.trustElement2Positive.split('\n')[0],
          description: t.trustElement2Positive.split('\n').slice(1).join('\n'),
          image: withBase("/assets/trust_element_2_1_1x.webp")
        } : {
          title: t.trustElement2Negative.split('\n')[0],
          description: t.trustElement2Negative.split('\n').slice(1).join('\n'),
          image: withBase("/assets/trust_element_2_2_1x.webp")
        };
      case 3:
        return {
          title: t.trustElement3.split('\n')[0],
          description: t.trustElement3.split('\n').slice(1).join('\n'),
          image: withBase("/assets/trust_element_3_1x.webp")
        };
      case 4:
        return financialConfidence === "Not Confident" ? {
          title: t.trustElement4Negative.split('\n')[0],
          description: t.trustElement4Negative.split('\n').slice(1).join('\n'),
          image: withBase("/assets/trust_element_4_1_1x.webp")
        } : {
          title: t.trustElement4Positive.split('\n')[0],
          description: t.trustElement4Positive.split('\n').slice(1).join('\n'),
          image: withBase("/assets/trust_element_4_2_1x.webp")
        };
      case 5:
        return {
          title: t.trustElement5.split('\n')[0],
          description: t.trustElement5.split('\n').slice(1).join('\n'),
          image: withBase("/assets/trust_element_5_1_1x.webp")
        };
      default:
        return {
          title: t.trustElement1,
          image: withBase("/assets/trust_element_1_1x.webp")
        };
    }
  };

  const content = getContent();

  return (
    <div className="animate-fadeIn h-full flex flex-col justify-between min-h-[calc(100vh-8rem)] max-h-screen overflow-hidden">
      {/* Content Container - optimized for single screen view */}
      <div className="flex-1 flex flex-col justify-center px-4 py-2">
        
        {/* Title Section - increased font size to match quiz headlines */}
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight px-2 mb-2">
            {content.title}
          </h2>
          {content.description && (
            <p className="text-base md:text-lg text-gray-600 mt-2 md:mt-3 max-w-2xl mx-auto leading-relaxed px-2">
              {content.description}
            </p>
          )}
        </div>

        {/* Image Section - optimized sizing */}
        <div className="flex-1 flex items-center justify-center mb-4 md:mb-6">
          <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
            <OptimizedImage
              src={content.image}
              alt="Trust element"
              className="w-full h-auto max-h-[40vh] md:max-h-[45vh] lg:max-h-[50vh] object-contain rounded-xl shadow-lg"
              priority={true}
              sizes="(max-width: 768px) 320px, (max-width: 1024px) 448px, 512px"
            />
          </div>
        </div>
      </div>

      {/* Button Section - fixed at bottom */}
      <div className="flex-shrink-0 text-center px-4 pb-4 md:pb-6">
        <SurveyButton 
          onClick={onNext} 
          className="w-full sm:w-auto min-w-[200px] text-base md:text-lg py-3 md:py-4 px-6 md:px-8"
        >
          {t.continue}
        </SurveyButton>
      </div>
    </div>
  );
};

export default TrustElementStep;