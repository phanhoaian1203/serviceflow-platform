import React from 'react';

interface PasswordRequirementListProps {
  value: string;
}

export const PasswordRequirementList: React.FC<PasswordRequirementListProps> = ({ value }) => {
  const hasMinLength = value.length >= 8;
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasNumber = /[0-9]/.test(value);

  const requirements = [
    { label: 'Tối thiểu 8 ký tự', met: hasMinLength },
    { label: 'Chứa ít nhất 1 chữ hoa', met: hasUpperCase },
    { label: 'Chứa ít nhất 1 chữ thường', met: hasLowerCase },
    { label: 'Chứa ít nhất 1 chữ số', met: hasNumber },
  ];

  return (
    <div className="p-3 rounded-lg bg-slate-50/50 border border-slate-100 space-y-2 mt-1.5 font-saans text-left">
      <p className="text-[9px] font-bold uppercase tracking-wider text-carbon">
        Yêu cầu mật khẩu an toàn:
      </p>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {requirements.map((req, idx) => (
          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
            {req.met ? (
              <span className="w-3.5 h-3.5 rounded-full bg-default-violet/10 text-default-violet flex items-center justify-center text-[9px] font-bold shrink-0">
                ✓
              </span>
            ) : (
              <span className="w-3.5 h-3.5 rounded-full bg-slate-200/50 text-carbon/40 flex items-center justify-center text-[9px] font-bold shrink-0">
                •
              </span>
            )}
            <span className={req.met ? 'text-ink-black font-medium' : 'text-carbon/60'}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
