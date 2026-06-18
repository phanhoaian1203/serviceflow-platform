import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-ink-black text-center px-4 font-saans selection:bg-default-violet selection:text-paper-white">
      <div className="text-8xl font-bold font-nb-international text-ink-black/15 mb-4 tracking-[-0.02em] leading-none uppercase">404</div>
      <h2 className="text-xl font-bold mb-2 tracking-[-0.02em] text-ink-black font-nb-international uppercase">Trang không tồn tại</h2>
      <p className="text-carbon text-sm max-w-md mb-8">
        Đường dẫn bạn yêu cầu không khả dụng. Vui lòng quay lại trang chủ.
      </p>
      <Link
        to={ROUTES.LANDING}
        className="px-6 py-3 bg-default-violet hover:bg-default-violet/95 text-paper-white font-semibold rounded-lg text-xs tracking-nav uppercase transition-all active:scale-[0.98] flex items-center gap-1.5"
      >
        Về trang chủ <span className="font-mono">→</span>
      </Link>
    </div>
  );
};
