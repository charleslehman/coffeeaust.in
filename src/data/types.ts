export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  rating: number;
  reviewCount: number;
  specialty: string[];
  notes: string;
  neighborhood: string;
  active: boolean;
}

export interface ScoredShop extends CoffeeShop {
  qualityScore: number;
  distanceKm: number;
  travelTimeMinutes: number;
  combinedScore: number;
}

export type TravelMode = 'walk' | 'drive';

export type AppStep = 'location' | 'order' | 'mode' | 'result';

export interface Recommendation {
  shop: ScoredShop;
  reasoning: string;
  navigationUrl: string;
}
