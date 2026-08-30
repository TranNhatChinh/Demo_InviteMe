import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Guest } from '../../types';
import { QrCode, Download, Share2, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface QRModalProps {
  guest: Guest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ guest, isOpen, onClose }) => {
  const { showToast } = useToast();

  if (!guest || !isOpen) return null;

  const handleDownload = () => {
    showToast('Pass Downloaded', `Digital wedding pass for ${guest.fullName} downloaded.`, 'success');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Personalized QR Check-in Pass"
      subtitle={`Reception fast check-in code for ${guest.fullName}`}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            icon={<Download className="w-4 h-4" />}
            onClick={handleDownload}
          >
            Download Pass
          </Button>
        </>
      }
    >
      <div className="space-y-6 text-center">
        {/* Pass Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-brand-bg to-brand-blush/40 border border-brand-primary/30 shadow-card space-y-4 max-w-xs mx-auto">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
              Wedding Reception Pass
            </span>
            <h4 className="font-serif text-xl font-bold text-brand-dark">
              {guest.fullName}
            </h4>
            <p className="text-xs text-brand-muted">{guest.tableNumber} • {guest.relationship}</p>
          </div>

          {/* QR Code Graphic Mockup */}
          <div className="p-4 bg-white rounded-2xl shadow-subtle border border-brand-border inline-block mx-auto">
            <svg className="w-40 h-40" viewBox="0 0 100 100" fill="#2B2325">
              <rect x="10" y="10" width="25" height="25" fill="#A94F68" />
              <rect x="14" y="14" width="17" height="17" fill="white" />
              <rect x="18" y="18" width="9" height="9" fill="#A94F68" />

              <rect x="65" y="10" width="25" height="25" fill="#A94F68" />
              <rect x="69" y="14" width="17" height="17" fill="white" />
              <rect x="73" y="18" width="9" height="9" fill="#A94F68" />

              <rect x="10" y="65" width="25" height="25" fill="#A94F68" />
              <rect x="14" y="69" width="17" height="17" fill="white" />
              <rect x="18" y="73" width="9" height="9" fill="#A94F68" />

              {/* Data modules */}
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

          <p className="text-[11px] text-brand-muted">
            Present this QR code at The Reverie Saigon reception desk for instant badge printout & table directions.
          </p>
        </div>
      </div>
    </Modal>
  );
};
