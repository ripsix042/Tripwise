// App constants and theme

export const COLORS = {
  primary: '#007AFF',
  secondary: '#5856D6',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
  
  // Background
  background: '#F8F9FA',
  surface: '#FFFFFF',
  border: '#E5E7EB',
  shadow: '#000000',
  
  // Text
  text: {
    primary: '#1A1A1A',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const TYPOGRAPHY = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  weights: {
    light: '300' as const,
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
};

export const BORDER_RADIUS = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const FONT_WEIGHTS = {
  normal: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const TRAVEL_CATEGORIES = [
  'Adventure',
  'Beach',
  'City',
  'Culture',
  'Food',
  'History',
  'Nature',
  'Nightlife',
  'Relaxation',
  'Shopping',
  'Sports',
  'Wildlife',
];

export const BUDGET_RANGES = [
  { label: 'Budget', min: 0, max: 1000, color: '#34C759' },
  { label: 'Mid-range', min: 1000, max: 3000, color: '#FF9500' },
  { label: 'Luxury', min: 3000, max: 10000, color: '#FF3B30' },
];

export const ACCOMMODATION_TYPES = [
  'Hostel',
  'Hotel',
  'Apartment',
  'Resort',
  'Guesthouse',
  'Villa',
];

export const TRANSPORT_TYPES = [
  'Flight',
  'Train',
  'Bus',
  'Car Rental',
  'Taxi/Uber',
  'Walking',
];