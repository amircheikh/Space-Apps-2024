export enum PlanetEnum {
  Mercury = '199',
  Venus = '299',
  Earth = '399',
  Mars = '499',
  Jupiter = '599',
  Saturn = '699',
  Uranus = '799',
  Neptune = '899',
  Sun = '10',
}

export const planetOrbitalData = {
  Mercury: {
    semiMajorAxis: 0.39, 
    semiMinorAxis: 0.38,
    eccentricity: 0.2056,
  },
  Venus: {
    semiMajorAxis: 0.72, 
    semiMinorAxis: 0.72, 
    eccentricity: 0.0068,
  },
  Earth: {
    semiMajorAxis: 1.00, 
    semiMinorAxis: 1.00,
    eccentricity: 0.0167,
  },
  Mars: {
    semiMajorAxis: 1.52, 
    semiMinorAxis: 1.51, 
    eccentricity: 0.0934,
  },
  Jupiter: {
    semiMajorAxis: 5.20, 
    semiMinorAxis: 5.19, 
    eccentricity: 0.0489,
  },
  Saturn: {
    semiMajorAxis: 9.58, 
    semiMinorAxis: 9.56, 
    eccentricity: 0.0565,
  },
  Uranus: {
    semiMajorAxis: 19.22,
    semiMinorAxis: 19.17, 
    eccentricity: 0.0463,
  },
  Neptune: {
    semiMajorAxis: 30.05, 
    semiMinorAxis: 30.05, 
    eccentricity: 0.0095,
  },
};
