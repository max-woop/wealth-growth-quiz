import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface TradingKnowledgeStepProps {
  onNext: (answer: string) => void;
}

const TradingKnowledgeStep: React.FC<TradingKnowledgeStepProps> = ({ onNext }) => {
  const { t } = useSurvey();
  
  const answers = [
    {
      value: "I have experience",
      title: t.experiencedWantImprove
    },
    {
      value: "I know basics",
      title: t.heardSomething
    },
    {
      value: "No, but I'd like to know",
      title: t.noButWantToKnow
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.tradingKnowledgeQuestion}
      </h2>
      
      <div className="space-y-3 max-w-sm mx-auto">
        {answers.map((answer) => (
          <button 
            key={answer.value}
            onClick={() => onNext(answer.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {answer.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TradingKnowledgeStep;