import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertCircle, AlertTriangle, CheckCircle2, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '../common/Button';

interface SeatingValidationBannerProps {
  onOpenAutoSeating: () => void;
}

export const SeatingValidationBanner: React.FC<SeatingValidationBannerProps> = ({
  onOpenAutoSeating,
}) => {
  const { seatingStats } = useApp();

  const hasIssues = seatingStats.unassignedGuests > 0 || seatingStats.overCapacityCount > 0;

  if (!hasIssues) {
    return (
      <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-semibold text-xs sm:text-sm">Seating arrangement is perfectly balanced</p>
            <p className="text-[11px] text-emerald-700">All guests assigned, 0 tables over capacity.</p>
          </div>
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
          Ready for Banquet
        </span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-rose-50/40 to-white border border-amber-200 text-amber-900 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3.5">
        <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="font-serif font-bold text-base text-brand-dark">
              Seating Needs Attention
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-200">
              {seatingStats.overCapacityCount} Over Capacity
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-amber-800/90 font-medium">
            <span>• <strong>{seatingStats.unassignedGuests} guests</strong> unassigned</span>
            <span>• <strong>{seatingStats.overCapacityCount} tables</strong> over capacity (e.g. Table 05)</span>
            <span>• <strong>3 tables</strong> have empty seats available</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 self-end sm:self-center shrink-0">
        <Button
          variant="primary"
          size="sm"
          icon={<Wand2 className="w-3.5 h-3.5" />}
          onClick={onOpenAutoSeating}
        >
          Auto Suggest Seating
        </Button>
      </div>
    </div>
  );
};
