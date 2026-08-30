import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Heart, Calendar, MapPin, Sparkles, Share2, Edit3, Clock } from 'lucide-react';
import { Button } from '../common/Button';

export const WeddingHeroCard: React.FC = () => {
  const { wedding, setIsEditWeddingModalOpen, setCurrentView } = useApp();
  const { t, formatDate, language } = useLanguage();

  // Dynamic countdown calculation to wedding date
  const [timeLeft, setTimeLeft] = useState({
    days: 108,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const targetDate = new Date(`${wedding.weddingDate}T${wedding.weddingTime || '17:30'}:00`).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 108, hours: 14, minutes: 32, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [wedding.weddingDate, wedding.weddingTime]);

  const formattedDate = formatDate(wedding.weddingDate, 'medium');

  return (
    <div className="relative rounded-2xl overflow-hidden border border-brand-border/80 shadow-card bg-gradient-to-br from-white via-brand-bg to-brand-blush/60 p-6 sm:p-8 text-left">
      {/* Subtle luxury watermark / background illustration */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none bg-[radial-gradient(#EFA3B5_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left: Couple & Venue Details */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-brand-primary/30 text-xs font-semibold text-brand-deep shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>{wedding.weddingStyle} • {wedding.theme}</span>
          </div>

          <div className="space-y-1">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-brand-dark flex items-center gap-3">
              <span>{wedding.brideName}</span>
              <Heart className="w-6 h-6 text-brand-primary fill-brand-primary shrink-0 animate-pulse-subtle" />
              <span>{wedding.groomName}</span>
            </h1>
            <p className="font-serif italic text-brand-muted text-base sm:text-lg">
              {wedding.hashtag}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-brand-dark pt-1">
            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-brand-border/60">
              <Calendar className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="font-medium">{formattedDate}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-lg border border-brand-border/60">
              <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
              <span className="font-medium">{wedding.receptionVenue.name}</span>
            </div>
          </div>
        </div>

        {/* Right: Live Countdown Clock & Actions */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-5">
          <div className="bg-white/90 backdrop-blur-md p-4 rounded-xl border border-brand-primary/25 shadow-subtle flex items-center gap-3 sm:gap-4">
            <div className="text-center px-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-deep block leading-none">
                {timeLeft.days}
              </span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">
                {t.publicPortal.days}
              </span>
            </div>
            <span className="text-brand-border font-light text-xl">:</span>
            <div className="text-center px-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark block leading-none">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">
                {t.publicPortal.hours}
              </span>
            </div>
            <span className="text-brand-border font-light text-xl">:</span>
            <div className="text-center px-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark block leading-none">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">
                {t.publicPortal.minutes}
              </span>
            </div>
            <span className="text-brand-border font-light text-xl">:</span>
            <div className="text-center px-2">
              <span className="font-serif text-2xl sm:text-3xl font-bold text-brand-accent block leading-none tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">
                {language === 'vi' ? 'Giây' : 'Seconds'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              icon={<Edit3 className="w-3.5 h-3.5" />}
              onClick={() => setIsEditWeddingModalOpen(true)}
            >
              {t.wedding.editWedding}
            </Button>
            <Button
              variant="soft-pink"
              size="sm"
              icon={<Share2 className="w-3.5 h-3.5" />}
              onClick={() => setCurrentView('invitation-design')}
            >
              {t.templates.preview}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
