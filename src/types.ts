export interface EmployeeRegistration {
  id: string;
  employeeName: string;
  employeeId: string;
  email: string;
  department: string;
  officeLocation: 'Kuala Lumpur HQ' | 'Penang Branch' | 'Johor Bahru Office' | 'Singapore Regional';
  attendanceType: 'in-person' | 'virtual';
  dietaryPreference: 'halal' | 'vegetarian' | 'vegan' | 'no-beef' | 'regular';
  dietaryNotes?: string;
  shirtSize: 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';
  activities: string[];
  plusOne: boolean;
  plusOneName?: string;
  registrationDate: string;
  ticketNumber: string;
  tableNumber?: string;
  attendanceStatus?: 'Confirmed' | 'Checked-In';
  confirmedAt?: string;
}

export interface AgendaItem {
  id: string;
  time: string;
  title: string;
  titleMs?: string;
  description: string;
  category: 'ceremony' | 'cultural' | 'food' | 'games' | 'entertainment';
  speakerOrLead?: string;
  highlight?: boolean;
}

export interface MerdekaWish {
  id: string;
  name: string;
  department: string;
  message: string;
  sticker: string;
  timestamp: string;
  likes: number;
}

export interface ActivityContest {
  id: string;
  title: string;
  subtitle: string;
  prizePool: string;
  description: string;
  rules: string[];
  badge: string;
  iconName: string;
}
