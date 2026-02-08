import type { CoffeeShop, Coordinates, TravelMode, ScoredShop, Recommendation } from '@/data/types';
import { scoreShops, getNavigationUrl } from '@/utils/scoring';
import { allShops } from '@/data/shops';

function matchesOrder(shop: CoffeeShop, order: string): boolean {
  const lowerOrder = order.toLowerCase();
  return shop.specialty.some(s => {
    const lowerSpecialty = s.toLowerCase();
    const orderWords = lowerOrder.split(/\s+/).filter(w => w.length > 2);
    return orderWords.some(word => lowerSpecialty.includes(word));
  });
}

function generateReasoning(shop: ScoredShop, order: string, mode: TravelMode): string {
  const parts: string[] = [];

  const distance = shop.distanceKm < 1
    ? `${Math.round(shop.distanceKm * 1000)}m`
    : `${shop.distanceKm.toFixed(1)}km`;
  const time = Math.round(shop.travelTimeMinutes);

  parts.push(`${distance} away, about ${time} min ${mode === 'walk' ? 'on foot' : 'by car'}.`);

  if (shop.rating >= 4.8) {
    parts.push(`Rated ${shop.rating} with ${shop.reviewCount} reviews.`);
  }

  if (matchesOrder(shop, order)) {
    parts.push(`Known for ${shop.specialty.slice(0, 2).join(' and ').toLowerCase()}.`);
  } else {
    parts.push(`Try their ${shop.specialty[0].toLowerCase()}.`);
  }

  if (shop.notes) {
    const firstNote = shop.notes.split('. ')[0];
    parts.push(firstNote + '.');
  }

  return parts.join(' ');
}

export function getRecommendation(
  userLocation: Coordinates,
  usualOrder: string,
  travelMode: TravelMode,
): Recommendation | null {
  const scored = scoreShops(allShops, userLocation, travelMode);

  if (scored.length === 0) return null;

  const boosted = scored.map(shop => ({
    ...shop,
    combinedScore: shop.combinedScore + (matchesOrder(shop, usualOrder) ? 0.15 : 0),
  }));
  boosted.sort((a, b) => b.combinedScore - a.combinedScore);

  const best = boosted[0];

  return {
    shop: best,
    reasoning: generateReasoning(best, usualOrder, travelMode),
    navigationUrl: getNavigationUrl(best, travelMode),
  };
}
