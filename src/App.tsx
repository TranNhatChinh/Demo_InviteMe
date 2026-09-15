import React, { useState } from 'react';
import { InviteMeApp } from './components/InviteMeApp';
import { LanguageProvider } from './i18n/LanguageContext';
import { ToastProvider } from './context/ToastContext';
import { AppProvider } from './context/AppContext';
import { AppLayout } from './components/layout/AppLayout';

export const App: React.FC = () => {
  const [activeExperience, setActiveExperience] = useState<'inviteme' | 'workspace'>('inviteme');

  return (
    <LanguageProvider>
      <ToastProvider>
        <AppProvider>
          {activeExperience === 'inviteme' ? (
            <div className="relative">
              {/* Floating workspace switcher badge */}
              <div className="no-print fixed bottom-4 right-4 z-50">
                <button
                  onClick={() => setActiveExperience('workspace')}
                  className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#F8C9D2] text-[11px] font-semibold text-[#8B6A74] hover:text-[#3B202B] hover:border-[#EFA3B3] shadow-lg transition-all"
                  title="Switch to full workspace view"
                >
                  Switch to Legacy Workspace ↗
                </button>
              </div>
              <InviteMeApp />
            </div>
          ) : (
            <div className="relative">
              <div className="fixed bottom-4 right-4 z-50">
                <button
                  onClick={() => setActiveExperience('inviteme')}
                  className="px-4 py-2 rounded-full bg-[#EFA3B3] text-[#3B202B] text-xs font-bold shadow-xl hover:bg-[#F8C9D2] transition-all"
                >
                  ← Back to InviteMe Seating App
                </button>
              </div>
              <AppLayout />
            </div>
          )}
        </AppProvider>
      </ToastProvider>
    </LanguageProvider>
  );
};

export default App;
