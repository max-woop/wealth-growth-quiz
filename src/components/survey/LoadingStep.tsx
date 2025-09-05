import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, Star, BookOpen, Target, TrendingUp } from 'lucide-react';
import { useSurvey } from '../../context/SurveyContext';

interface LoadingStepProps {
  onComplete: () => void;
  nextStep?: string;
}

const LoadingStep: React.FC<LoadingStepProps> = ({ onComplete, nextStep = 'next' }) => {
  const { t, language } = useSurvey();
  const [percentage, setPercentage] = useState(0);
  const completeCalledRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const getLoadingContent = () => {
    const isRussian = language === 'ru';
    const isSpanish = language === 'es';
    
    switch(nextStep) {
      case 'wealth-growth-profile':
        return {
          title: isSpanish ? t.creatingProfile : (isRussian ? "Создаём ваш профиль роста капитала..." : "Creating your wealth growth profile..."),
          steps: [
            { 
              icon: <BarChart3 />, 
              text: isSpanish ? t.analyzingGoals : (isRussian ? "Анализируем ваши финансовые цели" : "Analyzing your financial goals")
            },
            { 
              icon: <Star />, 
              text: isSpanish ? t.calculatingPotential : (isRussian ? "Рассчитываем потенциал роста" : "Calculating growth potential")
            },
            { 
              icon: <TrendingUp />, 
              text: isSpanish ? t.preparingRecommendations : (isRussian ? "Готовим рыночные рекомендации" : "Preparing market recommendations")
            }
          ]
        };
      case 'personal-wealth-challenge':
        return {
          title: isSpanish ? t.buildingChallenge : (isRussian ? "Готовим ваш индивидуальный план действий..." : "Building your personal challenge..."),
          steps: [
            { 
              icon: <Target />, 
              text: isSpanish ? t.settingMilestones : (isRussian ? "Устанавливаем этапы достижений" : "Setting achievement milestones")
            },
            { 
              icon: <BookOpen />, 
              text: isSpanish ? t.creatingRoadmap : (isRussian ? "Создаём дорожную карту обучения" : "Creating learning roadmap")
            },
            { 
              icon: <Star />, 
              text: isSpanish ? t.customizingStrategies : (isRussian ? "Настраиваем торговые стратегии" : "Customizing trading strategies")
            }
          ]
        };
      case 'investing-skills':
        return {
          title: isSpanish ? t.analyzingPotential : (isRussian ? "Анализируем ваш торговый потенциал..." : "Analyzing your trading potential..."),
          steps: [
            { 
              icon: <BarChart3 />, 
              text: isSpanish ? t.evaluatingKnowledge : (isRussian ? "Оцениваем знания рынка" : "Evaluating market knowledge")
            },
            { 
              icon: <TrendingUp />, 
              text: isSpanish ? t.assessingRisk : (isRussian ? "Анализируем навыки управления рисками" : "Assessing risk management skills")
            },
            { 
              icon: <Star />, 
              text: isSpanish ? t.preparingInsights : (isRussian ? "Готовим персональные рекомендации" : "Preparing personalized insights")
            }
          ]
        };
      default:
        return {
          title: isSpanish ? t.preparingResults : (isRussian ? "Готовим ваши результаты..." : "Preparing your results..."),
          steps: [
            { 
              icon: <BarChart3 />, 
              text: isSpanish ? t.analyzingResponses : (isRussian ? "Анализируем ваши ответы" : "Analyzing your responses")
            },
            { 
              icon: <Star />, 
              text: isSpanish ? t.creatingPersonalizedInsights : (isRussian ? "Создаём персональные рекомендации" : "Creating personalized insights")
            },
            { 
              icon: <TrendingUp />, 
              text: isSpanish ? t.finalizingRecommendations : (isRussian ? "Финализируем рекомендации" : "Finalizing recommendations")
            }
          ]
        };
    }
  };

  const content = getLoadingContent();

  useEffect(() => {
    const DURATION_MS = 5000;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.max(0, Math.min(100, (elapsed / DURATION_MS) * 100));
      setPercentage(pct);

      if (pct < 100) {
        rafId = requestAnimationFrame(tick);
      } else if (!completeCalledRef.current) {
        completeCalledRef.current = true;
        onCompleteRef.current();
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="animate-fadeIn min-h-[60vh] flex flex-col items-center justify-center p-4">
      <div className="relative w-32 h-32 mb-8">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="#F3F4F6"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx="64"
            cy="64"
            r="60"
            stroke="#4F46E5"
            strokeWidth="8"
            fill="none"
            strokeDasharray="377"
            strokeDashoffset={377 - (377 * percentage) / 100}
            className="transition-all duration-100 ease-linear"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold text-[#1E1B4B]">{Math.round(percentage)}%</span>
        </div>
      </div>

      <div className="relative mb-6 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-[#1E1B4B] text-center">
          {content.title}
        </h2>
        {/* shimmer underline */}
        <div className="h-1 w-40 mx-auto mt-2 bg-gradient-to-r from-[#4F46E5] via-[#8B5CF6] to-[#4F46E5] rounded-full overflow-hidden">
          <div className="h-full w-1/3 bg-white/60 animate-[loading_1.8s_linear_infinite]"></div>
        </div>
      </div>

      <div className="space-y-4 w-full max-w-sm">
        {content.steps.map((step, index) => (
          <div 
            key={index}
            className={`transition-all duration-300 ${percentage >= (index + 1) * 30 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
          >
            <div className="flex items-center gap-3 bg-[#F8F7FF] p-3 rounded-lg">
              <div className="w-8 h-8 bg-[#4F46E5] rounded-full flex items-center justify-center">
                {React.cloneElement(step.icon, { className: "w-5 h-5 text-white" })}
              </div>
              <span className="text-[#1E1B4B]">{step.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingStep;