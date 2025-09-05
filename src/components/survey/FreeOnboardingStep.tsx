import React from 'react';
import { withBase } from '../../utils/imagePreloader';
import { BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import SurveyButton from '../SurveyButton';

interface FreeOnboardingStepProps {
  onNext: () => void;
}

const FreeOnboardingStep: React.FC<FreeOnboardingStepProps> = ({ onNext }) => {
  return (
    <div className="animate-fadeIn py-2">
      {/* Hero Section */}
      <div className="text-center mb-6">
        <div className="inline-block bg-[#E7FFE9] px-4 py-1.5 rounded-full mb-4">
          <span className="text-sm font-medium text-[#00B915]">EXCLUSIVE SIGN-UP OFFER</span>
        </div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Stop feeling overwhelmed with trading
        </h2>
        <p className="text-gray-600 text-sm max-w-md mx-auto">
          Get a comprehensive trading guide to identify profitable patterns and master risk management
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-gradient-to-br from-[#E7FFE9] to-white rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Guide Preview */}
          <div className="w-full md:w-1/2">
            <div className="relative">
              <img 
                src={withBase('/assets/custom_high.jpg')}
                alt="Trading Guide Preview"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                Worth $97
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="w-full md:w-1/2 space-y-4">
            <div className="inline-flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full mb-2">
              <CheckCircle size={16} className="text-[#00B915]" />
              <span className="text-sm">Content reviewed by experts</span>
            </div>

            <h3 className="font-bold text-gray-900">What you'll get:</h3>
            <ul className="space-y-3">
              {[
                'Step-by-step trading strategies',
                'Risk management framework',
                'Technical analysis fundamentals',
                'Trading psychology mastery',
                'Real market examples'
              ].map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <CheckCircle size={16} className="text-[#00B915]" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <SurveyButton onClick={onNext} className="w-full flex items-center justify-center gap-2">
              <BookOpen size={18} />
              Get Your Free Guide
            </SurveyButton>
          </div>
        </div>
      </div>

      {/* Trust Elements */}
      <div className="text-center space-y-2">
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <CheckCircle size={16} className="text-[#00B915]" />
            Instant access
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle size={16} className="text-[#00B915]" />
            No credit card
          </span>
        </div>
        <p className="text-xs text-gray-500">
          Join 50,000+ traders who have already downloaded the guide
        </p>
      </div>
    </div>
  );
};

export default FreeOnboardingStep;