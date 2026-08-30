import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckInRecord } from '../../types';
import { QRScanResultModal } from './QRScanResultModal';
import { Button } from '../common/Button';
import {
  QrCode,
  Camera,
  Sparkles,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Armchair,
  RefreshCw,
  Search,
} from 'lucide-react';
import { clsx } from 'clsx';

export const QRCheckInScanner: React.FC = () => {
  const {
    guests,
    receptionMetrics,
    checkInRecords,
    checkInGuestDirect,
    setIsAddGuestModalOpen,
  } = useApp();

  const [scanResultData, setScanResultData] = useState<{
    isOpen: boolean;
    resultType: 'success' | 'already-checked-in' | null;
    record: CheckInRecord | null;
  }>({
    isOpen: false,
    resultType: null,
    record: null,
  });

  const [isScanningActive, setIsScanningActive] = useState(true);

  const handleSimulateScan = (guestId: string) => {
    const result = checkInGuestDirect(guestId, 'Linh Tran');

    if (result.success && result.record) {
      setScanResultData({
        isOpen: true,
        resultType: 'success',
        record: result.record,
      });
    } else if (result.isAlreadyCheckedIn && result.record) {
      setScanResultData({
        isOpen: true,
        resultType: 'already-checked-in',
        record: result.record,
      });
    } else {
      // Fallback demo record
      const guest = guests.find((g) => g.id === guestId);
      const fallbackRecord: CheckInRecord = {
        id: `chk-${Date.now()}`,
        guestId: guestId,
        guestName: guest?.fullName || 'Nguyễn Minh Anh',
        time: '18:24',
        tableNumber: guest?.tableNumber || 'Table 05',
        guestsCount: (guest?.companions || 0) + 1,
        staffName: 'Linh Tran',
        relationship: guest?.relationship || "Bride's Friend",
        status: 'Confirmed',
      };
      setScanResultData({
        isOpen: true,
        resultType: 'already-checked-in',
        record: fallbackRecord,
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
      {/* LEFT 7 COLS: CAMERA SCANNER VIEWPORT */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-brand-border shadow-card flex flex-col justify-between space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-serif font-bold text-xl text-brand-dark flex items-center gap-2">
              <Camera className="w-5 h-5 text-brand-deep" />
              <span>QR Reception Scanner</span>
            </h3>
            <p className="text-xs text-brand-muted">
              Point camera at guest digital or printed QR pass for instantaneous check-in
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Camera Active</span>
          </div>
        </div>

        {/* Camera Viewport Simulation Frame */}
        <div className="relative h-80 sm:h-96 rounded-3xl bg-brand-dark overflow-hidden flex flex-col items-center justify-center p-6 text-center text-white border-4 border-brand-dark shadow-2xl">
          {/* Animated Laser Scanning Line */}
          <div className="absolute left-6 right-6 h-0.5 bg-gradient-to-r from-transparent via-brand-primary to-transparent shadow-[0_0_15px_#EFA3B5] animate-pulse" style={{ animationDuration: '1.8s' }} />

          {/* Viewport Corner Brackets */}
          <div className="absolute w-56 h-56 border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center pointer-events-none">
            <div className="w-48 h-48 border-2 border-brand-primary/80 rounded-2xl flex items-center justify-center">
              <QrCode className="w-16 h-16 text-white/25" />
            </div>
          </div>

          {/* Subtext */}
          <div className="relative z-10 space-y-2 mt-auto">
            <p className="text-xs font-semibold text-white/90">
              Align guest pass QR code inside the frame
            </p>
            <p className="text-[11px] text-white/60">
              Supports digital mobile passes and printed invitations
            </p>
          </div>
        </div>

        {/* Quick Simulation Triggers (Allows instant demonstration) */}
        <div className="space-y-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-brand-muted block">
            Simulate Instant Scans (Demonstration Triggers)
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <Button
              variant="secondary"
              size="sm"
              className="text-xs justify-between"
              onClick={() => handleSimulateScan('gst-001')}
            >
              <span>Scan Minh Anh</span>
              <span className="text-[10px] text-brand-deep font-mono">Table 05</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              className="text-xs justify-between"
              onClick={() => handleSimulateScan('gst-002')}
            >
              <span>Scan Quốc Bảo</span>
              <span className="text-[10px] text-brand-deep font-mono">Table 03</span>
            </Button>

            <Button
              variant="soft-pink"
              size="sm"
              className="text-xs justify-between text-rose-700"
              onClick={() => handleSimulateScan('gst-001')}
            >
              <span>Scan Duplicate</span>
              <span className="text-[10px] text-rose-600 font-bold">Warning</span>
            </Button>
          </div>
        </div>
      </div>

      {/* RIGHT 5 COLS: TODAY'S SUMMARY & RECENT ARRIVALS */}
      <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-brand-border shadow-card flex flex-col justify-between space-y-6">
        <div className="space-y-1 border-b border-brand-border/60 pb-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-brand-deep">
            Live Reception Telemetry
          </span>
          <h3 className="font-serif font-bold text-xl text-brand-dark">
            Today's Check-in Summary
          </h3>
          <p className="text-xs text-brand-muted">Real-time arrival rate for The Reverie Saigon banquet</p>
        </div>

        {/* 3 Metrics Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-brand-bg/60 border border-brand-border text-center space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-muted block">Expected</span>
            <span className="font-serif font-bold text-2xl text-brand-dark">{receptionMetrics.expected}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Checked-in</span>
            <span className="font-serif font-bold text-2xl text-emerald-700">{receptionMetrics.checkedIn}</span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Remaining</span>
            <span className="font-serif font-bold text-2xl text-amber-700">{receptionMetrics.remaining}</span>
          </div>
        </div>

        {/* Recent Arrivals Stream */}
        <div className="space-y-3 flex-1">
          <div className="flex items-center justify-between text-xs font-semibold text-brand-dark">
            <span>Recent Arrivals</span>
            <span className="text-[11px] text-brand-muted">{checkInRecords.length} Logged</span>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {checkInRecords.slice(0, 5).map((rec) => (
              <div
                key={rec.id}
                className="p-3 rounded-2xl bg-brand-bg/40 border border-brand-border/70 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-brand-dark truncate">{rec.guestName}</p>
                    <p className="text-[11px] text-brand-muted">
                      {rec.tableNumber} • {rec.guestsCount} Guest(s)
                    </p>
                  </div>
                </div>

                <span className="font-mono text-[11px] text-brand-deep font-bold px-2 py-0.5 rounded-md bg-white border border-brand-border/60 shrink-0">
                  {rec.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* QR Result Modal */}
      <QRScanResultModal
        isOpen={scanResultData.isOpen}
        onClose={() => setScanResultData({ isOpen: false, resultType: null, record: null })}
        resultType={scanResultData.resultType}
        record={scanResultData.record}
      />
    </div>
  );
};
