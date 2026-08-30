import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { AdminWedding } from '../../types';
import { SearchInput } from '../common/Input';
import { Button } from '../common/Button';
import { Heart, Calendar, Users, ExternalLink, Ban, CheckCircle2, Sliders } from 'lucide-react';
import { clsx } from 'clsx';

export const WeddingManagement: React.FC = () => {
  const { adminWeddings, updateAdminWeddingStatus, setCurrentView } = useApp();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return adminWeddings.filter((w) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        return w.title.toLowerCase().includes(q) || w.coupleNames.toLowerCase().includes(q);
      }
      return true;
    });
  }, [adminWeddings, search]);

  const handleOpenCoupleView = () => {
    setCurrentView('dashboard');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Heart className="w-3.5 h-3.5 text-brand-deep" />
            <span>Multi-Tenant Wedding Registry</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Weddings Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Oversee 2,341 active weddings, invitation configurations, and RSVP health.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="text-xs text-slate-500 font-semibold">
          Displaying {filtered.length} of 2,341 Weddings
        </div>

        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search by wedding or couple name..."
          className="sm:w-72"
        />
      </div>

      {/* Weddings Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
                <th className="py-3.5 px-4">Wedding Title</th>
                <th className="py-3.5 px-4">Couple</th>
                <th className="py-3.5 px-4">Wedding Date</th>
                <th className="py-3.5 px-4">Guest Count</th>
                <th className="py-3.5 px-4">Plan</th>
                <th className="py-3.5 px-4">RSVP Rate</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filtered.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {w.title}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {w.coupleNames}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {w.date}
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-900">
                    {w.guestsCount} Guests
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-soft text-brand-deep border border-brand-primary/20">
                      {w.plan}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-emerald-700">
                    {w.rsvpRate}%
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border',
                        w.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      )}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{w.status}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={handleOpenCoupleView}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1 shadow-xs"
                        title="Teleport to Couple Dashboard"
                      >
                        <span>Manage</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>

                      <button
                        onClick={() => updateAdminWeddingStatus(w.id, w.status === 'Active' ? 'Suspended' : 'Active')}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Toggle status"
                      >
                        <Ban className="w-3.5 h-3.5" />
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
