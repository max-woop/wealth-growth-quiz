import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface SpecialAchievementStepProps {
  onNext: (achievement: string) => void;
}

const SpecialAchievementStep: React.FC<SpecialAchievementStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const achievements = [
    {
      value: "Buy a house",
      title: t.buyHouse
    },
    {
      value: "Start business",
      title: t.startBusiness
    },
    {
      value: "Early retire",
      title: t.earlyRetire
    },
    {
      value: "Travel world",
      title: t.travelWorld
    },
    {
      value: "Buy a car",
      title: t.buyCar
    },
    {
      value: "Wedding",
      title: t.wedding
    },
    {
      value: "Education",
      title: t.education
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl font-bold mb-2 text-center text-gray-900">
        {t.specialGoalQuestion}
      </h2>
      
      <div className="space-y-3 max-w-sm mx-auto">
        {achievements.map((achievement) => (
          <button 
            key={achievement.value}
            onClick={() => onNext(achievement.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left flex-1">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {achievement.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SpecialAchievementStep;