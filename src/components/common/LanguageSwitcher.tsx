import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';

interface LanguageSwitcherProps {
  variant?: 'header' | 'compact' | 'pill';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧', display: 'English' },
    { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳', display: 'Tiếng Việt' },
  ];

  const current = languages.find((l) => l.code === language) || languages[0];

  if (variant === 'pill') {
    return (
      <div className={clsx('flex items-center gap-1 bg-white/20 backdrop-blur-md p-1 rounded-full border border-white/30 text-xs font-semibold', className)}>
        <button
          onClick={() => setLanguage('en')}
          className={clsx(
            'px-2.5 py-0.5 rounded-full transition-all',
            language === 'en' ? 'bg-white text-brand-dark shadow-xs font-bold' : 'text-white/80 hover:text-white'
          )}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('vi')}
          className={clsx(
            'px-2.5 py-0.5 rounded-full transition-all',
            language === 'vi' ? 'bg-white text-brand-dark shadow-xs font-bold' : 'text-white/80 hover:text-white'
          )}
        >
          VI
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={clsx('flex items-center gap-1 bg-brand-bg p-1 rounded-xl border border-brand-border text-xs font-semibold', className)}>
        <button
          onClick={() => setLanguage('en')}
          className={clsx(
            'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1',
            language === 'en'
              ? 'bg-white text-brand-deep shadow-xs font-bold'
              : 'text-brand-muted hover:text-brand-dark'
          )}
        >
          <span>🇬🇧</span>
          <span>EN</span>
        </button>
        <button
          onClick={() => setLanguage('vi')}
          className={clsx(
            'px-2.5 py-1 rounded-lg transition-all flex items-center gap-1',
            language === 'vi'
              ? 'bg-white text-brand-deep shadow-xs font-bold'
              : 'text-brand-muted hover:text-brand-dark'
          )}
        >
          <span>🇻🇳</span>
          <span>VI</span>
        </button>
      </div>
    );
  }

  return (
    <div className={clsx('relative select-none', className)} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-brand-border bg-brand-bg/50 hover:bg-brand-bg text-brand-dark text-xs font-medium transition-all shadow-xs"
        title="Switch Language / Chọn ngôn ngữ"
      >
        <Globe className="w-3.5 h-3.5 text-brand-deep shrink-0" />
        <span className="hidden sm:inline font-semibold">{current.display}</span>
        <span className="sm:hidden font-bold uppercase">{language}</span>
        <ChevronDown className="w-3 h-3 text-brand-muted shrink-0" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-white rounded-xl shadow-modal border border-brand-border overflow-hidden z-50 animate-fade-in p-1 space-y-0.5">
          <div className="px-3 py-1.5 text-[10px] font-bold text-brand-muted uppercase tracking-wider border-b border-brand-border/60">
            Language / Ngôn ngữ
          </div>

          {languages.map((lang) => {
            const isSelected = language === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as any);
                  setIsOpen(false);
                }}
                className={clsx(
                  'w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left',
                  isSelected
                    ? 'bg-brand-soft/70 text-brand-deep font-semibold'
                    : 'text-brand-dark hover:bg-brand-bg'
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-deep" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
