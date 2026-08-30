import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { AdminDashboard } from './AdminDashboard';
import { UserManagement } from './UserManagement';
import { WeddingManagement } from './WeddingManagement';
import { TemplateManagement } from './TemplateManagement';
import { SubscriptionManagement } from './SubscriptionManagement';
import { ContentModeration } from './ContentModeration';
import { SupportDesk } from './SupportDesk';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';
import { ToastContainer } from '../common/ToastContainer';
import {
  LayoutDashboard,
  Users,
  Heart,
  Palette,
  CreditCard,
  ShieldAlert,
  LifeBuoy,
  BarChart3,
  Settings,
  ArrowLeft,
  Search,
  Bell,
  Sparkles,
  QrCode,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { clsx } from 'clsx';

export const AdminLayout: React.FC = () => {
  const { currentView, setCurrentView, adminUsers, supportTickets, moderationItems } = useApp();
  const { t, language } = useLanguage();

  const navItems = [
    { id: 'admin-dashboard', label: t.admin.dashboard, icon: LayoutDashboard },
    { id: 'admin-users', label: t.admin.users, icon: Users, badge: '12.4K' },
    { id: 'admin-weddings', label: t.admin.weddings, icon: Heart, badge: '2.3K' },
    { id: 'admin-templates', label: t.admin.templates, icon: Palette, badge: '6' },
    { id: 'admin-subscriptions', label: t.admin.subscriptions, icon: CreditCard },
    { id: 'admin-moderation', label: t.admin.moderation, icon: ShieldAlert, alert: moderationItems.length > 0 },
    { id: 'admin-support', label: t.admin.support, icon: LifeBuoy, badge: supportTickets.filter(t => t.status === 'Open').length },
    { id: 'admin-analytics', label: t.admin.analytics, icon: BarChart3 },
    { id: 'admin-settings', label: t.admin.settings, icon: Settings },
  ];

  const renderAdminView = () => {
    switch (currentView) {
      case 'admin-dashboard':
      case 'admin':
        return <AdminDashboard />;
      case 'admin-users':
        return <UserManagement />;
      case 'admin-weddings':
        return <WeddingManagement />;
      case 'admin-templates':
        return <TemplateManagement />;
      case 'admin-subscriptions':
        return <SubscriptionManagement />;
      case 'admin-moderation':
        return <ContentModeration />;
      case 'admin-support':
        return <SupportDesk />;
      case 'admin-analytics':
        return <AdminAnalytics />;
      case 'admin-settings':
        return <AdminSettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex text-left font-sans">
      {/* 1. DATA-DENSE OPERATIONAL SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between border-r border-slate-800 select-none shrink-0 fixed top-0 bottom-0 left-0 z-30">
        {/* Brand Header */}
        <div>
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent text-white flex items-center justify-center font-bold text-sm shadow-xs">
                IM
              </div>
              <div>
                <span className="font-bold text-white text-sm tracking-tight block">
                  InviteMe Admin
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono">
                  {language === 'vi' ? 'Quản trị hệ thống' : 'Multi-Tenant Ops'}
                </span>
              </div>
            </div>
          </div>

          {/* Nav List */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            {navItems.map((item) => {
              const isActive = currentView === item.id || (item.id === 'admin-dashboard' && currentView === 'admin');
              const Icon = item.icon;

              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={clsx(
                    'w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left group',
                    isActive
                      ? 'bg-slate-800 text-white shadow-xs border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={clsx('w-4 h-4', isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200')} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && (
                    <span
                      className={clsx(
                        'text-[10px] px-1.5 py-0.2 rounded font-mono',
                        isActive ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}

                  {item.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Switcher: Jump back to Couple or Reception App */}
        <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-950/60">
          <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
            {language === 'vi' ? 'Chuyển không gian' : 'Workspace Jump'}
          </span>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors border border-slate-700"
          >
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-brand-primary" />
              <span>{language === 'vi' ? 'Không gian Cặp đôi' : 'Couple Suite'}</span>
            </div>
            <ArrowLeft className="w-3.5 h-3.5 text-slate-400 rotate-180" />
          </button>

          <button
            onClick={() => setCurrentView('reception-app')}
            className="w-full px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-between transition-colors border border-slate-700"
          >
            <div className="flex items-center gap-2">
              <QrCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>{language === 'vi' ? 'Ứng dụng Lễ tân' : 'Reception Door App'}</span>
            </div>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN ADMIN CONTENT CONTAINER */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 z-20 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-500">
              <Search className="w-3.5 h-3.5" />
              <input
                type="text"
                placeholder={language === 'vi' ? 'Tìm kiếm toàn hệ thống (Người dùng, Tiệc cưới, Hóa đơn)...' : 'Global search (Users, Weddings, Invoices)...'}
                className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder:text-slate-400 w-64"
              />
            </div>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Hệ thống Trực tiếp' : 'Production Live'}</span>
            </div>

            <LanguageSwitcher variant="compact" />

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80"
                alt=""
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <div>
                <span className="text-xs font-bold text-slate-900 block leading-tight">Admin Mai Anh</span>
                <span className="text-[10px] text-slate-400 leading-tight">Super Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Body View */}
        <main className="p-6 sm:p-8 flex-1 max-w-7xl w-full mx-auto">
          {renderAdminView()}
        </main>
      </div>

      <ToastContainer />
    </div>
  );
};
