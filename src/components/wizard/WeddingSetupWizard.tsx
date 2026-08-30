import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, Select, TextArea } from '../common/Input';
import { Badge } from '../common/Badge';
import {
  Heart,
  Calendar,
  MapPin,
  Sparkles,
  Palette,
  Users,
  Send,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Crown,
  FileSpreadsheet,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { clsx } from 'clsx';

export const WeddingSetupWizard: React.FC = () => {
  const {
    isSetupWizardOpen,
    setIsSetupWizardOpen,
    wedding,
    updateWedding,
    templates,
    invitationConfig,
    updateInvitationConfig,
    applyTemplate,
    metrics,
    batchSendInvitations,
    setCurrentView,
  } = useApp();

  const { t, formatNumber, language } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 local state
  const [weddingName, setWeddingName] = useState(wedding.name);
  const [brideName, setBrideName] = useState(wedding.brideName);
  const [groomName, setGroomName] = useState(wedding.groomName);
  const [weddingDate, setWeddingDate] = useState(wedding.weddingDate);
  const [ceremonyVenue, setCeremonyVenue] = useState(wedding.ceremonyVenue.name);
  const [receptionVenue, setReceptionVenue] = useState(wedding.receptionVenue.name);
  const [weddingStyle, setWeddingStyle] = useState(wedding.weddingStyle);

  // Step 2 local state
  const [selectedTemplateId, setSelectedTemplateId] = useState(invitationConfig.templateId);

  // Step 3 local state
  const [welcomeQuote, setWelcomeQuote] = useState(invitationConfig.welcomeQuote);
  const [primaryColor, setPrimaryColor] = useState(invitationConfig.primaryColor);

  const steps = [
    { id: 1, label: language === 'vi' ? 'Thông tin tiệc cưới' : 'Wedding Details', icon: Heart },
    { id: 2, label: language === 'vi' ? 'Chọn giao diện' : 'Choose Template', icon: Palette },
    { id: 3, label: language === 'vi' ? 'Tùy biến thiệp' : 'Customize Invitation', icon: Sparkles },
    { id: 4, label: language === 'vi' ? 'Thêm khách mời' : 'Add Guests', icon: Users },
    { id: 5, label: language === 'vi' ? 'Xem lại & Gửi thiệp' : 'Review & Send', icon: Send },
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      updateWedding({
        name: weddingName,
        brideName,
        groomName,
        weddingDate,
        weddingStyle,
        ceremonyVenue: { ...wedding.ceremonyVenue, name: ceremonyVenue },
        receptionVenue: { ...wedding.receptionVenue, name: receptionVenue },
      });
    } else if (currentStep === 2) {
      applyTemplate(selectedTemplateId);
    } else if (currentStep === 3) {
      updateInvitationConfig({
        welcomeQuote,
        primaryColor,
      });
    }
    if (currentStep < 5) {
      setCurrentStep((s) => s + 1);
    } else {
      batchSendInvitations();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#EFA3B5', '#F8DDE3', '#D97891', '#A94F68', '#D4AF37'],
        });
      } catch {}
      setIsSetupWizardOpen(false);
      setCurrentView('dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((s) => s - 1);
    }
  };

  if (!isSetupWizardOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto text-left">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-dark/50 backdrop-blur-md transition-opacity"
        onClick={() => setIsSetupWizardOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-modal border border-brand-border z-10 overflow-hidden flex flex-col max-h-[92vh] animate-fade-in">
        {/* Wizard Progress Bar Header */}
        <div className="px-6 py-5 border-b border-brand-border bg-gradient-to-r from-brand-bg via-white to-brand-blush/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-soft text-brand-deep flex items-center justify-center font-serif font-bold text-sm">
                {currentStep}
              </div>
              <div>
                <h3 className="font-serif text-xl font-bold text-brand-dark">
                  {language === 'vi' ? 'Trợ lý Thiết lập Đám cưới' : 'Wedding Setup Concierge'}
                </h3>
                <p className="text-xs text-brand-muted">
                  {language === 'vi' ? `Bước ${currentStep} / 5 — ${steps[currentStep - 1].label}` : `Step ${currentStep} of 5 — ${steps[currentStep - 1].label}`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsSetupWizardOpen(false)}
              className="text-xs text-brand-muted hover:text-brand-dark px-3 py-1.5 rounded-lg border border-brand-border hover:bg-brand-bg transition-colors"
            >
              {language === 'vi' ? 'Thoát' : 'Exit Setup'}
            </button>
          </div>

          {/* Stepper pills */}
          <div className="grid grid-cols-5 gap-2">
            {steps.map((step) => {
              const isDone = currentStep > step.id;
              const isCurrent = currentStep === step.id;
              const StepIcon = step.icon;

              return (
                <div key={step.id} className="space-y-1.5 text-center">
                  <div
                    className={clsx(
                      'h-1.5 rounded-full transition-all duration-300',
                      isDone || isCurrent
                        ? 'bg-gradient-to-r from-brand-primary to-brand-deep'
                        : 'bg-brand-border/60'
                    )}
                  />
                  <div className="hidden sm:flex items-center justify-center gap-1.5 text-[11px] font-medium">
                    <StepIcon
                      className={clsx(
                        'w-3.5 h-3.5',
                        isCurrent
                          ? 'text-brand-deep font-semibold'
                          : isDone
                          ? 'text-emerald-600'
                          : 'text-brand-muted/60'
                      )}
                    />
                    <span
                      className={clsx(
                        'truncate',
                        isCurrent
                          ? 'text-brand-dark font-bold'
                          : isDone
                          ? 'text-brand-dark'
                          : 'text-brand-muted/60'
                      )}
                    >
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* STEP 1: WEDDING INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-brand-dark">
                  {language === 'vi' ? 'Bắt đầu với thông tin ngày cưới' : "Let's begin with the wedding essentials"}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted">
                  {language === 'vi' ? 'Thông tin này sẽ tự động điền vào thiệp mời điện tử, trang đón tiếp và thư gửi khách.' : 'These details will automatically personalize your invitations, website, and guest notifications.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t.wedding.weddingName}
                  required
                  value={weddingName}
                  onChange={(e) => setWeddingName(e.target.value)}
                  placeholder="e.g. Emily & James Wedding"
                />

                <Input
                  label={language === 'vi' ? 'Phong cách tiệc cưới' : 'Wedding Style / Aesthetic'}
                  value={weddingStyle}
                  onChange={(e) => setWeddingStyle(e.target.value)}
                  placeholder="e.g. Modern Romantic"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  label={t.wedding.brideName}
                  required
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  placeholder="Emily Nguyen"
                />
                <Input
                  label={t.wedding.groomName}
                  required
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  placeholder="James Tran"
                />
                <Input
                  label={t.wedding.weddingDate}
                  type="date"
                  required
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label={t.wedding.ceremonyVenue}
                  value={ceremonyVenue}
                  onChange={(e) => setCeremonyVenue(e.target.value)}
                  placeholder="St. Joseph Cathedral"
                  icon={<MapPin className="w-4 h-4" />}
                />
                <Input
                  label={t.wedding.receptionVenue}
                  value={receptionVenue}
                  onChange={(e) => setReceptionVenue(e.target.value)}
                  placeholder="The Reverie Saigon"
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>
            </div>
          )}

          {/* STEP 2: CHOOSE TEMPLATE */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-brand-dark">
                  {language === 'vi' ? 'Chọn mẫu thiệp cưới phong cách' : 'Select your editorial wedding template'}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted">
                  {language === 'vi' ? 'Chọn phong cách thiết kế khởi đầu. Bạn có thể tùy biến chi tiết trong Trình thiết kế thiệp.' : 'Choose a luxury baseline design. Every detail can be customized in the builder.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {templates.map((tpl) => {
                  const isSelected = selectedTemplateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplateId(tpl.id)}
                      className={clsx(
                        'group rounded-2xl overflow-hidden border cursor-pointer transition-all duration-200 bg-white flex flex-col justify-between shadow-subtle',
                        isSelected
                          ? 'border-brand-primary ring-2 ring-brand-primary/30 shadow-hover'
                          : 'border-brand-border hover:border-brand-primary/40'
                      )}
                    >
                      <div className="relative h-40 overflow-hidden bg-brand-dark">
                        <img
                          src={tpl.coverImage}
                          alt={tpl.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {tpl.badge && (
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-brand-deep text-[10px] font-bold shadow-xs">
                            {tpl.badge}
                          </span>
                        )}
                        {isSelected && (
                          <div className="absolute inset-0 bg-brand-primary/20 backdrop-blur-xs flex items-center justify-center">
                            <span className="w-8 h-8 rounded-full bg-brand-deep text-white flex items-center justify-center shadow-card">
                              <CheckCircle2 className="w-5 h-5" />
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="p-4 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <h5 className="font-serif font-bold text-base text-brand-dark">
                            {tpl.name}
                          </h5>
                          <span className="text-[10px] font-medium text-brand-muted">
                            {tpl.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-brand-muted line-clamp-2 leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: CUSTOMIZE INVITATION */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-brand-dark">
                  {language === 'vi' ? 'Tùy biến màu sắc & Thông điệp thiệp' : 'Customize colors & romantic quotes'}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted">
                  {language === 'vi' ? 'Thêm những nét riêng biệt cho ngày trọng đại của bạn.' : 'Personalize the styling touches that make your celebration uniquely yours.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Input
                    label={t.builder.coverQuoteLabel}
                    value={welcomeQuote}
                    onChange={(e) => setWelcomeQuote(e.target.value)}
                    placeholder={language === 'vi' ? 'Hai tâm hồn, một hành trình tươi đẹp.' : 'Two souls, one beautiful journey.'}
                    helperText={language === 'vi' ? 'Hiển thị nổi bật trên đầu trang thiệp mời' : 'Displayed prominently on your guest invitation header'}
                  />

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-brand-dark">
                      {language === 'vi' ? 'Chọn bảng màu chủ đạo' : 'Select Primary Theme Palette'}
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { name: language === 'vi' ? 'Hồng Phấn' : 'Pastel Blush', color: '#EFA3B5', bg: 'bg-[#EFA3B5]' },
                        { name: language === 'vi' ? 'Vàng Ngà' : 'Gold Ivory', color: '#D4AF37', bg: 'bg-[#D4AF37]' },
                        { name: language === 'vi' ? 'Xanh Sage' : 'Sage Garden', color: '#4FA87A', bg: 'bg-[#4FA87A]' },
                        { name: language === 'vi' ? 'Hồng Rose' : 'Editorial Rose', color: '#D97891', bg: 'bg-[#D97891]' },
                      ].map((pal) => (
                        <button
                          key={pal.color}
                          type="button"
                          onClick={() => setPrimaryColor(pal.color)}
                          className={clsx(
                            'p-3 rounded-xl border flex flex-col items-center gap-2 transition-all',
                            primaryColor === pal.color
                              ? 'border-brand-deep ring-2 ring-brand-deep/20 bg-brand-bg/60'
                              : 'border-brand-border hover:bg-brand-bg/30'
                          )}
                        >
                          <span className={clsx('w-6 h-6 rounded-full shadow-xs', pal.bg)} />
                          <span className="text-[11px] font-medium text-brand-dark">{pal.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Real-time mini preview card */}
                <div className="rounded-2xl p-6 border border-brand-border bg-gradient-to-br from-brand-bg via-white to-brand-blush/40 text-center flex flex-col items-center justify-center space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                    {language === 'vi' ? 'Xem trước phong cách' : 'Live Style Preview'}
                  </span>
                  <h3 className="font-serif text-3xl font-bold text-brand-dark">
                    {brideName} & {groomName}
                  </h3>
                  <p className="font-serif italic text-sm text-brand-deep">
                    "{welcomeQuote}"
                  </p>
                  <div className="w-12 h-0.5 bg-brand-primary rounded-full" />
                  <p className="text-xs text-brand-muted">
                    {weddingDate} • {receptionVenue}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: ADD GUESTS */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-brand-dark">
                  {language === 'vi' ? 'Danh bạ & Danh sách khách mời' : 'Guest list & contact directory'}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted">
                  {language === 'vi'
                    ? `Hệ thống hiện có ${formatNumber(metrics.totalGuests)} khách mời đã tải sẵn sàng tạo liên kết thiệp.`
                    : `Your registry currently has ${metrics.totalGuests} guests preloaded and ready for personalized invitation generation.`}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-brand-bg/50 border border-brand-border text-center space-y-1">
                  <span className="font-serif text-3xl font-bold text-brand-dark">
                    {formatNumber(metrics.totalGuests)}
                  </span>
                  <p className="text-xs text-brand-muted">{language === 'vi' ? 'Tổng số khách' : 'Total Guests Loaded'}</p>
                </div>
                <div className="p-5 rounded-2xl bg-brand-soft/60 border border-brand-primary/30 text-center space-y-1">
                  <span className="font-serif text-3xl font-bold text-brand-deep">
                    {formatNumber(metrics.generatedInvitesCount)}
                  </span>
                  <p className="text-xs text-brand-deep font-semibold">{language === 'vi' ? 'Đã tạo đường dẫn riêng' : 'Personalized Slugs Ready'}</p>
                </div>
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <span className="font-serif text-3xl font-bold text-emerald-700">
                    100%
                  </span>
                  <p className="text-xs text-emerald-700 font-semibold">{language === 'vi' ? 'Sẵn sàng gửi thiệp' : 'Ready to Broadcast'}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-brand-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-medium text-brand-dark">
                    {language === 'vi'
                      ? 'Danh sách đã đồng bộ họ tên, số điện thoại và phân quyền khách đi kèm +1.'
                      : 'Contacts mapped with Vietnamese surnames, phone numbers, and +1 companion permissions.'}
                  </span>
                </div>
                <span className="text-xs text-brand-deep font-semibold shrink-0">✓ {language === 'vi' ? 'Đã xác thực' : 'Verified'}</span>
              </div>
            </div>
          )}

          {/* STEP 5: REVIEW & SEND */}
          {currentStep === 5 && (
            <div className="space-y-5 animate-fade-in text-center py-4">
              <div className="w-16 h-16 rounded-full bg-brand-soft text-brand-deep flex items-center justify-center mx-auto shadow-pinkGlow">
                <Crown className="w-8 h-8 text-brand-accent" />
              </div>

              <div className="space-y-1 max-w-lg mx-auto">
                <h4 className="font-serif text-3xl font-bold text-brand-dark">
                  {language === 'vi' ? 'Mọi thứ đã sẵn sàng cho ngày trọng đại!' : 'Everything is ready for your celebration!'}
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
                  {language === 'vi'
                    ? 'Website cưới đã được tạo, 150 đường dẫn thiệp mời riêng và mã QR đón tiếp đã kích hoạt sẵn sàng.'
                    : 'Your wedding website is generated, 150 unique personalized guest links and QR codes are armed, and your RSVP analytics tracking is live.'}
                </p>
              </div>

              <div className="max-w-md mx-auto p-5 rounded-2xl bg-brand-bg/60 border border-brand-primary/30 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-brand-muted">{language === 'vi' ? 'Cặp đôi:' : 'Couple:'}</span>
                  <span className="font-semibold text-brand-dark">{brideName} & {groomName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{language === 'vi' ? 'Ngày cưới:' : 'Wedding Date:'}</span>
                  <span className="font-semibold text-brand-dark">{weddingDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{language === 'vi' ? 'Mẫu thiệp:' : 'Active Template:'}</span>
                  <span className="font-semibold text-brand-deep">{templates.find(t => t.id === selectedTemplateId)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-muted">{language === 'vi' ? 'Tổng số khách:' : 'Total Guests:'}</span>
                  <span className="font-semibold text-emerald-700">{formatNumber(metrics.totalGuests)} {t.common.guestsUnit}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="px-6 py-4 border-t border-brand-border bg-brand-bg/40 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            disabled={currentStep === 1}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            {language === 'vi' ? 'Quay lại' : 'Previous'}
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleNext}
            icon={currentStep === 5 ? <Send className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            iconPosition="right"
          >
            {currentStep === 5
              ? (language === 'vi' ? 'Phát hành thiệp & Kích hoạt' : 'Broadcast Invitations & Launch')
              : (language === 'vi' ? 'Tiếp tục' : 'Continue')}
          </Button>
        </div>
      </div>
    </div>
  );
};
