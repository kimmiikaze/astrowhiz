export interface Planet {
  name: string;
  sign: string;
  degree: number;
  house: number;
  angle: number;
}

export interface House {
  number: number;
  sign: string;
  cusp: number;
  degree: number;
}

export interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  angle: number;
  orb: number;
}

export interface Sign {
  name: string;
  element: string;
  modality: string;
  angle: number;
}

export interface ChartData {
  planets: Planet[];
  houses: House[];
  aspects: Aspect[];
  signs: Sign[];
}

export interface BirthData {
  date: string;
  time: string;
  location: string;
  latitude?: number;
  longitude?: number;
}