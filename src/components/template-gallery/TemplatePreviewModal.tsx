import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { TemplateItem } from '../../types';
import { Sparkles, Palette, Smartphone, ArrowRight, Heart } from 'lucide-react';

interface TemplatePreviewModalProps {
  template: TemplateItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUseTemplate: (templateId: string) => void;
}

export const TemplatePreviewModal: React.FC<TemplatePreviewModalProps> = ({
  template,
  isOpen,
  onClose,
  onUseTemplate,
}) => {
  if (!template || !isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span className="font-serif text-2xl font-bold text-brand-dark">{template.name}</span>
          {template.badge && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-soft text-brand-deep border border-brand-primary/30">
              {template.badge}
            </span>
          )}
        </div>
      }
      subtitle={`${template.category} Style • ${template.tagline}`}
      maxWidth="2xl"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close Preview
          </Button>
          <Button
            variant="primary"
            icon={<Sparkles className="w-4 h-4" />}
            onClick={() => {
              onUseTemplate(template.id);
              onClose();
            }}
          >
            Customize with This Template
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Phone Preview Mockup */}
        <div className="flex justify-center bg-gradient-to-b from-brand-bg to-brand-blush/40 p-6 rounded-2xl border border-brand-border">
          <div className="w-72 sm:w-80 rounded-[36px] bg-brand-dark p-3 shadow-modal border-4 border-brand-dark">
            <div className="w-full bg-white rounded-[28px] overflow-hidden flex flex-col text-center space-y-4 pb-6">
              {/* Phone Speaker & Notch */}
              <div className="pt-2 flex justify-center">
                <div className="w-20 h-3 bg-brand-dark/20 rounded-full" />
              </div>

              <div className="relative h-48 overflow-hidden">
                <img
                  src={template.previewImage}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-0 right-0 text-white">
                  <span className="text-[9px] uppercase tracking-widest text-brand-soft">Wedding Invitation</span>
                  <h4 className="font-serif text-xl font-bold">Emily & James</h4>
                </div>
              </div>

              <div className="px-4 space-y-2">
                <p className="text-[11px] text-brand-muted italic">"Two souls, one beautiful journey."</p>
                <div className="py-2 border-y border-brand-border/60 text-xs">
                  <p className="font-semibold text-brand-dark">December 14, 2026</p>
                  <p className="text-[10px] text-brand-muted">The Reverie Saigon</p>
                </div>
                <button
                  type="button"
                  className="w-full py-2 rounded-xl text-white text-xs font-semibold shadow-xs"
                  style={{ backgroundColor: template.primaryColor }}
                >
                  Joyfully RSVP
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-brand-bg/50 border border-brand-border space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">Typography Pairing</span>
            <p className="font-medium text-brand-dark">{template.fontPair}</p>
          </div>
          <div className="p-3.5 rounded-xl bg-brand-bg/50 border border-brand-border space-y-1">
            <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider">Palette Harmonies</span>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: template.primaryColor }} />
              <span className="w-4 h-4 rounded-full border border-white shadow-xs" style={{ backgroundColor: template.accentColor }} />
              <span className="text-xs text-brand-dark font-medium">{template.primaryColor} / {template.accentColor}</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
