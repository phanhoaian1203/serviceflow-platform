import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate(ROUTES.LANDING);
  };

  return (
    <div className="min-h-screen flex bg-slate-950 text-slate-100">
      <aside className="w-64 border-r border-slate-800 bg-slate-900 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link to={ROUTES.LANDING} className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
            ServiceFlow
          </Link>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <Link
            to={ROUTES.DASHBOARD}
            className="flex items-center space-x-3 px-4 py-2.5 rounded-lg bg-blue-600/10 text-blue-400 font-medium"
          >
            <span>Dashboard</span>
          </Link>
          <div className="text-xs font-semibold text-slate-500 uppercase px-4 pt-4 pb-2">
            Quản trị cửa hàng
          </div>
          <div className="px-4 py-2 text-sm text-slate-400 italic">
            Các chức năng sẽ mở trong các Phase tiếp theo
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-sm font-medium bg-slate-800 hover:bg-red-900/30 hover:text-red-400 rounded-lg transition-all"
          >
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="flex-grow flex flex-col">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 flex items-center justify-between px-8">
          <div className="text-sm font-medium text-slate-400">Workspace: ABC Laptop Repair</div>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium">Chủ cửa hàng (Demo)</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-sm">
              C
            </div>
          </div>
        </header>
        <main className="flex-grow p-8 bg-slate-950">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
