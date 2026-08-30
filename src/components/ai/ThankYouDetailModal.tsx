import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { TextArea, Select } from '../common/Input';
import { ThankYouMessage, Guest } from '../../types';
import { Sparkles, RefreshCw, Send, Copy, Heart, User } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface ThankYouDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  messageItem: ThankYouMessage | null;
  onOpenSendModal: (msg: ThankYouMessage) => void;
}

export const ThankYouDetailModal: React.FC<ThankYouDetailModalProps> = ({
  isOpen,
  onClose,
  messageItem,
  onOpenSendModal,
}) => {
  const { generateThankYouForGuest } = useApp();
  const { showToast } = useToast();

  const [tone, setTone] = useState<'Warm' | 'Formal' | 'Humorous'>('Warm');
  const [messageBody, setMessageBody] = useState('');

  useEffect(() => {
    if (messageItem) {
      setMessageBody(messageItem.message);
    }
  }, [messageItem]);

  if (!isOpen || !messageItem) return null;

  const handleRegenerate = () => {
    const updated = generateThankYouForGuest(messageItem.guestId, tone);
    setMessageBody(updated.message);
    showToast('Regenerated Message', `Updated thank-you note with ${tone} tone.`, 'info');
  };

  const handleProceedSend = () => {
    onClose();
    onOpenSendModal({
      ...messageItem,
      message: messageBody,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-brand-primary fill-brand-primary" />
          <span>Personalized Thank-you Message</span>
        </div>
      }
      subtitle={`For ${messageItem.guestName} (${messageItem.relationship})`}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={<Send className="w-4 h-4" />}
            onClick={handleProceedSend}
          >
            Proceed to Send
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-left">
        {/* Context metadata strip */}
        <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-brand-bg/50 border border-brand-border text-xs">
          <div>
            <span className="text-brand-muted block text-[10px] uppercase font-bold">Attended Wedding</span>
            <span className="font-semibold text-brand-dark">{messageItem.attendance === 'Yes' ? 'Attended Reception ✓' : 'Sent Wishes From Afar'}</span>
          </div>
          <div>
            <span className="text-brand-muted block text-[10px] uppercase font-bold">Blessing Gift</span>
            <span className="font-semibold text-brand-deep">{messageItem.giftAmountVND > 0 ? `${messageItem.giftAmountVND.toLocaleString()} VND` : 'No gift recorded'}</span>
          </div>
        </div>

        {/* Tone Selector & Regenerate */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Select
              label="Tone of Voice"
              value={tone}
              onChange={(e) => setTone(e.target.value as any)}
              options={[
                { value: 'Warm', label: 'Warm & Emotional' },
                { value: 'Formal', label: 'Formal & Respectful' },
                { value: 'Humorous', label: 'Playful & Fun' },
              ]}
            />
          </div>
          <div className="pt-6">
            <Button
              variant="secondary"
              size="sm"
              icon={<RefreshCw className="w-3.5 h-3.5" />}
              onClick={handleRegenerate}
            >
              Re-generate
            </Button>
          </div>
        </div>

        {/* Message Editor */}
        <TextArea
          label="Message Content:"
          rows={6}
          value={messageBody}
          onChange={(e) => setMessageBody(e.target.value)}
        />
      </div>
    </Modal>
  );
};
