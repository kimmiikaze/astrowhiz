import React from 'react';
import { ChartData } from '../types/chart';

interface ChartDetailsProps {
  chartData: ChartData;
}

const ChartDetails: React.FC<ChartDetailsProps> = ({ chartData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Planetary Positions */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-xl font-semibold mb-4">Planetary Positions</h3>
        <div className="space-y-3">
          {chartData.planets.map((planet, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">{planet.name}</span>
                <span className="text-sm text-muted-foreground">
                  {planet.degree}° {planet.sign}
                </span>
              </div>
              <span className="text-sm bg-secondary px-2 py-1 rounded">
                House {planet.house}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Houses */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-xl font-semibold mb-4">Houses</h3>
        <div className="space-y-3">
          {chartData.houses.map((house, index) => (
            <div key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium">House {house.number}</span>
                <span className="text-sm text-muted-foreground">
                  {house.degree}° {house.sign}
                </span>
              </div>
              <span className="text-xs bg-accent px-2 py-1 rounded">
                {getHouseMeaning(house.number)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Aspects */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-xl font-semibold mb-4">Major Aspects</h3>
        <div className="space-y-3">
          {chartData.aspects.map((aspect, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">
                  {aspect.planet1} {getAspectSymbol(aspect.type)} {aspect.planet2}
                </span>
                <span 
                  className="text-xs px-2 py-1 rounded"
                  style={{ 
                    backgroundColor: getAspectColor(aspect.type),
                    color: 'white'
                  }}
                >
                  {aspect.type}
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Orb: {aspect.orb.toFixed(1)}°
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper functions
const getHouseMeaning = (houseNumber: number): string => {
  const meanings = [
    'Self', 'Money', 'Communication', 'Home', 'Creativity', 'Health',
    'Partnerships', 'Transformation', 'Philosophy', 'Career', 'Friends', 'Spirituality'
  ];
  return meanings[houseNumber - 1] || '';
};

const getAspectSymbol = (aspectType: string): string => {
  const symbols: { [key: string]: string } = {
    'Conjunction': '☌',
    'Opposition': '☍',
    'Square': '□',
    'Trine': '△',
    'Sextile': '⚹'
  };
  return symbols[aspectType] || '○';
};

const getAspectColor = (aspectType: string): string => {
  const colors: { [key: string]: string } = {
    'Conjunction': '#ff6b6b',
    'Opposition': '#4ecdc4',
    'Square': '#ff9ff3',
    'Trine': '#45b7d1',
    'Sextile': '#96ceb4'
  };
  return colors[aspectType] || '#888888';
};

export default ChartDetails;