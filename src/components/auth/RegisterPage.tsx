import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { Heart, Lock, Mail, User, Calendar, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface RegisterPageProps {
  onNavigateToLogin: () => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigateToLogin }) => {
  const { login, updateWedding } = useApp();
  const { t, language } = useLanguage();
  const [brideName, setBrideName] = useState('Emily Nguyen');
  const [groomName, setGroomName] = useState('James Tran');
  const [weddingDate, setWeddingDate] = useState('2026-12-14');
  const [email, setEmail] = useState('emily.nguyen@inviteme.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      updateWedding({
        brideName,
        groomName,
        weddingDate,
        name: `${brideName} & ${groomName} Wedding`,
      });
      login(email);
      setIsLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full flex bg-brand-bg select-none animate-fade-in text-left">
      {/* Left Column: Luxury Wedding Editorial Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-brand-dark">
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&auto=format&fit=crop&q=85"
          alt="Wedding Vows Celebration"
          className="absolute inset-0 w-full h-full object-cover opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />

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

          <div className="space-y-4 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-brand-soft">
              <Sparkles className="w-3.5 h-3.5 text-brand-primary" />
              <span>{language === 'vi' ? 'Bắt đầu ngày cưới hoàn hảo của bạn' : 'Begin Your Seamless Celebration'}</span>
            </div>
            <h2 className="font-serif text-4xl font-light leading-tight text-white">
              {language === 'vi' ? (
                <>
                  Khởi tạo không gian <br />
                  <span className="italic font-normal text-brand-soft">Hệ điều hành Cưới cao cấp</span>
                </>
              ) : (
                <>
                  Create your private <br />
                  <span className="italic font-normal text-brand-soft">Wedding Operating System</span>
                </>
              )}
            </h2>
            <p className="text-white/80 text-sm leading-relaxed font-light">
              {language === 'vi'
                ? 'Thiết kế thiệp mời nghệ thuật, nhập danh sách khách trong vài giây, sơ đồ bàn tiệc thông minh và quản lý phản hồi RSVP dễ dàng.'
                : 'Craft bespoke invitations, import contacts in seconds, manage dynamic seating charts, and enjoy stress-free RSVP tracking.'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 md:p-16 overflow-y-auto relative">
        <div className="absolute top-6 right-6 lg:hidden">
          <LanguageSwitcher variant="compact" />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1 text-left">
            <h1 className="font-serif text-3xl font-bold text-brand-dark tracking-tight">
              {t.auth.createAccount}
            </h1>
            <p className="text-sm text-brand-muted">
              {language === 'vi' ? 'Trải nghiệm 14 ngày nền tảng quản lý cưới cao cấp.' : 'Start your 14-day premium concierge experience.'}
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label={t.wedding.brideName}
                required
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                placeholder="Emily Nguyen"
                icon={<User className="w-3.5 h-3.5" />}
              />
              <Input
                label={t.wedding.groomName}
                required
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                placeholder="James Tran"
                icon={<User className="w-3.5 h-3.5" />}
              />
            </div>

            <Input
              label={t.wedding.weddingDate}
              type="date"
              required
              value={weddingDate}
              onChange={(e) => setWeddingDate(e.target.value)}
              icon={<Calendar className="w-4 h-4" />}
            />

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
              placeholder={language === 'vi' ? 'Tối thiểu 8 ký tự' : 'At least 8 characters'}
              icon={<Lock className="w-4 h-4" />}
            />

            <div className="text-[11px] text-brand-muted leading-tight pt-1">
              {language === 'vi' ? (
                <>
                  Bằng việc đăng ký tài khoản, bạn đồng ý với{' '}
                  <span className="text-brand-deep underline cursor-pointer">Điều khoản dịch vụ</span> và{' '}
                  <span className="text-brand-deep underline cursor-pointer">Chính sách bảo mật</span> của InviteMe.
                </>
              ) : (
                <>
                  By creating an account, you agree to InviteMe's{' '}
                  <span className="text-brand-deep underline cursor-pointer">Terms of Service</span> and{' '}
                  <span className="text-brand-deep underline cursor-pointer">Privacy Policy</span>.
                </>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              disabled={isLoading}
            >
              {isLoading ? t.common.loading : t.auth.signUp}
            </Button>
          </form>

          {/* Footer Login Link */}
          <div className="text-center text-xs text-brand-muted pt-2">
            <span>{t.auth.hasAccount} </span>
            <button
              onClick={onNavigateToLogin}
              className="text-brand-deep font-semibold hover:underline"
            >
              {t.auth.signIn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
