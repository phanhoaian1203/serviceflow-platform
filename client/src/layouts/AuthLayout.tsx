import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';
import { AuthBrandPanel } from '../features/auth/components/AuthBrandPanel.tsx';
import { Logo } from './PublicLayout.tsx';

export const AuthLayout: React.FC = () => {
  const location = useLocation();
  const isRegister = location.pathname.includes(ROUTES.REGISTER);

  return (
    <div className="h-screen w-screen flex bg-white text-ink-black overflow-hidden font-saans relative selection:bg-default-violet selection:text-paper-white">
      
      {/* Left side: Premium Technical Branding (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-[50%] h-full relative flex-col justify-between p-12 border-r border-slate-100 bg-white overflow-hidden select-none">
        {/* Subtle grid background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none"></div>
        
        {/* Logo */}
        <div className="relative z-10">
          <Link to={ROUTES.LANDING} className="flex items-center gap-2.5 group">
            <Logo className="w-5 h-5" />
            <span className="text-sm font-bold tracking-logo uppercase text-ink-black font-nb-international">
              ServiceFlow
            </span>
          </Link>
        </div>

        {/* Feature Node Panel (Centered vertically) */}
        <div className="my-auto relative z-10 w-full flex justify-center">
          <AuthBrandPanel />
        </div>

        {/* Footer info */}
        <div className="relative z-10 text-xs text-carbon/50 flex justify-between">
          <span>© {new Date().getFullYear()} ServiceFlow Inc.</span>
          <span className="hover:text-ink-black cursor-pointer transition-colors hover:underline">Điều khoản & Bảo mật</span>
        </div>
      </div>

      {/* Right side: Modern Form Container */}
      <div className="w-full lg:w-[50%] h-full flex flex-col justify-center items-center px-6 py-12 relative bg-white overflow-y-auto z-10">
        <div className={`w-full ${isRegister ? 'max-w-[480px]' : 'max-w-[360px]'} space-y-6 transition-all duration-350`}>
          
          {/* Logo on Mobile only */}
          <div className="lg:hidden text-center mb-6">
            <Link to={ROUTES.LANDING} className="inline-flex flex-col items-center gap-1">
              <Logo className="w-6 h-6 mb-1" />
              <span className="text-lg font-bold tracking-logo uppercase text-ink-black font-nb-international">
                ServiceFlow
              </span>
            </Link>
            <p className="text-[11px] text-carbon mt-1">Hệ thống quản lý dịch vụ thông minh</p>
          </div>

          {/* Form Header */}
          <div className="space-y-2 text-left">
            <h2 className="text-3xl font-bold tracking-tight text-ink-black font-nb-international uppercase">
              {isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập hệ thống'}
            </h2>
            <p className="text-xs text-carbon leading-relaxed">
              {isRegister 
                ? 'Bắt đầu số hóa và chuẩn hóa quy trình vận hành dịch vụ của bạn.'
                : 'Nhập thông tin xác thực tài khoản để tiếp tục vào trang quản lý.'}
            </p>
          </div>

          {/* Borderless flat form section */}
          <div className="relative pt-2">
            <Outlet />
          </div>
          
        </div>
      </div>
    </div>
  );
};
