import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Users,
  Heart,
  UserCheck,
  CreditCard,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Zap,
  Sparkles,
  PieChart,
  Calendar,
} from 'lucide-react';
import { clsx } from 'clsx';

export const AdminDashboard: React.FC = () => {
  const { adminStats, adminUsers, adminWeddings, setCurrentView } = useApp();
  const { t, formatCurrency, formatNumber, language } = useLanguage();

  const metricsCards = [
    {
      title: t.admin.totalUsers,
      value: formatNumber(12482),
      change: '+14.2% MoM',
      icon: Users,
      trend: 'up',
      subtitle: language === 'vi' ? '8.420 Cặp đôi • 4.062 Nhân viên' : '8,420 Couples • 4,062 Staff',
    },
    {
      title: t.admin.activeWeddings,
      value: formatNumber(2341),
      change: '+8.6% MoM',
      icon: Heart,
      trend: 'up',
      subtitle: language === 'vi' ? 'Đang chuẩn bị & Trực tiếp' : 'Currently in planning & live',
    },
    {
      title: t.admin.guestRSVPs,
      value: formatNumber(124850),
      change: '+22.4% MoM',
      icon: UserCheck,
      trend: 'up',
      subtitle: language === 'vi' ? '87.4% tỷ lệ hoàn thành' : '87.4% completion rate',
    },
    {
      title: t.admin.monthlyRevenue,
      value: formatCurrency(248000000),
      change: '+18.9% MoM',
      icon: CreditCard,
      trend: 'up',
      subtitle: language === 'vi' ? 'Phí gói & dịch vụ cao cấp' : 'Subscription & Concierge fees',
    },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-slate-600" />
            <span>{language === 'vi' ? 'Hệ thống Quản trị Đa máy chủ InviteMe' : 'InviteMe Multi-Tenant Telemetry'}</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            {t.admin.executiveTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            {t.admin.executiveSub}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{language === 'vi' ? 'Tất cả hệ thống hoạt động tốt' : 'All Systems Operational'}</span>
          </span>
        </div>
      </div>

      {/* 4 Executive KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricsCards.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {m.title}
                </span>
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <div className="font-sans font-bold text-2xl text-slate-900">
                  {m.value}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold mt-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{m.change}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                {m.subtitle}
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row: Revenue Velocity & Subscription Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Revenue Velocity (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">
                {t.admin.revenueVelocity}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'vi' ? 'Tăng trưởng MRR 6 tháng qua (triệu VNĐ)' : 'Trailing 6 months MRR growth (VND in millions)'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              Q3 2026: 248M VND
            </span>
          </div>

          <div className="flex items-end gap-3 h-48 pt-6 px-2 border-b border-slate-100">
            {[
              { month: language === 'vi' ? 'Th4' : 'Apr', revenue: 145, height: '45%' },
              { month: language === 'vi' ? 'Th5' : 'May', revenue: 168, height: '55%' },
              { month: language === 'vi' ? 'Th6' : 'Jun', revenue: 192, height: '65%' },
              { month: language === 'vi' ? 'Th7' : 'Jul', revenue: 215, height: '75%' },
              { month: language === 'vi' ? 'Th8' : 'Aug', revenue: 232, height: '85%' },
              { month: language === 'vi' ? 'Th9' : 'Sep', revenue: 248, height: '100%', active: true },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.revenue}M
                </span>
                <div
                  className={clsx(
                    'w-full rounded-t-lg transition-all duration-300',
                    bar.active ? 'bg-slate-900' : 'bg-slate-300 hover:bg-slate-400'
                  )}
                  style={{ height: bar.height }}
                />
                <span className="text-[10px] text-slate-500 font-medium">{bar.month}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <span>{language === 'vi' ? 'Tỷ lệ duy trì trung bình' : 'Avg Net Retention'}: <strong className="text-slate-800">118%</strong></span>
            <span>{language === 'vi' ? 'ARPU trung bình' : 'ARPU'}: <strong className="text-slate-800">1.890.000 ₫</strong></span>
          </div>
        </div>

        {/* Tier Breakdown (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
              {language === 'vi' ? 'Gói dịch vụ' : 'Tier Mix'}
            </span>
            <h3 className="font-sans font-bold text-base text-slate-900">
              {t.admin.tierDistribution}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'vi' ? 'Phân bổ tài khoản hoạt động' : 'Active subscription breakdown'}
            </p>
          </div>

          <div className="space-y-3 my-2">
            {[
              { tier: 'White Glove Concierge', count: '482', percent: 21, color: 'bg-amber-500' },
              { tier: 'Grand Luxury (Full Suite)', count: '1,120', percent: 48, color: 'bg-slate-900' },
              { tier: 'Romantic Classic', count: '739', percent: 31, color: 'bg-slate-400' },
            ].map((t, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">{t.tier}</span>
                  <span className="text-slate-500 font-mono">{t.count} ({t.percent}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={clsx('h-full rounded-full', t.color)} style={{ width: `${t.percent}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
            <span>{language === 'vi' ? 'Gia hạn gói' : 'Trial-to-Paid Conversion'}</span>
            <span className="font-bold text-slate-900">44.2%</span>
          </div>
        </div>
      </div>

      {/* Recent Weddings Telemetry Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-sans font-bold text-base text-slate-900">
              {t.admin.recentWeddingsTelemetry}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'vi' ? 'Theo dõi thời gian thực các tiệc cưới đang diễn ra' : 'Real-time monitoring across active wedding instances'}
            </p>
          </div>

          <button
            onClick={() => setCurrentView('admin-weddings')}
            className="text-xs text-slate-700 font-semibold hover:underline flex items-center gap-1"
          >
            <span>{language === 'vi' ? 'Xem tất cả 2.341 tiệc cưới' : 'View All 2,341 Weddings'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">{language === 'vi' ? 'Tên tiệc cưới' : 'Wedding Instance'}</th>
                <th className="py-3 px-4">{language === 'vi' ? 'Cặp đôi' : 'Couple'}</th>
                <th className="py-3 px-4">{language === 'vi' ? 'Ngày cưới' : 'Event Date'}</th>
                <th className="py-3 px-4">{language === 'vi' ? 'Khách & Tỷ lệ RSVP' : 'Guests & RSVP'}</th>
                <th className="py-3 px-4">{language === 'vi' ? 'Gói dịch vụ' : 'Tier'}</th>
                <th className="py-3 px-4">{t.common.status}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {adminWeddings.slice(0, 5).map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">{w.title}</td>
                  <td className="py-3.5 px-4">{w.coupleNames}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">{w.date}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900">{formatNumber(w.guestsCount)}</span>
                    <span className="text-slate-400"> / {w.rsvpRate}% RSVP</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                      {w.plan}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={clsx(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                      w.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    )}>
                      {w.status === 'Active' ? (language === 'vi' ? 'Hoạt động' : 'Active') : (language === 'vi' ? 'Lưu trữ' : 'Archived')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
