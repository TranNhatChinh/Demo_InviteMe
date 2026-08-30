import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import {
  LayoutDashboard,
  Heart,
  Palette,
  Calendar,
  Users,
  BarChart3,
  Layers,
  Armchair,
  QrCode,
  Gift,
  MessageSquareHeart,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Crown,
  LogOut,
  Send,
  Link,
  Sliders,
  Wand2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { clsx } from 'clsx';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  highlight?: boolean;
  live?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

export const Sidebar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    metrics,
    seatingStats,
    giftMetrics,
    thankYouStats,
    currentUser,
    setIsSetupWizardOpen,
    setActiveGuestForPublicView,
    logout,
  } = useApp();

  const { t, formatCurrency, formatNumber } = useLanguage();

  const navigationSections: NavSection[] = [
    {
      items: [
        { id: 'dashboard', label: t.nav.overview, icon: LayoutDashboard },
      ],
    },
    {
      title: t.nav.weddingSection,
      items: [
        { id: 'wedding-details', label: t.nav.weddingDetails, icon: Heart },
        { id: 'template-gallery', label: t.nav.templateGallery, icon: Palette },
        { id: 'invitation-builder', label: t.nav.invitationBuilder, icon: Sliders },
        { id: 'personalized-invites', label: t.nav.personalizedInvites, icon: Link, badge: '142' },
      ],
    },
    {
      title: t.nav.guestsSection,
      items: [
        { id: 'guest-list', label: t.nav.guestList, icon: Users, badge: formatNumber(metrics.totalGuests) },
        { id: 'rsvp-analytics', label: t.nav.rsvpAnalytics, icon: BarChart3, badge: `${metrics.responseRate}%` },
        { id: 'public-guest-portal', label: t.nav.publicGuestPortal, icon: ExternalLink, highlight: true },
      ],
    },
    {
      title: t.nav.operationsSection,
      items: [
        { id: 'seating', label: t.nav.seatingArrangement, icon: Armchair, badge: `${seatingStats.assignedGuests}/150` },
        { id: 'reception-app', label: t.nav.receptionStaffApp, icon: QrCode, live: true },
      ],
    },
    {
      title: t.nav.engagementSection,
      items: [
        { id: 'gift-book', label: t.nav.giftBook, icon: Gift, badge: `${(giftMetrics.totalVND / 1000000).toFixed(1)}M` },
        { id: 'wishes', label: t.nav.wishesWall, icon: MessageSquareHeart, badge: formatNumber(metrics.totalWishes) },
        { id: 'ai-assistant', label: t.nav.aiAssistant, icon: Sparkles, highlight: true },
        { id: 'thank-you', label: t.nav.thankYouSuite, icon: Heart, badge: `${thankYouStats.sent}/${thankYouStats.totalReady}` },
      ],
    },
    {
      title: t.nav.platformOversight,
      items: [
        { id: 'admin-dashboard', label: t.nav.adminConsole, icon: ShieldCheck, badge: '12.4K' },
        { id: 'settings', label: t.nav.settings, icon: Settings },
      ],
    },
  ];

  return (
    <aside
      className={clsx(
        'fixed top-0 left-0 h-screen z-30 bg-white/95 border-r border-brand-border backdrop-blur-md flex flex-col justify-between transition-all duration-300 select-none shadow-subtle shrink-0',
        isSidebarCollapsed ? 'w-20' : 'w-60'
      )}
    >
      {/* Brand Header */}
      <div className="p-4 flex items-center justify-between border-b border-brand-border/60">
        <div
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center gap-2.5 cursor-pointer group overflow-hidden"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary via-brand-soft to-brand-blush p-0.5 shadow-sm group-hover:shadow-pinkGlow transition-shadow flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
              <span className="font-serif font-bold text-brand-deep text-lg italic">I</span>
              <span className="font-serif font-semibold text-brand-accent text-sm -ml-0.5">M</span>
            </div>
          </div>

          {!isSidebarCollapsed && (
            <div className="flex flex-col animate-fade-in truncate">
              <span className="font-serif text-lg font-bold tracking-tight text-brand-dark leading-none">
                Invite<span className="text-brand-deep font-normal italic">Me</span>
              </span>
              <span className="text-[9px] uppercase font-semibold tracking-widest text-brand-muted mt-0.5">
                {t.nav.brideHost}
              </span>
            </div>
          )}
        </div>

        {/* Collapse button */}
        <button
          onClick={() => setIsSidebarCollapsed((prev) => !prev)}
          className="text-brand-muted hover:text-brand-dark p-1.5 rounded-lg hover:bg-brand-bg transition-colors"
          title={isSidebarCollapsed ? 'Expand' : 'Collapse'}
        >
          {isSidebarCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Setup Wizard Quick CTA */}
      {!isSidebarCollapsed && (
        <div className="px-3 pt-2.5">
          <button
            onClick={() => setIsSetupWizardOpen(true)}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-brand-primary via-brand-accent to-brand-deep text-white text-xs font-semibold shadow-xs hover:shadow-card transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Wand2 className="w-3.5 h-3.5" />
              <span>{t.nav.setupWizard}</span>
            </div>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded font-mono">{t.nav.stepsCount}</span>
          </button>
        </div>
      )}

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto px-2.5 py-2.5 space-y-4">
        {navigationSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {section.title && !isSidebarCollapsed && (
              <h5 className="px-2.5 text-[9px] font-bold text-brand-muted uppercase tracking-wider mb-1">
                {section.title}
              </h5>
            )}

            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = currentView === item.id;
                const Icon = item.icon;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.id === 'public-guest-portal') {
                        setActiveGuestForPublicView('gst-001');
                      }
                      setCurrentView(item.id);
                    }}
                    title={isSidebarCollapsed ? item.label : undefined}
                    className={clsx(
                      'w-full flex items-center rounded-lg transition-all duration-150 text-xs font-medium relative group',
                      isSidebarCollapsed
                        ? 'justify-center p-2.5'
                        : 'px-2.5 py-1.5 justify-between',
                      isActive
                        ? 'bg-brand-soft/70 text-brand-deep font-semibold shadow-xs'
                        : 'text-brand-muted hover:text-brand-dark hover:bg-brand-bg'
                    )}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-brand-deep rounded-r-full" />
                    )}

                    <div className="flex items-center gap-2 min-w-0">
                      <Icon
                        className={clsx(
                          'w-4 h-4 transition-colors shrink-0',
                          isActive
                            ? 'text-brand-deep'
                            : 'text-brand-muted group-hover:text-brand-dark',
                          item.highlight && !isActive && 'text-brand-accent'
                        )}
                      />
                      {!isSidebarCollapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>

                    {!isSidebarCollapsed && item.live && (
                      <span className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>LIVE</span>
                      </span>
                    )}

                    {!isSidebarCollapsed && item.badge !== undefined && (
                      <span
                        className={clsx(
                          'text-[10px] px-1.5 py-0.2 rounded-full font-semibold shrink-0 font-mono',
                          isActive
                            ? 'bg-brand-deep text-white'
                            : 'bg-brand-bg text-brand-muted border border-brand-border/60'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}

                    {!isSidebarCollapsed && item.highlight && !item.badge && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-xs shrink-0">
                        {t.common.view}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-brand-border/60 space-y-2 bg-gradient-to-b from-white to-brand-bg/60">
        <div className={clsx('flex items-center', isSidebarCollapsed ? 'justify-center' : 'justify-between gap-2')}>
          <div
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity min-w-0"
            onClick={() => setCurrentView('settings')}
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-7 h-7 rounded-full object-cover border border-brand-primary/40 shrink-0"
            />
            {!isSidebarCollapsed && (
              <div className="flex flex-col text-left truncate">
                <span className="text-xs font-semibold text-brand-dark leading-tight truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-brand-muted leading-tight truncate">
                  {t.nav.brideHost}
                </span>
              </div>
            )}
          </div>

          {!isSidebarCollapsed && (
            <div className="flex items-center gap-0.5 shrink-0">
              <button
                onClick={() => setCurrentView('settings')}
                className="p-1.5 text-brand-muted hover:text-brand-dark hover:bg-brand-soft/40 rounded-md transition-colors"
                title={t.nav.helpCenter}
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={logout}
                className="p-1.5 text-brand-muted hover:text-brand-error hover:bg-rose-50 rounded-md transition-colors"
                title={t.nav.signOut}
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};
