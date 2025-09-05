import React from 'react';

interface GenderStepProps {
  onNext: (gender: string) => void;
}

const GenderStep: React.FC<GenderStepProps> = ({ onNext }) => {
  const genderOptions = [
    {
      value: "Male",
      image: "https://images.pexels.com/photos/937481/pexels-photo-937481.jpeg?auto=compress&cs=tinysrgb&w=120",
      emoji: "👨"
    },
    {
      value: "Female",
      image: "https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg?auto=compress&cs=tinysrgb&w=120",
      emoji: "👩"
    }
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-8 text-center text-gray-900">
        What is your gender?
      </h2>
      
      <div className="space-y-4">
        {genderOptions.map((option) => (
          <button 
            key={option.value}
            onClick={() => onNext(option.value)}
            className="w-full p-6 bg-white border-2 border-gray-100 rounded-xl cursor-pointer
                      hover:border-[#4F46E5] hover:bg-[#F8F7FF] transition-all duration-200
                      flex items-center justify-between group"
          >
            <div className="flex items-center">
              <span className="text-lg text-gray-700 text-left group-hover:text-[#4F46E5]">{option.value}</span>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-4">{option.emoji}</span>
              <img 
                src={option.image} 
                alt="" 
                className="w-16 h-16 object-cover rounded-lg"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenderStep;