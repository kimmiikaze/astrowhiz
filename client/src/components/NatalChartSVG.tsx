import React, { forwardRef } from 'react';
import { ChartData } from '../types/chart';

interface NatalChartSVGProps {
  chartData: ChartData;
}

const NatalChartSVG = forwardRef<SVGSVGElement, NatalChartSVGProps>(
  ({ chartData }, ref) => {
    const size = 600;
    const center = size / 2;
    const outerRadius = 280;
    const innerRadius = 80;
    const houseRadius = 220;
    const planetRadius = 250;

    // Planet symbols (Unicode)
    const planetSymbols: { [key: string]: string } = {
      'Sun': '☉',
      'Moon': '☽',
      'Mercury': '☿',
      'Venus': '♀',
      'Mars': '♂',
      'Jupiter': '♃',
      'Saturn': '♄',
      'Uranus': '♅',
      'Neptune': '♆',
      'Pluto': '♇'
    };

    // Sign symbols (Unicode)
    const signSymbols: { [key: string]: string } = {
      'Aries': '♈',
      'Taurus': '♉',
      'Gemini': '♊',
      'Cancer': '♋',
      'Leo': '♌',
      'Virgo': '♍',
      'Libra': '♎',
      'Scorpio': '♏',
      'Sagittarius': '♐',
      'Capricorn': '♑',
      'Aquarius': '♒',
      'Pisces': '♓'
    };

    // Convert angle to SVG coordinates
    const angleToCoords = (angle: number, radius: number) => {
      const radian = (angle - 90) * (Math.PI / 180); // -90 to start from top
      return {
        x: center + radius * Math.cos(radian),
        y: center + radius * Math.sin(radian)
      };
    };

    // Generate house lines
    const generateHouseLines = () => {
      return chartData.houses.map((house, index) => {
        const angle = house.cusp;
        const start = angleToCoords(angle, innerRadius);
        const end = angleToCoords(angle, outerRadius);
        
        return (
          <line
            key={`house-line-${index}`}
            x1={start.x}
            y1={start.y}
            x2={end.x}
            y2={end.y}
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.6"
          />
        );
      });
    };

    // Generate zodiac signs
    const generateSigns = () => {
      return chartData.signs.map((sign, index) => {
        const angle = index * 30 + 15; // Center of each sign
        const coords = angleToCoords(angle, outerRadius - 20);
        
        return (
          <text
            key={`sign-${index}`}
            x={coords.x}
            y={coords.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="24"
            fill="currentColor"
            opacity="0.8"
          >
            {signSymbols[sign.name]}
          </text>
        );
      });
    };

    // Generate house numbers
    const generateHouseNumbers = () => {
      return chartData.houses.map((house, index) => {
        const nextHouse = chartData.houses[(index + 1) % 12];
        const midAngle = (house.cusp + (nextHouse?.cusp || house.cusp + 30)) / 2;
        const coords = angleToCoords(midAngle, houseRadius);
        
        return (
          <text
            key={`house-number-${index}`}
            x={coords.x}
            y={coords.y}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="16"
            fill="currentColor"
            opacity="0.7"
            fontWeight="bold"
          >
            {house.number}
          </text>
        );
      });
    };

    // Generate planets
    const generatePlanets = () => {
      return chartData.planets.map((planet, index) => {
        const coords = angleToCoords(planet.angle, planetRadius);
        
        return (
          <g key={`planet-${index}`}>
            <circle
              cx={coords.x}
              cy={coords.y}
              r="15"
              fill="hsl(var(--primary))"
              stroke="currentColor"
              strokeWidth="2"
            />
            <text
              x={coords.x}
              y={coords.y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="18"
              fill="hsl(var(--primary-foreground))"
              fontWeight="bold"
            >
              {planetSymbols[planet.name] || planet.name.charAt(0)}
            </text>
          </g>
        );
      });
    };

    // Generate aspect lines
    const generateAspects = () => {
      return chartData.aspects.map((aspect, index) => {
        const planet1 = chartData.planets.find(p => p.name === aspect.planet1);
        const planet2 = chartData.planets.find(p => p.name === aspect.planet2);
        
        if (!planet1 || !planet2) return null;
        
        const coords1 = angleToCoords(planet1.angle, planetRadius);
        const coords2 = angleToCoords(planet2.angle, planetRadius);
        
        // Color based on aspect type
        const aspectColors: { [key: string]: string } = {
          'Conjunction': '#ff6b6b',
          'Opposition': '#4ecdc4',
          'Square': '#ff9ff3',
          'Trine': '#45b7d1',
          'Sextile': '#96ceb4'
        };
        
        return (
          <line
            key={`aspect-${index}`}
            x1={coords1.x}
            y1={coords1.y}
            x2={coords2.x}
            y2={coords2.y}
            stroke={aspectColors[aspect.type] || '#888'}
            strokeWidth="1.5"
            opacity="0.6"
            strokeDasharray={aspect.type === 'Opposition' ? '5,5' : undefined}
          />
        );
      });
    };

    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="border border-border rounded-lg bg-card"
      >
        {/* Background circles */}
        <circle
          cx={center}
          cy={center}
          r={outerRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.8"
        />
        <circle
          cx={center}
          cy={center}
          r={innerRadius}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.8"
        />
        
        {/* Aspects (drawn first, behind other elements) */}
        {generateAspects()}
        
        {/* House lines */}
        {generateHouseLines()}
        
        {/* Zodiac signs */}
        {generateSigns()}
        
        {/* House numbers */}
        {generateHouseNumbers()}
        
        {/* Planets */}
        {generatePlanets()}
      </svg>
    );
  }
);

NatalChartSVG.displayName = 'NatalChartSVG';

export default NatalChartSVG;