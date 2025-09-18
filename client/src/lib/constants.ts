export const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '♈', element: 'fire', quality: 'cardinal' },
  { name: 'Taurus', symbol: '♉', element: 'earth', quality: 'fixed' },
  { name: 'Gemini', symbol: '♊', element: 'air', quality: 'mutable' },
  { name: 'Cancer', symbol: '♋', element: 'water', quality: 'cardinal' },
  { name: 'Leo', symbol: '♌', element: 'fire', quality: 'fixed' },
  { name: 'Virgo', symbol: '♍', element: 'earth', quality: 'mutable' },
  { name: 'Libra', symbol: '♎', element: 'air', quality: 'cardinal' },
  { name: 'Scorpio', symbol: '♏', element: 'water', quality: 'fixed' },
  { name: 'Sagittarius', symbol: '♐', element: 'fire', quality: 'mutable' },
  { name: 'Capricorn', symbol: '♑', element: 'earth', quality: 'cardinal' },
  { name: 'Aquarius', symbol: '♒', element: 'air', quality: 'fixed' },
  { name: 'Pisces', symbol: '♓', element: 'water', quality: 'mutable' }
];

export const PLANET_SYMBOLS = {
  'Sun': '☉',
  'Moon': '☽',
  'Mercury': '☿',
  'Venus': '♀',
  'Mars': '♂',
  'Jupiter': '♃',
  'Saturn': '♄',
  'Uranus': '♅',
  'Neptune': '♆',
  'Pluto': '♇',
  'North Node': '☊',
  'South Node': '☋',
  'Chiron': '⚷',
  'Ceres': '⚳',
  'Pallas': '⚴',
  'Juno': '⚵',
  'Vesta': '⚶'
};

export const ASPECT_ANGLES = {
  'conjunction': 0,
  'semisextile': 30,
  'semisquare': 45,
  'sextile': 60,
  'square': 90,
  'trine': 120,
  'sesquiquadrate': 135,
  'quincunx': 150,
  'opposition': 180
};

export const DEFAULT_ORBS = {
  'conjunction': 8,
  'opposition': 8,
  'trine': 8,
  'square': 8,
  'sextile': 6,
  'quincunx': 3,
  'semisextile': 3,
  'semisquare': 3,
  'sesquiquadrate': 3
};

export const ASPECT_COLORS = {
  'conjunction': '#ff0000',
  'opposition': '#ff0000',
  'trine': '#0000ff',
  'square': '#ff0000',
  'sextile': '#00ff00',
  'quincunx': '#808080',
  'semisextile': '#808080',
  'semisquare': '#ff8000',
  'sesquiquadrate': '#ff8000'
};