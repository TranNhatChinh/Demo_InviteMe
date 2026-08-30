import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { SeatingValidationBanner } from './SeatingValidationBanner';
import { UnassignedGuestList } from './UnassignedGuestList';
import { BallroomFloorPlan } from './BallroomFloorPlan';
import { TableDetailsPanel } from './TableDetailsPanel';
import { CapacityWarningModal } from './CapacityWarningModal';
import { AutoSeatingModal } from './AutoSeatingModal';
import { AddTableModal } from './AddTableModal';
import { Button } from '../common/Button';
import { Guest } from '../../types';
import {
  Armchair,
  Sparkles,
  Plus,
  Wand2,
  Users,
  AlertTriangle,
  Layers,
} from 'lucide-react';

export const SeatingArrangement: React.FC = () => {
  const {
    seatingStats,
    selectedTableId,
    setSelectedTableId,
    assignGuestToTable,
    tables,
    guests,
  } = useApp();

  const { t, formatNumber, language } = useLanguage();

  const [activeTableNumber, setActiveTableNumber] = useState<string>(selectedTableId || 'Table 05');
  const [isAutoModalOpen, setIsAutoModalOpen] = useState(false);
  const [isAddTableOpen, setIsAddTableOpen] = useState(false);
  const [warningModalData, setWarningModalData] = useState<{
    isOpen: boolean;
    guest: Guest | null;
    tableNumber: string;
  }>({
    isOpen: false,
    guest: null,
    tableNumber: '',
  });

  const handleSelectTable = (tblNum: string) => {
    setActiveTableNumber(tblNum);
    setSelectedTableId(tblNum);
  };

  const handleAssignToActiveTable = (guest: Guest) => {
    const targetTableNumber = activeTableNumber || 'Table 01';
    const targetTable = tables.find((t) => t.tableNumber === targetTableNumber);
    const tableGuests = guests.filter((g) => g.tableNumber === targetTableNumber);

    if (targetTable && tableGuests.length >= targetTable.capacity) {
      setWarningModalData({
        isOpen: true,
        guest,
        tableNumber: targetTableNumber,
      });
      return;
    }

    assignGuestToTable(guest.id, targetTableNumber);
  };

  const handleConfirmOverCapacity = () => {
    if (warningModalData.guest && warningModalData.tableNumber) {
      assignGuestToTable(warningModalData.guest.id, warningModalData.tableNumber);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Top Title & Primary Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Armchair className="w-3.5 h-3.5 text-brand-accent" />
            <span>{language === 'vi' ? 'Sắp xếp bàn tiệc thông minh' : 'Ballroom Seating Intelligence'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.seating.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.seating.subtitle}
          </p>
        </div>

        {/* Primary CTAs */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="soft-pink"
            size="sm"
            icon={<Wand2 className="w-3.5 h-3.5" />}
            onClick={() => setIsAutoModalOpen(true)}
          >
            {t.seating.autoSuggestSeating}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Plus className="w-3.5 h-3.5" />}
            onClick={() => setIsAddTableOpen(true)}
          >
            {t.seating.addTable}
          </Button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.seating.tablesCount}
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
              {formatNumber(seatingStats.totalTables)} <span className="text-sm font-sans font-normal text-brand-muted">{t.common.tablesUnit}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-brand-soft text-brand-deep flex items-center justify-center">
            <Armchair className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.seating.assignedGuests}
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep">
              {formatNumber(seatingStats.assignedGuests)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.seating.unassignedGuests}
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-amber-700">
              {formatNumber(seatingStats.unassignedGuests)}
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-brand-border/80 shadow-card flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              {t.seating.overCapacity}
            </span>
            <div className="font-serif text-2xl sm:text-3xl font-bold text-rose-600">
              {seatingStats.overCapacityCount} <span className="text-sm font-sans font-normal text-brand-muted">{t.common.tablesUnit}</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Real-time Validation Banner */}
      <SeatingValidationBanner
        onOpenAutoSeating={() => setIsAutoModalOpen(true)}
      />

      {/* 3-Column Visual Seating Studio Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (3 cols): Unassigned Guest Pool */}
        <div className="lg:col-span-3">
          <UnassignedGuestList onAssignToActiveTable={handleAssignToActiveTable} />
        </div>

        {/* Center Column (6 cols): 2D Ballroom Floor Plan */}
        <div className="lg:col-span-6">
          <BallroomFloorPlan
            activeTableNumber={activeTableNumber}
            onSelectTable={handleSelectTable}
          />
        </div>

        {/* Right Column (3 cols): Table Details Drawer */}
        <div className="lg:col-span-3">
          <TableDetailsPanel tableNumber={activeTableNumber} />
        </div>
      </div>

      {/* Modals */}
      <CapacityWarningModal
        isOpen={warningModalData.isOpen}
        guestName={warningModalData.guest?.fullName || ''}
        tableNumber={warningModalData.tableNumber}
        currentCount={11}
        capacity={10}
        onClose={() => setWarningModalData({ isOpen: false, guest: null, tableNumber: '' })}
        onConfirm={handleConfirmOverCapacity}
      />

      <AutoSeatingModal
        isOpen={isAutoModalOpen}
        onClose={() => setIsAutoModalOpen(false)}
      />

      <AddTableModal
        isOpen={isAddTableOpen}
        onClose={() => setIsAddTableOpen(false)}
      />
    </div>
  );
};
