export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CoffeeShop {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinates;
  rating: number;          // 1-5 scale
  reviewCount: number;     // Total number of reviews
  specialty: string[];     // What they're known for (drinks, food, etc.)
  notes: string;           // Additional context, awards, etc.
  neighborhood: string;
  active: boolean;         // For soft-delete / temporary closures
}

export interface CoffeeShopDatabase {
  city: string;
  state: string;
  lastUpdated: string;     // ISO date string
  shops: CoffeeShop[];
}

// Scoring algorithm types
export interface ScoredShop extends CoffeeShop {
  qualityScore: number;    // rating * (reviewCount / (reviewCount + 100))
  distanceKm: number;      // Haversine distance from user
  travelTimeMinutes: number;
  combinedScore: number;   // 70% quality + 30% proximity
}

export type TravelMode = 'walk' | 'drive';

export interface RecommendationRequest {
  userLocation: Coordinates;
  usualOrder: string;
  travelMode: TravelMode;
}

export interface RecommendationResponse {
  shop: ScoredShop;
  reasoning: string;
  navigationUrl: string;  // Google Maps link
}
