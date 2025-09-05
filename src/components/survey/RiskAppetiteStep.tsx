import React, { useState } from 'react';
import SurveyButton from '../SurveyButton';

interface RiskAppetiteStepProps {
  onNext: (riskLevel: number) => void;
  onPrevious: () => void;
}

const RiskAppetiteStep: React.FC<RiskAppetiteStepProps> = ({ onNext, onPrevious }) => {
  const [riskLevel, setRiskLevel] = useState(5);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRiskLevel(parseInt(e.target.value, 10));
  };

  const getRiskDescription = (level: number) => {
    if (level <= 3) return { 
      text: 'Safety First', 
      emoji: '🛡️',
      description: 'You prefer steady, reliable returns with minimal risk'
    };
    if (level <= 7) return { 
      text: 'Balanced Growth', 
      emoji: '⚖️',
      description: 'You seek a mix of safety and growth opportunities'
    };
    return { 
      text: 'Growth Focused', 
      emoji: '🎯',
      description: 'You\'re comfortable with higher risk for better returns'
    };
  };
  
  const riskInfo = getRiskDescription(riskLevel);
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        How do you feel about risk and reward?
      </h2>
      
      <p className="text-center text-gray-600 mb-8">
        This helps us suggest trading strategies that match your comfort level
      </p>
      
      <div className="mb-10 mt-12">
        <div className="relative">
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={riskLevel} 
            onChange={handleChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>More Secure</span>
            <span>Balanced</span>
            <span>More Growth</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center justify-center bg-white border-2 border-gray-100 rounded-xl px-6 py-4">
            <span className="text-3xl mr-3">{riskInfo.emoji}</span>
            <div className="text-left">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {riskInfo.text}
              </div>
              <p className="text-gray-600 text-sm">
                {riskInfo.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <SurveyButton onClick={onPrevious} isPrimary={false}>
          Back
        </SurveyButton>
        <SurveyButton onClick={() => onNext(riskLevel)}>
          Continue
        </SurveyButton>
      </div>
    </div>
  );
};

export default RiskAppetiteStep;