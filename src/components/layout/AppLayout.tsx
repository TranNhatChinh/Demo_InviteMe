import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { CoupleDashboard } from '../dashboard/CoupleDashboard';
import { WeddingOverview } from '../wedding/WeddingOverview';
import { GuestCRM } from '../guests/GuestCRM';
import { RSVPAnalyticsPage } from '../analytics/RSVPAnalyticsPage';
import { TemplateGallery } from '../template-gallery/TemplateGallery';
import { InvitationBuilder } from '../builder/InvitationBuilder';
import { PersonalizedInvitations } from '../personalized/PersonalizedInvitations';
import { GuestWeddingPortal } from '../guest-portal/GuestWeddingPortal';
import { SeatingArrangement } from '../seating/SeatingArrangement';
import { ReceptionStaffApp } from '../reception/ReceptionStaffApp';
import { GiftBookView } from '../engagement/GiftBookView';
import { WishesWallView } from '../engagement/WishesWallView';
import { AIAssistantView } from '../ai/AIAssistantView';
import { ThankYouManagerView } from '../ai/ThankYouManagerView';
import { SettingsView } from '../features/FeatureViews';
import { AdminLayout } from '../admin/AdminLayout';
import { AddGuestModal } from '../guests/AddGuestModal';
import { ImportGuestModal } from '../guests/ImportGuestModal';
import { EditWeddingModal } from '../wedding/EditWeddingModal';
import { WeddingSetupWizard } from '../wizard/WeddingSetupWizard';
import { GuestDrawer } from '../guests/GuestDrawer';
import { ToastContainer } from '../common/ToastContainer';
import { CommandPalette } from '../common/CommandPalette';

export const AppLayout: React.FC = () => {
  const { currentView, isSidebarCollapsed } = useApp();

  // 1. Standalone Enterprise Admin Workspace
  if (currentView.startsWith('admin')) {
    return <AdminLayout />;
  }

  // 2. Standalone Public Guest Wedding Experience
  if (currentView === 'public-guest-portal') {
    return (
      <div className="min-h-screen bg-[#FFF9FA]">
        <GuestWeddingPortal />
        <ToastContainer />
      </div>
    );
  }

  // 3. Standalone Reception Staff Operations App
  if (currentView === 'reception-app' || currentView === 'qr-checkin') {
    return (
      <div className="min-h-screen bg-[#FDF9FA]">
        <ReceptionStaffApp />
        <ToastContainer />
      </div>
    );
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <CoupleDashboard />;
      case 'wedding-details':
        return <WeddingOverview />;
      case 'template-gallery':
        return <TemplateGallery />;
      case 'invitation-builder':
      case 'invitation-design':
        return <InvitationBuilder />;
      case 'personalized-invites':
        return <PersonalizedInvitations />;
      case 'guest-list':
        return <GuestCRM />;
      case 'rsvp-analytics':
        return <RSVPAnalyticsPage />;
      case 'seating':
        return <SeatingArrangement />;
      case 'gift-book':
        return <GiftBookView />;
      case 'wishes':
        return <WishesWallView />;
      case 'ai-assistant':
        return <AIAssistantView />;
      case 'thank-you':
        return <ThankYouManagerView />;
      case 'settings':
      case 'guest-groups':
      case 'schedule':
        return <SettingsView />;
      default:
        return <CoupleDashboard />;
    }
  };

  const isFullBleedView = currentView === 'invitation-builder' || currentView === 'invitation-design';

  return (
    <div className="h-screen w-full bg-brand-bg text-brand-dark flex overflow-hidden">
      {/* Collapsible Luxury Sidebar (240px when expanded, 80px when collapsed) */}
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col h-screen min-w-0 min-h-0 overflow-hidden transition-all duration-300 ${
          isSidebarCollapsed ? 'pl-20' : 'pl-60'
        }`}
      >
        {/* Fixed Top Header (h-16 = 64px) */}
        <Header />

        {/* Dynamic Page Router Body */}
        {isFullBleedView ? (
          <main className="flex-1 mt-16 w-full h-[calc(100vh-4rem)] min-h-0 min-w-0 overflow-hidden p-0">
            {renderCurrentView()}
          </main>
        ) : (
          <main className="flex-1 mt-16 w-full min-h-0 min-w-0 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
            {renderCurrentView()}
          </main>
        )}
      </div>

      {/* Global Modals & Drawers */}
      <WeddingSetupWizard />
      <AddGuestModal />
      <ImportGuestModal />
      <EditWeddingModal />
      <GuestDrawer />
      <ToastContainer />
      <CommandPalette />
    </div>
  );
};
