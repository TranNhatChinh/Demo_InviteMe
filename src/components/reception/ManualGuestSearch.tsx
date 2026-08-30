import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Guest } from '../../types';
import { SearchInput } from '../common/Input';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Search, CheckCircle2, Armchair, Phone, Mail, UserCheck, Users } from 'lucide-react';
import { clsx } from 'clsx';

export const ManualGuestSearch: React.FC = () => {
  const { guests, checkInGuestDirect } = useApp();
  const [search, setSearch] = useState('');

  const filteredGuests = useMemo(() => {
    if (!search.trim()) {
      return guests.slice(0, 15);
    }
    const q = search.toLowerCase();
    return guests.filter(
      (g) =>
        g.fullName.toLowerCase().includes(q) ||
        g.phone.includes(q) ||
        g.email.toLowerCase().includes(q) ||
        g.tableNumber.toLowerCase().includes(q)
    );
  }, [guests, search]);

  const handleCheckIn = (guestId: string) => {
    checkInGuestDirect(guestId, 'Linh Tran');
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      {/* Header & Big Search Input */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Search className="w-3.5 h-3.5 text-brand-accent" />
            <span>Fast Manual Registry</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            Manual Guest Search & Check-in
          </h2>
          <p className="text-xs sm:text-sm text-brand-muted">
            Search guest by name, telephone, email address or assigned table code.
          </p>
        </div>

        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search by full name, phone (+84...), email, or table..."
          className="text-sm py-3"
        />
      </div>

      {/* Results List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-brand-muted px-2">
          <span>Search Results ({filteredGuests.length} Guests)</span>
          <span>Click Check In to instantly verify entrance</span>
        </div>

        <div className="grid grid-cols-1 gap-3">
          {filteredGuests.map((guest) => {
            const isCheckedIn = guest.checkInStatus === 'Checked-in';

            return (
              <div
                key={guest.id}
                className={clsx(
                  'bg-white rounded-3xl p-4 sm:p-5 border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-subtle',
                  isCheckedIn
                    ? 'border-emerald-200/80 bg-emerald-50/15'
                    : 'border-brand-border hover:border-brand-primary/60 hover:shadow-card'
                )}
              >
                {/* Guest Identity */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={guest.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                    alt=""
                    className="w-12 h-12 rounded-2xl object-cover border border-brand-border shrink-0 shadow-xs"
                  />

                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base sm:text-lg text-brand-dark truncate">
                        {guest.fullName}
                      </h4>
                      {guest.isVip && (
                        <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                          VIP
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-brand-muted">
                      <span>{guest.relationship} • {guest.group}</span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <Phone className="w-3 h-3 text-brand-accent" />
                        {guest.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Table Allocation & Check-in CTA */}
                <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-brand-border/60">
                  {/* Table Badge */}
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
                      Table Allocation
                    </span>
                    <span className="font-serif font-bold text-sm sm:text-base text-brand-deep flex items-center gap-1">
                      <Armchair className="w-4 h-4 text-brand-accent" />
                      {guest.tableNumber}
                    </span>
                  </div>

                  {/* Check-in Status Button */}
                  <div>
                    {isCheckedIn ? (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold shadow-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Checked-in ✓</span>
                      </span>
                    ) : (
                      <Button
                        variant="primary"
                        size="md"
                        icon={<UserCheck className="w-4 h-4" />}
                        onClick={() => handleCheckIn(guest.id)}
                      >
                        Check In
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
