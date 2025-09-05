import React from 'react';
import { Users, Star, TrendingUp, BarChart3, BookOpen, Shield } from 'lucide-react';
import SurveyButton from '../SurveyButton';

interface SocialProofStepProps {
  onNext: () => void;
  onPrevious: () => void;
}

const SocialProofStep: React.FC<SocialProofStepProps> = ({ onNext, onPrevious }) => {
  return (
    <div className="animate-fadeIn text-center">
      <div className="mb-8">
        <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
          <Users size={32} className="text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold mb-4 text-gray-900">
          Join Our Trading Community
        </h2>
        <p className="text-gray-600">
          Discover why 50,000+ traders trust our platform
        </p>
      </div>

      <div className="grid gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt="Trader"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-3 text-left">
                <p className="font-semibold">Michael S.</p>
                <p className="text-sm text-gray-500">Professional Trader</p>
              </div>
            </div>
            <div className="flex text-yellow-400">
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
              <Star size={20} fill="currentColor" />
            </div>
          </div>
          <p className="text-gray-600 text-left">
            "The personalized insights and trading strategies have completely transformed my approach to the markets."
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-xl">
            <div className="flex flex-col items-center">
              <BarChart3 className="h-8 w-8 text-blue-600 mb-2" />
              <p className="font-bold text-blue-900">Advanced Analytics</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl">
            <div className="flex flex-col items-center">
              <BookOpen className="h-8 w-8 text-purple-600 mb-2" />
              <p className="font-bold text-purple-900">Expert Guidance</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl">
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <p className="font-bold text-green-900">Risk Management</p>
            </div>
          </div>
        </div>
      </div>

      <SurveyButton onClick={onNext} className="px-12">
        Continue
      </SurveyButton>
    </div>
  );
};

export default SocialProofStep;