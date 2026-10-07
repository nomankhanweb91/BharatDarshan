import { Destination } from '../../types';
import { spiritualDestinations } from './spiritual';
import { leisureDestinations } from './leisure';

export const allDestinations: Destination[] = [
  ...spiritualDestinations,
  ...leisureDestinations,
];

export const getDestinationBySlug = (slug: string): Destination | undefined => {
  return allDestinations.find((d) => d.slug === slug);
};

export const getTrendingDestinations = (): Destination[] => {
  return allDestinations.filter((d) => d.isTrending);
};

export const getTop10Destinations = (): Destination[] => {
  return allDestinations
    .filter((d) => typeof d.top10Rank === 'number')
    .sort((a, b) => (a.top10Rank ?? 99) - (b.top10Rank ?? 99));
};

export const getDestinationsByCategory = (categorySlug: string): Destination[] => {
  if (categorySlug === 'religious-tours') {
    return allDestinations.filter((d) => d.category === 'Religious & Spiritual');
  }
  return allDestinations.filter(
    (d) =>
      d.category.toLowerCase().replace(/[^a-z0-9]/g, '-') === categorySlug ||
      d.subCategory?.toLowerCase().replace(/[^a-z0-9]/g, '-') === categorySlug
  );
};

export const getDestinationsByState = (stateSlug: string): Destination[] => {
  return allDestinations.filter(
    (d) => d.state.toLowerCase().replace(/[^a-z0-9]/g, '-') === stateSlug
  );
};
