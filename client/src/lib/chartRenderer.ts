import { ChartData, ChartOptions } from '../types/chart';
import { degreesToRadians, normalizeAngle } from '../utils/astrology';
import { ZODIAC_SIGNS, ASPECT_COLORS } from '../lib/constants';

export class AstrologicalChartSVG {
  private chartData: ChartData;
  private options: ChartOptions;
  private centerX: number;
  private centerY: number;
  private outerRadius: number;
  private innerRadius: number;
  private houseRadius: number;
  private planetRadius: number;

  constructor(chartData: ChartData, options: Partial<ChartOptions> = {}) {
    this.chartData = chartData;
    this.options = {
      size: 600,
      showAspects: true,
      showHouses: true,
      backgroundColor: 'transparent',
      strokeColor: '#333333',
      fillColor: 'none',
      fontSize: 16,
      aspectColors: ASPECT_COLORS,
      ...options
    };

    this.centerX = this.options.size / 2;
    this.centerY = this.options.size / 2;
    this.outerRadius = this.options.size * 0.45;
    this.innerRadius = this.options.size * 0.3;
    this.houseRadius = this.options.size * 0.38;
    this.planetRadius = this.options.size * 0.35;
  }

  // Convert astrological longitude to SVG coordinates
  private longitudeToCoordinates(longitude: number, radius: number): { x: number; y: number } {
    // In astrology, 0° is at the left (9 o'clock position) and increases counter-clockwise
    // We need to convert this to SVG coordinates where 0° is at the top (12 o'clock) and increases clockwise
    const adjustedAngle = normalizeAngle(90 - longitude);
    const radians = degreesToRadians(adjustedAngle);
    
    return {
      x: this.centerX + radius * Math.cos(radians),
      y: this.centerY - radius * Math.sin(radians)
    };
  }

  // Create gradient definitions for enhanced visuals
  private createGradients(): string {
    return `
      <defs>
        <radialGradient id="chartGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#000000;stop-opacity:0.05" />
        </radialGradient>
        <linearGradient id="houseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4a90e2;stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:#7b68ee;stop-opacity:0.1" />
        </linearGradient>
        <filter id="dropShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
          <feOffset dx="1" dy="1" result="offset"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge> 
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/> 
          </feMerge>
        </filter>
      </defs>
    `;
  }

  // Draw the outer circle with zodiac signs
  private drawZodiacWheel(): string {
    let svg = '';
    
    // Outer circle
    svg += `<circle cx="${this.centerX}" cy="${this.centerY}" r="${this.outerRadius}" 
            fill="url(#chartGradient)" stroke="${this.options.strokeColor}" 
            stroke-width="2" style="filter: url(#dropShadow)"/>`;
    
    // Zodiac sign divisions
    for (let i = 0; i < 12; i++) {
      const angle = i * 30;
      const startCoord = this.longitudeToCoordinates(angle, this.outerRadius);
      const endCoord = this.longitudeToCoordinates(angle, this.innerRadius);
      
      svg += `<line x1="${startCoord.x}" y1="${startCoord.y}" 
              x2="${endCoord.x}" y2="${endCoord.y}" 
              stroke="${this.options.strokeColor}" stroke-width="1" opacity="0.6"/>`;
      
      // Zodiac symbols
      const symbolAngle = angle + 15; // Center of sign
      const symbolCoord = this.longitudeToCoordinates(symbolAngle, this.outerRadius - 25);
      const sign = ZODIAC_SIGNS[i];
      
      svg += `<text x="${symbolCoord.x}" y="${symbolCoord.y}" 
              text-anchor="middle" dominant-baseline="central" 
              font-family="serif" font-size="${this.options.fontSize + 4}" 
              fill="${this.options.strokeColor}" font-weight="bold"
              style="filter: url(#dropShadow)">${sign.symbol}</text>`;
    }
    
    return svg;
  }

  // Draw house cusps
  private drawHouses(): string {
    if (!this.options.showHouses) return '';
    
    let svg = '';
    
    // Inner circle for houses
    svg += `<circle cx="${this.centerX}" cy="${this.centerY}" r="${this.innerRadius}" 
            fill="url(#houseGradient)" stroke="${this.options.strokeColor}" 
            stroke-width="1.5" opacity="0.7"/>`;
    
    for (let i = 0; i < this.chartData.houses.length; i++) {
      const house = this.chartData.houses[i];
      const startCoord = this.longitudeToCoordinates(house.cusp, this.innerRadius);
      const endCoord = this.longitudeToCoordinates(house.cusp, this.houseRadius);
      
      // House cusp lines with anti-aliasing
      svg += `<line x1="${startCoord.x}" y1="${startCoord.y}" 
              x2="${endCoord.x}" y2="${endCoord.y}" 
              stroke="${this.options.strokeColor}" stroke-width="1.5" 
              opacity="0.8" shape-rendering="geometricPrecision"/>`;
      
      // House numbers
      const houseNumberAngle = i === 11 ? 
        (house.cusp + this.chartData.houses[0].cusp + 360) / 2 % 360 :
        (house.cusp + this.chartData.houses[i + 1].cusp) / 2;
        
      const numberCoord = this.longitudeToCoordinates(houseNumberAngle, this.innerRadius - 20);
      
      svg += `<text x="${numberCoord.x}" y="${numberCoord.y}" 
              text-anchor="middle" dominant-baseline="central" 
              font-family="sans-serif" font-size="${this.options.fontSize - 2}" 
              fill="${this.options.strokeColor}" opacity="0.7">${i + 1}</text>`;
    }
    
    return svg;
  }

  // Draw planets
  private drawPlanets(): string {
    let svg = '';
    
    for (const planet of this.chartData.planets) {
      const coord = this.longitudeToCoordinates(planet.longitude, this.planetRadius);
      
      // Planet circle background
      svg += `<circle cx="${coord.x}" cy="${coord.y}" r="12" 
              fill="white" stroke="${this.options.strokeColor}" 
              stroke-width="1" opacity="0.9" 
              style="filter: url(#dropShadow)"/>`;
      
      // Planet symbol
      svg += `<text x="${coord.x}" y="${coord.y}" 
              text-anchor="middle" dominant-baseline="central" 
              font-family="serif" font-size="${this.options.fontSize}" 
              fill="${this.options.strokeColor}" font-weight="bold">${planet.symbol}</text>`;
      
      // Retrograde indicator
      if (planet.retrograde) {
        svg += `<text x="${coord.x + 15}" y="${coord.y - 10}" 
                text-anchor="middle" dominant-baseline="central" 
                font-family="sans-serif" font-size="${this.options.fontSize - 4}" 
                fill="#ff0000" font-weight="bold">R</text>`;
      }
    }
    
    return svg;
  }

  // Draw aspects between planets
  private drawAspects(): string {
    if (!this.options.showAspects) return '';
    
    let svg = '';
    
    for (const aspect of this.chartData.aspects) {
      const planet1 = this.chartData.planets.find(p => p.name === aspect.planet1);
      const planet2 = this.chartData.planets.find(p => p.name === aspect.planet2);
      
      if (!planet1 || !planet2) continue;
      
      const coord1 = this.longitudeToCoordinates(planet1.longitude, this.planetRadius - 15);
      const coord2 = this.longitudeToCoordinates(planet2.longitude, this.planetRadius - 15);
      
      const color = this.options.aspectColors[aspect.type] || '#666666';
      const strokeWidth = aspect.exact ? 2 : 1;
      const opacity = aspect.exact ? 0.8 : 0.5;
      
      // Draw aspect line with smooth anti-aliasing
      svg += `<line x1="${coord1.x}" y1="${coord1.y}" 
              x2="${coord2.x}" y2="${coord2.y}" 
              stroke="${color}" stroke-width="${strokeWidth}" 
              opacity="${opacity}" shape-rendering="geometricPrecision"
              stroke-dasharray="${aspect.exact ? 'none' : '3,3'}"/>`;
    }
    
    return svg;
  }

  // Generate complete SVG
  generateSVG(): string {
    const svg = `
      <svg width="${this.options.size}" height="${this.options.size}" 
           viewBox="0 0 ${this.options.size} ${this.options.size}"
           xmlns="http://www.w3.org/2000/svg"
           style="background: ${this.options.backgroundColor};">
        ${this.createGradients()}
        ${this.drawZodiacWheel()}
        ${this.drawHouses()}
        ${this.drawAspects()}
        ${this.drawPlanets()}
      </svg>
    `;
    
    return svg;
  }
}