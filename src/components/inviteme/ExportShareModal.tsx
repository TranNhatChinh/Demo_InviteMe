import React, { useState } from 'react';
import { TableItem, WeddingGuest } from './types';
import { 
  Printer, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  X, 
  Sparkles, 
  Armchair, 
  Utensils, 
  FileText,
  Users
} from 'lucide-react';

interface ExportShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  tables: TableItem[];
  guests: WeddingGuest[];
  weddingName?: string;
}

export const ExportShareModal: React.FC<ExportShareModalProps> = ({
  isOpen,
  onClose,
  tables,
  guests,
  weddingName = 'Eleanor & Julian’s Wedding Celebration'
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const attendingGuests = guests.filter(g => g.rsvp === 'Attending');
  const seatedGuests = guests.filter(g => g.tableId !== null);
  const dietaryItems = guests
    .filter(g => g.dietary !== 'None' && g.rsvp === 'Attending')
    .map(g => `${g.name} (${g.dietary})`);

  const handleDownloadPDF = () => {
    // Triggers browser print dialog which gives standard "Save as PDF" print-ready format
    window.print();
  };

  const handleCopyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3B202B]/40 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl border border-[#F8C9D2] shadow-[0_25px_60px_rgba(59,32,43,0.18)] overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="no-print px-6 sm:px-8 py-5 bg-[#FDECEF] border-b border-[#F8C9D2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#F8C9D2] flex items-center justify-center text-[#EFA3B3] shadow-xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#3B202B]">
                Export & Share Seating Chart
              </h3>
              <p className="text-xs text-[#8B6A74]">
                Print-ready preview for banquet coordinators, catering staff, and wedding guests.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#8B6A74] hover:text-[#3B202B] rounded-xl hover:bg-white/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Action Bar with Requirement: Prominent primary button (Primary Rose #EFA3B3) to "Download Print-Ready PDF" */}
        <div className="no-print px-6 sm:px-8 py-4 bg-[#FFF9F6] border-b border-[#F8C9D2]/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#8B6A74]">
            <Sparkles className="w-4 h-4 text-[#EFA3B3]" />
            <span>Ready for high-resolution A4 / Letter Banquet Print</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyShareLink}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#F8C9D2] bg-white hover:bg-[#FDECEF] text-xs font-semibold text-[#3B202B] transition-colors shadow-xs"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#29422B]" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#8B6A74]" />
                  <span>Share Online Link</span>
                </>
              )}
            </button>

            {/* Prominent Primary Button using Primary Rose #EFA3B3 */}
            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#EFA3B3] hover:bg-[#F8C9D2] active:scale-[0.98] text-[#3B202B] text-sm font-bold shadow-md transition-all duration-200"
            >
              <Printer className="w-4 h-4 text-[#3B202B]" />
              <span>Download Print-Ready PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Preview Document (Clean luxury editorial look) */}
        <div className="p-6 sm:p-10 max-h-[65vh] overflow-y-auto bg-white space-y-8 print:p-0 print:max-h-none print:overflow-visible">
          {/* Printable Wedding Title & Header */}
          <div className="text-center pb-6 border-b border-[#F8C9D2]/80 space-y-1">
            <div className="font-serif text-xs uppercase tracking-widest text-[#8B6A74]">
              InviteMe · Official Reception Seating Arrangement
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#3B202B]">
              {weddingName}
            </h1>
            <p className="text-xs text-[#8B6A74]">
              Generated on {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            {/* Quick Metrics Pills */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#FDECEF] border border-[#F8C9D2] text-[#3B202B]">
                <strong>{tables.length}</strong> Reception Tables
              </span>
              <span className="px-3 py-1 rounded-full bg-[#B7CBB8]/30 border border-[#B7CBB8] text-[#1E3620]">
                <strong>{seatedGuests.length} / {attendingGuests.length}</strong> Guests Seated
              </span>
              <span className="px-3 py-1 rounded-full bg-[#FFF9F6] border border-[#E8CFA8] text-[#3B202B]">
                <strong>{dietaryItems.length}</strong> Special Dietary Notes
              </span>
            </div>
          </div>

          {/* Table Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tables.map((table) => {
              const tableGuests = guests.filter(g => g.tableId === table.id);

              return (
                <div
                  key={table.id}
                  className="rounded-2xl border border-[#F8C9D2] p-5 bg-[#FFF9F6] shadow-xs space-y-3 print:border-gray-300 print:bg-white"
                >
                  {/* Table Header */}
                  <div className="flex items-center justify-between border-b border-[#F8C9D2]/60 pb-2.5">
                    <div>
                      <div className="font-serif text-lg font-bold text-[#3B202B]">
                        {table.tableNumber}
                      </div>
                      <div className="text-xs text-[#8B6A74]">{table.name}</div>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-[#F8C9D2] text-[#3B202B]">
                      {tableGuests.length} / {table.capacity} Seated
                    </span>
                  </div>

                  {/* Guest Roster for this table */}
                  {tableGuests.length === 0 ? (
                    <div className="py-4 text-center text-xs text-[#8B6A74] italic">
                      No guests assigned to this table yet.
                    </div>
                  ) : (
                    <div className="space-y-2 text-xs">
                      {tableGuests.map((guest, idx) => (
                        <div
                          key={guest.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#F8C9D2]/50"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-[#FDECEF] text-[10px] font-bold text-[#3B202B] flex items-center justify-center">
                              {guest.seatNumber || idx + 1}
                            </span>
                            <span className="font-semibold text-[#3B202B]">{guest.name}</span>
                            <span className="text-[10px] text-[#8B6A74] px-1.5 py-0.2 rounded bg-[#FFF9F6] border border-[#F8C9D2]">
                              {guest.group}
                            </span>
                          </div>

                          {guest.dietary !== 'None' && (
                            <span className="text-[10px] text-[#3B202B] px-2 py-0.5 rounded bg-[#FDECEF] border border-[#E8CFA8] flex items-center gap-1">
                              <Utensils className="w-2.5 h-2.5 text-[#E8CFA8]" />
                              <span>{guest.dietary}</span>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Catering Dietary Summary Box */}
          {dietaryItems.length > 0 && (
            <div className="rounded-2xl border border-[#E8CFA8] bg-[#FFF9F6] p-5 space-y-2">
              <h4 className="font-serif text-sm font-bold text-[#3B202B] flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#E8CFA8]" />
                <span>Catering & Dietary Requirements Summary</span>
              </h4>
              <p className="text-xs text-[#8B6A74]">
                The following attending guests require tailored banquet preparation:
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {dietaryItems.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-white border border-[#E8CFA8] text-[#3B202B]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer signoff for print */}
          <div className="pt-4 border-t border-[#F8C9D2]/60 text-center text-xs text-[#8B6A74]">
            Thank you for celebrating with us · InviteMe Seating Intelligence System
          </div>
        </div>

        {/* Modal Bottom Footer */}
        <div className="no-print px-6 sm:px-8 py-4 bg-[#FDECEF] border-t border-[#F8C9D2] flex items-center justify-between">
          <span className="text-xs text-[#8B6A74]">
            Tip: Select "Save as PDF" in the printer destination options.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white border border-[#F8C9D2] text-xs font-semibold text-[#3B202B] hover:bg-[#FFF9F6] transition-colors"
          >
            Close Preview
          </button>
        </div>

      </div>
    </div>
  );
};
