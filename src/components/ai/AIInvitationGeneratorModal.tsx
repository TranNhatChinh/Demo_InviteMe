import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Select, TextArea } from '../common/Input';
import { Sparkles, Copy, Check, RefreshCw, Wand2, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AIInvitationGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIInvitationGeneratorModal: React.FC<AIInvitationGeneratorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { updateInvitationConfig, setCurrentView } = useApp();
  const { showToast } = useToast();

  const [tone, setTone] = useState<'Romantic' | 'Warm' | 'Formal' | 'Humorous'>('Romantic');
  const [style, setStyle] = useState<'Modern' | 'Traditional' | 'Luxury'>('Modern');
  const [relationship, setRelationship] = useState<'Friend' | 'Family' | 'Colleague'>('Friend');

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedText, setGeneratedText] = useState(
    'With hearts full of love and joy, Emily & James cordially invite you to celebrate one of the most meaningful moments of our lives. Together with our families, we look forward to dancing, laughing, and beginning our forever with you.'
  );

  if (!isOpen) return null;

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      let result = '';
      if (tone === 'Romantic') {
        result =
          'Two souls, one beautiful journey. Emily & James invite you to share in the magic of our wedding celebration as we exchange sacred vows and dance into forever under the Saigon starlight.';
      } else if (tone === 'Warm') {
        result =
          'We have shared so many wonderful memories together, and our wedding day would not be complete without you! Come celebrate our marriage, enjoy an exquisite feast, and toast to lifelong love.';
      } else if (tone === 'Formal') {
        result =
          'Together with their families, Emily Nguyen and James Tran request the honor of your presence at the celebration of their holy matrimony on Sunday, the fourteenth of December, two thousand twenty-six.';
      } else {
        result =
          'We’re making it official! Free food, flowing champagne, questionable dance moves, and lots of love. Emily & James invite you to celebrate our big day with us!';
      }

      setGeneratedText(result);
      setIsGenerating(false);
      showToast('Wording Generated', 'Crafted bespoke invitation copy.', 'success');
    }, 1200);
  };

  const handleApplyToInvitation = () => {
    updateInvitationConfig({
      welcomeMessage: generatedText,
    });
    showToast('Applied to Invitation', 'Updated your digital wedding invitation welcome message.', 'wedding');
    onClose();
    setCurrentView('invitation-builder');
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedText);
    showToast('Copied to Clipboard', 'Text copied successfully.', 'info');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-brand-accent" />
          <span>AI Invitation Copy Generator</span>
        </div>
      }
      subtitle="Craft poetic invitation wording tailored to your aesthetic"
      maxWidth="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Close
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
            icon={<Sparkles className="w-4 h-4" />}
            onClick={handleApplyToInvitation}
          >
            Use in Live Invitation
          </Button>
        </>
      }
    >
      <div className="space-y-5 text-left">
        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Select
            label="Tone of Voice"
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
            options={[
              { value: 'Romantic', label: 'Romantic & Poetic' },
              { value: 'Warm', label: 'Warm & Heartfelt' },
              { value: 'Formal', label: 'Formal & Regal' },
              { value: 'Humorous', label: 'Playful & Fun' },
            ]}
          />

          <Select
            label="Wedding Style"
            value={style}
            onChange={(e) => setStyle(e.target.value as any)}
            options={[
              { value: 'Modern', label: 'Modern Editorial' },
              { value: 'Traditional', label: 'Classic Elegance' },
              { value: 'Luxury', label: 'High-Fashion Luxury' },
            ]}
          />

          <Select
            label="Recipient Group"
            value={relationship}
            onChange={(e) => setRelationship(e.target.value as any)}
            options={[
              { value: 'Friend', label: 'Friends & Peers' },
              { value: 'Family', label: 'Family & Relatives' },
              { value: 'Colleague', label: 'Colleagues & VIPs' },
            ]}
          />
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="w-full justify-center"
          icon={<RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />}
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? 'Synthesizing wording...' : 'Generate New Wording'}
        </Button>

        {/* Output Box */}
        <div className="p-5 rounded-3xl bg-brand-bg/50 border border-brand-primary/30 space-y-2 relative">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
            AI Generated Invitation Copy
          </span>

          {isGenerating ? (
            <div className="py-6 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-brand-accent animate-pulse mx-auto" />
              <p className="text-xs text-brand-dark font-medium">✨ Crafting your perfect wording...</p>
              <p className="text-[11px] text-brand-muted">Analyzing your wedding style and tone parameters</p>
            </div>
          ) : (
            <p className="font-serif italic text-base text-brand-dark leading-relaxed">
              "{generatedText}"
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
