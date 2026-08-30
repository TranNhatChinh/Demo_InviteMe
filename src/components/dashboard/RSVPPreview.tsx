import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
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
} from 'recharts';
import { BarChart3, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const RSVPPreview: React.FC = () => {
  const { metrics, guests, setCurrentView } = useApp();
  const { t, formatNumber, translateStatus, translateGroup, language } = useLanguage();

  // Donut chart data based on reactive metrics
  const donutData = [
    { name: t.guests.statuses.confirmed, value: metrics.confirmed, color: '#4FA87A' },
    { name: t.guests.statuses.pending, value: metrics.pending, color: '#F4A261' },
    { name: t.guests.statuses.declined, value: metrics.declined, color: '#D95D69' },
    { name: t.guests.statuses.maybe, value: metrics.maybe, color: '#8E7DBE' },
  ];

  // Realistic cumulative response velocity data
  const velocityData = [
    { date: language === 'vi' ? '10 Th8' : 'Aug 10', responses: 14, confirmed: 12 },
    { date: language === 'vi' ? '13 Th8' : 'Aug 13', responses: 38, confirmed: 34 },
    { date: language === 'vi' ? '16 Th8' : 'Aug 16', responses: 65, confirmed: 58 },
    { date: language === 'vi' ? '20 Th8' : 'Aug 20', responses: 92, confirmed: 81 },
    { date: language === 'vi' ? '24 Th8' : 'Aug 24', responses: 114, confirmed: 99 },
    { date: language === 'vi' ? '28 Th8' : 'Aug 28', responses: 124, confirmed: 108 },
    { date: language === 'vi' ? '30 Th8' : 'Aug 30', responses: 129, confirmed: metrics.confirmed },
  ];

  // Group distribution
  const groupCounts = {
    Family: guests.filter((g) => g.group === 'Family').length,
    Friends: guests.filter((g) => g.group === 'Friends').length,
    Colleagues: guests.filter((g) => g.group === 'Colleagues').length,
    VIP: guests.filter((g) => g.group === 'VIP').length,
  };

  const groupData = [
    { name: t.guests.groups.friends, count: groupCounts.Friends, color: 'bg-brand-primary', textColor: 'text-brand-deep' },
    { name: t.guests.groups.family, count: groupCounts.Family, color: 'bg-rose-400', textColor: 'text-rose-700' },
    { name: t.guests.groups.colleagues, count: groupCounts.Colleagues, color: 'bg-amber-400', textColor: 'text-amber-700' },
    { name: t.guests.groups.vip, count: groupCounts.VIP, color: 'bg-purple-400', textColor: 'text-purple-700' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 text-left">
      {/* Donut Chart Card (5 cols) */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-brand-border/80 shadow-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-4">
          <div className="space-y-0.5">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <span>{language === 'vi' ? 'Phân bố trạng thái RSVP' : 'RSVP Status Distribution'}</span>
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi'
                ? `Tỷ lệ phản hồi trực tiếp (${metrics.responseRate}%)`
                : `Live guest response breakdown (${metrics.responseRate}% total response rate)`}
            </p>
          </div>
          <button
            onClick={() => setCurrentView('rsvp-analytics')}
            className="text-xs text-brand-deep font-semibold hover:underline flex items-center gap-1"
          >
            {t.common.details} <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Chart with center overlay */}
        <div className="relative h-56 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={88}
                paddingAngle={4}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#FFFFFF" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-brand-dark text-white px-3 py-1.5 rounded-lg text-xs shadow-modal space-y-0.5">
                        <p className="font-semibold">{data.name}</p>
                        <p className="text-brand-soft">
                          {data.value} {t.common.guestsUnit} ({Math.round((data.value / metrics.totalGuests) * 100)}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Donut Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-serif text-3xl font-bold text-brand-dark leading-none">
              {formatNumber(metrics.totalGuests)}
            </span>
            <span className="text-[11px] font-semibold uppercase text-brand-muted tracking-wider mt-0.5">
              {t.common.guestsUnit}
            </span>
          </div>
        </div>

        {/* Legend pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-brand-border/60">
          {donutData.map((item) => (
            <div key={item.name} className="flex flex-col items-center p-2 rounded-lg bg-brand-bg/50 border border-brand-border/40">
              <div className="flex items-center gap-1.5 text-xs text-brand-muted truncate">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
              <span className="font-serif font-bold text-base text-brand-dark mt-0.5">
                {formatNumber(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Response Velocity Over Time (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-brand-border/80 shadow-card flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="space-y-0.5">
            <h3 className="font-serif text-lg font-bold text-brand-dark flex items-center gap-2">
              <span>{t.analytics.timelineTracking}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                +18% {language === 'vi' ? 'tăng trưởng' : 'velocity'}
              </span>
            </h3>
            <p className="text-xs text-brand-muted">
              {language === 'vi'
                ? 'Lượng phản hồi tích lũy kể từ khi gửi thiệp mời'
                : 'Cumulative replies received since invitation broadcast'}
            </p>
          </div>
        </div>

        {/* Area Chart */}
        <div className="h-52 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={velocityData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorResponses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EFA3B5" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#EFA3B5" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorConfirmed" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4FA87A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4FA87A" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0E2E5" vertical={false} />
              <XAxis dataKey="date" stroke="#75676B" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#75676B" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white border border-brand-border p-2.5 rounded-xl shadow-modal text-xs space-y-1">
                        <p className="font-semibold text-brand-dark">{label}</p>
                        <p className="text-brand-deep">
                          {language === 'vi' ? 'Tổng phản hồi' : 'Total Replies'}: {payload[0]?.value}
                        </p>
                        <p className="text-emerald-700">
                          {t.guests.statuses.confirmed}: {payload[1]?.value}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="responses"
                stroke="#EFA3B5"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#colorResponses)"
                name="Total Responses"
              />
              <Area
                type="monotone"
                dataKey="confirmed"
                stroke="#4FA87A"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorConfirmed)"
                name="Confirmed"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Group Distribution Progress Bars */}
        <div className="pt-4 border-t border-brand-border/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-brand-dark">
              {language === 'vi' ? 'Phân bố theo nhóm khách mời' : 'Guest Groups Distribution'}
            </span>
            <span className="text-brand-muted text-[11px]">
              {formatNumber(metrics.totalGuests)} {t.guests.subtitle.includes('khách') ? 'khách mời' : 'total invitations'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {groupData.map((g) => (
              <div key={g.name} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-brand-muted">{g.name}</span>
                  <span className="font-semibold text-brand-dark">{formatNumber(g.count)}</span>
                </div>
                <div className="w-full h-1.5 bg-brand-bg rounded-full overflow-hidden">
                  <div
                    className={`h-full ${g.color} rounded-full`}
                    style={{ width: `${(g.count / metrics.totalGuests) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
