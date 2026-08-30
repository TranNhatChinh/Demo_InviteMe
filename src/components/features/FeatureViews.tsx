import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Palette,
  Calendar,
  Layers,
  Armchair,
  QrCode,
  Gift,
  MessageSquareHeart,
  Send,
  Sparkles,
  Settings,
  Heart,
  Download,
  Copy,
  ExternalLink,
  CheckCircle2,
  Share2,
  Printer,
  Edit3,
  Users,
  Search,
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input, TextArea } from '../common/Input';
import { useToast } from '../../context/ToastContext';

// --- INVITATION DESIGN VIEW ---
export const InvitationDesignView: React.FC = () => {
  const { wedding } = useApp();
  const { showToast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState('blush-editorial');

  const templates = [
    { id: 'blush-editorial', name: 'Blush Editorial (Active)', style: 'Serif Luxury', image: wedding.heroImage },
    { id: 'saigon-botanical', name: 'Saigon Botanical', style: 'Flora & Gold', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600' },
    { id: 'minimal-modern', name: 'Minimal Modernist', style: 'Clean Architecture', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Invitation Design & Templates</h1>
          <p className="text-sm text-brand-muted">Customize your interactive digital wedding card and envelope suite.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={<Copy className="w-3.5 h-3.5" />}
            onClick={() => showToast('Link Copied', 'Guest demo RSVP URL copied to clipboard.', 'success')}
          >
            Copy RSVP Link
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Share2 className="w-3.5 h-3.5" />}
            onClick={() => showToast('Preview Ready', 'Opening high-res mobile preview canvas.', 'wedding')}
          >
            Live Preview
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Template Selector (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-serif text-lg font-bold text-brand-dark">Luxury Template Gallery</h3>
          {templates.map((tpl) => (
            <div
              key={tpl.id}
              onClick={() => setSelectedTemplate(tpl.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white ${
                selectedTemplate === tpl.id
                  ? 'border-brand-primary ring-2 ring-brand-primary/20 shadow-hover'
                  : 'border-brand-border hover:border-brand-primary/40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif font-bold text-base text-brand-dark">{tpl.name}</span>
                {selectedTemplate === tpl.id && <Badge status="Confirmed">Active</Badge>}
              </div>
              <p className="text-xs text-brand-muted">{tpl.style}</p>
            </div>
          ))}
        </div>

        {/* Live Invitation Canvas Mockup (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-8 border border-brand-border shadow-card flex items-center justify-center min-h-[500px] bg-gradient-to-br from-brand-bg to-brand-blush/30">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-modal border border-brand-primary/20 p-8 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-brand-primary via-brand-soft to-brand-accent" />
            
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-accent">
                Together with their families
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
                {wedding.brideName}
                <span className="font-serif italic font-normal text-brand-deep block text-2xl my-1">&</span>
                {wedding.groomName}
              </h2>
            </div>

            <p className="text-xs text-brand-muted leading-relaxed font-light">
              Request the honour of your presence at their wedding celebration
            </p>

            <div className="py-4 border-y border-brand-border/60 space-y-1">
              <p className="font-serif font-bold text-lg text-brand-deep">
                Monday, December 14, 2026
              </p>
              <p className="text-xs text-brand-dark">Reception at 6:00 PM</p>
              <p className="text-xs text-brand-muted">{wedding.receptionVenue.name} • Ho Chi Minh City</p>
            </div>

            <Button variant="primary" size="md" className="w-full">
              RSVP Now (Accept / Decline)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- SEATING ARRANGEMENT VIEW ---
export const SeatingArrangementView: React.FC = () => {
  const { guests, wedding, setSelectedGuestId } = useApp();
  const tables = Array.from({ length: 15 }, (_, i) => {
    const num = (i + 1).toString().padStart(2, '0');
    const tableGuests = guests.filter((g) => g.tableNumber === `Table ${num}`);
    return {
      tableNumber: `Table ${num}`,
      name: i === 0 ? 'VIP & Family Table 01' : i === 1 ? 'VIP & Family Table 02' : `Table ${num}`,
      guests: tableGuests,
      capacity: 10,
    };
  });

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Seating Arrangement</h1>
          <p className="text-sm text-brand-muted">15 Banquet Tables at The Reverie Saigon Grand Ballroom.</p>
        </div>
        <Button variant="secondary" size="sm" icon={<Printer className="w-3.5 h-3.5" />} onClick={() => window.print()}>
          Print Seating Chart
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {tables.map((tbl) => (
          <div key={tbl.tableNumber} className="bg-white rounded-2xl p-5 border border-brand-border shadow-card space-y-3 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-brand-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Armchair className="w-4 h-4 text-brand-deep" />
                <span className="font-serif font-bold text-base text-brand-dark">{tbl.name}</span>
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${tbl.guests.length >= tbl.capacity ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
                {tbl.guests.length} / {tbl.capacity} Seats
              </span>
            </div>

            <div className="space-y-1.5 min-h-[120px] max-h-44 overflow-y-auto pr-1">
              {tbl.guests.length > 0 ? (
                tbl.guests.map((g) => (
                  <div
                    key={g.id}
                    onClick={() => setSelectedGuestId(g.id)}
                    className="flex items-center justify-between p-2 rounded-lg bg-brand-bg/50 hover:bg-brand-soft/30 cursor-pointer transition-colors text-xs"
                  >
                    <span className="font-medium text-brand-dark truncate">{g.fullName}</span>
                    <Badge status={g.rsvpStatus} size="sm" />
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-xs text-brand-muted italic">Empty table</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- QR RECEPTION CHECK-IN VIEW ---
export const QRCheckInView: React.FC = () => {
  const { guests, toggleCheckIn, metrics } = useApp();
  const [search, setSearch] = useState('');

  const searched = guests.filter((g) => g.fullName.toLowerCase().includes(search.toLowerCase()) || g.tableNumber.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Reception Desk QR Check-in</h1>
          <p className="text-sm text-brand-muted">Rapid attendee verification and table lookup for reception staff.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-brand-border shadow-xs">
          <QrCode className="w-5 h-5 text-sky-600" />
          <span className="text-sm font-serif font-bold text-brand-dark">{metrics.checkedIn} Checked-in of {metrics.expectedHeadcount} Expected</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-card space-y-4">
        <Input
          placeholder="Scan guest badge or search name/table..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="w-4 h-4" />}
        />

        <div className="divide-y divide-brand-border/60 max-h-96 overflow-y-auto">
          {searched.slice(0, 20).map((g) => (
            <div key={g.id} className="py-3 px-2 flex items-center justify-between hover:bg-brand-bg/40 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <img src={g.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'} alt="" className="w-10 h-10 rounded-full object-cover border border-brand-border" />
                <div>
                  <h4 className="font-semibold text-brand-dark text-sm">{g.fullName}</h4>
                  <p className="text-xs text-brand-muted">{g.tableNumber} • {g.companions > 0 ? `+${g.companions} companion` : 'Single guest'}</p>
                </div>
              </div>

              <Button
                variant={g.checkInStatus === 'Checked-in' ? 'soft-pink' : 'primary'}
                size="sm"
                onClick={() => toggleCheckIn(g.id)}
              >
                {g.checkInStatus === 'Checked-in' ? '✓ Checked-in' : 'Check In'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- GIFT BOOK & WISHES VIEW ---
export const GiftBookView: React.FC = () => {
  const { guests, metrics } = useApp();
  const wishesList = guests.filter((g) => g.wishMessage || g.giftAmountVND);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-brand-dark">Gift Book & Guest Wishes</h1>
          <p className="text-sm text-brand-muted">Digital blessing ledger and financial gift records.</p>
        </div>
        <div className="font-serif text-2xl font-bold text-brand-deep bg-white px-5 py-2 rounded-2xl border border-brand-primary/30 shadow-card">
          {(metrics.giftTotalVND).toLocaleString()} VND Total Gifts
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {wishesList.map((g) => (
          <div key={g.id} className="bg-white rounded-2xl p-6 border border-brand-border shadow-card space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={g.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60'} alt="" className="w-9 h-9 rounded-full object-cover border border-brand-border" />
                <div>
                  <h4 className="font-serif font-bold text-brand-dark">{g.fullName}</h4>
                  <p className="text-xs text-brand-muted">{g.relationship}</p>
                </div>
              </div>
              {g.giftAmountVND && (
                <span className="font-serif font-bold text-sm text-brand-deep bg-brand-soft/60 px-2.5 py-1 rounded-lg">
                  {g.giftAmountVND.toLocaleString()} VND
                </span>
              )}
            </div>
            {g.wishMessage && (
              <p className="text-xs text-brand-dark/80 italic leading-relaxed bg-brand-bg/50 p-3 rounded-xl border border-brand-border/60">
                "{g.wishMessage}"
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- AI ASSISTANT VIEW ---
export const AIAssistantView: React.FC = () => {
  const { wedding } = useApp();
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string | null>(
    "Hello Emily! I'm your InviteMe AI Wedding Concierge. I can compose heartfelt thank-you notes, draft delicate RSVP follow-up SMS reminders in Vietnamese or English, or analyze your seating compatibility."
  );

  const handleGenerate = (type: string) => {
    if (type === 'thankyou') {
      setResponse(`"Dearest Minh Anh, James and I are so deeply touched by your heartfelt presence at The Reverie Saigon. Having you celebrate our forever meant the absolute world to us! Thank you for the generous blessing and love." — Emily & James`);
    } else if (type === 'followup') {
      setResponse(`"Chào anh Quốc Bảo, chỉ còn ít ngày nữa là đến đám cưới của Emily & James (14/12/2026 tại The Reverie Saigon). Nhờ anh xác nhận tham dự qua link để tụi mình chu đáo chuẩn bị bàn tiệc nhé: https://inviteme.io/rsvp/emily-james. Thương mến!"`);
    }
  };

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-brand-dark flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-brand-accent" />
          AI Wedding Concierge
        </h1>
        <p className="text-sm text-brand-muted">Automated personalized thank-you copy, RSVP nudges, and speech generation.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-card space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button variant="soft-pink" size="sm" onClick={() => handleGenerate('thankyou')}>
            Generate Thank-you Card
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleGenerate('followup')}>
            Draft Pending RSVP Gentle Nudge (Vietnamese)
          </Button>
        </div>

        {response && (
          <div className="p-5 rounded-2xl bg-brand-bg border border-brand-primary/30 text-sm text-brand-dark leading-relaxed">
            {response}
          </div>
        )}
      </div>
    </div>
  );
};

// --- SETTINGS VIEW ---
export const SettingsView: React.FC = () => {
  const { currentUser, wedding, resetToSampleData } = useApp();
  const { showToast } = useToast();

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="space-y-1">
        <h1 className="font-serif text-3xl font-bold text-brand-dark">Account & Workspace Settings</h1>
        <p className="text-sm text-brand-muted">Manage your subscription plan, team members, and security.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-card space-y-6 max-w-2xl">
        <div className="flex items-center gap-4">
          <img src={currentUser.avatar} alt="" className="w-16 h-16 rounded-full object-cover border-2 border-brand-primary" />
          <div>
            <h3 className="font-serif font-bold text-xl text-brand-dark">{currentUser.name}</h3>
            <p className="text-xs text-brand-muted">{currentUser.email}</p>
            <span className="inline-block mt-1 text-[11px] font-semibold text-brand-deep bg-brand-soft px-2.5 py-0.5 rounded-full">
              {currentUser.plan} Active
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-brand-border space-y-3">
          <h4 className="text-xs font-semibold text-brand-deep uppercase tracking-wider">Demo Controls</h4>
          <Button variant="danger" size="sm" onClick={resetToSampleData}>
            Reset Entire Wedding Database to Initial State
          </Button>
        </div>
      </div>
    </div>
  );
};
