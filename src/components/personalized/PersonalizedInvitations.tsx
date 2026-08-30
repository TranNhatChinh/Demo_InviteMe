import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Guest } from '../../types';
import { SearchInput } from '../common/Input';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { QRModal } from './QRModal';
import { useToast } from '../../context/ToastContext';
import {
  Link,
  Copy,
  ExternalLink,
  QrCode,
  Sparkles,
  RefreshCw,
  Send,
  Download,
  Users,
  CheckCircle2,
  Clock,
  Eye,
} from 'lucide-react';
import { clsx } from 'clsx';

export const PersonalizedInvitations: React.FC = () => {
  const {
    guests,
    metrics,
    setCurrentView,
    setActiveGuestForPublicView,
    batchSendInvitations,
    updateGuest,
  } = useApp();

  const { t, formatNumber, language } = useLanguage();
  const { showToast } = useToast();
  const [search, setSearch] = useState('');
  const [qrGuest, setQrGuest] = useState<Guest | null>(null);

  const filtered = useMemo(() => {
    return guests.filter((g) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        g.fullName.toLowerCase().includes(q) ||
        g.email.toLowerCase().includes(q) ||
        (g.personalizedSlug && g.personalizedSlug.toLowerCase().includes(q))
      );
    });
  }, [guests, search]);

  const handleCopyLink = (guest: Guest) => {
    const slug = guest.personalizedSlug || guest.fullName.toLowerCase().replace(/\s+/g, '-');
    const url = `https://inviteme.com/e/emily-james/${slug}`;
    navigator.clipboard?.writeText(url);
    showToast(
      language === 'vi' ? 'Đã sao chép liên kết' : 'Invitation Link Copied',
      language === 'vi' ? `Đã sao chép liên kết cá nhân cho ${guest.fullName}` : `Copied personal link for ${guest.fullName}`,
      'success'
    );
  };

  const handleViewAsGuest = (guest: Guest) => {
    setActiveGuestForPublicView(guest.id);
    setCurrentView('public-guest-portal');
    showToast(
      language === 'vi' ? 'Trang thiệp mời khách' : 'Public Guest Experience',
      language === 'vi' ? `Xem thiệp mời dưới tên ${guest.fullName}` : `Viewing personalized invitation as ${guest.fullName}`,
      'wedding'
    );
  };

  const handleRegenerate = (guest: Guest) => {
    const cleanName = guest.fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]/g, '-');
    const newSlug = `${cleanName}-${Math.floor(Math.random() * 900 + 100)}`;
    updateGuest(guest.id, { personalizedSlug: newSlug });
    showToast(
      language === 'vi' ? 'Đã tạo lại liên kết' : 'Link Regenerated',
      language === 'vi' ? `Đã cập nhật URL riêng cho ${guest.fullName}` : `Updated personal URL for ${guest.fullName}`,
      'info'
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Link className="w-3 h-3 text-brand-accent" />
            <span>{language === 'vi' ? 'Liên kết thông minh' : 'Smart Guest Links'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.personalized.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.personalized.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            icon={<Send className="w-4 h-4" />}
            onClick={batchSendInvitations}
          >
            {t.personalized.sendInvitationsBtn}
          </Button>
        </div>
      </div>

      {/* 3 Top Stat Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.guests.totalGuests}
            </span>
            <div className="font-serif text-3xl font-bold text-brand-dark">{formatNumber(metrics.totalGuests)}</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-deep flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.personalized.generated}
            </span>
            <div className="font-serif text-3xl font-bold text-brand-deep">142</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.personalized.pending}
            </span>
            <div className="font-serif text-3xl font-bold text-amber-700">8</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-brand-border/80 shadow-card">
        <div className="w-full max-w-md">
          <SearchInput
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => setSearch('')}
            placeholder={language === 'vi' ? 'Tìm theo tên khách, đường dẫn hoặc email...' : 'Search by guest name, slug or email...'}
          />
        </div>
      </div>

      {/* Personalized Guest List Cards */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg/50 border-b border-brand-border text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                <th className="py-3 px-4">{t.personalized.guestNameHeader}</th>
                <th className="py-3 px-4">{t.personalized.personalLinkHeader}</th>
                <th className="py-3 px-4 text-center">{t.personalized.qrPassHeader}</th>
                <th className="py-3 px-4">{t.guests.invitation}</th>
                <th className="py-3 px-4 text-right">{t.common.actions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 text-xs text-brand-dark">
              {filtered.slice(0, 15).map((guest) => {
                const slug = guest.personalizedSlug || guest.fullName.toLowerCase().replace(/\s+/g, '-');
                const fullUrl = `https://inviteme.com/e/emily-james/${slug}`;

                return (
                  <tr key={guest.id} className="hover:bg-brand-bg/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={guest.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover border border-brand-border"
                        />
                        <div>
                          <p className="font-semibold text-brand-dark">{guest.fullName}</p>
                          <p className="text-[11px] text-brand-muted">{guest.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2 max-w-sm">
                        <span className="font-mono text-xs text-brand-deep bg-brand-bg px-2.5 py-1 rounded-lg border border-brand-border/80 truncate">
                          {fullUrl}
                        </span>
                        <button
                          onClick={() => handleCopyLink(guest)}
                          className="p-1.5 text-brand-muted hover:text-brand-dark hover:bg-brand-soft/40 rounded-md transition-colors shrink-0"
                          title={t.personalized.copyLink}
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <button
                        onClick={() => setQrGuest(guest)}
                        className="p-1.5 rounded-lg bg-brand-bg hover:bg-brand-soft/40 text-brand-deep border border-brand-border transition-colors inline-flex items-center gap-1 text-xs"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-semibold">{language === 'vi' ? 'Xem QR' : 'QR Pass'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      <Badge status={guest.invitationStatus} size="sm" />
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={<Eye className="w-3.5 h-3.5" />}
                          onClick={() => handleViewAsGuest(guest)}
                        >
                          {t.personalized.viewInvitation}
                        </Button>
                        <button
                          onClick={() => handleRegenerate(guest)}
                          className="p-1.5 text-brand-muted hover:text-brand-dark rounded-md hover:bg-brand-bg transition-colors"
                          title={t.personalized.regenerate}
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <QRModal
        guest={qrGuest}
        isOpen={!!qrGuest}
        onClose={() => setQrGuest(null)}
      />
    </div>
  );
};
