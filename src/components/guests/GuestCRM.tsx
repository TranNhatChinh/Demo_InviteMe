import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { GuestTable } from './GuestTable';
import { SearchInput } from '../common/Input';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { RSVPStatus, GuestGroup } from '../../types';
import {
  Users,
  UserPlus,
  Upload,
  Send,
  Filter,
  Download,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Armchair,
} from 'lucide-react';
import { clsx } from 'clsx';

export const GuestCRM: React.FC = () => {
  const {
    guests,
    metrics,
    setSelectedGuestId,
    setIsAddGuestModalOpen,
    setIsImportModalOpen,
    batchSendInvitations,
    toggleCheckIn,
    updateGuest,
    deleteGuest,
  } = useApp();

  const { t, formatNumber, translateStatus, translateGroup, language } = useLanguage();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  // Filter pills
  const statusFilters = [
    { label: t.guests.allStatuses, value: 'All', count: metrics.totalGuests },
    { label: t.guests.statuses.confirmed, value: 'Confirmed', count: metrics.confirmed },
    { label: t.guests.statuses.pending, value: 'Pending', count: metrics.pending },
    { label: t.guests.statuses.declined, value: 'Declined', count: metrics.declined },
    { label: t.guests.statuses.maybe, value: 'Maybe', count: metrics.maybe },
    { label: t.guests.statuses.checkedIn, value: 'Checked-in', count: metrics.checkedIn },
  ];

  const groupFilters: { label: string; value: string }[] = [
    { label: t.guests.allGroups, value: 'All' },
    { label: t.guests.groups.friends, value: 'Friends' },
    { label: t.guests.groups.family, value: 'Family' },
    { label: t.guests.groups.colleagues, value: 'Colleagues' },
    { label: t.guests.groups.vip, value: 'VIP' },
  ];

  // Filtered & Searched Guests
  const filteredGuests = useMemo(() => {
    return guests.filter((g) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = g.fullName.toLowerCase().includes(q);
        const matchesEmail = g.email.toLowerCase().includes(q);
        const matchesPhone = g.phone.toLowerCase().includes(q);
        const matchesTable = g.tableNumber.toLowerCase().includes(q);
        const matchesRel = g.relationship.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesTable && !matchesRel) {
          return false;
        }
      }

      // Status filter
      if (selectedStatusFilter !== 'All') {
        if (selectedStatusFilter === 'Checked-in') {
          if (g.checkInStatus !== 'Checked-in') return false;
        } else {
          if (g.rsvpStatus !== selectedStatusFilter) return false;
        }
      }

      // Group filter
      if (selectedGroupFilter !== 'All') {
        if (g.group !== selectedGroupFilter) return false;
      }

      return true;
    });
  }, [guests, searchQuery, selectedStatusFilter, selectedGroupFilter]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredGuests.length / pageSize) || 1;
  const paginatedGuests = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredGuests.slice(start, start + pageSize);
  }, [filteredGuests, currentPage, pageSize]);

  const handleExportCSV = () => {
    const headers = ['Full Name', 'Email', 'Phone', 'Relationship', 'Group', 'RSVP Status', 'Companions', 'Table', 'Check-in Status', 'Dietary Notes'];
    const rows = filteredGuests.map(g => [
      `"${g.fullName}"`,
      `"${g.email}"`,
      `"${g.phone}"`,
      `"${g.relationship}"`,
      `"${g.group}"`,
      `"${g.rsvpStatus}"`,
      g.companions,
      `"${g.tableNumber}"`,
      `"${g.checkInStatus}"`,
      `"${g.dietaryNotes || 'None'}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `inviteme_guests_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-fade-in text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-dark">
              {t.guests.title}
            </h1>
            <span className="font-serif font-semibold text-xs px-2.5 py-0.5 rounded-full bg-brand-soft/70 text-brand-deep border border-brand-primary/30">
              {formatNumber(metrics.totalGuests)} {t.common.guestsUnit}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted">
            {t.guests.subtitle}
          </p>
        </div>

        {/* Global CRM Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="ghost"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleExportCSV}
          >
            {language === 'vi' ? 'Xuất CSV' : 'Export CSV'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={<Upload className="w-3.5 h-3.5" />}
            onClick={() => setIsImportModalOpen(true)}
          >
            {t.guests.importGuests}
          </Button>

          <Button
            variant="soft-pink"
            size="sm"
            icon={<Send className="w-3.5 h-3.5" />}
            onClick={batchSendInvitations}
          >
            {t.guests.sendInvitations}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<UserPlus className="w-3.5 h-3.5" />}
            onClick={() => setIsAddGuestModalOpen(true)}
          >
            {t.guests.addGuest}
          </Button>
        </div>
      </div>

      {/* Control Bar: Search & Status Filters */}
      <div className="bg-white p-4 rounded-2xl border border-brand-border/80 shadow-subtle space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="flex-1 max-w-md">
            <SearchInput
              value={searchQuery}
              onChange={(val) => {
                setSearchQuery(val);
                setCurrentPage(1);
              }}
              onClear={() => {
                setSearchQuery('');
                setCurrentPage(1);
              }}
              placeholder={t.guests.searchPlaceholder}
            />
          </div>

          {/* Group dropdown filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-brand-muted shrink-0" />
            <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-brand-border text-xs">
              {groupFilters.map((grp) => (
                <button
                  key={grp.value}
                  onClick={() => {
                    setSelectedGroupFilter(grp.value);
                    setCurrentPage(1);
                  }}
                  className={clsx(
                    'px-2.5 py-1 rounded-lg transition-all font-medium',
                    selectedGroupFilter === grp.value
                      ? 'bg-white text-brand-deep shadow-xs font-semibold'
                      : 'text-brand-muted hover:text-brand-dark'
                  )}
                >
                  {grp.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Status Filter Badges / Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 border-t border-brand-border/60 scrollbar-none">
          {statusFilters.map((st) => {
            const isSelected = selectedStatusFilter === st.value;
            return (
              <button
                key={st.value}
                onClick={() => {
                  setSelectedStatusFilter(st.value);
                  setCurrentPage(1);
                }}
                className={clsx(
                  'flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border',
                  isSelected
                    ? 'bg-brand-deep text-white border-brand-deep shadow-xs font-semibold'
                    : 'bg-white text-brand-muted border-brand-border/80 hover:bg-brand-bg hover:text-brand-dark'
                )}
              >
                <span>{st.label}</span>
                <span
                  className={clsx(
                    'text-[10px] px-1.5 py-0.2 rounded-full font-semibold',
                    isSelected ? 'bg-white/20 text-white' : 'bg-brand-bg text-brand-muted'
                  )}
                >
                  {formatNumber(st.count)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Guest Table */}
      <GuestTable
        guests={paginatedGuests}
        onSelectGuest={(id) => setSelectedGuestId(id)}
        onToggleCheckIn={(id) => toggleCheckIn(id)}
        onUpdateRSVP={(id, status) => updateGuest(id, { rsvpStatus: status })}
        onDeleteGuest={(id) => deleteGuest(id)}
      />

      {/* Pagination Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-1 text-xs text-brand-muted">
        <div>
          {language === 'vi'
            ? `Hiển thị ${(currentPage - 1) * pageSize + 1} - ${Math.min(currentPage * pageSize, filteredGuests.length)} trên tổng số ${formatNumber(filteredGuests.length)} khách mời`
            : `Showing ${(currentPage - 1) * pageSize + 1} to ${Math.min(currentPage * pageSize, filteredGuests.length)} of ${formatNumber(filteredGuests.length)} guests`}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            icon={<ChevronLeft className="w-3.5 h-3.5" />}
          >
            {t.common.previous}
          </Button>

          <span className="font-medium text-brand-dark px-2">
            {language === 'vi' ? `Trang ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
          </span>

          <Button
            variant="secondary"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            icon={<ChevronRight className="w-3.5 h-3.5" />}
          >
            {t.common.next}
          </Button>
        </div>
      </div>
    </div>
  );
};
