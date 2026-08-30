import React from 'react';
import { useApp } from '../../context/AppContext';
import { GiftTransaction } from '../../types';
import { X, Gift, Heart, CreditCard, Clock, CheckCircle2, User, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';

interface GiftDetailDrawerProps {
  gift: GiftTransaction | null;
  onClose: () => void;
}

export const GiftDetailDrawer: React.FC<GiftDetailDrawerProps> = ({ gift, onClose }) => {
  if (!gift) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-brand-dark/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-brand-border bg-gradient-to-r from-brand-bg/60 to-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-soft text-brand-deep flex items-center justify-center">
              <Gift className="w-5 h-5 text-brand-accent" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brand-dark">Transaction Details</h3>
              <p className="text-xs text-brand-muted font-mono">{gift.transactionRef}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-brand-muted hover:text-brand-dark hover:bg-brand-bg rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Amount Box */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-brand-bg via-brand-blush/40 to-white border border-brand-primary/30 text-center space-y-1 shadow-card">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
              Monetary Blessing
            </span>
            <div className="font-serif font-bold text-3xl sm:text-4xl text-brand-dark">
              {gift.amountVND.toLocaleString()} <span className="text-base font-sans font-normal text-brand-muted">VND</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold mt-2 border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{gift.status}</span>
            </div>
          </div>

          {/* Guest Identity */}
          <div className="p-4 rounded-2xl bg-brand-bg/40 border border-brand-border space-y-3">
            <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
              Sender Information
            </span>
            <div className="flex items-center gap-3">
              <img
                src={gift.guestAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80'}
                alt=""
                className="w-12 h-12 rounded-full object-cover border border-brand-border"
              />
              <div>
                <h4 className="font-bold text-sm text-brand-dark">{gift.guestName}</h4>
                <p className="text-xs text-brand-muted">{gift.relationship} • {gift.group}</p>
              </div>
            </div>
          </div>

          {/* Heartfelt Message */}
          <div className="p-4 rounded-2xl bg-white border border-brand-border/80 shadow-subtle space-y-2">
            <span className="text-[10px] uppercase font-bold text-brand-muted tracking-wider block">
              Blessing Message
            </span>
            <p className="font-serif italic text-sm text-brand-dark leading-relaxed">
              "{gift.message}"
            </p>
          </div>

          {/* Meta Details */}
          <div className="p-4 rounded-2xl bg-brand-bg/40 border border-brand-border text-xs space-y-2 text-brand-muted">
            <div className="flex justify-between">
              <span>Channel:</span>
              <span className="font-semibold text-brand-dark">{gift.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Recorded Timestamp:</span>
              <span className="font-semibold text-brand-dark">{gift.timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span>Transaction ID:</span>
              <span className="font-mono text-brand-deep font-semibold">{gift.transactionRef}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-brand-border bg-brand-bg/40">
          <Button variant="secondary" className="w-full justify-center" onClick={onClose}>
            Close Ledger
          </Button>
        </div>
      </div>
    </div>
  );
};
