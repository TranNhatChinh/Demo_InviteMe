import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LeftCustomizationPanel } from './LeftCustomizationPanel';
import { CenterLivePreview } from './CenterLivePreview';
import { RightSectionPanel } from './RightSectionPanel';
import { Palette, Layers, Eye, Smartphone, Monitor, X } from 'lucide-react';
import { clsx } from 'clsx';

export const InvitationBuilder: React.FC = () => {
  const { invitationConfig } = useApp();

  // Responsive drawer states for smaller viewports
  const [isLeftDrawerOpen, setIsLeftDrawerOpen] = useState(false);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [mobileTab, setMobileTab] = useState<'preview' | 'customize' | 'sections'>('preview');

  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden relative">
      {/* 3-Column Desktop Grid / Flex Studio Body */}
      <div className="flex-1 flex flex-row min-w-0 min-h-0 overflow-hidden relative">
        {/* 1. Left Customization Panel:
            Visible in-flow on lg (>= 1024px), drawer on < 1024px */}
        <div className="hidden lg:flex shrink-0 h-full">
          <LeftCustomizationPanel />
        </div>

        {/* 2. Center Live Preview Canvas:
            Takes ALL remaining flexible space, min-width 0, independent scroll */}
        <CenterLivePreview
          onToggleLeftPanel={() => setIsLeftDrawerOpen((prev) => !prev)}
          onToggleRightPanel={() => setIsRightDrawerOpen((prev) => !prev)}
          isLeftPanelOpen={isLeftDrawerOpen}
          isRightPanelOpen={isRightDrawerOpen}
        />

        {/* 3. Right Sections Panel:
            Visible in-flow on 2xl (>= 1440px), drawer on < 1440px */}
        <div className="hidden 2xl:flex shrink-0 h-full">
          <RightSectionPanel />
        </div>
      </div>

      {/* ========================================================= */}
      {/* RESPONSIVE DRAWERS & BOTTOM CONTROLS FOR LAPTOP/TABLET/MOBILE */}
      {/* ========================================================= */}

      {/* Left Drawer for Tablet (< 1024px) */}
      {isLeftDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsLeftDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-[280px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-slide-in">
            <div className="p-3 border-b border-brand-border flex items-center justify-between bg-brand-bg/40">
              <span className="font-serif font-bold text-xs text-brand-dark">Customization Studio</span>
              <button
                onClick={() => setIsLeftDrawerOpen(false)}
                className="p-1 text-brand-muted hover:text-brand-dark rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <LeftCustomizationPanel onCloseMobileDrawer={() => setIsLeftDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Right Drawer for Laptop/Tablet (< 1440px) */}
      {isRightDrawerOpen && (
        <div className="2xl:hidden fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsRightDrawerOpen(false)}
          />

          {/* Drawer Body */}
          <div className="relative w-[280px] max-w-[85vw] h-full bg-white shadow-2xl flex flex-col z-10 animate-slide-in">
            <div className="flex-1 overflow-hidden">
              <RightSectionPanel onCloseMobileDrawer={() => setIsRightDrawerOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (< 768px) */}
      <div className="md:hidden border-t border-brand-border bg-white px-4 py-2 flex items-center justify-around z-20 shrink-0">
        <button
          onClick={() => {
            setIsLeftDrawerOpen(true);
            setIsRightDrawerOpen(false);
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-brand-muted hover:text-brand-dark"
        >
          <Palette className="w-4 h-4 text-brand-accent" />
          <span>Customize</span>
        </button>

        <button
          onClick={() => {
            setIsLeftDrawerOpen(false);
            setIsRightDrawerOpen(false);
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-brand-deep"
        >
          <Eye className="w-4 h-4 text-brand-deep" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => {
            setIsRightDrawerOpen(true);
            setIsLeftDrawerOpen(false);
          }}
          className="flex flex-col items-center gap-1 text-[11px] font-semibold text-brand-muted hover:text-brand-dark"
        >
          <Layers className="w-4 h-4 text-brand-accent" />
          <span>Sections</span>
        </button>
      </div>
    </div>
  );
};
