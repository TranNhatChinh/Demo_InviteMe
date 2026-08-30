import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { ThankYouMessage } from '../../types';
import { SearchInput } from '../common/Input';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { BulkGenerateProgressModal } from './BulkGenerateProgressModal';
import { ThankYouDetailModal } from './ThankYouDetailModal';
import { SendThankYouModal } from './SendThankYouModal';
import {
  Heart,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  Wand2,
  Mail,
  MessageSquare,
  Edit2,
  Eye,
  Filter,
} from 'lucide-react';
import { clsx } from 'clsx';

export const ThankYouManagerView: React.FC = () => {
  const { thankYouMessages, thankYouStats, generateThankYouForGuest } = useApp();
  const { t, formatCurrency, formatNumber, translateRelationship, language } = useLanguage();

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [inspectingMsg, setInspectingMsg] = useState<ThankYouMessage | null>(null);
  const [sendingMsg, setSendingMsg] = useState<ThankYouMessage | null>(null);

  const filtered = useMemo(() => {
    return thankYouMessages.filter((m) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          m.guestName.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q) ||
          m.relationship.toLowerCase().includes(q);
        if (!matches) return false;
      }
      if (selectedStatus !== 'All' && m.status !== selectedStatus) {
        return false;
      }
      return true;
    });
  }, [thankYouMessages, search, selectedStatus]);

  const filterTabs = [
    { key: 'All', label: t.common.all },
    { key: 'Generated', label: language === 'vi' ? 'Đã tạo' : 'Generated' },
    { key: 'Sent', label: language === 'vi' ? 'Đã gửi' : 'Sent' },
    { key: 'Pending', label: language === 'vi' ? 'Đang chờ' : 'Pending' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Heart className="w-3.5 h-3.5 text-brand-accent fill-brand-accent" />
            <span>{language === 'vi' ? 'Tri ân sau ngày cưới' : 'Post-Wedding Gratitude Suite'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.thankYou.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.thankYou.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            icon={<Wand2 className="w-4 h-4" />}
            onClick={() => setIsBulkModalOpen(true)}
          >
            {t.thankYou.generateAllBtn}
          </Button>
        </div>
      </div>

      {/* 3 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.thankYou.messagesReady}
            </span>
            <div className="font-serif text-3xl font-bold text-brand-dark">{formatNumber(thankYouStats.totalReady)}</div>
            <p className="text-[11px] text-brand-muted">
              {language === 'vi' ? 'Tạo tự động bằng AI' : 'Crafted with AI context'}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-brand-soft text-brand-deep flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-brand-accent" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              {t.thankYou.delivered}
            </span>
            <div className="font-serif text-3xl font-bold text-emerald-700">{formatNumber(thankYouStats.sent)}</div>
            <p className="text-[11px] text-emerald-700 font-medium">
              {language === 'vi' ? 'Qua Email & Tin nhắn' : 'Via Email & SMS'}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              {t.thankYou.pendingDelivery}
            </span>
            <div className="font-serif text-3xl font-bold text-amber-700">{formatNumber(thankYouStats.pending)}</div>
            <p className="text-[11px] text-amber-700">
              {language === 'vi' ? 'Sẵn sàng gửi đồng loạt' : 'Ready to broadcast'}
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-brand-border shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {filterTabs.map((st) => (
            <button
              key={st.key}
              onClick={() => setSelectedStatus(st.key)}
              className={clsx(
                'px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border select-none',
                selectedStatus === st.key
                  ? 'bg-brand-deep text-white border-brand-deep font-semibold shadow-xs'
                  : 'bg-brand-bg/50 text-brand-muted border-brand-border hover:bg-brand-bg'
              )}
            >
              {st.label}
            </button>
          ))}
        </div>

        <div className="w-full sm:w-72">
          <SearchInput
            value={search}
            onChange={(val) => setSearch(val)}
            onClear={() => setSearch('')}
            placeholder={language === 'vi' ? 'Tìm theo tên hoặc lời nhắn...' : 'Search by guest or message...'}
          />
        </div>
      </div>

      {/* Thank you table */}
      <div className="bg-white rounded-3xl border border-brand-border shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brand-bg/50 border-b border-brand-border text-[11px] font-semibold text-brand-muted uppercase tracking-wider">
                <th className="py-3 px-4">{t.thankYou.tableHeaderGuest}</th>
                <th className="py-3 px-4">{t.thankYou.tableHeaderGift}</th>
                <th className="py-3 px-4">{t.thankYou.tableHeaderPreview}</th>
                <th className="py-3 px-4">{t.thankYou.tableHeaderStatus}</th>
                <th className="py-3 px-4 text-right">{t.thankYou.tableHeaderActions}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60 text-xs text-brand-dark">
              {filtered.slice(0, 15).map((msg) => (
                <tr key={msg.id} className="hover:bg-brand-bg/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={msg.guestAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-brand-border"
                      />
                      <div>
                        <p className="font-semibold text-brand-dark">{msg.guestName}</p>
                        <p className="text-[10px] text-brand-muted">{translateRelationship(msg.relationship)}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-serif font-bold text-xs text-brand-deep">
                      {msg.giftAmountVND ? formatCurrency(msg.giftAmountVND) : '—'}
                    </span>
                  </td>

                  <td className="py-3 px-4 max-w-sm">
                    <p className="truncate italic text-brand-muted">
                      "{msg.message.replace(/\n+/g, ' ')}"
                    </p>
                  </td>

                  <td className="py-3 px-4">
                    <Badge
                      variant={msg.status === 'Sent' ? 'confirmed' : 'pending'}
                      size="sm"
                    >
                      {msg.status === 'Sent' ? (language === 'vi' ? 'Đã gửi' : 'Sent') : (language === 'vi' ? 'Đã tạo' : 'Generated')}
                    </Badge>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye className="w-3.5 h-3.5" />}
                        onClick={() => setInspectingMsg(msg)}
                      >
                        {t.common.view}
                      </Button>
                      <Button
                        variant={msg.status === 'Sent' ? 'secondary' : 'primary'}
                        size="sm"
                        icon={<Send className="w-3.5 h-3.5" />}
                        onClick={() => setSendingMsg(msg)}
                      >
                        {msg.status === 'Sent' ? (language === 'vi' ? 'Gửi lại' : 'Resend') : t.thankYou.sendNowBtn}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <BulkGenerateProgressModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
      />

      <ThankYouDetailModal
        messageItem={inspectingMsg}
        isOpen={!!inspectingMsg}
        onClose={() => setInspectingMsg(null)}
        onOpenSendModal={(msg) => {
          setSendingMsg(msg);
          setInspectingMsg(null);
        }}
      />

      <SendThankYouModal
        messageItem={sendingMsg}
        isOpen={!!sendingMsg}
        onClose={() => setSendingMsg(null)}
      />
    </div>
  );
};
