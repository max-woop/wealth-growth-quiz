import React, { useState } from 'react';
import SurveyButton from '../SurveyButton';
import { useSurvey } from '../../context/SurveyContext';

interface InvestmentReadinessStepProps {
  onNext: (rating: number) => void;
}

const InvestmentReadinessStep: React.FC<InvestmentReadinessStepProps> = ({ onNext }) => {
  const { t } = useSurvey();
  const [rating, setRating] = useState(5);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(parseInt(e.target.value, 10));
  };

  const getReadinessLevel = (level: number) => {
    if (level <= 3) return {
      title: t.gettingStarted,
      description: t.buildingFoundations,
      emoji: '🌱'
    };
    if (level <= 7) return {
      title: t.readyToLearn,
      description: t.gainingConfidence,
      emoji: '📈'
    };
    return {
      title: t.readyToTrade,
      description: t.preparedForSuccess,
      emoji: '🏆'
    };
  };

  const readinessInfo = getReadinessLevel(rating);

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.investmentReadinessQuestion}
      </h2>
      
      <p className="text-base md:text-lg text-center text-gray-600 mb-6">
        {t.investmentReadinessDescription}
      </p>

      <div className="max-w-xs mx-auto mb-6">
        <div className="relative px-4">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={rating} 
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-2">
            <span>{t.gettingStarted}</span>
            <span>{t.intermediate}</span>
            <span>{t.expert}</span>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <div className="inline-flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
            <span className="text-2xl mr-3">{readinessInfo.emoji}</span>
            <div className="text-left">
              <div className="text-base font-bold text-[#00B915] mb-0.5">
                {readinessInfo.title}
              </div>
              <p className="text-gray-600 text-sm">
                {readinessInfo.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <SurveyButton onClick={() => onNext(rating)}>
          {t.continue}
        </SurveyButton>
      </div>
    </div>
  );
};

export default InvestmentReadinessStep;