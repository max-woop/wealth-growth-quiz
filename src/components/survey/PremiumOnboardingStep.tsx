import React from 'react';
import { Shield, BookOpen, TrendingUp, Users, CheckCircle, ArrowRight } from 'lucide-react';
import SurveyButton from '../SurveyButton';

interface PremiumOnboardingStepProps {
  onNext: () => void;
}

const PremiumOnboardingStep: React.FC<PremiumOnboardingStepProps> = ({ onNext }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
          <Shield size={32} className="text-purple-600" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Welcome to Premium
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          You now have access to our complete suite of professional trading tools
        </p>
      </div>

      {/* Premium Features */}
      <div className="space-y-4 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <TrendingUp className="h-8 w-8 text-purple-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Advanced Analytics Suite</h3>
              <ul className="space-y-2">
                {[
                  'Real-time market analysis',
                  'Custom indicators and alerts',
                  'Portfolio optimization tools',
                  'Risk assessment dashboard'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="flex items-start gap-4">
            <Users className="h-8 w-8 text-purple-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">1-on-1 Mentorship</h3>
              <ul className="space-y-2">
                {[
                  'Personal trading coach',
                  'Weekly strategy sessions',
                  'Trade review and feedback',
                  'Custom learning path'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-purple-600" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Course Access */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 mb-8 text-white">
        <div className="flex items-start gap-4 mb-4">
          <BookOpen size={24} className="flex-shrink-0" />
          <div>
            <h3 className="font-bold mb-2">Professional Trading Course</h3>
            <p className="text-sm opacity-90">Start your comprehensive trading education ($497 value)</p>
          </div>
        </div>
        <button className="w-full bg-white text-purple-600 py-2.5 px-4 rounded-lg font-medium hover:bg-purple-50 transition-all flex items-center justify-center">
          <ArrowRight size={18} className="mr-2" />
          Access Course
        </button>
      </div>

      <div className="text-center">
        <SurveyButton 
          onClick={onNext}
          className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Continue to App
        </SurveyButton>
        <p className="mt-4 text-xs text-gray-500">
          Your premium access is now active
        </p>
      </div>
    </div>
  );
};

export default PremiumOnboardingStep;