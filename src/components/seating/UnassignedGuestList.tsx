import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Guest, GuestGroup } from '../../types';
import { SearchInput } from '../common/Input';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Users, GripVertical, Plus, UserPlus, Sparkles, Utensils } from 'lucide-react';
import { clsx } from 'clsx';

interface UnassignedGuestListProps {
  onAssignToActiveTable: (guest: Guest) => void;
}

export const UnassignedGuestList: React.FC<UnassignedGuestListProps> = ({
  onAssignToActiveTable,
}) => {
  const { seatingStats, setSelectedGuestId, selectedTableId } = useApp();
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');

  const groups: { label: string; value: string }[] = [
    { label: 'All', value: 'All' },
    { label: 'VIP', value: 'VIP' },
    { label: 'Family', value: 'Family' },
    { label: 'Friends', value: 'Friends' },
    { label: 'Colleagues', value: 'Colleagues' },
  ];

  const filteredUnassigned = useMemo(() => {
    return seatingStats.unassignedList.filter((g) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          g.fullName.toLowerCase().includes(q) ||
          g.relationship.toLowerCase().includes(q) ||
          g.email.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedGroup !== 'All' && g.group !== selectedGroup) {
        return false;
      }
      return true;
    });
  }, [seatingStats.unassignedList, search, selectedGroup]);

  return (
    <div className="w-full lg:w-80 xl:w-88 bg-white rounded-3xl border border-brand-border shadow-card flex flex-col justify-between overflow-hidden shrink-0">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-brand-border bg-gradient-to-r from-brand-bg/80 to-white space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-deep" />
            <h3 className="font-serif font-bold text-base text-brand-dark">
              Unassigned Guests
            </h3>
          </div>
          <span className="font-serif font-bold text-sm px-2.5 py-0.5 rounded-full bg-brand-soft text-brand-deep border border-brand-primary/30">
            {seatingStats.unassignedGuests} Guests
          </span>
        </div>

        {/* Search */}
        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Filter unassigned..."
        />

        {/* Group Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {groups.map((grp) => (
            <button
              key={grp.value}
              onClick={() => setSelectedGroup(grp.value)}
              className={clsx(
                'px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 border select-none',
                selectedGroup === grp.value
                  ? 'bg-brand-deep text-white border-brand-deep font-semibold shadow-xs'
                  : 'bg-white text-brand-muted border-brand-border hover:bg-brand-bg'
              )}
            >
              {grp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Draggable-styled guest cards list */}
      <div className="p-3.5 overflow-y-auto flex-1 space-y-2 max-h-[580px]">
        {filteredUnassigned.length > 0 ? (
          filteredUnassigned.map((guest) => (
            <div
              key={guest.id}
              onClick={() => setSelectedGuestId(guest.id)}
              className="p-3 rounded-2xl bg-white border border-brand-border/90 hover:border-brand-primary hover:shadow-hover transition-all cursor-pointer group flex flex-col justify-between space-y-2 select-none"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <GripVertical className="w-3.5 h-3.5 text-brand-muted/40 cursor-grab shrink-0" />
                  <img
                    src={guest.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover border border-brand-border shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-semibold text-xs text-brand-dark group-hover:text-brand-deep truncate">
                        {guest.fullName}
                      </span>
                      {guest.isVip && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />}
                    </div>
                    <p className="text-[11px] text-brand-muted truncate">
                      {guest.relationship} • {guest.group}
                    </p>
                  </div>
                </div>

                <Badge status={guest.rsvpStatus} size="sm" />
              </div>

              {/* Card Footer with Quick Assign to currently selected table */}
              <div className="flex items-center justify-between pt-1 border-t border-brand-border/50 text-[11px]">
                <span className="text-brand-muted">
                  {guest.companions > 0 ? `+${guest.companions} Companion` : 'Solo'}
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAssignToActiveTable(guest);
                  }}
                  className="px-2 py-0.5 rounded-md bg-brand-soft/70 hover:bg-brand-soft text-brand-deep font-semibold transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Assign to {selectedTableId || 'Table'}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-12 text-center text-brand-muted space-y-1">
            <p className="text-xs font-semibold text-brand-dark">No unassigned guests</p>
            <p className="text-[11px]">All guests matching this filter have tables!</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-brand-border bg-brand-bg/50 text-center text-[11px] text-brand-muted">
        Drag or click Assign to place into tables
      </div>
    </div>
  );
};
