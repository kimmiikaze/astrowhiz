import express from 'express';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/public')));

// API routes for natal chart calculations
app.post('/api/natal-chart', async (req, res) => {
  try {
    const { birthData } = req.body;
    
    // For now, return a simple response structure
    // This will be expanded with actual astrological calculations
    const chartData = {
      planets: generateMockPlanets(),
      houses: generateMockHouses(),
      aspects: generateMockAspects(),
      signs: generateMockSigns()
    };
    
    res.json({ success: true, data: chartData });
  } catch (error) {
    console.error('Error generating natal chart:', error);
    res.status(500).json({ success: false, error: 'Failed to generate natal chart' });
  }
});

// Mock data generators (to be replaced with actual calculations)
function generateMockPlanets() {
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
  
  return planets.map((planet, index) => ({
    name: planet,
    sign: signs[index % 12],
    degree: Math.floor(Math.random() * 30),
    house: Math.floor(Math.random() * 12) + 1,
    angle: (index * 30 + Math.random() * 30) % 360
  }));
}

function generateMockHouses() {
  const houses = [];
  for (let i = 1; i <= 12; i++) {
    houses.push({
      number: i,
      sign: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][(i - 1) % 12],
      cusp: (i - 1) * 30,
      degree: Math.floor(Math.random() * 30)
    });
  }
  return houses;
}

function generateMockAspects() {
  const aspects = [];
  const planets = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'];
  const aspectTypes = [
    { name: 'Conjunction', angle: 0, orb: 8 },
    { name: 'Opposition', angle: 180, orb: 8 },
    { name: 'Square', angle: 90, orb: 6 },
    { name: 'Trine', angle: 120, orb: 6 },
    { name: 'Sextile', angle: 60, orb: 4 }
  ];
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      if (Math.random() > 0.7) { // Random chance for aspect
        const aspectType = aspectTypes[Math.floor(Math.random() * aspectTypes.length)];
        aspects.push({
          planet1: planets[i],
          planet2: planets[j],
          type: aspectType.name,
          angle: aspectType.angle,
          orb: Math.random() * aspectType.orb
        });
      }
    }
  }
  
  return aspects;
}

function generateMockSigns() {
  return [
    'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
    'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
  ].map((sign, index) => ({
    name: sign,
    element: ['Fire', 'Earth', 'Air', 'Water'][index % 4],
    modality: ['Cardinal', 'Fixed', 'Mutable'][index % 3],
    angle: index * 30
  }));
}

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

const server = createServer(app);

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});