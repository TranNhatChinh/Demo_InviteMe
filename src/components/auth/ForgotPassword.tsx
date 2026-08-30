import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useToast } from '../../context/ToastContext';

interface ForgotPasswordProps {
  onNavigateToLogin: () => void;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onNavigateToLogin }) => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();
  const [email, setEmail] = useState('emily.nguyen@inviteme.io');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      showToast(
        language === 'vi' ? 'Đã gửi liên kết khôi phục' : 'Reset Link Sent',
        language === 'vi' ? `Hướng dẫn đặt lại mật khẩu đã được gửi tới ${email}` : `Password reset instructions sent to ${email}`,
        'success'
      );
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-brand-bg p-6 animate-fade-in text-left">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-modal border border-brand-border p-8 space-y-6">
        <button
          type="button"
          onClick={onNavigateToLogin}
          className="inline-flex items-center gap-2 text-xs font-medium text-brand-muted hover:text-brand-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'vi' ? 'Quay lại đăng nhập' : 'Back to sign in'}</span>
        </button>

        {!isSubmitted ? (
          <>
            <div className="space-y-1 text-left">
              <h1 className="font-serif text-3xl font-bold text-brand-dark tracking-tight">
                {t.auth.resetPassword}
              </h1>
              <p className="text-sm text-brand-muted">
                {language === 'vi' ? 'Nhập email tài khoản của bạn để nhận liên kết đặt lại mật khẩu bảo mật.' : "Enter your account email and we'll send you a secure link to reset your credentials."}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label={t.auth.registeredEmail}
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="emily.nguyen@inviteme.io"
                icon={<Mail className="w-4 h-4" />}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
                icon={<Send className="w-4 h-4" />}
                iconPosition="right"
              >
                {t.auth.sendResetLink}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-4 py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-brand-dark">
              {t.auth.checkInbox}
            </h2>
            <p className="text-sm text-brand-muted">
              {language === 'vi' ? (
                <>Chúng tôi đã gửi liên kết khôi phục tới <span className="font-semibold text-brand-dark">{email}</span>.</>
              ) : (
                <>We've dispatched a recovery link to <span className="font-semibold text-brand-dark">{email}</span>.</>
              )}
            </p>
            <Button
              variant="secondary"
              className="w-full mt-4"
              onClick={onNavigateToLogin}
            >
              {t.auth.returnToLogin}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
