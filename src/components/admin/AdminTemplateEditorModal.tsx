import React, { useState } from 'react';
import { AdminTemplateData } from '../../types';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { Palette, Sparkles, CheckCircle2 } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AdminTemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: AdminTemplateData | null;
}

export const AdminTemplateEditorModal: React.FC<AdminTemplateEditorModalProps> = ({
  isOpen,
  onClose,
  template,
}) => {
  const { toggleAdminTemplateStatus } = useApp();
  const { showToast } = useToast();

  const [name, setName] = useState(template?.name || '');
  const [category, setCategory] = useState(template?.category || 'Romantic');
  const [status, setStatus] = useState(template?.status || 'Published');

  if (!isOpen || !template) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Template Updated', `Configuration saved for "${name || template.name}".`, 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-slate-700" />
          <span>Template Configuration Studio</span>
        </div>
      }
      subtitle={`Editing ${template.name}`}
      maxWidth="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </>
      }
    >
      <form onSubmit={handleSave} className="space-y-4 text-left">
        <Input
          label="Template Name"
          value={name || template.name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            options={[
              { value: 'Romantic', label: 'Romantic' },
              { value: 'Modern', label: 'Modern' },
              { value: 'Classic', label: 'Classic' },
              { value: 'Traditional', label: 'Traditional' },
              { value: 'Luxury', label: 'Luxury' },
            ]}
          />

          <Select
            label="Catalog Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            options={[
              { value: 'Published', label: 'Published' },
              { value: 'Draft', label: 'Draft' },
              { value: 'Archived', label: 'Archived' },
            ]}
          />
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span>Active Couples Using Template:</span>
          <span className="font-bold text-brand-deep font-mono">{template.usageCount.toLocaleString()}</span>
        </div>
      </form>
    </Modal>
  );
};
