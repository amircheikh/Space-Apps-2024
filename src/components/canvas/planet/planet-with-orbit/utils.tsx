import { PlanetDataEntry } from '@/helpers/hooks/api/nasa/types';

export function getPlanetPosition(horizonData: PlanetDataEntry): [number, number, number] {
  const { x, y, z } = horizonData;

  return [x, y, z];
}
