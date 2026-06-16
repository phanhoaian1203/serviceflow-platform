import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 text-center px-4">
      <div className="text-6xl font-extrabold text-blue-500 mb-4">404</div>
      <h2 className="text-2xl font-bold mb-2">Trang không tồn tại</h2>
      <p className="text-slate-400 text-sm max-w-md mb-8">
        Đường dẫn bạn yêu cầu không khả dụng. Vui lòng quay lại trang chủ.
      </p>
      <Link
        to={ROUTES.LANDING}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-lg text-sm transition-colors"
      >
        Về trang chủ
      </Link>
    </div>
  );
};
