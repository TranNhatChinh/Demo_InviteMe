import {
  Guest,
  WeddingData,
  PrepTask,
  ActivityItem,
  UserProfile,
  RSVPStatus,
  GuestGroup,
  InvitationStatus,
  TemplateItem,
  InvitationConfig,
  TableItem,
  CheckInRecord,
  GiftTransaction,
  WishItem,
  ThankYouMessage,
  AIChatMessage,
  AdminUser,
  AdminWedding,
  AdminTemplateData,
  ModerationItem,
  SupportTicket,
  SubscriptionPlan,
} from '../types';

export const initialUserProfile: UserProfile = {
  id: 'usr-001',
  name: 'Emily Nguyen',
  email: 'emily.nguyen@inviteme.io',
  partnerName: 'James Tran',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  plan: 'Luxury Concierge',
  notificationCount: 3,
};

export const initialWeddingData: WeddingData = {
  id: 'wed-2026-emily-james',
  name: 'Emily & James Wedding',
  brideName: 'Emily Nguyen',
  groomName: 'James Tran',
  brideAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  groomAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80',
  weddingDate: '2026-12-14',
  weddingTime: '17:30',
  ceremonyVenue: {
    name: 'St. Joseph Cathedral',
    address: '56 Hai Ba Trung, District 1, Ho Chi Minh City',
    city: 'Ho Chi Minh City',
    time: '10:00 AM - 11:30 AM',
    notes: 'Historic neoclassical cathedral. Ample parking available via Gate B.',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-195fe578cb26?w=600&auto=format&fit=crop&q=80'
  },
  receptionVenue: {
    name: 'The Reverie Saigon',
    address: 'Times Square Building, 22-36 Nguyen Hue Blvd, District 1, Ho Chi Minh City',
    city: 'Ho Chi Minh City',
    time: '06:00 PM - 10:00 PM',
    notes: 'Grand Ballroom 5th Floor. Black-tie & Elegant Cocktail attire.',
    imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&auto=format&fit=crop&q=80'
  },
  weddingStyle: 'Modern Romantic',
  theme: 'Blush Pink & Ivory',
  hashtag: '#EmilyAndJames2026',
  heroImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80',
  totalTargetGuests: 150,
  totalTables: 15,
  storyTimeline: [
    {
      id: 'ml-1',
      year: '2018',
      title: 'The First Hello',
      description: 'Met during a rainy evening at The Workshop Coffee in Saigon. We shared an umbrella and talked about art and design for four hours.',
      location: 'The Workshop Coffee, District 1'
    },
    {
      id: 'ml-2',
      year: '2020',
      title: 'Our First Adventure',
      description: 'Spent a magical autumn week in Kyoto & Da Lat, discovering a shared love for photography, morning mist, and quiet bookstores.',
      location: 'Kyoto & Da Lat'
    },
    {
      id: 'ml-3',
      year: '2023',
      title: 'The Proposal',
      description: 'James proposed on a sunset sailboat cruise along Amalfi Coast under fireworks and a thousand stars. Emily said yes in tears.',
      location: 'Positano, Amalfi Coast'
    },
    {
      id: 'ml-4',
      year: '2026',
      title: 'Forever Begins',
      description: 'Beginning our forever surrounded by the family and lifelong friends who mean the absolute world to us.',
      location: 'The Reverie Saigon'
    }
  ]
};

export const initialTables: TableItem[] = [
  { id: 'tbl-01', tableNumber: 'Table 01', name: 'VIP & Family Table 01', capacity: 10, category: 'VIP', zone: 'front-stage', notes: 'Bride immediate family & parents' },
  { id: 'tbl-02', tableNumber: 'Table 02', name: 'VIP & Family Table 02', capacity: 10, category: 'VIP', zone: 'front-stage', notes: 'Groom immediate family & parents' },
  { id: 'tbl-03', tableNumber: 'Table 03', name: 'VIP Relatives Table', capacity: 10, category: 'VIP', zone: 'front-stage', notes: 'Grandparents, aunts, uncles' },
  { id: 'tbl-04', tableNumber: 'Table 04', name: 'Bride Best Friends', capacity: 10, category: 'Friends', zone: 'center', notes: 'High school & university closest friends' },
  { id: 'tbl-05', tableNumber: 'Table 05', name: 'Groom Circle & Friends', capacity: 10, category: 'Friends', zone: 'center', notes: 'College alumni & groomsmen unit (Over Capacity)' },
  { id: 'tbl-06', tableNumber: 'Table 06', name: 'Design Studio Colleagues', capacity: 10, category: 'Colleagues', zone: 'side-left', notes: 'Emily creative agency team' },
  { id: 'tbl-07', tableNumber: 'Table 07', name: 'Tech & Architecture Partners', capacity: 10, category: 'Colleagues', zone: 'side-right', notes: 'James engineering founders & mentors' },
  { id: 'tbl-08', tableNumber: 'Table 08', name: 'Saigon Creative Network', capacity: 10, category: 'Friends', zone: 'center', notes: 'Photographers, artists & design friends' },
  { id: 'tbl-09', tableNumber: 'Table 09', name: 'Extended Cousins & Youth', capacity: 10, category: 'Family', zone: 'rear', notes: 'Younger cousins & companions' },
  { id: 'tbl-10', tableNumber: 'Table 10', name: 'Overseas Guests & Travel Pals', capacity: 10, category: 'Friends', zone: 'side-left', notes: 'Guests traveling from Singapore, Tokyo, Sydney' },
  { id: 'tbl-11', tableNumber: 'Table 11', name: 'University Alumni Circle', capacity: 10, category: 'Friends', zone: 'side-right', notes: 'RMIT & Architecture alumni' },
  { id: 'tbl-12', tableNumber: 'Table 12', name: 'High School Classmates', capacity: 10, category: 'Friends', zone: 'center', notes: 'Le Hong Phong alumni circle' },
  { id: 'tbl-13', tableNumber: 'Table 13', name: 'Industry Executive VIPs', capacity: 10, category: 'VIP', zone: 'front-stage', notes: 'Executive board & partners' },
  { id: 'tbl-14', tableNumber: 'Table 14', name: 'Family Friends & Neighbors', capacity: 10, category: 'Family', zone: 'rear', notes: 'Lifelong family neighborhood friends' },
  { id: 'tbl-15', tableNumber: 'Table 15', name: 'Open Banquet Reserve', capacity: 10, category: 'General', zone: 'rear', notes: 'Reserve seating for walk-ins & late confirmations' },
];

export const initialCheckInRecords: CheckInRecord[] = [
  {
    id: 'chk-01',
    guestId: 'gst-001',
    guestName: 'Nguyễn Minh Anh',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    time: '18:24',
    tableNumber: 'Table 05',
    guestsCount: 2,
    staffName: 'Linh Tran',
    relationship: "Bride's Friend",
    status: 'Confirmed',
  },
  {
    id: 'chk-02',
    guestId: 'gst-002',
    guestName: 'Trần Quốc Bảo',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    time: '18:21',
    tableNumber: 'Table 03',
    guestsCount: 1,
    staffName: 'Linh Tran',
    relationship: 'Friend',
    status: 'Confirmed',
  },
  {
    id: 'chk-03',
    guestId: 'gst-walkin-01',
    guestName: 'Phan Khắc Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    time: '18:17',
    tableNumber: 'Table 15',
    guestsCount: 2,
    isWalkIn: true,
    staffName: 'Linh Tran',
    relationship: 'Walk-in Guest',
    status: 'Walk-in',
  },
  {
    id: 'chk-04',
    guestId: 'gst-004',
    guestName: 'Phạm Gia Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    time: '18:12',
    tableNumber: 'Table 03',
    guestsCount: 3,
    staffName: 'Linh Tran',
    relationship: 'VIP',
    status: 'Confirmed',
  },
  {
    id: 'chk-05',
    guestId: 'gst-006',
    guestName: 'Đặng Thanh Thảo',
    guestAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    time: '18:05',
    tableNumber: 'Table 01',
    guestsCount: 2,
    staffName: 'Linh Tran',
    relationship: "Bride's Sister",
    status: 'Confirmed',
  }
];

export const initialTemplates: TemplateItem[] = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    category: 'Romantic',
    description: 'Soft watercolor blush gradients paired with elegant serif typography and gold leaf foil accents.',
    coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&auto=format&fit=crop&q=80',
    badge: 'Popular',
    primaryColor: '#EFA3B5',
    accentColor: '#A94F68',
    fontPair: 'Cormorant Garamond + Plus Jakarta Sans',
    tagline: 'Soft & Ethereal Wedding Editorial'
  },
  {
    id: 'modern-ivory',
    name: 'Modern Ivory',
    category: 'Modern',
    description: 'Clean architectural lines with generous whitespace, warm alabaster tones, and high-fashion editorial styling.',
    coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1519225448526-0091873138b1?w=800&auto=format&fit=crop&q=80',
    badge: 'Trending',
    primaryColor: '#D4AF37',
    accentColor: '#2B2325',
    fontPair: 'Playfair Display + Inter',
    tagline: 'High-Fashion Contemporary Elegance'
  },
  {
    id: 'garden-bloom',
    name: 'Garden Bloom',
    category: 'Classic',
    description: 'Inspired by romantic Parisian botanicals with delicate sage greenery, pressed flowers, and timeless calligraphy.',
    coverImage: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
    primaryColor: '#4FA87A',
    accentColor: '#2F4F4F',
    fontPair: 'Cormorant Garamond + Inter',
    tagline: 'French Botanical Romance'
  },
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    category: 'Traditional',
    description: 'Traditional monogram crest with bespoke typography, embossed borders, and regal black-tie sophistication.',
    coverImage: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80',
    badge: 'Luxury',
    primaryColor: '#C5A880',
    accentColor: '#53354A',
    fontPair: 'Playfair Display + Cormorant',
    tagline: 'Timeless Royal Monogram'
  },
  {
    id: 'midnight-love',
    name: 'Midnight Love',
    category: 'Luxury',
    description: 'Dramatic celestial noir aesthetic with metallic foil stars, deep violet shadows, and glowing lantern ambience.',
    coverImage: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
    badge: 'Exclusive',
    primaryColor: '#6C5CE7',
    accentColor: '#2D3436',
    fontPair: 'Cinzel + Inter',
    tagline: 'Nocturne Starlight Celebration'
  },
  {
    id: 'editorial-rose',
    name: 'Editorial Rose',
    category: 'Romantic',
    description: 'Vogue-inspired runway layout with bold magazine covers, soft pink silks, and candid photo carousels.',
    coverImage: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop&q=80',
    previewImage: 'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80',
    primaryColor: '#D97891',
    accentColor: '#75676B',
    fontPair: 'Playfair Display + Plus Jakarta Sans',
    tagline: 'Vogue Wedding Editorial'
  }
];

export const initialInvitationConfig: InvitationConfig = {
  templateId: 'blush-romance',
  primaryColor: '#EFA3B5',
  accentColor: '#A94F68',
  backgroundStyle: 'blush',
  fontFamily: 'cormorant',
  coverPhotoUrl: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1200&auto=format&fit=crop&q=80',
  welcomeQuote: 'Two souls, one beautiful journey.',
  welcomeMessage: 'We are delighted to invite you to celebrate our special day with us. Your presence will make our wedding day complete and memorable forever.',
  dressCodeTitle: 'Blush & Ivory',
  dressCodeDescription: 'Celebrate with us in soft, romantic tones. We kindly request guests to dress in formal cocktail or black-tie attire within our romantic blush palette.',
  dressCodeColors: ['#EFA3B5', '#F8DDE3', '#FFFFFF', '#D4AF37', '#2B2325'],
  scheduleEvents: [
    {
      time: '10:00 AM',
      title: 'Wedding Ceremony',
      location: 'St. Joseph Cathedral',
      description: 'Exchange of vows and blessing ceremony in the historical neoclassical sanctuary.'
    },
    {
      time: '06:00 PM',
      title: 'Wedding Reception & Banquet',
      location: 'The Reverie Saigon (Grand Ballroom)',
      description: 'Welcome cocktails followed by a 6-course gastronomic banquet and champagne toast.'
    },
    {
      time: '09:30 PM',
      title: 'After Party & Dance',
      location: 'Sky Lounge, 39th Floor',
      description: 'Signature cocktails, live acoustic band, and late-night dancing under the Saigon skyline.'
    }
  ],
  galleryPhotos: [
    'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&auto=format&fit=crop&q=80'
  ],
  sections: {
    hero: true,
    ourStory: true,
    gallery: true,
    schedule: true,
    venue: true,
    dressCode: true,
    rsvp: true,
    gift: true,
    wishes: true,
    footer: true
  }
};

export const initialTasks: PrepTask[] = [
  { id: 'tsk-1', title: 'Create wedding page', completed: true, category: 'invitations' },
  { id: 'tsk-2', title: 'Upload couple photos', completed: true, category: 'invitations' },
  { id: 'tsk-3', title: 'Import guest list', completed: true, category: 'guests' },
  { id: 'tsk-4', title: 'Send invitations', completed: true, category: 'invitations' },
  { id: 'tsk-5', title: 'Follow up pending RSVP', completed: false, category: 'guests' },
  { id: 'tsk-6', title: 'Complete seating arrangement', completed: true, category: 'venue' },
  { id: 'tsk-7', title: 'Prepare check-in staff', completed: true, category: 'logistics' },
];

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'gift',
    guestName: 'Nguyễn Minh Anh',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    description: 'sent a monetary wedding gift of 2,000,000 VND via Vietcombank QR',
    timestamp: '2026-08-30T18:24:00Z',
    relativeTime: '18:24'
  },
  {
    id: 'act-2',
    type: 'checkin',
    guestName: 'Trần Quốc Bảo',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    description: 'checked in at reception (Table 03)',
    timestamp: '2026-08-30T18:21:00Z',
    relativeTime: '18:21'
  },
  {
    id: 'act-3',
    type: 'rsvp',
    guestName: 'Phan Khắc Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    description: 'registered as Walk-in guest (Table 15)',
    timestamp: '2026-08-30T18:17:00Z',
    relativeTime: '18:17'
  },
  {
    id: 'act-4',
    type: 'checkin',
    guestName: 'Phạm Gia Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    description: 'VIP checked in with 2 companions (Table 03)',
    timestamp: '2026-08-30T18:12:00Z',
    relativeTime: '18:12'
  },
  {
    id: 'act-5',
    type: 'open',
    guestName: 'Digital Invitation System',
    guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    description: '12 invitations were opened today by guests via smart links',
    timestamp: '2026-08-30T14:00:00Z',
    relativeTime: 'Today at 2:00 PM'
  }
];

export const initialGiftTransactions: GiftTransaction[] = [
  {
    id: 'gift-001',
    guestId: 'gst-001',
    guestName: 'Nguyễn Minh Anh',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    relationship: "Bride's Friend",
    group: 'Friends',
    amountVND: 2000000,
    message: 'Chúc hai bạn trăm năm hạnh phúc, mãi mãi ngọt ngào và thấu hiểu nhau như ngày đầu nhé! ❤️',
    status: 'Completed',
    timestamp: 'Dec 14, 2026 • 18:24',
    paymentMethod: 'Vietcombank QR',
    transactionRef: 'TXN-88921-VCB',
  },
  {
    id: 'gift-002',
    guestId: 'gst-004',
    guestName: 'Phạm Gia Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    relationship: 'VIP',
    group: 'VIP',
    amountVND: 10000000,
    message: 'Chúc mừng hạnh phúc hai em Emily & James. Chúc gia đình nhỏ luôn tràn ngập tiếng cười và thành công rực rỡ.',
    status: 'Completed',
    timestamp: 'Dec 14, 2026 • 18:12',
    paymentMethod: 'Vietcombank QR',
    transactionRef: 'TXN-88915-VCB',
  },
  {
    id: 'gift-003',
    guestId: 'gst-006',
    guestName: 'Đặng Thanh Thảo',
    guestAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    relationship: "Bride's Sister",
    group: 'Family',
    amountVND: 5000000,
    message: 'Chúc mừng chị gái yêu quý của em! Chúc anh James và chị Emily mãi luôn đồng hành, cùng nhau đi khắp thế giới.',
    status: 'Completed',
    timestamp: 'Dec 14, 2026 • 18:05',
    paymentMethod: 'Vietcombank QR',
    transactionRef: 'TXN-88902-VCB',
  },
  {
    id: 'gift-004',
    guestId: 'gst-002',
    guestName: 'Trần Quốc Bảo',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    relationship: 'Friend',
    group: 'Friends',
    amountVND: 1000000,
    message: 'Happy wedding! Chúc hai người bạn thân thiết một hành trình hôn nhân viên mãn và thật nhiều niềm vui.',
    status: 'Completed',
    timestamp: 'Dec 14, 2026 • 17:50',
    paymentMethod: 'Banking Transfer',
    transactionRef: 'TXN-88894-MB',
  },
  {
    id: 'gift-005',
    guestId: 'gst-005',
    guestName: 'Nguyễn Hoàng',
    guestAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    relationship: "Groom's Friend",
    group: 'Friends',
    amountVND: 2000000,
    message: 'Chúc mừng người anh em James đã rước được nàng thơ về dinh! Chúc hai bạn trăm năm hạnh phúc!',
    status: 'Completed',
    timestamp: 'Dec 14, 2026 • 17:35',
    paymentMethod: 'Vietcombank QR',
    transactionRef: 'TXN-88880-VCB',
  },
  {
    id: 'gift-006',
    guestId: 'gst-003',
    guestName: 'Lê Thu Hà',
    guestAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    relationship: 'Colleague',
    group: 'Colleagues',
    amountVND: 1000000,
    message: 'Dù bận công tác ở Singapore không dự được nhưng vẫn gửi trọn tình cảm và lời chúc phúc ngọt ngào nhất tới hai bạn!',
    status: 'Completed',
    timestamp: 'Dec 13, 2026 • 20:15',
    paymentMethod: 'Banking Transfer',
    transactionRef: 'TXN-88750-TECH',
  },
];

const generateInitialGifts = (): GiftTransaction[] => {
  const gifts: GiftTransaction[] = [...initialGiftTransactions];
  const amounts = [1000000, 1500000, 2000000, 500000, 1000000, 3000000, 2000000, 1000000];
  const groups: GuestGroup[] = ['Family', 'Friends', 'Colleagues', 'VIP'];

  for (let i = 7; i <= 87; i++) {
    const amt = amounts[i % amounts.length];
    const grp = groups[i % groups.length];
    gifts.push({
      id: `gift-${i.toString().padStart(3, '0')}`,
      guestId: `gst-${(i + 10).toString().padStart(3, '0')}`,
      guestName: `Guest ${i} (${grp})`,
      guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80',
      relationship: grp === 'VIP' ? 'VIP Partner' : `${grp} Guest`,
      group: grp,
      amountVND: amt,
      message: 'Chúc hai bạn luôn hạnh phúc và yêu thương nhau thật nhiều ❤️',
      status: 'Completed',
      timestamp: `Dec 14, 2026 • ${(17 - (i % 5))}:${(50 - (i % 45)).toString().padStart(2, '0')}`,
      paymentMethod: i % 3 === 0 ? 'Banking Transfer' : 'Vietcombank QR',
      transactionRef: `TXN-${88800 - i}-VCB`,
    });
  }
  return gifts;
};

export const initialWishes: WishItem[] = [
  {
    id: 'wish-01',
    guestName: 'Nguyễn Minh Anh',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    relationship: "Bride's Friend",
    message: 'Chúc hai bạn luôn hạnh phúc và yêu thương nhau thật nhiều. Một đám cưới cổ tích và khởi đầu tuyệt vời cho cuộc sống lứa đôi! ❤️',
    timestamp: '18:24 Today',
    likesCount: 14,
    isFeatured: true,
  },
  {
    id: 'wish-02',
    guestName: 'Trần Quốc Bảo',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    relationship: 'Friend',
    message: 'Congratulations to the perfect couple! May your journey together be filled with endless laughter, travels, and unforgettable memories.',
    timestamp: '18:21 Today',
    likesCount: 9,
  },
  {
    id: 'wish-03',
    guestName: 'Đặng Thanh Thảo',
    guestAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    relationship: "Bride's Sister",
    message: 'My dearest sister, you make the most radiant bride! James, please always cherish and take good care of my lovely sister!',
    timestamp: '18:05 Today',
    likesCount: 28,
    isFeatured: true,
  },
  {
    id: 'wish-04',
    guestName: 'Phạm Gia Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    relationship: 'VIP Partner',
    message: 'Honored to witness this beautiful milestone. Wishing Emily & James prosperity, deep harmony, and eternal joy.',
    timestamp: '18:12 Today',
    likesCount: 11,
  },
  {
    id: 'wish-05',
    guestName: 'Lê Thu Hà',
    guestAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100',
    relationship: 'Colleague',
    message: 'Chúc hai bạn trăm năm hòa hợp, xây dựng tổ ấm hạnh phúc viên mãn. Rất tiếc không có mặt nhưng trái tim luôn hướng về hai bạn!',
    timestamp: 'Yesterday at 20:15',
    likesCount: 6,
  },
  {
    id: 'wish-06',
    guestName: 'Nguyễn Hoàng',
    guestAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    relationship: "Groom's Friend",
    message: 'Brother James, so happy for you! Emily is amazing and you two are made for each other. Cheers to forever!',
    timestamp: 'Yesterday at 18:30',
    likesCount: 8,
  }
];

export const initialAIChatMessages: AIChatMessage[] = [
  {
    id: 'msg-01',
    sender: 'assistant',
    content: 'Hi Emily! 👋 I am your InviteMe AI wedding assistant. How can I help make your wedding content even more special today?',
    timestamp: '10:00 AM',
  },
  {
    id: 'msg-02',
    sender: 'user',
    content: 'I want a warm, romantic welcome quote for our digital invitation cover.',
    timestamp: '10:01 AM',
  },
  {
    id: 'msg-03',
    sender: 'assistant',
    content: 'Here is a poetic, timeless recommendation crafted for your Modern Romantic theme:\n\n*"Two souls, one beautiful journey. In the presence of the people who mean the world to us, we begin our forever."*\n\nWould you like to apply this directly to your invitation builder, or explore a more playful tone?',
    timestamp: '10:01 AM',
    actionPayload: {
      type: 'invitation-quote',
      text: 'Two souls, one beautiful journey. In the presence of the people who mean the world to us, we begin our forever.',
    },
  },
];

export const initialThankYouMessages: ThankYouMessage[] = [
  {
    id: 'tym-001',
    guestId: 'gst-001',
    guestName: 'Nguyễn Minh Anh',
    guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80',
    relationship: "Bride's Friend",
    attendance: 'Yes',
    giftAmountVND: 2000000,
    message: 'Dear Minh Anh,\n\nThank you so much for being part of one of the most special days of our lives. Your presence, your love, and your thoughtful gift meant more to us than words can express.\n\nWe feel incredibly lucky to have you in our lives.\n\nWith love,\nEmily & James',
    status: 'Sent',
    sentChannel: 'SMS',
    sentAt: 'Dec 15, 2026 • 09:30',
  },
  {
    id: 'tym-002',
    guestId: 'gst-002',
    guestName: 'Trần Quốc Bảo',
    guestAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80',
    relationship: 'Friend',
    attendance: 'Yes',
    giftAmountVND: 1000000,
    message: 'Dear Quốc Bảo,\n\nHaving you celebrate with us at The Reverie Saigon made our wedding reception unforgettable! Thank you for your warm blessing and gift.\n\nWarmest regards,\nEmily & James',
    status: 'Sent',
    sentChannel: 'Email',
    sentAt: 'Dec 15, 2026 • 09:35',
  },
  {
    id: 'tym-003',
    guestId: 'gst-003',
    guestName: 'Lê Thu Hà',
    guestAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80',
    relationship: 'Colleague',
    attendance: 'No',
    giftAmountVND: 1000000,
    message: 'Dear Thu Hà,\n\nThank you so much for thinking of us and sending your lovely wedding gift all the way from Singapore! We missed having you there, but felt your warmth and love.\n\nBest wishes,\nEmily & James',
    status: 'Sent',
    sentChannel: 'Email',
    sentAt: 'Dec 15, 2026 • 09:40',
  },
  {
    id: 'tym-004',
    guestId: 'gst-004',
    guestName: 'Phạm Gia Huy',
    guestAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80',
    relationship: 'VIP',
    attendance: 'Yes',
    giftAmountVND: 10000000,
    message: 'Dear anh Gia Huy,\n\nEmily & James would like to express our deepest gratitude for your presence at our wedding reception and your incredibly generous blessing. It was truly an honor to celebrate this milestone with you.\n\nRespectfully & with love,\nEmily & James',
    status: 'Pending',
  },
  {
    id: 'tym-005',
    guestId: 'gst-005',
    guestName: 'Nguyễn Hoàng',
    guestAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80',
    relationship: "Groom's Friend",
    attendance: 'Yes',
    giftAmountVND: 2000000,
    message: 'Hey brother Hoàng!\n\nThank you for rocking the after-party with us and for the generous gift! Having you by my side as I married Emily meant everything to me.\n\nCheers,\nJames & Emily',
    status: 'Pending',
  },
];

export const generate87ThankYouMessages = (): ThankYouMessage[] => {
  const list: ThankYouMessage[] = [...initialThankYouMessages];
  for (let i = 6; i <= 87; i++) {
    const isSent = i <= 52;
    list.push({
      id: `tym-${i.toString().padStart(3, '0')}`,
      guestId: `gst-${(i + 5).toString().padStart(3, '0')}`,
      guestName: `Guest ${i}`,
      guestAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80',
      relationship: i % 4 === 0 ? 'Colleague' : i % 3 === 0 ? 'Family' : 'Friend',
      attendance: i % 7 === 0 ? 'No' : 'Yes',
      giftAmountVND: (1000000 + (i % 4) * 500000),
      message: `Dear Guest ${i},\n\nThank you so much for being part of our special day and for your wonderful gift. Your love and support make our journey so bright!\n\nWith love,\nEmily & James`,
      status: isSent ? 'Sent' : 'Generated',
      sentChannel: isSent ? (i % 2 === 0 ? 'Email' : 'SMS') : undefined,
      sentAt: isSent ? 'Dec 15, 2026 • 10:00' : undefined,
    });
  }
  return list;
};

export const generate150Guests = (): Guest[] => {
  const primaryGuests: Guest[] = [
    {
      id: 'gst-001',
      fullName: 'Nguyễn Minh Anh',
      email: 'minhanh@gmail.com',
      phone: '+84 908 123 456',
      relationship: "Bride's Friend",
      group: 'Friends',
      invitationStatus: 'Opened',
      rsvpStatus: 'Confirmed',
      companions: 1,
      companionNames: ['Phan Gia Bảo'],
      dietaryNotes: 'Vegetarian',
      tableNumber: 'Table 05',
      checkInStatus: 'Checked-in',
      checkedInAt: '18:24',
      isVip: false,
      invitationSentAt: '2026-08-15',
      invitationOpenedAt: '2026-08-15',
      rsvpSubmittedAt: '2026-08-16',
      giftAmountVND: 2000000,
      wishMessage: 'Wishing Emily and James a lifetime of happiness, laughter, and endless adventures!',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'minh-anh'
    },
    {
      id: 'gst-002',
      fullName: 'Trần Quốc Bảo',
      email: 'bao.tran@gmail.com',
      phone: '+84 912 345 678',
      relationship: 'Friend',
      group: 'Friends',
      invitationStatus: 'Sent',
      rsvpStatus: 'Confirmed',
      companions: 0,
      tableNumber: 'Table 03',
      checkInStatus: 'Checked-in',
      checkedInAt: '18:21',
      isVip: false,
      invitationSentAt: '2026-08-15',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'quoc-bao'
    },
    {
      id: 'gst-003',
      fullName: 'Lê Thu Hà',
      email: 'ha.le@gmail.com',
      phone: '+84 983 234 567',
      relationship: 'Colleague',
      group: 'Colleagues',
      invitationStatus: 'Opened',
      rsvpStatus: 'Declined',
      companions: 0,
      tableNumber: 'Unassigned',
      checkInStatus: 'Not Checked-in',
      isVip: false,
      invitationSentAt: '2026-08-15',
      invitationOpenedAt: '2026-08-17',
      rsvpSubmittedAt: '2026-08-18',
      giftAmountVND: 1000000,
      wishMessage: 'So sorry I will be on a business trip in Singapore, sending all my love to you two!',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'thu-ha'
    },
    {
      id: 'gst-004',
      fullName: 'Phạm Gia Huy',
      email: 'huy.pham@gmail.com',
      phone: '+84 903 888 999',
      relationship: 'VIP',
      group: 'VIP',
      invitationStatus: 'Opened',
      rsvpStatus: 'Confirmed',
      companions: 2,
      companionNames: ['Trần Mai Linh', 'Phạm Bảo An'],
      dietaryNotes: 'No seafood for companion',
      tableNumber: 'Table 03',
      checkInStatus: 'Checked-in',
      checkedInAt: '18:12',
      isVip: true,
      invitationSentAt: '2026-08-12',
      invitationOpenedAt: '2026-08-12',
      rsvpSubmittedAt: '2026-08-13',
      giftAmountVND: 10000000,
      wishMessage: 'Honored to celebrate this special milestone with Emily & James!',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'gia-huy'
    },
    {
      id: 'gst-005',
      fullName: 'Nguyễn Hoàng',
      email: 'hoang.nguyen@outlook.com',
      phone: '+84 977 112 233',
      relationship: "Groom's Friend",
      group: 'Friends',
      invitationStatus: 'Opened',
      rsvpStatus: 'Confirmed',
      companions: 1,
      tableNumber: 'Table 05',
      checkInStatus: 'Not Checked-in',
      isVip: false,
      invitationSentAt: '2026-08-15',
      invitationOpenedAt: '2026-08-16',
      rsvpSubmittedAt: '2026-08-16',
      giftAmountVND: 2000000,
      wishMessage: 'Brother James, so happy for you! Wishing you both boundless joy.',
      avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'hoang-nguyen'
    },
    {
      id: 'gst-006',
      fullName: 'Đặng Thanh Thảo',
      email: 'thao.dang@designstudio.vn',
      phone: '+84 934 556 778',
      relationship: "Bride's Sister",
      group: 'Family',
      invitationStatus: 'Opened',
      rsvpStatus: 'Confirmed',
      companions: 1,
      companionNames: ['Vũ Hải Đăng'],
      dietaryNotes: 'None',
      tableNumber: 'Table 01',
      checkInStatus: 'Checked-in',
      checkedInAt: '18:05',
      isVip: true,
      invitationSentAt: '2026-08-10',
      invitationOpenedAt: '2026-08-10',
      rsvpSubmittedAt: '2026-08-10',
      giftAmountVND: 5000000,
      wishMessage: 'My dearest sister, you will make the most radiant bride in the world!',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'thanh-thao'
    },
    {
      id: 'gst-007',
      fullName: 'Vũ Đức Nam',
      email: 'ducnam.vu@vintech.com',
      phone: '+84 945 678 123',
      relationship: 'Colleague',
      group: 'Colleagues',
      invitationStatus: 'Opened',
      rsvpStatus: 'Maybe',
      companions: 0,
      tableNumber: 'Unassigned',
      checkInStatus: 'Not Checked-in',
      isVip: false,
      invitationSentAt: '2026-08-15',
      invitationOpenedAt: '2026-08-18',
      notes: 'Waiting for work schedule confirmation by end of next week',
      avatarUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
      personalizedSlug: 'duc-nam'
    }
  ];

  const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý'];
  const middleNamesFemale = ['Thị', 'Ngọc', 'Thanh', 'Mai', 'Thùy', 'Phương', 'Kim', 'Bảo', 'Hương', 'Mỹ'];
  const middleNamesMale = ['Văn', 'Quốc', 'Đức', 'Gia', 'Minh', 'Hải', 'Hữu', 'Tuấn', 'Công', 'Khánh'];
  const givenNamesFemale = ['Anh', 'Linh', 'Trang', 'Hương', 'Nhi', 'Vy', 'Trâm', 'My', 'Chi', 'Yến', 'Quỳnh', 'Thảo', 'Ngân', 'Châu', 'Duyên'];
  const givenNamesMale = ['Nam', 'Huy', 'Khoa', 'Bảo', 'Tùng', 'Phong', 'Duy', 'Khôi', 'Hưng', 'Lâm', 'Thịnh', 'Long', 'Đạt', 'Hiếu', 'Bách'];

  const avatarsFemale = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80'
  ];

  const avatarsMale = [
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80'
  ];

  const dietaryOptions = ['None', 'None', 'None', 'None', 'Vegetarian', 'Gluten-free', 'Halal', 'No seafood', 'No nuts'];
  const relations = ["Bride's Friend", "Groom's Friend", "Family", "Colleague", "VIP", "High School Friend", "University Alumni", "Cousin"];

  const guests: Guest[] = [...primaryGuests];

  const statusPlan: RSVPStatus[] = [
    ...Array(108).fill('Confirmed'),
    ...Array(20).fill('Pending'),
    ...Array(9).fill('Declined'),
    ...Array(6).fill('Maybe')
  ];

  for (let i = 0; i < statusPlan.length; i++) {
    const isFemale = (i % 2 === 0);
    const ln = lastNames[i % lastNames.length];
    const mn = isFemale ? middleNamesFemale[i % middleNamesFemale.length] : middleNamesMale[i % middleNamesMale.length];
    const gn = isFemale ? givenNamesFemale[i % givenNamesFemale.length] : givenNamesMale[i % givenNamesMale.length];
    const fullName = `${ln} ${mn} ${gn}`;
    const cleanName = fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]/g, '.');
    const slug = `${cleanName}-${i + 8}`;
    const email = `${cleanName}.${i + 8}@example.com`;
    const phone = `+84 ${900 + (i % 99)} ${(100 + i * 7).toString().padStart(3, '0')} ${(200 + i * 3).toString().padStart(3, '0')}`;
    
    const rsvpStatus = statusPlan[i];
    const rel = relations[i % relations.length];
    const group: GuestGroup = rel === 'VIP' ? 'VIP' : (rel === 'Family' || rel === 'Cousin') ? 'Family' : rel === 'Colleague' ? 'Colleagues' : 'Friends';
    const isVip = group === 'VIP' || (i % 15 === 0);

    let invitationStatus: InvitationStatus = 'Sent';
    if (rsvpStatus === 'Confirmed' || rsvpStatus === 'Declined' || rsvpStatus === 'Maybe') {
      invitationStatus = 'Opened';
    } else {
      invitationStatus = (i % 3 === 0) ? 'Opened' : (i % 4 === 0) ? 'Delivered' : 'Sent';
    }

    let companions = 0;
    if (rsvpStatus === 'Confirmed' && i < 26) {
      companions = 1;
    }

    let tableNumber = 'Unassigned';

    if (i >= 125) {
      tableNumber = 'Unassigned';
    } else if (i < 10) {
      tableNumber = 'Table 05';
    } else if (i < 19) {
      tableNumber = 'Table 08';
    } else {
      const tableIdx = ((i % 15) + 1).toString().padStart(2, '0');
      tableNumber = `Table ${tableIdx}`;
    }

    const isCheckedIn = (i < 80);
    const checkInStatus = isCheckedIn ? 'Checked-in' : 'Not Checked-in';
    const checkedInAt = isCheckedIn ? `18:${(20 - (i % 20)).toString().padStart(2, '0')}` : null;

    const dietary = dietaryOptions[i % dietaryOptions.length];
    const avatar = isFemale ? avatarsFemale[i % avatarsFemale.length] : avatarsMale[i % avatarsMale.length];

    guests.push({
      id: `gst-${(i + 8).toString().padStart(3, '0')}`,
      fullName,
      email,
      phone,
      relationship: rel,
      group,
      invitationStatus,
      rsvpStatus,
      companions,
      dietaryNotes: dietary !== 'None' ? dietary : undefined,
      tableNumber,
      checkInStatus,
      checkedInAt,
      isVip,
      invitationSentAt: '2026-08-15',
      invitationOpenedAt: invitationStatus === 'Opened' ? '2026-08-17' : undefined,
      rsvpSubmittedAt: rsvpStatus !== 'Pending' ? '2026-08-19' : undefined,
      giftAmountVND: rsvpStatus === 'Confirmed' ? (1000000 + (i % 5) * 500000) : undefined,
      avatarUrl: avatar,
      personalizedSlug: slug
    });
  }

  return guests;
};

export const defaultGiftTransactions = generateInitialGifts();
export const defaultWishes = initialWishes;
export const defaultThankYouMessages = generate87ThankYouMessages();

// --- ENTERPRISE ADMIN MOCK DATA ---

export const initialAdminUsers: AdminUser[] = [
  {
    id: 'adm-usr-1',
    name: 'Emily Nguyen',
    email: 'emily.nguyen@inviteme.io',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    role: 'Couple',
    plan: 'Premium',
    status: 'Active',
    createdAt: 'Aug 10, 2026',
    weddingsCount: 1,
    lastActive: 'Just now',
  },
  {
    id: 'adm-usr-2',
    name: 'James Tran',
    email: 'james.tran@architecture.vn',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    role: 'Couple',
    plan: 'Premium',
    status: 'Active',
    createdAt: 'Aug 10, 2026',
    weddingsCount: 1,
    lastActive: '2h ago',
  },
  {
    id: 'adm-usr-3',
    name: 'Linh Tran',
    email: 'linh.staff@reveriesaigon.vn',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    role: 'Reception Staff',
    plan: 'Business',
    status: 'Active',
    createdAt: 'Aug 15, 2026',
    weddingsCount: 8,
    lastActive: 'Active now (Door Scanner)',
  },
  {
    id: 'adm-usr-4',
    name: 'Admin Mai Anh',
    email: 'admin.maianh@inviteme.io',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100',
    role: 'Admin',
    plan: 'Business',
    status: 'Active',
    createdAt: 'Jan 01, 2026',
    weddingsCount: 2341,
    lastActive: 'Active now',
  },
  {
    id: 'adm-usr-5',
    name: 'Đoàn Nhật Minh & Mai Thu',
    email: 'minh.thu@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100',
    role: 'Couple',
    plan: 'Premium',
    status: 'Active',
    createdAt: 'Aug 22, 2026',
    weddingsCount: 1,
    lastActive: '1d ago',
  },
  {
    id: 'adm-usr-6',
    name: 'Hoàng Long & Kim Yến',
    email: 'long.yen@vietcom.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    role: 'Couple',
    plan: 'Free',
    status: 'Active',
    createdAt: 'Aug 28, 2026',
    weddingsCount: 1,
    lastActive: '3d ago',
  },
  {
    id: 'adm-usr-7',
    name: 'Phan Gia Huy (Suspended)',
    email: 'spam.user@test.org',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    role: 'Couple',
    plan: 'Free',
    status: 'Suspended',
    createdAt: 'Jul 15, 2026',
    weddingsCount: 0,
    lastActive: '14d ago',
  }
];

export const initialAdminWeddings: AdminWedding[] = [
  {
    id: 'wed-001',
    title: 'Emily & James Wedding Celebration',
    coupleNames: 'Emily Nguyen & James Tran',
    date: 'Dec 14, 2026',
    guestsCount: 150,
    plan: 'Premium',
    status: 'Active',
    createdAt: 'Aug 10, 2026',
    rsvpRate: 85,
    totalGiftsVND: 128500000,
  },
  {
    id: 'wed-002',
    title: 'Nhật Minh & Mai Thu Grand Banquet',
    coupleNames: 'Đoàn Nhật Minh & Mai Thu',
    date: 'Nov 20, 2026',
    guestsCount: 320,
    plan: 'Business',
    status: 'Active',
    createdAt: 'Aug 22, 2026',
    rsvpRate: 92,
    totalGiftsVND: 245000000,
  },
  {
    id: 'wed-003',
    title: 'Hoàng Long & Kim Yến Intimate Vows',
    coupleNames: 'Hoàng Long & Kim Yến',
    date: 'Jan 15, 2027',
    guestsCount: 45,
    plan: 'Free',
    status: 'Active',
    createdAt: 'Aug 28, 2026',
    rsvpRate: 60,
    totalGiftsVND: 18000000,
  },
  {
    id: 'wed-004',
    title: 'Bảo Anh & Quốc Khánh Villa Romance',
    coupleNames: 'Bảo Anh & Quốc Khánh',
    date: 'Oct 18, 2026',
    guestsCount: 180,
    plan: 'Premium',
    status: 'Active',
    createdAt: 'Jul 10, 2026',
    rsvpRate: 78,
    totalGiftsVND: 84000000,
  }
];

export const initialAdminTemplates: AdminTemplateData[] = [
  {
    id: 'blush-romance',
    name: 'Blush Romance',
    category: 'Romantic',
    thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    usageCount: 2481,
    status: 'Published',
    rating: 4.95,
    createdAt: 'Jan 10, 2026',
  },
  {
    id: 'modern-ivory',
    name: 'Modern Ivory',
    category: 'Modern',
    thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400',
    usageCount: 1842,
    status: 'Published',
    rating: 4.92,
    createdAt: 'Jan 15, 2026',
  },
  {
    id: 'garden-bloom',
    name: 'Garden Bloom',
    category: 'Classic',
    thumbnail: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=400',
    usageCount: 756,
    status: 'Draft',
    rating: 4.88,
    createdAt: 'Feb 01, 2026',
  },
  {
    id: 'classic-elegance',
    name: 'Classic Elegance',
    category: 'Traditional',
    thumbnail: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=400',
    usageCount: 1120,
    status: 'Published',
    rating: 4.89,
    createdAt: 'Mar 12, 2026',
  },
  {
    id: 'midnight-love',
    name: 'Midnight Love',
    category: 'Luxury',
    thumbnail: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400',
    usageCount: 430,
    status: 'Published',
    rating: 4.97,
    createdAt: 'Apr 05, 2026',
  },
  {
    id: 'editorial-rose',
    name: 'Editorial Rose',
    category: 'Romantic',
    thumbnail: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=400',
    usageCount: 890,
    status: 'Published',
    rating: 4.91,
    createdAt: 'May 18, 2026',
  }
];

export const initialModerationItems: ModerationItem[] = [
  {
    id: 'mod-1',
    contentType: 'Wish',
    content: 'Spam promotional link for crypto gambling on wedding wishes wall',
    authorName: 'Unknown Guest',
    reporterName: 'Emily Nguyen',
    reason: 'Commercial Spam & Inappropriate advertising',
    reportedAt: '1h ago',
    status: 'Pending',
  },
  {
    id: 'mod-2',
    contentType: 'Custom Note',
    content: 'Testing inappropriate profanity in seating notes',
    authorName: 'Groom Circle Guest',
    reporterName: 'Linh Tran (Staff)',
    reason: 'Language violation',
    reportedAt: '3h ago',
    status: 'Pending',
  }
];

export const initialSupportTickets: SupportTicket[] = [
  {
    id: 'TCK-8821',
    userName: 'Đoàn Nhật Minh',
    userEmail: 'minh.thu@gmail.com',
    subject: 'Assistance with large guest CSV import (320 entries)',
    priority: 'High',
    status: 'Open',
    createdAt: '2h ago',
    category: 'Seating',
    messagesCount: 3,
    lastReply: 'User uploaded spreadsheet with special Vietnamese diacritics',
  },
  {
    id: 'TCK-8819',
    userName: 'Bảo Anh',
    userEmail: 'baoanh@gmail.com',
    subject: 'Custom domain setup for inviteme.com/baoanh-khanh',
    priority: 'Medium',
    status: 'In Progress',
    createdAt: '4h ago',
    category: 'Templates',
    messagesCount: 5,
    lastReply: 'DNS records pending verification by Cloudflare',
  },
  {
    id: 'TCK-8802',
    userName: 'Emily Nguyen',
    userEmail: 'emily.nguyen@inviteme.io',
    subject: 'Inquiry on Vietcombank sandbox QR verification speed',
    priority: 'Low',
    status: 'Resolved',
    createdAt: 'Yesterday',
    category: 'Billing',
    messagesCount: 4,
    lastReply: 'Resolved by Concierge Engineer (Instant auto-clearing active)',
  }
];

export const initialSubscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free Starter',
    priceVND: '0 VND',
    billingPeriod: 'forever free',
    tagline: 'Essential digital RSVP for intimate celebrations',
    features: [
      '1 Active Wedding',
      'Up to 50 Guests',
      'Basic Invitation Templates',
      'Standard RSVP Collection',
      'Email Customer Support',
    ],
  },
  {
    id: 'premium',
    name: 'Luxury Premium',
    priceVND: '1,490,000 VND',
    billingPeriod: 'per wedding',
    tagline: 'Complete digital management for modern couples',
    isPopular: true,
    features: [
      'Unlimited Guests & RSVPs',
      'All 6 Bespoke Editorial Templates',
      '2D Ballroom Seating Studio & AI Optimizer',
      'InviteMe AI Wedding Assistant',
      'Private Couple Gift Book & Bank QR',
      'Real-time Reception QR Check-in App',
      'Priority Concierge Support 24/7',
    ],
  },
  {
    id: 'business',
    name: 'Planner & Venue Business',
    priceVND: '4,900,000 VND',
    billingPeriod: 'per month',
    tagline: 'Multi-wedding operations for luxury agencies & ballrooms',
    features: [
      'Unlimited Weddings Simultaneously',
      'Unlimited Door Reception Staff Accounts',
      'Custom White-Label Branding & Domains',
      'Multi-Table Conflict Resolution Engine',
      'Exportable Financial & Headcount Audits',
      'Dedicated Account Concierge Manager',
    ],
  }
];
