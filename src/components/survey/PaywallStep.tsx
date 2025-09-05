import React from 'react';
import { CheckCircle, Lock, Shield, BookOpen, TrendingUp, Users } from 'lucide-react';
import SurveyButton from '../SurveyButton';

interface PaywallStepProps {
  onContinue: () => void;
  onSkip: () => void;
}

const PaywallStep: React.FC<PaywallStepProps> = ({ onContinue, onSkip }) => {
  return (
    <div className="animate-fadeIn">
      <div className="text-center mb-8">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <Lock size={32} className="text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Choose Your Trading Journey
        </h2>
        <p className="text-gray-600 mb-8">
          Select the plan that best fits your trading goals
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg border-2 border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Free Plan</h3>
            <span className="text-gray-500">$0</span>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-600">
              <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0" />
              <span>Basic trading profile analysis</span>
            </li>
            <li className="flex items-center text-gray-600">
              <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0" />
              <span>Essential trading tips</span>
            </li>
            <li className="flex items-center text-gray-600">
              <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0" />
              <span>Market basics guide</span>
            </li>
            <li className="flex items-center text-gray-600">
              <CheckCircle size={20} className="text-green-500 mr-2 flex-shrink-0" />
              <span>Community access</span>
            </li>
          </ul>
          <SurveyButton onClick={onSkip} isPrimary={false} className="w-full">
            Start with Free
          </SurveyButton>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl shadow-lg border-2 border-blue-200 relative overflow-hidden">
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Recommended
          </div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">Premium</h3>
            <span className="text-blue-900 font-bold">$97</span>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start text-gray-700">
              <Shield size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span>Advanced risk management strategies</span>
            </li>
            <li className="flex items-start text-gray-700">
              <BookOpen size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span>Professional trading course ($497 value)</span>
            </li>
            <li className="flex items-start text-gray-700">
              <TrendingUp size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span>Real-time trade alerts & analysis</span>
            </li>
            <li className="flex items-start text-gray-700">
              <Users size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span>1-on-1 mentoring session</span>
            </li>
            <li className="flex items-start text-gray-700">
              <CheckCircle size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span>Premium Discord community</span>
            </li>
            <li className="flex items-start text-gray-700">
              <CheckCircle size={20} className="text-blue-600 mr-2 mt-1 flex-shrink-0" />
              <span>Weekly market analysis calls</span>
            </li>
          </ul>
          <SurveyButton onClick={onContinue} className="w-full">
            Upgrade to Premium
          </SurveyButton>
        </div>
      </div>

      <p className="text-center text-sm text-gray-500">
        30-day money-back guarantee • Secure payment • Instant access
      </p>
    </div>
  );
};

export default PaywallStep;