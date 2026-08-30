import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminTemplateData } from '../../types';
import { AdminTemplateEditorModal } from './AdminTemplateEditorModal';
import { Button } from '../common/Button';
import { Palette, Edit2, Eye, CheckCircle2, AlertCircle, Star, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export const TemplateManagement: React.FC = () => {
  const { adminTemplates, toggleAdminTemplateStatus, setCurrentView } = useApp();
  const [editingTemplate, setEditingTemplate] = useState<AdminTemplateData | null>(null);

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Palette className="w-3.5 h-3.5 text-slate-600" />
            <span>Design Catalog Management</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Template Catalog & Publishing Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Manage bespoke design templates, usage velocity, and live catalog publishing.
          </p>
        </div>
      </div>

      {/* Grid of Template Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden flex flex-col justify-between group hover:border-slate-300 transition-colors"
          >
            {/* Image Preview */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={tpl.thumbnail}
                alt={tpl.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {tpl.category}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span
                  className={clsx(
                    'px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs',
                    tpl.status === 'Published'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  )}
                >
                  {tpl.status}
                </span>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg text-slate-900">{tpl.name}</h3>
                  <p className="text-xs text-slate-500">Published {tpl.createdAt}</p>
                </div>

                <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span>{tpl.rating}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between text-xs font-semibold">
                <span className="text-slate-500">Live Couple Adoptions:</span>
                <span className="font-mono text-brand-deep font-bold">{tpl.usageCount.toLocaleString()} Uses</span>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => toggleAdminTemplateStatus(tpl.id)}
                  className={clsx(
                    'px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors',
                    tpl.status === 'Published'
                      ? 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      : 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700'
                  )}
                >
                  {tpl.status === 'Published' ? 'Unpublish' : 'Publish to Catalog'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditingTemplate(tpl)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Editor Modal */}
      <AdminTemplateEditorModal
        isOpen={!!editingTemplate}
        onClose={() => setEditingTemplate(null)}
        template={editingTemplate}
      />
    </div>
  );
};
