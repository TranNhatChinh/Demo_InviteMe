import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { RSVPStatus, CheckInStatus, GuestGroup } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Input, Select, TextArea } from '../common/Input';
import {
  X,
  User,
  Mail,
  Phone,
  Heart,
  Sparkles,
  Utensils,
  Armchair,
  QrCode,
  Calendar,
  Clock,
  Trash2,
  Send,
  CheckCircle2,
  Gift,
  MessageSquareHeart,
} from 'lucide-react';
import { clsx } from 'clsx';

export const GuestDrawer: React.FC = () => {
  const {
    selectedGuestId,
    setSelectedGuestId,
    guests,
    updateGuest,
    deleteGuest,
    toggleCheckIn,
  } = useApp();

  const guest = guests.find((g) => g.id === selectedGuestId);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('');
  const [group, setGroup] = useState<GuestGroup>('Friends');
  const [rsvpStatus, setRsvpStatus] = useState<RSVPStatus>('Pending');
  const [companions, setCompanions] = useState(0);
  const [tableNumber, setTableNumber] = useState('Unassigned');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [isVip, setIsVip] = useState(false);

  useEffect(() => {
    if (guest) {
      setFullName(guest.fullName);
      setEmail(guest.email);
      setPhone(guest.phone);
      setRelationship(guest.relationship);
      setGroup(guest.group);
      setRsvpStatus(guest.rsvpStatus);
      setCompanions(guest.companions);
      setTableNumber(guest.tableNumber);
      setDietaryNotes(guest.dietaryNotes || '');
      setIsVip(guest.isVip);
    }
  }, [guest]);

  if (!guest) return null;

  const handleSave = () => {
    updateGuest(guest.id, {
      fullName,
      email,
      phone,
      relationship,
      group,
      rsvpStatus,
      companions: Number(companions),
      tableNumber,
      dietaryNotes: dietaryNotes.trim() ? dietaryNotes.trim() : undefined,
      isVip,
    });
  };

  const tableOptions = [
    { value: 'Unassigned', label: 'Unassigned' },
    ...Array.from({ length: 15 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return { value: `Table ${num}`, label: `Table ${num}` };
    }),
  ];

  const groupOptions = [
    { value: 'Friends', label: 'Friends' },
    { value: 'Family', label: 'Family' },
    { value: 'Colleagues', label: 'Colleagues' },
    { value: 'VIP', label: 'VIP' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/30 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={() => setSelectedGuestId(null)}
      />

      {/* Sliding Drawer Container */}
      <div className="relative w-full max-w-lg bg-white h-full shadow-modal border-l border-brand-border z-10 flex flex-col justify-between overflow-hidden animate-drawer-in">
        {/* Header */}
        <div className="p-6 border-b border-brand-border/80 bg-gradient-to-r from-brand-bg to-white flex items-start justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={guest.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120'}
                alt={guest.fullName}
                className="w-13 h-13 rounded-full object-cover border-2 border-brand-primary shadow-xs"
              />
              {guest.isVip && (
                <span className="absolute -bottom-1 -right-1 p-1 bg-amber-400 text-white rounded-full shadow-xs" title="VIP Guest">
                  <Sparkles className="w-3 h-3" />
                </span>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  {guest.fullName}
                </h3>
                {guest.isVip && <Badge status="VIP" size="sm" />}
              </div>
              <p className="text-xs text-brand-muted">
                {guest.relationship} • {guest.group}
              </p>
            </div>
          </div>

          <button
            onClick={() => setSelectedGuestId(null)}
            className="text-brand-muted hover:text-brand-dark p-1.5 rounded-lg hover:bg-brand-bg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick Check-in & RSVP Status Bar */}
          <div className="p-4 rounded-xl bg-brand-bg/50 border border-brand-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-brand-dark">RSVP Status</span>
              <Badge status={rsvpStatus} />
            </div>

            {/* Quick RSVP Status Selector Buttons */}
            <div className="grid grid-cols-4 gap-1.5 pt-1">
              {(['Confirmed', 'Pending', 'Declined', 'Maybe'] as RSVPStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setRsvpStatus(status)}
                  className={clsx(
                    'py-1.5 text-xs font-semibold rounded-lg border transition-all',
                    rsvpStatus === status
                      ? status === 'Confirmed'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : status === 'Pending'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : status === 'Declined'
                        ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                        : 'bg-purple-600 text-white border-purple-600 shadow-xs'
                      : 'bg-white border-brand-border text-brand-muted hover:bg-brand-soft/40 hover:text-brand-dark'
                  )}
                >
                  {status}
                </button>
              ))}
            </div>

            {/* Quick Reception Check-in button */}
            <div className="pt-2 flex items-center justify-between border-t border-brand-border/60">
              <div className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-brand-accent" />
                <div>
                  <span className="text-xs font-medium text-brand-dark block">Reception Check-in</span>
                  <span className="text-[10px] text-brand-muted">{guest.checkInStatus}</span>
                </div>
              </div>
              <Button
                size="sm"
                variant={guest.checkInStatus === 'Checked-in' ? 'soft-pink' : 'secondary'}
                onClick={() => toggleCheckIn(guest.id)}
              >
                {guest.checkInStatus === 'Checked-in' ? 'Revert Check-in' : 'Mark Checked-in'}
              </Button>
            </div>
          </div>

          {/* Guest Details Form */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider">
              Guest Contact & Preferences
            </h4>

            <Input
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User className="w-4 h-4" />}
            />

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
              />
              <Input
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                icon={<Phone className="w-4 h-4" />}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Relationship"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
              <Select
                label="Guest Group"
                value={group}
                onChange={(e) => setGroup(e.target.value as GuestGroup)}
                options={groupOptions}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Allowed Companions (+1)"
                type="number"
                min="0"
                max="5"
                value={companions}
                onChange={(e) => setCompanions(parseInt(e.target.value) || 0)}
              />
              <Select
                label="Assigned Table"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                options={tableOptions}
              />
            </div>

            <Input
              label="Dietary Restrictions"
              value={dietaryNotes}
              onChange={(e) => setDietaryNotes(e.target.value)}
              placeholder="e.g. Vegetarian, Halal, Seafood allergy"
              icon={<Utensils className="w-4 h-4" />}
            />
          </div>

          {/* Gift & Wishes Card (If present) */}
          {(guest.giftAmountVND || guest.wishMessage) && (
            <div className="p-4 rounded-xl bg-gradient-to-br from-brand-blush/40 to-white border border-brand-primary/30 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-brand-deep flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-brand-accent" />
                  Wedding Gift & Blessing
                </span>
                {guest.giftAmountVND && (
                  <span className="font-serif font-bold text-sm text-brand-dark">
                    {(guest.giftAmountVND).toLocaleString()} VND
                  </span>
                )}
              </div>
              {guest.wishMessage && (
                <p className="text-xs italic text-brand-muted bg-white p-3 rounded-lg border border-brand-border/60">
                  "{guest.wishMessage}"
                </p>
              )}
            </div>
          )}

          {/* Activity Timeline */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-accent" />
              Guest Journey Timeline
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-brand-border">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-brand-primary ring-4 ring-white" />
                <p className="text-xs font-semibold text-brand-dark">Invitation broadcast sent</p>
                <p className="text-[11px] text-brand-muted">{guest.invitationSentAt || 'Aug 15, 2026'}</p>
              </div>

              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-brand-accent ring-4 ring-white" />
                <p className="text-xs font-semibold text-brand-dark">Digital invitation opened</p>
                <p className="text-[11px] text-brand-muted">{guest.invitationOpenedAt || 'Aug 16, 2026'}</p>
              </div>

              {guest.rsvpStatus !== 'Pending' && (
                <div className="relative">
                  <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                  <p className="text-xs font-semibold text-brand-dark">
                    RSVP submitted as <span className="text-emerald-700">{guest.rsvpStatus}</span>
                  </p>
                  <p className="text-[11px] text-brand-muted">{guest.rsvpSubmittedAt || 'Aug 18, 2026'}</p>
                </div>
              )}

              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-purple-400 ring-4 ring-white" />
                <p className="text-xs font-semibold text-brand-dark">
                  Table assigned: <span className="text-brand-deep font-semibold">{guest.tableNumber}</span>
                </p>
                <p className="text-[11px] text-brand-muted">Automated floor assignment</p>
              </div>

              {guest.checkInStatus === 'Checked-in' && (
                <div className="relative">
                  <span className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-sky-500 ring-4 ring-white" />
                  <p className="text-xs font-semibold text-sky-700">Reception Check-in verified</p>
                  <p className="text-[11px] text-brand-muted">Scanned via QR Code</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-brand-border bg-brand-bg/50 flex items-center justify-between gap-3">
          <Button
            variant="danger"
            size="sm"
            icon={<Trash2 className="w-3.5 h-3.5" />}
            onClick={() => deleteGuest(guest.id)}
          >
            Remove
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedGuestId(null)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
