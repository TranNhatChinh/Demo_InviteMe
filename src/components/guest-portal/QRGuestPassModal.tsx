import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Guest, WeddingData } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';
import { QrCode, Sparkles, Download, CheckCircle2, Heart, MapPin, Calendar } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface QRGuestPassModalProps {
  guest: Guest;
  wedding: WeddingData;
  isOpen: boolean;
  onClose: () => void;
}

export const QRGuestPassModal: React.FC<QRGuestPassModalProps> = ({
  guest,
  wedding,
  isOpen,
  onClose,
}) => {
  const { t, formatDate, formatNumber, language } = useLanguage();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleDownload = () => {
    showToast(
      language === 'vi' ? 'Đã lưu thẻ vào máy' : 'Saved to Wallet',
      language === 'vi' ? 'Đã lưu thẻ tham dự. Vui lòng xuất trình tại cổng đón khách.' : 'Wedding pass saved. Present this at the entrance.',
      'wedding'
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" />
          <span className="font-serif text-2xl font-bold text-brand-dark">
            {t.qrPass.passTitle}
          </span>
        </div>
      }
      subtitle={t.qrPass.monogramTitle}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            {t.qrPass.closePass}
          </Button>
          <Button
            variant="primary"
            icon={<Download className="w-4 h-4" />}
            onClick={handleDownload}
          >
            {t.qrPass.downloadPass}
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Luxury Boarding Pass Design */}
        <div className="rounded-3xl bg-gradient-to-b from-brand-dark via-brand-dark to-[#1E1719] text-white p-6 shadow-2xl relative overflow-hidden border border-brand-primary/40">
          {/* Top Foil Banner */}
          <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                <Heart className="w-4 h-4 text-brand-soft fill-brand-soft" />
              </div>
              <div>
                <h4 className="font-serif text-base font-bold text-white leading-none">
                  {wedding.brideName.split(' ')[0]} & {wedding.groomName.split(' ')[0]}
                </h4>
                <p className="text-[10px] text-brand-soft uppercase tracking-widest mt-0.5">
                  {t.publicPortal.weddingCelebration}
                </p>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-semibold">
              {t.guests.statuses.confirmed}
            </span>
          </div>

          {/* Guest Identity */}
          <div className="space-y-4 text-left">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-soft block">
                {t.qrPass.guestLabel}
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                {guest.fullName}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-3 py-3 border-y border-white/15 text-xs">
              <div>
                <span className="text-[10px] text-white/60 uppercase tracking-wider block">
                  {t.qrPass.guestsCountLabel}
                </span>
                <span className="font-semibold text-white">
                  {guest.companions + 1} {t.common.guestsUnit}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-white/60 uppercase tracking-wider block">
                  {t.qrPass.tableLabel}
                </span>
                <span className="font-semibold text-brand-soft">
                  {guest.tableNumber || (language === 'vi' ? 'Bàn 05' : 'Table 05')}
                </span>
              </div>
            </div>

            {/* QR Code Center */}
            <div className="bg-white p-4 rounded-2xl text-center space-y-2 max-w-[200px] mx-auto shadow-modal">
              <svg className="w-36 h-36 mx-auto" viewBox="0 0 100 100" fill="#2B2325">
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
              <p className="text-[10px] text-brand-muted uppercase font-bold tracking-wider">
                {t.qrPass.instruction}
              </p>
            </div>

            <div className="text-center text-[11px] text-white/70 space-y-1">
              <p className="flex items-center justify-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                {formatDate(wedding.weddingDate, 'medium')} • 06:00 PM
              </p>
              <p className="flex items-center justify-center gap-1.5 text-white/60">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                {wedding.receptionVenue.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
