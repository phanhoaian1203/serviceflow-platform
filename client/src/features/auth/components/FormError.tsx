import React from 'react';

interface FormErrorProps {
  message: string | null;
}

export const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="p-3.5 rounded-lg bg-red-500/5 border border-red-500/20 text-xs text-red-650 flex items-start gap-2.5 animate-shake font-saans">
      <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span className="leading-relaxed font-medium">{message}</span>
    </div>
  );
};
