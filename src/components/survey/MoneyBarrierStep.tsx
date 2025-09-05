import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface MoneyBarrierStepProps {
  onNext: (answer: string) => void;
}

const MoneyBarrierStep: React.FC<MoneyBarrierStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const answers = [
    {
      value: "Definitely Yes",
      emoji: t.definitelyYesEmoji,
      title: t.definitelyYes
    },
    {
      value: "Somewhat",
      emoji: t.somewhatEmoji,
      title: t.somewhat
    },
    {
      value: "Not Really",
      emoji: t.notReallyEmoji,
      title: t.notReally
    },
    {
      value: "Not at All",
      emoji: t.notAtAllEmoji,
      title: t.notAtAll
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.moneyBarrierQuestion}
      </h2>
      
      <p className="text-base md:text-lg text-center text-gray-600 mb-4">
        {t.moneyBarrierDescription}
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {answers.map((answer) => (
          <button 
            key={answer.value}
            onClick={() => onNext(answer.value)}
            className="bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex flex-col items-center gap-2 group text-center"
          >
            <span className="text-3xl transform group-hover:scale-110 transition-transform">
              {answer.emoji}
            </span>
            <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-sm leading-tight">
              {answer.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoneyBarrierStep;