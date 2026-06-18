import React from 'react';

export const AuthBrandPanel: React.FC = () => {
  return (
    <div className="w-full max-w-md space-y-6 font-saans">
      {/* Title */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[9px] font-bold bg-default-violet/10 text-default-violet rounded-full uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-default-violet animate-pulse"></span>
            ServiceFlow Platform v1.0
          </span>
          <span className="text-[9px] font-mono text-carbon/40">LOC // [12.04, 107.53]</span>
        </div>
        
        <h1 className="text-3xl font-bold leading-none text-ink-black tracking-tight font-nb-international uppercase">
          Bản Vẽ Quy Trình <br />
          Vận Hành Dịch Vụ
        </h1>
        <p className="text-xs text-carbon leading-relaxed max-w-sm">
          ServiceFlow chuẩn hóa chuỗi hoạt động từ tiếp nhận yêu cầu, khảo sát đánh giá, thực hiện đính kèm bằng chứng đến hoàn thành bàn giao.
        </p>
      </div>

      {/* Blueprint Schematic Canvas */}
      <div className="relative p-5 rounded-lg border border-slate-100 bg-slate-50/20 overflow-hidden">
        {/* Engineering blueprint alignment marks */}
        <div className="absolute top-2 left-2 text-[8px] font-mono text-carbon/30">SYS_REF: A-01</div>
        <div className="absolute top-2 right-2 text-[8px] font-mono text-carbon/30">SCALE: 1:1</div>
        <div className="absolute bottom-2 right-2 text-[8px] font-mono text-carbon/30">ENG_01_ACTIVE</div>

        <div className="relative flex flex-col items-center space-y-2.5 py-1">
          {/* Step 1 */}
          <div className="w-full bg-white border border-slate-200 hover:border-slate-350 transition-colors rounded-lg p-3 flex items-center justify-between relative">
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[7px] text-carbon font-mono font-bold">
              1
            </div>
            <div className="flex items-center gap-3 pl-1.5">
              <div className="w-7 h-7 bg-slate-100 text-ink-black text-xs flex items-center justify-center rounded-lg border border-slate-200/50">
                📥
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-ink-black uppercase tracking-tight font-nb-international">Tiếp Nhận Yêu Cầu</div>
                <div className="text-[9px] text-carbon/80">Ghi nhận thông tin, tạo phiếu dịch vụ</div>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-slate-100 text-carbon border border-slate-200 uppercase">
              Registered
            </span>
          </div>

          {/* Connection Line 1 */}
          <div className="h-3 w-[1px] border-l border-dashed border-slate-350 relative flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-slate-350"></div>
          </div>

          {/* Step 2 */}
          <div className="w-full bg-white border border-default-violet/30 hover:border-default-violet/50 transition-colors rounded-lg p-3 flex items-center justify-between relative">
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-default-violet border border-default-violet/50 flex items-center justify-center text-[7px] text-white font-mono font-bold">
              2
            </div>
            <div className="flex items-center gap-3 pl-1.5">
              <div className="w-7 h-7 bg-default-violet/5 text-default-violet text-xs flex items-center justify-center rounded-lg border border-default-violet/10">
                🏷️
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-default-violet uppercase tracking-tight font-nb-international">Đánh Giá & Báo Giá</div>
                <div className="text-[9px] text-default-violet/80">Khách hàng duyệt chi phí trực tuyến</div>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-default-violet/10 text-default-violet border border-default-violet/20 uppercase tracking-tight animate-pulse">
              Pending client
            </span>
          </div>

          {/* Connection Line 2 */}
          <div className="h-3 w-[1px] border-l border-dashed border-slate-350 relative flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-slate-350"></div>
          </div>

          {/* Step 3 */}
          <div className="w-full bg-white border border-slate-200 hover:border-slate-350 transition-colors rounded-lg p-3 flex items-center justify-between relative">
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[7px] text-carbon font-mono font-bold">
              3
            </div>
            <div className="flex items-center gap-3 pl-1.5">
              <div className="w-7 h-7 bg-slate-100 text-ink-black text-xs flex items-center justify-center rounded-lg border border-slate-200/50">
                ⚙️
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-ink-black uppercase tracking-tight font-nb-international">Thực Hiện Dịch Vụ</div>
                <div className="text-[9px] text-carbon/80">Nhân sự cập nhật tiến độ & hình ảnh</div>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-amber-500/10 text-amber-700 border border-amber-500/20 uppercase">
              Processing
            </span>
          </div>

          {/* Connection Line 3 */}
          <div className="h-3 w-[1px] border-l border-dashed border-slate-350 relative flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-slate-350"></div>
          </div>

          {/* Step 4 */}
          <div className="w-full bg-white border border-slate-200 hover:border-slate-350 transition-colors rounded-lg p-3 flex items-center justify-between relative">
            <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white border border-slate-300 flex items-center justify-center text-[7px] text-carbon font-mono font-bold">
              4
            </div>
            <div className="flex items-center gap-3 pl-1.5">
              <div className="w-7 h-7 bg-slate-100 text-ink-black text-xs flex items-center justify-center rounded-lg border border-slate-200/50">
                ✨
              </div>
              <div className="text-left">
                <div className="text-[11px] font-bold text-ink-black uppercase tracking-tight font-nb-international">Bàn Giao & Hậu Mãi</div>
                <div className="text-[9px] text-carbon/80">Hoàn tất, chăm sóc sau dịch vụ</div>
              </div>
            </div>
            <span className="px-2 py-0.5 text-[8px] font-bold rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 uppercase">
              Completed
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
