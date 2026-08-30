import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Language, Translations, translations } from './translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  formatDate: (dateString: string | Date, formatType?: 'full' | 'medium' | 'short' | 'time') => string;
  formatCurrency: (amountVND: number) => string;
  formatNumber: (num: number) => string;
  translateRelationship: (rel: string) => string;
  translateStatus: (status: string) => string;
  translateGroup: (group: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_LANG = 'inviteme-language';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_LANG);
      if (saved === 'en' || saved === 'vi') {
        return saved;
      }
      // Auto-detect browser language: if starts with 'vi', default to Vietnamese
      if (typeof navigator !== 'undefined' && navigator.language && navigator.language.toLowerCase().startsWith('vi')) {
        return 'vi';
      }
    } catch {}
    return 'en';
  });

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_LANG, newLang);
      document.documentElement.lang = newLang;
    } catch {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  const t = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  // Locale-aware date formatter
  const formatDate = useCallback((dateInput: string | Date, formatType: 'full' | 'medium' | 'short' | 'time' = 'medium') => {
    if (!dateInput) return '';
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    const locale = language === 'vi' ? 'vi-VN' : 'en-US';

    if (formatType === 'full') {
      return date.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }

    if (formatType === 'time') {
      return date.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
      });
    }

    if (formatType === 'short') {
      return date.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    return date.toLocaleDateString(locale, {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }, [language]);

  // Locale-aware currency formatter
  const formatCurrency = useCallback((amountVND: number) => {
    if (amountVND === undefined || amountVND === null) return '0 ₫';
    if (language === 'vi') {
      return `${amountVND.toLocaleString('vi-VN')} ₫`;
    }
    return `${amountVND.toLocaleString('en-US')} VND`;
  }, [language]);

  // Locale-aware number formatter
  const formatNumber = useCallback((num: number) => {
    if (num === undefined || num === null) return '0';
    const locale = language === 'vi' ? 'vi-VN' : 'en-US';
    return num.toLocaleString(locale);
  }, [language]);

  // Dynamic semantic relationship translator
  const translateRelationship = useCallback((rel: string) => {
    if (!rel) return '';
    const dict = t.guests.relationships;
    const lower = rel.toLowerCase().trim();

    if (lower.includes("bride's friend") || lower.includes("bạn của cô dâu")) return dict.bride_friend;
    if (lower.includes("groom's friend") || lower.includes("bạn của chú rể")) return dict.groom_friend;
    if (lower.includes("bride's sister") || lower.includes("em gái cô dâu") || lower.includes("chị gái cô dâu")) return dict.bride_sister;
    if (lower === "vip" || lower.includes("vip partner") || lower.includes("khách vip")) return dict.vip;
    if (lower.includes("family") || lower.includes("gia đình") || lower.includes("họ hàng")) return dict.family;
    if (lower.includes("colleague") || lower.includes("đồng nghiệp")) return dict.colleague;
    if (lower.includes("cousin") || lower.includes("anh chị em họ")) return dict.cousin;
    if (lower.includes("walk-in") || lower.includes("vãng lai")) return dict.walkin;
    if (lower.includes("friend") || lower.includes("bạn")) return dict.friend;

    return rel;
  }, [t]);

  // Dynamic semantic status translator
  const translateStatus = useCallback((status: string) => {
    if (!status) return '';
    const dict = t.guests.statuses;
    const lower = status.toLowerCase().trim();

    if (lower === 'confirmed' || lower === 'đã xác nhận') return dict.confirmed;
    if (lower === 'pending' || lower === 'đang chờ') return dict.pending;
    if (lower === 'declined' || lower === 'từ chối') return dict.declined;
    if (lower === 'maybe' || lower === 'có thể') return dict.maybe;
    if (lower === 'checked-in' || lower === 'đã check-in') return dict.checkedIn;
    if (lower === 'not checked-in' || lower === 'chưa check-in') return dict.notCheckedIn;
    if (lower === 'sent' || lower === 'đã gửi') return dict.sent;
    if (lower === 'opened' || lower === 'đã mở') return dict.opened;
    if (lower === 'delivered' || lower === 'đã nhận') return dict.delivered;
    if (lower === 'draft' || lower === 'bản nháp') return dict.draft;

    return status;
  }, [t]);

  // Dynamic semantic group translator
  const translateGroup = useCallback((group: string) => {
    if (!group) return '';
    const dict = t.guests.groups;
    const lower = group.toLowerCase().trim();

    if (lower === 'family' || lower === 'gia đình') return dict.family;
    if (lower === 'friends' || lower === 'bạn bè') return dict.friends;
    if (lower === 'colleagues' || lower === 'đồng nghiệp') return dict.colleagues;
    if (lower === 'vip') return dict.vip;

    return group;
  }, [t]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        formatDate,
        formatCurrency,
        formatNumber,
        translateRelationship,
        translateStatus,
        translateGroup,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
