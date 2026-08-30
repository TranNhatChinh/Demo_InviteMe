import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SupportTicket } from '../../types';
import { SupportTicketDrawer } from './SupportTicketDrawer';
import { SearchInput } from '../common/Input';
import { Button } from '../common/Button';
import { LifeBuoy, Clock, CheckCircle2, MessageSquare, AlertCircle, Eye, Send } from 'lucide-react';
import { clsx } from 'clsx';

export const SupportDesk: React.FC = () => {
  const { supportTickets } = useApp();
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = supportTickets.filter((t) => {
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!t.subject.toLowerCase().includes(q) && !t.userName.toLowerCase().includes(q)) {
        return false;
      }
    }
    if (statusFilter !== 'All' && t.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <LifeBuoy className="w-3.5 h-3.5 text-slate-600" />
            <span>Concierge Service Desk</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Support Ticket Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Resolve user inquiries, seating import issues, and custom domain verifications.
          </p>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-700">Open Tickets</span>
            <div className="font-sans text-3xl font-bold text-slate-900">24</div>
            <p className="text-[11px] text-slate-400">Average first reply: 12 min</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">In Progress</span>
            <div className="font-sans text-3xl font-bold text-slate-900">12</div>
            <p className="text-[11px] text-slate-400">Assigned to engineers</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Resolved</span>
            <div className="font-sans text-3xl font-bold text-slate-900">248</div>
            <p className="text-[11px] text-emerald-700 font-medium">98.4% CSAT rating</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'Open', 'In Progress', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={clsx(
                'px-3 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 border select-none',
                statusFilter === st
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              )}
            >
              {st}
            </button>
          ))}
        </div>

        <SearchInput
          value={search}
          onChange={(val) => setSearch(val)}
          placeholder="Search by subject or user..."
          className="sm:w-72"
        />
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider select-none">
                <th className="py-3.5 px-4">Ticket ID</th>
                <th className="py-3.5 px-4">User Account</th>
                <th className="py-3.5 px-4">Subject</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Created</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filtered.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                    {ticket.id}
                  </td>

                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    {ticket.userName}
                  </td>

                  <td className="py-3.5 px-4 max-w-xs truncate text-slate-700 font-medium">
                    {ticket.subject}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={clsx(
                        'px-2 py-0.5 rounded text-[10px] font-bold border',
                        ticket.priority === 'High'
                          ? 'bg-rose-100 text-rose-800 border-rose-200'
                          : ticket.priority === 'Medium'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-slate-100 text-slate-800 border-slate-200'
                      )}
                    >
                      {ticket.priority}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={clsx(
                        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border',
                        ticket.status === 'Resolved'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          : ticket.status === 'In Progress'
                          ? 'bg-amber-100 text-amber-800 border-amber-200'
                          : 'bg-rose-100 text-rose-800 border-rose-200'
                      )}
                    >
                      {ticket.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {ticket.createdAt}
                  </td>

                  <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedTicket(ticket)}
                      className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors inline-flex items-center gap-1 shadow-xs"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Resolver Drawer */}
      <SupportTicketDrawer
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
};
