import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, TrendingUp, Users, Heart, UserCheck, CreditCard, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export const AdminAnalytics: React.FC = () => {
  const kpis = [
    { label: 'Daily Active Users (DAU)', value: '4,820', change: '+8.4% WoW' },
    { label: 'Monthly Active Users (MAU)', value: '28,940', change: '+19.2% MoM' },
    { label: 'Wedding Creation Rate', value: '+14.2%', change: '34 new weddings/day' },
    { label: 'RSVP Funnel Completion', value: '78.6%', change: 'Avg response time: 2.4 days' },
    { label: 'Avg Guests per Wedding', value: '142', change: '85% in major ballrooms' },
    { label: 'Gross Gift Volume Processed', value: '3.2B VND', change: 'Across all active events' },
  ];

  const templatePopularity = [
    { name: 'Blush Romance', category: 'Romantic', usage: 2481, percent: 34, color: 'bg-[#EFA3B5]' },
    { name: 'Modern Ivory', category: 'Modern', usage: 1842, percent: 25, color: 'bg-[#D4AF37]' },
    { name: 'Classic Elegance', category: 'Traditional', usage: 1120, percent: 16, color: 'bg-[#C5A880]' },
    { name: 'Editorial Rose', category: 'Romantic', usage: 890, percent: 12, color: 'bg-[#D97891]' },
    { name: 'Garden Bloom', category: 'Classic', usage: 756, percent: 8, color: 'bg-[#4FA87A]' },
    { name: 'Midnight Love', category: 'Luxury', usage: 430, percent: 5, color: 'bg-[#6C5CE7]' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <BarChart3 className="w-3.5 h-3.5 text-slate-600" />
            <span>Platform Growth & Behavioral Telemetry</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Admin Analytics Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time engagement telemetry, RSVP conversion funnels, and design popularity.
          </p>
        </div>
      </div>

      {/* 6 Top KPIs Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {k.label}
            </span>
            <div className="font-sans font-bold text-2xl text-slate-900">{k.value}</div>
            <p className="text-xs text-emerald-700 font-semibold">{k.change}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* RSVP Volume Progression (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">
                Weekly RSVP Volume & Completion
              </h3>
              <p className="text-xs text-slate-500">Daily guest confirmation submissions across platform</p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
              124.8K Total RSVPs
            </span>
          </div>

          <div className="flex items-end gap-3 h-48 pt-6 px-2 border-b border-slate-100">
            {[
              { day: 'Mon', count: 1420, height: '40%' },
              { day: 'Tue', count: 1890, height: '55%' },
              { day: 'Wed', count: 2340, height: '70%' },
              { day: 'Thu', count: 2850, height: '80%' },
              { day: 'Fri', count: 3410, height: '90%' },
              { day: 'Sat', count: 4120, height: '100%', highlight: true },
              { day: 'Sun', count: 3680, height: '88%' },
            ].map((bar, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  {bar.count}
                </span>
                <div
                  className={clsx(
                    'w-full rounded-t-lg transition-all duration-500',
                    bar.highlight
                      ? 'bg-slate-900 shadow-xs'
                      : 'bg-slate-200 hover:bg-slate-300'
                  )}
                  style={{ height: bar.height }}
                />
                <span className="text-[10px] text-slate-500 font-medium pt-1 truncate">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Template Popularity (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-base text-slate-900">
              Design Template Adoption
            </h3>
            <p className="text-xs text-slate-500">Market share by wedding aesthetic</p>
          </div>

          <div className="space-y-3 my-auto">
            {templatePopularity.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{item.name}</span>
                  <span className="font-mono text-slate-900 font-bold">{item.percent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full`}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600">
            Top Performing: <strong>Blush Romance (2,481 Live Weddings)</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
