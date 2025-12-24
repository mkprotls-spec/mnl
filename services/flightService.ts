
import { Flight, SearchParams, SortOption } from '../types';
import { AIRLINES, CITIES } from '../constants';

/**
 * Advanced Flight Logic Service
 * Simulates high-performance airline aggregation and virtual interlining
 */
export const searchFlights = async (params: SearchParams): Promise<Flight[]> => {
  // Simulate network latency for that "searching 1000 sources" feel
  await new Promise(resolve => setTimeout(resolve, 1500));

  const results: Flight[] = [];
  const baseCount = 15;

  for (let i = 0; i < baseCount; i++) {
    const isInterlined = Math.random() > 0.7;
    const airlineIdx = Math.floor(Math.random() * AIRLINES.length);
    const duration = Math.floor(Math.random() * 600) + 60; // 1h to 11h
    const basePrice = params.mode === 'Luxury' ? 800 + Math.random() * 2000 : 50 + Math.random() * 400;
    
    // Virtual Interlining Logic: If interlined, we combine two flights, typically saving money but increasing risk/complexity
    const price = isInterlined ? basePrice * 0.6 : basePrice;
    const stops = isInterlined ? Math.floor(Math.random() * 2) + 1 : 0;

    // Calculate Happiness Score: Ratio of (1/Price) * (1/Duration) * (1/Stops)
    // We normalize this to a 0-10 scale
    const priceWeight = 0.5;
    const durationWeight = 0.3;
    const stopsWeight = 0.2;
    
    const normalizedPrice = Math.max(0.1, 1 - (price / 3000));
    const normalizedDuration = Math.max(0.1, 1 - (duration / 720));
    const normalizedStops = 1 - (stops / 3);
    
    const score = (normalizedPrice * priceWeight + normalizedDuration * durationWeight + normalizedStops * stopsWeight) * 10;

    results.push({
      id: `FL-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      airline: isInterlined ? 'Combo: Interlining' : AIRLINES[airlineIdx].name,
      airlineLogo: AIRLINES[airlineIdx].logo,
      origin: params.origin,
      destination: params.destination,
      departureTime: new Date(new Date(params.departureDate).getTime() + (Math.random() * 24 * 3600 * 1000)).toISOString(),
      arrivalTime: new Date().toISOString(), // Mocking
      duration,
      price: Math.floor(price),
      stops,
      isVirtualInterlining: isInterlined,
      type: params.mode === 'Luxury' ? 'Business' : 'Economy',
      happinessScore: parseFloat(score.toFixed(1)),
      connections: isInterlined ? ['Multi-Carrier System'] : undefined
    });
  }

  return results;
};

export const sortFlights = (flights: Flight[], option: SortOption): Flight[] => {
  switch (option) {
    case SortOption.CHEAPEST:
      return [...flights].sort((a, b) => a.price - b.price);
    case SortOption.FASTEST:
      return [...flights].sort((a, b) => a.duration - b.duration);
    case SortOption.HAPPINESS:
      return [...flights].sort((a, b) => b.happinessScore - a.happinessScore);
    default:
      return flights;
  }
};
