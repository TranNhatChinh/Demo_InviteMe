import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { ReceptionDashboard } from './ReceptionDashboard';
import { QRCheckInScanner } from './QRCheckInScanner';
import { ManualGuestSearch } from './ManualGuestSearch';
import { TodayActivityTimeline } from './TodayActivityTimeline';
import { WalkInGuestModal } from './WalkInGuestModal';
import { Button } from '../common/Button';
import {
  QrCode,
  Search,
  UserPlus,
  Clock,
  LayoutDashboard,
  ArrowLeft,
  Sparkles,
  Radio,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { clsx } from 'clsx';

export const ReceptionStaffApp: React.FC = () => {
  const { setCurrentView } = useApp();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'scanner' | 'search' | 'activity'>('overview');
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FDF9FA] text-brand-dark pb-16 animate-fade-in text-left">
      {/* 1. TOP OPERATIONAL STATUS & LIVE EVENT BANNER */}
      <div className="bg-brand-dark text-white px-4 sm:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-modal border-b border-brand-primary/30">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/10"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => setCurrentView('dashboard')}
          >
            {language === 'vi' ? 'Không gian Cặp đôi' : 'Couple Suite'}
          </Button>

          <div className="flex items-center gap-2 border-l border-white/20 pl-3">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="font-bold text-xs uppercase tracking-wider text-emerald-400">
              {language === 'vi' ? 'LỄ TÂN: TRỰC TIẾP' : 'Wedding Day: LIVE'}
            </span>
          </div>

          <span className="hidden md:inline text-xs text-white/70">
            • {language === 'vi' ? 'Đang đón khách tại The Reverie Saigon' : 'Reception is currently active at The Reverie Saigon'}
          </span>
        </div>

        {/* Live Event Times, Staff Badge & Language Switcher */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-3 text-white/80 font-mono">
            <span>{language === 'vi' ? 'Bắt đầu' : 'Started'}: <strong>17:30</strong></span>
            <span>•</span>
            <span>{language === 'vi' ? 'Hiện tại' : 'Current'}: <strong className="text-brand-soft">18:24</strong></span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/20 text-[11px] font-semibold text-brand-soft">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? 'Lễ tân: Linh Tran' : 'Staff: Linh Tran'}</span>
          </div>

          <LanguageSwitcher variant="compact" />
        </div>
      </div>

      {/* 2. OPERATIONAL NAVIGATION TAB BAR */}
      <div className="bg-white border-b border-brand-border px-4 sm:px-8 py-3 sticky top-0 z-20 shadow-subtle flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={clsx(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2',
              activeTab === 'overview'
                ? 'bg-brand-deep text-white shadow-xs'
                : 'bg-brand-bg/60 text-brand-muted hover:text-brand-dark hover:bg-brand-bg'
            )}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>{language === 'vi' ? 'Tổng quan Lễ tân' : 'Reception Overview'}</span>
          </button>

          <button
            onClick={() => setActiveTab('scanner')}
            className={clsx(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2',
              activeTab === 'scanner'
                ? 'bg-brand-deep text-white shadow-xs'
                : 'bg-brand-bg/60 text-brand-muted hover:text-brand-dark hover:bg-brand-bg'
            )}
          >
            <QrCode className="w-4 h-4" />
            <span>{t.reception.title}</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={clsx(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2',
              activeTab === 'search'
                ? 'bg-brand-deep text-white shadow-xs'
                : 'bg-brand-bg/60 text-brand-muted hover:text-brand-dark hover:bg-brand-bg'
            )}
          >
            <Search className="w-4 h-4" />
            <span>{t.reception.manualCheckIn}</span>
          </button>

          <button
            onClick={() => setActiveTab('activity')}
            className={clsx(
              'px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-2',
              activeTab === 'activity'
                ? 'bg-brand-deep text-white shadow-xs'
                : 'bg-brand-bg/60 text-brand-muted hover:text-brand-dark hover:bg-brand-bg'
            )}
          >
            <Clock className="w-4 h-4" />
            <span>{language === 'vi' ? 'Nhật ký hôm nay' : "Today's Activity"}</span>
          </button>
        </div>

        {/* Walk-in quick button */}
        <Button
          variant="primary"
          size="sm"
          icon={<UserPlus className="w-4 h-4" />}
          onClick={() => setIsWalkInModalOpen(true)}
        >
          {t.reception.walkInRegisterBtn}
        </Button>
      </div>

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        {activeTab === 'overview' && (
          <ReceptionDashboard
            onSwitchTab={(tab) => {
              if (tab === 'walkin') setIsWalkInModalOpen(true);
              else setActiveTab(tab);
            }}
            onOpenWalkInModal={() => setIsWalkInModalOpen(true)}
          />
        )}
        {activeTab === 'scanner' && <QRCheckInScanner />}
        {activeTab === 'search' && <ManualGuestSearch />}
        {activeTab === 'activity' && <TodayActivityTimeline />}
      </main>

      <WalkInGuestModal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
      />
    </div>
  );
};
