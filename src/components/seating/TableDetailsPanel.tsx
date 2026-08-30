import React from 'react';
import { useApp } from '../../context/AppContext';
import { TableItem, Guest } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import {
  Armchair,
  AlertTriangle,
  Users,
  Trash2,
  Edit2,
  Plus,
  Utensils,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { clsx } from 'clsx';

interface TableDetailsPanelProps {
  tableNumber: string;
  onOpenAddGuestToTable?: () => void;
}

export const TableDetailsPanel: React.FC<TableDetailsPanelProps> = ({
  tableNumber,
  onOpenAddGuestToTable,
}) => {
  const { tables, guests, unassignGuest, setSelectedGuestId } = useApp();

  const currentTable = tables.find((t) => t.tableNumber === tableNumber) || tables[0];
  const tableGuests = guests.filter((g) => g.tableNumber === currentTable.tableNumber);

  const currentCount = tableGuests.length;
  const capacity = currentTable.capacity;
  const remaining = capacity - currentCount;
  const isOverCapacity = currentCount > capacity;

  return (
    <div className="w-full lg:w-80 xl:w-88 bg-white rounded-3xl border border-brand-border shadow-card flex flex-col justify-between overflow-hidden shrink-0">
      {/* Header */}
      <div className="p-5 border-b border-brand-border bg-gradient-to-r from-white via-brand-bg/50 to-brand-blush/30 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Armchair className="w-4 h-4 text-brand-deep" />
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {currentTable.tableNumber}
              </h3>
            </div>
            <p className="text-xs text-brand-muted mt-0.5">{currentTable.name}</p>
          </div>

          <span
            className={clsx(
              'px-2.5 py-1 rounded-full text-xs font-serif font-bold border',
              isOverCapacity
                ? 'bg-rose-100 text-rose-700 border-rose-300'
                : remaining === 0
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : 'bg-brand-soft text-brand-deep border-brand-primary/30'
            )}
          >
            {isOverCapacity ? 'Over Capacity' : remaining === 0 ? 'Full' : `${remaining} Seats Left`}
          </span>
        </div>

        {/* Capacity summary metrics bar */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-brand-border/60 text-center">
          <div className="p-2 rounded-xl bg-white border border-brand-border/80 space-y-0.5">
            <span className="text-[10px] text-brand-muted uppercase tracking-wider block">Capacity</span>
            <span className="font-serif font-bold text-base text-brand-dark">{capacity}</span>
          </div>

          <div className="p-2 rounded-xl bg-white border border-brand-border/80 space-y-0.5">
            <span className="text-[10px] text-brand-muted uppercase tracking-wider block">Assigned</span>
            <span
              className={clsx(
                'font-serif font-bold text-base',
                isOverCapacity ? 'text-rose-600' : 'text-brand-deep'
              )}
            >
              {currentCount}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-white border border-brand-border/80 space-y-0.5">
            <span className="text-[10px] text-brand-muted uppercase tracking-wider block">Remaining</span>
            <span
              className={clsx(
                'font-serif font-bold text-base',
                remaining < 0 ? 'text-rose-600 font-bold' : 'text-emerald-700'
              )}
            >
              {remaining}
            </span>
          </div>
        </div>

        {isOverCapacity && (
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>Table exceeds capacity by {Math.abs(remaining)} seat(s).</span>
          </div>
        )}
      </div>

      {/* Guest List for this table */}
      <div className="p-4 overflow-y-auto flex-1 space-y-2.5 max-h-[480px]">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-dark mb-2">
          <span>Assigned Guests ({tableGuests.length})</span>
          <span className="text-[11px] text-brand-muted">{currentTable.category} Table</span>
        </div>

        {tableGuests.length > 0 ? (
          tableGuests.map((guest) => (
            <div
              key={guest.id}
              onClick={() => setSelectedGuestId(guest.id)}
              className="p-3 rounded-2xl bg-brand-bg/40 border border-brand-border/80 hover:border-brand-primary hover:bg-white transition-all cursor-pointer flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={guest.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-brand-border shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-xs text-brand-dark truncate">{guest.fullName}</p>
                  <p className="text-[11px] text-brand-muted truncate">
                    {guest.relationship} {guest.companions > 0 && `(+${guest.companions})`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <Badge status={guest.rsvpStatus} size="sm" />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    unassignGuest(guest.id);
                  }}
                  className="p-1 text-brand-muted hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                  title="Remove from table"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-brand-muted text-xs italic">
            No guests currently seated at this table.
          </div>
        )}
      </div>

      {/* Footer Info & Note */}
      <div className="p-4 border-t border-brand-border bg-brand-bg/50 space-y-2">
        <p className="text-[11px] text-brand-muted leading-tight">
          <strong>Note:</strong> {currentTable.notes || 'Grand Ballroom main floor seating.'}
        </p>
      </div>
    </div>
  );
};
