import React, { useState, useMemo } from 'react';
import { WeddingGuest, RSVPStatus, TableItem, GuestGroup, DietaryRestriction } from './types';
import { 
  Search, 
  Plus, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Utensils, 
  Users, 
  Armchair,
  ChevronDown,
  Sparkles,
  Trash2,
  X,
  FileSpreadsheet,
  Upload,
  Download,
  FileText,
  HelpCircle,
  Check,
  AlertCircle
} from 'lucide-react';

interface GuestListTrackerProps {
  guests: WeddingGuest[];
  tables: TableItem[];
  onUpdateGuest: (updated: WeddingGuest) => void;
  onAddGuest: (newGuest: Omit<WeddingGuest, 'id'>) => void;
  onDeleteGuest: (id: string) => void;
  onNavigateToSeating: (tableId?: string) => void;
}

const SAMPLE_CSV_CONTENT = `Name,Group,RSVP,Dietary,Notes
Nguyen Van A,Family,Attending,None,Groom's cousin
Tran Thi B,VIP,Attending,Vegetarian,Honorary guest
Le Van C,Coworkers,Unresponded,Gluten-Free,Marketing team
Pham Van D,Bridal Party,Attending,None,Best man`;

export const GuestListTracker: React.FC<GuestListTrackerProps> = ({
  guests,
  tables,
  onUpdateGuest,
  onAddGuest,
  onDeleteGuest,
  onNavigateToSeating
}) => {
  const [activeFilter, setActiveFilter] = useState<'All' | RSVPStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // CSV Import state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedGuests, setParsedGuests] = useState<Omit<WeddingGuest, 'id'>[]>([]);
  const [importSuccessMsg, setImportSuccessMsg] = useState('');

  // New Guest Form State
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState<GuestGroup>('Family');
  const [newDietary, setNewDietary] = useState<DietaryRestriction>('None');
  const [newRsvp, setNewRsvp] = useState<RSVPStatus>('Attending');
  const [newNotes, setNewNotes] = useState('');

  // Counts for tabs
  const counts = useMemo(() => {
    return {
      All: guests.length,
      Attending: guests.filter(g => g.rsvp === 'Attending').length,
      Unresponded: guests.filter(g => g.rsvp === 'Unresponded').length,
      Declined: guests.filter(g => g.rsvp === 'Declined').length
    };
  }, [guests]);

  // Filtered Guests
  const filteredGuests = useMemo(() => {
    return guests.filter(guest => {
      // RSVP tab filter
      if (activeFilter !== 'All' && guest.rsvp !== activeFilter) {
        return false;
      }
      // Group filter
      if (selectedGroup !== 'All' && guest.group !== selectedGroup) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = guest.name.toLowerCase().includes(q);
        const matchGroup = guest.group.toLowerCase().includes(q);
        const matchDiet = guest.dietary.toLowerCase().includes(q);
        const matchNotes = guest.notes?.toLowerCase().includes(q);
        return matchName || matchGroup || matchDiet || matchNotes;
      }
      return true;
    });
  }, [guests, activeFilter, selectedGroup, searchQuery]);

  const parseCSV = (text: string): Omit<WeddingGuest, 'id'>[] => {
    const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
    if (lines.length <= 1) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
    const nameIdx = headers.findIndex(h => h.includes('name'));
    const groupIdx = headers.findIndex(h => h.includes('group'));
    const rsvpIdx = headers.findIndex(h => h.includes('rsvp'));
    const dietaryIdx = headers.findIndex(h => h.includes('diet'));
    const notesIdx = headers.findIndex(h => h.includes('note'));

    const parsed: Omit<WeddingGuest, 'id'>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const row = lines[i].split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
      const name = nameIdx !== -1 && row[nameIdx] ? row[nameIdx] : `Guest ${i}`;
      if (!name || name.toLowerCase() === 'name') continue;

      const rawGroup = groupIdx !== -1 && row[groupIdx] ? row[groupIdx] : 'Family';
      let group: GuestGroup = 'Family';
      if (['Bridal Party', 'VIP', 'Coworkers', 'College Friends', 'Family'].includes(rawGroup)) {
        group = rawGroup as GuestGroup;
      }

      const rawRsvp = rsvpIdx !== -1 && row[rsvpIdx] ? row[rsvpIdx] : 'Attending';
      let rsvp: RSVPStatus = 'Attending';
      if (['Attending', 'Unresponded', 'Declined'].includes(rawRsvp)) {
        rsvp = rawRsvp as RSVPStatus;
      }

      const rawDietary = dietaryIdx !== -1 && row[dietaryIdx] ? row[dietaryIdx] : 'None';
      let dietary: DietaryRestriction = 'None';
      if (['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher', 'Nut Allergy', 'Dairy-Free'].includes(rawDietary)) {
        dietary = rawDietary as DietaryRestriction;
      }

      const notes = notesIdx !== -1 && row[notesIdx] ? row[notesIdx] : undefined;

      parsed.push({
        name,
        group,
        rsvp,
        dietary,
        tableId: null,
        seatNumber: null,
        notes
      });
    }

    return parsed;
  };

  const handleDownloadTemplate = () => {
    const blob = new Blob([SAMPLE_CSV_CONTENT], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'wedding_guests_template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCsvFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (!text) return;
      const parsed = parseCSV(text);
      setParsedGuests(parsed);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedGuests.length === 0) return;
    parsedGuests.forEach(g => onAddGuest(g));

    setImportSuccessMsg(`Successfully imported ${parsedGuests.length} guests!`);
    setTimeout(() => setImportSuccessMsg(''), 4000);

    setCsvFile(null);
    setParsedGuests([]);
    setIsImportModalOpen(false);
  };

  const handleCreateGuest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    onAddGuest({
      name: newName.trim(),
      group: newGroup,
      dietary: newDietary,
      rsvp: newRsvp,
      tableId: null,
      seatNumber: null,
      notes: newNotes.trim() || undefined
    });

    setNewName('');
    setNewNotes('');
    setIsAddModalOpen(false);
  };

  const getTableInfo = (tableId: string | null) => {
    if (!tableId) return null;
    return tables.find(t => t.id === tableId);
  };

  const getGroupBadgeClass = (group: GuestGroup) => {
    switch (group) {
      case 'Bridal Party':
        return 'bg-[#F8C9D2]/30 text-[#3B202B] border-[#EFA3B3]';
      case 'Family':
        return 'bg-[#FFF9F6] text-[#3B202B] border-[#E8CFA8]';
      case 'VIP':
        return 'bg-[#EFA3B3]/25 text-[#3B202B] border-[#EFA3B3] font-medium';
      case 'Coworkers':
        return 'bg-white text-[#8B6A74] border-[#F8C9D2]';
      default:
        return 'bg-[#FFF9F6] text-[#8B6A74] border-[#F8C9D2]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {importSuccessMsg && (
        <div className="animate-fade-in flex items-center justify-between p-4 bg-[#B7CBB8] text-[#1E3620] rounded-xl shadow-md border border-[#29422B]/20 text-sm font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#1E3620]" />
            <span>{importSuccessMsg}</span>
          </div>
          <button onClick={() => setImportSuccessMsg('')} className="text-[#1E3620] hover:opacity-80">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#F8C9D2]/40">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FDECEF] border border-[#F8C9D2] text-xs font-semibold text-[#8B6A74] mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#EFA3B3]" />
            <span>Guest CRM & RSVP Intelligence</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#3B202B]">
            Guest List & RSVP Tracker
          </h2>
          <p className="text-sm text-[#8B6A74] mt-1 font-sans">
            Track confirmations, dietary requirements, and assigned reception seating in real time.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#F8C9D2] text-[#3B202B] font-medium text-sm shadow-xs hover:bg-[#FDECEF] hover:border-[#EFA3B3] active:scale-[0.98] transition-all duration-200"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#EFA3B3]" />
            <span>Import from CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EFA3B3] text-[#3B202B] font-medium text-sm shadow-sm hover:bg-[#F8C9D2] active:scale-[0.98] transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Guest</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* RSVP Filter Tabs */}
        <div className="inline-flex p-1 bg-[#FDECEF] rounded-2xl border border-[#F8C9D2]/60 overflow-x-auto">
          <button
            onClick={() => setActiveFilter('All')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === 'All'
                ? 'bg-white text-[#3B202B] shadow-sm'
                : 'text-[#8B6A74] hover:text-[#3B202B]'
            }`}
          >
            <span>All Guests</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-[#FFF9F6] text-[#3B202B] border border-[#F8C9D2]">
              {counts.All}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('Attending')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === 'Attending'
                ? 'bg-white text-[#3B202B] shadow-sm'
                : 'text-[#8B6A74] hover:text-[#3B202B]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#B7CBB8]"></span>
            <span>Attending</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#B7CBB8]/30 text-[#29422B] border border-[#B7CBB8]">
              {counts.Attending}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('Unresponded')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === 'Unresponded'
                ? 'bg-white text-[#3B202B] shadow-sm'
                : 'text-[#8B6A74] hover:text-[#3B202B]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#E8CFA8]"></span>
            <span>Unresponded</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#E8CFA8]/40 text-[#5F461E] border border-[#E8CFA8]">
              {counts.Unresponded}
            </span>
          </button>

          <button
            onClick={() => setActiveFilter('Declined')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeFilter === 'Declined'
                ? 'bg-white text-[#3B202B] shadow-sm'
                : 'text-[#8B6A74] hover:text-[#3B202B]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#D97986]"></span>
            <span>Declined</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#D97986]/20 text-[#6B1B25] border border-[#D97986]">
              {counts.Declined}
            </span>
          </button>
        </div>

        {/* Search & Group Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B6A74]" />
            <input
              type="text"
              placeholder="Search guest or dietary..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#F8C9D2] text-sm text-[#3B202B] placeholder:text-[#8B6A74]/60 focus:outline-none focus:ring-2 focus:ring-[#EFA3B3] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8B6A74] hover:text-[#3B202B]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="relative">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-white border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3] transition-all cursor-pointer"
            >
              <option value="All">All Groups</option>
              <option value="Bridal Party">Bridal Party</option>
              <option value="Family">Family</option>
              <option value="VIP">VIP</option>
              <option value="Coworkers">Coworkers</option>
              <option value="College Friends">College Friends</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8B6A74] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Guest Table Container */}
      <div className="bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_4px_24px_rgba(239,163,181,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FDECEF] border-b border-[#F8C9D2] text-xs uppercase tracking-wider font-semibold text-[#8B6A74]">
                <th className="py-3.5 px-5">Guest Name</th>
                <th className="py-3.5 px-4">Group Tag</th>
                <th className="py-3.5 px-4">Dietary Restrictions</th>
                <th className="py-3.5 px-4">RSVP Status</th>
                <th className="py-3.5 px-4">Assigned Table</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F8C9D2]/40 text-sm">
              {filteredGuests.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#8B6A74]">
                    <Users className="w-8 h-8 mx-auto text-[#F8C9D2] mb-2" />
                    <p className="font-serif text-base text-[#3B202B]">No guests found</p>
                    <p className="text-xs text-[#8B6A74] mt-0.5">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              ) : (
                filteredGuests.map((guest) => {
                  const table = getTableInfo(guest.tableId);

                  return (
                    <tr 
                      key={guest.id} 
                      className="hover:bg-[#FFF9F6] transition-colors duration-150 group"
                    >
                      {/* Guest Name */}
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#FDECEF] border border-[#F8C9D2] flex items-center justify-center font-serif text-[#3B202B] font-semibold text-xs shrink-0 shadow-sm">
                            {guest.name
                              .split(' ')
                              .map(n => n[0])
                              .join('')
                              .slice(0, 2)}
                          </div>
                          <div>
                            <div className="font-semibold text-[#3B202B] tracking-tight">
                              {guest.name}
                            </div>
                            {guest.notes && (
                              <div className="text-xs text-[#8B6A74] line-clamp-1 italic">
                                {guest.notes}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Group Tag */}
                      <td className="py-4 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getGroupBadgeClass(guest.group)}`}>
                          {guest.group}
                        </span>
                      </td>

                      {/* Dietary Restrictions */}
                      <td className="py-4 px-4">
                        {guest.dietary === 'None' ? (
                          <span className="text-xs text-[#8B6A74]/70">None</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#FFF9F6] border border-[#E8CFA8] text-[#3B202B]">
                            <Utensils className="w-3 h-3 text-[#E8CFA8]" />
                            <span>{guest.dietary}</span>
                          </span>
                        )}
                      </td>

                      {/* RSVP Status Badge (Exact specs) */}
                      <td className="py-4 px-4">
                        {guest.rsvp === 'Attending' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#B7CBB8] text-[#1E3620] shadow-sm">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1E3620]" />
                            <span>Attending</span>
                          </span>
                        )}

                        {guest.rsvp === 'Declined' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#D97986] text-white shadow-sm">
                            <XCircle className="w-3.5 h-3.5 text-white" />
                            <span>Declined</span>
                          </span>
                        )}

                        {guest.rsvp === 'Unresponded' && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#E8CFA8] text-[#422C0C] shadow-sm">
                            <Clock className="w-3.5 h-3.5 text-[#422C0C]" />
                            <span>Unresponded</span>
                          </span>
                        )}
                      </td>

                      {/* Assigned Table */}
                      <td className="py-4 px-4">
                        {table ? (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FDECEF] border border-[#F8C9D2] text-xs font-medium text-[#3B202B]">
                            <Armchair className="w-3.5 h-3.5 text-[#EFA3B3]" />
                            <span>{table.tableNumber}</span>
                            {guest.seatNumber && (
                              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white text-[#8B6A74] border border-[#F8C9D2]">
                                Seat {guest.seatNumber}
                              </span>
                            )}
                          </div>
                        ) : guest.rsvp === 'Attending' ? (
                          <button
                            onClick={() => onNavigateToSeating()}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-dashed border-[#EFA3B3] text-[#EFA3B3] hover:bg-[#FDECEF] transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                            <span>Assign Seat</span>
                          </button>
                        ) : (
                          <span className="text-xs text-[#8B6A74]/60 italic">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* Quick RSVP toggle */}
                          <select
                            value={guest.rsvp}
                            onChange={(e) => onUpdateGuest({ ...guest, rsvp: e.target.value as RSVPStatus })}
                            className="text-xs bg-[#FFF9F6] border border-[#F8C9D2] rounded-lg px-2 py-1 text-[#3B202B] focus:outline-none focus:ring-1 focus:ring-[#EFA3B3] cursor-pointer"
                            title="Update RSVP"
                          >
                            <option value="Attending">Attending</option>
                            <option value="Unresponded">Unresponded</option>
                            <option value="Declined">Declined</option>
                          </select>

                          {/* Delete guest button */}
                          <button
                            onClick={() => onDeleteGuest(guest.id)}
                            className="p-1.5 text-[#8B6A74]/50 hover:text-[#D97986] hover:bg-[#FDECEF] rounded-lg transition-colors"
                            title="Delete guest"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Guest Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_20px_50px_rgba(59,32,43,0.15)] overflow-hidden">
            <div className="px-6 py-4 bg-[#FDECEF] border-b border-[#F8C9D2] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EFA3B3]" />
                <h3 className="font-serif text-lg font-bold text-[#3B202B]">Add Wedding Guest</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#8B6A74] hover:text-[#3B202B] rounded-lg hover:bg-white/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateGuest} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                  Guest Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Genevieve Rossi"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                    Group Tag
                  </label>
                  <select
                    value={newGroup}
                    onChange={(e) => setNewGroup(e.target.value as GuestGroup)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                  >
                    <option value="Family">Family</option>
                    <option value="Bridal Party">Bridal Party</option>
                    <option value="VIP">VIP</option>
                    <option value="Coworkers">Coworkers</option>
                    <option value="College Friends">College Friends</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                    RSVP Status
                  </label>
                  <select
                    value={newRsvp}
                    onChange={(e) => setNewRsvp(e.target.value as RSVPStatus)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                  >
                    <option value="Attending">Attending (Sage)</option>
                    <option value="Unresponded">Unresponded</option>
                    <option value="Declined">Declined</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                  Dietary Restrictions
                </label>
                <select
                  value={newDietary}
                  onChange={(e) => setNewDietary(e.target.value as DietaryRestriction)}
                  className="w-full px-3 py-2 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                >
                  <option value="None">None</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Gluten-Free">Gluten-Free</option>
                  <option value="Halal">Halal</option>
                  <option value="Kosher">Kosher</option>
                  <option value="Nut Allergy">Nut Allergy</option>
                  <option value="Dairy-Free">Dairy-Free</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                  Notes / Relationship
                </label>
                <input
                  type="text"
                  placeholder="e.g. Groom's college roommate"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FFF9F6] border border-[#F8C9D2] text-sm text-[#3B202B] focus:outline-none focus:ring-2 focus:ring-[#EFA3B3]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#F8C9D2] text-sm font-medium text-[#8B6A74] hover:bg-[#FDECEF]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#EFA3B3] text-[#3B202B] font-medium text-sm hover:bg-[#F8C9D2] transition-colors shadow-sm"
                >
                  Save Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Import CSV Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white rounded-2xl border border-[#F8C9D2] shadow-[0_20px_50px_rgba(59,32,43,0.18)] overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#FDECEF] border-b border-[#F8C9D2] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-white border border-[#F8C9D2] text-[#EFA3B3]">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#3B202B]">Import Guests from CSV</h3>
                  <p className="text-xs text-[#8B6A74]">Bulk import wedding guests using a CSV template</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsImportModalOpen(false);
                  setCsvFile(null);
                  setParsedGuests([]);
                }}
                className="p-1.5 text-[#8B6A74] hover:text-[#3B202B] rounded-lg hover:bg-white/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Instructions Box */}
              <div className="p-4 rounded-xl bg-[#FFF9F6] border border-[#E8CFA8] text-xs text-[#3B202B] space-y-2">
                <div className="flex items-center justify-between font-bold text-sm text-[#3B202B]">
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#E8CFA8]" />
                    <span>Hướng dẫn định dạng File CSV:</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EFA3B3] text-[#3B202B] font-semibold text-xs hover:bg-[#F8C9D2] transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Tải CSV Mẫu (.csv)</span>
                  </button>
                </div>
                <ul className="list-disc list-inside space-y-1 text-[#8B6A74] leading-relaxed pl-1">
                  <li><strong>Name:</strong> Tên đầy đủ của khách mời (Bắt buộc).</li>
                  <li><strong>Group:</strong> Nhóm: <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Family</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Bridal Party</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">VIP</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Coworkers</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">College Friends</code>.</li>
                  <li><strong>RSVP:</strong> Trạng thái: <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Attending</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Unresponded</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Declined</code>.</li>
                  <li><strong>Dietary:</strong> Chế độ ăn (Ví dụ: <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">None</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Vegetarian</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Vegan</code>, <code className="bg-white px-1 py-0.5 rounded border border-[#F8C9D2] text-[#3B202B]">Gluten-Free</code>).</li>
                  <li><strong>Notes:</strong> Ghi chú ngắn hoặc mối quan hệ.</li>
                </ul>
              </div>

              {/* Sample Template Preview Box */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5 flex items-center justify-between">
                  <span>Mẫu định dạng dữ liệu (CSV Template Preview):</span>
                  <span className="text-[11px] text-[#8B6A74] font-normal">Dùng phẩy (,) phân cách giữa các cột</span>
                </label>
                <div className="relative">
                  <pre className="p-3.5 rounded-xl bg-[#3B202B] text-[#FDECEF] font-mono text-xs overflow-x-auto leading-relaxed border border-[#3B202B]">
{SAMPLE_CSV_CONTENT}
                  </pre>
                </div>
              </div>

              {/* Upload Input Area */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#8B6A74] mb-1.5">
                  Tải lên File CSV của bạn:
                </label>
                <div className="relative border-2 border-dashed border-[#F8C9D2] hover:border-[#EFA3B3] rounded-2xl p-5 bg-[#FFF9F6] text-center transition-colors">
                  <input
                    type="file"
                    accept=".csv, .txt"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center space-y-2 pointer-events-none">
                    <Upload className="w-8 h-8 text-[#EFA3B3]" />
                    <p className="text-sm font-semibold text-[#3B202B]">
                      {csvFile ? csvFile.name : 'Kéo thả file CSV vào đây hoặc click để chọn file'}
                    </p>
                    <p className="text-xs text-[#8B6A74]">Hỗ trợ định dạng .csv hoặc .txt</p>
                  </div>
                </div>
              </div>

              {/* Parsed Preview Table */}
              {parsedGuests.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#3B202B]">
                    <span className="flex items-center gap-1.5 text-[#1E3620]">
                      <CheckCircle2 className="w-4 h-4 text-[#B7CBB8]" />
                      <span>Đã xem trước {parsedGuests.length} khách mời hợp lệ:</span>
                    </span>
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-[#F8C9D2] rounded-xl bg-white">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-[#FDECEF] sticky top-0 font-semibold text-[#8B6A74]">
                        <tr>
                          <th className="p-2">Tên</th>
                          <th className="p-2">Group</th>
                          <th className="p-2">RSVP</th>
                          <th className="p-2">Dietary</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F8C9D2]/30">
                        {parsedGuests.map((g, idx) => (
                          <tr key={idx} className="hover:bg-[#FFF9F6]">
                            <td className="p-2 font-medium text-[#3B202B]">{g.name}</td>
                            <td className="p-2 text-[#8B6A74]">{g.group}</td>
                            <td className="p-2 text-[#8B6A74]">{g.rsvp}</td>
                            <td className="p-2 text-[#8B6A74]">{g.dietary}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#FDECEF] border-t border-[#F8C9D2] flex items-center justify-end gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setIsImportModalOpen(false);
                  setCsvFile(null);
                  setParsedGuests([]);
                }}
                className="px-4 py-2 rounded-xl border border-[#F8C9D2] text-sm font-medium text-[#8B6A74] hover:bg-white"
              >
                Hủy
              </button>
              <button
                type="button"
                disabled={parsedGuests.length === 0}
                onClick={handleConfirmImport}
                className={`px-5 py-2 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2 ${
                  parsedGuests.length > 0
                    ? 'bg-[#EFA3B3] text-[#3B202B] hover:bg-[#F8C9D2] cursor-pointer'
                    : 'bg-[#F8C9D2]/40 text-[#8B6A74]/50 cursor-not-allowed'
                }`}
              >
                <Upload className="w-4 h-4" />
                <span>Import {parsedGuests.length} Khách Mời</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
