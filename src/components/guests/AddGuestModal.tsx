import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Input, Select, TextArea } from '../common/Input';
import { Button } from '../common/Button';
import { GuestGroup, RSVPStatus } from '../../types';
import { User, Mail, Phone, Users, Sparkles, Send, Utensils } from 'lucide-react';

export const AddGuestModal: React.FC = () => {
  const { isAddGuestModalOpen, setIsAddGuestModalOpen, addGuest } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState("Bride's Friend");
  const [group, setGroup] = useState<GuestGroup>('Friends');
  const [companions, setCompanions] = useState(0);
  const [tableNumber, setTableNumber] = useState('Unassigned');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [isVip, setIsVip] = useState(false);
  const [sendImmediately, setSendImmediately] = useState(true);

  const resetForm = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setRelationship("Bride's Friend");
    setGroup('Friends');
    setCompanions(0);
    setTableNumber('Unassigned');
    setDietaryNotes('');
    setIsVip(false);
    setSendImmediately(true);
  };

  const handleClose = () => {
    setIsAddGuestModalOpen(false);
    resetForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    addGuest({
      fullName: fullName.trim(),
      email: email.trim() || `${fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      phone: phone.trim() || '+84 900 000 000',
      relationship,
      group,
      invitationStatus: sendImmediately ? 'Sent' : 'Draft',
      rsvpStatus: 'Pending',
      companions: Number(companions),
      tableNumber,
      dietaryNotes: dietaryNotes.trim() ? dietaryNotes.trim() : undefined,
      checkInStatus: 'Not Checked-in',
      isVip,
      invitationSentAt: sendImmediately ? new Date().toISOString() : undefined,
      avatarUrl: `https://images.unsplash.com/photo-${1500000000000 + (Math.floor(Math.random() * 100000))}?w=100&auto=format&fit=crop&q=80`
    });

    handleClose();
  };

  const relationshipOptions = [
    { value: "Bride's Friend", label: "Bride's Friend" },
    { value: "Groom's Friend", label: "Groom's Friend" },
    { value: 'Family', label: 'Family Member' },
    { value: 'Colleague', label: 'Colleague' },
    { value: 'VIP', label: 'VIP Guest' },
    { value: 'High School Friend', label: 'High School Friend' },
    { value: 'University Alumni', label: 'University Alumni' },
    { value: 'Neighbor', label: 'Neighbor' },
  ];

  const groupOptions = [
    { value: 'Friends', label: 'Friends' },
    { value: 'Family', label: 'Family' },
    { value: 'Colleagues', label: 'Colleagues' },
    { value: 'VIP', label: 'VIP' },
  ];

  const tableOptions = [
    { value: 'Unassigned', label: 'Unassigned' },
    ...Array.from({ length: 15 }, (_, i) => {
      const num = (i + 1).toString().padStart(2, '0');
      return { value: `Table ${num}`, label: `Table ${num}` };
    }),
  ];

  return (
    <Modal
      isOpen={isAddGuestModalOpen}
      onClose={handleClose}
      title="Add New Guest"
      subtitle="Register an individual guest or family unit into the wedding CRM"
      maxWidth="lg"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add Guest to Registry
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <Input
          label="Full Name"
          required
          autoFocus
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Nguyễn Minh Anh"
          icon={<User className="w-4 h-4" />}
        />

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="minhanh@gmail.com"
            icon={<Mail className="w-4 h-4" />}
          />
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+84 908 123 456"
            icon={<Phone className="w-4 h-4" />}
          />
        </div>

        {/* Relationship & Group */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Select
            label="Relationship"
            value={relationship}
            onChange={(e) => {
              setRelationship(e.target.value);
              if (e.target.value === 'VIP') {
                setIsVip(true);
                setGroup('VIP');
              } else if (e.target.value === 'Family') {
                setGroup('Family');
              }
            }}
            options={relationshipOptions}
          />
          <Select
            label="Guest Group"
            value={group}
            onChange={(e) => setGroup(e.target.value as GuestGroup)}
            options={groupOptions}
          />
        </div>

        {/* Companions & Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Allowed Companions (+Plus Ones)"
            type="number"
            min="0"
            max="5"
            value={companions}
            onChange={(e) => setCompanions(Math.max(0, parseInt(e.target.value) || 0))}
            icon={<Users className="w-4 h-4" />}
          />
          <Select
            label="Table Assignment"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            options={tableOptions}
          />
        </div>

        {/* Dietary Notes */}
        <Input
          label="Dietary Restrictions / Notes"
          value={dietaryNotes}
          onChange={(e) => setDietaryNotes(e.target.value)}
          placeholder="e.g. Vegetarian, Halal, No Seafood, Nut Allergy"
          icon={<Utensils className="w-4 h-4" />}
        />

        {/* VIP & Send Immediate Toggles */}
        <div className="pt-2 border-t border-brand-border/60 space-y-2.5">
          <label className="flex items-center justify-between p-3 rounded-xl bg-brand-bg/50 border border-brand-border/60 cursor-pointer hover:bg-brand-bg transition-colors">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-brand-accent" />
              <div>
                <span className="text-xs font-semibold text-brand-dark block">
                  VIP Guest Status
                </span>
                <span className="text-[11px] text-brand-muted">
                  High-priority invitation suite & priority seating
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={isVip}
              onChange={(e) => setIsVip(e.target.checked)}
              className="rounded border-brand-border text-brand-primary focus:ring-brand-primary/20 accent-brand-primary w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-brand-bg/50 border border-brand-border/60 cursor-pointer hover:bg-brand-bg transition-colors">
            <div className="flex items-center gap-2.5">
              <Send className="w-4 h-4 text-brand-deep" />
              <div>
                <span className="text-xs font-semibold text-brand-dark block">
                  Send Invitation Immediately
                </span>
                <span className="text-[11px] text-brand-muted">
                  Dispatches digital invitation email & unique RSVP link right away
                </span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={sendImmediately}
              onChange={(e) => setSendImmediately(e.target.checked)}
              className="rounded border-brand-border text-brand-primary focus:ring-brand-primary/20 accent-brand-primary w-4 h-4"
            />
          </label>
        </div>
      </form>
    </Modal>
  );
};
