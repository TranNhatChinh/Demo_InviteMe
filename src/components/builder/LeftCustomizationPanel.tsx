import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Input, TextArea } from '../common/Input';
import {
  Palette,
  Type,
  Image as ImageIcon,
  Quote,
  Sparkles,
  Check,
} from 'lucide-react';
import { clsx } from 'clsx';

interface LeftCustomizationPanelProps {
  onCloseMobileDrawer?: () => void;
}

export const LeftCustomizationPanel: React.FC<LeftCustomizationPanelProps> = ({
  onCloseMobileDrawer,
}) => {
  const { wedding, invitationConfig, updateInvitationConfig } = useApp();
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'theme' | 'typography' | 'content' | 'dresscode'>('theme');

  const colorPresets = [
    { name: language === 'vi' ? 'Hồng Phấn & Hồng Đậm' : 'Blush & Deep Rose', primary: '#EFA3B5', accent: '#A94F68' },
    { name: language === 'vi' ? 'Màu Ngà & Vàng Ánh Kim' : 'Ivory & Warm Gold', primary: '#D4AF37', accent: '#2B2325' },
    { name: language === 'vi' ? 'Xanh Sage & Xanh Thực Vật' : 'Sage & Botanical Green', primary: '#4FA87A', accent: '#2F4F4F' },
    { name: language === 'vi' ? 'Hồng Thời Thượng & Đá Phiến' : 'Editorial Rose & Slate', primary: '#D97891', accent: '#75676B' },
    { name: language === 'vi' ? 'Vàng Hoàng Gia & Nhung Đỏ' : 'Royal Gold & Velvet', primary: '#C5A880', accent: '#53354A' },
  ];

  const fontOptions = [
    { value: 'cormorant', label: 'Cormorant Garamond', sub: language === 'vi' ? 'Cổ điển Sang trọng' : 'Editorial Classic' },
    { value: 'playfair', label: 'Playfair Display', sub: language === 'vi' ? 'Hiện đại Tinh tế' : 'Modern Luxury' },
    { value: 'garamond', label: 'Classic Garamond', sub: language === 'vi' ? 'Chân phương Thanh lịch' : 'Traditional Serif' },
  ];

  return (
    <aside className="w-[280px] min-w-[260px] max-w-[300px] h-full bg-white border-r border-brand-border flex flex-col justify-between overflow-hidden shadow-subtle shrink-0 select-none text-left">
      {/* 1. Header & Tab Navigation */}
      <div className="border-b border-brand-border bg-white sticky top-0 z-10">
        <div className="px-4 py-3 border-b border-brand-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-brand-deep" />
            <h3 className="font-serif font-bold text-sm text-brand-dark">
              {t.builder.customization}
            </h3>
          </div>
          <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider bg-brand-bg px-2 py-0.5 rounded border border-brand-border">
            {t.builder.styleStudio}
          </span>
        </div>

        {/* 4 Icon Tabs */}
        <div className="p-2 bg-brand-bg/40 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'theme', label: t.builder.colors, icon: Palette },
            { id: 'typography', label: t.builder.typography, icon: Type },
            { id: 'content', label: t.builder.content, icon: Quote },
            { id: 'dresscode', label: t.builder.dressCode, icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={clsx(
                  'flex-1 py-1.5 px-2 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shrink-0',
                  isActive
                    ? 'bg-brand-deep text-white shadow-xs'
                    : 'text-brand-muted hover:text-brand-dark hover:bg-brand-soft/40'
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Scrollable Form Content */}
      <div className="p-4 overflow-y-auto overflow-x-hidden flex-1 space-y-4 text-left">
        {/* THEME & COLORS */}
        {activeTab === 'theme' && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                {language === 'vi' ? 'Bảng màu mẫu' : 'Palette Presets'}
              </h4>
              <p className="text-[11px] text-brand-muted">
                {language === 'vi' ? 'Bảng màu hài hòa cho ấn phẩm cưới' : 'Harmonized luxury palettes for your stationery'}
              </p>
            </div>

            <div className="space-y-2">
              {colorPresets.map((preset) => {
                const isSelected = invitationConfig.primaryColor === preset.primary;
                return (
                  <div
                    key={preset.name}
                    onClick={() =>
                      updateInvitationConfig({
                        primaryColor: preset.primary,
                        accentColor: preset.accent,
                      })
                    }
                    className={clsx(
                      'p-2.5 rounded-xl border cursor-pointer flex items-center justify-between transition-all',
                      isSelected
                        ? 'border-brand-deep ring-2 ring-brand-deep/20 bg-brand-bg/60 shadow-xs'
                        : 'border-brand-border hover:bg-brand-bg/40'
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="flex -space-x-1.5 shrink-0">
                        <span
                          className="w-5 h-5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span
                          className="w-5 h-5 rounded-full border border-white shadow-xs"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-brand-dark truncate">
                        {preset.name}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-brand-deep text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-3 border-t border-brand-border/60 space-y-2.5">
              <h5 className="text-xs font-semibold text-brand-dark">
                {language === 'vi' ? 'Mã màu Hex tùy chỉnh' : 'Custom Color Hex'}
              </h5>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label={language === 'vi' ? 'Chính' : 'Primary'}
                  value={invitationConfig.primaryColor}
                  onChange={(e) => updateInvitationConfig({ primaryColor: e.target.value })}
                />
                <Input
                  label={language === 'vi' ? 'Nhấn' : 'Accent'}
                  value={invitationConfig.accentColor}
                  onChange={(e) => updateInvitationConfig({ accentColor: e.target.value })}
                />
              </div>
            </div>
          </div>
        )}

        {/* TYPOGRAPHY */}
        {activeTab === 'typography' && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                {language === 'vi' ? 'Bộ phối kiểu chữ' : 'Font Pairings'}
              </h4>
              <p className="text-[11px] text-brand-muted">
                {language === 'vi' ? 'Phông chữ tiêu đề cao cấp' : 'Curated editorial typefaces'}
              </p>
            </div>

            <div className="space-y-2">
              {fontOptions.map((opt) => {
                const isSelected = invitationConfig.fontFamily === opt.value;
                return (
                  <div
                    key={opt.value}
                    onClick={() => updateInvitationConfig({ fontFamily: opt.value as any })}
                    className={clsx(
                      'p-3 rounded-xl border cursor-pointer transition-all space-y-1',
                      isSelected
                        ? 'border-brand-deep ring-2 ring-brand-deep/20 bg-brand-bg/60 shadow-xs'
                        : 'border-brand-border hover:bg-brand-bg/40'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-brand-dark">{opt.label}</p>
                      <span className="text-[10px] text-brand-muted font-mono">{opt.sub}</span>
                    </div>
                    <p className="font-serif text-base italic text-brand-deep">
                      Emily & James — Dec 14
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CONTENT & QUOTE */}
        {activeTab === 'content' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                {language === 'vi' ? 'Chào đón & Trích dẫn' : 'Welcome & Quotes'}
              </h4>
              <p className="text-[11px] text-brand-muted">
                {language === 'vi' ? 'Thông điệp gửi gắm tới khách mời' : 'Personalized wording for your guests'}
              </p>
            </div>

            <Input
              label={t.builder.coverQuoteLabel}
              value={invitationConfig.welcomeQuote}
              onChange={(e) => updateInvitationConfig({ welcomeQuote: e.target.value })}
              placeholder={language === 'vi' ? 'Hai tâm hồn, một hành trình tươi đẹp.' : 'Two souls, one beautiful journey.'}
            />

            <TextArea
              label={t.builder.welcomeNoteLabel}
              value={invitationConfig.welcomeMessage}
              onChange={(e) => updateInvitationConfig({ welcomeMessage: e.target.value })}
              rows={3}
            />

            <div className="space-y-1.5 pt-2 border-t border-brand-border/60">
              <Input
                label={t.builder.coverPhotoUrlLabel}
                value={invitationConfig.coverPhotoUrl}
                onChange={(e) => updateInvitationConfig({ coverPhotoUrl: e.target.value })}
                icon={<ImageIcon className="w-3.5 h-3.5" />}
              />
            </div>
          </div>
        )}

        {/* DRESS CODE */}
        {activeTab === 'dresscode' && (
          <div className="space-y-3.5 animate-fade-in">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-dark">
                {t.builder.dressCode}
              </h4>
              <p className="text-[11px] text-brand-muted">
                {language === 'vi' ? 'Quy định trang phục dự tiệc' : 'Banquet attire expectations'}
              </p>
            </div>

            <Input
              label={t.builder.dressCodeTitleLabel}
              value={invitationConfig.dressCodeTitle}
              onChange={(e) => updateInvitationConfig({ dressCodeTitle: e.target.value })}
              placeholder="e.g. Blush & Ivory"
            />

            <TextArea
              label={t.builder.dressCodeDescLabel}
              value={invitationConfig.dressCodeDescription}
              onChange={(e) => updateInvitationConfig({ dressCodeDescription: e.target.value })}
              rows={3}
            />
          </div>
        )}
      </div>

      {/* 3. Footer */}
      <div className="p-3 border-t border-brand-border bg-brand-bg/40 text-center text-[10px] text-brand-muted">
        {t.builder.autoSyncNote}
      </div>
    </aside>
  );
};
