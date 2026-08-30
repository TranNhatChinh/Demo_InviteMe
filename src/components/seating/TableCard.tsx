import React from 'react';
import { TableItem, Guest } from '../../types';
import { Armchair, AlertTriangle, Users, CheckCircle2, Plus } from 'lucide-react';
import { clsx } from 'clsx';

interface TableCardProps {
  table: TableItem;
  guests: Guest[];
  isSelected: boolean;
  onSelectTable: (tableNumber: string) => void;
}

export const TableCard: React.FC<TableCardProps> = ({
  table,
  guests,
  isSelected,
  onSelectTable,
}) => {
  const currentCount = guests.length;
  const isOverCapacity = currentCount > table.capacity;
  const isFull = currentCount === table.capacity;
  const remaining = table.capacity - currentCount;

  return (
    <div
      onClick={() => onSelectTable(table.tableNumber)}
      className={clsx(
        'relative bg-white rounded-3xl p-4 sm:p-5 border cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-3 group select-none shadow-subtle',
        isSelected
          ? 'ring-2 ring-brand-deep border-brand-deep shadow-hover bg-brand-bg/20'
          : isOverCapacity
          ? 'border-rose-400 ring-2 ring-rose-200/60 shadow-xs'
          : 'border-brand-border hover:border-brand-primary/60 hover:shadow-hover'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="font-serif font-bold text-base sm:text-lg text-brand-dark group-hover:text-brand-deep transition-colors">
              {table.tableNumber}
            </h4>
            {table.category === 'VIP' && (
              <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                VIP
              </span>
            )}
          </div>
          <p className="text-[11px] text-brand-muted truncate max-w-[140px]">
            {table.name}
          </p>
        </div>

        {/* Capacity status badge */}
        <span
          className={clsx(
            'text-xs font-serif font-bold px-2.5 py-1 rounded-xl border',
            isOverCapacity
              ? 'bg-rose-100 text-rose-700 border-rose-300 animate-pulse'
              : isFull
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-brand-bg text-brand-dark border-brand-border'
          )}
        >
          {currentCount} / {table.capacity}
        </span>
      </div>

      {/* Center 2D circular/oval table representation */}
      <div className="py-2 flex items-center justify-center">
        <div
          className={clsx(
            'w-28 h-16 rounded-full border-2 flex flex-col items-center justify-center shadow-subtle transition-all',
            isOverCapacity
              ? 'bg-rose-50/70 border-rose-300'
              : isSelected
              ? 'bg-brand-soft/50 border-brand-deep'
              : 'bg-brand-bg/60 border-brand-border group-hover:border-brand-primary/50'
          )}
        >
          {isOverCapacity ? (
            <div className="flex items-center gap-1 text-[10px] font-bold text-rose-700 uppercase tracking-wider">
              <AlertTriangle className="w-3 h-3" />
              <span>Over Limit</span>
            </div>
          ) : (
            <span className="text-[11px] font-medium text-brand-muted">
              {remaining === 0 ? 'Full Table' : `${remaining} seat${remaining > 1 ? 's' : ''} left`}
            </span>
          )}

          {/* Mini avatar stack */}
          <div className="flex -space-x-1.5 pt-1">
            {guests.slice(0, 5).map((g, idx) => (
              <img
                key={idx}
                src={g.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'}
                alt=""
                className="w-4 h-4 rounded-full object-cover border border-white"
              />
            ))}
            {guests.length > 5 && (
              <span className="w-4 h-4 rounded-full bg-brand-soft text-brand-deep text-[9px] font-bold flex items-center justify-center border border-white">
                +{guests.length - 5}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Guest Name snippets list */}
      <div className="pt-2 border-t border-brand-border/60 text-[11px] space-y-0.5">
        {guests.slice(0, 2).map((g) => (
          <p key={g.id} className="text-brand-dark truncate font-medium flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-brand-primary shrink-0" />
            <span className="truncate">{g.fullName}</span>
          </p>
        ))}
        {guests.length === 0 && (
          <p className="text-brand-muted italic">Empty table</p>
        )}
      </div>
    </div>
  );
};
