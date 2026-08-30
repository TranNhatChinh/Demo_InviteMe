import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { RSVPStatus } from '../../types';
import { QRGuestPassModal } from './QRGuestPassModal';
import { PublicGiftModal } from '../engagement/PublicGiftModal';
import { LeaveWishModal } from '../engagement/LeaveWishModal';
import { Button } from '../common/Button';
import { Input, TextArea } from '../common/Input';
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Utensils,
  Share2,
  ExternalLink,
  ChevronDown,
  Gift,
  QrCode,
  ArrowLeft,
  CheckCircle2,
  UserCheck,
  Send,
  Camera,
  MessageSquareHeart,
  Copy,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx } from 'clsx';
import { useToast } from '../../context/ToastContext';

export const GuestWeddingPortal: React.FC = () => {
  const {
    wedding,
    guests,
    activeGuestForPublicView,
    setActiveGuestForPublicView,
    setCurrentView,
    submitPublicRSVP,
    invitationConfig,
  } = useApp();

  const { t, formatDate, formatNumber, language } = useLanguage();
  const { showToast } = useToast();

  const currentGuest = guests.find(
    (g) => g.id === activeGuestForPublicView || g.personalizedSlug === activeGuestForPublicView
  ) || guests[0];

  // RSVP Form State
  const [rsvpChoice, setRsvpChoice] = useState<RSVPStatus>(currentGuest.rsvpStatus || 'Confirmed');
  const [attendeesCount, setAttendeesCount] = useState<number>(currentGuest.companions ? currentGuest.companions + 1 : 1);
  const [dietary, setDietary] = useState<string>(currentGuest.dietaryNotes || 'None');
  const [wishNote, setWishNote] = useState<string>(currentGuest.wishMessage || '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(currentGuest.rsvpStatus !== 'Pending');
  const [isPassOpen, setIsPassOpen] = useState<boolean>(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState<boolean>(false);
  const [isWishModalOpen, setIsWishModalOpen] = useState<boolean>(false);

  useEffect(() => {
    setRsvpChoice(currentGuest.rsvpStatus === 'Pending' ? 'Confirmed' : currentGuest.rsvpStatus);
    setAttendeesCount(currentGuest.companions ? currentGuest.companions + 1 : 1);
    setDietary(currentGuest.dietaryNotes || 'None');
    setWishNote(currentGuest.wishMessage || '');
    setIsSubmitted(currentGuest.rsvpStatus !== 'Pending');
  }, [currentGuest]);

  const handleRSVPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitPublicRSVP({
      guestId: currentGuest.id,
      rsvpStatus: rsvpChoice,
      attendeesCount,
      dietaryRequirements: dietary,
      wishMessage: wishNote,
    });
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#EFA3B5', '#D4AF37', '#A94F68', '#FFFFFF'],
    });
  };

  const handleCopyAccount = () => {
    navigator.clipboard?.writeText('190388889999');
    showToast(
      language === 'vi' ? 'Đã sao chép tài khoản' : 'Account Copied',
      language === 'vi' ? 'Đã sao chép số tài khoản Vietcombank vào bộ nhớ tạm.' : 'Vietcombank account number copied to clipboard.',
      'success'
    );
  };

  const formattedDate = formatDate(wedding.weddingDate, 'full');

  return (
    <div className="min-h-screen bg-[#FFF9FA] text-brand-dark selection:bg-brand-soft selection:text-brand-deep font-sans relative overflow-x-hidden">
      {/* 1. TOP FLOATING REVIEWER CONTROLS BAR */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-brand-border/80 px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-subtle">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => setCurrentView('dashboard')}
          >
            {t.publicPortal.backToSuite}
          </Button>

          <div className="hidden sm:flex items-center gap-2 border-l border-brand-border/60 pl-3">
            <span className="text-xs text-brand-muted font-medium">{t.publicPortal.viewingAs}</span>
            <select
              value={currentGuest.id}
              onChange={(e) => setActiveGuestForPublicView(e.target.value)}
              className="bg-brand-bg text-xs font-semibold text-brand-dark px-2.5 py-1 rounded-lg border border-brand-border focus:outline-none focus:border-brand-primary"
            >
              {guests.slice(0, 10).map((g) => (
                <option key={g.id} value={g.id}>
                  {g.fullName} ({g.relationship})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Public Portal Bilingual Language Switcher */}
          <LanguageSwitcher variant="compact" />

          {isSubmitted && (
            <Button
              variant="soft-pink"
              size="sm"
              icon={<QrCode className="w-3.5 h-3.5" />}
              onClick={() => setIsPassOpen(true)}
            >
              {t.publicPortal.viewPassBtn}
            </Button>
          )}
          <a
            href="#rsvp-section"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-primary hover:bg-brand-accent text-white shadow-xs transition-colors"
          >
            {language === 'vi' ? 'Xác nhận RSVP' : 'RSVP Now'}
          </a>
        </div>
      </header>

      {/* 2. EDITORIAL HERO SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-between items-center text-center p-6 sm:p-12 text-white bg-brand-dark overflow-hidden">
        <img
          src={invitationConfig.coverPhotoUrl}
          alt="Emily & James"
          className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-black/40" />

        <div className="relative z-10 pt-8 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-soft">
            {t.publicPortal.weddingCelebration}
          </span>
          <div className="w-10 h-0.5 bg-brand-primary/60 mx-auto rounded-full" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto my-auto py-12">
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light tracking-tight text-white leading-none">
            {wedding.brideName.split(' ')[0]}
            <span className="font-serif italic font-normal text-brand-soft block text-3xl sm:text-4xl my-2">
              &
            </span>
            {wedding.groomName.split(' ')[0]}
          </h1>

          <p className="font-serif italic text-base sm:text-xl text-brand-soft/90 max-w-md mx-auto">
            "{invitationConfig.welcomeQuote}"
          </p>

          <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-5 max-w-lg mx-auto text-center space-y-1.5 shadow-modal">
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-soft">
              {t.publicPortal.speciallyInvited}
            </span>
            <h2 className="font-serif text-2xl font-bold text-white">
              {t.publicPortal.dearGuest} {currentGuest.fullName},
            </h2>
            <p className="text-xs text-white/90 leading-relaxed font-light">
              {t.publicPortal.invitationGreeting}
            </p>
          </div>
        </div>

        <div className="relative z-10 pb-8 space-y-4 w-full max-w-md mx-auto">
          <div className="py-3 border-y border-white/20 text-xs space-y-1">
            <p className="font-serif font-bold text-lg text-white">{formattedDate}</p>
            <p className="text-white/80">{wedding.receptionVenue.name} • Ho Chi Minh City</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <a
              href="#our-story"
              className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/20 hover:bg-white/30 text-white backdrop-blur-md border border-white/30 transition-all"
            >
              {t.publicPortal.ourStoryTitle}
            </a>
            <a
              href="#rsvp-section"
              className="px-6 py-2.5 rounded-full text-xs font-semibold bg-brand-primary hover:bg-brand-accent text-white shadow-hover transition-all"
            >
              {t.publicPortal.acceptBtn}
            </a>
          </div>
        </div>
      </section>

      {/* 3. ELEGANT COUNTDOWN */}
      <section className="py-12 px-6 bg-white border-y border-brand-border/60">
        <div className="max-w-xl mx-auto text-center space-y-6">
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-deep">
            {t.publicPortal.countdownTitle}
          </span>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-brand-bg/60 border border-brand-border space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark block">108</span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">{t.publicPortal.days}</span>
            </div>
            <div className="p-4 rounded-2xl bg-brand-bg/60 border border-brand-border space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark block">14</span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">{t.publicPortal.hours}</span>
            </div>
            <div className="p-4 rounded-2xl bg-brand-bg/60 border border-brand-border space-y-1">
              <span className="font-serif text-4xl sm:text-5xl font-bold text-brand-dark block">32</span>
              <span className="text-[10px] uppercase font-semibold text-brand-muted tracking-wider">{t.publicPortal.minutes}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OUR STORY */}
      <section id="our-story" className="py-20 px-6 max-w-4xl mx-auto space-y-12 text-center">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
            {t.publicPortal.ourStoryTitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark tracking-tight">
            {t.publicPortal.howForeverBegan}
          </h2>
          <div className="w-12 h-0.5 bg-brand-primary mx-auto rounded-full mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {wedding.storyTimeline.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card space-y-3 flex flex-col justify-between hover:border-brand-primary/40 transition-colors"
            >
              <div className="space-y-2">
                <span className="font-serif font-bold text-3xl text-brand-deep">{item.year}</span>
                <h3 className="font-serif font-bold text-xl text-brand-dark">{item.title}</h3>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
              {item.location && (
                <div className="flex items-center gap-1.5 text-xs text-brand-deep font-medium pt-2 border-t border-brand-border/60">
                  <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                  <span>{item.location}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. PHOTO GALLERY */}
      <section className="py-16 px-6 bg-brand-bg/50 border-y border-brand-border/60">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
              {t.publicPortal.memoriesTitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              {t.publicPortal.momentsAlongWay}
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {invitationConfig.galleryPhotos.map((photo, i) => (
              <div
                key={i}
                className={clsx(
                  'rounded-3xl overflow-hidden shadow-card border border-brand-border/80 group',
                  i === 0 || i === 3 ? 'sm:row-span-2' : ''
                )}
              >
                <img
                  src={photo}
                  alt="Wedding memory"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. EVENT SCHEDULE */}
      <section className="py-20 px-6 max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
            {t.publicPortal.itineraryTitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            {t.publicPortal.scheduleCelebrations}
          </h2>
          <p className="text-xs text-brand-muted">{formatDate(wedding.weddingDate, 'medium')}</p>
        </div>

        <div className="space-y-4 text-left">
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-card flex items-start gap-5">
            <div className="font-serif font-bold text-lg text-brand-deep px-3 py-1.5 rounded-xl bg-brand-soft/60 shrink-0">
              10:00 AM
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {language === 'vi' ? 'Lễ Thành Hôn & Trao Nhẫn' : 'Wedding Ceremony'}
              </h3>
              <p className="text-xs font-semibold text-brand-deep">St. Joseph Cathedral</p>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                {language === 'vi'
                  ? 'Trao lời hẹn ước trăm năm và nhận phép lành tại thánh đường.'
                  : 'Exchange of sacred vows and cathedral benediction.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-card flex items-start gap-5">
            <div className="font-serif font-bold text-lg text-brand-deep px-3 py-1.5 rounded-xl bg-brand-soft/60 shrink-0">
              06:00 PM
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {language === 'vi' ? 'Khai Tiệc Mừng Cưới' : 'Wedding Reception & Banquet'}
              </h3>
              <p className="text-xs font-semibold text-brand-deep">The Reverie Saigon (Grand Ballroom 5th Floor)</p>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                {language === 'vi'
                  ? 'Cocktail đón khách, thảm đỏ, yến tiệc ẩm thực cao cấp 6 món và nâng ly chúc phúc.'
                  : 'Welcome cocktails, red carpet reception, 6-course gastronomic feast, and champagne celebration.'}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-card flex items-start gap-5">
            <div className="font-serif font-bold text-lg text-brand-deep px-3 py-1.5 rounded-xl bg-brand-soft/60 shrink-0">
              09:30 PM
            </div>
            <div className="space-y-1">
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {language === 'vi' ? 'Tiệc Âm Nhạc & Khiêu Vũ' : 'After Party'}
              </h3>
              <p className="text-xs font-semibold text-brand-deep">Sky Lounge, 39th Floor</p>
              <p className="text-xs text-brand-muted leading-relaxed font-light">
                {language === 'vi'
                  ? 'Cocktail đặc sắc, DJ biểu diễn trực tiếp và khiêu vũ dưới bầu trời Sài Gòn.'
                  : 'Signature cocktails, live DJ set, and late-night dancing under the Saigon sky.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VENUES */}
      <section className="py-16 px-6 bg-white border-y border-brand-border/60">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
              {t.publicPortal.locationTitle}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
              {t.publicPortal.celebrationVenues}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="rounded-3xl overflow-hidden border border-brand-border shadow-card bg-brand-bg/40 p-6 space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img src={wedding.ceremonyVenue.imageUrl} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-brand-dark/80 text-white text-[10px] font-bold uppercase tracking-wider">
                  {language === 'vi' ? 'Hôn Lễ' : 'Ceremony'}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-brand-dark">{wedding.ceremonyVenue.name}</h3>
                <p className="text-xs text-brand-muted">{wedding.ceremonyVenue.address}</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl border border-brand-primary/40 text-brand-deep hover:bg-brand-soft/40 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-accent" /> {t.publicPortal.getDirections}
              </a>
            </div>

            <div className="rounded-3xl overflow-hidden border border-brand-border shadow-card bg-brand-bg/40 p-6 space-y-4">
              <div className="relative h-48 rounded-2xl overflow-hidden">
                <img src={wedding.receptionVenue.imageUrl} alt="" className="w-full h-full object-cover" />
                <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-brand-deep text-white text-[10px] font-bold uppercase tracking-wider">
                  {language === 'vi' ? 'Tiệc Cưới' : 'Reception'}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-xl text-brand-dark">{wedding.receptionVenue.name}</h3>
                <p className="text-xs text-brand-muted">{wedding.receptionVenue.address}</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl border border-brand-primary/40 text-brand-deep hover:bg-brand-soft/40 transition-colors text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-brand-accent" /> {t.publicPortal.getDirections}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. DRESS CODE */}
      <section className="py-16 px-6 max-w-xl mx-auto text-center space-y-6">
        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
            {t.publicPortal.attireTitle}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            {invitationConfig.dressCodeTitle}
          </h2>
        </div>

        <div className="flex items-center justify-center gap-3">
          {invitationConfig.dressCodeColors.map((c, i) => (
            <span
              key={i}
              className="w-8 h-8 rounded-full border-2 border-white shadow-card transform hover:scale-110 transition-transform"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>

        <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light">
          {invitationConfig.dressCodeDescription}
        </p>
      </section>

      {/* 9. INTERACTIVE RSVP FORM */}
      <section id="rsvp-section" className="py-20 px-6 bg-gradient-to-b from-brand-bg to-brand-blush/60 text-left">
        <div className="max-w-lg mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-brand-primary/30 shadow-modal space-y-6">
          {!isSubmitted ? (
            <>
              <div className="text-center space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
                  {t.publicPortal.rsvpSectionTitle}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
                  {t.publicPortal.willYouCelebrate}
                </h2>
                <p className="text-xs text-brand-muted">
                  {t.publicPortal.kindlyRespondFor} <strong>{currentGuest.fullName}</strong>
                </p>
              </div>

              <form onSubmit={handleRSVPSubmit} className="space-y-5">
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { status: 'Confirmed', label: t.publicPortal.acceptBtn },
                    { status: 'Declined', label: t.publicPortal.declineBtn },
                    { status: 'Maybe', label: t.publicPortal.maybeBtn },
                  ].map((opt) => (
                    <button
                      key={opt.status}
                      type="button"
                      onClick={() => setRsvpChoice(opt.status as RSVPStatus)}
                      className={clsx(
                        'py-3 px-2 rounded-2xl border text-xs font-semibold transition-all text-center leading-snug',
                        rsvpChoice === opt.status
                          ? opt.status === 'Confirmed'
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                            : opt.status === 'Declined'
                            ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                            : 'bg-purple-600 text-white border-purple-600 shadow-xs'
                          : 'bg-white border-brand-border text-brand-muted hover:bg-brand-bg'
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {rsvpChoice !== 'Declined' && (
                  <div className="space-y-4 pt-2 border-t border-brand-border/60">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-dark">
                        {t.publicPortal.attendeesCountLabel}
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[1, 2, 3].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setAttendeesCount(num)}
                            className={clsx(
                              'py-2 rounded-xl text-xs font-semibold border transition-all',
                              attendeesCount === num
                                ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                                : 'bg-brand-bg/50 border-brand-border text-brand-dark hover:bg-brand-soft/40'
                            )}
                          >
                            {num} {num === 1 ? t.publicPortal.guestSingular : t.publicPortal.guestsPlural}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-brand-dark">
                        {t.publicPortal.dietaryLabel}
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {[
                          { val: 'None', label: language === 'vi' ? 'Tiêu chuẩn' : 'Standard' },
                          { val: 'Vegetarian', label: language === 'vi' ? 'Ăn chay' : 'Vegetarian' },
                          { val: 'Halal', label: 'Halal' },
                          { val: 'No Seafood', label: language === 'vi' ? 'Không hải sản' : 'No Seafood' },
                        ].map((diet) => (
                          <button
                            key={diet.val}
                            type="button"
                            onClick={() => setDietary(diet.val)}
                            className={clsx(
                              'py-2 rounded-xl text-xs font-semibold border transition-all',
                              dietary === diet.val
                                ? 'bg-brand-primary text-white border-brand-primary shadow-xs'
                                : 'bg-brand-bg/50 border-brand-border text-brand-dark hover:bg-brand-soft/40'
                            )}
                          >
                            {diet.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <TextArea
                  label={t.publicPortal.blessingMessageLabel}
                  value={wishNote}
                  onChange={(e) => setWishNote(e.target.value)}
                  placeholder={
                    language === 'vi'
                      ? 'Chúc Emily & James trăm năm hạnh phúc, mãi mãi yêu thương nhau...'
                      : 'Wishing Emily & James boundless joy, laughter, and a magical lifetime together...'
                  }
                  rows={3}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full mt-2"
                  icon={<Send className="w-4 h-4" />}
                  iconPosition="right"
                >
                  {t.publicPortal.submitRsvpBtn}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center space-y-5 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-subtle">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-3xl font-bold text-brand-dark">
                  {t.publicPortal.rsvpSuccessTitle} {currentGuest.fullName}!
                </h3>
                <p className="text-xs sm:text-sm text-brand-muted">
                  {t.publicPortal.rsvpSuccessSub}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-brand-bg/60 border border-brand-border text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-brand-muted">{t.publicPortal.yourRsvpStatus}</span>
                  <span className="font-semibold text-emerald-700">{t.guests.statuses.confirmed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{t.publicPortal.totalGuestsCount}</span>
                  <span className="font-semibold text-brand-dark">{currentGuest.companions + 1}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{t.publicPortal.dietaryChoice}</span>
                  <span className="font-semibold text-brand-dark">{currentGuest.dietaryNotes || 'Standard'}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<QrCode className="w-4 h-4" />}
                  onClick={() => setIsPassOpen(true)}
                >
                  {t.publicPortal.viewPassBtn}
                </Button>

                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-brand-deep hover:underline pt-2 block mx-auto"
                >
                  {t.publicPortal.editResponse}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 10. A GIFT OF LOVE & BLESSING SECTION (Integrated with PublicGiftModal) */}
      <section className="py-20 px-6 max-w-xl mx-auto text-center space-y-6">
        <div className="w-14 h-14 rounded-3xl bg-brand-soft text-brand-deep flex items-center justify-center mx-auto shadow-card">
          <Gift className="w-7 h-7 text-brand-accent" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-brand-deep">
            {language === 'vi' ? 'Quà mừng' : 'Blessings'}
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark">
            {t.publicPortal.giftSectionTitle}
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-light max-w-md mx-auto">
            {t.publicPortal.giftSectionSub}
          </p>
        </div>

        {/* Bank Details Frame */}
        <div className="p-6 rounded-3xl bg-white border border-brand-border shadow-card space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
            <span className="text-xs font-bold text-brand-dark">Vietcombank Wedding Fund</span>
            <span className="text-[10px] font-mono text-brand-deep bg-brand-bg px-2 py-0.5 rounded border">
              Vietcombank
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-brand-muted text-[10px] uppercase font-bold block">
                {language === 'vi' ? 'Chủ tài khoản' : 'Account Holder'}
              </span>
              <span className="font-semibold text-brand-dark">EMILY NGUYEN</span>
            </div>
            <div>
              <span className="text-brand-muted text-[10px] uppercase font-bold block">
                {language === 'vi' ? 'Số tài khoản' : 'Account Number'}
              </span>
              <span className="font-mono font-bold text-brand-deep">**** 8821</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2">
            <Button
              variant="secondary"
              size="sm"
              className="justify-center"
              icon={<Copy className="w-3.5 h-3.5" />}
              onClick={handleCopyAccount}
            >
              {t.publicPortal.copyAccountBtn}
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="justify-center"
              icon={<Gift className="w-3.5 h-3.5" />}
              onClick={() => setIsGiftModalOpen(true)}
            >
              {t.publicPortal.sentGiftBtn}
            </Button>
          </div>
        </div>

        {/* Wishes Wall Quick CTA */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <Button
            variant="soft-pink"
            size="sm"
            icon={<MessageSquareHeart className="w-4 h-4" />}
            onClick={() => setIsWishModalOpen(true)}
          >
            {t.publicPortal.leaveWishBtn}
          </Button>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="py-12 border-t border-brand-border/60 bg-white text-center space-y-2">
        <h4 className="font-serif text-2xl font-bold text-brand-dark">
          {wedding.brideName.split(' ')[0]} & {wedding.groomName.split(' ')[0]}
        </h4>
        <p className="font-mono text-xs text-brand-deep font-semibold">{wedding.hashtag}</p>
        <p className="text-[10px] text-brand-muted">{t.publicPortal.craftedWith}</p>
      </footer>

      {/* MODALS */}
      <QRGuestPassModal
        guest={currentGuest}
        wedding={wedding}
        isOpen={isPassOpen}
        onClose={() => setIsPassOpen(false)}
      />

      <PublicGiftModal
        guestName={currentGuest.fullName}
        guestId={currentGuest.id}
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
      />

      <LeaveWishModal
        defaultGuestName={currentGuest.fullName}
        isOpen={isWishModalOpen}
        onClose={() => setIsWishModalOpen(false)}
      />
    </div>
  );
};
