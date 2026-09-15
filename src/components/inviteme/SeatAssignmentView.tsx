import React, { useState, useMemo } from 'react';
import { TableItem, WeddingGuest, RSVPStatus, DietaryRestriction } from './types';
import { 
  Users, 
  Armchair, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  ArrowRight, 
  UserCheck, 
  Utensils, 
  X,
  Crown,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SeatAssignmentViewProps {
  tables: TableItem[];
  guests: WeddingGuest[];
  selectedTableId: string | null;
  onSelectTable: (id: string) => void;
  onAssignGuest: (guestId: string, tableId: string, seatNumber?: number) => void;
  onUnassignGuest: (guestId: string) => void;
}

export const SeatAssignmentView: React.FC<SeatAssignmentViewProps> = ({
  tables,
  guests,
  selectedTableId,
  onSelectTable,
  onAssignGuest,
  onUnassignGuest
}) => {
  const [activeGuestToAssign, setActiveGuestToAssign] = useState<WeddingGuest | null>(null);
  const [searchUnseated, setSearchUnseated] = useState('');
  const [successToast, setSuccessToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ''
  });

  // Current active table
  const activeTable = useMemo(() => {
    return tables.find(t => t.id === selectedTableId) || tables[0] || null;
  }, [tables, selectedTableId]);

  // Requirement: Left/Sidebar: List of "Attending" guests who are not yet seated
  const unseatedAttendingGuests = useMemo(() => {
    return guests.filter(g => {
      const isAttending = g.rsvp === 'Attending';
      const isUnseated = !g.tableId;
      if (!isAttending || !isUnseated) return false;

      if (searchUnseated.trim()) {
        const q = searchUnseated.toLowerCase();
        return (
          g.name.toLowerCase().includes(q) ||
          g.group.toLowerCase().includes(q) ||
          g.dietary.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [guests, searchUnseated]);

  // Seated guests at active table
  const tableSeatedGuests = useMemo(() => {
    if (!activeTable) return [];
    return guests.filter(g => g.tableId === activeTable.id);
  }, [guests, activeTable]);

  // Map seat numbers 1..capacity
  const seatSlots = useMemo(() => {
    if (!activeTable) return [];
    const slots: (WeddingGuest | null)[] = Array(activeTable.capacity).fill(null);

    tableSeatedGuests.forEach((guest) => {
      if (guest.seatNumber && guest.seatNumber <= activeTable.capacity) {
        slots[guest.seatNumber - 1] = guest;
      } else {
        // Find first open slot
        const emptyIdx = slots.findIndex(s => s === null);
        if (emptyIdx !== -1) {
          slots[emptyIdx] = guest;
        }
      }
    });

    return slots;
  }, [activeTable, tableSeatedGuests]);

  const triggerCelebration = (guestName: string, tableName: string, seatNum: number) => {
    // Elegant soft confetti
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#EFA3B3', '#F8C9D2', '#B7CBB8', '#E8CFA8']
      });
    } catch {
      // safe fallback
    }

    setSuccessToast({
      show: true,
      message: `✨ ${guestName} successfully seated at ${tableName} (Seat ${seatNum})!`
    });

    setTimeout(() => {
      setSuccessToast({ show: false, message: '' });
    }, 3500);
  };

  const handleAssignSlot = (seatIndex: number) => {
    if (!activeTable) return;
    const seatNumber = seatIndex + 1;

    if (activeGuestToAssign) {
      onAssignGuest(activeGuestToAssign.id, activeTable.id, seatNumber);
      triggerCelebration(activeGuestToAssign.name, activeTable.tableNumber, seatNumber);
      setActiveGuestToAssign(null);
    }
  };

  const handleQuickAssignFirstSlot = (guest: WeddingGuest) => {
    if (!activeTable) return;

    // Find first empty seat
    const firstEmptyIndex = seatSlots.findIndex(s => s === null);
    if (firstEmptyIndex === -1) {
      alert(`This table is full (${activeTable.capacity}/${activeTable.capacity} seats). Please select another table or unassign a guest.`);
      return;
    }

    const seatNumber = firstEmptyIndex + 1;
    onAssignGuest(guest.id, activeTable.id, seatNumber);
    triggerCelebration(guest.name, activeTable.tableNumber, seatNumber);
    if (activeGuestToAssign?.id === guest.id) {
      setActiveGuestToAssign(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#F8C9D2]/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDECEF] border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] mb-2">
            <UserCheck className="w-3.5 h-3.5 text-[#EFA3B3]" />
            <span>Interactive Placement</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#3B202B]">
            Seat Assignment View
          </h2>
          <p className="text-sm text-[#8B6A74] mt-1 font-sans">
            Assign confirmed attending guests into individual seats on each reception table.
          </p>
        </div>

        {/* Success toast banner */}
        {successToast.show && (
          <div className="animate-fade-in flex items-center gap-2.5 px-4 py-2.5 bg-[#B7CBB8] text-[#1E3620] rounded-xl shadow-md border border-[#29422B]/20 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-[#1E3620]" />
            <span>{successToast.message}</span>
          </div>
        )}
      </div>

      {/* Split-Screen Layout (Left: Unseated Attending Guests, Right: Selected Table) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Sidebar: List of Attending guests who are not yet seated */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_4px_24px_rgba(239,163,181,0.06)] overflow-hidden flex flex-col h-[680px]">
          {/* Header */}
          <div className="p-4 bg-[#FDECEF] border-b border-[#F8C9D2]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-base font-bold text-[#3B202B] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#EFA3B3]" />
                <span>Unseated Guests</span>
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#B7CBB8] text-[#1E3620]">
                {unseatedAttendingGuests.length} Attending
              </span>
            </div>
            <p className="text-xs text-[#8B6A74] mb-3">
              Click a guest below to select, then click any empty seat slot on the right to place them.
            </p>

            {/* Search filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B6A74]" />
              <input
                type="text"
                placeholder="Search unseated guest..."
                value={searchUnseated}
                onChange={(e) => setSearchUnseated(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-[#F8C9D2] text-xs text-[#3B202B] placeholder:text-[#8B6A74]/60 focus:outline-none focus:ring-1 focus:ring-[#EFA3B3]"
              />
            </div>
          </div>

          {/* Guest Cards Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {unseatedAttendingGuests.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8B6A74]">
                <CheckCircle2 className="w-10 h-10 text-[#B7CBB8] mb-2" />
                <p className="font-serif text-base font-bold text-[#3B202B]">
                  All Attending Guests Seated!
                </p>
                <p className="text-xs text-[#8B6A74] mt-1 max-w-[200px]">
                  Every confirmed guest has been successfully assigned to a reception table.
                </p>
              </div>
            ) : (
              unseatedAttendingGuests.map((guest) => {
                const isSelected = activeGuestToAssign?.id === guest.id;

                return (
                  <div
                    key={guest.id}
                    onClick={() => setActiveGuestToAssign(isSelected ? null : guest)}
                    className={`p-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FDECEF] border-[#EFA3B3] ring-2 ring-[#EFA3B3] shadow-sm'
                        : 'bg-[#FFF9F6] border-[#F8C9D2]/70 hover:border-[#EFA3B3] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-white border border-[#F8C9D2] flex items-center justify-center font-serif text-xs font-bold text-[#3B202B] shadow-xs">
                          {guest.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')
                            .slice(0, 2)}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#3B202B]">{guest.name}</div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-[#8B6A74] px-1.5 py-0.2 rounded bg-white border border-[#F8C9D2]">
                              {guest.group}
                            </span>
                            {guest.dietary !== 'None' && (
                              <span className="text-[10px] text-[#3B202B] px-1.5 py-0.2 rounded bg-[#FDECEF] border border-[#E8CFA8] flex items-center gap-1">
                                <Utensils className="w-2.5 h-2.5 text-[#E8CFA8]" />
                                <span>{guest.dietary}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick Assign Action */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleQuickAssignFirstSlot(guest);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-[#EFA3B3] hover:bg-[#F8C9D2] text-[#3B202B] text-[11px] font-semibold transition-colors shrink-0 shadow-xs flex items-center gap-1"
                        title="Auto-assign into first open seat"
                      >
                        <span>Seat</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Active selection banner if a guest is selected */}
          {activeGuestToAssign && (
            <div className="p-3 bg-[#EFA3B3]/20 border-t border-[#EFA3B3] flex items-center justify-between">
              <div className="text-xs">
                <span className="text-[#8B6A74]">Ready to seat: </span>
                <strong className="text-[#3B202B]">{activeGuestToAssign.name}</strong>
              </div>
              <button
                onClick={() => setActiveGuestToAssign(null)}
                className="text-xs text-[#8B6A74] hover:text-[#3B202B]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Right / Main: Visual representation of a selected table with empty seat slots */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_4px_30px_rgba(239,163,181,0.10)] overflow-hidden flex flex-col h-[680px]">
          {/* Table Selector Top Bar */}
          <div className="p-4 bg-[#FDECEF] border-b border-[#F8C9D2] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Armchair className="w-4 h-4 text-[#EFA3B3]" />
              <span className="font-serif text-base font-bold text-[#3B202B]">
                Active Table Seating Layout
              </span>
            </div>

            {/* Table switcher tabs */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {tables.map((tbl) => {
                const isSelected = activeTable?.id === tbl.id;
                const seatedCount = guests.filter(g => g.tableId === tbl.id).length;

                return (
                  <button
                    key={tbl.id}
                    onClick={() => onSelectTable(tbl.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-white text-[#3B202B] border border-[#EFA3B3] shadow-xs'
                        : 'bg-[#FFF9F6] text-[#8B6A74] border border-[#F8C9D2] hover:bg-white'
                    }`}
                  >
                    <span>{tbl.tableNumber}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#FDECEF] text-[#8B6A74]">
                      {seatedCount}/{tbl.capacity}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Table Details */}
          {activeTable && (
            <div className="px-6 py-3 bg-[#FFF9F6] border-b border-[#F8C9D2] flex items-center justify-between text-xs">
              <div>
                <span className="font-serif text-sm font-bold text-[#3B202B]">{activeTable.tableNumber}: </span>
                <span className="text-[#8B6A74]">{activeTable.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#8B6A74]">Capacity:</span>
                <span className="font-bold text-[#3B202B]">
                  {tableSeatedGuests.length} / {activeTable.capacity} Seats Filled
                </span>
              </div>
            </div>
          )}

          {/* Visual Interactive Table Canvas */}
          <div className="flex-1 bg-[#FFF9F6] relative overflow-hidden flex items-center justify-center p-6 select-none">
            {/* Background grid watermark */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage: 'radial-gradient(#F8C9D2 0.85px, transparent 0.85px)',
                backgroundSize: '24px 24px'
              }}
            />

            {!activeTable ? (
              <div className="text-center text-[#8B6A74]">
                <p className="font-serif text-base text-[#3B202B]">No table selected</p>
                <p className="text-xs text-[#8B6A74] mt-1">Select a table above to view seat arrangement.</p>
              </div>
            ) : activeTable.shape === 'round' ? (
              /* Round Table Layout */
              <div className="relative w-[440px] h-[440px] flex items-center justify-center">
                {/* Center Table Circle (Matching Photo Rose/Pink Table) */}
                <div className="w-52 h-52 rounded-full bg-[#F8A8B8] border-3 border-[#3B202B] shadow-xl flex flex-col items-center justify-center p-4 text-center z-10">
                  <div className="font-serif text-lg font-bold text-[#3B202B] leading-tight">
                    {activeTable.tableNumber}
                  </div>
                  <div className="text-xs text-[#3B202B]/80 font-medium truncate max-w-[140px] mt-0.5">
                    {activeTable.name}
                  </div>
                  <div className="text-sm font-extrabold text-[#3B202B] mt-1.5 leading-none">
                    {tableSeatedGuests.length}/{activeTable.capacity}
                  </div>
                  <div className="text-[11px] text-[#3B202B]/90 font-semibold mt-0.5 leading-none">
                    Seats filled
                  </div>
                </div>

                {/* Seat Slots positioned circularly around table */}
                {seatSlots.map((seatedGuest, idx) => {
                  const angle = (idx / activeTable.capacity) * (2 * Math.PI) - Math.PI / 2;
                  const radius = 168; // distance from center
                  const x = 220 + radius * Math.cos(angle) - 48;
                  const y = 220 + radius * Math.sin(angle) - 48;
                  const seatNumber = idx + 1;

                  return (
                    <div
                      key={idx}
                      style={{ left: `${x}px`, top: `${y}px` }}
                      onClick={() => !seatedGuest && handleAssignSlot(idx)}
                      className={`absolute w-24 h-24 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 z-20 ${
                        seatedGuest
                          ? 'bg-white border-2 border-[#3B202B] shadow-md hover:shadow-lg'
                          : activeGuestToAssign
                          ? 'bg-white border-2 border-dashed border-[#EFA3B3] hover:bg-[#FDECEF] hover:scale-105 cursor-pointer shadow-sm animate-pulse'
                          : 'bg-white border-2 border-dashed border-[#3B202B]/60 hover:bg-[#FDECEF] hover:border-[#EFA3B3] cursor-pointer'
                      }`}
                    >
                      {seatedGuest ? (
                        <>
                          <div className="w-8 h-8 rounded-full bg-[#3B202B] text-white text-xs font-bold flex items-center justify-center mb-1 shadow-xs border border-[#3B202B]">
                            {seatedGuest.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>
                          <div className="text-[11px] font-bold text-[#3B202B] truncate w-full">
                            {seatedGuest.name}
                          </div>
                          <div className="text-[9px] text-[#8B6A74] truncate">
                            Seat {seatNumber} · {seatedGuest.group}
                          </div>

                          {/* Quick Unassign button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onUnassignGuest(seatedGuest.id);
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D97986] text-white rounded-full flex items-center justify-center text-[10px] hover:bg-[#b04d5b] transition-colors shadow-xs cursor-pointer"
                            title="Unseat guest"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="w-8 h-8 rounded-full bg-white text-[#3B202B] border-2 border-[#3B202B]/80 flex items-center justify-center mb-1 shadow-xs">
                            <UserPlus className="w-4 h-4 text-[#3B202B]" />
                          </div>
                          <span className="text-[10px] font-bold text-[#3B202B]">
                            Seat {seatNumber}
                          </span>
                          <span className="text-[9px] text-[#8B6A74]">
                            {activeGuestToAssign ? 'Click to Seat' : 'Empty'}
                          </span>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Rectangular or Head Table Layout */
              <div className="w-full max-w-lg space-y-6">
                {/* Top Seats */}
                <div className="flex items-center justify-around gap-2">
                  {seatSlots.slice(0, Math.ceil(activeTable.capacity / 2)).map((seatedGuest, idx) => {
                    const seatNumber = idx + 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => !seatedGuest && handleAssignSlot(idx)}
                        className={`w-28 h-20 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 relative ${
                          seatedGuest
                            ? 'bg-white border-2 border-[#3B202B] shadow-md'
                            : activeGuestToAssign
                            ? 'bg-white border-2 border-dashed border-[#EFA3B3] hover:bg-[#FDECEF] cursor-pointer shadow-sm animate-pulse'
                            : 'bg-white border-2 border-dashed border-[#3B202B]/60 hover:bg-[#FDECEF] hover:border-[#EFA3B3] cursor-pointer'
                        }`}
                      >
                        {seatedGuest ? (
                          <>
                            <div className="w-7 h-7 rounded-full bg-[#3B202B] text-white text-xs font-bold flex items-center justify-center mb-0.5 shadow-xs border border-[#3B202B]">
                              {seatedGuest.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="text-[11px] font-bold text-[#3B202B] truncate w-full">
                              {seatedGuest.name}
                            </div>
                            <div className="text-[9px] text-[#8B6A74]">Seat {seatNumber}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onUnassignGuest(seatedGuest.id);
                              }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D97986] text-white rounded-full flex items-center justify-center text-[10px] hover:bg-[#b04d5b] transition-colors shadow-xs cursor-pointer"
                              title="Unseat guest"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded-full bg-white text-[#3B202B] border border-[#3B202B] flex items-center justify-center mb-0.5 shadow-xs">
                              <UserPlus className="w-3.5 h-3.5 text-[#3B202B]" />
                            </div>
                            <span className="text-[10px] font-bold text-[#3B202B]">
                              Seat {seatNumber}
                            </span>
                            <span className="text-[9px] text-[#8B6A74]">
                              {activeGuestToAssign ? 'Click to Seat' : 'Empty'}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Main Table Surface (Matching Photo Rose/Pink Table) */}
                <div className="h-28 bg-[#F8A8B8] rounded-2xl border-3 border-[#3B202B] shadow-xl flex items-center justify-between px-8">
                  <div>
                    <div className="font-serif text-lg font-bold text-[#3B202B] flex items-center gap-2">
                      {activeTable.shape === 'head' && <Crown className="w-5 h-5 text-[#3B202B]" />}
                      <span>{activeTable.tableNumber}</span>
                    </div>
                    <div className="text-xs text-[#3B202B]/80 font-medium">{activeTable.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-[#3B202B]">
                      {tableSeatedGuests.length} / {activeTable.capacity}
                    </div>
                    <div className="text-xs text-[#3B202B]/85 font-semibold">
                      Seats filled
                    </div>
                  </div>
                </div>

                {/* Bottom Seats */}
                <div className="flex items-center justify-around gap-2">
                  {seatSlots.slice(Math.ceil(activeTable.capacity / 2)).map((seatedGuest, subIdx) => {
                    const idx = Math.ceil(activeTable.capacity / 2) + subIdx;
                    const seatNumber = idx + 1;
                    return (
                      <div
                        key={idx}
                        onClick={() => !seatedGuest && handleAssignSlot(idx)}
                        className={`w-28 h-20 rounded-2xl flex flex-col items-center justify-center p-2 text-center transition-all duration-200 relative ${
                          seatedGuest
                            ? 'bg-white border-2 border-[#3B202B] shadow-md'
                            : activeGuestToAssign
                            ? 'bg-white border-2 border-dashed border-[#EFA3B3] hover:bg-[#FDECEF] cursor-pointer shadow-sm animate-pulse'
                            : 'bg-white border-2 border-dashed border-[#3B202B]/60 hover:bg-[#FDECEF] hover:border-[#EFA3B3] cursor-pointer'
                        }`}
                      >
                        {seatedGuest ? (
                          <>
                            <div className="w-7 h-7 rounded-full bg-[#3B202B] text-white text-xs font-bold flex items-center justify-center mb-0.5 shadow-xs border border-[#3B202B]">
                              {seatedGuest.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                            </div>
                            <div className="text-[11px] font-bold text-[#3B202B] truncate w-full">
                              {seatedGuest.name}
                            </div>
                            <div className="text-[9px] text-[#8B6A74]">Seat {seatNumber}</div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onUnassignGuest(seatedGuest.id);
                              }}
                              className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D97986] text-white rounded-full flex items-center justify-center text-[10px] hover:bg-[#b04d5b] transition-colors shadow-xs cursor-pointer"
                              title="Unseat guest"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="w-6 h-6 rounded-full bg-white text-[#3B202B] border border-[#3B202B] flex items-center justify-center mb-0.5 shadow-xs">
                              <UserPlus className="w-3.5 h-3.5 text-[#3B202B]" />
                            </div>
                            <span className="text-[10px] font-bold text-[#3B202B]">
                              Seat {seatNumber}
                            </span>
                            <span className="text-[9px] text-[#8B6A74]">
                              {activeGuestToAssign ? 'Click to Seat' : 'Empty'}
                            </span>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
