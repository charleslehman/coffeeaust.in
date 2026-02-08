import { eastAustinShops } from './east-austin';
import { northCentralShops } from './north-central';
import { southAustinShops } from './south-austin';
import { downtownWestShops } from './downtown-west';

export type { CoffeeShop, ScoredShop, Coordinates, TravelMode, AppStep, Recommendation } from '../types';

export const allShops = [
  ...eastAustinShops,
  ...northCentralShops,
  ...southAustinShops,
  ...downtownWestShops,
];
