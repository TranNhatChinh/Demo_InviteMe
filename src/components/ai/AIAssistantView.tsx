import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useLanguage } from '../../i18n/LanguageContext';
import { AIInvitationGeneratorModal } from './AIInvitationGeneratorModal';
import { Button } from '../common/Button';
import {
  Sparkles,
  Send,
  Wand2,
  Copy,
  CheckCircle2,
  Heart,
  MessageSquare,
  ArrowRight,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';
import { clsx } from 'clsx';
import { useToast } from '../../context/ToastContext';

export const AIAssistantView: React.FC = () => {
  const {
    aiChatMessages,
    sendAIChatMessage,
    updateInvitationConfig,
    setCurrentView,
  } = useApp();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const [inputVal, setInputVal] = useState('');
  const [isInvitationModalOpen, setIsInvitationModalOpen] = useState(false);

  const suggestedPrompts = [
    {
      label: t.aiAssistant.actions.invitationWording,
      prompt: language === 'vi'
        ? 'Viết lời mời cưới lãng mạn và trang nhã cho thiệp cưới điện tử của chúng mình.'
        : 'Write a romantic and poetic invitation welcome message for our digital invitations.',
    },
    {
      label: t.aiAssistant.actions.thankYouNotes,
      prompt: language === 'vi'
        ? 'Soạn lời cảm ơn chân thành gửi đến bạn bè đã gửi quà mừng cưới.'
        : 'Draft a heartfelt thank-you note for friends who gave a generous wedding gift.',
    },
    {
      label: t.aiAssistant.actions.improveStory,
      prompt: language === 'vi'
        ? 'Cải thiện cột mốc cầu hôn năm 2023 tại bờ biển Amalfi trở nên giàu cảm xúc và thơ mộng hơn.'
        : 'Help make our 2023 Amalfi Coast proposal milestone sound cinematic and emotional.',
    },
    {
      label: t.aiAssistant.actions.scheduleDesc,
      prompt: language === 'vi'
        ? 'Viết mô tả 1 đoạn hấp dẫn cho tiệc After Party tại Sky Lounge tầng 39.'
        : 'Write an enticing 1-paragraph description for our Sky Lounge 39th floor after-party.',
    },
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    sendAIChatMessage(inputVal.trim());
    setInputVal('');
  };

  const handleActionApply = (text: string) => {
    updateInvitationConfig({ welcomeMessage: text });
    showToast(
      language === 'vi' ? 'Đã áp dụng vào thiệp cưới' : 'Applied to Live Invitation',
      language === 'vi' ? 'Đã cập nhật lời chào mừng trên thiệp cưới điện tử.' : 'Updated your digital wedding invitation welcome message.',
      'wedding'
    );
    setCurrentView('invitation-builder');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in max-w-6xl mx-auto text-left">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-soft/60 border border-brand-primary/20 text-xs font-semibold text-brand-deep">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>InviteMe AI</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-brand-dark">
            {t.aiAssistant.title}
          </h1>
          <p className="text-sm text-brand-muted">
            {t.aiAssistant.subtitle}
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Wand2 className="w-4 h-4" />}
          onClick={() => setIsInvitationModalOpen(true)}
        >
          {t.aiAssistant.structuredModalTitle}
        </Button>
      </div>

      {/* Main 2-Column Chat Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Cols: Quick Actions & Topics */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-card space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
                Content Suite
              </span>
              <h3 className="font-serif font-bold text-lg text-brand-dark">
                {t.aiAssistant.quickGeneratorsTitle}
              </h3>
              <p className="text-xs text-brand-muted">
                {t.aiAssistant.quickGeneratorsSub}
              </p>
            </div>

            <div className="space-y-2">
              {suggestedPrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => sendAIChatMessage(p.prompt)}
                  className="w-full p-3 rounded-2xl bg-brand-bg/50 hover:bg-brand-soft/50 border border-brand-border/80 hover:border-brand-primary/40 transition-all text-left text-xs font-medium text-brand-dark flex items-center justify-between group"
                >
                  <span className="truncate">{p.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-brand-accent group-hover:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-brand-border/60">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
                onClick={() => setCurrentView('thank-you')}
              >
                {t.thankYou.title}
              </Button>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Conversational Assistant Canvas */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-brand-border shadow-card flex flex-col justify-between overflow-hidden min-h-[560px]">
          {/* Welcome Banner */}
          <div className="p-5 border-b border-brand-border bg-gradient-to-r from-brand-bg/60 to-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-primary to-brand-accent text-white flex items-center justify-center shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-base text-brand-dark">
                  {t.aiAssistant.conciergeTitle}
                </h4>
                <p className="text-xs text-brand-muted">{t.aiAssistant.onlineStatus}</p>
              </div>
            </div>

            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              {language === 'vi' ? 'Sẵn sàng' : 'Ready'}
            </span>
          </div>

          {/* Messages Area */}
          <div className="p-6 space-y-4 overflow-y-auto max-h-[420px] flex-1">
            {aiChatMessages.map((msg) => (
              <div
                key={msg.id}
                className={clsx(
                  'flex gap-3 text-xs leading-relaxed max-w-xl animate-fade-in',
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                )}
              >
                {msg.sender === 'assistant' ? (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-primary to-brand-accent text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>
                ) : (
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"
                    alt="Emily"
                    className="w-8 h-8 rounded-full object-cover border border-brand-primary/40 shrink-0"
                  />
                )}

                <div className="space-y-2">
                  <div
                    className={clsx(
                      'p-4 rounded-2xl shadow-subtle',
                      msg.sender === 'user'
                        ? 'bg-brand-dark text-white rounded-tr-none'
                        : 'bg-brand-bg border border-brand-border/80 text-brand-dark rounded-tl-none space-y-2'
                    )}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>

                    {/* Quick Apply Action Button */}
                    {msg.actionPayload && (
                      <div className="pt-2 border-t border-brand-border flex items-center gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                          onClick={() => handleActionApply(msg.actionPayload!.text)}
                        >
                          {t.aiAssistant.useInInvitation}
                        </Button>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-brand-muted block px-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-4 border-t border-brand-border bg-white flex items-center gap-3"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.aiAssistant.askPlaceholder}
              className="flex-1 bg-brand-bg/50 border border-brand-border rounded-xl px-4 py-2.5 text-xs text-brand-dark focus:outline-none focus:border-brand-primary"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<Send className="w-3.5 h-3.5" />}
            >
              {t.aiAssistant.sendBtn}
            </Button>
          </form>
        </div>
      </div>

      <AIInvitationGeneratorModal
        isOpen={isInvitationModalOpen}
        onClose={() => setIsInvitationModalOpen(false)}
      />
    </div>
  );
};
