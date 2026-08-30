import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { GuestGroup } from '../../types';
import { UserPlus, Armchair, Phone, Users, CheckCircle2 } from 'lucide-react';

interface WalkInGuestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WalkInGuestModal: React.FC<WalkInGuestModalProps> = ({ isOpen, onClose }) => {
  const { addWalkInGuest, tables } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [group, setGroup] = useState<GuestGroup>('Friends');
  const [companions, setCompanions] = useState(1);
  const [tableNumber, setTableNumber] = useState('Table 15');
  const [dietaryNotes, setDietaryNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    addWalkInGuest({
      fullName: fullName.trim(),
      phone: phone.trim(),
      relationship,
      group,
      companions: Number(companions),
      tableNumber,
      dietaryNotes: dietaryNotes.trim() ? dietaryNotes.trim() : undefined,
    });

    // Reset & Close
    setFullName('');
    setPhone('');
    setRelationship('Friend');
    setGroup('Friends');
    setCompanions(1);
    setTableNumber('Table 15');
    setDietaryNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <UserPlus className="w-5 h-5 text-brand-deep" />
          <span>Register Walk-in Guest</span>
        </div>
      }
      subtitle="Guest arrived who was not on the initial guest list"
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add & Check In Immediately
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <Input
          label="Full Name"
          required
          autoFocus
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="e.g. Phan Khắc Huy"
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+84 900 000 000"
            icon={<Phone className="w-4 h-4" />}
          />
          <Input
            label="Relationship / Connection"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="e.g. Friend, Business Partner"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Additional Companions (+1)"
            type="number"
            min="0"
            max="4"
            value={companions}
            onChange={(e) => setCompanions(parseInt(e.target.value) || 0)}
            icon={<Users className="w-4 h-4" />}
          />

          <Select
            label="Assign Banquet Table"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            options={tables.map((t) => ({
              value: t.tableNumber,
              label: `${t.tableNumber} (${t.name.slice(0, 16)}...)`,
            }))}
          />
        </div>

        <Input
          label="Dietary Notes (Optional)"
          value={dietaryNotes}
          onChange={(e) => setDietaryNotes(e.target.value)}
          placeholder="e.g. Vegetarian, Halal, No Seafood"
        />

        <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200 text-sky-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Walk-in guest will be automatically marked as Checked-in and Expected Headcount will update.</span>
        </div>
      </form>
    </Modal>
  );
};
