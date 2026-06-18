import React, { useState, useEffect } from 'react';

export const DashboardPage: React.FC = () => {
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL;
    fetch(`${apiBase}/system/info`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.success) {
          setSystemInfo(resJson.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('API connection failed:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8 font-saans">
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-carbon uppercase tracking-nav">Vận hành tổng quan</span>
        <h2 className="text-3xl font-bold tracking-[-0.02em] text-ink-black font-nb-international uppercase">Bảng điều khiển</h2>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-none">
          <div className="text-carbon text-[9px] font-bold uppercase tracking-nav">Yêu cầu mới (Hôm nay)</div>
          <div className="text-3xl font-bold tracking-tight text-ink-black font-nb-international mt-2">0</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-none">
          <div className="text-carbon text-[9px] font-bold uppercase tracking-nav">Đang thực hiện</div>
          <div className="text-3xl font-bold tracking-tight text-ink-black font-nb-international mt-2">0</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-none">
          <div className="text-carbon text-[9px] font-bold uppercase tracking-nav">Chờ duyệt báo giá</div>
          <div className="text-3xl font-bold tracking-tight text-ink-black font-nb-international mt-2">0</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-none">
          <div className="text-carbon text-[9px] font-bold uppercase tracking-nav">Doanh thu tháng này</div>
          <div className="text-3xl font-bold tracking-tight text-ink-black font-nb-international mt-2">0 đ</div>
        </div>
      </div>

      {/* API Connection Health Block */}
      <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-none max-w-2xl">
        <h3 className="text-sm font-bold text-ink-black uppercase tracking-nav mb-4">Trạng thái kết nối Hệ thống (API)</h3>
        {loading ? (
          <div className="flex items-center gap-2.5 text-xs text-carbon">
            <div className="w-3.5 h-3.5 border-2 border-slate-250 border-t-default-violet rounded-full animate-spin"></div>
            <span>Đang kiểm tra kết nối Backend...</span>
          </div>
        ) : systemInfo ? (
          <div className="space-y-3 text-xs text-carbon">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-bold text-ink-black">API Online</span>
            </div>
            <div className="grid grid-cols-2 gap-y-2 border-t border-slate-150 pt-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-nav text-carbon block">Dịch vụ</span>
                <span className="font-semibold text-ink-black">{systemInfo.serviceName}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-nav text-carbon block">Phiên bản</span>
                <span className="font-semibold text-ink-black">{systemInfo.version}</span>
              </div>
              <div className="mt-2">
                <span className="text-[10px] font-bold uppercase tracking-nav text-carbon block">Môi trường</span>
                <span className="font-semibold text-ink-black">{systemInfo.environment}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5 text-xs text-red-650 bg-red-500/5 border border-red-500/20 rounded-lg p-4">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="leading-relaxed font-medium">
              Không thể kết nối đến Backend API. Vui lòng kiểm tra xem server đã khởi động ở http://localhost:5000 chưa.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
