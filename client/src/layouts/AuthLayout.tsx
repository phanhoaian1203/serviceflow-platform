import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to={ROUTES.LANDING} className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            ServiceFlow
          </Link>
          <p className="mt-2 text-sm text-slate-400">Hệ thống quản lý vận hành dịch vụ thông minh</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
