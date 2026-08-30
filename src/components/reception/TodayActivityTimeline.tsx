import React from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, UserPlus, Sparkles, Armchair, Users } from 'lucide-react';

export const TodayActivityTimeline: React.FC = () => {
  const { checkInRecords, wedding } = useApp();

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-6 max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between border-b border-brand-border/60 pb-4">
        <div className="space-y-0.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Clock className="w-3.5 h-3.5 text-brand-accent" />
            <span>Real-time Log</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-brand-dark">
            Today's Check-in & Arrival Activity
          </h2>
          <p className="text-xs text-brand-muted">
            Chronological audit stream of guest arrivals, companions, and door walk-ins
          </p>
        </div>

        <span className="font-mono text-xs font-bold text-brand-deep bg-brand-bg px-3 py-1.5 rounded-xl border border-brand-border">
          {checkInRecords.length} Events Recorded
        </span>
      </div>

      {/* Activity Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-border">
        {checkInRecords.map((rec) => (
          <div key={rec.id} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-6 top-1 w-5 h-5 rounded-full bg-white border-2 border-brand-deep flex items-center justify-center shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>

            {/* Event Card */}
            <div className="bg-brand-bg/40 hover:bg-brand-bg/80 border border-brand-border/70 rounded-2xl p-4 transition-all flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <img
                  src={rec.guestAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80'}
                  alt=""
                  className="w-10 h-10 rounded-xl object-cover border border-brand-border shrink-0"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-brand-dark">{rec.guestName}</h4>
                    {rec.isWalkIn ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                        Walk-in Guest
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                        Checked In
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-brand-muted">
                    Seated at <strong>{rec.tableNumber}</strong> • {rec.guestsCount} Attendee(s) • Staff: {rec.staffName}
                  </p>
                </div>
              </div>

              {/* Timestamp */}
              <span className="font-mono font-bold text-xs text-brand-deep bg-white px-2.5 py-1 rounded-lg border border-brand-border shadow-xs shrink-0">
                {rec.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
