import React from 'react';

interface AuthLoadingScreenProps {
  message?: string;
  submessage?: string;
}

export const AuthLoadingScreen: React.FC<AuthLoadingScreenProps> = ({
  message = 'Đang kiểm tra phiên đăng nhập...',
  submessage = 'Vui lòng chờ trong giây lát.'
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-ink-black relative overflow-hidden font-saans selection:bg-default-violet selection:text-paper-white">
      <div className="relative p-8 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center w-80 shadow-none text-center">
        {/* Brand Logo */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-base font-bold tracking-logo uppercase text-ink-black font-nb-international">
            ServiceFlow
          </span>
        </div>

        {/* Spinner */}
        <div className="relative w-10 h-10 mb-5 flex items-center justify-center">
          <div className="absolute w-full h-full border-2 border-slate-200 border-t-default-violet rounded-full animate-spin"></div>
        </div>

        {/* Text messages */}
        <p className="text-[10px] font-bold tracking-nav text-ink-black/80 uppercase animate-pulse">
          {message}
        </p>
        <p className="text-xs text-carbon/60 mt-1.5">
          {submessage}
        </p>
      </div>
    </div>
  );
};
