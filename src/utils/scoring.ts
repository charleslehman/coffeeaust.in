import type { CoffeeShop, Coordinates, ScoredShop, TravelMode } from '../types/coffee-shop';

// Haversine formula to calculate distance between two coordinates
export function haversineDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Estimate travel time based on distance and mode
// Walking: ~5 km/h average
// Driving: ~25 km/h average (accounting for Austin traffic, parking, etc.)
export function estimateTravelTime(distanceKm: number, mode: TravelMode): number {
  const speedKmh = mode === 'walk' ? 5 : 25;
  return (distanceKm / speedKmh) * 60; // Convert to minutes
}

// Quality score: rating weighted by review volume
// Higher review count = more confidence in the rating
export function calculateQualityScore(rating: number, reviewCount: number): number {
  return rating * (reviewCount / (reviewCount + 100));
}

// Combined score: 70% quality, 30% time proximity
// Time proximity is inverted (closer = better score)
export function calculateCombinedScore(
  qualityScore: number,
  travelTimeMinutes: number,
  maxTravelTime: number
): number {
  // Normalize quality score to 0-1 range (max quality score is ~5)
  const normalizedQuality = qualityScore / 5;

  // Proximity score: 1 when at location, 0 when at max travel time
  const proximityScore = Math.max(0, 1 - (travelTimeMinutes / maxTravelTime));

  return (0.7 * normalizedQuality) + (0.3 * proximityScore);
}

// Get max travel time based on mode
export function getMaxTravelTime(mode: TravelMode): number {
  return mode === 'walk' ? 20 : 15; // 20 min walk, 15 min drive
}

// Score and rank all shops for a user
export function scoreShops(
  shops: CoffeeShop[],
  userLocation: Coordinates,
  travelMode: TravelMode
): ScoredShop[] {
  const maxTravelTime = getMaxTravelTime(travelMode);

  return shops
    .filter(shop => shop.active)
    .map(shop => {
      const distanceKm = haversineDistance(userLocation, shop.coordinates);
      const travelTimeMinutes = estimateTravelTime(distanceKm, travelMode);
      const qualityScore = calculateQualityScore(shop.rating, shop.reviewCount);
      const combinedScore = calculateCombinedScore(qualityScore, travelTimeMinutes, maxTravelTime);

      return {
        ...shop,
        qualityScore,
        distanceKm,
        travelTimeMinutes,
        combinedScore,
      };
    })
    .filter(shop => shop.travelTimeMinutes <= maxTravelTime)
    .sort((a, b) => b.combinedScore - a.combinedScore);
}

// Generate Google Maps navigation URL
export function getNavigationUrl(shop: CoffeeShop, mode: TravelMode): string {
  const { lat, lng } = shop.coordinates;
  const travelMode = mode === 'walk' ? 'walking' : 'driving';
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=${travelMode}`;
}
