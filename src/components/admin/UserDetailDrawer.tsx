import React from 'react';
import { AdminUser } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, User, Mail, Shield, Calendar, Heart, ShieldAlert, CheckCircle2, Ban } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

interface UserDetailDrawerProps {
  user: AdminUser | null;
  onClose: () => void;
}

export const UserDetailDrawer: React.FC<UserDetailDrawerProps> = ({ user, onClose }) => {
  const { updateAdminUserStatus } = useApp();

  if (!user) return null;

  const handleToggleSuspend = () => {
    const nextStatus = user.status === 'Suspended' ? 'Active' : 'Suspended';
    updateAdminUserStatus(user.id, nextStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-brand-dark/40 backdrop-blur-xs flex justify-end animate-fade-in">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="p-6 border-b border-brand-border bg-gradient-to-r from-slate-50 to-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
            <div>
              <h3 className="font-sans font-bold text-base text-slate-900">{user.name}</h3>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
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
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Status & Plan banner */}
          <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Account Role
              </span>
              <span className="font-semibold text-xs text-slate-800">{user.role}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
                Subscription Plan
              </span>
              <span className="font-semibold text-xs text-brand-deep">{user.plan}</span>
            </div>
          </div>

          {/* Account Metrics */}
          <div className="space-y-3">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Platform Footprint
            </span>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Created Date:</span>
                <span className="font-semibold text-slate-800">{user.createdAt}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Last Active:</span>
                <span className="font-semibold text-slate-800">{user.lastActive}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Managed Weddings:</span>
                <span className="font-bold text-brand-deep">{user.weddingsCount}</span>
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">
              Account Security Status
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  user.status === 'Active'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {user.status === 'Active' ? (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                ) : (
                  <Ban className="w-3.5 h-3.5" />
                )}
                <span>{user.status}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <Button
            variant={user.status === 'Suspended' ? 'primary' : 'danger'}
            size="sm"
            className="flex-1 justify-center"
            onClick={handleToggleSuspend}
          >
            {user.status === 'Suspended' ? 'Reactivate Account' : 'Suspend Account'}
          </Button>

          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
