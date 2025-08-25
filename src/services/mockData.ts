// Mock data for Tripwise app

import { Destination, Trip, Reward, EmergencyContact, User } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Tropical paradise with beautiful beaches, temples, and rice terraces.',
    imageUrl: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400',
    averageCost: 800,
    rating: 4.8,
    tags: ['Beach', 'Culture', 'Nature', 'Relaxation'],
    visaRequired: false,
    bestTimeToVisit: 'April - October',
  },
  {
    id: '2',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Modern metropolis blending traditional culture with cutting-edge technology.',
    imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    averageCost: 1500,
    rating: 4.9,
    tags: ['City', 'Culture', 'Food', 'Technology'],
    visaRequired: true,
    bestTimeToVisit: 'March - May, September - November',
  },
  {
    id: '3',
    name: 'Santorini',
    country: 'Greece',
    description: 'Stunning Greek island with white-washed buildings and breathtaking sunsets.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400',
    averageCost: 1200,
    rating: 4.7,
    tags: ['Beach', 'Romance', 'History', 'Relaxation'],
    visaRequired: false,
    bestTimeToVisit: 'April - October',
  },
  {
    id: '4',
    name: 'Machu Picchu',
    country: 'Peru',
    description: 'Ancient Incan citadel set high in the Andes Mountains.',
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400',
    averageCost: 900,
    rating: 4.9,
    tags: ['Adventure', 'History', 'Nature', 'Culture'],
    visaRequired: false,
    bestTimeToVisit: 'May - September',
  },
  {
    id: '5',
    name: 'Dubai',
    country: 'UAE',
    description: 'Luxury destination with modern architecture, shopping, and desert adventures.',
    imageUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400',
    averageCost: 2000,
    rating: 4.6,
    tags: ['Luxury', 'Shopping', 'City', 'Adventure'],
    visaRequired: true,
    bestTimeToVisit: 'November - March',
  },
  {
    id: '6',
    name: 'Iceland',
    country: 'Iceland',
    description: 'Land of fire and ice with glaciers, geysers, and northern lights.',
    imageUrl: 'https://images.unsplash.com/photo-1539066834-3fa5463eeaaa?w=400',
    averageCost: 1800,
    rating: 4.8,
    tags: ['Nature', 'Adventure', 'Photography', 'Wildlife'],
    visaRequired: false,
    bestTimeToVisit: 'June - August, September - March (Northern Lights)',
  },
];

export const mockTrips: Trip[] = [
  {
    id: '1',
    destination: mockDestinations[0],
    budget: 1000,
    startDate: '2024-06-15',
    endDate: '2024-06-22',
    travelers: 2,
    costs: {
      flights: 400,
      accommodation: 280,
      food: 200,
      activities: 150,
      transport: 80,
      insurance: 40,
      visa: 0,
      total: 1150,
    },
    status: 'completed',
    createdAt: '2024-05-01',
  },
  {
    id: '2',
    destination: mockDestinations[1],
    budget: 2000,
    startDate: '2024-09-10',
    endDate: '2024-09-17',
    travelers: 1,
    costs: {
      flights: 800,
      accommodation: 600,
      food: 350,
      activities: 200,
      transport: 100,
      insurance: 50,
      visa: 30,
      total: 2130,
    },
    status: 'planning',
    createdAt: '2024-07-15',
  },
];

export const mockRewards: Reward[] = [
  {
    id: '1',
    title: '20% Off Hotels',
    description: 'Get 20% discount on hotel bookings worldwide',
    discount: 20,
    type: 'percentage',
    category: 'hotel',
    expiryDate: '2024-12-31',
    pointsRequired: 500,
  },
  {
    id: '2',
    title: '$100 Flight Credit',
    description: 'Save $100 on your next flight booking',
    discount: 100,
    type: 'fixed',
    category: 'flight',
    expiryDate: '2024-11-30',
    pointsRequired: 1000,
  },
  {
    id: '3',
    title: 'Free Activity Pass',
    description: 'Get one free activity booking in any destination',
    discount: 50,
    type: 'fixed',
    category: 'activity',
    expiryDate: '2024-10-31',
    pointsRequired: 750,
  },
];

export const mockEmergencyContacts: EmergencyContact[] = [
  {
    id: '1',
    type: 'hospital',
    name: 'General Hospital',
    phone: '+1-555-0123',
    address: '123 Medical Center Dr',
    distance: 2.5,
  },
  {
    id: '2',
    type: 'embassy',
    name: 'US Embassy',
    phone: '+1-555-0456',
    address: '456 Embassy Row',
    distance: 5.2,
  },
  {
    id: '3',
    type: 'police',
    name: 'Local Police Station',
    phone: '+1-555-0789',
    address: '789 Safety St',
    distance: 1.8,
  },
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  preferences: {
    budget: {
      min: 500,
      max: 2000,
    },
    travelStyle: 'mid-range',
    interests: ['Culture', 'Food', 'Nature', 'Adventure'],
    accommodationType: 'hotel',
    transportPreference: 'flight',
  },
  loyaltyPoints: 1250,
};

// Helper functions for mock API calls
export const getDestinationsByBudget = (budget: number): Promise<Destination[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = mockDestinations.filter(dest => dest.averageCost <= budget * 1.2);
      resolve(filtered);
    }, 1000);
  });
};

export const calculateTripCost = (destinationId: string, days: number, travelers: number): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const destination = mockDestinations.find(d => d.id === destinationId);
      if (!destination) return resolve(null);
      
      const baseCost = destination.averageCost;
      const costs = {
        flights: Math.round(baseCost * 0.4 * travelers),
        accommodation: Math.round(baseCost * 0.3 * days),
        food: Math.round(baseCost * 0.2 * days * travelers),
        activities: Math.round(baseCost * 0.15 * days),
        transport: Math.round(baseCost * 0.1 * days),
        insurance: Math.round(baseCost * 0.05 * travelers),
        visa: destination.visaRequired ? 30 * travelers : 0,
        total: 0,
      };
      
      costs.total = costs.flights + costs.accommodation + costs.food + costs.activities + costs.transport + costs.insurance + costs.visa;
      
      resolve(costs);
    }, 800);
  });
};