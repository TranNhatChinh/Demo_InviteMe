import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { ThankYouMessage } from '../../types';
import { Send, Mail, MessageSquare, Copy, CheckCircle2, Heart } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface SendThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageItem: ThankYouMessage | null;
}

export const SendThankYouModal: React.FC<SendThankYouModalProps> = ({
  isOpen,
  onClose,
  messageItem,
}) => {
  const { sendThankYouMessage } = useApp();
  const { showToast } = useToast();
  const [channel, setChannel] = useState<'Email' | 'SMS' | 'Link'>('Email');

  if (!isOpen || !messageItem) return null;

  const handleSend = () => {
    sendThankYouMessage(messageItem.id, channel);
    onClose();
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(messageItem.message);
    showToast('Copied Message', 'Thank-you note copied to clipboard.', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-brand-deep" />
          <span>Deliver Thank-you Message</span>
        </div>
      }
      subtitle={`Recipient: ${messageItem.guestName}`}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            icon={<Copy className="w-3.5 h-3.5" />}
            onClick={handleCopy}
          >
            Copy Text
          </Button>
          <Button
            variant="primary"
            icon={<Send className="w-4 h-4" />}
            onClick={handleSend}
          >
            Send via {channel}
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-left">
        {/* Channel Selection */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-dark">
            Select Delivery Channel:
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { type: 'Email', icon: Mail, label: 'Email' },
              { type: 'SMS', icon: MessageSquare, label: 'SMS' },
              { type: 'Link', icon: Copy, label: 'Copy Link' },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <button
                  key={c.type}
                  type="button"
                  onClick={() => setChannel(c.type as any)}
                  className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    channel === c.type
                      ? 'bg-brand-deep text-white border-brand-deep shadow-xs'
                      : 'bg-brand-bg/50 border-brand-border text-brand-dark hover:bg-brand-soft/40'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message Preview */}
        <div className="p-4 rounded-2xl bg-brand-bg/50 border border-brand-border space-y-2 text-xs">
          <div className="flex items-center justify-between text-brand-muted text-[11px]">
            <span>Message Preview:</span>
            <span>{messageItem.giftAmountVND > 0 ? `Gift: ${messageItem.giftAmountVND.toLocaleString()} VND` : 'No gift recorded'}</span>
          </div>
          <p className="whitespace-pre-line text-brand-dark font-sans leading-relaxed">
            {messageItem.message}
          </p>
        </div>
      </div>
    </Modal>
  );
};
