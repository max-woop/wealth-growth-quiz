import React from 'react';
import { Shield, Target, Users, BookOpen, BarChart3, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import SurveyButton from '../SurveyButton';

interface PlatformBenefitsStepProps {
  onNext: () => void;
  variant?: 1 | 2 | 3;
}

const PlatformBenefitsStep: React.FC<PlatformBenefitsStepProps> = ({ onNext, variant = 1 }) => {
  const renderContent = () => {
    switch (variant) {
      case 1:
        return (
          <>
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-4">
                <Target size={32} className="text-blue-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Ready to Make Your First Trade?
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Start with $10,000 in virtual money and learn without risk
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Risk-Free Practice</h3>
                    <p className="text-sm text-gray-600">Perfect your strategy with virtual trading</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Expert Guidance</h3>
                    <p className="text-sm text-gray-600">Learn from successful traders' strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                <Shield size={32} className="text-purple-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Trade Like a Pro
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Advanced tools that help you make smarter trading decisions
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Smart Protection</h3>
                      <p className="text-sm text-gray-600">Never miss a stop-loss with automated tools</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">Market Scanner</h3>
                      <p className="text-sm text-gray-600">Spot opportunities before others</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <div className="text-center mb-8">
              <div className="inline-block p-3 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full mb-4">
                <Users size={32} className="text-green-600" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Never Trade Alone
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Join thousands of traders who share strategies and success
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <Users className="h-8 w-8 text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Trading Community</h3>
                    <ul className="space-y-2">
                      {[
                        'Watch live trading sessions',
                        'Get real-time market insights',
                        'Share winning strategies',
                        'Learn from top performers'
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="animate-fadeIn">
      {renderContent()}
      
      <div className="flex justify-center">
        <SurveyButton 
          onClick={onNext}
          className="px-8"
        >
          Continue Your Journey
        </SurveyButton>
      </div>
    </div>
  );
};

export default PlatformBenefitsStep;