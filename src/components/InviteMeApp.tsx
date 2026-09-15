import React, { useState } from 'react';
import { initialGuests, initialTables, initialDecor } from './inviteme/mockData';
import { WeddingGuest, TableItem, FloorDecorItem } from './inviteme/types';
import { GuestListTracker } from './inviteme/GuestListTracker';
import { FloorPlanBuilder } from './inviteme/FloorPlanBuilder';
import { SeatAssignmentView } from './inviteme/SeatAssignmentView';
import { ExportShareModal } from './inviteme/ExportShareModal';
import { 
  Heart, 
  Users, 
  LayoutGrid, 
  Armchair, 
  FileDown, 
  Sparkles, 
  RotateCcw, 
  Share2,
  CheckCircle2,
  Calendar,
  MapPin
} from 'lucide-react';

export type ActiveTab = 'guests' | 'floorplan' | 'seating';

export const InviteMeApp: React.FC = () => {
  const [guests, setGuests] = useState<WeddingGuest[]>(initialGuests);
  const [tables, setTables] = useState<TableItem[]>(initialTables);
  const [decor, setDecor] = useState<FloorDecorItem[]>(initialDecor);

  const [activeTab, setActiveTab] = useState<ActiveTab>('guests');
  const [selectedTableId, setSelectedTableId] = useState<string | null>('tbl-1');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Guest actions
  const handleUpdateGuest = (updated: WeddingGuest) => {
    setGuests(prev => prev.map(g => g.id === updated.id ? updated : g));
  };

  const handleAddGuest = (newGuestData: Omit<WeddingGuest, 'id'>) => {
    const newGuest: WeddingGuest = {
      ...newGuestData,
      id: `guest-${Date.now()}`
    };
    setGuests(prev => [newGuest, ...prev]);
  };

  const handleDeleteGuest = (id: string) => {
    setGuests(prev => prev.filter(g => g.id !== id));
  };

  // Table actions
  const handleAddTable = (newTableData: Omit<TableItem, 'id'>) => {
    const newTable: TableItem = {
      ...newTableData,
      id: `tbl-${Date.now()}`
    };
    setTables(prev => [...prev, newTable]);
    setSelectedTableId(newTable.id);
  };

  const handleUpdateTable = (updated: TableItem) => {
    setTables(prev => prev.map(t => t.id === updated.id ? updated : t));
  };

  const handleDeleteTable = (id: string) => {
    // Also unseat guests assigned to this table
    setGuests(prev => prev.map(g => g.tableId === id ? { ...g, tableId: null, seatNumber: null } : g));
    setTables(prev => {
      const remaining = prev.filter(t => t.id !== id);
      return remaining;
    });
    setSelectedTableId(prev => {
      if (prev === id) {
        const remaining = tables.filter(t => t.id !== id);
        return remaining[0]?.id || null;
      }
      return prev;
    });
  };

  // Floor Decor actions
  const handleAddDecor = (newDecorData: Omit<FloorDecorItem, 'id'>) => {
    const newDecor: FloorDecorItem = {
      ...newDecorData,
      id: `decor-${Date.now()}`
    };
    setDecor(prev => [...prev, newDecor]);
  };

  const handleDeleteDecor = (id: string) => {
    setDecor(prev => prev.filter(d => d.id !== id));
  };

  // Seating assignments
  const handleAssignGuest = (guestId: string, tableId: string, seatNumber?: number) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        return {
          ...g,
          tableId,
          seatNumber: seatNumber || null
        };
      }
      return g;
    }));
  };

  const handleUnassignGuest = (guestId: string) => {
    setGuests(prev => prev.map(g => {
      if (g.id === guestId) {
        return {
          ...g,
          tableId: null,
          seatNumber: null
        };
      }
      return g;
    }));
  };

  // Navigation helpers
  const handleNavigateToSeating = (tableId?: string) => {
    if (tableId) setSelectedTableId(tableId);
    setActiveTab('seating');
  };

  const handleResetData = () => {
    setGuests(initialGuests);
    setTables(initialTables);
    setDecor(initialDecor);
    setSelectedTableId('tbl-1');
  };

  // Metrics
  const attendingGuests = guests.filter(g => g.rsvp === 'Attending');
  const seatedGuests = guests.filter(g => g.tableId !== null);
  const totalCapacity = tables.reduce((acc, t) => acc + t.capacity, 0);

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#3B202B] flex flex-col selection:bg-[#F8C9D2] selection:text-[#3B202B]">
      {/* Luxury Wedding Header Bar */}
      <header className="no-print sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#F8C9D2]/70 shadow-[0_2px_15px_rgba(239,163,181,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Editorial Title */}
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#EFA3B3] to-[#F8C9D2] flex items-center justify-center text-white shadow-sm ring-2 ring-[#FFF9F6]">
                <Heart className="w-6 h-6 fill-white stroke-none" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl font-bold tracking-tight text-[#3B202B]">
                    InviteMe
                  </h1>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#FDECEF] text-[#8B6A74] border border-[#F8C9D2]">
                    Seating Suite
                  </span>
                </div>
                <p className="text-xs text-[#8B6A74] font-medium hidden sm:flex items-center gap-2">
                  <span>Eleanor & Julian’s Wedding</span>
                  <span className="text-[#F8C9D2]">·</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-[#EFA3B3]" /> October 24, 2026</span>
                  <span className="text-[#F8C9D2]">·</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-[#EFA3B3]" /> Rosewood Estate</span>
                </p>
              </div>
            </div>

            {/* Quick Metrics & Global CTAs */}
            <div className="flex items-center gap-2.5 sm:gap-4">
              {/* Seating Progress Pill */}
              <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-2xl bg-[#FFF9F6] border border-[#F8C9D2]">
                <div className="text-right">
                  <div className="text-[10px] uppercase font-semibold text-[#8B6A74] tracking-wider">
                    Reception Seating
                  </div>
                  <div className="text-xs font-bold text-[#3B202B]">
                    {seatedGuests.length} / {attendingGuests.length} Attending Seated
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#B7CBB8]/30 border border-[#B7CBB8] flex items-center justify-center text-xs font-bold text-[#1E3620]">
                  {attendingGuests.length > 0
                    ? `${Math.round((seatedGuests.length / attendingGuests.length) * 100)}%`
                    : '0%'}
                </div>
              </div>

              {/* Reset Data Button */}
              <button
                onClick={handleResetData}
                className="p-2 rounded-xl text-[#8B6A74] hover:text-[#3B202B] hover:bg-[#FDECEF] transition-colors border border-transparent hover:border-[#F8C9D2]"
                title="Reset to default mock data"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Requirement: View 4 Export & Share modal trigger */}
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#EFA3B3] hover:bg-[#F8C9D2] active:scale-[0.98] text-[#3B202B] font-semibold text-xs shadow-sm transition-all duration-200"
              >
                <FileDown className="w-4 h-4 text-[#3B202B]" />
                <span className="hidden sm:inline">Export Seating Chart</span>
                <span className="sm:hidden">Export</span>
              </button>
            </div>
          </div>

          {/* Tabbed Navigation Bar (4 Core Views) */}
          <div className="flex items-center gap-1 sm:gap-2 -mb-px overflow-x-auto border-t border-[#F8C9D2]/40 pt-1 pb-2">
            {/* View 1: Guest List & RSVP Tracker */}
            <button
              onClick={() => setActiveTab('guests')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'guests'
                  ? 'bg-[#EFA3B3] text-[#3B202B] shadow-sm'
                  : 'text-[#8B6A74] hover:text-[#3B202B] hover:bg-[#FDECEF]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>1. Guest List & RSVP Tracker</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 text-[#3B202B]">
                {guests.length}
              </span>
            </button>

            {/* View 2: Floor Plan Builder */}
            <button
              onClick={() => setActiveTab('floorplan')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'floorplan'
                  ? 'bg-[#EFA3B3] text-[#3B202B] shadow-sm'
                  : 'text-[#8B6A74] hover:text-[#3B202B] hover:bg-[#FDECEF]'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>2. Floor Plan Builder</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 text-[#3B202B]">
                {tables.length} Tables
              </span>
            </button>

            {/* View 3: Seat Assignment View */}
            <button
              onClick={() => setActiveTab('seating')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap ${
                activeTab === 'seating'
                  ? 'bg-[#EFA3B3] text-[#3B202B] shadow-sm'
                  : 'text-[#8B6A74] hover:text-[#3B202B] hover:bg-[#FDECEF]'
              }`}
            >
              <Armchair className="w-4 h-4" />
              <span>3. Seat Assignment View</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/70 text-[#3B202B]">
                {seatedGuests.length}/{attendingGuests.length}
              </span>
            </button>

            {/* View 4: Export & Share Modal trigger in tab bar */}
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#8B6A74] hover:text-[#3B202B] hover:bg-[#FDECEF] transition-all duration-150 whitespace-nowrap"
            >
              <Share2 className="w-4 h-4" />
              <span>4. Export & Share Modal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {activeTab === 'guests' && (
          <GuestListTracker
            guests={guests}
            tables={tables}
            onUpdateGuest={handleUpdateGuest}
            onAddGuest={handleAddGuest}
            onDeleteGuest={handleDeleteGuest}
            onNavigateToSeating={handleNavigateToSeating}
          />
        )}

        {activeTab === 'floorplan' && (
          <FloorPlanBuilder
            tables={tables}
            decor={decor}
            guests={guests}
            onAddTable={handleAddTable}
            onUpdateTable={handleUpdateTable}
            onDeleteTable={handleDeleteTable}
            onAddDecor={handleAddDecor}
            onDeleteDecor={handleDeleteDecor}
            onSelectTableForAssignment={handleNavigateToSeating}
            onAssignGuest={handleAssignGuest}
            onUnassignGuest={handleUnassignGuest}
            onAddGuest={handleAddGuest}
          />
        )}

        {activeTab === 'seating' && (
          <SeatAssignmentView
            tables={tables}
            guests={guests}
            selectedTableId={selectedTableId}
            onSelectTable={setSelectedTableId}
            onAssignGuest={handleAssignGuest}
            onUnassignGuest={handleUnassignGuest}
          />
        )}
      </main>

      {/* View 4: Export & Share Modal */}
      <ExportShareModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        tables={tables}
        guests={guests}
        weddingName="Eleanor & Julian’s Wedding Celebration"
      />

      {/* Elegant Footer */}
      <footer className="no-print mt-auto border-t border-[#F8C9D2]/50 bg-white/50 py-6 text-center text-xs text-[#8B6A74]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 font-serif font-semibold text-[#3B202B]">
            <Heart className="w-3.5 h-3.5 text-[#EFA3B3] fill-[#EFA3B3]" />
            <span>InviteMe — Modern Wedding Guest & Seating Intelligence</span>
          </div>
          <div>
            Romantic, Elegant, Warm & Modern Design System · Playfair Display & Inter
          </div>
        </div>
      </footer>
    </div>
  );
};
export default InviteMeApp;
