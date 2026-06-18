import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';
import { useAuth } from '../features/auth/auth.context.tsx';
import { Logo } from './PublicLayout.tsx';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.LANDING);
    } catch (err) {
      console.error('Logout error:', err);
      navigate(ROUTES.LANDING);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-ink-black font-saans selection:bg-default-violet selection:text-paper-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-100 bg-white flex flex-col justify-between">
        <div>
          {/* Sidebar Header */}
          <div className="h-16 flex items-center px-6 border-b border-slate-100">
            <Link to={ROUTES.LANDING} className="flex items-center gap-2.5">
              <Logo className="w-5 h-5" />
              <span className="text-base font-bold tracking-logo uppercase text-ink-black font-nb-international">
                ServiceFlow
              </span>
            </Link>
          </div>
          
          {/* Sidebar Nav */}
          <nav className="p-4 space-y-4">
            <div className="space-y-1">
              <Link
                to={ROUTES.DASHBOARD}
                className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-default-violet text-paper-white text-xs font-bold tracking-nav uppercase transition-all shadow-none"
              >
                <span>📊 Dashboard</span>
              </Link>
            </div>
            
            <div className="space-y-2">
              <div className="text-[9px] font-bold text-carbon/50 uppercase tracking-nav px-4">
                Quản trị dịch vụ
              </div>
              <div className="px-4 py-1 text-xs text-carbon/60 italic leading-relaxed font-normal">
                Các phân hệ chức năng sẽ mở trong các Phase tiếp theo
              </div>
            </div>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-xs font-bold border border-slate-200 hover:border-slate-400 text-ink-black rounded-lg tracking-nav uppercase transition-all cursor-pointer text-center"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex-grow flex flex-col">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-100 bg-white/90 backdrop-blur-md flex items-center justify-between px-8">
          <div className="text-[10px] font-bold text-carbon uppercase tracking-nav">
            Workspace: ServiceFlow Demo Workspace
          </div>
          
          <div className="flex items-center space-x-3">
            <span className="text-xs font-bold text-ink-black">{user?.fullName || 'Chủ doanh nghiệp'}</span>
            <div className="w-8 h-8 rounded-lg bg-default-violet text-paper-white flex items-center justify-center font-bold text-xs select-none">
              {(user?.fullName || 'C')[0].toUpperCase()}
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-grow p-8 bg-slate-50/50 overflow-y-auto">
          <div className="max-w-[1200px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
