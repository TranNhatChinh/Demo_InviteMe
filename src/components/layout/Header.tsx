import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import {
  Search,
  Bell,
  HelpCircle,
  Plus,
  Heart,
  ExternalLink,
  RotateCcw,
  Check,
  ChevronDown,
  User,
  Sparkles,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '../common/Button';

export const Header: React.FC = () => {
  const {
    wedding,
    currentUser,
    isSidebarCollapsed,
    setIsCommandPaletteOpen,
    setIsAddGuestModalOpen,
    setCurrentView,
    activities,
    resetToSampleData,
    logout,
  } = useApp();

  const { t } = useLanguage();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 h-16 z-20 bg-white/90 backdrop-blur-md border-b border-brand-border px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${
        isSidebarCollapsed ? 'left-20' : 'left-60'
      }`}
    >
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs sm:text-sm min-w-0">
        <button
          onClick={() => setCurrentView('dashboard')}
          className="text-brand-muted hover:text-brand-dark transition-colors font-medium flex items-center gap-1.5 shrink-0"
        >
          <span>{t.nav.overview}</span>
        </button>
        <span className="text-brand-border font-light">/</span>
        <div className="flex items-center gap-2 min-w-0 truncate">
          <span className="font-serif font-semibold text-brand-dark text-sm sm:text-base tracking-tight flex items-center gap-1.5 truncate">
            <Heart className="w-3.5 h-3.5 fill-brand-primary text-brand-primary shrink-0" />
            <span className="truncate">{wedding.brideName.split(' ')[0]} & {wedding.groomName.split(' ')[0]}</span>
          </span>
          <span className="hidden md:inline-flex text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
            {t.dashboard.activeEvent}
          </span>
        </div>
      </div>

      {/* Right: Actions, Language Switcher, Search, Notifications, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Search trigger button */}
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-brand-border bg-brand-bg/60 hover:bg-brand-bg text-brand-muted text-xs transition-all w-44 lg:w-52 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Search className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t.common.search}...</span>
          </div>
          <kbd className="font-mono text-[10px] bg-white border border-brand-border px-1.5 py-0.2 rounded text-brand-muted shadow-xs shrink-0">
            Ctrl+K
          </kbd>
        </button>

        {/* Global Language Switcher */}
        <LanguageSwitcher variant="header" />

        {/* Quick Add Guest CTA */}
        <Button
          size="sm"
          variant="primary"
          icon={<Plus className="w-3.5 h-3.5" />}
          onClick={() => setIsAddGuestModalOpen(true)}
          className="hidden sm:inline-flex"
        >
          {t.guests.addGuest}
        </Button>

        {/* Reset Mock Data */}
        <button
          onClick={resetToSampleData}
          title={t.common.refresh}
          className="p-2 text-brand-muted hover:text-brand-deep hover:bg-brand-soft/40 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notifications Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen((prev) => !prev)}
            className="relative p-2 text-brand-muted hover:text-brand-dark hover:bg-brand-bg rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-primary ring-2 ring-white animate-pulse" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-modal border border-brand-border overflow-hidden z-40 animate-fade-in">
              <div className="p-3.5 border-b border-brand-border flex items-center justify-between bg-brand-bg/40">
                <span className="text-xs font-semibold text-brand-dark uppercase tracking-wider">
                  {t.dashboard.recentActivity}
                </span>
                <span className="text-[11px] text-brand-deep font-medium cursor-pointer hover:underline">
                  {t.common.all}
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-brand-border/60">
                {activities.slice(0, 4).map((act) => (
                  <div key={act.id} className="p-3 hover:bg-brand-bg/50 transition-colors flex items-start gap-2.5">
                    <img
                      src={act.guestAvatar || currentUser.avatar}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover border border-brand-border shrink-0 mt-0.5"
                    />
                    <div className="flex-1 space-y-0.5 min-w-0">
                      <p className="text-xs text-brand-dark font-medium leading-snug">
                        <span className="font-semibold">{act.guestName}</span> {act.description}
                      </p>
                      <p className="text-[10px] text-brand-muted">{act.relativeTime}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-brand-border bg-brand-bg/30 text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    setCurrentView('dashboard');
                  }}
                  className="text-xs text-brand-deep font-medium hover:underline"
                >
                  {t.dashboard.viewActivityFeed}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-brand-bg transition-colors"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-brand-primary/40"
            />
            <span className="hidden lg:inline text-xs font-semibold text-brand-dark max-w-[100px] truncate">
              {currentUser.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-brand-muted" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-modal border border-brand-border overflow-hidden z-40 animate-fade-in p-1.5 space-y-1">
              <div className="px-3 py-2 border-b border-brand-border/60">
                <p className="text-xs font-semibold text-brand-dark truncate">{currentUser.name}</p>
                <p className="text-[11px] text-brand-muted truncate">{currentUser.email}</p>
              </div>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  setCurrentView('wedding-details');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-brand-dark hover:bg-brand-soft/40 hover:text-brand-deep rounded-md transition-colors"
              >
                <Heart className="w-3.5 h-3.5 text-brand-primary" />
                <span>{t.wedding.title}</span>
              </button>

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  setCurrentView('settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-brand-dark hover:bg-brand-soft/40 hover:text-brand-deep rounded-md transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-brand-muted" />
                <span>{t.nav.settings}</span>
              </button>

              <div className="border-t border-brand-border/60 my-1" />

              <button
                onClick={() => {
                  setIsUserMenuOpen(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-brand-error hover:bg-rose-50 rounded-md transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.nav.signOut}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
