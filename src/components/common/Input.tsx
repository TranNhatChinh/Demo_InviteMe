import React, { forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Search, X } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  icon,
  iconPosition = 'left',
  className,
  containerClassName,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? `input-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={twMerge('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-semibold text-brand-dark tracking-wide flex items-center justify-between">
          <span>{label}</span>
          {props.required && <span className="text-brand-accent text-xs">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && iconPosition === 'left' && (
          <div className="absolute left-3 text-brand-muted pointer-events-none flex items-center">
            {icon}
          </div>
        )}
        <input
          id={inputId}
          ref={ref}
          className={twMerge(
            clsx(
              'w-full bg-white border border-brand-border text-brand-dark text-sm rounded-md px-3.5 py-2.5 transition-all duration-150',
              'placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20',
              'disabled:bg-brand-bg disabled:text-brand-muted disabled:cursor-not-allowed',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-brand-error focus:border-brand-error focus:ring-brand-error/20',
              className
            )
          )}
          {...props}
        />
        {icon && iconPosition === 'right' && (
          <div className="absolute right-3 text-brand-muted pointer-events-none flex items-center">
            {icon}
          </div>
        )}
      </div>
      {error ? (
        <span className="text-xs text-brand-error font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-brand-muted">{helperText}</span>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  containerClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Search guests by name, email, table...',
  containerClassName,
  className,
  ...props
}) => {
  return (
    <div className={twMerge('relative flex items-center w-full', containerClassName)}>
      <Search className="w-4 h-4 text-brand-muted absolute left-3.5 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={twMerge(
          clsx(
            'w-full bg-white/90 border border-brand-border text-brand-dark text-sm rounded-md pl-10 pr-9 py-2 transition-all',
            'placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 shadow-subtle',
            className
          )
        )}
        {...props}
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-3 text-brand-muted hover:text-brand-dark p-0.5 rounded-full hover:bg-brand-bg transition-colors"
          title="Clear search"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  options,
  className,
  containerClassName,
  id,
  ...props
}, ref) => {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={twMerge('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={selectId} className="text-xs font-semibold text-brand-dark tracking-wide">
          {label}
        </label>
      )}
      <select
        id={selectId}
        ref={ref}
        className={twMerge(
          clsx(
            'w-full bg-white border border-brand-border text-brand-dark text-sm rounded-md px-3.5 py-2.5 transition-all',
            'focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 cursor-pointer',
            error && 'border-brand-error focus:border-brand-error focus:ring-brand-error/20',
            className
          )
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-xs text-brand-error">{error}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  containerClassName?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
  label,
  error,
  helperText,
  className,
  containerClassName,
  id,
  ...props
}, ref) => {
  const areaId = id || (label ? `area-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <div className={twMerge('w-full flex flex-col gap-1.5', containerClassName)}>
      {label && (
        <label htmlFor={areaId} className="text-xs font-semibold text-brand-dark tracking-wide">
          {label}
        </label>
      )}
      <textarea
        id={areaId}
        ref={ref}
        rows={3}
        className={twMerge(
          clsx(
            'w-full bg-white border border-brand-border text-brand-dark text-sm rounded-md px-3.5 py-2.5 transition-all resize-none',
            'placeholder:text-brand-muted/60 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20',
            error && 'border-brand-error focus:border-brand-error',
            className
          )
        )}
        {...props}
      />
      {error ? (
        <span className="text-xs text-brand-error">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-brand-muted">{helperText}</span>
      ) : null}
    </div>
  );
});

TextArea.displayName = 'TextArea';
