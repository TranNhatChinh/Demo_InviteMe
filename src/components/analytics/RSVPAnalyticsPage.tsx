import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  BarChart3,
  TrendingUp,
  PieChart as PieIcon,
  Clock,
  CheckCircle2,
  Users,
  Utensils,
  Calendar,
  Layers,
  ArrowUpRight,
  Download,
  Share2,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export const RSVPAnalyticsPage: React.FC = () => {
  const { metrics, guests, wedding, setSelectedGuestId, setCurrentView } = useApp();
  const { t, formatNumber, language } = useLanguage();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'all'>('30d');

  // Status donut data
  const statusData = [
    { name: t.guests.statuses.confirmed, value: metrics.confirmed, color: '#4FA87A' },
    { name: t.guests.statuses.pending, value: metrics.pending, color: '#F4A261' },
    { name: t.guests.statuses.declined, value: metrics.declined, color: '#D95D69' },
    { name: t.guests.statuses.maybe, value: metrics.maybe, color: '#8E7DBE' },
  ];

  // Group breakdown data
  const groupStats = [
    {
      group: t.guests.groups.friends,
      confirmed: guests.filter((g) => g.group === 'Friends' && g.rsvpStatus === 'Confirmed').length,
      pending: guests.filter((g) => g.group === 'Friends' && g.rsvpStatus === 'Pending').length,
      declined: guests.filter((g) => g.group === 'Friends' && g.rsvpStatus === 'Declined').length,
      maybe: guests.filter((g) => g.group === 'Friends' && g.rsvpStatus === 'Maybe').length,
    },
    {
      group: t.guests.groups.family,
      confirmed: guests.filter((g) => g.group === 'Family' && g.rsvpStatus === 'Confirmed').length,
      pending: guests.filter((g) => g.group === 'Family' && g.rsvpStatus === 'Pending').length,
      declined: guests.filter((g) => g.group === 'Family' && g.rsvpStatus === 'Declined').length,
      maybe: guests.filter((g) => g.group === 'Family' && g.rsvpStatus === 'Maybe').length,
    },
    {
      group: t.guests.groups.colleagues,
      confirmed: guests.filter((g) => g.group === 'Colleagues' && g.rsvpStatus === 'Confirmed').length,
      pending: guests.filter((g) => g.group === 'Colleagues' && g.rsvpStatus === 'Pending').length,
      declined: guests.filter((g) => g.group === 'Colleagues' && g.rsvpStatus === 'Declined').length,
      maybe: guests.filter((g) => g.group === 'Colleagues' && g.rsvpStatus === 'Maybe').length,
    },
    {
      group: t.guests.groups.vip,
      confirmed: guests.filter((g) => g.group === 'VIP' && g.rsvpStatus === 'Confirmed').length,
      pending: guests.filter((g) => g.group === 'VIP' && g.rsvpStatus === 'Pending').length,
      declined: guests.filter((g) => g.group === 'VIP' && g.rsvpStatus === 'Declined').length,
      maybe: guests.filter((g) => g.group === 'VIP' && g.rsvpStatus === 'Maybe').length,
    },
  ];

  // Timeline curve
  const responseTimelineData = [
    { date: language === 'vi' ? '10 Th8' : 'Aug 10', total: 14, confirmed: 12, rate: '9%' },
    { date: language === 'vi' ? '13 Th8' : 'Aug 13', total: 38, confirmed: 34, rate: '25%' },
    { date: language === 'vi' ? '16 Th8' : 'Aug 16', total: 65, confirmed: 58, rate: '43%' },
    { date: language === 'vi' ? '20 Th8' : 'Aug 20', total: 92, confirmed: 81, rate: '61%' },
    { date: language === 'vi' ? '24 Th8' : 'Aug 24', total: 114, confirmed: 99, rate: '76%' },
    { date: language === 'vi' ? '28 Th8' : 'Aug 28', total: 124, confirmed: 108, rate: '82%' },
    { date: language === 'vi' ? '30 Th8' : 'Aug 30', total: 129, confirmed: metrics.confirmed, rate: `${metrics.responseRate}%` },
  ];

  // Dietary counts
  const dietaryCounts = {
    standard: guests.filter((g) => !g.dietaryNotes).length,
    vegetarian: guests.filter((g) => g.dietaryNotes?.toLowerCase().includes('vegetarian') || g.dietaryNotes?.toLowerCase().includes('chay')).length,
    noSeafood: guests.filter((g) => g.dietaryNotes?.toLowerCase().includes('seafood') || g.dietaryNotes?.toLowerCase().includes('hải sản')).length,
    glutenFree: guests.filter((g) => g.dietaryNotes?.toLowerCase().includes('gluten')).length,
    halal: guests.filter((g) => g.dietaryNotes?.toLowerCase().includes('halal')).length,
  };

  const dietaryData = [
    { name: language === 'vi' ? 'Thực đơn tiêu chuẩn' : 'Standard Menu', count: dietaryCounts.standard, color: 'bg-emerald-500' },
    { name: language === 'vi' ? 'Ăn chay' : 'Vegetarian', count: dietaryCounts.vegetarian || 12, color: 'bg-brand-primary' },
    { name: language === 'vi' ? 'Không hải sản' : 'No Seafood', count: dietaryCounts.noSeafood || 6, color: 'bg-amber-500' },
    { name: 'Gluten-Free', count: dietaryCounts.glutenFree || 4, color: 'bg-purple-500' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <BarChart3 className="w-3 h-3 text-brand-accent" />
            <span>{language === 'vi' ? 'Dữ liệu thời gian thực' : 'Real-time Intelligence'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.analytics.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.analytics.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-white p-1 rounded-xl border border-brand-border shadow-xs">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeRange === '7d' ? 'bg-brand-deep text-white' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              {language === 'vi' ? '7 Ngày' : '7 Days'}
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeRange === '30d' ? 'bg-brand-deep text-white' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              {language === 'vi' ? '30 Ngày' : '30 Days'}
            </button>
            <button
              onClick={() => setTimeRange('all')}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                timeRange === 'all' ? 'bg-brand-deep text-white' : 'text-brand-muted hover:text-brand-dark'
              }`}
            >
              {t.common.all}
            </button>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.analytics.responseRate}
          </span>
          <div className="font-serif text-3xl font-bold text-brand-deep">
            {metrics.responseRate}%
          </div>
          <p className="text-[10px] text-emerald-700 font-medium">+18% {language === 'vi' ? 'tuần này' : 'this week'}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.analytics.confirmedAttendees}
          </span>
          <div className="font-serif text-3xl font-bold text-emerald-700">
            {formatNumber(metrics.confirmed)}
          </div>
          <p className="text-[10px] text-brand-muted">{formatNumber(metrics.expectedHeadcount)} {language === 'vi' ? 'tổng người tham dự' : 'total attendees'}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.dashboard.pendingRSVP}
          </span>
          <div className="font-serif text-3xl font-bold text-amber-700">
            {formatNumber(metrics.pending)}
          </div>
          <p className="text-[10px] text-amber-700">{language === 'vi' ? 'Đang gửi nhắc nhở' : 'Follow-up queued'}</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">
            {t.guests.statuses.declined}
          </span>
          <div className="font-serif text-3xl font-bold text-rose-600">
            {formatNumber(metrics.declined)}
          </div>
          <p className="text-[10px] text-brand-muted">{Math.round((metrics.declined / metrics.totalGuests) * 100)}% {language === 'vi' ? 'tổng khách' : 'total guests'}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Donut Chart */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-brand-border shadow-card flex flex-col justify-between">
          <div className="space-y-1 mb-2">
            <h3 className="font-serif font-bold text-lg text-brand-dark">
              {t.analytics.attendanceBreakdown}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi' ? 'Tỷ lệ xác nhận và từ chối của khách' : 'Confirmation and decline proportions'}
            </p>
          </div>

          <div className="relative h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-brand-dark text-white px-3 py-1.5 rounded-xl text-xs space-y-0.5 shadow-modal">
                          <p className="font-semibold">{d.name}</p>
                          <p className="text-brand-soft">{d.value} {t.common.guestsUnit}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-serif text-3xl font-bold text-brand-dark leading-none">
                {formatNumber(metrics.totalGuests)}
              </span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider mt-0.5">
                {t.common.guestsUnit}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-brand-border/60">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-xl bg-brand-bg/50 border border-brand-border/40">
                <div className="flex items-center gap-1.5 text-xs text-brand-muted truncate">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="truncate">{item.name}</span>
                </div>
                <span className="font-serif font-bold text-sm text-brand-dark">
                  {formatNumber(item.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Area Chart */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-brand-border shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {t.analytics.timelineTracking}
              </h3>
              <p className="text-xs text-brand-muted">
                {language === 'vi' ? 'Tiến độ phản hồi tích lũy theo thời gian' : 'Cumulative response progress over time'}
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              {metrics.responseRate}% {language === 'vi' ? 'hoàn tất' : 'complete'}
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={responseTimelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="totalColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EFA3B5" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#EFA3B5" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="confirmedColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4FA87A" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#4FA87A" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F0E2E5" vertical={false} />
                <XAxis dataKey="date" stroke="#75676B" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#75676B" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="#EFA3B5"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#totalColor)"
                  name="Total"
                />
                <Area
                  type="monotone"
                  dataKey="confirmed"
                  stroke="#4FA87A"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#confirmedColor)"
                  name="Confirmed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Dietary & Cohort Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-brand-border shadow-card space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-brand-dark">
              {t.analytics.dietaryNotesTitle}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi' ? 'Tổng hợp khẩu phần ăn phục vụ nhà hàng' : 'Catering requirements for banquet kitchen'}
            </p>
          </div>

          <div className="space-y-3">
            {dietaryData.map((d) => (
              <div key={d.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-brand-dark">{d.name}</span>
                  <span className="font-semibold text-brand-deep">{formatNumber(d.count)} {t.common.guestsUnit}</span>
                </div>
                <div className="w-full h-2 bg-brand-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full ${d.color} rounded-full`}
                    style={{ width: `${(d.count / metrics.totalGuests) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-brand-border shadow-card space-y-4">
          <div className="space-y-1">
            <h3 className="font-serif font-bold text-lg text-brand-dark">
              {t.analytics.companionDistribution}
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi' ? 'Số lượng người đi cùng phân bổ theo nhóm' : 'Plus one distribution across guest circles'}
            </p>
          </div>

          <div className="space-y-3">
            {groupStats.map((grp) => (
              <div key={grp.group} className="flex items-center justify-between p-3 rounded-2xl bg-brand-bg/50 border border-brand-border/60">
                <span className="font-semibold text-xs text-brand-dark">{grp.group}</span>
                <div className="flex items-center gap-3 text-xs">
                  <span className="text-emerald-700 font-semibold">+{grp.confirmed} {t.guests.statuses.confirmed}</span>
                  <span className="text-amber-700">+{grp.pending} {t.guests.statuses.pending}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
