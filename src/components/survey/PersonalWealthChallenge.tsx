import React from 'react';
import SurveyButton from '../SurveyButton';
import { TradingPersona } from '../../types/survey';
import { useSurvey } from '../../context/SurveyContext';

interface PersonalWealthChallengeProps {
  onNext: () => void;
  responses: {
    specialAchievement?: string;
    tradingKnowledge: string;
    monthlyIncome: string;
    investmentReadiness: number;
    mainGoal?: string;
  };
}

const PersonalWealthChallenge: React.FC<PersonalWealthChallengeProps> = ({ onNext, responses }) => {
  const { t } = useSurvey();
  
  return (
    <div className="animate-fadeIn py-2">
      {/* Investing Skills Graph Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-[#1E1B4B]">
          {t.investingSkillsLevel}
        </h1>

        {/* Graph Section */}
        <div className="relative w-full h-[300px] md:h-[400px] mb-8">
          {/* Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-full border-t border-gray-100" />
            ))}
          </div>

          {/* Curve */}
          <svg 
            className="absolute inset-0 w-full h-full" 
            viewBox="0 0 400 300" 
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="skillGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="50%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id="glowGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                <stop offset="100%" stopColor="rgba(79, 70, 229, 0)" />
              </linearGradient>
            </defs>
            
            {/* Glow effect */}
            <path
              d="M 40,220 Q 120,220 200,150 T 360,80 V 300 H 40 Z"
              fill="url(#glowGradient)"
              opacity="0.5"
            />
            
            {/* Main curve */}
            <path
              d="M 40,220 Q 120,220 200,150 T 360,80"
              fill="none"
              stroke="url(#skillGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-all duration-1000"
              style={{
                strokeDasharray: 553,
                strokeDashoffset: 553,
                animation: 'progress 2s ease-out forwards'
              }}
            />
            
            {/* Dots along the curve */}
            <circle cx="40" cy="220" r="4" fill="#EF4444" />
            <circle cx="200" cy="150" r="4" fill="#F59E0B" />
            <circle cx="360" cy="80" r="4" fill="#22C55E" />
          </svg>

          {/* Start Point */}
          <div className="absolute bottom-[80px] left-[40px] -translate-x-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-white border-4 border-red-500 rounded-full shadow-lg" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E1B4B] text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap shadow-lg">
                {t.now}
              </div>
            </div>
          </div>

          {/* End Point */}
          <div className="absolute top-[80px] right-[40px] translate-x-1/2">
            <div className="relative">
              <div className="w-4 h-4 bg-white border-4 border-green-500 rounded-full shadow-lg" />
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1E1B4B] text-white px-3 py-1.5 rounded-lg text-sm whitespace-nowrap shadow-lg">
                {t.afterSixWeeks}
              </div>
            </div>
          </div>

          {/* X-Axis Labels */}
          <div className="absolute bottom-0 left-[40px] right-[40px] flex justify-between text-sm text-gray-500">
            <span>{t.week1}</span>
            <span>{t.week2}</span>
            <span>{t.week4}</span>
            <span>{t.week6}</span>
          </div>
        </div>

        {/* Skill Levels */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <div className="w-full h-2 bg-red-500 rounded-full mb-2" />
            <span className="text-sm text-gray-600">{t.gettingStarted}</span>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-yellow-500 rounded-full mb-2" />
            <span className="text-sm text-gray-600">{t.intermediate}</span>
          </div>
          <div className="text-center">
            <div className="w-full h-2 bg-green-500 rounded-full mb-2" />
            <span className="text-sm text-gray-600">{t.expert}</span>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-[#F8F7FF] rounded-xl p-6">
            <h3 className="font-bold text-[#1E1B4B] text-lg mb-2">{t.yourPotentialIsHigh}</h3>
            <p className="text-gray-600">
              {t.yourPotentialIsHighDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Personal Wealth Challenge Section */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E1B4B] mb-4">
          {t.personalWealthChallenge}
        </h1>
        <p className="text-lg text-gray-600">
          {t.personalWealthChallengeDesc}
        </p>
      </div>

      {/* Timeline */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-[#1E1B4B] mb-6">{t.yourSixWeekJourney}</h2>
        <div className="space-y-8">
          {[
            {
              week: t.week12,
              title: t.masterTradingBasics,
              description: t.masterTradingBasicsDesc
            },
            {
              week: t.week34,
              title: t.technicalAnalysis,
              description: t.technicalAnalysisDesc
            },
            {
              week: t.week56,
              title: t.advancedStrategies,
              description: t.advancedStrategiesDesc
            }
          ].map((milestone, index) => (
            <div key={index} className="relative">
              {index < 2 && (
                <div 
                  className="absolute top-12 left-6 w-0.5 h-16 bg-gradient-to-b from-[#4F46E5] to-transparent"
                  style={{ transform: 'translateX(-50%)' }}
                />
              )}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4F46E5] bg-opacity-10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4F46E5] font-bold">{index + 1}</span>
                </div>
                <div>
                  <span className="text-sm text-[#4F46E5] font-medium">{milestone.week}</span>
                  <h3 className="font-bold text-[#1E1B4B] text-lg mb-1">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SurveyButton 
        onClick={onNext} 
        className="w-full bg-[#4F46E5] hover:bg-[#4338CA] text-lg md:text-xl py-4"
      >
        {t.continueToNextStep}
      </SurveyButton>
    </div>
  );
};

export default PersonalWealthChallenge;