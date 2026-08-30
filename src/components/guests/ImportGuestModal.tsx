import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Upload, FileSpreadsheet, Download, CheckCircle2, AlertCircle, FileText } from 'lucide-react';
import { Guest } from '../../types';

export const ImportGuestModal: React.FC = () => {
  const { isImportModalOpen, setIsImportModalOpen, importGuestsList } = useApp();
  const [isProcessing, setIsProcessing] = useState(false);
  const [previewCount, setPreviewCount] = useState(8);

  const sampleImportList: Omit<Guest, 'id'>[] = [
    {
      fullName: 'Trương Ngọc Ánh',
      email: 'anh.truong@media.vn',
      phone: '+84 909 234 567',
      relationship: 'VIP',
      group: 'VIP',
      invitationStatus: 'Sent',
      rsvpStatus: 'Confirmed',
      companions: 1,
      tableNumber: 'Table 02',
      checkInStatus: 'Not Checked-in',
      isVip: true,
      dietaryNotes: 'No shellfish',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
    },
    {
      fullName: 'Đoàn Văn Hậu',
      email: 'hau.doan@sports.vn',
      phone: '+84 918 345 678',
      relationship: "Groom's Friend",
      group: 'Friends',
      invitationStatus: 'Sent',
      rsvpStatus: 'Confirmed',
      companions: 1,
      tableNumber: 'Table 06',
      checkInStatus: 'Not Checked-in',
      isVip: false,
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
    },
    {
      fullName: 'Võ Thị Sáu Mai',
      email: 'mai.vo@techcorp.vn',
      phone: '+84 972 123 890',
      relationship: 'Colleague',
      group: 'Colleagues',
      invitationStatus: 'Sent',
      rsvpStatus: 'Pending',
      companions: 0,
      tableNumber: 'Unassigned',
      checkInStatus: 'Not Checked-in',
      isVip: false,
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100'
    },
    {
      fullName: 'Phan Anh Tuấn',
      email: 'tuan.phan@lawfirm.vn',
      phone: '+84 938 456 789',
      relationship: 'Family',
      group: 'Family',
      invitationStatus: 'Sent',
      rsvpStatus: 'Confirmed',
      companions: 2,
      tableNumber: 'Table 01',
      checkInStatus: 'Not Checked-in',
      isVip: true,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      fullName: 'Hoàng Kim Ngân',
      email: 'ngan.kim@design.vn',
      phone: '+84 981 223 344',
      relationship: "Bride's Friend",
      group: 'Friends',
      invitationStatus: 'Sent',
      rsvpStatus: 'Confirmed',
      companions: 0,
      tableNumber: 'Table 04',
      checkInStatus: 'Not Checked-in',
      isVip: false,
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100'
    }
  ];

  const handleImport = () => {
    setIsProcessing(true);
    setTimeout(() => {
      importGuestsList(sampleImportList);
      setIsProcessing(false);
      setIsImportModalOpen(false);
    }, 700);
  };

  return (
    <Modal
      isOpen={isImportModalOpen}
      onClose={() => setIsImportModalOpen(false)}
      title="Import Guests from CSV / Excel"
      subtitle="Bulk import your wedding contacts, companions, and group tags effortlessly"
      maxWidth="xl"
      footer={
        <>
          <Button variant="ghost" onClick={() => setIsImportModalOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleImport}
            isLoading={isProcessing}
            icon={<Upload className="w-4 h-4" />}
          >
            Import {sampleImportList.length} Sample Guests
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Dropzone */}
        <div className="border-2 border-dashed border-brand-primary/40 hover:border-brand-primary rounded-2xl p-8 bg-brand-bg/40 text-center space-y-3 cursor-pointer transition-colors group">
          <div className="w-12 h-12 rounded-2xl bg-brand-soft text-brand-deep mx-auto flex items-center justify-center group-hover:scale-110 transition-transform shadow-subtle">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-semibold text-brand-dark">
              Click to upload or drag & drop spreadsheet
            </p>
            <p className="text-xs text-brand-muted">
              Supports .CSV, .XLSX, or Google Sheets export format
            </p>
          </div>
        </div>

        {/* Template download & mapping guide */}
        <div className="p-3.5 rounded-xl bg-white border border-brand-border flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-brand-dark">
            <FileText className="w-4 h-4 text-brand-accent" />
            <span>Need the official formatting spreadsheet?</span>
          </div>
          <button
            type="button"
            className="text-brand-deep font-semibold hover:underline flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" /> Download Template (.CSV)
          </button>
        </div>

        {/* Preview of mapped columns */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-brand-muted">
            Auto-detected Sample Rows ({sampleImportList.length} ready)
          </span>
          <div className="max-h-40 overflow-y-auto rounded-xl border border-brand-border bg-brand-bg/30 text-xs divide-y divide-brand-border/60">
            {sampleImportList.map((g, i) => (
              <div key={i} className="p-2.5 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-brand-dark">{g.fullName}</span>
                  <span className="text-brand-muted text-[11px] ml-2">({g.email})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-brand-soft/70 text-brand-deep text-[10px] font-medium">
                    {g.group}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-medium">
                    {g.rsvpStatus}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
