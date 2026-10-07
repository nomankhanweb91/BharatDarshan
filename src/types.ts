export interface Destination {
  id: string;
  slug: string;
  name: string;
  state: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  gallery: string[];
  category: string;
  subCategory?: 
    | 'Hindu Temples'
    | 'Mosques & Islamic Heritage'
    | 'Churches & Christian Heritage'
    | 'Sikh Gurudwaras'
    | 'Buddhist Monasteries'
    | 'Jain Temples'
    | 'Historic Religious Monuments'
    | 'Mountain Tours'
    | 'Beach Holidays'
    | 'Heritage Tours'
    | 'Nature & Wildlife'
    | 'Honeymoon Tours'
    | 'Family Tours'
    | 'Adventure Tours';
  religionType?: 'Hindu' | 'Islamic' | 'Christian' | 'Sikh' | 'Buddhist' | 'Jain' | 'Cultural & Multi-Faith';
  bestTime: string;
  bestSeasonDetail: {
    peak: string;
    moderate: string;
    offSeason: string;
  };
  duration: string;
  startingBudget: number;
  budgetBreakdown: {
    hotelBudget: { min: number; max: number; note: string };
    transportBudget: { min: number; max: number; note: string };
    foodBudget: { min: number; max: number; note: string };
    activitiesBudget: { min: number; max: number; note: string };
  };
  railwayStations: Array<{
    name: string;
    distance: string;
    connectivity: string;
    travelTime?: string;
  }>;
  airports: Array<{
    name: string;
    distance: string;
    connectivity: string;
    transferOptions: string;
  }>;
  howToReach: {
    byAir: string;
    byTrain: string;
    byRoad: string;
    bySea?: string;
  };
  placesToVisit: Array<{
    name: string;
    description: string;
    timing?: string;
    entryFee?: string;
  }>;
  thingsToDo: string[];
  visitingGuidelines?: string[];
  officialTimings?: string;
  dressCodeAndEtiquette?: string;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  isTrending?: boolean;
  top10Rank?: number;
}

export interface TourPackage {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  destinationSlug: string;
  destinationName: string;
  state: string;
  duration: string;
  startingPrice: number;
  heroImage: string;
  gallery: string[];
  category: 'Budget' | 'Standard' | 'Premium' | 'Spiritual' | 'Family' | 'Honeymoon' | 'Adventure';
  hotelCategory: string;
  transport: string;
  destinationsCovered: string[];
  overview: string;
  itinerary: Array<{
    day: number;
    title: string;
    activities: string[];
  }>;
  inclusions: string[];
  exclusions: string[];
  bestTimeToVisit: string;
  importantNotes: string[];
  cancellationPolicy: string;
}

export interface StateInfo {
  id: string;
  slug: string;
  name: string;
  capital: string;
  description: string;
  image: string;
  topDestinations: string[]; // slugs
  bestTime: string;
  travelStyle: string[];
  knownFor: string[];
}

export interface TravelCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  count: number;
}

export interface TravelEnquiry {
  fullName: string;
  mobileNumber: string;
  email: string;
  destination: string;
  package?: string;
  journeyStartDate: string;
  journeyEndDate?: string;
  adults: number;
  children: number;
  infants: number;
  numberOfRooms: number;
  hotelPreference: string;
  budgetRange: string;
  transportPreference: string;
  specialRequirements?: string;
  message?: string;
}
