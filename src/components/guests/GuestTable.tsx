import React, { useState } from 'react';
import { Guest, RSVPStatus } from '../../types';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Sparkles,
  MoreHorizontal,
  Eye,
  Trash2,
  CheckCircle,
  QrCode,
  Utensils,
  ChevronDown,
  UserCheck,
} from 'lucide-react';
import { clsx } from 'clsx';

interface GuestTableProps {
  guests: Guest[];
  onSelectGuest: (id: string) => void;
  onToggleCheckIn: (id: string) => void;
  onUpdateRSVP: (id: string, status: RSVPStatus) => void;
  onDeleteGuest: (id: string) => void;
}

export const GuestTable: React.FC<GuestTableProps> = ({
  guests,
  onSelectGuest,
  onToggleCheckIn,
  onUpdateRSVP,
  onDeleteGuest,
}) => {
  const { t, translateRelationship, translateGroup, translateStatus, language } = useLanguage();
  const [activeActionMenuId, setActiveActionMenuId] = useState<string | null>(null);

  if (guests.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-brand-border p-8 space-y-3 text-left">
        <div className="w-12 h-12 rounded-full bg-brand-soft/60 text-brand-deep mx-auto flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <h4 className="font-serif text-lg font-bold text-brand-dark text-center">
          {t.guests.emptyTitle}
        </h4>
        <p className="text-xs text-brand-muted max-w-sm mx-auto text-center">
          {t.guests.emptySubtitle}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-border shadow-card overflow-hidden text-left">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-bg/60 border-b border-brand-border text-[11px] font-semibold text-brand-muted uppercase tracking-wider select-none">
              <th className="py-3.5 px-4 font-semibold">{t.guests.title}</th>
              <th className="py-3.5 px-4 font-semibold">{language === 'vi' ? 'Liên hệ' : 'Contact'}</th>
              <th className="py-3.5 px-4 font-semibold">{t.guests.relationship}</th>
              <th className="py-3.5 px-4 font-semibold">{t.guests.invitation}</th>
              <th className="py-3.5 px-4 font-semibold">{t.guests.rsvp}</th>
              <th className="py-3.5 px-3 font-semibold text-center">{t.guests.companions}</th>
              <th className="py-3.5 px-4 font-semibold">{t.guests.table}</th>
              <th className="py-3.5 px-4 font-semibold text-center">{t.guests.checkIn}</th>
              <th className="py-3.5 px-4 font-semibold text-right">{t.guests.actions}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border/60 text-xs text-brand-dark">
            {guests.map((g) => {
              const isMenuOpen = activeActionMenuId === g.id;

              return (
                <tr
                  key={g.id}
                  onClick={() => onSelectGuest(g.id)}
                  className="hover:bg-brand-bg/40 cursor-pointer transition-colors group"
                >
                  {/* Guest Name & Avatar */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative shrink-0">
                        <img
                          src={g.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                          alt={g.fullName}
                          className="w-9 h-9 rounded-full object-cover border border-brand-border"
                        />
                        {g.isVip && (
                          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 text-white rounded-full flex items-center justify-center shadow-xs" title="VIP">
                            <Sparkles className="w-2 h-2" />
                          </span>
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5">
                          <span className="font-semibold text-brand-dark group-hover:text-brand-deep transition-colors">
                            {g.fullName}
                          </span>
                          {g.isVip && (
                            <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100/70 px-1.5 py-0.2 rounded">
                              VIP
                            </span>
                          )}
                        </div>
                        {g.dietaryNotes && (
                          <div className="flex items-center gap-1 text-[11px] text-brand-deep">
                            <Utensils className="w-3 h-3" />
                            <span>{g.dietaryNotes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <p className="font-medium text-brand-dark">{g.email}</p>
                      <p className="text-[11px] text-brand-muted">{g.phone}</p>
                    </div>
                  </td>

                  {/* Relationship */}
                  <td className="py-3 px-4">
                    <div className="space-y-0.5">
                      <span className="font-medium text-brand-dark">{translateRelationship(g.relationship)}</span>
                      <span className="text-[10px] text-brand-muted block">{translateGroup(g.group)}</span>
                    </div>
                  </td>

                  {/* Invitation Status */}
                  <td className="py-3 px-4">
                    <Badge status={g.invitationStatus} size="sm" />
                  </td>

                  {/* RSVP Status */}
                  <td className="py-3 px-4">
                    <Badge status={g.rsvpStatus} size="sm" />
                  </td>

                  {/* Companions */}
                  <td className="py-3 px-3 text-center">
                    {g.companions > 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-brand-soft/80 text-brand-deep border border-brand-primary/20">
                        +{g.companions}
                      </span>
                    ) : (
                      <span className="text-brand-muted text-xs">—</span>
                    )}
                  </td>

                  {/* Table */}
                  <td className="py-3 px-4">
                    {g.tableNumber ? (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-bg border border-brand-border/80 font-medium text-brand-dark">
                        <span>{g.tableNumber}</span>
                      </div>
                    ) : (
                      <span className="text-brand-muted italic text-[11px]">
                        {language === 'vi' ? 'Chưa xếp' : 'Unassigned'}
                      </span>
                    )}
                  </td>

                  {/* Check-in Quick Toggle */}
                  <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onToggleCheckIn(g.id)}
                      className={clsx(
                        'px-2.5 py-1 rounded-lg text-xs font-medium transition-all inline-flex items-center gap-1.5',
                        g.checkInStatus === 'Checked-in'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold shadow-xs'
                          : 'bg-brand-bg text-brand-muted border border-brand-border hover:bg-emerald-50 hover:text-emerald-700'
                      )}
                    >
                      <UserCheck className="w-3.5 h-3.5" />
                      <span>
                        {g.checkInStatus === 'Checked-in'
                          ? t.guests.statuses.checkedIn
                          : t.guests.statuses.notCheckedIn}
                      </span>
                    </button>
                  </td>

                  {/* Actions Dropdown */}
                  <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="relative inline-block text-left">
                      <button
                        onClick={() => setActiveActionMenuId(isMenuOpen ? null : g.id)}
                        className="p-1.5 rounded-lg text-brand-muted hover:text-brand-dark hover:bg-brand-bg transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>

                      {isMenuOpen && (
                        <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-modal border border-brand-border overflow-hidden z-20 animate-fade-in p-1 space-y-0.5">
                          <button
                            onClick={() => {
                              onSelectGuest(g.id);
                              setActiveActionMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-brand-dark hover:bg-brand-soft/40 hover:text-brand-deep rounded-md transition-colors text-left"
                          >
                            <Eye className="w-3.5 h-3.5 text-brand-deep" />
                            <span>{language === 'vi' ? 'Xem thông tin' : 'View Profile'}</span>
                          </button>

                          <button
                            onClick={() => {
                              onUpdateRSVP(g.id, 'Confirmed');
                              setActiveActionMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-brand-dark hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors text-left"
                          >
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{language === 'vi' ? 'Đánh dấu Xác nhận' : 'Mark Confirmed'}</span>
                          </button>

                          <div className="border-t border-brand-border/60 my-1" />

                          <button
                            onClick={() => {
                              onDeleteGuest(g.id);
                              setActiveActionMenuId(null);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-brand-error hover:bg-rose-50 rounded-md transition-colors text-left"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>{t.common.delete}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
