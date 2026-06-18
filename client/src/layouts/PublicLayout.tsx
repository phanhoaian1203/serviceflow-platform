import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={`${className} text-default-violet shrink-0`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 6.5H14C15.1046 6.5 16 7.39543 16 8.5V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const PublicLayout: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 38) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-ink-black font-saans selection:bg-default-violet selection:text-paper-white">
      {/* Announcement Bar - Placed absolute at the top */}
      <div className="absolute top-0 left-0 right-0 w-full h-[38px] bg-white border-b border-slate-100/85 flex items-center justify-center text-center z-50">
        <span className="text-[11px] font-bold tracking-nav uppercase text-carbon">
          📢 Giới thiệu ServiceFlow v1.0 • <span className="font-normal normal-case text-carbon/80">Hệ thống quản lý dịch vụ đa ngành tinh gọn dành cho doanh nghiệp nhỏ.</span>
        </span>
      </div>

      {/* Top Navigation - Sticky on scroll */}
      <header className={`transition-all duration-300 z-45 ${
        isScrolled 
          ? 'fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-slate-100/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] py-1' 
          : 'absolute top-[38px] left-0 right-0 bg-transparent py-0'
      }`}>
        <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between w-full">
          <Link to={ROUTES.LANDING} className="flex items-center gap-2.5 group">
            <Logo className="w-5 h-5 text-default-violet" />
            <span className="text-base font-bold tracking-logo uppercase text-ink-black font-nb-international">
              ServiceFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/#presets" className="text-[12px] font-bold tracking-nav uppercase text-ink-black/80 hover:text-default-violet transition-colors">
              Mô hình dịch vụ
            </a>
            <a href="/#features" className="text-[12px] font-bold tracking-nav uppercase text-ink-black/80 hover:text-default-violet transition-colors">
              Tính năng
            </a>
            <a href="/#workflow" className="text-[12px] font-bold tracking-nav uppercase text-ink-black/80 hover:text-default-violet transition-colors">
              Quy trình
            </a>
            <a href="/#faq" className="text-[12px] font-bold tracking-nav uppercase text-ink-black/80 hover:text-default-violet transition-colors">
              Hỏi đáp
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to={ROUTES.LOGIN} className="text-[12px] font-bold tracking-nav uppercase text-ink-black hover:text-default-violet hover:underline underline-offset-4 transition-all">
              Đăng nhập
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className="text-[12px] font-bold tracking-nav uppercase bg-default-violet hover:bg-default-violet/90 text-paper-white px-5 py-2.5 rounded-lg transition-all duration-200"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      {/* Main Page Content - Starts from y=0 for a full screen banner background */}
      <main className="flex-grow bg-white">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white text-carbon/60 border-t border-slate-100 py-12 z-10">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <Logo className="w-5 h-5 text-default-violet" />
            <span className="text-base font-bold tracking-logo uppercase text-ink-black font-nb-international">
              ServiceFlow
            </span>
          </div>
          <p className="text-xs text-carbon/50">
            © {new Date().getFullYear()} ServiceFlow Platform. Mọi quyền được bảo lưu.
          </p>
          <div className="flex space-x-6 text-xs text-carbon/50">
            <span className="hover:text-ink-black cursor-pointer transition-colors hover:underline">Điều khoản dịch vụ</span>
            <span className="hover:text-ink-black cursor-pointer transition-colors hover:underline">Chính sách bảo mật</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
