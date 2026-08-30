import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { TableCard } from './TableCard';
import { Heart, Sparkles, Music, DoorOpen, Users } from 'lucide-react';

interface BallroomFloorPlanProps {
  activeTableNumber?: string;
  selectedTableNumber?: string;
  onSelectTable: (tableNumber: string) => void;
}

export const BallroomFloorPlan: React.FC<BallroomFloorPlanProps> = ({
  activeTableNumber,
  selectedTableNumber,
  onSelectTable,
}) => {
  const { tables, guests, wedding } = useApp();
  const { t, language } = useLanguage();

  const currentSelected = activeTableNumber || selectedTableNumber || 'Table 05';

  // Zone groupings
  const frontStageTables = tables.filter((t) => t.zone === 'front-stage');
  const centerTables = tables.filter((t) => t.zone === 'center');
  const leftWingTables = tables.filter((t) => t.zone === 'side-left');
  const rightWingTables = tables.filter((t) => t.zone === 'side-right');
  const rearTables = tables.filter((t) => t.zone === 'rear');

  const getTableGuests = (tableNumber: string) => {
    return guests.filter((g) => g.tableNumber === tableNumber);
  };

  return (
    <div className="flex-1 bg-white rounded-3xl border border-brand-border shadow-card p-6 sm:p-8 flex flex-col justify-between space-y-8 overflow-y-auto min-h-[750px] text-left">
      {/* 1. TOP: GRAND BRIDAL STAGE */}
      <div className="relative rounded-2xl p-4 bg-gradient-to-r from-brand-blush via-brand-soft/70 to-brand-blush border border-brand-primary/40 text-center shadow-subtle space-y-1">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-4 h-4 text-brand-deep fill-brand-deep" />
          <span className="font-serif font-bold text-lg text-brand-dark tracking-tight">
            {language === 'vi' ? 'Sân khấu & Bàn danh dự' : 'Grand Bridal Stage'} • {wedding.brideName.split(' ')[0]} & {wedding.groomName.split(' ')[0]}
          </span>
          <Heart className="w-4 h-4 text-brand-deep fill-brand-deep" />
        </div>
        <p className="text-[11px] text-brand-deep uppercase tracking-widest font-semibold">
          {language === 'vi' ? 'Cổng hoa tươi & Bàn chủ tiệc' : 'Floral Arch & Head Table'}
        </p>
      </div>

      {/* 2. FRONT STAGE VIP TABLES */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-brand-muted px-2 font-semibold uppercase tracking-wider">
          <span>{language === 'vi' ? 'Hàng đầu VIP & Gia đình' : 'VIP & Parents Front Row'}</span>
          <span>{language === 'vi' ? 'Bàn 01–03, 13' : 'Tables 01–03, 13'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {frontStageTables.map((t) => (
            <TableCard
              key={t.id}
              table={t}
              guests={getTableGuests(t.tableNumber)}
              isSelected={currentSelected === t.tableNumber}
              onSelectTable={onSelectTable}
            />
          ))}
        </div>
      </div>

      {/* 3. CENTER DANCE FLOOR & MAIN GUEST TABLES */}
      <div className="space-y-4">
        {/* Dance Floor Accent */}
        <div className="rounded-2xl p-4 bg-brand-bg/60 border border-brand-primary/25 text-center shadow-xs flex items-center justify-center gap-2">
          <Music className="w-4 h-4 text-brand-accent" />
          <span className="font-serif font-bold text-sm text-brand-dark tracking-wider uppercase">
            {language === 'vi' ? 'Sàn khiêu vũ trung tâm & Tháp sâm panh' : 'Center Polished Dance Floor & Champagne Fountain'}
          </span>
        </div>

        {/* Center & Wing Tables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {centerTables.map((t) => (
            <TableCard
              key={t.id}
              table={t}
              guests={getTableGuests(t.tableNumber)}
              isSelected={currentSelected === t.tableNumber}
              onSelectTable={onSelectTable}
            />
          ))}
        </div>
      </div>

      {/* 4. SIDE WINGS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[...leftWingTables, ...rightWingTables].map((t) => (
          <TableCard
            key={t.id}
            table={t}
            guests={getTableGuests(t.tableNumber)}
            isSelected={currentSelected === t.tableNumber}
            onSelectTable={onSelectTable}
          />
        ))}
      </div>

      {/* 5. REAR TABLES */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-brand-muted px-2 font-semibold uppercase tracking-wider">
          <span>{language === 'vi' ? 'Khu vực phía sau & Bàn dự phòng' : 'Rear Garden & Open Reserve'}</span>
          <span>{language === 'vi' ? 'Bàn 09, 14, 15' : 'Tables 09, 14, 15'}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {rearTables.map((t) => (
            <TableCard
              key={t.id}
              table={t}
              guests={getTableGuests(t.tableNumber)}
              isSelected={currentSelected === t.tableNumber}
              onSelectTable={onSelectTable}
            />
          ))}
        </div>
      </div>

      {/* 6. BOTTOM: ENTRANCE & RECEPTION CHECK-IN DESK */}
      <div className="rounded-2xl p-4 bg-brand-bg/80 border border-brand-border text-center shadow-subtle flex flex-col sm:flex-row items-center justify-between px-6 gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-dark">
          <DoorOpen className="w-4 h-4 text-brand-accent" />
          <span>{language === 'vi' ? 'Cửa vào khán phòng chính Cổng A & B' : 'Grand Ballroom Entrance Gates A & B'}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-brand-deep">
          <Users className="w-4 h-4 text-brand-deep" />
          <span>{language === 'vi' ? 'Bàn lễ tân đón khách & Quét mã QR' : 'Reception Welcome Desk & QR Check-in Station'}</span>
        </div>
      </div>
    </div>
  );
};
