import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Heart, Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onNavigateToForgot: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToRegister,
  onNavigateToForgot,
}) => {
  const { login } = useApp();
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('emily.nguyen@inviteme.io');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      login(email);
      setIsLoading(false);
    }, 600);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('emily.nguyen@inviteme.io');
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen w-full flex bg-brand-bg select-none animate-fade-in text-left">
      {/* Left Column: Luxury Wedding Editorial Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand-dark">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&auto=format&fit=crop&q=85"
          alt="Luxury Wedding Celebration"
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/30 to-brand-primary/20 mix-blend-overlay" />

        {/* Editorial Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center">
                <Heart className="w-5 h-5 text-brand-soft fill-brand-soft" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight">InviteMe</span>
            </div>

            <LanguageSwitcher variant="pill" />
          </div>

          <div className="space-y-6 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium text-brand-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>{language === 'vi' ? 'Nền tảng quản lý cưới cao cấp 2026' : 'Digital Wedding Concierge 2026'}</span>
            </div>

            <h2 className="font-serif text-4xl xl:text-5xl font-light leading-tight tracking-tight text-white">
              {language === 'vi' ? (
                <>
                  "Mọi Khách Mời. Mọi Khoảnh Khắc. <br />
                  <span className="italic font-normal text-brand-soft">Quản Lý Trọn Vẹn."</span>
                </>
              ) : (
                <>
                  "Every Guest. Every Moment. <br />
                  <span className="italic font-normal text-brand-soft">Perfectlys Managed."</span>
                </>
              )}
            </h2>

            <p className="text-white/80 text-sm leading-relaxed font-light">
              {language === 'vi'
                ? 'Trải nghiệm vận hành đám cưới hiện đại dành riêng cho các cặp đôi tinh tế. Theo dõi RSVP trực tiếp, sơ đồ bàn tiệc thông minh, check-in mã QR và thiệp mời điện tử cá nhân hóa.'
                : 'Experience modern wedding management designed for discerning couples. Instant RSVP velocity, smart table allocation, real-time QR reception check-in, and personalized digital invitations.'}
            </p>

            <div className="pt-4 flex items-center gap-6 text-xs text-white/70 border-t border-white/15">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{language === 'vi' ? 'Bảo mật thông tin khách mời' : 'Encrypted Guest Privacy'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-brand-primary fill-brand-primary" />
                <span>{language === 'vi' ? 'Được 12.000+ Cặp đôi tin chọn' : 'Loved by 12,000+ Couples'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Minimal Premium Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 relative">
        <div className="absolute top-6 right-6 lg:hidden">
          <LanguageSwitcher variant="compact" />
        </div>

        <div className="w-full max-w-md space-y-8">
          {/* Logo & Header */}
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-soft to-brand-blush p-0.5 shadow-sm flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <span className="font-serif font-bold text-brand-deep text-lg italic">I</span>
                  <span className="font-serif font-semibold text-brand-accent text-sm -ml-0.5">M</span>
                </div>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-brand-dark">
                Invite<span className="text-brand-deep font-normal italic">Me</span>
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
              {t.auth.welcomeBack}
            </h1>
            <p className="text-sm text-brand-muted">
              {t.auth.subtitle}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label={t.auth.email}
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. emily.nguyen@inviteme.io"
              icon={<Mail className="w-4 h-4" />}
            />

            <Input
              label={t.auth.password}
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              icon={<Lock className="w-4 h-4" />}
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-brand-muted hover:text-brand-dark">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-brand-border text-brand-deep focus:ring-brand-primary/30"
                />
                <span>{t.auth.rememberMe}</span>
              </label>

              <button
                type="button"
                onClick={onNavigateToForgot}
                className="text-brand-deep font-medium hover:underline"
              >
                {t.auth.forgotPassword}
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? t.common.loading : t.auth.signIn}
            </Button>
          </form>

          {/* Social or Google divider */}
          <div className="space-y-4">
            <div className="relative flex items-center justify-center">
              <div className="w-full border-t border-brand-border/80" />
              <span className="bg-brand-bg px-3 text-[11px] font-medium text-brand-muted uppercase tracking-wider absolute">
                {t.auth.orContinueWith}
              </span>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full py-2.5 px-4 rounded-xl border border-brand-border bg-white hover:bg-brand-bg transition-colors flex items-center justify-center gap-2 text-xs font-semibold text-brand-dark shadow-subtle"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.25 21.37 7.34 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.97 0 12s.46 3.83 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.63 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Google Workspace</span>
            </button>
          </div>

          {/* Footer Register Link */}
          <div className="text-center text-xs text-brand-muted">
            <span>{t.auth.noAccount} </span>
            <button
              onClick={onNavigateToRegister}
              className="text-brand-deep font-semibold hover:underline"
            >
              {t.auth.createAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
