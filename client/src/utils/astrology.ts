import { Planet, Aspect, ChartData } from '../types/chart';
import { ZODIAC_SIGNS, ASPECT_ANGLES, DEFAULT_ORBS } from '../lib/constants';

// Convert degrees to radians
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// Convert radians to degrees
export function radiansToDegrees(radians: number): number {
  return (radians * 180) / Math.PI;
}

// Normalize angle to 0-360 range
export function normalizeAngle(angle: number): number {
  while (angle < 0) angle += 360;
  while (angle >= 360) angle -= 360;
  return angle;
}

// Get zodiac sign for a given longitude
export function getZodiacSign(longitude: number): string {
  const normalizedLongitude = normalizeAngle(longitude);
  const signIndex = Math.floor(normalizedLongitude / 30);
  return ZODIAC_SIGNS[signIndex].name;
}

// Get zodiac sign symbol for a given longitude
export function getZodiacSymbol(longitude: number): string {
  const normalizedLongitude = normalizeAngle(longitude);
  const signIndex = Math.floor(normalizedLongitude / 30);
  return ZODIAC_SIGNS[signIndex].symbol;
}

// Calculate the shortest angular distance between two points
export function angularDistance(angle1: number, angle2: number): number {
  const diff = Math.abs(angle1 - angle2);
  return Math.min(diff, 360 - diff);
}

// Calculate aspects between planets
export function calculateAspects(planets: Planet[]): Aspect[] {
  const aspects: Aspect[] = [];
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      const distance = angularDistance(planet1.longitude, planet2.longitude);
      
      // Check each aspect type
      for (const [aspectName, aspectAngle] of Object.entries(ASPECT_ANGLES)) {
        const orb = DEFAULT_ORBS[aspectName as keyof typeof DEFAULT_ORBS];
        const diff = Math.abs(distance - aspectAngle);
        
        if (diff <= orb) {
          aspects.push({
            planet1: planet1.name,
            planet2: planet2.name,
            angle: aspectAngle,
            type: aspectName as any,
            orb: diff,
            exact: diff < 1
          });
          break; // Only one aspect per planet pair
        }
      }
    }
  }
  
  return aspects;
}

// Generate sample chart data for demonstration
export function generateSampleChart(): ChartData {
  const planets: Planet[] = [
    { name: 'Sun', symbol: '☉', longitude: 15 }, // Aries
    { name: 'Moon', symbol: '☽', longitude: 120 }, // Leo
    { name: 'Mercury', symbol: '☿', longitude: 25 }, // Aries
    { name: 'Venus', symbol: '♀', longitude: 350 }, // Pisces
    { name: 'Mars', symbol: '♂', longitude: 180 }, // Libra
    { name: 'Jupiter', symbol: '♃', longitude: 240 }, // Sagittarius
    { name: 'Saturn', symbol: '♄', longitude: 300 }, // Aquarius
    { name: 'Uranus', symbol: '♅', longitude: 45 }, // Taurus
    { name: 'Neptune', symbol: '♆', longitude: 330 }, // Pisces
    { name: 'Pluto', symbol: '♇', longitude: 270 } // Capricorn
  ];
  
  const houses = Array.from({ length: 12 }, (_, i) => ({
    cusp: (i * 30) + 15, // Simple equal house system for demo
    sign: getZodiacSign((i * 30) + 15)
  }));
  
  const aspects = calculateAspects(planets);
  
  return {
    planets,
    houses,
    aspects,
    ascendant: 15, // Aries rising
    midheaven: 285 // Capricorn MC
  };
}

// Calculate house position for a given longitude
export function getHousePosition(longitude: number, ascendant: number): number {
  const adjustedLongitude = normalizeAngle(longitude - ascendant);
  return Math.floor(adjustedLongitude / 30) + 1;
}