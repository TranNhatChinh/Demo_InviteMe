export type Language = 'en' | 'vi';

export interface Translations {
  common: {
    save: string;
    cancel: string;
    delete: string;
    edit: string;
    add: string;
    create: string;
    update: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    clear: string;
    apply: string;
    confirm: string;
    continue: string;
    done: string;
    view: string;
    download: string;
    upload: string;
    copy: string;
    share: string;
    send: string;
    refresh: string;
    details: string;
    actions: string;
    all: string;
    active: string;
    status: string;
    loading: string;
    success: string;
    error: string;
    warning: string;
    info: string;
    or: string;
    guestsUnit: string;
    tablesUnit: string;
    currencySymbol: string;
  };
  auth: {
    welcomeBack: string;
    subtitle: string;
    email: string;
    password: string;
    rememberMe: string;
    forgotPassword: string;
    signIn: string;
    signUp: string;
    hasAccount: string;
    orContinueWith: string;
    noAccount: string;
    createAccount: string;
    resetPassword: string;
    registeredEmail: string;
    sendResetLink: string;
    checkInbox: string;
    returnToLogin: string;
  };
  nav: {
    overview: string;
    weddingSection: string;
    weddingDetails: string;
    templateGallery: string;
    invitationBuilder: string;
    personalizedInvites: string;
    guestsSection: string;
    guestList: string;
    rsvpAnalytics: string;
    publicGuestPortal: string;
    operationsSection: string;
    seatingArrangement: string;
    receptionStaffApp: string;
    engagementSection: string;
    giftBook: string;
    wishesWall: string;
    aiAssistant: string;
    thankYouSuite: string;
    platformOversight: string;
    adminConsole: string;
    settings: string;
    helpCenter: string;
    signOut: string;
    setupWizard: string;
    stepsCount: string;
    brideHost: string;
  };
  dashboard: {
    greeting: string;
    subtitle: string;
    totalGuests: string;
    confirmed: string;
    pendingRSVP: string;
    checkedIn: string;
    expectedHeadcount: string;
    giftTotal: string;
    recentActivity: string;
    weddingPreparation: string;
    viewAllGuests: string;
    viewActivityFeed: string;
    tasksCompleted: string;
    responseRate: string;
    activeEvent: string;
  };
  wedding: {
    title: string;
    subtitle: string;
    basicInfo: string;
    weddingName: string;
    bride: string;
    brideName: string;
    groom: string;
    groomName: string;
    weddingDate: string;
    weddingTime: string;
    ceremonyVenue: string;
    receptionVenue: string;
    weddingStyle: string;
    theme: string;
    hashtag: string;
    weddingStory: string;
    editWedding: string;
    addMilestone: string;
    targetGuests: string;
    totalTables: string;
  };
  guests: {
    title: string;
    subtitle: string;
    totalGuests: string;
    addGuest: string;
    importGuests: string;
    sendInvitations: string;
    searchPlaceholder: string;
    relationship: string;
    group: string;
    invitation: string;
    rsvp: string;
    companions: string;
    table: string;
    checkIn: string;
    actions: string;
    emptyTitle: string;
    emptySubtitle: string;
    allGroups: string;
    allStatuses: string;
    statuses: {
      confirmed: string;
      pending: string;
      declined: string;
      maybe: string;
      checkedIn: string;
      notCheckedIn: string;
      sent: string;
      opened: string;
      delivered: string;
      draft: string;
    };
    relationships: {
      bride_friend: string;
      groom_friend: string;
      friend: string;
      family: string;
      colleague: string;
      vip: string;
      bride_sister: string;
      cousin: string;
      walkin: string;
    };
    groups: {
      family: string;
      friends: string;
      colleagues: string;
      vip: string;
    };
  };
  analytics: {
    title: string;
    subtitle: string;
    responseRate: string;
    confirmedAttendees: string;
    attendanceBreakdown: string;
    timelineTracking: string;
    exportCSV: string;
    dietaryNotesTitle: string;
    companionDistribution: string;
  };
  templates: {
    title: string;
    subtitle: string;
    preview: string;
    useTemplate: string;
    premiumBadge: string;
    popularBadge: string;
    trendingBadge: string;
    luxuryBadge: string;
    exclusiveBadge: string;
    categories: {
      all: string;
      modern: string;
      classic: string;
      minimal: string;
      romantic: string;
      luxury: string;
      traditional: string;
    };
  };
  builder: {
    title: string;
    customization: string;
    styleStudio: string;
    theme: string;
    colors: string;
    typography: string;
    content: string;
    dressCode: string;
    schedule: string;
    venue: string;
    rsvpSettings: string;
    giftSettings: string;
    livePreview: string;
    liveRendering: string;
    desktop: string;
    mobile: string;
    sections: string;
    manageSections: string;
    openPortal: string;
    autoSyncNote: string;
    sectionsOrderNote: string;
    coverQuoteLabel: string;
    welcomeNoteLabel: string;
    coverPhotoUrlLabel: string;
    dressCodeTitleLabel: string;
    dressCodeDescLabel: string;
    sectionItems: {
      hero: string;
      ourStory: string;
      gallery: string;
      schedule: string;
      venue: string;
      dressCode: string;
      rsvp: string;
      gift: string;
      footer: string;
    };
  };
  personalized: {
    title: string;
    subtitle: string;
    generated: string;
    pending: string;
    invitationLink: string;
    copyLink: string;
    viewInvitation: string;
    downloadQR: string;
    regenerate: string;
    sendInvitationsBtn: string;
    guestNameHeader: string;
    personalLinkHeader: string;
    qrPassHeader: string;
  };
  publicPortal: {
    weddingCelebration: string;
    speciallyInvited: string;
    dearGuest: string;
    invitationGreeting: string;
    countdownTitle: string;
    days: string;
    hours: string;
    minutes: string;
    ourStoryTitle: string;
    ourStorySubtitle: string;
    howForeverBegan: string;
    memoriesTitle: string;
    momentsAlongWay: string;
    itineraryTitle: string;
    scheduleCelebrations: string;
    locationTitle: string;
    celebrationVenues: string;
    getDirections: string;
    attireTitle: string;
    rsvpSectionTitle: string;
    willYouCelebrate: string;
    kindlyRespondFor: string;
    acceptBtn: string;
    declineBtn: string;
    maybeBtn: string;
    attendeesCountLabel: string;
    guestSingular: string;
    guestsPlural: string;
    dietaryLabel: string;
    blessingMessageLabel: string;
    submitRsvpBtn: string;
    rsvpSuccessTitle: string;
    rsvpSuccessSub: string;
    yourRsvpStatus: string;
    totalGuestsCount: string;
    dietaryChoice: string;
    viewPassBtn: string;
    editResponse: string;
    giftSectionTitle: string;
    giftSectionSub: string;
    copyAccountBtn: string;
    sentGiftBtn: string;
    leaveWishBtn: string;
    craftedWith: string;
    backToSuite: string;
    viewingAs: string;
  };
  qrPass: {
    passTitle: string;
    monogramTitle: string;
    guestLabel: string;
    statusLabel: string;
    guestsCountLabel: string;
    tableLabel: string;
    instruction: string;
    addToAppleWallet: string;
    downloadPass: string;
    closePass: string;
  };
  seating: {
    title: string;
    subtitle: string;
    tablesCount: string;
    assignedGuests: string;
    unassignedGuests: string;
    overCapacity: string;
    autoSuggestSeating: string;
    addTable: string;
    unassignedPoolTitle: string;
    dragInstruction: string;
    ballroomFloorPlanTitle: string;
    stage: string;
    danceFloor: string;
    capacityLabel: string;
    remainingSeats: string;
    zoneFront: string;
    zoneCenter: string;
    zoneLeft: string;
    zoneRight: string;
    zoneRear: string;
  };
  reception: {
    title: string;
    subtitle: string;
    scannerTitle: string;
    scanInstruction: string;
    expectedGuests: string;
    checkedIn: string;
    remaining: string;
    walkIns: string;
    recentArrivals: string;
    welcomeGreeting: string;
    alreadyCheckedIn: string;
    manualCheckIn: string;
    manualSearchPlaceholder: string;
    walkInRegisterBtn: string;
    quickCheckInBtn: string;
    switchCamera: string;
    doorConsoleOnline: string;
  };
  giftBook: {
    title: string;
    subtitle: string;
    disclaimer: string;
    totalGifts: string;
    transactions: string;
    averageGift: string;
    giftedGuests: string;
    velocityTitle: string;
    velocitySub: string;
    sourceBreakdown: string;
    tableHeaderGuest: string;
    tableHeaderAmount: string;
    tableHeaderMessage: string;
    tableHeaderStatus: string;
    tableHeaderTime: string;
    drawerTitle: string;
    senderInfo: string;
    blessingNote: string;
    copyDetails: string;
  };
  wishes: {
    title: string;
    subtitle: string;
    recordedWishes: string;
    leaveWishBtn: string;
    modalTitle: string;
    modalSubtitle: string;
    yourName: string;
    relationship: string;
    messageLabel: string;
    anonymousToggle: string;
    postBlessingBtn: string;
    featuredBlessing: string;
  };
  aiAssistant: {
    title: string;
    subtitle: string;
    welcomeMessage: string;
    conciergeTitle: string;
    onlineStatus: string;
    quickGeneratorsTitle: string;
    quickGeneratorsSub: string;
    actions: {
      invitationWording: string;
      thankYouNotes: string;
      improveStory: string;
      scheduleDesc: string;
    };
    askPlaceholder: string;
    sendBtn: string;
    useInInvitation: string;
    structuredModalTitle: string;
    structuredModalSub: string;
    toneLabel: string;
    styleLabel: string;
    recipientLabel: string;
    craftingMessage: string;
  };
  thankYou: {
    title: string;
    subtitle: string;
    generateAllBtn: string;
    messagesReady: string;
    delivered: string;
    pendingDelivery: string;
    tableHeaderGuest: string;
    tableHeaderGift: string;
    tableHeaderPreview: string;
    tableHeaderStatus: string;
    tableHeaderActions: string;
    sendNowBtn: string;
    sendModalTitle: string;
    deliveryChannelLabel: string;
    batchTitle: string;
    batchSub: string;
    batchReady: string;
  };
  admin: {
    dashboard: string;
    users: string;
    weddings: string;
    templates: string;
    subscriptions: string;
    moderation: string;
    support: string;
    analytics: string;
    settings: string;
    dashboardTitle: string;
    dashboardSub: string;
    executiveTitle: string;
    executiveSub: string;
    usersTitle: string;
    usersSub: string;
    weddingsTitle: string;
    weddingsSub: string;
    templatesTitle: string;
    templatesSub: string;
    subscriptionsTitle: string;
    subscriptionsSub: string;
    moderationTitle: string;
    moderationSub: string;
    supportTitle: string;
    supportSub: string;
    analyticsTitle: string;
    analyticsSub: string;
    settingsTitle: string;
    settingsSub: string;
    telemetryBadge: string;
    operationalStatus: string;
    totalUsers: string;
    totalPlatformUsers: string;
    activeWeddings: string;
    guestRSVPs: string;
    guestRsvpsProcessed: string;
    monthlyRevenue: string;
    revenueVelocity: string;
    tierDistribution: string;
    recentWeddingsTelemetry: string;
    mrrVelocity: string;
    planMix: string;
    allWeddingsBtn: string;
    allUsersBtn: string;
    jumpCoupleSuite: string;
    jumpReceptionApp: string;
    suspendUser: string;
    activateUser: string;
    publishCatalog: string;
    unpublishCatalog: string;
    approveContent: string;
    hideContent: string;
    removeContent: string;
    openTicketsCount: string;
    inProgressCount: string;
    resolvedCount: string;
    resetDemoDataBtn: string;
  };
  toast: {
    guestAdded: string;
    guestUpdated: string;
    guestRemoved: string;
    checkInSuccess: string;
    tableAssigned: string;
    seatingOptimized: string;
    walkInAdded: string;
    giftRecorded: string;
    wishPosted: string;
    invitationApplied: string;
    thankYouGenerated: string;
    thankYouSent: string;
    settingsSaved: string;
    dataReset: string;
    copiedClipboard: string;
    accountCopied: string;
    rsvpReceived: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    passwordLength: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    common: {
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      add: "Add",
      create: "Create",
      update: "Update",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      clear: "Clear",
      apply: "Apply",
      confirm: "Confirm",
      continue: "Continue",
      done: "Done",
      view: "View",
      download: "Download",
      upload: "Upload",
      copy: "Copy",
      share: "Share",
      send: "Send",
      refresh: "Refresh",
      details: "Details",
      actions: "Actions",
      all: "All",
      active: "Active",
      status: "Status",
      loading: "Loading...",
      success: "Success",
      error: "Error",
      warning: "Warning",
      info: "Information",
      or: "or",
      guestsUnit: "Guests",
      tablesUnit: "Tables",
      currencySymbol: "VND",
    },
    auth: {
      welcomeBack: "Welcome back",
      subtitle: "Manage every beautiful moment of your wedding.",
      email: "Email Address",
      password: "Password",
      rememberMe: "Remember me",
      forgotPassword: "Forgot password?",
      signIn: "Sign In",
      signUp: "Sign Up",
      hasAccount: "Already have an account?",
      orContinueWith: "or continue with",
      noAccount: "Don't have an account?",
      createAccount: "Create account",
      resetPassword: "Reset Password",
      registeredEmail: "Registered Email",
      sendResetLink: "Send Reset Link",
      checkInbox: "Check your inbox",
      returnToLogin: "Return to Login",
    },
    nav: {
      overview: "Overview",
      weddingSection: "Wedding & Design",
      weddingDetails: "Wedding Details",
      templateGallery: "Template Gallery",
      invitationBuilder: "Invitation Builder",
      personalizedInvites: "Personalized Invites",
      guestsSection: "Guests & RSVP",
      guestList: "Guest List",
      rsvpAnalytics: "RSVP Analytics",
      publicGuestPortal: "Public Guest Portal",
      operationsSection: "Wedding Day Operations",
      seatingArrangement: "Seating Arrangement",
      receptionStaffApp: "Reception Staff App",
      engagementSection: "Engagement & AI Suite",
      giftBook: "Gift Book",
      wishesWall: "Wishes Wall",
      aiAssistant: "InviteMe AI",
      thankYouSuite: "Thank-you Suite",
      platformOversight: "Platform Oversight",
      adminConsole: "Admin Console",
      settings: "Settings",
      helpCenter: "Help Center",
      signOut: "Sign Out",
      setupWizard: "Setup Wizard",
      stepsCount: "5 Steps",
      brideHost: "Bride & Host",
    },
    dashboard: {
      greeting: "Good evening, Emily 👋",
      subtitle: "Your big day is getting closer. Here is your wedding pulse today.",
      totalGuests: "Total Guests",
      confirmed: "Confirmed",
      pendingRSVP: "Pending RSVP",
      checkedIn: "Checked-in",
      expectedHeadcount: "Expected Headcount",
      giftTotal: "Gift Total",
      recentActivity: "Recent Activity",
      weddingPreparation: "Wedding Preparation",
      viewAllGuests: "View all guests",
      viewActivityFeed: "View complete activity feed →",
      tasksCompleted: "Tasks Completed",
      responseRate: "RSVP Response Rate",
      activeEvent: "Active Event",
    },
    wedding: {
      title: "Wedding Details",
      subtitle: "Manage core wedding information, venues, and love story milestones.",
      basicInfo: "Basic Information",
      weddingName: "Wedding Celebration Name",
      bride: "Bride Name",
      brideName: "Bride's Name",
      groom: "Groom Name",
      groomName: "Groom's Name",
      weddingDate: "Wedding Date",
      weddingTime: "Wedding Time",
      ceremonyVenue: "Ceremony Venue",
      receptionVenue: "Reception Venue",
      weddingStyle: "Wedding Style",
      theme: "Theme & Palette",
      hashtag: "Wedding Hashtag",
      weddingStory: "Our Love Story",
      editWedding: "Edit Wedding",
      addMilestone: "Add Milestone",
      targetGuests: "Target Guests",
      totalTables: "Total Tables",
    },
    guests: {
      title: "Guests",
      subtitle: "Manage your wedding attendees, companions, dietary needs, and invitations.",
      totalGuests: "Total Guests",
      addGuest: "Add Guest",
      importGuests: "Import Guests",
      sendInvitations: "Send Invitations",
      searchPlaceholder: "Search by name, email, or phone...",
      relationship: "Relationship",
      group: "Group",
      invitation: "Invitation",
      rsvp: "RSVP",
      companions: "Companions",
      table: "Table",
      checkIn: "Check-in",
      actions: "Actions",
      emptyTitle: "No guests found",
      emptySubtitle: "Start building your guest list or adjust your filters.",
      allGroups: "All Groups",
      allStatuses: "All RSVP Statuses",
      statuses: {
        confirmed: "Confirmed",
        pending: "Pending",
        declined: "Declined",
        maybe: "Maybe",
        checkedIn: "Checked-in",
        notCheckedIn: "Not Checked-in",
        sent: "Sent",
        opened: "Opened",
        delivered: "Delivered",
        draft: "Draft",
      },
      relationships: {
        bride_friend: "Bride's Friend",
        groom_friend: "Groom's Friend",
        friend: "Friend",
        family: "Family",
        colleague: "Colleague",
        vip: "VIP",
        bride_sister: "Bride's Sister",
        cousin: "Cousin",
        walkin: "Walk-in Guest",
      },
      groups: {
        family: "Family",
        friends: "Friends",
        colleagues: "Colleagues",
        vip: "VIP",
      },
    },
    analytics: {
      title: "RSVP Analytics",
      subtitle: "Live tracking of guest confirmations, meal preferences, and velocity.",
      responseRate: "Response Rate",
      confirmedAttendees: "Confirmed Attendees",
      attendanceBreakdown: "Attendance Breakdown",
      timelineTracking: "RSVP Velocity Over Time",
      exportCSV: "Export Report (CSV)",
      dietaryNotesTitle: "Dietary Preferences",
      companionDistribution: "Companion Distribution",
    },
    templates: {
      title: "Template Gallery",
      subtitle: "Explore high-fashion editorial layouts designed for modern weddings.",
      preview: "Live Preview",
      useTemplate: "Use Template",
      premiumBadge: "Premium",
      popularBadge: "Popular",
      trendingBadge: "Trending",
      luxuryBadge: "Luxury",
      exclusiveBadge: "Exclusive",
      categories: {
        all: "All",
        modern: "Modern",
        classic: "Classic",
        minimal: "Minimal",
        romantic: "Romantic",
        luxury: "Luxury",
        traditional: "Traditional",
      },
    },
    builder: {
      title: "Invitation Builder",
      customization: "Customization",
      styleStudio: "Style Studio",
      theme: "Theme",
      colors: "Colors",
      typography: "Typography",
      content: "Copy",
      dressCode: "Dress",
      schedule: "Schedule",
      venue: "Venue",
      rsvpSettings: "RSVP Settings",
      giftSettings: "Gift Settings",
      livePreview: "Live Invitation Canvas",
      liveRendering: "Live Rendering",
      desktop: "Desktop",
      mobile: "Mobile",
      sections: "Sections",
      manageSections: "Manage sections on your invitation",
      openPortal: "Open Portal",
      autoSyncNote: "Changes auto-sync to live preview",
      sectionsOrderNote: "Sections render in top-to-bottom order",
      coverQuoteLabel: "Cover Quote",
      welcomeNoteLabel: "Welcome Note",
      coverPhotoUrlLabel: "Cover Photo URL",
      dressCodeTitleLabel: "Dress Code Title",
      dressCodeDescLabel: "Attire Description",
      sectionItems: {
        hero: "Cover & Hero Banner",
        ourStory: "Our Love Story",
        gallery: "Photo Gallery",
        schedule: "Event Schedule",
        venue: "Venues & Maps",
        dressCode: "Dress Code Guide",
        rsvp: "Interactive RSVP",
        gift: "Wedding Gift Book",
        footer: "Celebration Footer",
      },
    },
    personalized: {
      title: "Personalized Invitations",
      subtitle: "Generate individualized invitation URLs and QR guest passes for 150 guests.",
      generated: "Generated Links",
      pending: "Pending Links",
      invitationLink: "Personal Invitation URL",
      copyLink: "Copy Link",
      viewInvitation: "View Invitation",
      downloadQR: "Download QR Pass",
      regenerate: "Regenerate Links",
      sendInvitationsBtn: "Broadcast All 150 Invites",
      guestNameHeader: "Guest",
      personalLinkHeader: "Personalized Smart Link",
      qrPassHeader: "QR Pass",
    },
    publicPortal: {
      weddingCelebration: "Wedding Celebration • 2026",
      speciallyInvited: "Specially Invited",
      dearGuest: "Dear",
      invitationGreeting: "We are delighted to invite you to celebrate our special day with us.",
      countdownTitle: "Countdown to Forever",
      days: "Days",
      hours: "Hours",
      minutes: "Minutes",
      ourStoryTitle: "The Journey",
      ourStorySubtitle: "How Forever Began",
      howForeverBegan: "How Forever Began",
      memoriesTitle: "Memories",
      momentsAlongWay: "Moments Along the Way",
      itineraryTitle: "Itinerary",
      scheduleCelebrations: "Schedule of Celebrations",
      locationTitle: "Location",
      celebrationVenues: "Celebration Venues",
      getDirections: "Get Directions",
      attireTitle: "Attire & Dress Code",
      rsvpSectionTitle: "RSVP",
      willYouCelebrate: "Will You Celebrate With Us?",
      kindlyRespondFor: "Kindly respond for",
      acceptBtn: "Joyfully Accept",
      declineBtn: "Regretfully Decline",
      maybeBtn: "Maybe / Tentative",
      attendeesCountLabel: "Number of Attendees (including yourself):",
      guestSingular: "Guest",
      guestsPlural: "Guests",
      dietaryLabel: "Dietary Requirements:",
      blessingMessageLabel: "Leave a Wedding Blessing or Message for the Couple:",
      submitRsvpBtn: "Submit RSVP Response",
      rsvpSuccessTitle: "Thank You,",
      rsvpSuccessSub: "We can't wait to celebrate our special day with you.",
      yourRsvpStatus: "Your RSVP:",
      totalGuestsCount: "Total Guests:",
      dietaryChoice: "Dietary Selection:",
      viewPassBtn: "View Your Wedding Pass",
      editResponse: "Edit your response",
      giftSectionTitle: "A Gift of Love",
      giftSectionSub: "Your presence is already the greatest gift. If you would like to send your blessings:",
      copyAccountBtn: "Copy Account",
      sentGiftBtn: "I've Sent a Gift",
      leaveWishBtn: "Leave a Wish for the Couple",
      craftedWith: "Digital Wedding Experience crafted with InviteMe",
      backToSuite: "Back to Couple Suite",
      viewingAs: "Viewing as:",
    },
    qrPass: {
      passTitle: "Wedding Guest Pass",
      monogramTitle: "Emily & James Wedding Pass",
      guestLabel: "Guest Name",
      statusLabel: "RSVP Status",
      guestsCountLabel: "Admit Guests",
      tableLabel: "Assigned Table",
      instruction: "Please present this digital pass at reception for instant QR check-in.",
      addToAppleWallet: "Add to Apple Wallet",
      downloadPass: "Download Digital Pass",
      closePass: "Close Pass",
    },
    seating: {
      title: "Seating Arrangement",
      subtitle: "Organize your guests and keep every table perfectly balanced.",
      tablesCount: "Tables",
      assignedGuests: "Assigned Guests",
      unassignedGuests: "Unassigned",
      overCapacity: "Over Capacity",
      autoSuggestSeating: "Auto Suggest Seating",
      addTable: "Add Table",
      unassignedPoolTitle: "Unassigned Guests",
      dragInstruction: "Assign unassigned guests to ballroom tables",
      ballroomFloorPlanTitle: "Architectural Ballroom Layout",
      stage: "STAGE & HEAD TABLE",
      danceFloor: "DANCE FLOOR",
      capacityLabel: "Capacity",
      remainingSeats: "seats left",
      zoneFront: "Front Stage",
      zoneCenter: "Center Ballroom",
      zoneLeft: "Left Wing",
      zoneRight: "Right Wing",
      zoneRear: "Rear Terrace",
    },
    reception: {
      title: "Check-in Scanner",
      subtitle: "Fast door reception console and live headcount tracking.",
      scannerTitle: "Simulated Camera Scanner",
      scanInstruction: "Position guest QR pass in viewfinder",
      expectedGuests: "Expected Guests",
      checkedIn: "Checked-in",
      remaining: "Remaining",
      walkIns: "Walk-ins",
      recentArrivals: "Recent Arrivals",
      welcomeGreeting: "Welcome to the Wedding!",
      alreadyCheckedIn: "Already Checked-in",
      manualCheckIn: "Manual Guest Search",
      manualSearchPlaceholder: "Search guest name or phone number...",
      walkInRegisterBtn: "Register Walk-in Guest",
      quickCheckInBtn: "1-Tap Check-in",
      switchCamera: "Simulate Camera",
      doorConsoleOnline: "Door Console Online",
    },
    giftBook: {
      title: "Gift Book",
      subtitle: "Keep every blessing and gift in one beautiful place.",
      disclaimer: "Gift transactions are recorded for demonstration purposes only.",
      totalGifts: "Total Gifts",
      transactions: "Total Transactions",
      averageGift: "Average Gift",
      giftedGuests: "Gifted Guests",
      velocityTitle: "Cumulative Blessing Velocity",
      velocitySub: "Gift progression leading up to wedding reception",
      sourceBreakdown: "Gift Source Breakdown",
      tableHeaderGuest: "Guest",
      tableHeaderAmount: "Amount (VND)",
      tableHeaderMessage: "Blessing Message",
      tableHeaderStatus: "Status",
      tableHeaderTime: "Timestamp",
      drawerTitle: "Transaction Details",
      senderInfo: "Sender Information",
      blessingNote: "Blessing Message",
      copyDetails: "Copy Account Details",
    },
    wishes: {
      title: "Wedding Wishes Wall",
      subtitle: "Heartfelt blessings, advice, and memories shared by friends and family.",
      recordedWishes: "Recorded Wishes",
      leaveWishBtn: "Leave a Blessing",
      modalTitle: "Leave a Wedding Blessing",
      modalSubtitle: "Share your love, wishes, and advice with Emily & James",
      yourName: "Your Name",
      relationship: "Relationship",
      messageLabel: "Your Blessing Message:",
      anonymousToggle: "Post anonymously",
      postBlessingBtn: "Post Blessing",
      featuredBlessing: "Featured Blessing",
    },
    aiAssistant: {
      title: "InviteMe AI",
      subtitle: "Your personal wedding content assistant.",
      welcomeMessage: "Hi Emily! 👋 How can I help make your wedding even more special?",
      conciergeTitle: "InviteMe AI Concierge",
      onlineStatus: "Online • Wedding Intelligence",
      quickGeneratorsTitle: "Quick AI Generators",
      quickGeneratorsSub: "One-tap actions to compose wedding literature",
      actions: {
        invitationWording: "Generate Invitation Wording",
        thankYouNotes: "Write Thank-you Messages",
        improveStory: "Improve Wedding Story",
        scheduleDesc: "Create Schedule Description",
      },
      askPlaceholder: "Ask InviteMe AI anything (e.g. Write a warm thank-you note)...",
      sendBtn: "Send",
      useInInvitation: "Use in Invitation",
      structuredModalTitle: "AI Invitation Copy Generator",
      structuredModalSub: "Craft poetic invitation wording tailored to your aesthetic",
      toneLabel: "Tone of Voice",
      styleLabel: "Wedding Style",
      recipientLabel: "Recipient Group",
      craftingMessage: "✨ Crafting your perfect wording...",
    },
    thankYou: {
      title: "Thank-you Message Management",
      subtitle: "Personalize and send AI-crafted thank-you notes referencing attendance and gifts.",
      generateAllBtn: "Generate All 87 Messages",
      messagesReady: "Messages Ready",
      delivered: "Delivered",
      pendingDelivery: "Pending Delivery",
      tableHeaderGuest: "Guest",
      tableHeaderGift: "Gift Reference",
      tableHeaderPreview: "Personalized Message Preview",
      tableHeaderStatus: "Status",
      tableHeaderActions: "Actions",
      sendNowBtn: "Send",
      sendModalTitle: "Deliver Thank-you Message",
      deliveryChannelLabel: "Select Delivery Channel:",
      batchTitle: "Batch AI Thank-you Generator",
      batchSub: "Generating 87 personalized thank-you messages",
      batchReady: "87 Thank-you Messages Ready!",
    },
    admin: {
      dashboard: "Dashboard",
      users: "Users",
      weddings: "Weddings",
      templates: "Templates",
      subscriptions: "Subscriptions",
      moderation: "Content Moderation",
      support: "Support Desk",
      analytics: "Analytics",
      settings: "Settings",
      dashboardTitle: "Executive Admin Control",
      dashboardSub: "Platform health, tenant revenue, wedding operations, and system performance.",
      executiveTitle: "Executive Admin Control",
      executiveSub: "Platform health, tenant revenue, wedding operations, and system performance.",
      usersTitle: "User Account Management",
      usersSub: "Audit 12,482 platform accounts across Couples, Reception Staff, and Admin roles.",
      weddingsTitle: "Weddings Directory",
      weddingsSub: "Oversee 2,341 active weddings, invitation configurations, and RSVP health.",
      templatesTitle: "Template Catalog & Publishing Studio",
      templatesSub: "Manage bespoke design templates, usage velocity, and live catalog publishing.",
      subscriptionsTitle: "Subscription & Pricing Management",
      subscriptionsSub: "Monitor plan conversion, churn metrics, and pricing tier configurations.",
      moderationTitle: "Content Moderation Desk",
      moderationSub: "Review reported guest blessings, inappropriate language flags, and spam.",
      supportTitle: "Support Ticket Management",
      supportSub: "Resolve user inquiries, seating import issues, and custom domain verifications.",
      analyticsTitle: "Admin Analytics Intelligence",
      analyticsSub: "Real-time engagement telemetry, RSVP conversion funnels, and design popularity.",
      settingsTitle: "Admin System Settings",
      settingsSub: "Global system parameters, roles & permissions, and sandbox database operations.",
      telemetryBadge: "Multi-Tenant Telemetry",
      operationalStatus: "All Systems Operational",
      totalUsers: "Total Users",
      totalPlatformUsers: "Total Platform Users",
      activeWeddings: "Active Weddings",
      guestRSVPs: "Guest RSVPs Processed",
      guestRsvpsProcessed: "Guest RSVPs Processed",
      monthlyRevenue: "Monthly Revenue (MRR)",
      revenueVelocity: "Monthly Recurring Revenue Velocity",
      tierDistribution: "Subscription Plan Mix",
      recentWeddingsTelemetry: "Recent Weddings Telemetry",
      mrrVelocity: "Monthly Recurring Revenue Velocity",
      planMix: "Subscription Plan Mix",
      allWeddingsBtn: "View All Weddings",
      allUsersBtn: "View All Users",
      jumpCoupleSuite: "Couple Suite",
      jumpReceptionApp: "Reception Door App",
      suspendUser: "Suspend Account",
      activateUser: "Reactivate Account",
      publishCatalog: "Publish to Catalog",
      unpublishCatalog: "Unpublish",
      approveContent: "Approve",
      hideContent: "Hide",
      removeContent: "Remove",
      openTicketsCount: "Open Tickets",
      inProgressCount: "In Progress",
      resolvedCount: "Resolved",
      resetDemoDataBtn: "Reset All Data to Golden Demo Baseline",
    },
    toast: {
      guestAdded: "Guest added successfully",
      guestUpdated: "Guest updated successfully",
      guestRemoved: "Guest removed from registry",
      checkInSuccess: "Check-in recorded successfully",
      tableAssigned: "Table assigned successfully",
      seatingOptimized: "Seating optimized with AI",
      walkInAdded: "Walk-in guest registered",
      giftRecorded: "Gift blessing recorded in ledger",
      wishPosted: "Wedding blessing posted to wall",
      invitationApplied: "Applied wording to live invitation",
      thankYouGenerated: "Thank-you note generated with AI",
      thankYouSent: "Thank-you message dispatched",
      settingsSaved: "Settings saved successfully",
      dataReset: "Data reset to Golden Demo baseline",
      copiedClipboard: "Copied to clipboard",
      accountCopied: "Vietcombank account copied",
      rsvpReceived: "New RSVP response received",
    },
    validation: {
      required: "This field is required.",
      invalidEmail: "Please enter a valid email address.",
      passwordLength: "Password must contain at least 8 characters.",
    },
  },
  vi: {
    common: {
      save: "Lưu",
      cancel: "Hủy",
      delete: "Xóa",
      edit: "Chỉnh sửa",
      add: "Thêm",
      create: "Tạo",
      update: "Cập nhật",
      close: "Đóng",
      back: "Quay lại",
      next: "Tiếp theo",
      previous: "Trước",
      search: "Tìm kiếm",
      filter: "Lọc",
      clear: "Xóa bộ lọc",
      apply: "Áp dụng",
      confirm: "Xác nhận",
      continue: "Tiếp tục",
      done: "Hoàn tất",
      view: "Xem",
      download: "Tải xuống",
      upload: "Tải lên",
      copy: "Sao chép",
      share: "Chia sẻ",
      send: "Gửi",
      refresh: "Làm mới",
      details: "Chi tiết",
      actions: "Thao tác",
      all: "Tất cả",
      active: "Đang hoạt động",
      status: "Trạng thái",
      loading: "Đang tải...",
      success: "Thành công",
      error: "Lỗi",
      warning: "Cảnh báo",
      info: "Thông tin",
      or: "hoặc",
      guestsUnit: "Khách",
      tablesUnit: "Bàn",
      currencySymbol: "₫",
    },
    auth: {
      welcomeBack: "Chào mừng bạn quay trở lại",
      subtitle: "Quản lý mọi khoảnh khắc đẹp nhất trong ngày cưới của bạn.",
      email: "Địa chỉ email",
      password: "Mật khẩu",
      rememberMe: "Ghi nhớ đăng nhập",
      forgotPassword: "Quên mật khẩu?",
      signIn: "Đăng nhập",
      signUp: "Đăng ký tài khoản",
      hasAccount: "Đã có tài khoản?",
      orContinueWith: "hoặc tiếp tục với",
      noAccount: "Chưa có tài khoản?",
      createAccount: "Tạo tài khoản",
      resetPassword: "Đặt lại mật khẩu",
      registeredEmail: "Email đã đăng ký",
      sendResetLink: "Gửi liên kết khôi phục",
      checkInbox: "Kiểm tra hộp thư đến",
      returnToLogin: "Quay lại Đăng nhập",
    },
    nav: {
      overview: "Tổng quan",
      weddingSection: "Đám cưới & Thiết kế",
      weddingDetails: "Thông tin đám cưới",
      templateGallery: "Thư viện mẫu",
      invitationBuilder: "Thiết kế thiệp mời",
      personalizedInvites: "Thiệp mời cá nhân hóa",
      guestsSection: "Khách mời & RSVP",
      guestList: "Danh sách khách",
      rsvpAnalytics: "Phân tích RSVP",
      publicGuestPortal: "Trang thiệp mời khách",
      operationsSection: "Vận hành ngày cưới",
      seatingArrangement: "Sắp xếp bàn tiệc",
      receptionStaffApp: "Lễ tân & Check-in",
      engagementSection: "Tương tác & AI",
      giftBook: "Sổ quà mừng",
      wishesWall: "Lời chúc",
      aiAssistant: "Trợ lý AI",
      thankYouSuite: "Lời cảm ơn",
      platformOversight: "Quản trị hệ thống",
      adminConsole: "Bảng điều khiển Admin",
      settings: "Cài đặt",
      helpCenter: "Trung tâm trợ giúp",
      signOut: "Đăng xuất",
      setupWizard: "Trình hướng dẫn",
      stepsCount: "5 Bước",
      brideHost: "Cô dâu & Chủ tiệc",
    },
    dashboard: {
      greeting: "Chào buổi tối, Emily 👋",
      subtitle: "Ngày trọng đại của bạn đang đến gần. Dưới đây là tiến độ hôm nay.",
      totalGuests: "Tổng số khách",
      confirmed: "Đã xác nhận",
      pendingRSVP: "Đang chờ RSVP",
      checkedIn: "Đã check-in",
      expectedHeadcount: "Số khách dự kiến",
      giftTotal: "Tổng tiền mừng",
      recentActivity: "Hoạt động gần đây",
      weddingPreparation: "Chuẩn bị đám cưới",
      viewAllGuests: "Xem toàn bộ khách",
      viewActivityFeed: "Xem dòng thời gian đầy đủ →",
      tasksCompleted: "Nhiệm vụ hoàn thành",
      responseRate: "Tỷ lệ phản hồi RSVP",
      activeEvent: "Sự kiện đang diễn ra",
    },
    wedding: {
      title: "Thông tin đám cưới",
      subtitle: "Quản lý thông tin hôn lễ, địa điểm tiệc cưới và câu chuyện tình yêu.",
      basicInfo: "Thông tin cơ bản",
      weddingName: "Tên tiệc cưới",
      bride: "Tên cô dâu",
      brideName: "Tên cô dâu",
      groom: "Tên chú rể",
      groomName: "Tên chú rể",
      weddingDate: "Ngày cưới",
      weddingTime: "Giờ tổ chức",
      ceremonyVenue: "Địa điểm tổ chức lễ cưới",
      receptionVenue: "Địa điểm tiệc cưới",
      weddingStyle: "Phong cách đám cưới",
      theme: "Chủ đề & Bảng màu",
      hashtag: "Hashtag đám cưới",
      weddingStory: "Câu chuyện tình yêu",
      editWedding: "Chỉnh sửa đám cưới",
      addMilestone: "Thêm cột mốc",
      targetGuests: "Mục tiêu số khách",
      totalTables: "Tổng số bàn",
    },
    guests: {
      title: "Khách mời",
      subtitle: "Quản lý danh sách khách dự tiệc, người đi cùng, khẩu phần ăn và thiệp mời.",
      totalGuests: "Tổng số khách",
      addGuest: "Thêm khách",
      importGuests: "Nhập danh sách khách",
      sendInvitations: "Gửi thiệp mời",
      searchPlaceholder: "Tìm kiếm theo tên, email, hoặc số điện thoại...",
      relationship: "Mối quan hệ",
      group: "Nhóm",
      invitation: "Thiệp mời",
      rsvp: "RSVP",
      companions: "Người đi cùng",
      table: "Bàn",
      checkIn: "Check-in",
      actions: "Thao tác",
      emptyTitle: "Không tìm thấy khách mời",
      emptySubtitle: "Hãy bắt đầu tạo danh sách khách mời của bạn hoặc điều chỉnh bộ lọc.",
      allGroups: "Tất cả các nhóm",
      allStatuses: "Tất cả trạng thái RSVP",
      statuses: {
        confirmed: "Đã xác nhận",
        pending: "Đang chờ",
        declined: "Từ chối",
        maybe: "Có thể",
        checkedIn: "Đã check-in",
        notCheckedIn: "Chưa check-in",
        sent: "Đã gửi",
        opened: "Đã mở",
        delivered: "Đã nhận",
        draft: "Bản nháp",
      },
      relationships: {
        bride_friend: "Bạn của cô dâu",
        groom_friend: "Bạn của chú rể",
        friend: "Bạn bè",
        family: "Gia đình",
        colleague: "Đồng nghiệp",
        vip: "Khách VIP",
        bride_sister: "Em gái cô dâu",
        cousin: "Anh chị em họ",
        walkin: "Khách vãng lai",
      },
      groups: {
        family: "Gia đình",
        friends: "Bạn bè",
        colleagues: "Đồng nghiệp",
        vip: "Khách VIP",
      },
    },
    analytics: {
      title: "Phân tích RSVP",
      subtitle: "Theo dõi trực tiếp xác nhận tham dự, tùy chọn món ăn và tiến độ phản hồi.",
      responseRate: "Tỷ lệ phản hồi",
      confirmedAttendees: "Khách đã xác nhận",
      attendanceBreakdown: "Phân bố tham dự",
      timelineTracking: "Tốc độ phản hồi RSVP",
      exportCSV: "Xuất báo cáo (CSV)",
      dietaryNotesTitle: "Yêu cầu khẩu phần ăn",
      companionDistribution: "Phân bố người đi cùng",
    },
    templates: {
      title: "Thư viện mẫu",
      subtitle: "Khám phá các bố cục thiệp cưới cao cấp được thiết kế theo phong cách hiện đại.",
      preview: "Xem trước",
      useTemplate: "Sử dụng mẫu",
      premiumBadge: "Cao cấp",
      popularBadge: "Phổ biến",
      trendingBadge: "Xu hướng",
      luxuryBadge: "Sang trọng",
      exclusiveBadge: "Độc quyền",
      categories: {
        all: "Tất cả",
        modern: "Hiện đại",
        classic: "Cổ điển",
        minimal: "Tối giản",
        romantic: "Lãng mạn",
        luxury: "Sang trọng",
        traditional: "Truyền thống",
      },
    },
    builder: {
      title: "Trình tạo thiệp mời",
      customization: "Tùy chỉnh",
      styleStudio: "Studio phong cách",
      theme: "Chủ đề",
      colors: "Màu sắc",
      typography: "Kiểu chữ",
      content: "Nội dung",
      dressCode: "Trang phục",
      schedule: "Lịch trình",
      venue: "Địa điểm",
      rsvpSettings: "Cài đặt RSVP",
      giftSettings: "Cài đặt quà mừng",
      livePreview: "Xem trước trực tiếp",
      liveRendering: "Hiển thị trực tiếp",
      desktop: "Máy tính",
      mobile: "Điện thoại",
      sections: "Các phần nội dung",
      manageSections: "Quản lý các phần hiển thị trên thiệp mời",
      openPortal: "Mở trang thiệp",
      autoSyncNote: "Thay đổi được tự động đồng bộ",
      sectionsOrderNote: "Các phần hiển thị theo thứ tự từ trên xuống",
      coverQuoteLabel: "Câu trích dẫn trang bìa",
      welcomeNoteLabel: "Lời chào đón khách",
      coverPhotoUrlLabel: "Đường dẫn ảnh bìa",
      dressCodeTitleLabel: "Tiêu đề trang phục",
      dressCodeDescLabel: "Mô tả quy định trang phục",
      sectionItems: {
        hero: "Trang bìa & Banner chính",
        ourStory: "Câu chuyện tình yêu",
        gallery: "Thư viện ảnh",
        schedule: "Lịch trình sự kiện",
        venue: "Địa điểm & Bản đồ",
        dressCode: "Hướng dẫn trang phục",
        rsvp: "RSVP tương tác",
        gift: "Sổ quà mừng cưới",
        footer: "Lời cảm ơn chân thành",
      },
    },
    personalized: {
      title: "Thiệp mời cá nhân hóa",
      subtitle: "Tạo liên kết thiệp mời và mã QR riêng biệt cho từng khách mời trong danh sách.",
      generated: "Liên kết đã tạo",
      pending: "Đang chờ tạo",
      invitationLink: "Liên kết thiệp mời cá nhân",
      copyLink: "Sao chép liên kết",
      viewInvitation: "Xem thiệp mời",
      downloadQR: "Tải mã QR",
      regenerate: "Tạo lại liên kết",
      sendInvitationsBtn: "Gửi đồng loạt 150 thiệp",
      guestNameHeader: "Khách mời",
      personalLinkHeader: "Liên kết thông minh riêng biệt",
      qrPassHeader: "Thẻ QR",
    },
    publicPortal: {
      weddingCelebration: "Lễ Thành Hôn • 2026",
      speciallyInvited: "Trân trọng kính mời",
      dearGuest: "Thân gửi",
      invitationGreeting: "Chúng tôi rất hân hạnh được mời bạn đến chung vui trong ngày trọng đại của chúng tôi.",
      countdownTitle: "Đếm ngược đến ngày hạnh phúc",
      days: "Ngày",
      hours: "Giờ",
      minutes: "Phút",
      ourStoryTitle: "Hành trình",
      ourStorySubtitle: "Câu chuyện của chúng tôi",
      howForeverBegan: "Câu chuyện tình yêu",
      memoriesTitle: "Kỷ niệm",
      momentsAlongWay: "Những khoảnh khắc đáng nhớ",
      itineraryTitle: "Lịch trình",
      scheduleCelebrations: "Lịch trình sự kiện",
      locationTitle: "Địa điểm",
      celebrationVenues: "Địa điểm tổ chức tiệc",
      getDirections: "Chỉ đường Google Maps",
      attireTitle: "Quy định trang phục",
      rsvpSectionTitle: "Xác nhận tham dự",
      willYouCelebrate: "Bạn có thể đến chung vui cùng chúng tôi không?",
      kindlyRespondFor: "Vui lòng xác nhận cho",
      acceptBtn: "Rất vui được tham dự",
      declineBtn: "Rất tiếc không thể tham dự",
      maybeBtn: "Có thể / Đang sắp xếp",
      attendeesCountLabel: "Số người tham dự (bao gồm bạn):",
      guestSingular: "Khách",
      guestsPlural: "Khách",
      dietaryLabel: "Yêu cầu về chế độ ăn:",
      blessingMessageLabel: "Gửi lời chúc phúc hoặc lời nhắn đến cặp đôi:",
      submitRsvpBtn: "Gửi xác nhận RSVP",
      rsvpSuccessTitle: "Cảm ơn bạn,",
      rsvpSuccessSub: "Chúng tôi rất mong được đón tiếp bạn trong ngày vui của mình.",
      yourRsvpStatus: "Trạng thái RSVP:",
      totalGuestsCount: "Tổng số khách:",
      dietaryChoice: "Khẩu phần ăn:",
      viewPassBtn: "Xem thẻ tham dự của bạn",
      editResponse: "Chỉnh sửa câu trả lời",
      giftSectionTitle: "Gửi quà mừng & Lời chúc",
      giftSectionSub: "Sự hiện diện của bạn là món quà quý giá nhất. Nếu bạn muốn gửi quà mừng đến Emily & James:",
      copyAccountBtn: "Sao chép số tài khoản",
      sentGiftBtn: "Tôi đã gửi quà mừng",
      leaveWishBtn: "Gửi lời chúc đến cặp đôi",
      craftedWith: "Trải nghiệm thiệp cưới số được tạo bởi InviteMe",
      backToSuite: "Quay lại Bảng điều khiển",
      viewingAs: "Xem dưới tên:",
    },
    qrPass: {
      passTitle: "Thẻ tham dự tiệc cưới",
      monogramTitle: "Thẻ dự tiệc cưới Emily & James",
      guestLabel: "Khách mời",
      statusLabel: "Trạng thái",
      guestsCountLabel: "Số lượng khách",
      tableLabel: "Bàn tiệc",
      instruction: "Vui lòng xuất trình mã QR này tại bàn lễ tân để check-in nhanh chóng.",
      addToAppleWallet: "Thêm vào Apple Wallet",
      downloadPass: "Tải thẻ tham dự",
      closePass: "Đóng thẻ",
    },
    seating: {
      title: "Sắp xếp bàn tiệc",
      subtitle: "Bố trí chỗ ngồi và giữ cho mỗi bàn tiệc luôn cân đối hoàn hảo.",
      tablesCount: "Bàn tiệc",
      assignedGuests: "Khách đã xếp bàn",
      unassignedGuests: "Khách chưa xếp bàn",
      overCapacity: "Quá số lượng",
      autoSuggestSeating: "Tự động đề xuất chỗ ngồi",
      addTable: "Thêm bàn",
      unassignedPoolTitle: "Khách chưa xếp bàn",
      dragInstruction: "Phân bổ khách vào các bàn tiệc trong khán phòng",
      ballroomFloorPlanTitle: "Sơ đồ mặt bằng khán phòng",
      stage: "SÂN KHẤU & BÀN DANH DỰ",
      danceFloor: "SÀN KHIÊU VŨ",
      capacityLabel: "Sức chứa",
      remainingSeats: "chỗ trống",
      zoneFront: "Khu vực sân khấu",
      zoneCenter: "Khu vực trung tâm",
      zoneLeft: "Cánh trái",
      zoneRight: "Cánh phải",
      zoneRear: "Khu vực phía sau",
    },
    reception: {
      title: "Quét check-in",
      subtitle: "Hệ thống lễ tân cửa vào và theo dõi số lượng khách trực tiếp.",
      scannerTitle: "Camera quét mã QR",
      scanInstruction: "Đưa mã QR của khách vào khung quét",
      expectedGuests: "Khách dự kiến",
      checkedIn: "Đã check-in",
      remaining: "Còn lại",
      walkIns: "Khách vãng lai",
      recentArrivals: "Khách đến gần đây",
      welcomeGreeting: "Chào mừng quý khách!",
      alreadyCheckedIn: "Đã check-in trước đó",
      manualCheckIn: "Tìm kiếm khách thủ công",
      manualSearchPlaceholder: "Tìm theo tên hoặc số điện thoại...",
      walkInRegisterBtn: "Đăng ký khách vãng lai",
      quickCheckInBtn: "Check-in 1 chạm",
      switchCamera: "Mô phỏng quét mã",
      doorConsoleOnline: "Lễ tân đang hoạt động",
    },
    giftBook: {
      title: "Sổ quà mừng",
      subtitle: "Lưu giữ mọi món quà và lời chúc phúc tại một nơi trọn vẹn.",
      disclaimer: "Giao dịch quà mừng được ghi nhận nhằm mục đích mô phỏng trải nghiệm.",
      totalGifts: "Tổng tiền mừng",
      transactions: "Tổng số giao dịch",
      averageGift: "Tiền mừng trung bình",
      giftedGuests: "Khách đã gửi quà",
      velocityTitle: "Tiến độ gửi quà mừng",
      velocitySub: "Dòng quà mừng dẫn tới thời điểm khai tiệc",
      sourceBreakdown: "Phân bố nguồn quà mừng",
      tableHeaderGuest: "Khách mời",
      tableHeaderAmount: "Số tiền (VNĐ)",
      tableHeaderMessage: "Lời chúc phúc",
      tableHeaderStatus: "Trạng thái",
      tableHeaderTime: "Thời gian",
      drawerTitle: "Chi tiết giao dịch",
      senderInfo: "Thông tin người gửi",
      blessingNote: "Lời chúc mừng",
      copyDetails: "Sao chép thông tin tài khoản",
    },
    wishes: {
      title: "Lời chúc đám cưới",
      subtitle: "Những lời chúc, lời khuyên và kỷ niệm ấm áp từ bạn bè và người thân.",
      recordedWishes: "Lời chúc đã nhận",
      leaveWishBtn: "Gửi lời chúc",
      modalTitle: "Gửi lời chúc đám cưới",
      modalSubtitle: "Chia sẻ tình cảm và lời chúc tốt đẹp nhất tới Emily & James",
      yourName: "Tên của bạn",
      relationship: "Mối quan hệ",
      messageLabel: "Lời chúc mừng của bạn:",
      anonymousToggle: "Gửi ẩn danh",
      postBlessingBtn: "Đăng lời chúc",
      featuredBlessing: "Lời chúc nổi bật",
    },
    aiAssistant: {
      title: "InviteMe AI",
      subtitle: "Trợ lý nội dung cưới cá nhân của bạn.",
      welcomeMessage: "Chào Emily! 👋 Tôi có thể giúp gì để ngày cưới của bạn trở nên đặc biệt hơn?",
      conciergeTitle: "Trợ lý ảo InviteMe AI",
      onlineStatus: "Trực tuyến • Trí tuệ nội dung cưới",
      quickGeneratorsTitle: "Tạo nội dung nhanh bằng AI",
      quickGeneratorsSub: "Thao tác 1 chạm để sáng tạo văn phong cưới",
      actions: {
        invitationWording: "Tạo nội dung thiệp mời",
        thankYouNotes: "Viết lời cảm ơn",
        improveStory: "Cải thiện câu chuyện tình yêu",
        scheduleDesc: "Tạo mô tả lịch trình",
      },
      askPlaceholder: "Hỏi InviteMe AI bất cứ điều gì (ví dụ: Viết lời cảm ơn ấm áp)...",
      sendBtn: "Gửi",
      useInInvitation: "Áp dụng vào thiệp",
      structuredModalTitle: "Trình tạo lời mời thiệp cưới bằng AI",
      structuredModalSub: "Sáng tạo câu từ thiệp mời thơ mộng theo phong cách của bạn",
      toneLabel: "Giọng điệu",
      styleLabel: "Phong cách đám cưới",
      recipientLabel: "Nhóm người nhận",
      craftingMessage: "✨ Đang sáng tạo câu từ hoàn hảo...",
    },
    thankYou: {
      title: "Lời cảm ơn",
      subtitle: "Cá nhân hóa và gửi lời cảm ơn bằng AI dựa trên sự tham dự và quà mừng.",
      generateAllBtn: "Tạo tất cả 87 lời cảm ơn",
      messagesReady: "Lời nhắn sẵn sàng",
      delivered: "Đã gửi",
      pendingDelivery: "Chờ gửi",
      tableHeaderGuest: "Khách mời",
      tableHeaderGift: "Quà mừng",
      tableHeaderPreview: "Xem trước lời nhắn cá nhân hóa",
      tableHeaderStatus: "Trạng thái",
      tableHeaderActions: "Thao tác",
      sendNowBtn: "Gửi ngay",
      sendModalTitle: "Gửi lời cảm ơn",
      deliveryChannelLabel: "Chọn kênh gửi:",
      batchTitle: "Tạo hàng loạt lời cảm ơn bằng AI",
      batchSub: "Đang tạo 87 lời nhắn cảm ơn cá nhân hóa",
      batchReady: "Đã sẵn sàng 87 lời cảm ơn!",
    },
    admin: {
      dashboard: "Tổng quan",
      users: "Người dùng",
      weddings: "Đám cưới",
      templates: "Mẫu thiệp",
      subscriptions: "Gói đăng ký",
      moderation: "Kiểm duyệt",
      support: "Hỗ trợ",
      analytics: "Phân tích",
      settings: "Cài đặt",
      dashboardTitle: "Bảng điều khiển quản trị",
      dashboardSub: "Sức khỏe hệ thống, doanh thu thuê bao, vận hành đám cưới và hiệu suất.",
      executiveTitle: "Bảng điều khiển quản trị",
      executiveSub: "Sức khỏe hệ thống, doanh thu thuê bao, vận hành đám cưới và hiệu suất.",
      usersTitle: "Quản lý tài khoản người dùng",
      usersSub: "Kiểm tra 12.482 tài khoản gồm Cặp đôi, Lễ tân và Quản trị viên.",
      weddingsTitle: "Danh mục đám cưới",
      weddingsSub: "Giám sát 2.341 đám cưới đang hoạt động, cấu hình thiệp và tỷ lệ RSVP.",
      templatesTitle: "Thư viện mẫu & Studio phát hành",
      templatesSub: "Quản lý các mẫu thiết kế, tần suất sử dụng và xuất bản mẫu mới.",
      subscriptionsTitle: "Quản lý gói đăng ký & Giá",
      subscriptionsSub: "Theo dõi tỷ lệ chuyển đổi, tỷ lệ hủy gói và cơ cấu doanh thu.",
      moderationTitle: "Kiểm duyệt nội dung",
      moderationSub: "Duyệt các lời chúc bị báo cáo, từ ngữ vi phạm và tin nhắn rác.",
      supportTitle: "Quản lý yêu cầu hỗ trợ",
      supportSub: "Xử lý thắc mắc người dùng, lỗi nhập danh sách và tên miền riêng.",
      analyticsTitle: "Phân tích dữ liệu nền tảng",
      analyticsSub: "Dữ liệu tương tác thực tế, phễu chuyển đổi RSVP và độ phổ biến thiết kế.",
      settingsTitle: "Cài đặt hệ thống Admin",
      settingsSub: "Cấu hình tham số toàn cục, phân quyền và dữ liệu thử nghiệm.",
      telemetryBadge: "Dữ liệu đa khách hàng",
      operationalStatus: "Hệ thống hoạt động bình thường",
      totalUsers: "Tổng người dùng",
      totalPlatformUsers: "Tổng người dùng",
      activeWeddings: "Đám cưới đang hoạt động",
      guestRSVPs: "Lượt phản hồi RSVP",
      guestRsvpsProcessed: "Lượt phản hồi RSVP",
      monthlyRevenue: "Doanh thu hàng tháng (MRR)",
      revenueVelocity: "Tốc độ tăng trưởng doanh thu",
      tierDistribution: "Cơ cấu gói đăng ký",
      recentWeddingsTelemetry: "Dữ liệu tiệc cưới thời gian thực",
      mrrVelocity: "Tốc độ tăng trưởng doanh thu",
      planMix: "Cơ cấu gói đăng ký",
      allWeddingsBtn: "Xem tất cả đám cưới",
      allUsersBtn: "Xem tất cả người dùng",
      jumpCoupleSuite: "Không gian Cặp đôi",
      jumpReceptionApp: "Ứng dụng Lễ tân",
      suspendUser: "Khóa tài khoản",
      activateUser: "Kích hoạt tài khoản",
      publishCatalog: "Phát hành mẫu",
      unpublishCatalog: "Ngừng phát hành",
      approveContent: "Phê duyệt",
      hideContent: "Ẩn nội dung",
      removeContent: "Xóa vĩnh viễn",
      openTicketsCount: "Yêu cầu mở",
      inProgressCount: "Đang xử lý",
      resolvedCount: "Đã giải quyết",
      resetDemoDataBtn: "Khôi phục dữ liệu mẫu chuẩn (Demo)",
    },
    toast: {
      guestAdded: "Đã thêm khách thành công",
      guestUpdated: "Đã cập nhật thông tin khách",
      guestRemoved: "Đã xóa khách khỏi danh sách",
      checkInSuccess: "Khách đã check-in thành công",
      tableAssigned: "Đã xếp bàn thành công",
      seatingOptimized: "Đã tối ưu sơ đồ bàn bằng AI",
      walkInAdded: "Đã đăng ký khách vãng lai",
      giftRecorded: "Đã ghi nhận quà mừng vào sổ",
      wishPosted: "Đã gửi lời chúc phúc thành công",
      invitationApplied: "Đã áp dụng nội dung vào thiệp",
      thankYouGenerated: "Đã tạo lời cảm ơn bằng AI",
      thankYouSent: "Đã gửi lời cảm ơn thành công",
      settingsSaved: "Đã lưu cài đặt thành công",
      dataReset: "Đã khôi phục dữ liệu mẫu ban đầu",
      copiedClipboard: "Đã sao chép vào bộ nhớ tạm",
      accountCopied: "Đã sao chép số tài khoản Vietcombank",
      rsvpReceived: "Có phản hồi RSVP mới",
    },
    validation: {
      required: "Trường này là bắt buộc.",
      invalidEmail: "Vui lòng nhập địa chỉ email hợp lệ.",
      passwordLength: "Mật khẩu phải có ít nhất 8 ký tự.",
    },
  },
};
