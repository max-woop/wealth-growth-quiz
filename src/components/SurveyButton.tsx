// @ts-nocheck
/** @jsxImportSource react */
interface SurveyButtonProps {
  onClick?: () => void;
  children: any;
  isPrimary?: boolean;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

const SurveyButton = ({
  onClick,
  children,
  isPrimary = true,
  disabled = false,
  className = '',
  type = 'button',
}: SurveyButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${isPrimary 
          ? 'bg-[#FF6B00] hover:bg-[#FF8533] text-white' 
          : 'bg-white border border-gray-200 hover:border-[#FF6B00] hover:text-[#FF6B00] text-gray-700'}
        px-8 py-4 rounded-lg font-medium transition-all duration-300
        text-lg md:text-xl w-full sm:w-auto min-w-[140px]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SurveyButton;