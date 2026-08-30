import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Settings, Shield, Bell, Database, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';
import { Input, Select } from '../common/Input';
import { useToast } from '../../context/ToastContext';

export const AdminSettings: React.FC = () => {
  const { resetToSampleData } = useApp();
  const { showToast } = useToast();

  const [platformName, setPlatformName] = useState('InviteMe Enterprise');
  const [defaultCurrency, setDefaultCurrency] = useState('VND');
  const [allowPublicRegistrations, setAllowPublicRegistrations] = useState(true);

  const handleSaveGeneral = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings Saved', 'Platform configuration saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in text-left max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Settings className="w-3.5 h-3.5 text-slate-600" />
            <span>Infrastructure & Configuration</span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Admin System Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Global system parameters, roles & permissions, and sandbox database operations.
          </p>
        </div>
      </div>

      {/* General Settings */}
      <form onSubmit={handleSaveGeneral} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-sans font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
          Platform Configuration
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Platform Title"
            value={platformName}
            onChange={(e) => setPlatformName(e.target.value)}
          />

          <Select
            label="Default Currency"
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value)}
            options={[
              { value: 'VND', label: 'VND (Vietnamese Dong)' },
              { value: 'USD', label: 'USD (US Dollar)' },
            ]}
          />
        </div>

        <div className="pt-2 flex items-center justify-between">
          <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={allowPublicRegistrations}
              onChange={(e) => setAllowPublicRegistrations(e.target.checked)}
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
            />
            <span>Allow new couples to register self-service</span>
          </label>

          <Button type="submit" variant="primary" size="sm">
            Save Platform Settings
          </Button>
        </div>
      </form>

      {/* Database Operations & Sandbox Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-sans font-bold text-base text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-slate-600" />
          <span>Demo & Golden Flow State Control</span>
        </h3>

        <p className="text-xs text-slate-500 leading-relaxed">
          Restore all mock data (Emily & James wedding, 150 guests, 15 tables, 87 gifts, 87 wishes, 87 thank-you notes, and admin telemetry) to pristine baseline state.
        </p>

        <div className="pt-2 flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={resetToSampleData}
          >
            Reset All Data to Golden Demo Baseline
          </Button>
        </div>
      </div>
    </div>
  );
};
