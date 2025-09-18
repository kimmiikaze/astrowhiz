import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateNatalChart } from './astro-calculations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist/public')));

// API Routes
app.post('/api/generate-chart', async (req, res) => {
  try {
    const birthData = req.body;
    
    // Validate required fields
    if (!birthData.date || !birthData.time || !birthData.latitude || !birthData.longitude) {
      return res.status(400).json({ 
        error: 'Missing required fields: date, time, latitude, longitude' 
      });
    }

    // Generate natal chart data
    const chartData = await generateNatalChart(birthData);
    
    res.json(chartData);
  } catch (error) {
    console.error('Error generating chart:', error);
    res.status(500).json({ 
      error: 'Failed to generate natal chart',
      details: error.message 
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});