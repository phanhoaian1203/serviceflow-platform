import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const LandingPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Quản lý vận hành dịch vụ <br />
        <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Thông minh & Minh bạch
        </span>
      </h1>
      <p className="mt-6 text-xl text-slate-400 max-w-3xl">
        ServiceFlow biến cuộc trò chuyện từ Zalo, Facebook, điện thoại thành các phiếu dịch vụ có quy trình rõ ràng, ảnh minh chứng cụ thể và bảo hành điện tử tiện lợi.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to={ROUTES.REGISTER}
          className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold rounded-xl text-lg shadow-lg hover:shadow-indigo-500/20 transition-all text-center"
        >
          Bắt đầu dùng thử miễn phí
        </Link>
        <Link
          to={ROUTES.LOGIN}
          className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-lg transition-all text-center border border-slate-700"
        >
          Đăng nhập chủ cửa hàng
        </Link>
      </div>
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
          <div className="text-blue-500 text-3xl mb-4">⚙️</div>
          <h3 className="text-lg font-bold">Quy trình tối giản</h3>
          <p className="mt-2 text-slate-400 text-sm">Tiếp nhận nhanh chóng từ Zalo, Facebook, khách trực tiếp và cấp mã phiếu ngay.</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
          <div className="text-indigo-500 text-3xl mb-4">📸</div>
          <h3 className="text-lg font-bold">Minh chứng hình ảnh</h3>
          <p className="mt-2 text-slate-400 text-sm">Lưu trữ ảnh tình trạng máy trước và sau khi sửa để đảm bảo tin cậy 100%.</p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all">
          <div className="text-purple-500 text-3xl mb-4">🛡️</div>
          <h3 className="text-lg font-bold">Bảo hành điện tử</h3>
          <p className="mt-2 text-slate-400 text-sm">Khách hàng dễ dàng tra cứu hạn bảo hành bằng SĐT hoặc mã phiếu trực tuyến.</p>
        </div>
      </div>
    </div>
  );
};
