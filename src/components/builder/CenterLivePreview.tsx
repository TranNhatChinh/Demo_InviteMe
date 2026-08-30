import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  Monitor,
  Smartphone,
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Utensils,
  ExternalLink,
  Gift,
  Layers,
  Palette,
  Sliders,
} from 'lucide-react';
import { Button } from '../common/Button';
import { clsx } from 'clsx';

interface CenterLivePreviewProps {
  onToggleLeftPanel?: () => void;
  onToggleRightPanel?: () => void;
  isRightPanelOpen?: boolean;
  isLeftPanelOpen?: boolean;
}

export const CenterLivePreview: React.FC<CenterLivePreviewProps> = ({
  onToggleLeftPanel,
  onToggleRightPanel,
  isRightPanelOpen,
  isLeftPanelOpen,
}) => {
  const { wedding, invitationConfig, setCurrentView, setActiveGuestForPublicView } = useApp();
  const { t, formatDate, language } = useLanguage();
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  const formattedDate = formatDate(wedding.weddingDate, 'full');

  return (
    <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-[#F8F5F5] overflow-hidden relative">
      {/* 1. Top Preview Toolbar */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-brand-border/80 bg-white/90 backdrop-blur-md flex items-center justify-between z-10 shrink-0 gap-2">
        {/* Left Toolbar Controls */}
        <div className="flex items-center gap-2 min-w-0">
          {onToggleLeftPanel && (
            <button
              onClick={onToggleLeftPanel}
              className={clsx(
                'lg:hidden p-1.5 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0',
                isLeftPanelOpen
                  ? 'bg-brand-deep text-white border-brand-deep'
                  : 'bg-brand-bg text-brand-dark border-brand-border hover:bg-brand-soft/40'
              )}
              title="Toggle Customization Panel"
            >
              <Palette className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.builder.customization}</span>
            </button>
          )}

          <div className="flex items-center gap-2 truncate">
            <span className="text-xs font-bold text-brand-dark truncate">
              {t.builder.livePreview}
            </span>
            <span className="hidden sm:inline-flex text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold shrink-0">
              {t.builder.liveRendering}
            </span>
          </div>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div className="flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-brand-border shrink-0">
          <button
            onClick={() => setViewMode('desktop')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all',
              viewMode === 'desktop'
                ? 'bg-white text-brand-deep shadow-xs'
                : 'text-brand-muted hover:text-brand-dark'
            )}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.builder.desktop}</span>
          </button>

          <button
            onClick={() => setViewMode('mobile')}
            className={clsx(
              'flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all',
              viewMode === 'mobile'
                ? 'bg-white text-brand-deep shadow-xs'
                : 'text-brand-muted hover:text-brand-dark'
            )}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.builder.mobile}</span>
          </button>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="soft-pink"
            size="sm"
            icon={<ExternalLink className="w-3.5 h-3.5" />}
            onClick={() => {
              setActiveGuestForPublicView('gst-001');
              setCurrentView('public-guest-portal');
            }}
            className="hidden sm:inline-flex"
          >
            {t.builder.openPortal}
          </Button>

          {onToggleRightPanel && (
            <button
              onClick={onToggleRightPanel}
              className={clsx(
                '2xl:hidden p-1.5 px-2.5 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-semibold shrink-0',
                isRightPanelOpen
                  ? 'bg-brand-deep text-white border-brand-deep'
                  : 'bg-brand-bg text-brand-dark border-brand-border hover:bg-brand-soft/40'
              )}
              title="Toggle Sections Panel"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{t.builder.sections}</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Canvas Viewport Container (Centered, Scrollable, Professional Canvas) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 flex justify-center items-start">
        <div
          className={clsx(
            'transition-all duration-300 bg-white overflow-hidden flex flex-col shrink-0 text-left',
            viewMode === 'mobile'
              ? 'w-full max-w-[390px] min-h-[780px] rounded-[42px] border-[8px] border-brand-dark/90 shadow-2xl relative my-2'
              : 'w-full max-w-[760px] min-h-[850px] rounded-2xl border border-brand-border shadow-modal my-2'
          )}
        >
          {/* Mobile Phone Speaker Notch */}
          {viewMode === 'mobile' && (
            <div className="pt-3 pb-1 bg-white flex justify-center sticky top-0 z-20">
              <div className="w-24 h-3.5 bg-brand-dark/20 rounded-full" />
            </div>
          )}

          {/* Invitation Content Sections */}
          <div className="flex-1 text-brand-dark space-y-10 pb-12">
            {/* 1. HERO SECTION */}
            {invitationConfig.sections.hero && (
              <div className="relative min-h-[460px] flex flex-col justify-between p-6 sm:p-8 text-center bg-brand-dark text-white overflow-hidden">
                <img
                  src={invitationConfig.coverPhotoUrl}
                  alt="Wedding Couple"
                  className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/40 to-black/30" />

                {/* Content Overlay */}
                <div className="relative z-10 space-y-2 pt-4">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-soft">
                    {t.publicPortal.weddingCelebration}
                  </span>
                  <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                    {wedding.brideName}
                    <span className="font-serif italic font-normal text-brand-soft block text-2xl my-1">&</span>
                    {wedding.groomName}
                  </h1>
                </div>

                <div className="relative z-10 space-y-3 pb-2">
                  <p className="font-serif italic text-sm text-brand-soft max-w-sm mx-auto">
                    "{invitationConfig.welcomeQuote}"
                  </p>
                  <div className="py-2.5 border-y border-white/20 text-xs space-y-0.5">
                    <p className="font-semibold text-white">{formattedDate}</p>
                    <p className="text-white/80 text-[11px]">{wedding.receptionVenue.name} • Ho Chi Minh City</p>
                  </div>
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl text-white text-xs font-semibold shadow-card transition-transform active:scale-98"
                    style={{ backgroundColor: invitationConfig.primaryColor }}
                  >
                    {t.publicPortal.acceptBtn}
                  </button>
                </div>
              </div>
            )}

            {/* 2. WELCOME & PERSONAL GREETING */}
            <div className="px-6 sm:px-10 text-center space-y-2.5">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                {t.publicPortal.speciallyInvited}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
                {t.publicPortal.dearGuest} Nguyễn Minh Anh,
              </h2>
              <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-lg mx-auto font-light">
                {invitationConfig.welcomeMessage}
              </p>
            </div>

            {/* 3. OUR STORY */}
            {invitationConfig.sections.ourStory && (
              <div className="px-6 sm:px-10 space-y-5">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                    {t.publicPortal.ourStoryTitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark">
                    {t.publicPortal.howForeverBegan}
                  </h3>
                </div>

                <div className="space-y-3">
                  {wedding.storyTimeline.slice(0, 3).map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-brand-bg/50 border border-brand-border/60 space-y-1 text-left">
                      <span className="font-serif font-bold text-sm sm:text-base text-brand-deep">
                        {item.year} — {item.title}
                      </span>
                      <p className="text-xs text-brand-muted leading-relaxed font-light">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. EVENT SCHEDULE */}
            {invitationConfig.sections.schedule && (
              <div className="px-6 sm:px-10 space-y-5">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                    {t.publicPortal.itineraryTitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark">
                    {t.publicPortal.scheduleCelebrations}
                  </h3>
                </div>

                <div className="space-y-2.5">
                  {invitationConfig.scheduleEvents.map((evt, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-white border border-brand-border shadow-subtle flex items-start gap-3 text-left">
                      <div className="font-serif font-bold text-xs text-brand-deep px-2.5 py-1 rounded-lg bg-brand-soft/60 shrink-0">
                        {evt.time}
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="font-semibold text-xs text-brand-dark truncate">{evt.title}</h4>
                        <p className="text-[11px] text-brand-muted truncate">{evt.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. VENUE & LOCATION */}
            {invitationConfig.sections.venue && (
              <div className="px-6 sm:px-10 space-y-3 text-left">
                <div className="text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                    {t.publicPortal.locationTitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark">
                    {t.publicPortal.celebrationVenues}
                  </h3>
                </div>

                <div className="rounded-2xl overflow-hidden border border-brand-border shadow-subtle bg-white space-y-2.5 p-4">
                  <h4 className="font-serif font-bold text-sm text-brand-dark">{wedding.receptionVenue.name}</h4>
                  <p className="text-xs text-brand-muted">{wedding.receptionVenue.address}</p>
                  <button
                    type="button"
                    className="w-full py-2 rounded-xl text-xs font-semibold border border-brand-primary/40 text-brand-deep hover:bg-brand-soft/30 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <MapPin className="w-3.5 h-3.5 text-brand-accent" /> {t.publicPortal.getDirections}
                  </button>
                </div>
              </div>
            )}

            {/* 6. DRESS CODE */}
            {invitationConfig.sections.dressCode && (
              <div className="px-6 sm:px-10 space-y-3 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                    {t.publicPortal.attireTitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-brand-dark">
                    {invitationConfig.dressCodeTitle}
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-2">
                  {invitationConfig.dressCodeColors.map((col, idx) => (
                    <span
                      key={idx}
                      className="w-6 h-6 rounded-full border-2 border-white shadow-card"
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>

                <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
                  {invitationConfig.dressCodeDescription}
                </p>
              </div>
            )}

            {/* 7. FOOTER */}
            {invitationConfig.sections.footer && (
              <div className="px-6 py-6 border-t border-brand-border/60 text-center space-y-1.5">
                <span className="font-serif text-lg font-bold text-brand-dark">{wedding.name}</span>
                <p className="text-xs text-brand-deep font-mono font-semibold">{wedding.hashtag}</p>
                <p className="text-[10px] text-brand-muted">{t.publicPortal.craftedWith}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
