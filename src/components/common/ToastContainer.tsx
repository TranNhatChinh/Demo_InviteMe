import React from 'react';
import { useToast, ToastType } from '../../context/ToastContext';
import { CheckCircle2, AlertCircle, Info, Heart, X, Sparkles } from 'lucide-react';
import { clsx } from 'clsx';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-emerald-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'wedding':
        return <Sparkles className="w-5 h-5 text-brand-deep animate-pulse" />;
      case 'info':
      default:
        return <Info className="w-5 h-5 text-brand-accent" />;
    }
  };

  const getBorderAndBg = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 bg-white/95 shadow-[0_8px_30px_rgba(79,168,122,0.15)]';
      case 'error':
        return 'border-rose-200 bg-white/95 shadow-[0_8px_30px_rgba(217,93,105,0.15)]';
      case 'warning':
        return 'border-amber-200 bg-white/95 shadow-[0_8px_30px_rgba(244,162,97,0.15)]';
      case 'wedding':
        return 'border-brand-soft bg-gradient-to-r from-white via-brand-bg to-brand-blush shadow-pinkGlow';
      case 'info':
      default:
        return 'border-brand-border bg-white/95 shadow-card';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={clsx(
            'pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 animate-fade-in',
            getBorderAndBg(toast.type)
          )}
        >
          <div className="shrink-0 mt-0.5">{getIcon(toast.type)}</div>
          <div className="flex-1 space-y-0.5">
            <h4 className="text-sm font-semibold text-brand-dark flex items-center gap-1.5">
              {toast.title}
              {toast.type === 'wedding' && <Heart className="w-3.5 h-3.5 fill-brand-primary text-brand-primary inline" />}
            </h4>
            {toast.message && <p className="text-xs text-brand-muted leading-relaxed">{toast.message}</p>}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-brand-muted hover:text-brand-dark p-1 rounded-md hover:bg-brand-soft/30 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
