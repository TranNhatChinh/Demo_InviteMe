import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, UserPlus, Users, BarChart3, Heart, Calendar, Settings, Sparkles, MapPin, CheckCircle, Clock } from 'lucide-react';
import { Badge } from './Badge';

export const CommandPalette: React.FC = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    setCurrentView,
    setIsAddGuestModalOpen,
    guests,
    setSelectedGuestId,
  } = useApp();

  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(!isCommandPaletteOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen, setIsCommandPaletteOpen]);

  if (!isCommandPaletteOpen) return null;

  const quickNav = [
    { label: 'Overview Dashboard', icon: Heart, view: 'dashboard' },
    { label: 'Guest Management CRM', icon: Users, view: 'guest-list' },
    { label: 'RSVP Analytics & Trends', icon: BarChart3, view: 'rsvp-analytics' },
    { label: 'Wedding Details & Venues', icon: MapPin, view: 'wedding-details' },
    { label: 'Love Story Timeline', icon: Calendar, view: 'wedding-details' },
    { label: 'AI Wedding Assistant', icon: Sparkles, view: 'ai-assistant' },
    { label: 'Application Settings', icon: Settings, view: 'settings' },
  ];

  // Filtered guests
  const filteredGuests = query.trim()
    ? guests
        .filter(
          (g) =>
            g.fullName.toLowerCase().includes(query.toLowerCase()) ||
            g.email.toLowerCase().includes(query.toLowerCase()) ||
            g.tableNumber.toLowerCase().includes(query.toLowerCase()) ||
            g.relationship.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleSelectNav = (view: string) => {
    setCurrentView(view);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  const handleSelectGuest = (id: string) => {
    setCurrentView('guest-list');
    setSelectedGuestId(id);
    setIsCommandPaletteOpen(false);
    setQuery('');
  };

  const handleAddGuest = () => {
    setIsCommandPaletteOpen(false);
    setIsAddGuestModalOpen(true);
    setQuery('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      <div
        className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCommandPaletteOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-white rounded-xl shadow-modal border border-brand-border z-10 overflow-hidden flex flex-col animate-fade-in">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-brand-border gap-3">
          <Search className="w-5 h-5 text-brand-muted shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search guests..."
            className="w-full text-sm text-brand-dark placeholder:text-brand-muted/70 focus:outline-none bg-transparent"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-0.5 text-[10px] font-mono text-brand-muted bg-brand-bg border border-brand-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-80 overflow-y-auto space-y-3">
          {/* Quick Actions */}
          {!query && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-brand-muted px-2 uppercase tracking-wider">
                Quick Actions
              </span>
              <button
                onClick={handleAddGuest}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-brand-dark hover:bg-brand-soft/40 hover:text-brand-deep rounded-lg transition-colors text-left"
              >
                <div className="p-1.5 rounded-md bg-brand-soft text-brand-deep">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Add New Guest</p>
                  <p className="text-xs text-brand-muted">Open the guest creation modal</p>
                </div>
              </button>
            </div>
          )}

          {/* Guest Matches */}
          {filteredGuests.length > 0 && (
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-brand-muted px-2 uppercase tracking-wider">
                Guests ({filteredGuests.length})
              </span>
              {filteredGuests.map((g) => (
                <button
                  key={g.id}
                  onClick={() => handleSelectGuest(g.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-brand-dark hover:bg-brand-soft/30 rounded-lg transition-colors text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={g.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-brand-border"
                    />
                    <div>
                      <p className="font-medium text-brand-dark">{g.fullName}</p>
                      <p className="text-xs text-brand-muted">{g.relationship} • {g.tableNumber}</p>
                    </div>
                  </div>
                  <Badge status={g.rsvpStatus} size="sm" />
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="space-y-1">
            <span className="text-[11px] font-semibold text-brand-muted px-2 uppercase tracking-wider">
              Navigation
            </span>
            {quickNav
              .filter((item) => !query || item.label.toLowerCase().includes(query.toLowerCase()))
              .map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleSelectNav(item.view)}
                  className="w-full flex items-center gap-3 px-3 py-2 text-sm text-brand-dark hover:bg-brand-soft/30 hover:text-brand-deep rounded-lg transition-colors text-left"
                >
                  <item.icon className="w-4 h-4 text-brand-muted" />
                  <span>{item.label}</span>
                </button>
              ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 border-t border-brand-border bg-brand-bg/50 flex items-center justify-between text-[11px] text-brand-muted">
          <span>Navigate with mouse or shortcuts</span>
          <span>InviteMe OS v1.0</span>
        </div>
      </div>
    </div>
  );
};
