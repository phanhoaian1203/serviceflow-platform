import React from 'react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  loadingText: string;
  defaultText: string;
  disabled?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  loadingText,
  defaultText,
  disabled = false
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className="w-full bg-default-violet hover:bg-default-violet/90 text-paper-white font-semibold py-2.5 rounded-lg text-xs tracking-nav uppercase transition-all duration-200 mt-2 active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
    >
      {isSubmitting ? (
        <>
          <div className="w-4 h-4 border-2 border-paper-white/20 border-t-paper-white rounded-full animate-spin"></div>
          <span>{loadingText}</span>
        </>
      ) : (
        <span className="flex items-center gap-1.5">
          {defaultText} <span className="font-mono">→</span>
        </span>
      )}
    </button>
  );
};
