import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/auth.context.tsx';
import { ROUTES } from '../constants/routes.ts';
import { PasswordInput } from '../features/auth/components/PasswordInput.tsx';
import { PasswordRequirementList } from '../features/auth/components/PasswordRequirementList.tsx';
import { FormError } from '../features/auth/components/FormError.tsx';
import { SubmitButton } from '../features/auth/components/SubmitButton.tsx';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ các thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu nhập lại không khớp.');
      return;
    }

    // Basic password criteria check on frontend
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (!hasMinLength || !hasUpperCase || !hasLowerCase || !hasNumber) {
      setErrorMsg('Mật khẩu của bạn chưa đáp ứng đủ yêu cầu an toàn.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      await register({ fullName, email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      console.error(err);
      if (err?.errors && err.errors.length > 0) {
        setErrorMsg(err.errors[0].message);
      } else {
        setErrorMsg(err?.message || 'Có lỗi xảy ra trong quá trình đăng ký.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 font-saans">
      <FormError message={errorMsg} />

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Two column grid on desktop for Full Name and Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Full Name Field */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-carbon">
              Họ và tên quản lý
            </label>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-default-violet focus:ring-default-violet/5 focus:ring-4 rounded-lg px-3.5 py-2.5 text-sm text-ink-black placeholder-slate-400 focus:outline-none transition-all duration-200"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-carbon">
              Email doanh nghiệp
            </label>
            <input
              type="email"
              placeholder="owner@serviceflow.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting}
              className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-default-violet focus:ring-default-violet/5 focus:ring-4 rounded-lg px-3.5 py-2.5 text-sm text-ink-black placeholder-slate-400 focus:outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Two column grid on desktop for Password and Confirm Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Password Field */}
          <PasswordInput
            label="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            placeholder="Tối thiểu 8 ký tự..."
          />

          {/* Confirm Password Field */}
          <PasswordInput
            label="Nhập lại mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSubmitting}
            placeholder="••••••••"
          />
        </div>

        {/* Password Requirements List - Compact Layout */}
        {password.length > 0 && <PasswordRequirementList value={password} />}

        {/* Submit Button */}
        <SubmitButton
          isSubmitting={isSubmitting}
          loadingText="Đang đăng ký..."
          defaultText="Tạo tài khoản & Bắt đầu"
        />
      </form>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-carbon">
        Đã có tài khoản?{' '}
        <Link to={ROUTES.LOGIN} className="text-default-violet hover:underline font-semibold transition-all">
          Đăng nhập ngay
        </Link>
      </div>
    </div>
  );
};
