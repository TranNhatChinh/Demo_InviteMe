import { WeddingGuest, TableItem, FloorDecorItem } from './types';

export const initialGuests: WeddingGuest[] = [
  {
    id: 'guest-1',
    name: 'Eleanor Vance',
    group: 'Family',
    dietary: 'Vegan',
    rsvp: 'Attending',
    tableId: 'tbl-1',
    seatNumber: 1,
    email: 'eleanor.vance@example.com',
    phone: '+1 (555) 234-5678',
    notes: 'Sister of the Bride'
  },
  {
    id: 'guest-2',
    name: 'Julian Hayes',
    group: 'Family',
    dietary: 'None',
    rsvp: 'Attending',
    tableId: 'tbl-1',
    seatNumber: 2,
    email: 'julian.h@example.com',
    phone: '+1 (555) 345-6789',
    notes: 'Brother of the Groom'
  },
  {
    id: 'guest-3',
    name: 'Sophia Sterling',
    group: 'Bridal Party',
    dietary: 'Gluten-Free',
    rsvp: 'Attending',
    tableId: null,
    seatNumber: null,
    email: 'sophia.s@example.com',
    phone: '+1 (555) 456-7890',
    notes: 'Maid of Honor'
  },
  {
    id: 'guest-4',
    name: 'Marcus Bennett',
    group: 'Coworkers',
    dietary: 'None',
    rsvp: 'Attending',
    tableId: null,
    seatNumber: null,
    email: 'marcus.b@example.com',
    phone: '+1 (555) 567-8901',
    notes: 'Senior Product Lead'
  },
  {
    id: 'guest-5',
    name: 'Liam Chen',
    group: 'Coworkers',
    dietary: 'Halal',
    rsvp: 'Attending',
    tableId: 'tbl-2',
    seatNumber: 1,
    email: 'liam.chen@example.com',
    phone: '+1 (555) 678-9012',
    notes: 'Creative Director'
  },
  {
    id: 'guest-6',
    name: 'Amara Okafor',
    group: 'College Friends',
    dietary: 'Nut Allergy',
    rsvp: 'Unresponded',
    tableId: null,
    seatNumber: null,
    email: 'amara.o@example.com',
    phone: '+1 (555) 789-0123',
    notes: 'Oxford roommate'
  },
  {
    id: 'guest-7',
    name: 'Charlotte Dubois',
    group: 'Family',
    dietary: 'None',
    rsvp: 'Declined',
    tableId: null,
    seatNumber: null,
    email: 'charlotte.d@example.com',
    phone: '+1 (555) 890-1234',
    notes: 'Sending warmest regrets & gift'
  },
  {
    id: 'guest-8',
    name: 'Alexander Wright',
    group: 'Bridal Party',
    dietary: 'None',
    rsvp: 'Attending',
    tableId: null,
    seatNumber: null,
    email: 'alex.wright@example.com',
    phone: '+1 (555) 901-2345',
    notes: 'Best Man'
  },
  {
    id: 'guest-9',
    name: 'Emma Watson',
    group: 'VIP',
    dietary: 'Dairy-Free',
    rsvp: 'Attending',
    tableId: null,
    seatNumber: null,
    email: 'emma.w@example.com',
    phone: '+1 (555) 012-3456',
    notes: 'Godmother'
  },
  {
    id: 'guest-10',
    name: 'David Miller',
    group: 'College Friends',
    dietary: 'Vegetarian',
    rsvp: 'Unresponded',
    tableId: null,
    seatNumber: null,
    email: 'david.m@example.com',
    phone: '+1 (555) 123-7890',
    notes: 'Debate Club Captain'
  }
];

export const initialTables: TableItem[] = [
  {
    id: 'tbl-1',
    name: 'Rose Pavilion',
    tableNumber: 'Table 01',
    shape: 'round',
    capacity: 8,
    x: 180,
    y: 120
  },
  {
    id: 'tbl-2',
    name: 'Garden Terrace',
    tableNumber: 'Table 02',
    shape: 'round',
    capacity: 8,
    x: 520,
    y: 120
  },
  {
    id: 'tbl-3',
    name: 'The Newlyweds',
    tableNumber: 'Head Table',
    shape: 'head',
    capacity: 6,
    x: 350,
    y: 30
  }
];

export const initialDecor: FloorDecorItem[] = [
  {
    id: 'decor-1',
    type: 'dance-floor',
    name: 'Starlight Dance Floor',
    x: 310,
    y: 280,
    width: 220,
    height: 150
  }
];
