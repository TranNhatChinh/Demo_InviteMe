export type RSVPStatus = 'Attending' | 'Declined' | 'Unresponded';

export type GuestGroup = 'Family' | 'Coworkers' | 'Bridal Party' | 'College Friends' | 'VIP';

export type DietaryRestriction = 
  | 'None'
  | 'Vegan'
  | 'Vegetarian'
  | 'Gluten-Free'
  | 'Halal'
  | 'Kosher'
  | 'Nut Allergy'
  | 'Dairy-Free';

export interface WeddingGuest {
  id: string;
  name: string;
  group: GuestGroup;
  dietary: DietaryRestriction;
  rsvp: RSVPStatus;
  tableId: string | null;
  seatNumber?: number | null;
  email?: string;
  phone?: string;
  notes?: string;
}

export type TableShape = 'round' | 'rectangular' | 'head';

export interface TableItem {
  id: string;
  name: string;
  tableNumber: string;
  shape: TableShape;
  capacity: number;
  x: number;
  y: number;
}

export interface FloorDecorItem {
  id: string;
  type: 'dance-floor' | 'stage' | 'bar' | 'entrance';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}
