import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ModerationItem } from '../../types';
import { ShieldAlert, Check, EyeOff, Trash2, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';

export const ContentModeration: React.FC = () => {
  const { moderationItems, moderateContentItem } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | 'wishes' | 'notes'>('all');

  const filtered = moderationItems.filter((item) => {
    if (activeTab === 'wishes') return item.contentType === 'Wish';
    if (activeTab === 'notes') return item.contentType === 'Custom Note';
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span>Automated Trust & Safety Queue</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Content Moderation Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Review reported guest blessings, inappropriate language flags, and spam.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {[
          { id: 'all', label: 'All Reports' },
          { id: 'wishes', label: 'Reported Wishes' },
          { id: 'notes', label: 'Seating & Table Notes' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={clsx(
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all',
              activeTab === t.id
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Moderation Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
                <th className="py-3.5 px-4">Flagged Content</th>
                <th className="py-3.5 px-4">Author</th>
                <th className="py-3.5 px-4">Reporter</th>
                <th className="py-3.5 px-4">Violation Reason</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 max-w-sm">
                    <p className="font-semibold text-slate-900 truncate">"{item.content}"</p>
                    <span className="text-[10px] text-slate-400 font-mono">{item.contentType}</span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.authorName}
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {item.reporterName}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {item.reason}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded text-[10px] font-bold border',
                        item.status === 'Pending'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : item.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      )}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => moderateContentItem(item.id, 'Approved')}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors flex items-center gap-1 border border-emerald-200"
                        title="Approve Content"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => moderateContentItem(item.id, 'Hidden')}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors flex items-center gap-1 border border-slate-300"
                        title="Hide Content"
                      >
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>Hide</span>
                      </button>

                      <button
                        onClick={() => moderateContentItem(item.id, 'Removed')}
                        className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Permanently Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
