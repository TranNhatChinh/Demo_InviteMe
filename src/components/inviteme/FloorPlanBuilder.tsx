import React, { useState, useRef, useEffect } from 'react';
import { TableItem, FloorDecorItem, WeddingGuest, TableShape, GuestGroup, DietaryRestriction } from './types';
import { 
  CircleDot, 
  Square, 
  Sparkles, 
  Crown, 
  Music, 
  Plus, 
  Move, 
  Trash2, 
  Armchair, 
  Maximize2,
  Settings2,
  ArrowRight,
  Info,
  AlertTriangle,
  UserPlus,
  Search,
  Utensils,
  X,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FloorPlanBuilderProps {
  tables: TableItem[];
  decor: FloorDecorItem[];
  guests: WeddingGuest[];
  onAddTable: (table: Omit<TableItem, 'id'>) => void;
  onUpdateTable: (table: TableItem) => void;
  onDeleteTable: (id: string) => void;
  onAddDecor: (decor: Omit<FloorDecorItem, 'id'>) => void;
  onDeleteDecor: (id: string) => void;
  onSelectTableForAssignment: (tableId: string) => void;
  onAssignGuest?: (guestId: string, tableId: string, seatNumber?: number) => void;
  onUnassignGuest?: (guestId: string) => void;
  onAddGuest?: (guest: Omit<WeddingGuest, 'id'>) => void;
}

export const FloorPlanBuilder: React.FC<FloorPlanBuilderProps> = ({
  tables,
  decor,
  guests,
  onAddTable,
  onUpdateTable,
  onDeleteTable,
  onAddDecor,
  onDeleteDecor,
  onSelectTableForAssignment,
  onAssignGuest,
  onUnassignGuest,
  onAddGuest
}) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedTableId, setSelectedTableId] = useState<string | null>(tables[0]?.id || null);
  const [activeDrag, setActiveDrag] = useState<{
    id: string;
    type: 'table' | 'decor';
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    currX: number;
    currY: number;
  } | null>(null);

  // Sync selectedTableId if current table is removed
  useEffect(() => {
    if (selectedTableId && !tables.some(t => t.id === selectedTableId)) {
      setSelectedTableId(tables[0]?.id || null);
    }
  }, [tables, selectedTableId]);

  // Seat Picker Modal State (When clicking on empty seat UserPlus icon)
  const [seatPickerModal, setSeatPickerModal] = useState<{
    isOpen: boolean;
    table: TableItem | null;
    seatNumber: number | null;
    search: string;
    mode: 'existing' | 'new';
    filterRsvp: 'All' | 'Attending' | 'Unresponded';
  }>({
    isOpen: false,
    table: null,
    seatNumber: null,
    search: '',
    mode: 'existing',
    filterRsvp: 'All'
  });

  // Quick New Guest Form State
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestGroup, setNewGuestGroup] = useState<GuestGroup>('Family');
  const [newGuestDietary, setNewGuestDietary] = useState<DietaryRestriction>('None');

  // Seated Guest Inspector Modal State (When clicking on an occupied seat)
  const [seatedGuestModal, setSeatedGuestModal] = useState<{
    isOpen: boolean;
    guest: WeddingGuest | null;
    table: TableItem | null;
  }>({
    isOpen: false,
    guest: null,
    table: null
  });

  // Delete Confirmation Modal State
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'table' | 'decor';
    id: string;
    title: string;
    message: string;
  }>({
    isOpen: false,
    type: 'table',
    id: '',
    title: '',
    message: ''
  });

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#EFA3B3', '#F8C9D2', '#B7CBB8', '#E8CFA8']
      });
    } catch {
      // safe fallback
    }
  };

  const handleOpenSeatPicker = (table: TableItem, seatNumber: number) => {
    setSelectedTableId(table.id);
    setSeatPickerModal({
      isOpen: true,
      table,
      seatNumber,
      search: '',
      mode: 'existing',
      filterRsvp: 'All'
    });
    setNewGuestName('');
    setNewGuestGroup('Family');
    setNewGuestDietary('None');
  };

  const handleSelectGuestForSeat = (guestId: string) => {
    if (seatPickerModal.table && seatPickerModal.seatNumber && onAssignGuest) {
      onAssignGuest(guestId, seatPickerModal.table.id, seatPickerModal.seatNumber);
      triggerCelebration();
    }
    setSeatPickerModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleQuickCreateAndSeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuestName.trim() || !seatPickerModal.table || !seatPickerModal.seatNumber) return;

    if (onAddGuest) {
      onAddGuest({
        name: newGuestName.trim(),
        group: newGuestGroup,
        dietary: newGuestDietary,
        rsvp: 'Attending',
        tableId: seatPickerModal.table.id,
        seatNumber: seatPickerModal.seatNumber
      });
      triggerCelebration();
    }
    setSeatPickerModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleOpenSeatedGuest = (guest: WeddingGuest, table: TableItem) => {
    setSelectedTableId(table.id);
    setSeatedGuestModal({
      isOpen: true,
      guest,
      table
    });
  };

  const handleUnseatCurrentGuest = () => {
    if (seatedGuestModal.guest && onUnassignGuest) {
      onUnassignGuest(seatedGuestModal.guest.id);
    }
    setSeatedGuestModal(prev => ({ ...prev, isOpen: false }));
  };

  const handleRequestDeleteTable = (table: TableItem) => {
    const seatedCount = getTableSeatedCount(table.id);
    setDeleteConfirm({
      isOpen: true,
      type: 'table',
      id: table.id,
      title: `Delete ${table.tableNumber}?`,
      message: seatedCount > 0 
        ? `This table currently has ${seatedCount} seated guest(s). Deleting it will return them to the unseated guest roster.`
        : `Are you sure you want to remove "${table.name}" from the reception floor plan?`
    });
  };

  const handleRequestDeleteDecor = (decorId: string, decorName: string) => {
    setDeleteConfirm({
      isOpen: true,
      type: 'decor',
      id: decorId,
      title: `Delete ${decorName}?`,
      message: `Are you sure you want to remove this element from the ballroom canvas?`
    });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm.type === 'table') {
      onDeleteTable(deleteConfirm.id);
      if (selectedTableId === deleteConfirm.id) {
        const remaining = tables.filter(t => t.id !== deleteConfirm.id);
        setSelectedTableId(remaining[0]?.id || null);
      }
    } else {
      onDeleteDecor(deleteConfirm.id);
    }
    setDeleteConfirm(prev => ({ ...prev, isOpen: false }));
  };

  // Add Table Toolkit Modal / State
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [pendingShape, setPendingShape] = useState<TableShape>('round');
  const [pendingSeats, setPendingSeats] = useState<number>(8);
  const [pendingName, setPendingName] = useState<string>('');

  // Capacity calculation helper
  const getTableSeatedCount = (tableId: string) => {
    return guests.filter(g => g.tableId === tableId).length;
  };

  // Ultra-smooth Hardware Accelerated Pointer Dragging
  const handlePointerDownTable = (e: React.PointerEvent, table: TableItem) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setSelectedTableId(table.id);
    setActiveDrag({
      id: table.id,
      type: 'table',
      startX: e.clientX,
      startY: e.clientY,
      origX: table.x,
      origY: table.y,
      currX: table.x,
      currY: table.y,
    });
  };

  const handlePointerDownDecor = (e: React.PointerEvent, item: FloorDecorItem) => {
    const target = e.target as HTMLElement;
    if (target.closest('button')) {
      return;
    }
    e.stopPropagation();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setActiveDrag({
      id: item.id,
      type: 'decor',
      startX: e.clientX,
      startY: e.clientY,
      origX: item.x,
      origY: item.y,
      currX: item.x,
      currY: item.y,
    });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDrag || !canvasRef.current) return;

    const deltaX = e.clientX - activeDrag.startX;
    const deltaY = e.clientY - activeDrag.startY;
    const canvasRect = canvasRef.current.getBoundingClientRect();

    const maxX = canvasRect.width - (activeDrag.type === 'decor' ? 230 : 140);
    const maxY = canvasRect.height - (activeDrag.type === 'decor' ? 160 : 140);

    const nextX = Math.max(15, Math.min(maxX, activeDrag.origX + deltaX));
    const nextY = Math.max(15, Math.min(maxY, activeDrag.origY + deltaY));

    setActiveDrag(prev => prev ? { ...prev, currX: Math.round(nextX), currY: Math.round(nextY) } : null);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeDrag) return;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }

    if (activeDrag.type === 'table') {
      const currentTable = tables.find(t => t.id === activeDrag.id);
      if (currentTable) {
        onUpdateTable({
          ...currentTable,
          x: activeDrag.currX,
          y: activeDrag.currY
        });
      }
    }
    setActiveDrag(null);
  };

  const handleOpenAddTable = (shape: TableShape) => {
    setPendingShape(shape);
    if (shape === 'head') {
      setPendingSeats(6);
      setPendingName('Head Table');
    } else if (shape === 'rectangular') {
      setPendingSeats(10);
      setPendingName(`Table 0${tables.length + 1} (Estate)`);
    } else {
      setPendingSeats(8);
      setPendingName(`Table 0${tables.length + 1}`);
    }
    setIsConfigModalOpen(true);
  };

  const handleConfirmAddTable = (e: React.FormEvent) => {
    e.preventDefault();
    const nextNumber = pendingShape === 'head' ? 'Head Table' : `Table 0${tables.length + 1}`;
    
    // Position near center with slight offset
    const randomOffset = (tables.length % 4) * 40;
    const posX = 150 + randomOffset;
    const posY = 100 + (Math.floor(tables.length / 4) * 130);

    onAddTable({
      name: pendingName.trim() || nextNumber,
      tableNumber: nextNumber,
      shape: pendingShape,
      capacity: pendingSeats,
      x: posX,
      y: posY
    });

    setIsConfigModalOpen(false);
  };

  const handleAddDanceFloor = () => {
    onAddDecor({
      type: 'dance-floor',
      name: 'Starlight Dance Floor',
      x: 300,
      y: 250,
      width: 220,
      height: 140
    });
  };

  const selectedTable = tables.find(t => t.id === selectedTableId);
  const selectedTableGuests = selectedTable ? guests.filter(g => g.tableId === selectedTable.id) : [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#F8C9D2]/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDECEF] border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] mb-2">
            <Armchair className="w-3.5 h-3.5 text-[#EFA3B3]" />
            <span>Interactive Reception Layout</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#3B202B]">
            Floor Plan Builder
          </h2>
          <p className="text-sm text-[#8B6A74] mt-1 font-sans">
            Architect your grand ballroom. Drag, position, configure seat capacities, and organize tables.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-[#8B6A74] bg-[#FDECEF] px-3.5 py-2 rounded-xl border border-[#F8C9D2]/60">
            <span className="w-2 h-2 rounded-full bg-[#B7CBB8]"></span>
            <span>Total Tables: <strong className="text-[#3B202B]">{tables.length}</strong></span>
            <span className="mx-1 text-[#F8C9D2]">|</span>
            <span>Seated Capacity: <strong className="text-[#3B202B]">{guests.filter(g => g.tableId).length} / {tables.reduce((acc, t) => acc + t.capacity, 0)}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Builder Grid: Left Toolkit Sidebar & Right Visual Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Toolkit Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white rounded-2xl border border-[#F8C9D2] p-5 shadow-[0_4px_24px_rgba(239,163,181,0.06)]">
            <h3 className="font-serif text-base font-bold text-[#3B202B] flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-[#EFA3B3]" />
              <span>Ballroom Elements</span>
            </h3>
            <p className="text-xs text-[#8B6A74] mb-4">
              Click any element below to configure and add it onto the reception canvas.
            </p>

            <div className="space-y-2.5">
              {/* Round Table Item */}
              <button
                onClick={() => handleOpenAddTable('round')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#F8C9D2] bg-[#FFF9F6] hover:bg-[#FDECEF] hover:border-[#EFA3B3] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#EFA3B3] flex items-center justify-center text-[#EFA3B3] shadow-sm group-hover:scale-105 transition-transform">
                    <CircleDot className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#3B202B]">Round Table</div>
                    <div className="text-xs text-[#8B6A74]">Configurable 4–12 seats</div>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-[#8B6A74] group-hover:text-[#3B202B]" />
              </button>

              {/* Rectangular Table Item */}
              <button
                onClick={() => handleOpenAddTable('rectangular')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#F8C9D2] bg-[#FFF9F6] hover:bg-[#FDECEF] hover:border-[#EFA3B3] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EFA3B3] flex items-center justify-center text-[#EFA3B3] shadow-sm group-hover:scale-105 transition-transform">
                    <Square className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#3B202B]">Rectangular Table</div>
                    <div className="text-xs text-[#8B6A74]">Estate or banquet style</div>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-[#8B6A74] group-hover:text-[#3B202B]" />
              </button>

              {/* Head Table Item */}
              <button
                onClick={() => handleOpenAddTable('head')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#E8CFA8] bg-[#FFF9F6] hover:bg-[#FDECEF] hover:border-[#EFA3B3] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#FFF9F6] border border-[#E8CFA8] flex items-center justify-center text-[#E8CFA8] shadow-sm group-hover:scale-105 transition-transform">
                    <Crown className="w-5 h-5 text-[#8B6A74]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#3B202B]">Head Table</div>
                    <div className="text-xs text-[#8B6A74]">VIP Newlywed bridal table</div>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-[#8B6A74] group-hover:text-[#3B202B]" />
              </button>

              {/* Dance Floor Item */}
              <button
                onClick={handleAddDanceFloor}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-[#F8C9D2] bg-[#FFF9F6] hover:bg-[#FDECEF] hover:border-[#EFA3B3] transition-all group text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#F8C9D2] flex items-center justify-center text-[#8B6A74] shadow-sm group-hover:scale-105 transition-transform">
                    <Music className="w-5 h-5 text-[#EFA3B3]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#3B202B]">Dance Floor</div>
                    <div className="text-xs text-[#8B6A74]">Ballroom dance center</div>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-[#8B6A74] group-hover:text-[#3B202B]" />
              </button>
            </div>
          </div>

          {/* Selected Table Inspector Card */}
          {selectedTable && (
            <div className="bg-white rounded-2xl border border-[#F8C9D2] p-5 shadow-[0_4px_24px_rgba(239,163,181,0.06)] space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#8B6A74]">Selected Table</span>
                <button
                  onClick={() => handleRequestDeleteTable(selectedTable)}
                  className="text-xs text-[#D97986] hover:bg-[#FDECEF] px-2.5 py-1 rounded-lg border border-[#D97986]/30 hover:border-[#D97986] transition-colors flex items-center gap-1 cursor-pointer"
                  title="Remove this table"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              <div>
                <div className="font-serif text-lg font-bold text-[#3B202B]">{selectedTable.tableNumber}</div>
                <div className="text-xs text-[#8B6A74]">{selectedTable.name}</div>
              </div>

              {/* Capacity Bar */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-[#8B6A74]">Capacity</span>
                  <span className="font-semibold text-[#3B202B]">
                    {getTableSeatedCount(selectedTable.id)} / {selectedTable.capacity} seated
                  </span>
                </div>
                <div className="w-full h-2 bg-[#FDECEF] rounded-full overflow-hidden border border-[#F8C9D2]">
                  <div 
                    className="h-full bg-[#EFA3B3] rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (getTableSeatedCount(selectedTable.id) / selectedTable.capacity) * 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Seated Guests preview */}
              <div>
                <div className="text-xs font-semibold text-[#8B6A74] uppercase tracking-wider mb-2">
                  Seated Guests ({selectedTableGuests.length})
                </div>
                {selectedTableGuests.length === 0 ? (
                  <div className="text-xs text-[#8B6A74] italic bg-[#FFF9F6] p-2.5 rounded-xl border border-dashed border-[#F8C9D2] text-center">
                    No guests assigned to this table yet.
                  </div>
                ) : (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {selectedTableGuests.map(g => (
                      <div key={g.id} className="flex items-center justify-between text-xs bg-[#FFF9F6] px-2.5 py-1.5 rounded-lg border border-[#F8C9D2]/60">
                        <span className="font-medium text-[#3B202B] truncate">{g.name}</span>
                        <span className="text-[10px] text-[#8B6A74]">{g.group}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Jump to Assignment button */}
              <button
                onClick={() => onSelectTableForAssignment(selectedTable.id)}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#EFA3B3] text-[#3B202B] text-xs font-semibold hover:bg-[#F8C9D2] transition-colors shadow-sm"
              >
                <span>Assign Guests to this Table</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Visual Canvas Area */}
        <div className="lg:col-span-9">
          <div className="bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_4px_30px_rgba(239,163,181,0.10)] overflow-hidden">
            {/* Canvas Header Controls */}
            <div className="px-5 py-3 bg-[#FDECEF] border-b border-[#F8C9D2] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#8B6A74]">
                <Move className="w-4 h-4 text-[#EFA3B3]" />
                <span className="font-medium">Interactive Reception Canvas</span>
                <span className="hidden sm:inline text-xs text-[#8B6A74]/70">· Click and drag tables to arrange ballroom floor</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-[#F8C9D2] text-[#3B202B]">
                  <CircleDot className="w-3 h-3 text-[#EFA3B3]" />
                  <span>Round</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-[#F8C9D2] text-[#3B202B]">
                  <Square className="w-3 h-3 text-[#EFA3B3]" />
                  <span>Rectangular</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-[#E8CFA8] text-[#3B202B]">
                  <Crown className="w-3 h-3 text-[#E8CFA8]" />
                  <span>Head Table</span>
                </span>
              </div>
            </div>

            {/* Interactive Canvas Area */}
            <div 
              ref={canvasRef}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative w-full h-[580px] bg-[#FFF9F6] overflow-hidden select-none cursor-default touch-none"
              style={{
                backgroundImage: 'radial-gradient(#F8C9D2 0.85px, transparent 0.85px)',
                backgroundSize: '24px 24px'
              }}
            >
              {/* Grand Entrance Visual Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#FDECEF] border border-[#F8C9D2] rounded-full text-[11px] font-semibold text-[#8B6A74] tracking-widest uppercase shadow-sm pointer-events-none">
                Grand Reception Entrance
              </div>

              {/* Decor Elements (e.g. Dance Floor) */}
              {decor.map((item) => {
                const isItemDragging = activeDrag?.type === 'decor' && activeDrag.id === item.id;
                const posX = isItemDragging ? activeDrag.currX : item.x;
                const posY = isItemDragging ? activeDrag.currY : item.y;

                return (
                  <div
                    key={item.id}
                    onPointerDown={(e) => handlePointerDownDecor(e, item)}
                    style={{
                      transform: `translate3d(${posX}px, ${posY}px, 0)`,
                      width: `${item.width}px`,
                      height: `${item.height}px`,
                      willChange: 'transform',
                      touchAction: 'none'
                    }}
                    className={`absolute top-0 left-0 rounded-2xl bg-gradient-to-br from-[#FFF9F6] via-[#FDECEF] to-[#F8C9D2]/40 border-2 border-dashed border-[#EFA3B3]/70 flex flex-col items-center justify-center p-3 group cursor-grab active:cursor-grabbing ${
                      isItemDragging ? 'z-30 shadow-xl opacity-90 scale-[1.02] transition-none' : 'z-10 shadow-inner hover:shadow-md'
                    }`}
                  >
                    <Sparkles className="w-6 h-6 text-[#EFA3B3] mb-1 animate-pulse" />
                    <div className="font-serif text-sm font-bold text-[#3B202B] text-center">{item.name}</div>
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestDeleteDecor(item.id, item.name);
                      }}
                      className="absolute top-2.5 right-2.5 w-7 h-7 bg-white/95 hover:bg-[#D97986] text-[#8B6A74] hover:text-white rounded-lg shadow-sm border border-[#F8C9D2] flex items-center justify-center transition-colors z-20 cursor-pointer"
                      title={`Delete ${item.name}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}

              {/* Table Elements */}
              {tables.map((table) => {
                const isSelected = table.id === selectedTableId;
                const isTableDragging = activeDrag?.type === 'table' && activeDrag.id === table.id;
                const tableGuests = guests.filter(g => g.tableId === table.id);
                const seatedCount = tableGuests.length;

                const posX = isTableDragging ? activeDrag.currX : table.x;
                const posY = isTableDragging ? activeDrag.currY : table.y;

                if (table.shape === 'round') {
                  return (
                    <div
                      key={table.id}
                      onPointerDown={(e) => handlePointerDownTable(e, table)}
                      onClick={() => setSelectedTableId(table.id)}
                      style={{
                        transform: `translate3d(${posX}px, ${posY}px, 0)`,
                        width: '164px',
                        height: '164px',
                        willChange: 'transform',
                        touchAction: 'none'
                      }}
                      className={`absolute top-0 left-0 rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none group ${
                        isTableDragging
                          ? 'z-30 shadow-2xl scale-105 transition-none'
                          : isSelected 
                          ? 'z-20 ring-4 ring-[#EFA3B3]/80 shadow-xl' 
                          : 'z-10 hover:shadow-md'
                      }`}
                    >
                      {/* Trash can delete icon on table */}
                      <button
                        type="button"
                        onPointerDown={(e) => e.stopPropagation()}
                        onPointerUp={(e) => e.stopPropagation()}
                        onMouseDown={(e) => e.stopPropagation()}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRequestDeleteTable(table);
                        }}
                        className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-[#D97986] text-[#D97986] hover:bg-[#D97986] hover:text-white shadow-md flex items-center justify-center transition-all z-40 cursor-pointer group-hover:scale-110"
                        title={`Delete ${table.tableNumber}`}
                      >
                        <Trash2 className="w-3 h-3 pointer-events-none" />
                      </button>

                      {/* Surrounding Seat/Chair Badges */}
                      {Array.from({ length: table.capacity }).map((_, idx) => {
                        const angle = (idx / table.capacity) * (2 * Math.PI) - Math.PI / 2;
                        const radius = 63;
                        const cx = 82 + radius * Math.cos(angle) - 13;
                        const cy = 82 + radius * Math.sin(angle) - 13;
                        const seatNum = idx + 1;

                        // Find guest at this seat or index
                        const seatedGuest = tableGuests.find(g => g.seatNumber === seatNum) || tableGuests[idx];

                        if (seatedGuest) {
                          const initials = seatedGuest.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase();

                          return (
                            <button
                              key={idx}
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onPointerUp={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenSeatedGuest(seatedGuest, table);
                              }}
                              style={{ left: `${cx}px`, top: `${cy}px` }}
                              className="absolute w-[26px] h-[26px] rounded-full bg-[#3B202B] text-white hover:ring-2 hover:ring-[#EFA3B3] flex items-center justify-center font-sans text-[10px] font-bold shadow-xs border border-[#3B202B] hover:scale-115 transition-all z-30 cursor-pointer"
                              title={`${seatedGuest.name} (Seat ${seatNum}) — Click to view/unseat`}
                            >
                              <span className="pointer-events-none">{initials}</span>
                            </button>
                          );
                        }

                        // Empty seat with UserPlus icon (like photo 8+) - Clickable to seat guest
                        return (
                          <button
                            key={idx}
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onPointerUp={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenSeatPicker(table, seatNum);
                            }}
                            style={{ left: `${cx}px`, top: `${cy}px` }}
                            className="absolute w-[26px] h-[26px] rounded-full bg-white text-[#3B202B] border-2 border-[#3B202B]/80 hover:bg-[#FDECEF] hover:border-[#EFA3B3] hover:scale-115 flex items-center justify-center shadow-xs transition-all z-30 cursor-pointer"
                            title={`Click to seat guest at Seat ${seatNum}`}
                          >
                            <UserPlus className="w-3.5 h-3.5 text-[#3B202B] pointer-events-none" />
                          </button>
                        );
                      })}

                      {/* Center Rose/Pink Table Circle */}
                      <div className="w-[94px] h-[94px] rounded-full bg-[#F8A8B8] border-2 border-[#3B202B] shadow-sm flex flex-col items-center justify-center text-center p-2 z-20 pointer-events-none">
                        <div className="font-serif text-xs font-bold text-[#3B202B] leading-tight truncate max-w-[80px]">
                          {table.tableNumber}
                        </div>
                        <div className="text-[11px] font-bold text-[#3B202B] mt-0.5 leading-none">
                          {seatedCount}/{table.capacity}
                        </div>
                        <div className="text-[9px] text-[#3B202B]/85 font-medium mt-0.5 leading-none">
                          Seats filled
                        </div>
                      </div>
                    </div>
                  );
                }

                // Square / Rectangular or Head Table
                const isHead = table.shape === 'head';
                const halfCapacity = Math.ceil(table.capacity / 2);
                const topSeats = Array.from({ length: halfCapacity });
                const bottomSeats = Array.from({ length: table.capacity - halfCapacity });

                return (
                  <div
                    key={table.id}
                    onPointerDown={(e) => handlePointerDownTable(e, table)}
                    onClick={() => setSelectedTableId(table.id)}
                    style={{
                      transform: `translate3d(${posX}px, ${posY}px, 0)`,
                      width: isHead ? '200px' : '184px',
                      height: '124px',
                      willChange: 'transform',
                      touchAction: 'none'
                    }}
                    className={`absolute top-0 left-0 rounded-2xl flex items-center justify-center cursor-grab active:cursor-grabbing select-none group ${
                      isTableDragging
                        ? 'z-30 shadow-2xl scale-105 transition-none'
                        : isSelected 
                        ? 'z-20 ring-4 ring-[#EFA3B3]/80 shadow-xl' 
                        : 'z-10 hover:shadow-md'
                    }`}
                  >
                    {/* Trash can delete icon on table */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onPointerUp={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequestDeleteTable(table);
                      }}
                      className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border border-[#D97986] text-[#D97986] hover:bg-[#D97986] hover:text-white shadow-md flex items-center justify-center transition-all z-40 cursor-pointer group-hover:scale-110"
                      title={`Delete ${table.tableNumber}`}
                    >
                      <Trash2 className="w-3 h-3 pointer-events-none" />
                    </button>

                    {/* Top Row Seats */}
                    <div className="absolute top-0 left-0 right-0 flex justify-around px-5 z-30">
                      {topSeats.map((_, idx) => {
                        const seatNum = idx + 1;
                        const seatedGuest = tableGuests.find(g => g.seatNumber === seatNum) || tableGuests[idx];

                        if (seatedGuest) {
                          const initials = seatedGuest.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase();

                          return (
                            <button
                              key={`top-${idx}`}
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onPointerUp={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenSeatedGuest(seatedGuest, table);
                              }}
                              className="w-[26px] h-[26px] rounded-full bg-[#3B202B] text-white hover:ring-2 hover:ring-[#EFA3B3] flex items-center justify-center font-sans text-[10px] font-bold shadow-xs border border-[#3B202B] hover:scale-115 transition-all cursor-pointer"
                              title={`${seatedGuest.name} (Seat ${seatNum}) — Click to view/unseat`}
                            >
                              <span className="pointer-events-none">{initials}</span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={`top-${idx}`}
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onPointerUp={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenSeatPicker(table, seatNum);
                            }}
                            className="w-[26px] h-[26px] rounded-full bg-white text-[#3B202B] border-2 border-[#3B202B]/80 hover:bg-[#FDECEF] hover:border-[#EFA3B3] hover:scale-115 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                            title={`Click to seat guest at Seat ${seatNum}`}
                          >
                            <UserPlus className="w-3.5 h-3.5 text-[#3B202B] pointer-events-none" />
                          </button>
                        );
                      })}
                    </div>

                    {/* Center Rose/Pink Table Rectangle */}
                    <div className="w-[124px] h-[64px] rounded-2xl bg-[#F8A8B8] border-2 border-[#3B202B] shadow-sm flex flex-col items-center justify-center text-center p-2 z-20 pointer-events-none">
                      <div className="font-serif text-xs font-bold text-[#3B202B] leading-tight flex items-center justify-center gap-1 truncate max-w-[110px]">
                        {isHead && <Crown className="w-3 h-3 text-[#3B202B] shrink-0" />}
                        <span className="truncate">{table.tableNumber}</span>
                      </div>
                      <div className="text-[11px] font-bold text-[#3B202B] mt-0.5 leading-none">
                        {seatedCount}/{table.capacity}
                      </div>
                      <div className="text-[9px] text-[#3B202B]/85 font-medium mt-0.5 leading-none">
                        Seats filled
                      </div>
                    </div>

                    {/* Bottom Row Seats */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around px-5 z-30">
                      {bottomSeats.map((_, subIdx) => {
                        const seatNum = halfCapacity + subIdx + 1;
                        const seatedGuest = tableGuests.find(g => g.seatNumber === seatNum) || tableGuests[halfCapacity + subIdx];

                        if (seatedGuest) {
                          const initials = seatedGuest.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)
                            .toUpperCase();

                          return (
                            <button
                              key={`bot-${subIdx}`}
                              type="button"
                              onPointerDown={(e) => e.stopPropagation()}
                              onPointerUp={(e) => e.stopPropagation()}
                              onMouseDown={(e) => e.stopPropagation()}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenSeatedGuest(seatedGuest, table);
                              }}
                              className="w-[26px] h-[26px] rounded-full bg-[#3B202B] text-white hover:ring-2 hover:ring-[#EFA3B3] flex items-center justify-center font-sans text-[10px] font-bold shadow-xs border border-[#3B202B] hover:scale-115 transition-all cursor-pointer"
                              title={`${seatedGuest.name} (Seat ${seatNum}) — Click to view/unseat`}
                            >
                              <span className="pointer-events-none">{initials}</span>
                            </button>
                          );
                        }

                        return (
                          <button
                            key={`bot-${subIdx}`}
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}
                            onPointerUp={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenSeatPicker(table, seatNum);
                            }}
                            className="w-[26px] h-[26px] rounded-full bg-white text-[#3B202B] border-2 border-[#3B202B]/80 hover:bg-[#FDECEF] hover:border-[#EFA3B3] hover:scale-115 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                            title={`Click to seat guest at Seat ${seatNum}`}
                          >
                            <UserPlus className="w-3.5 h-3.5 text-[#3B202B] pointer-events-none" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Seat Picker Modal (Triggered by clicking any UserPlus icon) */}
      {seatPickerModal.isOpen && seatPickerModal.table && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#F8C9D2] shadow-[0_25px_60px_rgba(59,32,43,0.2)] overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-[#FDECEF] border-b border-[#F8C9D2] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4 text-[#EFA3B3]" />
                  <h3 className="font-serif text-lg font-bold text-[#3B202B]">
                    Assign Guest to Seat {seatPickerModal.seatNumber}
                  </h3>
                </div>
                <p className="text-xs text-[#8B6A74] mt-0.5">
                  {seatPickerModal.table.tableNumber} · {seatPickerModal.table.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSeatPickerModal(prev => ({ ...prev, isOpen: false }))}
                className="p-1.5 text-[#8B6A74] hover:text-[#3B202B] rounded-xl hover:bg-white/70 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switcher Tabs: Select Existing vs + Add New */}
            <div className="flex border-b border-[#F8C9D2]/60 bg-[#FFF9F6] p-1.5 gap-1.5">
              <button
                type="button"
                onClick={() => setSeatPickerModal(prev => ({ ...prev, mode: 'existing' }))}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  seatPickerModal.mode === 'existing'
                    ? 'bg-white text-[#3B202B] shadow-xs border border-[#F8C9D2]'
                    : 'text-[#8B6A74] hover:text-[#3B202B] hover:bg-white/50'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5 text-[#EFA3B3]" />
                <span>Select Unseated Guest</span>
              </button>
              <button
                type="button"
                onClick={() => setSeatPickerModal(prev => ({ ...prev, mode: 'new' }))}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  seatPickerModal.mode === 'new'
                    ? 'bg-white text-[#3B202B] shadow-xs border border-[#F8C9D2]'
                    : 'text-[#8B6A74] hover:text-[#3B202B] hover:bg-white/50'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-[#EFA3B3]" />
                <span>+ Add New Guest</span>
              </button>
            </div>

            {seatPickerModal.mode === 'existing' ? (
              <>
                {/* Search & RSVP Filters */}
                <div className="p-3 border-b border-[#F8C9D2]/50 bg-[#FFF9F6] space-y-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B6A74]" />
                    <input
                      type="text"
                      placeholder="Search by name, group, or dietary..."
                      value={seatPickerModal.search}
                      onChange={(e) => setSeatPickerModal(prev => ({ ...prev, search: e.target.value }))}
                      className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-[#F8C9D2] text-xs text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                      autoFocus
                    />
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5">
                    {(['All', 'Attending', 'Unresponded'] as const).map((filter) => {
                      const count = guests.filter(g => !g.tableId && (filter === 'All' ? true : g.rsvp === filter)).length;
                      return (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setSeatPickerModal(prev => ({ ...prev, filterRsvp: filter }))}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            seatPickerModal.filterRsvp === filter
                              ? 'bg-[#EFA3B3] text-[#3B202B] shadow-xs'
                              : 'bg-white text-[#8B6A74] border border-[#F8C9D2] hover:bg-[#FDECEF]'
                          }`}
                        >
                          {filter} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* List of unseated guests */}
                <div className="p-4 max-h-64 overflow-y-auto space-y-2">
                  {guests
                    .filter(g => !g.tableId)
                    .filter(g => {
                      if (seatPickerModal.filterRsvp !== 'All' && g.rsvp !== seatPickerModal.filterRsvp) {
                        return false;
                      }
                      if (!seatPickerModal.search.trim()) return true;
                      const q = seatPickerModal.search.toLowerCase();
                      return g.name.toLowerCase().includes(q) || g.group.toLowerCase().includes(q) || g.dietary.toLowerCase().includes(q);
                    })
                    .map(guest => (
                      <div
                        key={guest.id}
                        onClick={() => handleSelectGuestForSeat(guest.id)}
                        className="p-3 rounded-2xl bg-[#FFF9F6] border border-[#F8C9D2] hover:bg-[#FDECEF] hover:border-[#EFA3B3] hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white border border-[#F8C9D2] flex items-center justify-center font-serif text-xs font-bold text-[#3B202B] shadow-xs shrink-0">
                            {guest.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#3B202B] group-hover:text-[#3B202B]">
                              {guest.name}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              <span className="text-[10px] text-[#8B6A74] px-1.5 py-0.2 rounded bg-white border border-[#F8C9D2]">
                                {guest.group}
                              </span>
                              {guest.dietary !== 'None' && (
                                <span className="text-[10px] text-[#3B202B] px-1.5 py-0.2 rounded bg-white border border-[#E8CFA8] flex items-center gap-1">
                                  <Utensils className="w-2.5 h-2.5 text-[#E8CFA8]" />
                                  <span>{guest.dietary}</span>
                                </span>
                              )}
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                                guest.rsvp === 'Attending'
                                  ? 'bg-[#B7CBB8]/30 text-[#1E3620] border border-[#B7CBB8]'
                                  : 'bg-[#E8CFA8]/30 text-[#5F461E] border border-[#E8CFA8]'
                              }`}>
                                {guest.rsvp}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectGuestForSeat(guest.id);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-[#EFA3B3] group-hover:bg-[#F8C9D2] text-[#3B202B] text-xs font-bold shadow-xs transition-colors shrink-0 cursor-pointer"
                        >
                          Seat Here
                        </button>
                      </div>
                    ))}

                  {guests.filter(g => !g.tableId && (seatPickerModal.filterRsvp === 'All' || g.rsvp === seatPickerModal.filterRsvp)).length === 0 && (
                    <div className="py-8 text-center text-xs text-[#8B6A74] space-y-2">
                      <p className="font-serif text-sm font-bold text-[#3B202B]">No unseated guests matching this filter</p>
                      <button
                        type="button"
                        onClick={() => setSeatPickerModal(prev => ({ ...prev, mode: 'new' }))}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EFA3B3] text-[#3B202B] text-xs font-bold shadow-xs hover:bg-[#F8C9D2] transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>+ Add & Seat New Guest Now</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Add New Guest Form */
              <form onSubmit={handleQuickCreateAndSeat} className="p-5 space-y-3.5 bg-[#FFF9F6]">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1">
                    Guest Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newGuestName}
                    onChange={(e) => setNewGuestName(e.target.value)}
                    placeholder="e.g. William Darcy"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#F8C9D2] text-xs text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                    autoFocus
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1">
                      Group / Category
                    </label>
                    <select
                      value={newGuestGroup}
                      onChange={(e) => setNewGuestGroup(e.target.value as GuestGroup)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#F8C9D2] text-xs text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                    >
                      <option value="Family">Family</option>
                      <option value="Bridal Party">Bridal Party</option>
                      <option value="VIP">VIP</option>
                      <option value="Coworkers">Coworkers</option>
                      <option value="College Friends">College Friends</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1">
                      Dietary Requirement
                    </label>
                    <select
                      value={newGuestDietary}
                      onChange={(e) => setNewGuestDietary(e.target.value as DietaryRestriction)}
                      className="w-full px-3 py-2 rounded-xl bg-white border border-[#F8C9D2] text-xs text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                    >
                      <option value="None">None</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                      <option value="Halal">Halal</option>
                      <option value="Kosher">Kosher</option>
                      <option value="Nut Allergy">Nut Allergy</option>
                      <option value="Dairy-Free">Dairy-Free</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSeatPickerModal(prev => ({ ...prev, mode: 'existing' }))}
                    className="px-3.5 py-2 rounded-xl border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] hover:bg-white cursor-pointer"
                  >
                    Back to List
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#EFA3B3] hover:bg-[#F8C9D2] text-[#3B202B] text-xs font-bold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Create & Assign to Seat {seatPickerModal.seatNumber}</span>
                  </button>
                </div>
              </form>
            )}

            <div className="p-3.5 bg-[#FDECEF] border-t border-[#F8C9D2] text-right">
              <button
                type="button"
                onClick={() => setSeatPickerModal(prev => ({ ...prev, isOpen: false }))}
                className="px-4 py-1.5 rounded-xl border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] hover:bg-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Seated Guest Details / Unseat Modal (Triggered by clicking any occupied seat badge) */}
      {seatedGuestModal.isOpen && seatedGuestModal.guest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-[#F8C9D2] shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B6A74]">Seated Guest Info</span>
              <button
                onClick={() => setSeatedGuestModal(prev => ({ ...prev, isOpen: false }))}
                className="p-1 text-[#8B6A74] hover:text-[#3B202B] rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#3B202B] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                {seatedGuestModal.guest.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#3B202B]">{seatedGuestModal.guest.name}</h4>
                <div className="text-xs text-[#8B6A74]">
                  {seatedGuestModal.table?.tableNumber} · Seat {seatedGuestModal.guest.seatNumber || 'Assigned'}
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-[#8B6A74]">Group:</span>
                <strong className="text-[#3B202B]">{seatedGuestModal.guest.group}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B6A74]">Dietary:</span>
                <strong className="text-[#3B202B]">{seatedGuestModal.guest.dietary}</strong>
              </div>
              {seatedGuestModal.guest.notes && (
                <div className="flex justify-between">
                  <span className="text-[#8B6A74]">Notes:</span>
                  <span className="text-[#3B202B] italic">{seatedGuestModal.guest.notes}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleUnseatCurrentGuest}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#D97986] hover:bg-[#b04d5b] text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Unseat Guest</span>
              </button>
              <button
                type="button"
                onClick={() => setSeatedGuestModal(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 py-2.5 px-3 rounded-xl border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] hover:bg-[#FDECEF] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Config Modal for adding table with seat count */}
      {isConfigModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_20px_50px_rgba(59,32,43,0.15)] overflow-hidden">
            <div className="px-6 py-4 bg-[#FDECEF] border-b border-[#F8C9D2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Armchair className="w-4 h-4 text-[#EFA3B3]" />
                <h3 className="font-serif text-lg font-bold text-[#3B202B]">
                  Configure {pendingShape === 'round' ? 'Round Table' : pendingShape === 'rectangular' ? 'Rectangular Table' : 'Head Table'}
                </h3>
              </div>
              <button
                onClick={() => setIsConfigModalOpen(false)}
                className="p-1 text-[#8B6A74] hover:text-[#3B202B] rounded-lg hover:bg-white/60 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmAddTable} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                  Table Name / Pavilion
                </label>
                <input
                  type="text"
                  required
                  value={pendingName}
                  onChange={(e) => setPendingName(e.target.value)}
                  placeholder="e.g. Rose Pavilion, Crystal Terrace"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                  Seat Capacity (Seats: {pendingSeats})
                </label>
                <div className="flex items-center gap-2">
                  {[4, 6, 8, 10, 12].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setPendingSeats(count)}
                      className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                        pendingSeats === count
                          ? 'bg-[#EFA3B3] text-[#3B202B] border-[#EFA3B3] shadow-sm'
                          : 'bg-[#FFF9F6] text-[#8B6A74] border-[#F8C9D2] hover:bg-[#FDECEF]'
                      }`}
                    >
                      {count} Seats
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsConfigModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#F8C9D2] text-sm font-medium text-[#8B6A74] hover:bg-[#FDECEF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#EFA3B3] text-[#3B202B] font-medium text-sm hover:bg-[#F8C9D2] transition-colors shadow-sm"
                >
                  Place onto Canvas
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white rounded-2xl border border-[#F8C9D2] shadow-2xl p-6 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FDECEF] border border-[#F8C9D2] flex items-center justify-center text-[#D97986] mx-auto shadow-xs">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h4 className="font-serif text-lg font-bold text-[#3B202B]">{deleteConfirm.title}</h4>
              <p className="text-xs text-[#8B6A74] leading-relaxed">{deleteConfirm.message}</p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirm(prev => ({ ...prev, isOpen: false }))}
                className="flex-1 py-2 px-4 rounded-xl border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] hover:bg-[#FDECEF] transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="flex-1 py-2 px-4 rounded-xl bg-[#D97986] hover:bg-[#b04d5b] text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
