import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle, Armchair, Users } from 'lucide-react';

interface CapacityWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableNumber: string;
  currentCount: number;
  capacity: number;
  guestName: string;
  onConfirm: () => void;
}

export const CapacityWarningModal: React.FC<CapacityWarningModalProps> = ({
  isOpen,
  onClose,
  tableNumber,
  currentCount,
  capacity,
  guestName,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2 text-rose-600">
          <AlertTriangle className="w-5 h-5 text-rose-600" />
          <span>Table Capacity Warning</span>
        </div>
      }
      subtitle={`Occupancy threshold exceeded for ${tableNumber}`}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Assign Anyway ({currentCount + 1}/{capacity})
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-left">
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs space-y-2">
          <p className="font-semibold text-sm">
            {tableNumber} is currently over capacity ({currentCount} / {capacity} Guests)
          </p>
          <p className="leading-relaxed">
            Assigning <strong>{guestName}</strong> to this banquet table will exceed the comfortable ballroom seating allowance by <strong>{currentCount + 1 - capacity} seat(s)</strong>.
          </p>
        </div>

        <p className="text-xs text-brand-muted leading-relaxed">
          The banquet staff at The Reverie Saigon recommends keeping tables capped at {capacity} for optimal silver service and dining comfort.
        </p>
      </div>
    </Modal>
  );
};
