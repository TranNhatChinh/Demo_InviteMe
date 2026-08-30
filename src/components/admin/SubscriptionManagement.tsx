import React from 'react';
import { useApp } from '../../context/AppContext';
import { CreditCard, TrendingUp, Users, CheckCircle2, Zap, Shield, ArrowUpRight } from 'lucide-react';
import { Button } from '../common/Button';

export const SubscriptionManagement: React.FC = () => {
  const { subscriptionPlans } = useApp();

  const metrics = [
    { title: 'Monthly Recurring Revenue', value: '248,000,000 VND', change: '+18.9% vs last month', sub: 'Calculated across active cohorts' },
    { title: 'Free to Paid Conversion', value: '18.4%', change: '+2.1% this quarter', sub: 'Industry benchmark: 9.2%' },
    { title: 'Gross Churn Rate', value: '1.2%', change: '-0.3% improvement', sub: 'Near-zero cancellation during planning' },
    { title: 'Annual Contract Value', value: '1,780,000 VND', change: '+12.4% MoM', sub: 'Boosted by Concierge add-ons' },
  ];

  const recentTransactions = [
    { id: 'SUB-9812', couple: 'Emily Nguyen & James Tran', plan: 'Luxury Premium', amount: '1,490,000 VND', date: 'Aug 10, 2026', status: 'Settled' },
    { id: 'SUB-9805', couple: 'Đoàn Nhật Minh & Mai Thu', plan: 'Planner Business', amount: '4,900,000 VND', date: 'Aug 22, 2026', status: 'Settled' },
    { id: 'SUB-9799', couple: 'Bảo Anh & Quốc Khánh', plan: 'Luxury Premium', amount: '1,490,000 VND', date: 'Aug 26, 2026', status: 'Settled' },
    { id: 'SUB-9780', couple: 'Hoàng Long & Kim Yến', plan: 'Free Starter', amount: '0 VND', date: 'Aug 28, 2026', status: 'Active' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <CreditCard className="w-3.5 h-3.5 text-slate-600" />
            <span>Monetization & SaaS Revenue Desk</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Subscription & Pricing Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Monitor plan conversion, churn metrics, and pricing tier configurations.
          </p>
        </div>
      </div>

      {/* 4 Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              {m.title}
            </span>
            <div className="font-sans font-bold text-xl text-slate-900">{m.value}</div>
            <div className="text-xs font-semibold text-emerald-700">{m.change}</div>
            <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Pricing Tier Matrix */}
      <div className="space-y-3">
        <h3 className="font-sans font-bold text-lg text-slate-900">
          Live Pricing Tier Architecture
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl p-6 border shadow-xs space-y-5 flex flex-col justify-between relative ${
                plan.isPopular ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-slate-200'
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-2.5 right-6 px-2.5 py-0.5 rounded-full bg-brand-deep text-white text-[9px] uppercase font-bold tracking-wider shadow-xs">
                  Highest Conversion (64%)
                </span>
              )}

              <div className="space-y-2">
                <h4 className="font-sans font-bold text-lg text-slate-900">{plan.name}</h4>
                <div className="flex items-baseline gap-1">
                  <span className="font-sans font-bold text-2xl text-slate-900">{plan.priceVND}</span>
                  <span className="text-xs text-slate-400">/ {plan.billingPeriod}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{plan.tagline}</p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs">
                {plan.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              <Button variant={plan.isPopular ? 'primary' : 'secondary'} size="sm" className="w-full justify-center">
                Configure Tier
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Subscriptions Ledger */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-sans font-bold text-base text-slate-900">
          Recent Subscription Transactions
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
                <th className="py-3 px-4">Invoice Ref</th>
                <th className="py-3 px-4">Customer Account</th>
                <th className="py-3 px-4">Plan Tier</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {recentTransactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-700">{tx.id}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{tx.couple}</td>
                  <td className="py-3 px-4 font-semibold text-brand-deep">{tx.plan}</td>
                  <td className="py-3 px-4 font-mono font-bold">{tx.amount}</td>
                  <td className="py-3 px-4 text-slate-500">{tx.date}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {tx.status}
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
