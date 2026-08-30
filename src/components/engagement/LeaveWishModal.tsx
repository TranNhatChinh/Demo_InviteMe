import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, TextArea } from '../common/Input';
import { MessageSquareHeart, Heart, Sparkles, Send, User } from 'lucide-react';

interface LeaveWishModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGuestName?: string;
}

export const LeaveWishModal: React.FC<LeaveWishModalProps> = ({
  isOpen,
  onClose,
  defaultGuestName = 'Nguyễn Minh Anh',
}) => {
  const { addWish } = useApp();

  const [guestName, setGuestName] = useState(defaultGuestName);
  const [relationship, setRelationship] = useState("Bride's Friend");
  const [message, setMessage] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const maxChars = 280;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    addWish({
      guestName: guestName.trim() || 'Wedding Guest',
      relationship,
      message: message.trim(),
      isAnonymous,
    });

    setMessage('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <MessageSquareHeart className="w-5 h-5 text-brand-primary fill-brand-primary" />
          <span>Leave a Wedding Blessing</span>
        </div>
      }
      subtitle="Share your love, wishes, and advice with Emily & James"
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            icon={<Send className="w-4 h-4" />}
            onClick={handleSubmit}
            disabled={!message.trim()}
          >
            Post Blessing
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {!isAnonymous && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Your Name"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Minh Anh"
            />
            <Input
              label="Relationship"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g. High school friend"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-brand-dark">
            Your Blessing Message for the Couple:
          </label>
          <textarea
            required
            rows={4}
            maxLength={maxChars}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Wishing Emily & James a lifetime of pure joy, mutual adoration, and beautiful adventures..."
            className="w-full px-3.5 py-2.5 rounded-2xl border border-brand-border bg-white text-xs text-brand-dark placeholder:text-brand-muted/70 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 resize-none"
          />
          <div className="flex items-center justify-between text-[11px] text-brand-muted">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded border-brand-border text-brand-deep focus:ring-brand-primary"
              />
              <span>Post anonymously</span>
            </label>
            <span>{message.length} / {maxChars} characters</span>
          </div>
        </div>
      </form>
    </Modal>
  );
};
