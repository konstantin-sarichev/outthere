// Common interests for the platform
export const INTERESTS = [
  'coffee',
  'fitness',
  'running',
  'hiking',
  'cycling',
  'yoga',
  'meditation',
  'books',
  'reading',
  'writing',
  'art',
  'photography',
  'music',
  'concerts',
  'theater',
  'movies',
  'gaming',
  'board games',
  'video games',
  'cooking',
  'food',
  'wine',
  'beer',
  'cocktails',
  'tech',
  'startups',
  'entrepreneurship',
  'networking',
  'volunteering',
  'environment',
  'sustainability',
  'travel',
  'languages',
  'learning',
  'dancing',
  'sports',
  'basketball',
  'soccer',
  'tennis',
  'swimming',
  'rock climbing',
  'outdoors',
  'nature',
  'gardening',
  'pets',
  'dogs',
  'cats',
  'fashion',
  'design',
  'architecture',
  'history',
  'science',
  'philosophy',
  'spirituality',
  'mindfulness'
]

// NYC Neighborhoods for demo
export const NYC_NEIGHBORHOODS = [
  'Williamsburg',
  'Park Slope',
  'DUMBO',
  'Brooklyn Heights',
  'Prospect Heights',
  'Fort Greene',
  'Cobble Hill',
  'Carroll Gardens',
  'Red Hook',
  'Greenpoint',
  'Bushwick',
  'Bedford-Stuyvesant',
  'Crown Heights',
  'Sunset Park',
  'Bay Ridge',
  'Lower East Side',
  'East Village',
  'West Village',
  'Greenwich Village',
  'SoHo',
  'Tribeca',
  'Chelsea',
  'Hell\'s Kitchen',
  'Midtown',
  'Upper East Side',
  'Upper West Side',
  'Harlem',
  'Washington Heights',
  'Inwood',
  'Long Island City',
  'Astoria',
  'Sunnyside',
  'Jackson Heights'
]

// Event categories
export const EVENT_CATEGORIES = [
  'Social',
  'Fitness',
  'Outdoors',
  'Food & Drink',
  'Arts & Culture',
  'Learning',
  'Professional',
  'Games',
  'Music',
  'Sports',
  'Travel',
  'Volunteer'
]

// Group size options
export const GROUP_SIZES = [
  { value: 'small', label: 'Small (2-4 people)', min: 2, max: 4 },
  { value: 'medium', label: 'Medium (5-8 people)', min: 5, max: 8 },
  { value: 'large', label: 'Large (9+ people)', min: 9, max: 20 }
]

// Activity levels
export const ACTIVITY_LEVELS = [
  { value: 'low', label: 'Low-key (coffee, reading, casual conversation)' },
  { value: 'moderate', label: 'Moderate (walks, board games, workshops)' },
  { value: 'active', label: 'Active (sports, hiking, dancing)' },
  { value: 'mixed', label: 'Mixed (variety of activity levels)' }
]

// Noise levels for venues
export const NOISE_LEVELS = [
  { value: 1, label: 'Quiet (library-like)' },
  { value: 2, label: 'Low (coffee shop)' },
  { value: 3, label: 'Moderate (restaurant)' },
  { value: 4, label: 'Lively (bar atmosphere)' },
  { value: 5, label: 'Loud (club/concert)' }
]

// Price tiers
export const PRICE_TIERS = [
  { value: 1, label: '$', description: 'Free or very low cost' },
  { value: 2, label: '$$', description: 'Affordable ($5-15)' },
  { value: 3, label: '$$$', description: 'Moderate ($15-30)' },
  { value: 4, label: '$$$$', description: 'Premium ($30+)' }
]

// Time slots for availability (24-hour format)
export const TIME_SLOTS = Array.from({ length: 24 }, (_, i) => ({
  value: i,
  label: i === 0 ? '12am' : i < 12 ? `${i}am` : i === 12 ? '12pm' : `${i - 12}pm`,
  minutes: i * 60
}))

// Days of the week
export const WEEKDAYS = [
  { value: 0, label: 'Sunday', short: 'Sun' },
  { value: 1, label: 'Monday', short: 'Mon' },
  { value: 2, label: 'Tuesday', short: 'Tue' },
  { value: 3, label: 'Wednesday', short: 'Wed' },
  { value: 4, label: 'Thursday', short: 'Thu' },
  { value: 5, label: 'Friday', short: 'Fri' },
  { value: 6, label: 'Saturday', short: 'Sat' }
]

// Age ranges
export const AGE_RANGES = [
  '18-24',
  '25-29',
  '30-34',
  '35-39',
  '40-44',
  '45-49',
  '50-54',
  '55-59',
  '60+'
]

// Travel radius options
export const TRAVEL_RADIUS = [
  { value: 5, label: '5 km (walking distance)' },
  { value: 10, label: '10 km (short bike/transit)' },
  { value: 15, label: '15 km (moderate travel)' },
  { value: 25, label: '25 km (longer travel)' },
  { value: 50, label: '50 km (city-wide)' }
] 