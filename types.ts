
export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: number; // in minutes
  price: number;
  stops: number;
  isVirtualInterlining: boolean;
  type: 'Economy' | 'Business' | 'First';
  happinessScore: number;
  connections?: string[];
}

export interface SearchParams {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  travelers: number;
  mode: 'Backpacker' | 'Luxury';
}

export enum SortOption {
  CHEAPEST = 'cheapest',
  FASTEST = 'fastest',
  HAPPINESS = 'happiness'
}

export interface UserProfile {
  name: string;
  avatar: string;
  miles: number;
  recentSearches: string[];
}
