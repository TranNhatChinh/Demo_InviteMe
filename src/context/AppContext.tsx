import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Guest,
  WeddingData,
  PrepTask,
  ActivityItem,
  UserProfile,
  RSVPStatus,
  StoryMilestone,
  InvitationConfig,
  TemplateItem,
  PublicRSVPPayload,
  TableItem,
  CheckInRecord,
  WalkInPayload,
  SeatingSuggestion,
  GiftTransaction,
  WishItem,
  AIChatMessage,
  ThankYouMessage,
  AdminUser,
  AdminWedding,
  AdminTemplateData,
  ModerationItem,
  SupportTicket,
  SubscriptionPlan,
} from '../types';
import {
  generate150Guests,
  initialWeddingData,
  initialTasks,
  initialActivities,
  initialUserProfile,
  initialInvitationConfig,
  initialTemplates,
  initialTables,
  initialCheckInRecords,
  defaultGiftTransactions,
  defaultWishes,
  initialAIChatMessages,
  defaultThankYouMessages,
  initialAdminUsers,
  initialAdminWeddings,
  initialAdminTemplates,
  initialModerationItems,
  initialSupportTickets,
  initialSubscriptionPlans,
} from '../data/mockData';
import { useToast } from './ToastContext';
import confetti from 'canvas-confetti';

interface AppContextType {
  // Data
  guests: Guest[];
  wedding: WeddingData;
  tasks: PrepTask[];
  activities: ActivityItem[];
  currentUser: UserProfile;
  isAuthenticated: boolean;
  templates: TemplateItem[];
  invitationConfig: InvitationConfig;
  tables: TableItem[];
  checkInRecords: CheckInRecord[];
  gifts: GiftTransaction[];
  wishes: WishItem[];
  aiChatMessages: AIChatMessage[];
  thankYouMessages: ThankYouMessage[];

  // Admin Data
  adminUsers: AdminUser[];
  adminWeddings: AdminWedding[];
  adminTemplates: AdminTemplateData[];
  moderationItems: ModerationItem[];
  supportTickets: SupportTicket[];
  subscriptionPlans: SubscriptionPlan[];
  
  // Navigation & UI State
  currentView: string;
  setCurrentView: (view: string) => void;
  selectedGuestId: string | null;
  setSelectedGuestId: (id: string | null) => void;
  selectedTableId: string | null;
  setSelectedTableId: (id: string | null) => void;
  selectedGiftId: string | null;
  setSelectedGiftId: (id: string | null) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean | ((prev: boolean) => boolean)) => void;
  globalSearchQuery: string;
  setGlobalSearchQuery: (q: string) => void;
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  isAddGuestModalOpen: boolean;
  setIsAddGuestModalOpen: (open: boolean) => void;
  isImportModalOpen: boolean;
  setIsImportModalOpen: (open: boolean) => void;
  isEditWeddingModalOpen: boolean;
  setIsEditWeddingModalOpen: (open: boolean) => void;
  isSetupWizardOpen: boolean;
  setIsSetupWizardOpen: (open: boolean) => void;
  activeGuestForPublicView: string;
  setActiveGuestForPublicView: (guestId: string) => void;

  // Reactive Computed Metrics
  metrics: {
    totalGuests: number;
    confirmed: number;
    pending: number;
    declined: number;
    maybe: number;
    expectedHeadcount: number;
    checkedIn: number;
    giftTotalVND: number;
    totalWishes: number;
    responseRate: number;
    avgResponseDays: number;
    tasksProgressPercent: number;
    generatedInvitesCount: number;
  };

  seatingStats: {
    totalTables: number;
    assignedGuests: number;
    unassignedGuests: number;
    overCapacityCount: number;
    unassignedList: Guest[];
  };

  receptionMetrics: {
    expected: number;
    checkedIn: number;
    remaining: number;
    walkIns: number;
    noShow: number;
  };

  giftMetrics: {
    totalVND: number;
    totalTransactions: number;
    averageVND: number;
    giftedPercentage: number;
  };

  thankYouStats: {
    totalReady: number;
    sent: number;
    pending: number;
  };

  adminStats: {
    totalUsers: number;
    activeWeddings: number;
    guestRSVPs: number;
    monthlyRevenueVND: number;
  };

  // Actions
  addGuest: (guestData: Omit<Guest, 'id'>) => Guest;
  updateGuest: (id: string, updates: Partial<Guest>) => void;
  deleteGuest: (id: string) => void;
  toggleCheckIn: (id: string) => void;
  checkInGuestDirect: (guestId: string, staffName?: string) => { success: boolean; isAlreadyCheckedIn: boolean; record?: CheckInRecord };
  batchSendInvitations: () => void;
  importGuestsList: (newGuests: Omit<Guest, 'id'>[]) => void;
  updateWedding: (updates: Partial<WeddingData>) => void;
  addStoryMilestone: (milestone: Omit<StoryMilestone, 'id'>) => void;
  updateStoryMilestone: (id: string, updates: Partial<StoryMilestone>) => void;
  deleteStoryMilestone: (id: string) => void;
  toggleTask: (id: string) => void;
  addTask: (title: string, category: PrepTask['category']) => void;
  updateInvitationConfig: (updates: Partial<InvitationConfig>) => void;
  applyTemplate: (templateId: string) => void;
  submitPublicRSVP: (payload: PublicRSVPPayload) => void;
  assignGuestToTable: (guestId: string, tableNumber: string) => void;
  unassignGuest: (guestId: string) => void;
  applyAutoSeatingSuggestions: (suggestions: SeatingSuggestion[]) => void;
  addTable: (table: Omit<TableItem, 'id'>) => void;
  addWalkInGuest: (payload: WalkInPayload) => Guest;
  addGiftTransaction: (payload: { guestId?: string; guestName: string; amountVND: number; message: string; paymentMethod?: string }) => void;
  addWish: (payload: { guestName: string; relationship?: string; message: string; isAnonymous?: boolean }) => void;
  sendAIChatMessage: (userText: string) => void;
  generateThankYouForGuest: (guestId: string, tone?: string) => ThankYouMessage;
  bulkGenerateThankYouMessages: () => void;
  sendThankYouMessage: (id: string, channel: 'Email' | 'SMS' | 'Link') => void;
  
  // Admin Actions
  updateAdminUserStatus: (id: string, status: AdminUser['status']) => void;
  updateAdminWeddingStatus: (id: string, status: AdminWedding['status']) => void;
  toggleAdminTemplateStatus: (id: string) => void;
  moderateContentItem: (id: string, action: 'Approved' | 'Hidden' | 'Removed') => void;
  resolveSupportTicket: (id: string, replyNote: string) => void;
  
  login: (email: string) => void;
  logout: () => void;
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_GUESTS = 'inviteme_guests_v1';
const LOCAL_STORAGE_KEY_WEDDING = 'inviteme_wedding_v1';
const LOCAL_STORAGE_KEY_TASKS = 'inviteme_tasks_v1';
const LOCAL_STORAGE_KEY_ACTIVITIES = 'inviteme_activities_v1';
const LOCAL_STORAGE_KEY_CONFIG = 'inviteme_invitation_config_v1';
const LOCAL_STORAGE_KEY_TABLES = 'inviteme_tables_v1';
const LOCAL_STORAGE_KEY_CHECKINS = 'inviteme_checkins_v1';
const LOCAL_STORAGE_KEY_GIFTS = 'inviteme_gifts_v1';
const LOCAL_STORAGE_KEY_WISHES = 'inviteme_wishes_v1';
const LOCAL_STORAGE_KEY_TYMS = 'inviteme_tyms_v1';
const LOCAL_STORAGE_KEY_ADM_USERS = 'inviteme_adm_users_v1';
const LOCAL_STORAGE_KEY_ADM_WEDDINGS = 'inviteme_adm_weddings_v1';
const LOCAL_STORAGE_KEY_ADM_TEMPLATES = 'inviteme_adm_templates_v1';
const LOCAL_STORAGE_KEY_ADM_MOD = 'inviteme_adm_mod_v1';
const LOCAL_STORAGE_KEY_ADM_TCK = 'inviteme_adm_tck_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { showToast } = useToast();

  // Load initial data
  const [guests, setGuests] = useState<Guest[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GUESTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return generate150Guests();
  });

  const [wedding, setWedding] = useState<WeddingData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WEDDING);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialWeddingData;
  });

  const [tasks, setTasks] = useState<PrepTask[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TASKS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialTasks;
  });

  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ACTIVITIES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialActivities;
  });

  const [invitationConfig, setInvitationConfig] = useState<InvitationConfig>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialInvitationConfig;
  });

  const [tables, setTables] = useState<TableItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TABLES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialTables;
  });

  const [checkInRecords, setCheckInRecords] = useState<CheckInRecord[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CHECKINS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialCheckInRecords;
  });

  const [gifts, setGifts] = useState<GiftTransaction[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GIFTS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultGiftTransactions;
  });

  const [wishes, setWishes] = useState<WishItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WISHES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultWishes;
  });

  const [thankYouMessages, setThankYouMessages] = useState<ThankYouMessage[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_TYMS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultThankYouMessages;
  });

  // Admin Data
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADM_USERS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAdminUsers;
  });

  const [adminWeddings, setAdminWeddings] = useState<AdminWedding[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADM_WEDDINGS);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAdminWeddings;
  });

  const [adminTemplates, setAdminTemplates] = useState<AdminTemplateData[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADM_TEMPLATES);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialAdminTemplates;
  });

  const [moderationItems, setModerationItems] = useState<ModerationItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADM_MOD);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialModerationItems;
  });

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ADM_TCK);
      if (saved) return JSON.parse(saved);
    } catch {}
    return initialSupportTickets;
  });

  const [subscriptionPlans] = useState<SubscriptionPlan[]>(initialSubscriptionPlans);

  const [aiChatMessages, setAiChatMessages] = useState<AIChatMessage[]>(initialAIChatMessages);
  const [templates] = useState<TemplateItem[]>(initialTemplates);
  const [currentUser, setCurrentUser] = useState<UserProfile>(initialUserProfile);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);
  const [selectedTableId, setSelectedTableId] = useState<string | null>('Table 05');
  const [selectedGiftId, setSelectedGiftId] = useState<string | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState<boolean>(false);
  const [isAddGuestModalOpen, setIsAddGuestModalOpen] = useState<boolean>(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [isEditWeddingModalOpen, setIsEditWeddingModalOpen] = useState<boolean>(false);
  const [isSetupWizardOpen, setIsSetupWizardOpen] = useState<boolean>(false);
  const [activeGuestForPublicView, setActiveGuestForPublicView] = useState<string>('gst-001');

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_GUESTS, JSON.stringify(guests));
      localStorage.setItem(LOCAL_STORAGE_KEY_WEDDING, JSON.stringify(wedding));
      localStorage.setItem(LOCAL_STORAGE_KEY_TASKS, JSON.stringify(tasks));
      localStorage.setItem(LOCAL_STORAGE_KEY_ACTIVITIES, JSON.stringify(activities));
      localStorage.setItem(LOCAL_STORAGE_KEY_CONFIG, JSON.stringify(invitationConfig));
      localStorage.setItem(LOCAL_STORAGE_KEY_TABLES, JSON.stringify(tables));
      localStorage.setItem(LOCAL_STORAGE_KEY_CHECKINS, JSON.stringify(checkInRecords));
      localStorage.setItem(LOCAL_STORAGE_KEY_GIFTS, JSON.stringify(gifts));
      localStorage.setItem(LOCAL_STORAGE_KEY_WISHES, JSON.stringify(wishes));
      localStorage.setItem(LOCAL_STORAGE_KEY_TYMS, JSON.stringify(thankYouMessages));
      localStorage.setItem(LOCAL_STORAGE_KEY_ADM_USERS, JSON.stringify(adminUsers));
      localStorage.setItem(LOCAL_STORAGE_KEY_ADM_WEDDINGS, JSON.stringify(adminWeddings));
      localStorage.setItem(LOCAL_STORAGE_KEY_ADM_TEMPLATES, JSON.stringify(adminTemplates));
      localStorage.setItem(LOCAL_STORAGE_KEY_ADM_MOD, JSON.stringify(moderationItems));
      localStorage.setItem(LOCAL_STORAGE_KEY_ADM_TCK, JSON.stringify(supportTickets));
    } catch (e) {
      console.warn('Storage save error', e);
    }
  }, [guests, wedding, tasks, activities, invitationConfig, tables, checkInRecords, gifts, wishes, thankYouMessages, adminUsers, adminWeddings, adminTemplates, moderationItems, supportTickets]);

  // Reactive computed metrics
  const metrics = useMemo(() => {
    const total = guests.length;
    let confirmedCount = 0;
    let pendingCount = 0;
    let declinedCount = 0;
    let maybeCount = 0;
    let checkedInCount = 0;
    let companionsOfConfirmed = 0;

    guests.forEach((g) => {
      if (g.rsvpStatus === 'Confirmed') {
        confirmedCount++;
        companionsOfConfirmed += g.companions || 0;
      } else if (g.rsvpStatus === 'Pending') {
        pendingCount++;
      } else if (g.rsvpStatus === 'Declined') {
        declinedCount++;
      } else if (g.rsvpStatus === 'Maybe') {
        maybeCount++;
      }

      if (g.checkInStatus === 'Checked-in') {
        checkedInCount++;
      }
    });

    const expectedHeadcount = confirmedCount + companionsOfConfirmed;
    const respondedCount = confirmedCount + declinedCount + maybeCount;
    const responseRate = total > 0 ? Math.round((respondedCount / total) * 100) : 0;

    const completedTasks = tasks.filter((t) => t.completed).length;
    const tasksProgressPercent = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;
    const giftTotalVND = gifts.reduce((acc, g) => acc + g.amountVND, 0);

    return {
      totalGuests: total,
      confirmed: confirmedCount,
      pending: pendingCount,
      declined: declinedCount,
      maybe: maybeCount,
      expectedHeadcount: expectedHeadcount > 0 ? expectedHeadcount : 138,
      checkedIn: checkedInCount,
      giftTotalVND: giftTotalVND > 0 ? giftTotalVND : 128500000,
      totalWishes: wishes.length > 0 ? wishes.length : 87,
      responseRate,
      avgResponseDays: 2.4,
      tasksProgressPercent,
      generatedInvitesCount: 142,
    };
  }, [guests, tasks, gifts, wishes]);

  // Seating metrics
  const seatingStats = useMemo(() => {
    const unassigned = guests.filter((g) => !g.tableNumber || g.tableNumber === 'Unassigned');
    const assigned = guests.filter((g) => g.tableNumber && g.tableNumber !== 'Unassigned');

    let overCapacityCount = 0;
    tables.forEach((t) => {
      const tableGuests = guests.filter((g) => g.tableNumber === t.tableNumber);
      if (tableGuests.length > t.capacity) {
        overCapacityCount++;
      }
    });

    return {
      totalTables: tables.length,
      assignedGuests: assigned.length,
      unassignedGuests: unassigned.length,
      overCapacityCount,
      unassignedList: unassigned,
    };
  }, [guests, tables]);

  // Reception operational metrics
  const receptionMetrics = useMemo(() => {
    const checkedIn = guests.filter((g) => g.checkInStatus === 'Checked-in').length;
    const walkIns = checkInRecords.filter((r) => r.isWalkIn).length;
    const expected = metrics.expectedHeadcount;
    const remaining = Math.max(0, expected - checkedIn);

    return {
      expected,
      checkedIn,
      remaining,
      walkIns: walkIns > 0 ? walkIns : 3,
      noShow: 0,
    };
  }, [guests, checkInRecords, metrics.expectedHeadcount]);

  // Gift Metrics
  const giftMetrics = useMemo(() => {
    const totalVND = gifts.reduce((acc, g) => acc + g.amountVND, 0);
    const count = gifts.length;
    const avg = count > 0 ? Math.round(totalVND / count) : 0;
    const giftedGuestsPercentage = guests.length > 0 ? Math.round((count / guests.length) * 100) : 62;

    return {
      totalVND: totalVND > 0 ? totalVND : 128500000,
      totalTransactions: count > 0 ? count : 87,
      averageVND: avg > 0 ? avg : 1477000,
      giftedPercentage: giftedGuestsPercentage,
    };
  }, [gifts, guests.length]);

  // Thank-You Stats
  const thankYouStats = useMemo(() => {
    const totalReady = thankYouMessages.length;
    const sent = thankYouMessages.filter((m) => m.status === 'Sent').length;
    const pending = totalReady - sent;

    return {
      totalReady: totalReady > 0 ? totalReady : 87,
      sent: sent > 0 ? sent : 52,
      pending: pending >= 0 ? pending : 35,
    };
  }, [thankYouMessages]);

  // Admin Top Telemetry Stats
  const adminStats = useMemo(() => {
    return {
      totalUsers: 12482,
      activeWeddings: 2341,
      guestRSVPs: 124850,
      monthlyRevenueVND: 248000000,
    };
  }, []);

  // Activity Log
  const logActivity = useCallback((item: Omit<ActivityItem, 'id' | 'timestamp' | 'relativeTime'>) => {
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      ...item,
      timestamp: new Date().toISOString(),
      relativeTime: 'Just now'
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 19)]);
  }, []);

  // Couple actions
  const addGuest = useCallback((guestData: Omit<Guest, 'id'>): Guest => {
    const newId = `gst-${Date.now()}`;
    const cleanName = guestData.fullName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]/g, '.');
    const newGuest: Guest = {
      ...guestData,
      id: newId,
      personalizedSlug: cleanName,
    };

    setGuests((prev) => [newGuest, ...prev]);

    logActivity({
      type: 'rsvp',
      guestName: newGuest.fullName,
      guestAvatar: newGuest.avatarUrl,
      description: `added to guest list (${newGuest.relationship}, ${newGuest.group})`
    });

    showToast('Guest Added', `${newGuest.fullName} has been registered.`, 'success');
    return newGuest;
  }, [logActivity, showToast]);

  const updateGuest = useCallback((id: string, updates: Partial<Guest>) => {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
    showToast('Guest Updated', 'Guest details updated.', 'info');
  }, [showToast]);

  const deleteGuest = useCallback((id: string) => {
    const guest = guests.find((g) => g.id === id);
    setGuests((prev) => prev.filter((g) => g.id !== id));
    if (selectedGuestId === id) setSelectedGuestId(null);
    showToast('Guest Removed', `${guest?.fullName || 'Guest'} has been removed.`, 'warning');
  }, [guests, selectedGuestId, showToast]);

  const toggleCheckIn = useCallback((id: string) => {
    let nowCheckedIn = false;
    let targetGuest: Guest | undefined;

    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          targetGuest = g;
          nowCheckedIn = g.checkInStatus !== 'Checked-in';
          return {
            ...g,
            checkInStatus: nowCheckedIn ? 'Checked-in' : 'Not Checked-in',
            checkedInAt: nowCheckedIn ? '18:24' : null,
            rsvpStatus: nowCheckedIn ? 'Confirmed' : g.rsvpStatus,
          };
        }
        return g;
      })
    );

    if (targetGuest && nowCheckedIn) {
      const newRecord: CheckInRecord = {
        id: `chk-${Date.now()}`,
        guestId: targetGuest.id,
        guestName: targetGuest.fullName,
        guestAvatar: targetGuest.avatarUrl,
        time: '18:24',
        tableNumber: targetGuest.tableNumber,
        guestsCount: targetGuest.companions + 1,
        staffName: 'Linh Tran',
        relationship: targetGuest.relationship,
        status: 'Confirmed',
      };
      setCheckInRecords((prev) => [newRecord, ...prev]);

      logActivity({
        type: 'checkin',
        guestName: targetGuest.fullName,
        guestAvatar: targetGuest.avatarUrl,
        description: `checked in at reception (${targetGuest.tableNumber})`
      });
      showToast('Guest Checked In', `${targetGuest.fullName} has arrived.`, 'success');
    }
  }, [logActivity, showToast]);

  const checkInGuestDirect = useCallback((guestId: string, staffName: string = 'Linh Tran') => {
    const guest = guests.find((g) => g.id === guestId || g.personalizedSlug === guestId);
    if (!guest) return { success: false, isAlreadyCheckedIn: false };

    if (guest.checkInStatus === 'Checked-in') {
      return {
        success: false,
        isAlreadyCheckedIn: true,
        record: checkInRecords.find((r) => r.guestId === guest.id),
      };
    }

    const checkInTime = '18:24';

    setGuests((prev) =>
      prev.map((g) => (g.id === guest.id ? { ...g, checkInStatus: 'Checked-in', checkedInAt: checkInTime, rsvpStatus: 'Confirmed' } : g))
    );

    const newRecord: CheckInRecord = {
      id: `chk-${Date.now()}`,
      guestId: guest.id,
      guestName: guest.fullName,
      guestAvatar: guest.avatarUrl,
      time: checkInTime,
      tableNumber: guest.tableNumber || 'Table 05',
      guestsCount: guest.companions + 1,
      staffName,
      relationship: guest.relationship,
      status: 'Confirmed',
    };

    setCheckInRecords((prev) => [newRecord, ...prev]);

    logActivity({
      type: 'checkin',
      guestName: guest.fullName,
      guestAvatar: guest.avatarUrl,
      description: `checked in at reception (${guest.tableNumber})`
    });

    showToast('Check-in Successful', `${guest.fullName} is checked in at ${guest.tableNumber}.`, 'success');
    return { success: true, isAlreadyCheckedIn: false, record: newRecord };
  }, [guests, checkInRecords, logActivity, showToast]);

  const assignGuestToTable = useCallback((guestId: string, tableNumber: string) => {
    setGuests((prev) => prev.map((g) => (g.id === guestId ? { ...g, tableNumber } : g)));
    const guest = guests.find((g) => g.id === guestId);
    showToast('Table Assigned', `${guest?.fullName || 'Guest'} assigned to ${tableNumber}.`, 'info');
  }, [guests, showToast]);

  const unassignGuest = useCallback((guestId: string) => {
    setGuests((prev) => prev.map((g) => (g.id === guestId ? { ...g, tableNumber: 'Unassigned' } : g)));
    const guest = guests.find((g) => g.id === guestId);
    showToast('Guest Unassigned', `${guest?.fullName || 'Guest'} moved to unassigned pool.`, 'info');
  }, [guests, showToast]);

  const applyAutoSeatingSuggestions = useCallback((suggestions: SeatingSuggestion[]) => {
    setGuests((prev) =>
      prev.map((g) => {
        const s = suggestions.find((item) => item.guestId === g.id);
        return s ? { ...g, tableNumber: s.toTable } : g;
      })
    );
    try {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    } catch {}
    showToast('Seating Optimized', `Applied ${suggestions.length} AI seating rebalances successfully.`, 'wedding');
  }, [showToast]);

  const addTable = useCallback((tableData: Omit<TableItem, 'id'>) => {
    const newId = `tbl-${(tables.length + 1).toString().padStart(2, '0')}`;
    setTables((prev) => [...prev, { ...tableData, id: newId }]);
    showToast('Table Added', `Created ${tableData.tableNumber} (${tableData.capacity} seats).`, 'success');
  }, [tables.length, showToast]);

  const addWalkInGuest = useCallback((payload: WalkInPayload): Guest => {
    const newId = `gst-walkin-${Date.now()}`;
    const checkInTime = '18:24';

    const newGuest: Guest = {
      id: newId,
      fullName: payload.fullName,
      email: `${payload.fullName.toLowerCase().replace(/\s+/g, '.')}@walkin.vn`,
      phone: payload.phone || '+84 900 000 000',
      relationship: payload.relationship,
      group: payload.group,
      invitationStatus: 'Opened',
      rsvpStatus: 'Confirmed',
      companions: payload.companions,
      tableNumber: payload.tableNumber,
      checkInStatus: 'Checked-in',
      checkedInAt: checkInTime,
      isVip: payload.group === 'VIP',
      dietaryNotes: payload.dietaryNotes,
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      personalizedSlug: payload.fullName.toLowerCase().replace(/\s+/g, '-'),
    };

    setGuests((prev) => [newGuest, ...prev]);

    const newRecord: CheckInRecord = {
      id: `chk-${Date.now()}`,
      guestId: newId,
      guestName: newGuest.fullName,
      guestAvatar: newGuest.avatarUrl,
      time: checkInTime,
      tableNumber: newGuest.tableNumber,
      guestsCount: newGuest.companions + 1,
      isWalkIn: true,
      staffName: 'Linh Tran',
      relationship: newGuest.relationship,
      status: 'Walk-in',
    };

    setCheckInRecords((prev) => [newRecord, ...prev]);

    logActivity({
      type: 'checkin',
      guestName: newGuest.fullName,
      guestAvatar: newGuest.avatarUrl,
      description: `registered as Walk-in guest and checked in (${newGuest.tableNumber})`
    });

    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    } catch {}

    showToast('Walk-in Guest Added', `${newGuest.fullName} registered & checked in to ${newGuest.tableNumber}.`, 'success');
    return newGuest;
  }, [logActivity, showToast]);

  const addGiftTransaction = useCallback((payload: { guestId?: string; guestName: string; amountVND: number; message: string; paymentMethod?: string }) => {
    const newTxn: GiftTransaction = {
      id: `gift-${Date.now()}`,
      guestId: payload.guestId || `gst-${Date.now()}`,
      guestName: payload.guestName,
      guestAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      relationship: 'Friend',
      group: 'Friends',
      amountVND: payload.amountVND,
      message: payload.message,
      status: 'Completed',
      timestamp: `Dec 14, 2026 • 18:24`,
      paymentMethod: payload.paymentMethod || 'Vietcombank QR',
      transactionRef: `TXN-${Math.floor(10000 + Math.random() * 90000)}-VCB`,
    };

    setGifts((prev) => [newTxn, ...prev]);

    if (payload.guestId) {
      setGuests((prev) =>
        prev.map((g) => (g.id === payload.guestId ? { ...g, giftAmountVND: (g.giftAmountVND || 0) + payload.amountVND } : g))
      );
    }

    logActivity({
      type: 'gift',
      guestName: payload.guestName,
      guestAvatar: newTxn.guestAvatar,
      description: `sent a monetary wedding blessing of ${payload.amountVND.toLocaleString()} VND via ${newTxn.paymentMethod}`
    });

    try {
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 }, colors: ['#EFA3B5', '#4FA87A', '#D4AF37'] });
    } catch {}

    showToast('Gift Recorded', `Thank you! Received ${payload.amountVND.toLocaleString()} VND blessing from ${payload.guestName}.`, 'wedding');
  }, [logActivity, showToast]);

  const addWish = useCallback((payload: { guestName: string; relationship?: string; message: string; isAnonymous?: boolean }) => {
    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      guestName: payload.isAnonymous ? 'Anonymous Well-Wisher' : payload.guestName,
      guestAvatar: payload.isAnonymous ? undefined : 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      relationship: payload.relationship || 'Wedding Guest',
      message: payload.message,
      timestamp: 'Just now',
      isAnonymous: payload.isAnonymous,
      likesCount: 1,
    };

    setWishes((prev) => [newWish, ...prev]);

    logActivity({
      type: 'rsvp',
      guestName: newWish.guestName,
      guestAvatar: newWish.guestAvatar,
      description: `left a warm blessing on the Wishes Wall`
    });

    try {
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    } catch {}

    showToast('Wish Posted', 'Your heartfelt blessing is now on the Wishes Wall ❤️', 'wedding');
  }, [logActivity, showToast]);

  const sendAIChatMessage = useCallback((userText: string) => {
    const userMsg: AIChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      let isVietnamese = false;
      try {
        const currentLang = localStorage.getItem('inviteme-language');
        if (currentLang === 'vi') isVietnamese = true;
      } catch {}

      let aiReply = isVietnamese
        ? "Tôi rất vui được hỗ trợ bạn! Dưới đây là lời mời cưới thơ mộng được gợi ý cho Emily & James:\n\n*\"Trong sự yêu thương của gia đình và bạn bè thân quý, hai tâm hồn hòa chung một nhịp đập, bắt đầu một hành trình hạnh phúc trọn vẹn.\"*"
        : "I'd love to help with that! Here is an elegant draft tailored for Emily & James's celebration:\n\n*\"In the warm embrace of family and cherished friends, two paths become one unforgettable journey.\"*";
      
      let action: AIChatMessage['actionPayload'] = undefined;

      const lower = userText.toLowerCase();
      if (lower.includes('quote') || lower.includes('invitation') || lower.includes('wording') || lower.includes('lời mời') || lower.includes('thiệp')) {
        aiReply = isVietnamese
          ? "Dưới đây là nội dung lời mời thiệp cưới trang nhã được tạo riêng cho phong cách của bạn:\n\n*\"Cùng với gia đình, Emily & James trân trọng kính mời bạn đến chung vui trong ngày trọng đại và chứng kiến khoảnh khắc trao lời thề ước trăm năm.\"*"
          : "Here is a bespoke invitation greeting crafted for your romantic aesthetic:\n\n*\"Together with our families, Emily & James invite you to share in the joy of our marriage as we exchange our forever vows.\"*";
        action = {
          type: 'invitation-quote',
          text: isVietnamese
            ? 'Cùng với gia đình, Emily & James trân trọng kính mời bạn đến chung vui trong ngày trọng đại và chứng kiến khoảnh khắc trao lời thề ước trăm năm.'
            : 'Together with our families, Emily & James invite you to share in the joy of our marriage as we exchange our forever vows.',
        };
      } else if (lower.includes('thank') || lower.includes('cảm ơn')) {
        aiReply = isVietnamese
          ? "Dưới đây là lời cảm ơn ấm áp và chân thành:\n\n*\"Thân gửi bạn, sự hiện diện cùng lời chúc phúc và món quà ý nghĩa của bạn tại The Reverie Saigon đã làm cho ngày cưới của chúng tôi thêm trọn vẹn và đáng nhớ. Chân thành cảm ơn tình cảm quý báu của bạn!\"*"
          : "Here is a warm personalized thank-you note:\n\n*\"Dear friend, having you celebrate with us at The Reverie Saigon made our wedding complete. Thank you for your immense love, laughter, and generous blessing.\"*";
        action = {
          type: 'thank-you',
          text: isVietnamese
            ? 'Thân gửi bạn, sự hiện diện cùng lời chúc phúc và món quà ý nghĩa của bạn tại The Reverie Saigon đã làm cho ngày cưới của chúng tôi thêm trọn vẹn và đáng nhớ. Chân thành cảm ơn tình cảm quý báu của bạn!'
            : 'Dear friend, having you celebrate with us at The Reverie Saigon made our wedding complete. Thank you for your immense love, laughter, and generous blessing.',
        };
      }

      const assistantMsg: AIChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        content: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actionPayload: action,
      };

      setAiChatMessages((prev) => [...prev, assistantMsg]);
    }, 600);
  }, []);

  const generateThankYouForGuest = useCallback((guestId: string, tone: string = 'Warm'): ThankYouMessage => {
    const guest = guests.find((g) => g.id === guestId) || guests[0];
    const gift = gifts.find((item) => item.guestId === guest.id);
    const amount = gift ? gift.amountVND : 2000000;

    let isVietnamese = false;
    try {
      if (localStorage.getItem('inviteme-language') === 'vi') isVietnamese = true;
    } catch {}

    const guestFirstName = guest.fullName.split(' ').slice(-1)[0];
    let body = isVietnamese
      ? `Thân gửi ${guestFirstName},\n\nCảm ơn bạn rất nhiều vì đã đến chung vui và chia sẻ khoảnh khắc hạnh phúc nhất trong cuộc đời của chúng mình. Sự hiện diện ấm áp cùng lời chúc và món quà mừng ${amount.toLocaleString('vi-VN')} ₫ của bạn là niềm vinh hạnh vô cùng lớn đối với Emily và James.\n\nChúc bạn luôn ngập tràn niềm vui và may mắn trong cuộc sống!\n\nTrân trọng & Yêu thương,\nEmily & James`
      : `Dear ${guestFirstName},\n\nThank you so much for being part of one of the most special days of our lives. Your presence, your warm wishes, and your generous blessing of ${amount.toLocaleString('en-US')} VND meant the world to Emily and me.\n\nWe feel so blessed to have you in our lives!\n\nWith all our love,\nEmily & James`;

    const newMsg: ThankYouMessage = {
      id: `tym-${Date.now()}`,
      guestId: guest.id,
      guestName: guest.fullName,
      guestAvatar: guest.avatarUrl,
      relationship: guest.relationship,
      attendance: guest.rsvpStatus === 'Confirmed' ? 'Yes' : 'No',
      giftAmountVND: amount,
      message: body,
      status: 'Generated',
    };

    setThankYouMessages((prev) => {
      const existing = prev.findIndex((m) => m.guestId === guest.id);
      if (existing >= 0) {
        const copy = [...prev];
        copy[existing] = newMsg;
        return copy;
      }
      return [newMsg, ...prev];
    });

    return newMsg;
  }, [guests, gifts]);

  const bulkGenerateThankYouMessages = useCallback(() => {
    setThankYouMessages((prev) =>
      prev.map((m) => ({ ...m, status: m.status === 'Sent' ? 'Sent' : 'Generated' }))
    );
    showToast('Batch Complete', 'Generated 87 personalized thank-you messages with AI context matching.', 'wedding');
  }, [showToast]);

  const sendThankYouMessage = useCallback((id: string, channel: 'Email' | 'SMS' | 'Link') => {
    setThankYouMessages((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, status: 'Sent', sentChannel: channel, sentAt: `Dec 15, 2026 • 18:24` } : m
      )
    );
    const msg = thankYouMessages.find((m) => m.id === id);
    showToast('Thank-you Sent', `Delivered message to ${msg?.guestName || 'Guest'} via ${channel}.`, 'success');
  }, [thankYouMessages, showToast]);

  // Admin Actions
  const updateAdminUserStatus = useCallback((id: string, status: AdminUser['status']) => {
    setAdminUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status } : u))
    );
    showToast('User Status Updated', `Account status set to ${status}.`, 'info');
  }, [showToast]);

  const updateAdminWeddingStatus = useCallback((id: string, status: AdminWedding['status']) => {
    setAdminWeddings((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status } : w))
    );
    showToast('Wedding Status Updated', `Wedding directory updated to ${status}.`, 'info');
  }, [showToast]);

  const toggleAdminTemplateStatus = useCallback((id: string) => {
    setAdminTemplates((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: t.status === 'Published' ? 'Draft' : 'Published' } : t))
    );
    showToast('Template Status Updated', 'Catalog publishing status changed.', 'info');
  }, [showToast]);

  const moderateContentItem = useCallback((id: string, action: 'Approved' | 'Hidden' | 'Removed') => {
    setModerationItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: action } : m))
    );
    showToast('Content Moderated', `Item marked as ${action}.`, 'info');
  }, [showToast]);

  const resolveSupportTicket = useCallback((id: string, replyNote: string) => {
    setSupportTickets((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: 'Resolved', lastReply: replyNote } : t
      )
    );
    showToast('Ticket Resolved', 'Support response dispatched to user.', 'success');
  }, [showToast]);

  // General Actions
  const batchSendInvitations = useCallback(() => {
    setGuests((prev) =>
      prev.map((g) => ({ ...g, invitationStatus: 'Opened', invitationOpenedAt: new Date().toISOString() }))
    );
    showToast('Invitations Sent', `Broadcasted digital invitations to all 150 guests via SMS & Email.`, 'wedding');
  }, [showToast]);

  const importGuestsList = useCallback((newGuests: Omit<Guest, 'id'>[]) => {
    const processed: Guest[] = newGuests.map((g, idx) => ({
      ...g,
      id: `gst-import-${Date.now()}-${idx}`,
      personalizedSlug: g.fullName.toLowerCase().replace(/\s+/g, '-'),
    }));
    setGuests((prev) => [...processed, ...prev]);
    showToast('Import Complete', `Successfully imported ${processed.length} guests into your registry.`, 'success');
  }, [showToast]);

  const updateWedding = useCallback((updates: Partial<WeddingData>) => {
    setWedding((prev) => ({ ...prev, ...updates }));
    showToast('Wedding Details Saved', 'Your wedding settings have been updated.', 'success');
  }, [showToast]);

  const addStoryMilestone = useCallback((milestone: Omit<StoryMilestone, 'id'>) => {
    setWedding((prev) => ({
      ...prev,
      storyTimeline: [...prev.storyTimeline, { ...milestone, id: `ml-${Date.now()}` }]
    }));
    showToast('Milestone Added', `Added "${milestone.title}" to your wedding love story.`, 'success');
  }, [showToast]);

  const updateStoryMilestone = useCallback((id: string, updates: Partial<StoryMilestone>) => {
    setWedding((prev) => ({
      ...prev,
      storyTimeline: prev.storyTimeline.map((m) => (m.id === id ? { ...m, ...updates } : m))
    }));
    showToast('Milestone Updated', 'Timeline entry updated.', 'info');
  }, [showToast]);

  const deleteStoryMilestone = useCallback((id: string) => {
    setWedding((prev) => ({
      ...prev,
      storyTimeline: prev.storyTimeline.filter((m) => m.id !== id)
    }));
    showToast('Milestone Deleted', 'Timeline entry removed.', 'warning');
  }, [showToast]);

  const toggleTask = useCallback((id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  const addTask = useCallback((title: string, category: PrepTask['category'] = 'logistics') => {
    setTasks((prev) => [...prev, { id: `tsk-${Date.now()}`, title, completed: false, category }]);
    showToast('Task Created', `Added "${title}" to your checklist.`, 'success');
  }, [showToast]);

  const updateInvitationConfig = useCallback((updates: Partial<InvitationConfig>) => {
    setInvitationConfig((prev) => ({ ...prev, ...updates }));
  }, []);

  const applyTemplate = useCallback((templateId: string) => {
    const tpl = templates.find((t) => t.id === templateId);
    if (tpl) {
      setInvitationConfig((prev) => ({
        ...prev,
        templateId: tpl.id,
        primaryColor: tpl.primaryColor,
        accentColor: tpl.accentColor,
        coverPhotoUrl: tpl.previewImage,
      }));
      showToast('Template Applied', `Activated template "${tpl.name}".`, 'wedding');
    }
  }, [templates, showToast]);

  const submitPublicRSVP = useCallback((payload: PublicRSVPPayload) => {
    const guest = guests.find((g) => g.id === payload.guestId || g.personalizedSlug === payload.guestId);
    const targetId = guest ? guest.id : payload.guestId;
    const companionCount = Math.max(0, payload.attendeesCount - 1);

    setGuests((prev) =>
      prev.map((g) => {
        if (g.id === targetId) {
          return {
            ...g,
            rsvpStatus: payload.rsvpStatus,
            companions: companionCount,
            dietaryNotes: payload.dietaryRequirements,
            wishMessage: payload.wishMessage || g.wishMessage,
            rsvpSubmittedAt: new Date().toISOString(),
            invitationStatus: 'Opened',
          };
        }
        return g;
      })
    );

    const guestName = guest ? guest.fullName : 'Guest';

    logActivity({
      type: payload.rsvpStatus === 'Confirmed' ? 'confirm' : payload.rsvpStatus === 'Declined' ? 'decline' : 'rsvp',
      guestName,
      guestAvatar: guest?.avatarUrl,
      description: payload.rsvpStatus === 'Confirmed'
        ? `confirmed RSVP for ${payload.attendeesCount} guest(s)`
        : `responded with ${payload.rsvpStatus}`
    });

    try {
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    } catch {}

    showToast('New RSVP Received', `${guestName} submitted RSVP (${payload.rsvpStatus}).`, 'wedding');
  }, [guests, logActivity, showToast]);

  const login = useCallback((email: string) => {
    setIsAuthenticated(true);
    setCurrentUser((prev) => ({ ...prev, email, name: 'Emily Nguyen' }));
    setCurrentView('dashboard');
    showToast('Welcome back, Emily!', 'Your wedding dashboard is ready.', 'wedding');
  }, [showToast]);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentView('login');
    showToast('Logged Out', 'You have been safely signed out.', 'info');
  }, [showToast]);

  const resetToSampleData = useCallback(() => {
    setGuests(generate150Guests());
    setWedding(initialWeddingData);
    setTasks(initialTasks);
    setActivities(initialActivities);
    setInvitationConfig(initialInvitationConfig);
    setTables(initialTables);
    setCheckInRecords(initialCheckInRecords);
    setGifts(defaultGiftTransactions);
    setWishes(defaultWishes);
    setThankYouMessages(defaultThankYouMessages);
    setAdminUsers(initialAdminUsers);
    setAdminWeddings(initialAdminWeddings);
    setAdminTemplates(initialAdminTemplates);
    setModerationItems(initialModerationItems);
    setSupportTickets(initialSupportTickets);
    localStorage.clear();
    showToast('Data Reset', 'All wedding and platform records restored to pristine sample data.', 'info');
  }, [showToast]);

  return (
    <AppContext.Provider
      value={{
        guests,
        wedding,
        tasks,
        activities,
        currentUser,
        isAuthenticated,
        templates,
        invitationConfig,
        tables,
        checkInRecords,
        gifts,
        wishes,
        aiChatMessages,
        thankYouMessages,
        adminUsers,
        adminWeddings,
        adminTemplates,
        moderationItems,
        supportTickets,
        subscriptionPlans,
        currentView,
        setCurrentView,
        selectedGuestId,
        setSelectedGuestId,
        selectedTableId,
        setSelectedTableId,
        selectedGiftId,
        setSelectedGiftId,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        globalSearchQuery,
        setGlobalSearchQuery,
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        isAddGuestModalOpen,
        setIsAddGuestModalOpen,
        isImportModalOpen,
        setIsImportModalOpen,
        isEditWeddingModalOpen,
        setIsEditWeddingModalOpen,
        isSetupWizardOpen,
        setIsSetupWizardOpen,
        activeGuestForPublicView,
        setActiveGuestForPublicView,
        metrics,
        seatingStats,
        receptionMetrics,
        giftMetrics,
        thankYouStats,
        adminStats,
        addGuest,
        updateGuest,
        deleteGuest,
        toggleCheckIn,
        checkInGuestDirect,
        batchSendInvitations,
        importGuestsList,
        updateWedding,
        addStoryMilestone,
        updateStoryMilestone,
        deleteStoryMilestone,
        toggleTask,
        addTask,
        updateInvitationConfig,
        applyTemplate,
        submitPublicRSVP,
        assignGuestToTable,
        unassignGuest,
        applyAutoSeatingSuggestions,
        addTable,
        addWalkInGuest,
        addGiftTransaction,
        addWish,
        sendAIChatMessage,
        generateThankYouForGuest,
        bulkGenerateThankYouMessages,
        sendThankYouMessage,
        updateAdminUserStatus,
        updateAdminWeddingStatus,
        toggleAdminTemplateStatus,
        moderateContentItem,
        resolveSupportTicket,
        login,
        logout,
        resetToSampleData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
