export interface Planet {
  name: string;
  symbol: string;
  longitude: number; // degrees from 0 to 360
  retrograde?: boolean;
}

export interface House {
  cusp: number; // degrees from 0 to 360
  sign: string;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  angle: number;
  type: 'conjunction' | 'opposition' | 'trine' | 'square' | 'sextile' | 'quincunx' | 'semisextile' | 'semisquare' | 'sesquiquadrate';
  orb: number;
  exact: boolean;
}

export interface ChartData {
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  ascendant: number;
  midheaven: number;
}

export interface ChartOptions {
  size: number;
  showAspects: boolean;
  showHouses: boolean;
  backgroundColor: string;
  strokeColor: string;
  fillColor: string;
  fontSize: number;
  aspectColors: Record<string, string>;
}

export interface ExportOptions {
  format: 'svg' | 'png';
  width: number;
  height: number;
  quality?: number; // for PNG export
  transparent: boolean;
}