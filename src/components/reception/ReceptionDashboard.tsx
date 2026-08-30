import React from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import {
  Users,
  CheckCircle2,
  Clock,
  UserPlus,
  QrCode,
  Search,
  Armchair,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface ReceptionDashboardProps {
  onSwitchTab: (tab: 'scanner' | 'search' | 'walkin' | 'activity') => void;
  onOpenWalkInModal: () => void;
}

export const ReceptionDashboard: React.FC<ReceptionDashboardProps> = ({
  onSwitchTab,
  onOpenWalkInModal,
}) => {
  const { receptionMetrics, checkInRecords, wedding } = useApp();

  const checkInPercent = Math.round((receptionMetrics.checkedIn / receptionMetrics.expected) * 100);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 5 Top Operational KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">Expected</span>
            <Users className="w-4 h-4 text-brand-muted" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            {receptionMetrics.expected}
          </div>
          <p className="text-[11px] text-brand-muted">Target banquet attendees</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-card space-y-2 bg-emerald-50/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Checked-in</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-emerald-700">
            {receptionMetrics.checkedIn}
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">{checkInPercent}% Ballroom Occupancy</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-amber-200/80 shadow-card space-y-2 bg-amber-50/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Remaining</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-amber-700">
            {receptionMetrics.remaining}
          </div>
          <p className="text-[11px] text-amber-700">En route / Arriving soon</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-sky-200/80 shadow-card space-y-2 bg-sky-50/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">Walk-ins</span>
            <UserPlus className="w-4 h-4 text-sky-600" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-sky-700">
            {receptionMetrics.walkIns}
          </div>
          <p className="text-[11px] text-sky-700">Registered at entrance</p>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted">No-show</span>
            <span className="w-2 h-2 rounded-full bg-gray-300" />
          </div>
          <div className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            {receptionMetrics.noShow}
          </div>
          <p className="text-[11px] text-brand-muted">Zero unverified absences</p>
        </div>
      </div>

      {/* Operations Quick Action Launcher & Recent Check-in Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 5 Cols: Quick Launchers */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-gradient-to-br from-brand-dark to-[#1C1517] rounded-3xl p-6 text-white shadow-modal space-y-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-soft">
              Primary Check-in Station
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Launch High-Speed Scanner
            </h3>
            <p className="text-xs text-white/80 leading-relaxed font-light">
              Point iPad or camera at digital QR passes for instant admission and badge printing.
            </p>

            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center"
              icon={<QrCode className="w-5 h-5" />}
              onClick={() => onSwitchTab('scanner')}
            >
              Open Camera Scanner
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onSwitchTab('search')}
              className="p-5 rounded-3xl bg-white border border-brand-border hover:border-brand-primary hover:shadow-card transition-all text-left space-y-2 shadow-subtle group"
            >
              <div className="w-10 h-10 rounded-2xl bg-brand-soft text-brand-deep flex items-center justify-center group-hover:scale-105 transition-transform">
                <Search className="w-5 h-5 text-brand-accent" />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-dark">Manual Search</h4>
              <p className="text-[11px] text-brand-muted leading-tight">Search by guest name or phone</p>
            </button>

            <button
              onClick={onOpenWalkInModal}
              className="p-5 rounded-3xl bg-white border border-brand-border hover:border-brand-primary hover:shadow-card transition-all text-left space-y-2 shadow-subtle group"
            >
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserPlus className="w-5 h-5 text-sky-600" />
              </div>
              <h4 className="font-serif font-bold text-base text-brand-dark">Walk-in Guest</h4>
              <p className="text-[11px] text-brand-muted leading-tight">Add unlisted door arrival</p>
            </button>
          </div>
        </div>

        {/* Right 7 Cols: Recent Check-in Feed */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                Live Check-in Stream
              </h3>
              <p className="text-xs text-brand-muted">Latest reception verifications at The Reverie Saigon</p>
            </div>

            <button
              onClick={() => onSwitchTab('activity')}
              className="text-xs font-semibold text-brand-deep hover:underline flex items-center gap-1"
            >
              <span>View Full Timeline</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {checkInRecords.slice(0, 6).map((rec) => (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl bg-brand-bg/40 border border-brand-border/70 flex items-center justify-between gap-3 text-xs hover:bg-brand-bg transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={rec.guestAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border border-brand-border shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-dark truncate">{rec.guestName}</p>
                    <p className="text-[11px] text-brand-muted">
                      {rec.relationship} • {rec.guestsCount} Guest(s)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  <span className="font-serif font-bold text-xs text-brand-deep bg-white px-2.5 py-1 rounded-lg border border-brand-border">
                    {rec.tableNumber}
                  </span>
                  <span className="font-mono font-bold text-xs text-brand-dark">
                    {rec.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
