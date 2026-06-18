import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.ts';

export const LandingPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="bg-white text-ink-black relative overflow-hidden selection:bg-default-violet selection:text-paper-white font-saans">
      {/* Background Grid Pattern for Technical Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="max-w-[1200px] mx-auto px-6 h-screen min-h-[620px] lg:h-screen lg:min-h-[720px] flex items-center pt-[115px] pb-12 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-8 space-y-8 text-left my-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold bg-ink-black/5 border border-ink-black/10 text-carbon rounded-full uppercase tracking-nav">
            ⚙️ Revenue-Grade Service Automation
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[0.97] text-ink-black font-nb-international uppercase">
            Quản lý toàn bộ <br />
            quy trình dịch vụ <br />
            <span className="text-default-violet">Từ Tiếp Nhận Đến Bàn Giao</span>
          </h1>

          <p className="text-base md:text-lg text-carbon max-w-2xl leading-relaxed font-normal">
            ServiceFlow là hệ thống bản vẽ vận hành dịch vụ giúp các doanh nghiệp dịch vụ nhỏ (sửa chữa, spa, studio, salon, vệ sinh) số hóa yêu cầu khách hàng, lịch hẹn, gửi báo giá trực tuyến, theo dõi tiến độ xử lý và chăm sóc sau dịch vụ.
          </p>

          <div className="flex flex-col space-y-4 pt-2 max-w-sm">
            <Link
              to={ROUTES.REGISTER}
              className="bg-default-violet hover:bg-default-violet/95 text-paper-white px-8 py-4 rounded-lg text-sm font-semibold tracking-nav uppercase text-center transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-1.5"
            >
              Bắt đầu dùng thử miễn phí <span className="font-mono">→</span>
            </Link>
            <Link
              to={ROUTES.LOGIN}
              className="bg-transparent hover:bg-ink-black/5 text-ink-black border border-ink-black px-8 py-4 rounded-lg text-sm font-semibold tracking-nav uppercase text-center transition-all duration-200 active:scale-[0.98]"
            >
              Đăng nhập quản trị viên
            </Link>
          </div>
        </div>
        
        {/* Editorial Blueprint Preview (4 columns on right) */}
        <div className="hidden lg:flex lg:col-span-4 h-full items-center justify-center relative">
          <div className="border border-slate-200 bg-white p-2 rounded-lg shadow-none rotate-1 hover:rotate-0 transition-transform duration-500 w-full relative">
            <img 
              src="/dashboard_mockup.png" 
              alt="ServiceFlow Dashboard Mockup" 
              className="w-full border border-slate-100 rounded-md shadow-none block" 
            />
          </div>
        </div>
      </section>

      {/* Industry Preset Section */}
      <section id="presets" className="border-t border-slate-100 bg-slate-50/20 py-24 relative z-10 -mx-6 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-left max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-bold text-default-violet uppercase tracking-nav">Cấu hình linh hoạt</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.0] text-ink-black font-nb-international uppercase">
              Thiết kế cho đa dạng mô hình dịch vụ
            </h2>
            <p className="text-sm md:text-base text-carbon max-w-2xl leading-relaxed">
              Dù doanh nghiệp của bạn hoạt động trong lĩnh vực nào, ServiceFlow đều cung cấp một quy trình vận hành tinh gọn và phù hợp thông qua các cấu hình Preset.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Repair Shops */}
            <div className="bg-white border border-slate-200 hover:border-default-violet/40 p-8 rounded-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-ink-black text-2xl mb-6 group-hover:bg-default-violet/10 group-hover:border-default-violet/20 transition-colors duration-200">🔧</div>
                <h3 className="text-lg font-bold text-ink-black tracking-tight font-nb-international uppercase">Cửa hàng Sửa chữa</h3>
                <p className="mt-3 text-xs md:text-sm text-carbon leading-relaxed font-normal">
                  Quản lý phiếu dịch vụ laptop, điện thoại. Đánh giá lỗi ban đầu, gửi báo giá linh kiện chi tiết, phân công kỹ thuật viên phụ trách và cấp bảo hành điện tử tiện lợi.
                </p>
              </div>
              <span className="mt-8 text-xs font-bold tracking-nav uppercase text-default-violet hover:underline inline-flex items-center gap-1.5 cursor-pointer">
                Xem Preset nghiệp vụ <span className="font-mono">→</span>
              </span>
            </div>

            {/* Spa & Beauty */}
            <div className="bg-white border border-slate-200 hover:border-default-violet/40 p-8 rounded-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-ink-black text-2xl mb-6 group-hover:bg-default-violet/10 group-hover:border-default-violet/20 transition-colors duration-200">💆</div>
                <h3 className="text-lg font-bold text-ink-black tracking-tight font-nb-international uppercase">Spa & Trị liệu</h3>
                <p className="mt-3 text-xs md:text-sm text-carbon leading-relaxed font-normal">
                  Lập lịch đặt chỗ khách hàng, phân phối nhân viên trị liệu, quản lý liệu trình chăm sóc da chuyên sâu, theo dõi đợt thanh toán và chăm sóc định kỳ sau liệu trình.
                </p>
              </div>
              <span className="mt-8 text-xs font-bold tracking-nav uppercase text-default-violet hover:underline inline-flex items-center gap-1.5 cursor-pointer">
                Xem Preset nghiệp vụ <span className="font-mono">→</span>
              </span>
            </div>

            {/* Photo Studios */}
            <div className="bg-white border border-slate-200 hover:border-default-violet/40 p-8 rounded-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-ink-black text-2xl mb-6 group-hover:bg-default-violet/10 group-hover:border-default-violet/20 transition-colors duration-200">📸</div>
                <h3 className="text-lg font-bold text-ink-black tracking-tight font-nb-international uppercase">Studio Hình ảnh</h3>
                <p className="mt-3 text-xs md:text-sm text-carbon leading-relaxed font-normal">
                  Tiếp nhận lịch đặt, tư vấn gói chụp ảnh/quay phim, gửi báo giá gói dịch vụ, quản lý tiến độ thiết kế hậu kỳ sản phẩm và bàn giao ảnh gốc hoặc ảnh chỉnh sửa qua drive bảo mật.
                </p>
              </div>
              <span className="mt-8 text-xs font-bold tracking-nav uppercase text-default-violet hover:underline inline-flex items-center gap-1.5 cursor-pointer">
                Xem Preset nghiệp vụ <span className="font-mono">→</span>
              </span>
            </div>

            {/* Salons */}
            <div className="bg-white border border-slate-200 hover:border-default-violet/40 p-8 rounded-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-ink-black text-2xl mb-6 group-hover:bg-default-violet/10 group-hover:border-default-violet/20 transition-colors duration-200">✂️</div>
                <h3 className="text-lg font-bold text-ink-black tracking-tight font-nb-international uppercase">Salon Làm đẹp</h3>
                <p className="mt-3 text-xs md:text-sm text-carbon leading-relaxed font-normal">
                  Quản lý bảng dịch vụ (cắt, nhuộm tóc, làm nail), sắp xếp lịch làm việc cho stylist, ghi nhận thanh toán nhanh và lưu trữ hồ sơ thiết kế kiểu dáng khách hàng ưa thích.
                </p>
              </div>
              <span className="mt-8 text-xs font-bold tracking-nav uppercase text-default-violet hover:underline inline-flex items-center gap-1.5 cursor-pointer">
                Xem Preset nghiệp vụ <span className="font-mono">→</span>
              </span>
            </div>

            {/* Cleaning Services */}
            <div className="bg-white border border-slate-200 hover:border-default-violet/40 p-8 rounded-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-ink-black text-2xl mb-6 group-hover:bg-default-violet/10 group-hover:border-default-violet/20 transition-colors duration-200">🧹</div>
                <h3 className="text-lg font-bold text-ink-black tracking-tight font-nb-international uppercase">Dịch vụ Vệ sinh</h3>
                <p className="mt-3 text-xs md:text-sm text-carbon leading-relaxed font-normal">
                  Nhận yêu cầu làm sạch căn hộ, văn phòng. Báo giá tự động theo diện tích m², phân công ca trực nhân viên và lưu trữ hình ảnh hiện trạng nghiệm thu trước và sau khi thực hiện.
                </p>
              </div>
              <span className="mt-8 text-xs font-bold tracking-nav uppercase text-default-violet hover:underline inline-flex items-center gap-1.5 cursor-pointer">
                Xem Preset nghiệp vụ <span className="font-mono">→</span>
              </span>
            </div>

            {/* Maintenance Services */}
            <div className="bg-white border border-slate-200 hover:border-default-violet/40 p-8 rounded-lg transition-all duration-200 flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-ink-black text-2xl mb-6 group-hover:bg-default-violet/10 group-hover:border-default-violet/20 transition-colors duration-200">⚙️</div>
                <h3 className="text-lg font-bold text-ink-black tracking-tight font-nb-international uppercase">Dịch vụ Bảo trì</h3>
                <p className="mt-3 text-xs md:text-sm text-carbon leading-relaxed font-normal">
                  Khảo sát thiết bị cơ điện, điện nước. Lập ước tính chi phí vật tư phát sinh thực tế, theo dõi điều phối thợ kỹ thuật hiện trường và đặt lịch hẹn nhắc nhở bảo dưỡng định kỳ.
                </p>
              </div>
              <span className="mt-8 text-xs font-bold tracking-nav uppercase text-default-violet hover:underline inline-flex items-center gap-1.5 cursor-pointer">
                Xem Preset nghiệp vụ <span className="font-mono">→</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      <section id="features" className="py-24 bg-white border-t border-slate-100 relative z-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-left max-w-3xl mb-16 space-y-3">
            <span className="text-xs font-bold text-default-violet uppercase tracking-nav">Giải pháp vận hành</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.0] text-ink-black font-nb-international uppercase">
              Bộ công cụ số hóa quy trình toàn diện
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Card 1: Flat White bordered Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-12 flex flex-col justify-between h-[480px] relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold text-default-violet uppercase tracking-nav">Đồng thuận trực tuyến</span>
                <h3 className="text-2xl font-bold text-ink-black font-nb-international uppercase tracking-tight">Báo giá & Phê duyệt</h3>
                <p className="text-carbon text-xs md:text-sm max-w-md leading-relaxed font-normal">
                  Gửi báo giá minh bạch qua liên kết bảo mật. Khách hàng có thể phê duyệt hoặc gửi phản hồi chỉnh sửa ngay trên trình duyệt di động mà không cần tải ứng dụng.
                </p>
              </div>
              {/* Simulated Screenshot Mockup */}
              <div className="bg-slate-50 rounded-t-lg p-4 border-t border-x border-slate-200 translate-y-6 group-hover:translate-y-2 transition-transform duration-500 w-[90%] mx-auto font-saans">
                <div className="flex justify-between items-center pb-3 border-b border-ink-black/15">
                  <span className="text-[10px] font-bold text-ink-black uppercase tracking-nav">Báo giá dịch vụ</span>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-default-violet/10 text-default-violet uppercase tracking-nav">Chờ khách duyệt</span>
                </div>
                <div className="py-3 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span>Hạng mục liệu trình chuyên sâu</span>
                    <span className="font-semibold text-ink-black">650,000 đ</span>
                  </div>
                  <div className="flex justify-between text-carbon/60">
                    <span>Mặt nạ phục hồi đi kèm</span>
                    <span className="font-semibold text-ink-black">150,000 đ</span>
                  </div>
                  <div className="flex justify-between border-t border-ink-black/10 pt-2 font-bold text-ink-black text-sm">
                    <span>Tổng chi phí</span>
                    <span>800,000 đ</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Flat White bordered Card */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 md:p-12 flex flex-col justify-between h-[480px] relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <span className="text-[10px] font-bold text-default-violet uppercase tracking-nav">Tăng trưởng uy tín</span>
                <h3 className="text-2xl font-bold text-ink-black font-nb-international uppercase tracking-tight">Minh chứng hình ảnh</h3>
                <p className="text-carbon text-xs md:text-sm max-w-md leading-relaxed font-normal">
                  Ghi lại hình ảnh hiện trạng vật chất, thiết bị, kết quả trước và sau khi làm dịch vụ để tạo dựng sự uy tín và loại bỏ các tranh chấp không đáng có với khách hàng.
                </p>
              </div>
              {/* Simulated Evidence Image Mockup */}
              <div className="bg-slate-50 rounded-t-lg p-4 border-t border-x border-slate-200 translate-y-6 group-hover:translate-y-2 transition-transform duration-500 w-[90%] mx-auto flex gap-3 font-saans">
                <div className="w-1/2 border border-slate-200/50 rounded-lg p-2 text-center bg-white">
                  <span className="text-[9px] text-carbon block font-bold uppercase tracking-nav mb-1">Hiện trạng trước</span>
                  <div className="h-20 bg-slate-50 border border-slate-100 rounded flex items-center justify-center text-xs">📸 Yêu cầu cũ</div>
                </div>
                <div className="w-1/2 border border-slate-200/50 rounded-lg p-2 text-center bg-white">
                  <span className="text-[9px] text-default-violet block font-bold uppercase tracking-nav mb-1">Kết quả sau</span>
                  <div className="h-20 bg-default-violet/5 border border-default-violet/20 rounded flex items-center justify-center text-xs text-default-violet font-semibold">✨ Hoàn thành</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Workflow Section */}
      <section id="workflow" className="max-w-[1200px] mx-auto py-24 border-t border-slate-100 relative z-10">
        <div className="text-left max-w-3xl mb-16 space-y-3">
          <span className="text-xs font-bold text-default-violet uppercase tracking-nav">Vận hành tinh gọn</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-[-0.02em] leading-[1.0] text-ink-black font-nb-international uppercase">
            Quy trình chuẩn hóa trong tầm tay
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-3xl">📋</span>
            <h4 className="text-lg font-bold text-ink-black font-nb-international uppercase tracking-tight">1. Tiếp nhận nhanh</h4>
            <p className="text-xs md:text-sm text-carbon leading-relaxed">
              Thu thập thông tin yêu cầu dịch vụ hoặc lịch hẹn từ khách hàng trực tiếp, qua điện thoại hoặc cổng thông tin tự động.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-3xl">🗓️</span>
            <h4 className="text-lg font-bold text-ink-black font-nb-international uppercase tracking-tight">2. Phân công xử lý</h4>
            <p className="text-xs md:text-sm text-carbon leading-relaxed">
              Lập lịch, điều phối nhân sự phù hợp (kỹ thuật viên, kỹ sư, stylist, nhiếp ảnh gia) phụ trách theo dõi yêu cầu của khách.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-3xl">💵</span>
            <h4 className="text-lg font-bold text-ink-black font-nb-international uppercase tracking-tight">3. Duyệt chi phí</h4>
            <p className="text-xs md:text-sm text-carbon leading-relaxed">
              Gửi bảng báo giá chi tiết trực tuyến cho khách duyệt trước khi bắt đầu thực hiện để đảm bảo minh bạch, không tranh cãi.
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-3xl">🛡️</span>
            <h4 className="text-lg font-bold text-ink-black font-nb-international uppercase tracking-tight">4. Chăm sóc hậu mãi</h4>
            <p className="text-xs md:text-sm text-carbon leading-relaxed">
              Hoàn thành bàn giao, ghi nhận thanh toán, đồng thời tự động lưu vết dữ liệu bảo hành điện tử hoặc gửi tin chăm sóc khách.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section (Dark Monochrome Band) */}
      <section id="faq" className="bg-slate-900 text-paper-white py-24 border-t border-slate-950 relative z-10 -mx-6 px-6">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-bold text-default-violet uppercase tracking-nav">Giải đáp thắc mắc</span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-[-0.02em] leading-[0.97] text-paper-white font-nb-international uppercase">
              Hỏi đáp về <br />
              <span className="text-default-violet">ServiceFlow</span>
            </h2>
            <p className="text-xs md:text-sm text-frost/70 leading-relaxed max-w-sm font-normal">
              Tìm hiểu thêm các câu hỏi thường gặp hoặc liên hệ trực tiếp với đội ngũ hỗ trợ của chúng tôi tại <a href="mailto:support@serviceflow.com" className="text-default-violet hover:underline font-semibold">support@serviceflow.com</a>.
            </p>
          </div>

          <div className="lg:col-span-7 divide-y divide-white/10">
            {[
              {
                q: "ServiceFlow phù hợp cho những loại hình kinh doanh nào?",
                a: "Hệ thống được thiết kế mở để hỗ trợ đa dạng ngành dịch vụ như tiệm sửa chữa thiết bị, spa trị liệu, photo studio, salon tóc, dọn dẹp vệ sinh căn hộ và bảo trì kỹ thuật gia đình."
              },
              {
                q: "Tôi có thể tuỳ biến các trường thông tin riêng biệt cho từng ngành không?",
                a: "Có, hệ thống hỗ trợ cấu trúc dữ liệu linh hoạt (Metadata/Industry Presets) giúp bạn cấu hình thêm bớt các thông số riêng biệt cho từng loại hình dịch vụ mà không cần sửa đổi mã nguồn."
              },
              {
                q: "Khách hàng của tôi có cần phải đăng ký tài khoản để theo dõi tiến độ không?",
                a: "Không cần. Mỗi phiếu dịch vụ có một mã theo dõi duy nhất được đóng gói dạng Hashed URL. Khách hàng chỉ cần truy cập trực tiếp liên kết đó để xem tiến độ, phê duyệt báo giá và đánh giá dịch vụ."
              },
              {
                q: "Tôi có thể đăng ký sử dụng thử miễn phí không?",
                a: "Hoàn toàn miễn phí. Chúng tôi hỗ trợ gói dùng thử đầy đủ tính năng cho các cơ sở dịch vụ quy mô nhỏ trải nghiệm số hóa và đánh giá mức độ phù hợp của hệ thống."
              }
            ].map((faq, idx) => (
              <div key={idx} className="py-6 cursor-pointer" onClick={() => toggleFaq(idx)}>
                <div className="flex items-center justify-between text-sm md:text-base font-bold text-paper-white group">
                  <span>{faq.q}</span>
                  <span className={`text-xl transition-transform duration-300 ${activeFaq === idx ? 'rotate-45 text-default-violet' : 'text-frost/60 group-hover:text-paper-white'}`}>+</span>
                </div>
                <div className={`mt-3 text-xs md:text-sm text-frost/80 leading-relaxed overflow-hidden transition-all duration-300 ${activeFaq === idx ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Sticky Support Chip */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://zalo.me"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white border border-slate-200 text-ink-black text-xs font-bold tracking-nav uppercase shadow-none hover:bg-slate-50 transition-all active:scale-[0.98]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Trợ giúp trực tuyến
        </a>
      </div>
    </div>
  );
};
