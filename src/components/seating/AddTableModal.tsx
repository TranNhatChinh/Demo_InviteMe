import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { TableItem } from '../../types';
import { Armchair, Layers, Plus } from 'lucide-react';

interface AddTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTableModal: React.FC<AddTableModalProps> = ({ isOpen, onClose }) => {
  const { tables, addTable } = useApp();

  const nextTableNumber = `Table ${(tables.length + 1).toString().padStart(2, '0')}`;
  const [tableNumber, setTableNumber] = useState(nextTableNumber);
  const [name, setName] = useState(`Banquet ${nextTableNumber}`);
  const [capacity, setCapacity] = useState(10);
  const [category, setCategory] = useState<TableItem['category']>('General');
  const [zone, setZone] = useState<TableItem['zone']>('center');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTable({
      tableNumber,
      name,
      capacity: Number(capacity),
      category,
      zone,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Banquet Table"
      subtitle="Configure a new table on the ballroom floor plan"
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Create Table
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Table Code"
            required
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            placeholder="e.g. Table 16"
          />
          <Input
            label="Seat Capacity"
            type="number"
            min="2"
            max="16"
            required
            value={capacity}
            onChange={(e) => setCapacity(parseInt(e.target.value) || 10)}
          />
        </div>

        <Input
          label="Table Descriptive Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Overseas Guests & Colleagues"
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Guest Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            options={[
              { value: 'VIP', label: 'VIP' },
              { value: 'Family', label: 'Family' },
              { value: 'Friends', label: 'Friends' },
              { value: 'Colleagues', label: 'Colleagues' },
              { value: 'General', label: 'General Reserve' },
            ]}
          />

          <Select
            label="Ballroom Floor Zone"
            value={zone}
            onChange={(e) => setZone(e.target.value as any)}
            options={[
              { value: 'front-stage', label: 'Front Stage Zone' },
              { value: 'center', label: 'Center Dance Floor' },
              { value: 'side-left', label: 'Left Wing Zone' },
              { value: 'side-right', label: 'Right Wing Zone' },
              { value: 'rear', label: 'Rear Garden Wing' },
            ]}
          />
        </div>
      </form>
    </Modal>
  );
};
