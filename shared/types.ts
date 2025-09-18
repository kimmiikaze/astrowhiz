// Shared types for astrological data
export interface BirthData {
  date: string; // ISO date string
  time: string; // HH:MM format
  latitude: number;
  longitude: number;
  timezone: string;
  name?: string;
}

export interface Planet {
  name: string;
  symbol: string;
  longitude: number; // degrees 0-360
  sign: string;
  house: number;
  retrograde: boolean;
}

export interface House {
  number: number;
  sign: string;
  cusp: number; // degrees 0-360
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string; // conjunction, opposition, trine, square, sextile, etc.
  angle: number;
  orb: number;
  applying: boolean;
}

export interface ChartData {
  birthData: BirthData;
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  ascendant: number;
  midheaven: number;
}

export const ZODIAC_SIGNS = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 
  'Leo', 'Virgo', 'Libra', 'Scorpio',
  'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
] as const;

export const PLANETS = [
  { name: 'Sun', symbol: '☉' },
  { name: 'Moon', symbol: '☽' },
  { name: 'Mercury', symbol: '☿' },
  { name: 'Venus', symbol: '♀' },
  { name: 'Mars', symbol: '♂' },
  { name: 'Jupiter', symbol: '♃' },
  { name: 'Saturn', symbol: '♄' },
  { name: 'Uranus', symbol: '♅' },
  { name: 'Neptune', symbol: '♆' },
  { name: 'Pluto', symbol: '♇' },
] as const;

export const ASPECT_TYPES = [
  { name: 'Conjunction', angle: 0, orb: 8, symbol: '☌' },
  { name: 'Opposition', angle: 180, orb: 8, symbol: '☍' },
  { name: 'Trine', angle: 120, orb: 6, symbol: '△' },
  { name: 'Square', angle: 90, orb: 6, symbol: '□' },
  { name: 'Sextile', angle: 60, orb: 4, symbol: '⚹' },
  { name: 'Quincunx', angle: 150, orb: 3, symbol: '⚻' },
] as const;