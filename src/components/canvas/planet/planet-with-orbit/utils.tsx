import { HorizonsRoute } from '@/helpers/hooks/api/nasa/types';

export function calculatePlanetPosition(horizonData: HorizonsRoute): [number, number, number] {
  const { ra, dec, delta } = horizonData;

  // parse RA (Right Ascension)
  const [raH, raM, raS] = ra.split(' ').map(parseFloat);
  const raDeg = raH * 15 + raM / 4 + raS / 240;
  const raRad = (raDeg * Math.PI) / 180;

  // parse DEC (Declination)
  const decSign = dec[0] === '+' ? 1 : -1;
  const [decD, decM, decS] = dec.slice(1).split(' ').map(parseFloat);
  const decDeg = decSign * (decD + decM / 60 + decS / 3600);
  const decRad = (decDeg * Math.PI) / 180;

  // delta (distance in AU)
  const distanceAU = delta;

  // convert to Cartesian coordinates
  const x = distanceAU * Math.cos(decRad) * Math.cos(raRad);
  const y = distanceAU * Math.cos(decRad) * Math.sin(raRad);
  const z = distanceAU * Math.sin(decRad);

  return [x, y, z];
}
