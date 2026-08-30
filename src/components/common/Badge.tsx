import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { RSVPStatus, CheckInStatus, InvitationStatus, GuestGroup } from '../../types';
import { useLanguage } from '../../i18n/LanguageContext';

export interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'confirmed' | 'pending' | 'declined' | 'maybe' | 'checked-in' | 'vip' | 'opened' | 'sent' | 'neutral' | 'group';
  status?: RSVPStatus | CheckInStatus | InvitationStatus | GuestGroup | string;
  size?: 'sm' | 'md';
  className?: string;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant,
  status,
  size = 'md',
  className,
  dot = true,
}) => {
  const { translateStatus, translateGroup } = useLanguage();

  // Infer variant from status string if not explicitly passed
  let resolvedVariant = variant;
  if (!resolvedVariant && status) {
    switch (status) {
      case 'Confirmed':
        resolvedVariant = 'confirmed';
        break;
      case 'Pending':
        resolvedVariant = 'pending';
        break;
      case 'Declined':
        resolvedVariant = 'declined';
        break;
      case 'Maybe':
        resolvedVariant = 'maybe';
        break;
      case 'Checked-in':
        resolvedVariant = 'checked-in';
        break;
      case 'VIP':
        resolvedVariant = 'vip';
        break;
      case 'Opened':
        resolvedVariant = 'opened';
        break;
      case 'Sent':
        resolvedVariant = 'sent';
        break;
      case 'Family':
      case 'Friends':
      case 'Colleagues':
        resolvedVariant = 'group';
        break;
      default:
        resolvedVariant = 'neutral';
    }
  }

  const variantStyles = {
    confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    pending: 'bg-amber-50 text-amber-700 border-amber-200/80',
    declined: 'bg-rose-50 text-rose-700 border-rose-200/80',
    maybe: 'bg-purple-50 text-purple-700 border-purple-200/80',
    'checked-in': 'bg-sky-50 text-sky-700 border-sky-200/80',
    vip: 'bg-gradient-to-r from-amber-50 to-rose-50 text-brand-deep border-brand-primary/40 font-semibold',
    opened: 'bg-brand-soft/60 text-brand-deep border-brand-primary/20',
    sent: 'bg-gray-50 text-gray-600 border-gray-200',
    group: 'bg-brand-bg text-brand-muted border-brand-border font-medium',
    neutral: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  const dotColors = {
    confirmed: 'bg-emerald-500',
    pending: 'bg-amber-500',
    declined: 'bg-rose-500',
    maybe: 'bg-purple-500',
    'checked-in': 'bg-sky-500',
    vip: 'bg-brand-accent animate-pulse',
    opened: 'bg-brand-primary',
    sent: 'bg-gray-400',
    group: 'bg-brand-muted',
    neutral: 'bg-gray-400',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 rounded-full font-medium gap-1.5',
    md: 'text-xs px-2.5 py-1 rounded-full font-medium gap-1.5',
  };

  const currentVariant = resolvedVariant || 'neutral';

  const renderedContent = children || (status ? (
    ['Family', 'Friends', 'Colleagues', 'VIP'].includes(status)
      ? translateGroup(status)
      : translateStatus(status)
  ) : '');

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center border select-none transition-colors',
          sizeStyles[size],
          variantStyles[currentVariant],
          className
        )
      )}
    >
      {dot && (
        <span
          className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[currentVariant])}
        />
      )}
      {renderedContent}
    </span>
  );
};
