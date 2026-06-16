import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">Đăng nhập</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">EMAIL CỬA HÀNG</label>
          <input
            type="email"
            placeholder="demo@serviceflow.com"
            defaultValue="demo@serviceflow.com"
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">MẬT KHẨU</label>
          <input
            type="password"
            placeholder="••••••••"
            defaultValue="123456"
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-2 rounded-lg text-sm transition-colors mt-2"
        >
          Đăng nhập hệ thống (Demo)
        </button>
      </form>
      <div className="mt-6 text-center text-xs text-slate-500">
        Chưa có tài khoản?{' '}
        <Link to={ROUTES.REGISTER} className="text-blue-500 hover:underline">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};
