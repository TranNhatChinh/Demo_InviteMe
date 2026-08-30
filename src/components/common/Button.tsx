import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'soft-pink' | 'outline-rose';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-md gap-1.5',
    md: 'text-sm px-4 py-2 rounded-md gap-2',
    lg: 'text-base px-5 py-2.5 rounded-lg gap-2.5',
    icon: 'p-2 rounded-md aspect-square',
  };

  const variantStyles = {
    primary: 'bg-brand-primary hover:bg-brand-accent text-white shadow-sm hover:shadow-card font-semibold',
    secondary: 'bg-white hover:bg-brand-bg text-brand-dark border border-brand-border hover:border-brand-primary/40 shadow-subtle',
    ghost: 'bg-transparent hover:bg-brand-soft/40 text-brand-muted hover:text-brand-dark',
    'soft-pink': 'bg-brand-soft/80 hover:bg-brand-soft text-brand-deep border border-brand-soft hover:border-brand-primary/30 font-medium',
    'outline-rose': 'bg-transparent hover:bg-brand-soft/30 text-brand-accent border border-brand-accent/50 hover:border-brand-accent',
    danger: 'bg-brand-error/10 hover:bg-brand-error text-brand-error hover:text-white border border-brand-error/20',
  };

  return (
    <button
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
};
