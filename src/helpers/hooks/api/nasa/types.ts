export interface PlanetDataEntry {
  time: string; 
  datetime: string; 
  x: number; 
  y: number;
  z: number; 
  vx?: number; 
  vy?: number; 
  vz?: number; 
}


export interface HorizonsResponse {
  data: {
    [planetName: string]: PlanetDataEntry[];
  };
  errors?: { planet: string; error: string }[];
}
