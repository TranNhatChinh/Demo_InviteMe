export type RSVPStatus = 'Confirmed' | 'Pending' | 'Declined' | 'Maybe';

export type InvitationStatus = 'Sent' | 'Delivered' | 'Opened' | 'Draft' | 'Bounced';

export type CheckInStatus = 'Checked-in' | 'Not Checked-in';

export type GuestGroup = 'Family' | 'Friends' | 'Colleagues' | 'VIP';

export interface Guest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  relationship: string;
  group: GuestGroup;
  invitationStatus: InvitationStatus;
  rsvpStatus: RSVPStatus;
  companions: number;
  companionNames?: string[];
  dietaryNotes?: string;
  tableNumber: string;
  checkInStatus: CheckInStatus;
  isVip: boolean;
  notes?: string;
  avatarUrl?: string;
  invitationSentAt?: string;
  invitationOpenedAt?: string;
  rsvpSubmittedAt?: string;
  checkedInAt?: string | null;
  giftAmountVND?: number;
  wishMessage?: string;
  personalizedSlug?: string;
}

export interface StoryMilestone {
  id: string;
  year: string;
  title: string;
  description: string;
  location?: string;
  iconName?: string;
}

export interface VenueDetail {
  name: string;
  address: string;
  city: string;
  time: string;
  mapEmbedUrl?: string;
  notes?: string;
  imageUrl?: string;
}

export interface WeddingData {
  id: string;
  name: string;
  brideName: string;
  groomName: string;
  brideAvatar?: string;
  groomAvatar?: string;
  weddingDate: string; // "2026-12-14"
  weddingTime: string; // "17:30"
  ceremonyVenue: VenueDetail;
  receptionVenue: VenueDetail;
  weddingStyle: string;
  theme: string;
  hashtag: string;
  heroImage: string;
  totalTargetGuests: number;
  totalTables: number;
  storyTimeline: StoryMilestone[];
}

export interface PrepTask {
  id: string;
  title: string;
  completed: boolean;
  category: 'invitations' | 'venue' | 'guests' | 'logistics';
  dueDate?: string;
}

export interface ActivityItem {
  id: string;
  type: 'confirm' | 'companion' | 'decline' | 'rsvp' | 'open' | 'checkin' | 'gift' | 'edit';
  guestName: string;
  guestAvatar?: string;
  description: string;
  timestamp: string;
  relativeTime: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  partnerName: string;
  avatar: string;
  plan: 'Starter' | 'Pro' | 'Luxury Concierge';
  notificationCount: number;
}

// --- PHASE 2 INVITATION TYPES ---

export type TemplateCategory = 'All' | 'Modern' | 'Classic' | 'Minimal' | 'Romantic' | 'Luxury' | 'Traditional';

export interface TemplateItem {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  coverImage: string;
  previewImage: string;
  badge?: string;
  primaryColor: string;
  accentColor: string;
  fontPair: string;
  tagline: string;
}

export interface SectionVisibility {
  hero: boolean;
  ourStory: boolean;
  gallery: boolean;
  schedule: boolean;
  venue: boolean;
  dressCode: boolean;
  rsvp: boolean;
  gift: boolean;
  wishes: boolean;
  footer: boolean;
}

export interface InvitationConfig {
  templateId: string;
  primaryColor: string;
  accentColor: string;
  backgroundStyle: 'blush' | 'ivory' | 'sage' | 'champagne' | 'midnight';
  fontFamily: 'cormorant' | 'playfair' | 'inter' | 'garamond';
  coverPhotoUrl: string;
  welcomeQuote: string;
  welcomeMessage: string;
  dressCodeTitle: string;
  dressCodeDescription: string;
  dressCodeColors: string[];
  scheduleEvents: {
    time: string;
    title: string;
    location: string;
    description: string;
  }[];
  galleryPhotos: string[];
  sections: SectionVisibility;
}

export interface PublicRSVPPayload {
  guestId: string;
  rsvpStatus: RSVPStatus;
  attendeesCount: number;
  dietaryRequirements: string;
  wishMessage?: string;
}

// --- PHASE 3 SEATING & OPERATIONS TYPES ---

export interface TableItem {
  id: string;
  tableNumber: string;
  name: string;
  capacity: number;
  category: 'VIP' | 'Family' | 'Friends' | 'Colleagues' | 'General';
  zone: 'front-stage' | 'center' | 'side-left' | 'side-right' | 'rear';
  notes?: string;
}

export interface CheckInRecord {
  id: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  time: string;
  tableNumber: string;
  guestsCount: number;
  isWalkIn?: boolean;
  staffName: string;
  relationship: string;
  status: 'Confirmed' | 'Walk-in';
}

export interface WalkInPayload {
  fullName: string;
  phone: string;
  relationship: string;
  group: GuestGroup;
  companions: number;
  tableNumber: string;
  dietaryNotes?: string;
}

export interface SeatingSuggestion {
  guestId: string;
  guestName: string;
  fromTable: string;
  toTable: string;
  reason: string;
}

// --- PHASE 4 ENGAGEMENT & AI TYPES ---

export interface GiftTransaction {
  id: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  relationship: string;
  group: GuestGroup;
  amountVND: number;
  message: string;
  status: 'Completed' | 'Pending' | 'Refunded';
  timestamp: string;
  paymentMethod: string;
  transactionRef: string;
}

export interface WishItem {
  id: string;
  guestName: string;
  guestAvatar?: string;
  relationship: string;
  message: string;
  timestamp: string;
  isAnonymous?: boolean;
  likesCount: number;
  isFeatured?: boolean;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionPayload?: {
    type: 'invitation-quote' | 'thank-you' | 'schedule';
    text: string;
  };
}

export interface ThankYouMessage {
  id: string;
  guestId: string;
  guestName: string;
  guestAvatar?: string;
  relationship: string;
  attendance: 'Yes' | 'No' | 'Maybe';
  giftAmountVND: number;
  message: string;
  status: 'Generated' | 'Sent' | 'Pending';
  sentChannel?: 'Email' | 'SMS' | 'Link';
  sentAt?: string;
}

// --- PHASE 5 ENTERPRISE ADMIN TYPES ---

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Couple' | 'Reception Staff' | 'Admin';
  plan: 'Free' | 'Premium' | 'Business';
  status: 'Active' | 'Suspended' | 'Pending';
  createdAt: string;
  weddingsCount: number;
  lastActive: string;
}

export interface AdminWedding {
  id: string;
  title: string;
  coupleNames: string;
  date: string;
  guestsCount: number;
  plan: 'Free' | 'Premium' | 'Business';
  status: 'Active' | 'Suspended' | 'Completed';
  createdAt: string;
  rsvpRate: number;
  totalGiftsVND: number;
}

export interface AdminTemplateData {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
  usageCount: number;
  status: 'Published' | 'Draft' | 'Archived';
  rating: number;
  createdAt: string;
}

export interface ModerationItem {
  id: string;
  contentType: 'Wish' | 'Photo' | 'Custom Note';
  content: string;
  authorName: string;
  reporterName: string;
  reason: string;
  reportedAt: string;
  status: 'Pending' | 'Approved' | 'Hidden' | 'Removed';
}

export interface SupportTicket {
  id: string;
  userName: string;
  userEmail: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  createdAt: string;
  category: 'Billing' | 'Seating' | 'QR Check-in' | 'Templates' | 'General';
  messagesCount: number;
  lastReply: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  priceVND: string;
  billingPeriod: string;
  tagline: string;
  features: string[];
  isPopular?: boolean;
}
