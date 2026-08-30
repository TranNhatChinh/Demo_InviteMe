import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, TextArea } from '../common/Input';
import { Gift, QrCode, Copy, CheckCircle2, Heart, Sparkles, Building2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface PublicGiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestName?: string;
  guestId?: string;
}

export const PublicGiftModal: React.FC<PublicGiftModalProps> = ({
  isOpen,
  onClose,
  guestName = 'Nguyễn Minh Anh',
  guestId = 'gst-001',
}) => {
  const { addGiftTransaction } = useApp();
  const { showToast } = useToast();

  const [step, setStep] = useState<'qr' | 'form'>('qr');
  const [selectedAmount, setSelectedAmount] = useState<number>(2000000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [message, setMessage] = useState<string>('Chúc hai bạn trăm năm hạnh phúc, mãi mãi ngọt ngào và thấu hiểu nhau như ngày đầu nhé! ❤️');

  if (!isOpen) return null;

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('190388889999');
    showToast('Account Number Copied', 'Vietcombank account number copied to clipboard.', 'success');
  };

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseInt(customAmount.replace(/\D/g, '')) || selectedAmount : selectedAmount;

    addGiftTransaction({
      guestId,
      guestName,
      amountVND: finalAmount,
      message,
      paymentMethod: 'Vietcombank QR',
    });

    onClose();
    setStep('qr');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Gift className="w-5 h-5 text-brand-accent" />
          <span>A Gift of Love & Blessing</span>
        </div>
      }
      subtitle="Send your monetary blessing to Emily & James"
      maxWidth="md"
      footer={
        step === 'qr' ? (
          <>
            <Button variant="ghost" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              icon={<CheckCircle2 className="w-4 h-4" />}
              onClick={() => setStep('form')}
            >
              I've Sent a Gift
            </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" onClick={() => setStep('qr')}>
              Back to QR
            </Button>
            <Button variant="primary" onClick={handleConfirm}>
              Confirm Gift Blessing
            </Button>
          </>
        )
      }
    >
      {step === 'qr' ? (
        <div className="space-y-6 text-center animate-fade-in">
          <p className="text-xs text-brand-muted max-w-sm mx-auto leading-relaxed">
            Your presence is already the greatest gift. If you would like to send your warm monetary blessings to the newlyweds:
          </p>

          {/* Bank QR & Monogram Frame */}
          <div className="p-6 rounded-3xl bg-gradient-to-b from-brand-bg to-brand-blush/40 border border-brand-primary/30 max-w-xs mx-auto space-y-4 shadow-card">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                Vietcombank Wedding Fund
              </span>
              <h4 className="font-serif text-lg font-bold text-brand-dark">
                Emily Nguyen & James Tran
              </h4>
            </div>

            {/* Scannable Vietcombank QR Mockup */}
            <div className="bg-white p-3 rounded-2xl shadow-subtle inline-block border border-brand-border">
              <svg className="w-40 h-40 mx-auto" viewBox="0 0 100 100" fill="#2B2325">
                <rect x="10" y="10" width="25" height="25" fill="#A94F68" />
                <rect x="14" y="14" width="17" height="17" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#A94F68" />
                <rect x="65" y="10" width="25" height="25" fill="#A94F68" />
                <rect x="69" y="14" width="17" height="17" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#A94F68" />
                <rect x="10" y="65" width="25" height="25" fill="#A94F68" />
                <rect x="14" y="69" width="17" height="17" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#A94F68" />
                <rect x="42" y="12" width="6" height="6" />
                <rect x="52" y="12" width="6" height="6" />
                <rect x="42" y="24" width="6" height="6" />
                <rect x="52" y="32" width="6" height="6" />
                <rect x="12" y="44" width="6" height="6" />
                <rect x="24" y="44" width="6" height="6" />
                <rect x="34" y="44" width="6" height="6" />
                <rect x="44" y="44" width="6" height="6" />
                <rect x="54" y="44" width="6" height="6" />
                <rect x="64" y="44" width="6" height="6" />
                <rect x="74" y="44" width="6" height="6" />
                <rect x="84" y="44" width="6" height="6" />
                <rect x="44" y="54" width="6" height="6" />
                <rect x="64" y="54" width="6" height="6" />
                <rect x="44" y="64" width="6" height="6" />
                <rect x="54" y="74" width="6" height="6" />
                <rect x="64" y="84" width="6" height="6" />
                <rect x="74" y="64" width="6" height="6" />
                <rect x="84" y="74" width="6" height="6" />
              </svg>
            </div>

            {/* Bank details with copy action */}
            <div className="bg-white/80 p-3 rounded-xl border border-brand-border/60 text-xs space-y-1 text-left">
              <div className="flex justify-between">
                <span className="text-brand-muted">Bank:</span>
                <span className="font-semibold text-brand-dark">Vietcombank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Account:</span>
                <span className="font-mono font-bold text-brand-deep">**** 8821</span>
              </div>
              <div className="flex justify-between">
                <span className="text-brand-muted">Holder:</span>
                <span className="font-semibold text-brand-dark">EMILY NGUYEN</span>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              className="w-full justify-center"
              icon={<Copy className="w-3.5 h-3.5" />}
              onClick={handleCopyAccount}
            >
              Copy Account Details
            </Button>
          </div>
        </div>
      ) : (
        /* Confirmation & Greeting Message Form */
        <form onSubmit={handleConfirm} className="space-y-4 text-left animate-fade-in">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-brand-dark">
              Select Blessing Amount:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[1000000, 2000000, 5000000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amt);
                    setCustomAmount('');
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold border transition-all ${
                    selectedAmount === amt && !customAmount
                      ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                      : 'bg-brand-bg/50 border-brand-border text-brand-dark hover:bg-brand-soft/40'
                  }`}
                >
                  {(amt / 1000000).toFixed(0)} Million VND
                </button>
              ))}
            </div>
          </div>

          <TextArea
            label="Wedding Blessing & Wishes for Emily & James"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
          />

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Your gift and blessing note will be recorded into Emily & James's private Gift Book.</span>
          </div>
        </form>
      )}
    </Modal>
  );
};
