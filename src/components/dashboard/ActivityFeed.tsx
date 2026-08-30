import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Activity,
  CheckCircle2,
  XCircle,
  UserPlus,
  MailOpen,
  Sparkles,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import { clsx } from 'clsx';

export const ActivityFeed: React.FC = () => {
  const { activities, setCurrentView, setSelectedGuestId, guests } = useApp();
  const { t, language } = useLanguage();

  const getActionBadge = (type: string) => {
    switch (type) {
      case 'confirm':
        return {
          icon: CheckCircle2,
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
          label: t.guests.statuses.confirmed,
        };
      case 'decline':
        return {
          icon: XCircle,
          color: 'text-rose-600 bg-rose-50 border-rose-200',
          label: t.guests.statuses.declined,
        };
      case 'companion':
        return {
          icon: UserPlus,
          color: 'text-brand-deep bg-brand-soft border-brand-primary/30',
          label: language === 'vi' ? 'Người đi cùng' : 'Plus One',
        };
      case 'checkin':
        return {
          icon: QrCode,
          color: 'text-sky-600 bg-sky-50 border-sky-200',
          label: t.guests.statuses.checkedIn,
        };
      case 'open':
      default:
        return {
          icon: MailOpen,
          color: 'text-brand-muted bg-brand-bg border-brand-border',
          label: t.guests.statuses.opened,
        };
    }
  };

  const translateActivityDesc = (desc: string) => {
    if (language !== 'vi') return desc;
    if (desc.includes('accepted the invitation with 1 companion')) return 'đã xác nhận tham dự cùng 1 người đi cùng';
    if (desc.includes('accepted the invitation for 2 guests')) return 'đã xác nhận tham dự cho 2 khách';
    if (desc.includes('confirmed RSVP with dietary note')) return 'đã xác nhận tham dự với ghi chú khẩu phần ăn';
    if (desc.includes('checked in at Reception Door 1')) return 'đã check-in tại Cửa lễ tân 1';
    if (desc.includes('opened the personalized invitation')) return 'đã mở thiệp mời điện tử cá nhân';
    if (desc.includes('regretfully declined')) return 'rất tiếc không thể tham dự';
    return desc;
  };

  const handleGuestClick = (guestName: string) => {
    const matched = guests.find((g) => g.fullName.toLowerCase().includes(guestName.toLowerCase()));
    if (matched) {
      setCurrentView('guest-list');
      setSelectedGuestId(matched.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-brand-border/80 shadow-card flex flex-col justify-between text-left">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-0.5">
          <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
            <Activity className="w-4 h-4 text-brand-accent" />
            <span>{t.dashboard.recentActivity}</span>
          </h3>
          <p className="text-xs text-brand-muted">
            {language === 'vi'
              ? 'Dòng thời gian phản hồi và tương tác thiệp cưới của khách'
              : 'Live stream of guest responses and invitation engagements'}
          </p>
        </div>
        <button
          onClick={() => setCurrentView('guest-list')}
          className="text-xs text-brand-deep font-semibold hover:underline flex items-center gap-1"
        >
          {language === 'vi' ? 'Xem Danh sách' : 'View CRM'} <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* Feed list */}
      <div className="space-y-3.5 flex-1 my-1 overflow-y-auto max-h-72 pr-1">
        {activities.map((act) => {
          const badge = getActionBadge(act.type);
          const Icon = badge.icon;

          return (
            <div
              key={act.id}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-brand-bg/40 border border-transparent hover:border-brand-border/60 transition-all duration-150"
            >
              {/* Avatar with action icon overlay */}
              <div className="relative shrink-0">
                <img
                  src={act.guestAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                  alt={act.guestName}
                  className="w-9 h-9 rounded-full object-cover border border-brand-border shadow-xs"
                />
                <div
                  className={clsx(
                    'absolute -bottom-1 -right-1 p-0.5 rounded-full border bg-white shadow-xs',
                    badge.color
                  )}
                >
                  <Icon className="w-2.5 h-2.5" />
                </div>
              </div>

              {/* Activity Details */}
              <div className="flex-1 min-w-0 space-y-0.5">
                <div className="flex items-baseline justify-between gap-2">
                  <span
                    onClick={() => handleGuestClick(act.guestName)}
                    className="text-xs sm:text-sm font-semibold text-brand-dark hover:text-brand-deep cursor-pointer transition-colors truncate"
                  >
                    {act.guestName}
                  </span>
                  <span className="text-[10px] text-brand-muted shrink-0">
                    {act.relativeTime}
                  </span>
                </div>
                <p className="text-xs text-brand-muted leading-relaxed">
                  {translateActivityDesc(act.description)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live sync badge */}
      <div className="pt-3 border-t border-brand-border/60 flex items-center justify-between text-[11px] text-brand-muted">
        <div className="flex items-center gap-1.5 text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-medium">
            {language === 'vi' ? 'Đồng bộ khách mời trực tiếp' : 'Live guest sync active'}
          </span>
        </div>
        <span>{language === 'vi' ? 'Tự động cập nhật' : 'Auto-updated'}</span>
      </div>
    </div>
  );
};
