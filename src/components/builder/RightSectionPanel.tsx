import React from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { SectionVisibility } from '../../types';
import {
  Layers,
  Eye,
  EyeOff,
  GripVertical,
  X,
} from 'lucide-react';
import { clsx } from 'clsx';

interface RightSectionPanelProps {
  onCloseMobileDrawer?: () => void;
}

export const RightSectionPanel: React.FC<RightSectionPanelProps> = ({
  onCloseMobileDrawer,
}) => {
  const { invitationConfig, updateInvitationConfig } = useApp();
  const { t, language } = useLanguage();

  const sectionsList: { key: keyof SectionVisibility; label: string; description: string }[] = [
    { key: 'hero', label: t.builder.sectionItems.hero, description: language === 'vi' ? 'Tên, ngày cưới & ảnh bìa' : 'Names, date & cover photo' },
    { key: 'ourStory', label: t.builder.sectionItems.ourStory, description: language === 'vi' ? 'Cột mốc 2018 - 2026' : '2018 - 2026 milestones' },
    { key: 'gallery', label: t.builder.sectionItems.gallery, description: language === 'vi' ? 'Thư viện ảnh cưới nghệ thuật' : 'Editorial portrait grid' },
    { key: 'schedule', label: t.builder.sectionItems.schedule, description: language === 'vi' ? 'Hôn lễ, khai tiệc & âm nhạc' : 'Ceremony, banquet & party' },
    { key: 'venue', label: t.builder.sectionItems.venue, description: language === 'vi' ? 'Nhà thờ & Khách sạn Reverie' : 'Cathedral & Reverie pins' },
    { key: 'dressCode', label: t.builder.sectionItems.dressCode, description: language === 'vi' ? 'Bảng màu & quy định trang phục' : 'Color swatches & attire' },
    { key: 'rsvp', label: t.builder.sectionItems.rsvp, description: language === 'vi' ? 'Phản hồi khách & người đi cùng' : 'Guest response & companions' },
    { key: 'gift', label: t.builder.sectionItems.gift, description: language === 'vi' ? 'Mừng cưới & Tài khoản Vietcombank' : 'Digital blessing & Vietcombank' },
    { key: 'footer', label: t.builder.sectionItems.footer, description: language === 'vi' ? 'Hashtag & lời cảm ơn bế mạc' : 'Hashtag & closing thank-you' },
  ];

  const handleToggleSection = (key: keyof SectionVisibility) => {
    updateInvitationConfig({
      sections: {
        ...invitationConfig.sections,
        [key]: !invitationConfig.sections[key],
      },
    });
  };

  return (
    <aside className="w-[280px] min-w-[260px] max-w-[300px] h-full bg-white border-l border-brand-border flex flex-col justify-between overflow-hidden shadow-subtle shrink-0 select-none text-left">
      {/* Header */}
      <div className="px-4 py-3 border-b border-brand-border bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-deep" />
          <h3 className="font-serif font-bold text-sm text-brand-dark">
            {t.builder.sections}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-brand-muted px-2 py-0.5 rounded bg-brand-bg border border-brand-border">
            {language === 'vi' ? '9 Phần' : '9 Modules'}
          </span>

          {onCloseMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1 text-brand-muted hover:text-brand-dark rounded-md hover:bg-brand-bg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sections List with Independent Scroll */}
      <div className="p-3.5 overflow-y-auto overflow-x-hidden flex-1 space-y-2 text-left">
        <p className="text-[11px] text-brand-muted leading-snug mb-2">
          {t.builder.manageSections}
        </p>

        {sectionsList.map((sec) => {
          const isVisible = invitationConfig.sections[sec.key];

          return (
            <div
              key={sec.key}
              className={clsx(
                'p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2',
                isVisible
                  ? 'bg-white border-brand-border shadow-xs'
                  : 'bg-brand-bg/40 border-brand-border/60 opacity-60'
              )}
            >
              <div className="flex items-center gap-2 min-w-0">
                <GripVertical className="w-3.5 h-3.5 text-brand-muted/40 shrink-0 cursor-grab" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-brand-dark truncate">{sec.label}</p>
                  <p className="text-[10px] text-brand-muted truncate">{sec.description}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggleSection(sec.key)}
                className={clsx(
                  'p-1.5 rounded-lg border transition-colors shrink-0',
                  isVisible
                    ? 'bg-brand-soft/60 text-brand-deep border-brand-primary/30 hover:bg-brand-soft'
                    : 'bg-gray-100 text-gray-400 border-gray-200 hover:bg-gray-200'
                )}
                title={isVisible ? (language === 'vi' ? 'Ẩn phần này' : 'Hide Section') : (language === 'vi' ? 'Hiện phần này' : 'Show Section')}
              >
                {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-3 border-t border-brand-border bg-brand-bg/40 text-center text-[10px] text-brand-muted">
        {t.builder.sectionsOrderNote}
      </div>
    </aside>
  );
};
