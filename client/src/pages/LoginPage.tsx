import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../features/auth/auth.context.tsx';
import { ROUTES } from '../constants/routes.ts';
import { PasswordInput } from '../features/auth/components/PasswordInput.tsx';
import { FormError } from '../features/auth/components/FormError.tsx';
import { SubmitButton } from '../features/auth/components/SubmitButton.tsx';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);
    
    try {
      await login({ email, password });
      navigate(ROUTES.DASHBOARD);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Email hoặc mật khẩu không chính xác.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-4 font-saans">
      <FormError message={errorMsg} />

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-1.5 text-left">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-carbon">
            Email tài khoản / nhân viên
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

        {/* Password Field */}
        <PasswordInput
          label="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
        />

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-carbon hover:text-ink-black cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              disabled={isSubmitting}
              className="w-4 h-4 rounded border-slate-200 text-default-violet focus:ring-default-violet/10 cursor-pointer"
            />
            <span className="text-[11px] font-medium">Ghi nhớ đăng nhập</span>
          </label>
          <span className="text-[11px] text-carbon/60 hover:text-default-violet hover:underline cursor-pointer transition-all select-none">
            Quên mật khẩu?
          </span>
        </div>

        {/* Submit Button */}
        <SubmitButton
          isSubmitting={isSubmitting}
          loadingText="Đang đăng nhập..."
          defaultText="Đăng nhập hệ thống"
        />
      </form>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-carbon">
        Chưa có tài khoản doanh nghiệp?{' '}
        <Link to={ROUTES.REGISTER} className="text-default-violet hover:underline font-semibold transition-all">
          Đăng ký ngay
        </Link>
      </div>
    </div>
  );
};
