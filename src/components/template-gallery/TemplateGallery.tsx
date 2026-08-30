import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { TemplateCategory, TemplateItem } from '../../types';
import { TemplatePreviewModal } from './TemplatePreviewModal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import {
  Palette,
  Sparkles,
  Eye,
  CheckCircle2,
  Heart,
  Sliders,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { clsx } from 'clsx';

export const TemplateGallery: React.FC = () => {
  const { templates, invitationConfig, applyTemplate, setCurrentView } = useApp();
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory>('All');
  const [previewingTemplate, setPreviewingTemplate] = useState<TemplateItem | null>(null);

  const categories: { key: TemplateCategory; label: string }[] = [
    { key: 'All', label: t.templates.categories.all },
    { key: 'Modern', label: t.templates.categories.modern },
    { key: 'Classic', label: t.templates.categories.classic },
    { key: 'Minimal', label: t.templates.categories.minimal },
    { key: 'Romantic', label: t.templates.categories.romantic },
    { key: 'Luxury', label: t.templates.categories.luxury },
    { key: 'Traditional', label: t.templates.categories.traditional },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    if (selectedCategory === 'All') return true;
    return tpl.category === selectedCategory;
  });

  const handleUseTemplate = (id: string) => {
    applyTemplate(id);
    setCurrentView('invitation-builder');
  };

  const translateTemplateDesc = (desc: string) => {
    if (language !== 'vi') return desc;
    if (desc.includes('Editorial serif titles')) return 'Tiêu đề kiểu chữ sang trọng kết hợp màu hồng phấn và điểm nhấn vàng champagne.';
    if (desc.includes('Crisp minimalism')) return 'Phong cách tối giản thanh lịch, bố cục thoáng đãng và đường nét tinh tế.';
    if (desc.includes('Timeless black-tie elegance')) return 'Nét đẹp tiệc cưới quý phái vượt thời gian với hoa văn chìm tinh xảo.';
    if (desc.includes('Ethereal floral arches')) return 'Vòm hoa bay bổng, màu sắc lãng mạn cho hôn lễ sân vườn ngoài trời.';
    if (desc.includes('Gilded gold borders')) return 'Viền vàng ánh kim vương giả, nhung đỏ sâu thẳm cho đám cưới khách sạn 5 sao.';
    if (desc.includes('Heritage East Asian')) return 'Họa tiết truyền thống Á Đông kết hợp phom dáng hiện đại sang trọng.';
    return desc;
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Palette className="w-3 h-3 text-brand-accent" />
            <span>{language === 'vi' ? 'Bộ sưu tập thiết kế' : 'Invitation Design Suite'}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.templates.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.templates.subtitle}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Sliders className="w-4 h-4" />}
          onClick={() => setCurrentView('invitation-builder')}
        >
          {t.nav.invitationBuilder}
        </Button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCategory(cat.key)}
            className={clsx(
              'px-4 py-2 rounded-full text-xs font-medium transition-all duration-150 shrink-0 border select-none',
              selectedCategory === cat.key
                ? 'bg-brand-deep text-white border-brand-deep shadow-xs font-semibold'
                : 'bg-white text-brand-muted border-brand-border hover:bg-brand-bg hover:text-brand-dark'
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((tpl) => {
          const isActive = invitationConfig.templateId === tpl.id;

          return (
            <div
              key={tpl.id}
              className={clsx(
                'group bg-white rounded-3xl overflow-hidden border shadow-card hover:shadow-hover transition-all duration-300 flex flex-col justify-between',
                isActive ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-brand-border/80'
              )}
            >
              {/* Cover Image & Overlays */}
              <div className="relative h-64 overflow-hidden bg-brand-dark">
                <img
                  src={tpl.coverImage}
                  alt={tpl.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-brand-dark shadow-xs">
                    {categories.find(c => c.key === tpl.category)?.label || tpl.category}
                  </span>
                  {tpl.badge && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-primary to-brand-accent text-white shadow-xs">
                      {tpl.badge === 'Popular' ? t.templates.popularBadge : (tpl.badge === 'Trending' ? t.templates.trendingBadge : (tpl.badge === 'Luxury' ? t.templates.luxuryBadge : tpl.badge))}
                    </span>
                  )}
                </div>

                {/* Active Indicator */}
                {isActive && (
                  <div className="absolute bottom-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-semibold shadow-card">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {language === 'vi' ? 'Đang dùng trên thiệp' : 'Active in Builder'}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-brand-dark group-hover:text-brand-deep transition-colors">
                      {tpl.name}
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: tpl.primaryColor }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border border-white shadow-xs"
                        style={{ backgroundColor: tpl.accentColor }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-brand-muted leading-relaxed font-light">
                    {translateTemplateDesc(tpl.description)}
                  </p>
                </div>

                {/* Footer Buttons */}
                <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-brand-border/60">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="justify-center"
                    icon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => setPreviewingTemplate(tpl)}
                  >
                    {t.templates.preview}
                  </Button>

                  <Button
                    variant={isActive ? 'soft-pink' : 'primary'}
                    size="sm"
                    className="justify-center"
                    onClick={() => handleUseTemplate(tpl.id)}
                  >
                    {isActive ? (language === 'vi' ? 'Đang dùng' : 'In Use') : t.templates.useTemplate}
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <TemplatePreviewModal
        template={previewingTemplate}
        isOpen={!!previewingTemplate}
        onClose={() => setPreviewingTemplate(null)}
        onUseTemplate={handleUseTemplate}
      />
    </div>
  );
};
