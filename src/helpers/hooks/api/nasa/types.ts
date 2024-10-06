export interface PlanetDataEntry {
  time: string;
  ra: string;
  dec: string;
  apmag: number;
  delta: number;
  s_o_t: string;
}

export interface HorizonsResponse {
  data: {
    [planetName: string]: PlanetDataEntry[];
  };
  errors?: { planet: string; error: string }[];
}
