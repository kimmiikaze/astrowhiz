import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the build directory
app.use(express.static(join(__dirname, '../dist/public')));

// API endpoint for health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AstroWhiz Chart Generator is running' });
});

// Serve the React app for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌟 AstroWhiz server running on port ${PORT}`);
  console.log(`🔗 Open http://localhost:${PORT} to view the application`);
});