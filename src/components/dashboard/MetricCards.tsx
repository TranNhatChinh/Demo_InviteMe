import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Users,
  UserCheck,
  Clock,
  QrCode,
  Users2,
  Gift,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { clsx } from 'clsx';

export const MetricCards: React.FC = () => {
  const { metrics, setCurrentView } = useApp();
  const { t, formatCurrency, formatNumber, language } = useLanguage();

  const formattedGiftTotal = language === 'vi'
    ? `${(metrics.giftTotalVND / 1000000).toFixed(1)} triệu ₫`
    : `${(metrics.giftTotalVND / 1000000).toFixed(1)}M VND`;

  const cards = [
    {
      id: 'total-guests',
      title: t.dashboard.totalGuests,
      value: formatNumber(metrics.totalGuests),
      trend: `${metrics.responseRate}% ${language === 'vi' ? 'đã phản hồi' : 'responded'}`,
      trendType: 'neutral',
      icon: Users,
      iconColor: 'text-brand-deep',
      iconBg: 'bg-brand-soft/70',
      actionView: 'guest-list',
    },
    {
      id: 'confirmed',
      title: t.dashboard.confirmed,
      value: formatNumber(metrics.confirmed),
      trend: `+12 ${language === 'vi' ? 'tuần này' : 'this week'}`,
      trendType: 'positive',
      icon: UserCheck,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100/70',
      actionView: 'guest-list',
    },
    {
      id: 'pending-rsvp',
      title: t.dashboard.pendingRSVP,
      value: formatNumber(metrics.pending),
      trend: language === 'vi' ? 'Đang gửi nhắc nhở' : 'Follow-up queued',
      trendType: 'warning',
      icon: Clock,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-100/70',
      actionView: 'guest-list',
    },
    {
      id: 'checked-in',
      title: t.dashboard.checkedIn,
      value: formatNumber(metrics.checkedIn),
      trend: metrics.checkedIn > 0 ? `${Math.round((metrics.checkedIn / metrics.expectedHeadcount) * 100)}% ${language === 'vi' ? 'đã đến' : 'arrived'}` : (language === 'vi' ? 'Sẵn sàng tại cửa' : 'Ready at door'),
      trendType: 'sky',
      icon: QrCode,
      iconColor: 'text-sky-700',
      iconBg: 'bg-sky-100/70',
      actionView: 'reception-app',
    },
    {
      id: 'expected-headcount',
      title: t.dashboard.expectedHeadcount,
      value: formatNumber(metrics.expectedHeadcount),
      trend: language === 'vi' ? 'Bao gồm +26 người đi cùng' : 'Includes +26 companions',
      trendType: 'purple',
      icon: Users2,
      iconColor: 'text-purple-700',
      iconBg: 'bg-purple-100/70',
      actionView: 'seating',
    },
    {
      id: 'gift-total',
      title: t.dashboard.giftTotal,
      value: formattedGiftTotal,
      trend: `${formatNumber(metrics.totalWishes)} ${language === 'vi' ? 'Lời chúc' : 'Blessings'}`,
      trendType: 'rose',
      icon: Gift,
      iconColor: 'text-brand-accent',
      iconBg: 'bg-brand-blush',
      actionView: 'gift-book',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 text-left">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => card.actionView && setCurrentView(card.actionView)}
            className="group relative bg-white rounded-xl p-4 border border-brand-border/80 shadow-subtle hover:shadow-hover hover:border-brand-primary/40 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            {/* Header: Icon & Top indicator */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider group-hover:text-brand-dark transition-colors truncate">
                {card.title}
              </span>
              <div className={clsx('w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform group-hover:scale-105', card.iconBg)}>
                <Icon className={clsx('w-4 h-4', card.iconColor)} />
              </div>
            </div>

            {/* Value */}
            <div className="space-y-1">
              <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark tracking-tight leading-none group-hover:text-brand-deep transition-colors truncate">
                {card.value}
              </div>

              {/* Trend / Subtext */}
              <div className="flex items-center gap-1 text-[11px] pt-1 font-medium truncate">
                {card.trendType === 'positive' ? (
                  <span className="text-emerald-700 flex items-center gap-0.5 bg-emerald-50 px-1.5 py-0.5 rounded truncate">
                    <TrendingUp className="w-3 h-3 shrink-0" />
                    <span className="truncate">{card.trend}</span>
                  </span>
                ) : card.trendType === 'warning' ? (
                  <span className="text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded truncate">
                    {card.trend}
                  </span>
                ) : card.trendType === 'sky' ? (
                  <span className="text-sky-700 bg-sky-50 px-1.5 py-0.5 rounded truncate">
                    {card.trend}
                  </span>
                ) : card.trendType === 'purple' ? (
                  <span className="text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded truncate">
                    {card.trend}
                  </span>
                ) : card.trendType === 'rose' ? (
                  <span className="text-brand-deep bg-brand-blush px-1.5 py-0.5 rounded truncate">
                    {card.trend}
                  </span>
                ) : (
                  <span className="text-brand-muted truncate">
                    {card.trend}
                  </span>
                )}
              </div>
            </div>

            {/* Subtle hover arrow indicator */}
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-muted/40 absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        );
      })}
    </div>
  );
};
