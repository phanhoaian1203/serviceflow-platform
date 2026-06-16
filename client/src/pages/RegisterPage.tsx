import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-6">Đăng ký cửa hàng</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">TÊN CỬA HÀNG</label>
          <input
            type="text"
            placeholder="ABC Laptop Repair"
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">EMAIL ĐĂNG KÝ</label>
          <input
            type="email"
            placeholder="owner@abc-repair.com"
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1.5">MẬT KHẨU</label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-500 font-semibold py-2 rounded-lg text-sm transition-colors mt-2"
        >
          Tạo tài khoản & Workspace (Demo)
        </button>
      </form>
      <div className="mt-6 text-center text-xs text-slate-500">
        Đã có tài khoản?{' '}
        <Link to={ROUTES.LOGIN} className="text-blue-500 hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  );
};
