import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface SavingMoneyStepProps {
  onNext: (answer: string) => void;
}

const SavingMoneyStep: React.FC<SavingMoneyStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const answers = [
    {
      value: "Very Easy",
      emoji: t.veryEasyEmoji,
      title: t.veryEasy
    },
    {
      value: "Somewhat Easy",
      emoji: t.somewhatEasyEmoji,
      title: t.somewhatEasy
    },
    {
      value: "Difficult",
      emoji: t.difficultEmoji,
      title: t.difficult
    },
    {
      value: "Very Difficult",
      emoji: t.veryDifficultEmoji,
      title: t.veryDifficult
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900">
        {t.savingMoneyQuestion}
      </h2>
      
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

export default SavingMoneyStep;