import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { GiftTransaction } from '../../types';
import { SearchInput } from '../common/Input';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { GiftDetailDrawer } from './GiftDetailDrawer';
import {
  Gift,
  TrendingUp,
  Receipt,
  Users,
  CreditCard,
  CheckCircle2,
  PieChart,
  Calendar,
  Sparkles,
  Info,
} from 'lucide-react';
import { clsx } from 'clsx';

export const GiftBookView: React.FC = () => {
  const { gifts, giftMetrics } = useApp();
  const { t, formatCurrency, formatNumber, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedGift, setSelectedGift] = useState<GiftTransaction | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const filteredGifts = useMemo(() => {
    return gifts.filter((g) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          g.guestName.toLowerCase().includes(q) ||
          g.message.toLowerCase().includes(q) ||
          g.transactionRef.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedGroup !== 'All' && g.group !== selectedGroup) {
        return false;
      }
      return true;
    });
  }, [gifts, search, selectedGroup]);

  const cohortBreakdown = [
    { label: language === 'vi' ? 'Gia đình & Họ hàng' : 'Family Circle', percent: 42, color: 'bg-[#A94F68]' },
    { label: language === 'vi' ? 'Khách VIP & Đối tác' : 'VIP Partners', percent: 28, color: 'bg-[#D4AF37]' },
    { label: language === 'vi' ? 'Bạn bè thân thiết' : 'Lifelong Friends', percent: 18, color: 'bg-[#EFA3B5]' },
    { label: language === 'vi' ? 'Đồng nghiệp & Mạng lưới' : 'Colleagues & Network', percent: 12, color: 'bg-[#75676B]' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Gift className="w-3.5 h-3.5 text-brand-accent" />
            <span>{language === 'vi' ? 'Sổ mừng cưới Cặp đôi' : 'Couple Wedding Ledger'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.giftBook.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.giftBook.subtitle}
          </p>
        </div>

        {/* Subtle Sandbox Disclaimer */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-bg/80 border border-brand-border text-[11px] text-brand-muted">
          <Info className="w-3.5 h-3.5 text-brand-accent shrink-0" />
          <span>{t.giftBook.disclaimer}</span>
        </div>
      </div>

      {/* 4 Top KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.giftBook.totalGifts}
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
            {formatCurrency(giftMetrics.totalVND)}
          </div>
          <p className="text-[10px] text-emerald-700 font-medium">
            {language === 'vi' ? '100% Ghi nhận an toàn' : '100% Verified in Sandbox'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.giftBook.transactions}
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            {formatNumber(giftMetrics.totalTransactions)} <span className="text-xs font-sans font-normal text-brand-muted">{language === 'vi' ? 'lượt' : 'Gifts'}</span>
          </div>
          <p className="text-[10px] text-brand-muted">
            {language === 'vi' ? '87 Lời chúc ghi nhận' : '87 Recorded Blessings'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.giftBook.averageGift}
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            {formatCurrency(giftMetrics.averageVND)}
          </div>
          <p className="text-[10px] text-brand-muted">
            {language === 'vi' ? 'Trung bình mỗi giao dịch' : 'Per gift transaction'}
          </p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.giftBook.giftedGuests}
          </span>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-emerald-700">
            {giftMetrics.giftedPercentage}%
          </div>
          <p className="text-[10px] text-emerald-700 font-medium">
            {language === 'vi' ? 'Mức độ tương tác cao' : 'High blessing engagement'}
          </p>
        </div>
      </div>

      {/* Analytics Section: Velocity Chart & Cohort Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Velocity Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-brand-border shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {t.giftBook.velocityTitle}
              </h3>
              <p className="text-xs text-brand-muted">{t.giftBook.velocitySub}</p>
            </div>
            <span className="text-xs font-mono font-bold text-brand-deep bg-brand-bg px-2.5 py-1 rounded-lg border border-brand-border">
              {language === 'vi' ? '10 - 14 Th12, 2026' : 'Dec 10 - 14, 2026'}
            </span>
          </div>

          {/* Simulated chart bars */}
          <div className="space-y-3 pt-2">
            <div className="flex items-end gap-3 h-40 pt-4 px-2 border-b border-brand-border">
              {[
                { day: language === 'vi' ? '10 Th12' : 'Dec 10', amount: 15, height: '25%' },
                { day: language === 'vi' ? '11 Th12' : 'Dec 11', amount: 28, height: '40%' },
                { day: language === 'vi' ? '12 Th12' : 'Dec 12', amount: 52, height: '60%' },
                { day: language === 'vi' ? '13 Th12' : 'Dec 13', amount: 89, height: '80%' },
                { day: language === 'vi' ? '14 Th12' : 'Dec 14', amount: 128.5, height: '100%', highlight: true },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <span className="text-[10px] font-mono font-bold text-brand-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    {bar.amount}M
                  </span>
                  <div
                    className={clsx(
                      'w-full rounded-t-xl transition-all duration-500',
                      bar.highlight
                        ? 'bg-gradient-to-t from-brand-primary to-brand-accent shadow-card'
                        : 'bg-brand-soft/70 hover:bg-brand-soft'
                    )}
                    style={{ height: bar.height }}
                  />
                  <span className="text-[10px] text-brand-muted font-medium">{bar.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-brand-muted pt-1">
              <span>{language === 'vi' ? 'Khai tiệc lúc 18:00' : 'Ceremony opens at 18:00'}</span>
              <span className="font-semibold text-brand-deep">
                {language === 'vi' ? 'Đỉnh điểm nhận quà lúc 18:24' : 'Peak blessing at 18:24'}
              </span>
            </div>
          </div>
        </div>

        {/* Cohort Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-brand-border shadow-card space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
              {language === 'vi' ? 'Nguồn gốc' : 'Sources'}
            </span>
            <h3 className="font-serif font-bold text-lg text-brand-dark">
              {t.giftBook.sourceBreakdown}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi' ? 'Đóng góp theo các nhóm khách mời' : 'Contributions across guest demographics'}
            </p>
          </div>

          <div className="space-y-3 my-2">
            {cohortBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-brand-dark">{item.label}</span>
                  <span className="font-semibold text-brand-deep">{item.percent}%</span>
                </div>
                <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden">
                  <div
                    className={clsx('h-full rounded-full transition-all duration-500', item.color)}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-brand-bg/60 border border-brand-border/60 flex items-center justify-between text-xs text-brand-muted">
            <span>{language === 'vi' ? 'Kênh chính' : 'Primary Channel'}</span>
            <span className="font-semibold text-brand-dark">Vietcombank QR (94%)</span>
          </div>
        </div>
      </div>

      {/* Gift Table & Search */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-card p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-80">
            <SearchInput
              value={search}
              onChange={(val) => setSearch(val)}
              onClear={() => setSearch('')}
              placeholder={language === 'vi' ? 'Tìm theo tên, lời chúc, mã giao dịch...' : 'Search sender, message, or TXN...'}
            />
          </div>

          <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-brand-border text-xs">
            {[
              { val: 'All', label: t.common.all },
              { val: 'Family', label: t.guests.groups.family },
              { val: 'Friends', label: t.guests.groups.friends },
              { val: 'VIP', label: t.guests.groups.vip },
            ].map((grp) => (
              <button
                key={grp.val}
                onClick={() => setSelectedGroup(grp.val)}
                className={clsx(
                  'px-3 py-1 rounded-lg transition-all font-medium',
                  selectedGroup === grp.val
                    ? 'bg-white text-brand-deep shadow-xs font-semibold'
                    : 'text-brand-muted hover:text-brand-dark'
                )}
              >
                {grp.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg/50 border-b border-brand-border text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                <th className="py-3 px-4">{t.giftBook.tableHeaderGuest}</th>
                <th className="py-3 px-4">{t.giftBook.tableHeaderAmount}</th>
                <th className="py-3 px-4">{t.giftBook.tableHeaderMessage}</th>
                <th className="py-3 px-4">{language === 'vi' ? 'Phương thức' : 'Method'}</th>
                <th className="py-3 px-4">{t.giftBook.tableHeaderTime}</th>
                <th className="py-3 px-4 text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 text-xs text-brand-dark">
              {filteredGifts.slice(0, 15).map((gift) => (
                <tr
                  key={gift.id}
                  onClick={() => setSelectedGift(gift)}
                  className="hover:bg-brand-bg/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={gift.guestAvatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-brand-border"
                      />
                      <div>
                        <p className="font-semibold text-brand-dark">{gift.guestName}</p>
                        <p className="text-[10px] text-brand-muted">{gift.group}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-serif font-bold text-sm text-brand-deep">
                      {formatCurrency(gift.amountVND)}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-xs">
                    <p className="truncate italic text-brand-muted">"{gift.message}"</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-mono text-brand-muted bg-brand-bg px-2 py-0.5 rounded border border-brand-border/60">
                      {gift.paymentMethod}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-brand-muted text-[11px] whitespace-nowrap">
                    {gift.timestamp}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGift(gift);
                      }}
                      className="text-xs text-brand-deep font-semibold hover:underline"
                    >
                      {t.common.view}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <GiftDetailDrawer
        gift={selectedGift}
        onClose={() => setSelectedGift(null)}
      />
    </div>
  );
};
