import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { SeatingSuggestion } from '../../types';
import { Sparkles, Brain, ArrowRight, CheckCircle2, RefreshCw, Layers, Users } from 'lucide-react';
import { clsx } from 'clsx';

interface AutoSeatingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AutoSeatingModal: React.FC<AutoSeatingModalProps> = ({ isOpen, onClose }) => {
  const { applyAutoSeatingSuggestions, guests, tables } = useApp();
  const [stage, setStage] = useState<'loading' | 'results'>('loading');
  const [progressStep, setProgressStep] = useState(1);

  const sampleSuggestions: SeatingSuggestion[] = [
    {
      guestId: 'gst-001',
      guestName: 'Nguyễn Minh Anh',
      fromTable: 'Table 05',
      toTable: 'Table 08',
      reason: 'Balances Table 05 capacity and groups with fellow creative friends.',
    },
    {
      guestId: 'gst-002',
      guestName: 'Trần Quốc Bảo',
      fromTable: 'Table 03',
      toTable: 'Table 06',
      reason: 'Seats with design agency colleagues for better conversation harmony.',
    },
    {
      guestId: 'gst-125',
      guestName: 'Lý Quốc Huy',
      fromTable: 'Unassigned',
      toTable: 'Table 04',
      reason: 'Assigned remaining seat in Bride Friends circle.',
    },
    {
      guestId: 'gst-126',
      guestName: 'Đặng Mai Phương',
      fromTable: 'Unassigned',
      toTable: 'Table 09',
      reason: 'Assigned open seat with extended cousins cohort.',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setStage('loading');
      setProgressStep(1);

      const t1 = setTimeout(() => setProgressStep(2), 700);
      const t2 = setTimeout(() => setProgressStep(3), 1400);
      const t3 = setTimeout(() => setStage('results'), 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [isOpen]);

  const handleApply = () => {
    applyAutoSeatingSuggestions(sampleSuggestions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
          <span>Optimize Seating Arrangement</span>
        </div>
      }
      subtitle="AI-assisted guest balance and table capacity harmony"
      maxWidth="lg"
      footer={
        stage === 'results' ? (
          <>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleApply}
            >
              Apply Suggestions (4 Moves)
            </Button>
          </>
        ) : null
      }
    >
      {stage === 'loading' ? (
        <div className="py-12 px-4 text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-brand-soft/70 text-brand-deep flex items-center justify-center mx-auto shadow-pinkGlow animate-spin">
            <RefreshCw className="w-7 h-7 text-brand-accent" />
          </div>

          <div className="space-y-2">
            <h4 className="font-serif text-2xl font-bold text-brand-dark">
              Analyzing Ballroom Seating...
            </h4>
            <p className="text-xs text-brand-muted max-w-sm mx-auto">
              Our seating engine is evaluating guest relationships, RSVP statuses, dietary clusters, and table limits.
            </p>
          </div>

          <div className="max-w-xs mx-auto space-y-2 text-left text-xs">
            <div className="flex items-center gap-2">
              <span className={clsx('w-2 h-2 rounded-full', progressStep >= 1 ? 'bg-emerald-500' : 'bg-brand-border')} />
              <span className={progressStep >= 1 ? 'text-brand-dark font-medium' : 'text-brand-muted'}>
                Analyzing guest relationships and cohorts...
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={clsx('w-2 h-2 rounded-full', progressStep >= 2 ? 'bg-emerald-500' : 'bg-brand-border')} />
              <span className={progressStep >= 2 ? 'text-brand-dark font-medium' : 'text-brand-muted'}>
                Optimizing table capacity & companion proximity...
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className={clsx('w-2 h-2 rounded-full', progressStep >= 3 ? 'bg-emerald-500' : 'bg-brand-border')} />
              <span className={progressStep >= 3 ? 'text-brand-dark font-medium' : 'text-brand-muted'}>
                Generating balanced recommendations...
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4 text-left animate-fade-in">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="font-bold text-sm">Optimization Plan Generated</p>
              <p>Resolves 2 over-capacity tables and seats 2 unassigned guests.</p>
            </div>
            <span className="font-serif font-bold text-lg">100% Balanced</span>
          </div>

          <div className="space-y-2.5">
            <span className="text-[11px] uppercase font-bold tracking-wider text-brand-muted">
              Suggested Rebalancing Moves ({sampleSuggestions.length})
            </span>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {sampleSuggestions.map((s, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-white border border-brand-border shadow-subtle flex items-start justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-brand-dark">{s.guestName}</span>
                      <span className="text-brand-muted flex items-center gap-1 font-mono text-[11px]">
                        <span className="bg-brand-bg px-2 py-0.5 rounded border">{s.fromTable}</span>
                        <ArrowRight className="w-3 h-3 text-brand-accent" />
                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded border border-emerald-200">
                          {s.toTable}
                        </span>
                      </span>
                    </div>
                    <p className="text-[11px] text-brand-muted leading-relaxed font-light">{s.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};
