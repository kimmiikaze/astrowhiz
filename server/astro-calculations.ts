import { BirthData, ChartData, Planet, House, Aspect, ZODIAC_SIGNS, PLANETS, ASPECT_TYPES } from '../shared/types.js';

// Helper function to normalize degrees to 0-360 range
function normalizeDegrees(degrees: number): number {
  while (degrees < 0) degrees += 360;
  while (degrees >= 360) degrees -= 360;
  return degrees;
}

// Helper function to get zodiac sign from longitude
function getZodiacSign(longitude: number): string {
  return ZODIAC_SIGNS[Math.floor(longitude / 30)];
}

// Helper function to get house from longitude and house cusps
function getHouse(longitude: number, houses: House[]): number {
  for (let i = 0; i < 12; i++) {
    const currentCusp = houses[i].cusp;
    const nextCusp = houses[(i + 1) % 12].cusp;
    
    // Handle crossing 0 degrees
    if (nextCusp < currentCusp) {
      if (longitude >= currentCusp || longitude < nextCusp) {
        return houses[i].number;
      }
    } else {
      if (longitude >= currentCusp && longitude < nextCusp) {
        return houses[i].number;
      }
    }
  }
  return 1; // fallback
}

// Calculate planetary positions (simplified astronomical calculations)
function calculatePlanetaryPositions(date: Date, latitude: number, longitude: number): Planet[] {
  // This is a simplified calculation for demonstration
  // In a real app, you'd use a proper astronomical library like Swiss Ephemeris
  
  const planets: Planet[] = [];
  const baseDate = new Date('2000-01-01T12:00:00Z');
  const daysDiff = (date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
  
  // Sample planetary positions with basic orbital mechanics
  // These are approximate and for demonstration only
  const planetaryData = [
    { name: 'Sun', period: 365.25, basePosition: 280 },
    { name: 'Moon', period: 27.32, basePosition: 120 },
    { name: 'Mercury', period: 87.97, basePosition: 300 },
    { name: 'Venus', period: 224.7, basePosition: 50 },
    { name: 'Mars', period: 686.98, basePosition: 180 },
    { name: 'Jupiter', period: 4332.6, basePosition: 90 },
    { name: 'Saturn', period: 10759.2, basePosition: 210 },
    { name: 'Uranus', period: 30688.5, basePosition: 330 },
    { name: 'Neptune', period: 60182, basePosition: 15 },
    { name: 'Pluto', period: 90560, basePosition: 240 },
  ];

  planetaryData.forEach((planetData, index) => {
    const dailyMotion = 360 / planetData.period;
    const currentPosition = normalizeDegrees(
      planetData.basePosition + (dailyMotion * daysDiff)
    );
    
    const planetInfo = PLANETS.find(p => p.name === planetData.name);
    
    planets.push({
      name: planetData.name,
      symbol: planetInfo?.symbol || '○',
      longitude: currentPosition,
      sign: getZodiacSign(currentPosition),
      house: 1, // Will be calculated after houses
      retrograde: Math.random() > 0.8 // Simplified retrograde calculation
    });
  });

  return planets;
}

// Calculate house cusps using Placidus system (simplified)
function calculateHouses(date: Date, latitude: number, longitude: number, ascendant: number): House[] {
  const houses: House[] = [];
  
  // For demonstration, we'll use equal house system (30 degrees each)
  // In reality, you'd use more complex calculations for Placidus, Koch, etc.
  
  for (let i = 0; i < 12; i++) {
    houses.push({
      number: i + 1,
      cusp: normalizeDegrees(ascendant + (i * 30)),
      sign: getZodiacSign(normalizeDegrees(ascendant + (i * 30)))
    });
  }

  return houses;
}

// Calculate ascendant (simplified)
function calculateAscendant(date: Date, latitude: number, longitude: number): number {
  // This is highly simplified - real calculation involves sidereal time and complex trigonometry
  const hours = date.getHours() + date.getMinutes() / 60;
  const timeOffset = (hours / 24) * 360;
  const latitudeOffset = latitude * 0.5; // Very rough approximation
  
  return normalizeDegrees(timeOffset + latitudeOffset);
}

// Calculate midheaven (simplified)
function calculateMidheaven(ascendant: number): number {
  // In most house systems, MC is roughly 90 degrees from ASC
  return normalizeDegrees(ascendant + 90);
}

// Calculate aspects between planets
function calculateAspects(planets: Planet[]): Aspect[] {
  const aspects: Aspect[] = [];
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      let angleDiff = Math.abs(planet1.longitude - planet2.longitude);
      if (angleDiff > 180) {
        angleDiff = 360 - angleDiff;
      }
      
      // Check each aspect type
      for (const aspectType of ASPECT_TYPES) {
        const orb = Math.abs(angleDiff - aspectType.angle);
        
        if (orb <= aspectType.orb) {
          aspects.push({
            planet1: planet1.name,
            planet2: planet2.name,
            type: aspectType.name,
            angle: aspectType.angle,
            orb: orb,
            applying: Math.random() > 0.5 // Simplified applying/separating
          });
        }
      }
    }
  }
  
  return aspects;
}

// Main function to generate natal chart
export async function generateNatalChart(birthData: BirthData): Promise<ChartData> {
  try {
    // Parse birth date and time
    const date = new Date(`${birthData.date}T${birthData.time}:00`);
    
    // Calculate ascendant
    const ascendant = calculateAscendant(date, birthData.latitude, birthData.longitude);
    
    // Calculate midheaven
    const midheaven = calculateMidheaven(ascendant);
    
    // Calculate houses
    const houses = calculateHouses(date, birthData.latitude, birthData.longitude, ascendant);
    
    // Calculate planetary positions
    let planets = calculatePlanetaryPositions(date, birthData.latitude, birthData.longitude);
    
    // Update planet houses based on calculated house cusps
    planets = planets.map(planet => ({
      ...planet,
      house: getHouse(planet.longitude, houses)
    }));
    
    // Calculate aspects
    const aspects = calculateAspects(planets);
    
    return {
      birthData,
      planets,
      houses,
      aspects,
      ascendant,
      midheaven
    };
  } catch (error) {
    throw new Error(`Failed to generate natal chart: ${error.message}`);
  }
}