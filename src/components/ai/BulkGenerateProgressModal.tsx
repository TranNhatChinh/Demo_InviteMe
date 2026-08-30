import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Sparkles, CheckCircle2, RefreshCw, Mail, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface BulkGenerateProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkGenerateProgressModal: React.FC<BulkGenerateProgressModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { bulkGenerateThankYouMessages } = useApp();
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      setIsCompleted(false);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 87) {
            clearInterval(interval);
            setIsCompleted(true);
            bulkGenerateThankYouMessages();
            try {
              confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            } catch {}
            return 87;
          }
          return prev + Math.floor(Math.random() * 8 + 6);
        });
      }, 120);

      return () => clearInterval(interval);
    }
  }, [isOpen, bulkGenerateThankYouMessages]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
          <span>Batch AI Thank-you Generator</span>
        </div>
      }
      subtitle="Generating 87 personalized thank-you messages"
      maxWidth="md"
      footer={
        isCompleted ? (
          <Button variant="primary" onClick={onClose}>
            View Generated Messages (87 Ready)
          </Button>
        ) : null
      }
    >
      <div className="space-y-6 text-center py-4">
        {!isCompleted ? (
          <div className="space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center mx-auto animate-spin">
              <RefreshCw className="w-7 h-7 text-brand-accent" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-xl font-bold text-brand-dark">
                Personalizing Messages...
              </h4>
              <p className="text-xs text-brand-muted">
                Synthesizing guest names, gift values, and attendance records into warm thank-you letters.
              </p>
            </div>

            <div className="space-y-2 max-w-xs mx-auto">
              <div className="w-full h-3 bg-brand-bg rounded-full overflow-hidden border border-brand-border">
                <div
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-accent rounded-full transition-all duration-150"
                  style={{ width: `${Math.min(100, (progress / 87) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs font-mono font-semibold text-brand-muted">
                <span>Progress:</span>
                <span className="text-brand-deep">{Math.min(87, progress)} / 87 Messages</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-card">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <h4 className="font-serif text-2xl font-bold text-brand-dark">
                87 Thank-you Messages Ready!
              </h4>
              <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
                All 87 personalized messages have been drafted with individual gift references and attendance status.
              </p>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};
