import React, { useEffect, useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { CheckInRecord } from '../../types';
import { CheckCircle2, AlertTriangle, Armchair, Users, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QRScanResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  resultType: 'success' | 'already-checked-in' | null;
  record: CheckInRecord | null;
}

export const QRScanResultModal: React.FC<QRScanResultModalProps> = ({
  isOpen,
  onClose,
  resultType,
  record,
}) => {
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (isOpen && resultType === 'success') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#4FA87A', '#3B82F6', '#EFA3B5'],
        });
      } catch {
        // ignore
      }

      setCountdown(4);
      const timer = setInterval(() => {
        setCountdown((c) => {
          if (c <= 1) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return c - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, resultType, onClose]);

  if (!isOpen || !record) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        resultType === 'success' ? (
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            <span className="font-serif text-2xl font-bold">Check-in Verified!</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-amber-700">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
            <span className="font-serif text-2xl font-bold">Already Checked-in</span>
          </div>
        )
      }
      subtitle={resultType === 'success' ? 'Reception access granted' : 'Duplicate scan warning'}
      maxWidth="md"
      footer={
        <div className="w-full flex items-center justify-between">
          {resultType === 'success' ? (
            <span className="text-xs text-brand-muted">
              Auto-returning to scanner in {countdown}s...
            </span>
          ) : (
            <span className="text-xs text-brand-muted">Verify badge with guest</span>
          )}
          <Button variant="primary" size="md" onClick={onClose}>
            Done
          </Button>
        </div>
      }
    >
      {resultType === 'success' ? (
        <div className="space-y-6 text-center py-2 animate-fade-in">
          {/* Welcome Card */}
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-card">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Welcome to the Celebration
            </span>
            <h3 className="font-serif text-3xl font-bold text-brand-dark pt-1">
              {record.guestName}
            </h3>
            <p className="text-xs text-brand-muted">{record.relationship}</p>
          </div>

          {/* Table & Guest allocation card */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-gradient-to-br from-brand-bg to-brand-blush/40 border border-brand-primary/30 text-left">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted block">
                Assigned Table
              </span>
              <span className="font-serif font-bold text-2xl text-brand-deep flex items-center gap-1.5">
                <Armchair className="w-5 h-5 text-brand-accent" />
                {record.tableNumber}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brand-muted block">
                Total Headcount
              </span>
              <span className="font-serif font-bold text-2xl text-brand-dark flex items-center gap-1.5">
                <Users className="w-5 h-5 text-brand-muted" />
                {record.guestsCount} {record.guestsCount > 1 ? 'Guests' : 'Guest'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-brand-muted px-2">
            <span>Checked in at: <strong>{record.time}</strong></span>
            <span>Reception Staff: <strong>{record.staffName}</strong></span>
          </div>
        </div>
      ) : (
        <div className="space-y-5 text-center py-2 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-brand-dark">
              {record.guestName}
            </h3>
            <p className="text-xs text-amber-800 font-medium">
              This guest has already been marked as checked in today.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left text-xs space-y-1.5 text-amber-900">
            <div className="flex justify-between">
              <span>Original Check-in Time:</span>
              <span className="font-bold">{record.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Table Assignment:</span>
              <span className="font-bold">{record.tableNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Logged by Staff:</span>
              <span className="font-bold">{record.staffName}</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
