import React, { useState } from 'react';
import AstrologyChart from './components/AstrologyChart';
import { generateSampleChart } from './utils/astrology';
import { ChartData } from './types/chart';

function App() {
  const [chartData, setChartData] = useState<ChartData>(generateSampleChart());
  const [showAdvanced, setShowAdvanced] = useState(false);

  const regenerateChart = () => {
    // Generate a new sample chart with different planetary positions
    const newChart = generateSampleChart();
    // Randomize positions slightly for demonstration
    newChart.planets.forEach(planet => {
      planet.longitude = (planet.longitude + Math.random() * 60 - 30 + 360) % 360;
    });
    setChartData(newChart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            AstroWhiz Chart Generator
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Generate high-quality astrological charts with transparent backgrounds, 
            perfect for overlays and professional use. Export as SVG or high-resolution PNG.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">
                Sample Astrological Chart
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={regenerateChart}
                  className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors"
                >
                  Generate New Chart
                </button>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                  {showAdvanced ? 'Hide' : 'Show'} Advanced Options
                </button>
              </div>
            </div>

            {showAdvanced && (
              <div className="mb-6 p-4 bg-gray-50 rounded border">
                <h3 className="text-lg font-semibold mb-3">Chart Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-semibold">Planets:</h4>
                    <ul className="space-y-1">
                      {chartData.planets.map(planet => (
                        <li key={planet.name} className="flex justify-between">
                          <span>{planet.symbol} {planet.name}</span>
                          <span>{planet.longitude.toFixed(1)}°</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Houses:</h4>
                    <ul className="space-y-1">
                      {chartData.houses.slice(0, 6).map((house, index) => (
                        <li key={index} className="flex justify-between">
                          <span>House {index + 1}</span>
                          <span>{house.cusp.toFixed(1)}°</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Aspects:</h4>
                    <ul className="space-y-1">
                      {chartData.aspects.slice(0, 6).map((aspect, index) => (
                        <li key={index} className="text-xs">
                          {aspect.planet1} {aspect.type} {aspect.planet2}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <AstrologyChart 
              chartData={chartData}
              options={{
                size: 600,
                showAspects: true,
                showHouses: true,
                backgroundColor: 'transparent'
              }}
            />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Features & Quality
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-600 mb-2">✓ High-Quality Output</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Transparent background for overlays</li>
                  <li>• Scalable vector graphics (SVG)</li>
                  <li>• High-resolution PNG export (up to 2400x2400)</li>
                  <li>• Anti-aliased lines and smooth gradients</li>
                  <li>• Print-quality output at 300 DPI</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-600 mb-2">✓ Professional Features</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Accurate astrological calculations</li>
                  <li>• House cusp visualization</li>
                  <li>• Planetary aspect lines with orbs</li>
                  <li>• Zodiac symbols and planetary glyphs</li>
                  <li>• Customizable styling and colors</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;