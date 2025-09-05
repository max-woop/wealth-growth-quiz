import React, { useEffect } from 'react';
import { withBase } from '../../utils/imagePreloader';
import SurveyButton from '../SurveyButton';

interface TestimonialsStepProps {
  onNext: () => void;
}

const TestimonialsStep: React.FC<TestimonialsStepProps> = ({ onNext }) => {
  useEffect(() => {
    // Auto-advance after 5 seconds
    const timer = setTimeout(() => {
      onNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="animate-fadeIn py-2">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Join Over 1 Million Traders
        </h2>
        <p className="text-gray-600 text-sm">
          See why traders trust Libertex for their financial success
        </p>
      </div>

      {/* Loading Bar */}
      <div className="max-w-sm mx-auto mb-8">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#00B915] rounded-full animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Creating your personalized profile...
        </p>
      </div>

      {/* Testimonials */}
      <div className="space-y-4">
        {[
          {
            name: "Michael R.",
            role: "Professional Trader",
            image: withBase('/assets/custom_high.jpg'),
            text: "The personalized insights and strategies have completely transformed my approach to trading."
          },
          {
            name: "Sarah L.",
            role: "Retail Investor",
            image: withBase('/assets/custom_intermediate.jpg'),
            text: "Started with zero knowledge and now I'm confidently managing my portfolio."
          },
          {
            name: "David K.",
            role: "Business Owner",
            image: withBase('/assets/custom_intermediate-1.jpg'),
            text: "The risk management strategies helped me protect and grow my investments."
          }
        ].map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={testimonial.image} 
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-medium text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.role}</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">"{testimonial.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsStep;