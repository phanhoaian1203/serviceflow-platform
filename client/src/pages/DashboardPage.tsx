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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Tổng quan Vận hành</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-xs font-semibold uppercase">Yêu cầu mới (Hôm nay)</div>
          <div className="text-3xl font-extrabold mt-2 text-blue-500">0</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-xs font-semibold uppercase">Đang sửa chữa</div>
          <div className="text-3xl font-extrabold mt-2 text-yellow-500">0</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-xs font-semibold uppercase">Chờ duyệt báo giá</div>
          <div className="text-3xl font-extrabold mt-2 text-purple-500">0</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="text-slate-500 text-xs font-semibold uppercase">Doanh thu tháng này</div>
          <div className="text-3xl font-extrabold mt-2 text-emerald-500">0 đ</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
        <h3 className="text-lg font-bold mb-4">Trạng thái kết nối Hệ thống (API)</h3>
        {loading ? (
          <p className="text-slate-400 text-sm">Đang tải kết nối Backend...</p>
        ) : systemInfo ? (
          <div className="space-y-2 text-sm text-slate-300">
            <div><span className="text-slate-500">API Status:</span> <span className="text-emerald-500 font-semibold">Online</span></div>
            <div><span className="text-slate-500">Dịch vụ:</span> {systemInfo.serviceName}</div>
            <div><span className="text-slate-500">Phiên bản:</span> {systemInfo.version}</div>
            <div><span className="text-slate-500">Môi trường:</span> {systemInfo.environment}</div>
          </div>
        ) : (
          <div className="text-red-400 text-sm">
            Không thể kết nối đến Backend API. Vui lòng kiểm tra xem server đã khởi động ở http://localhost:5000 chưa.
          </div>
        )}
      </div>
    </div>
  );
};
