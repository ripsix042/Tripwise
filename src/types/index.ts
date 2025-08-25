// Core types for Tripwise app

export interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  averageCost: number;
  rating: number;
  tags: string[];
  visaRequired: boolean;
  bestTimeToVisit: string;
}

export interface TripCost {
  flights: number;
  accommodation: number;
  food: number;
  activities: number;
  transport: number;
  insurance: number;
  visa: number;
  total: number;
}

export interface Trip {
  id: string;
  destination: Destination;
  budget: number;
  startDate: string;
  endDate: string;
  travelers: number;
  costs: TripCost;
  status: 'planning' | 'booked' | 'completed';
  createdAt: string;
}

export interface GroupTrip extends Trip {
  members: TripMember[];
  expenses: Expense[];
}

export interface TripMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  amountPaid: number;
  amountOwed: number;
  status: 'pending' | 'confirmed' | 'declined';
}

export interface Expense {
  id: string;
  title: string;
  description: string;
  amount: number;
  paidBy: string;
  splitBetween: string[];
  category: 'flight' | 'hotel' | 'food' | 'activity' | 'transport' | 'other';
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: UserPreferences;
  loyaltyPoints: number;
}

export interface UserPreferences {
  budget: {
    min: number;
    max: number;
  };
  travelStyle: 'budget' | 'mid-range' | 'luxury';
  interests: string[];
  accommodationType: 'hostel' | 'hotel' | 'apartment' | 'resort';
  transportPreference: 'flight' | 'train' | 'bus' | 'car';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  discount: number;
  type: 'percentage' | 'fixed';
  category: 'flight' | 'hotel' | 'activity' | 'general';
  expiryDate: string;
  pointsRequired: number;
}

export interface EmergencyContact {
  id: string;
  type: 'hospital' | 'embassy' | 'police' | 'fire';
  name: string;
  phone: string;
  address: string;
  distance: number;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

export type RootStackParamList = {
  Onboarding: undefined;
  MainTabs: undefined;
  DestinationResults: { budget: number; preferences: UserPreferences };
  TripCostBreakdown: { destination: Destination; budget: number };
  GroupTripPlanner: { trip?: Trip };
  EmergencySupport: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Discover: undefined;
  History: undefined;
  Rewards: undefined;
  Settings: undefined;
};