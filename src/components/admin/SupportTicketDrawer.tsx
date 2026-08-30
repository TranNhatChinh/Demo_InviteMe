import React, { useState } from 'react';
import { SupportTicket } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, MessageSquare, CheckCircle2, Send, Clock, User, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { TextArea } from '../common/Input';

interface SupportTicketDrawerProps {
  ticket: SupportTicket | null;
  onClose: () => void;
}

export const SupportTicketDrawer: React.FC<SupportTicketDrawerProps> = ({ ticket, onClose }) => {
  const { resolveSupportTicket } = useApp();
  const [replyText, setReplyText] = useState('Hi! We have reviewed your request and verified the records. Everything is running smoothly.');

  if (!ticket) return null;

  const handleResolve = () => {
    resolveSupportTicket(ticket.id, replyText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-brand-dark/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-brand-border bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs">
              {ticket.id.split('-')[1]}
            </div>
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">{ticket.subject}</h3>
              <p className="text-xs text-slate-500">{ticket.userName} • {ticket.userEmail}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-left">
          {/* Metadata */}
          <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Priority</span>
              <span className="font-semibold text-slate-800">{ticket.priority}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Category</span>
              <span className="font-semibold text-slate-800">{ticket.category}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Status</span>
              <span className="font-semibold text-emerald-700">{ticket.status}</span>
            </div>
          </div>

          {/* Conversation history simulation */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Recent Message Thread
            </span>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 font-semibold">
                <span>{ticket.userName} (User)</span>
                <span>{ticket.createdAt}</span>
              </div>
              <p className="text-slate-800 leading-relaxed">
                "{ticket.lastReply}"
              </p>
            </div>
          </div>

          {/* Reply Form */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-800">
              Admin Resolution Note & Dispatch Reply:
            </label>
            <TextArea
              rows={4}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Send className="w-3.5 h-3.5" />}
            onClick={handleResolve}
          >
            Dispatch & Resolve Ticket
          </Button>
        </div>
      </div>
    </div>
  );
};
