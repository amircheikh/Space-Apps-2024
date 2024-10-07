export const planetOrbitalData = {
  Mercury: {
    semiMajorAxis: 0.38709893,   // AU
    semiMinorAxis: 0.37949598,   // Calculated from semi-major and eccentricity
    eccentricity: 0.20563069,    // Actual value
    inclination: 7.00497902 * (Math.PI / 180),  // Converted from degrees to radians
    longitudeOfAscendingNode: 48.33167 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 29.12478 * (Math.PI / 180), // Converted from degrees to radians
  },
  Venus: {
    semiMajorAxis: 0.72333199,   // AU
    semiMinorAxis: 0.72332375,   // Slightly less than the semi-major due to small eccentricity
    eccentricity: 0.00677323,    // Actual value
    inclination: 3.39467605 * (Math.PI / 180),  // Converted from degrees to radians
    longitudeOfAscendingNode: 76.68069 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 54.85229 * (Math.PI / 180), // Converted from degrees to radians
  },
  Earth: {
    semiMajorAxis: 1.00000011,   // AU
    semiMinorAxis: 0.99986200,   // Calculated value
    eccentricity: 0.01671022,    // Actual value
    inclination: 0.00005 * (Math.PI / 180),     // Earth's inclination is almost 0
    longitudeOfAscendingNode: -11.26064 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 114.20783 * (Math.PI / 180), // Converted from degrees to radians
  },
  Mars: {
    semiMajorAxis: 1.52371034,   // AU
    semiMinorAxis: 1.51752573,   // Calculated value
    eccentricity: 0.09339410,    // Actual value
    inclination: 1.85061078 * (Math.PI / 180),  // Converted from degrees to radians
    longitudeOfAscendingNode: 49.57854 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 286.46230 * (Math.PI / 180), // Converted from degrees to radians
  },
  Jupiter: {
    semiMajorAxis: 5.20288700,   // AU
    semiMinorAxis: 5.19560938,   // Calculated value
    eccentricity: 0.04838624,    // Actual value
    inclination: 1.30439695 * (Math.PI / 180),  // Converted from degrees to radians
    longitudeOfAscendingNode: 100.55615 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 273.86700 * (Math.PI / 180), // Converted from degrees to radians
  },
  Saturn: {
    semiMajorAxis: 9.53707032,   // AU
    semiMinorAxis: 9.51999158,   // Calculated value
    eccentricity: 0.05415060,    // Actual value
    inclination: 2.48524000 * (Math.PI / 180),  // Converted from degrees to radians
    longitudeOfAscendingNode: 113.71504 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 339.39200 * (Math.PI / 180), // Converted from degrees to radians
  },
  Uranus: {
    semiMajorAxis: 19.2184461,   // AU
    semiMinorAxis: 19.1862132,   // Calculated value
    eccentricity: 0.04638122,    // Actual value
    inclination: 0.7730590 * (Math.PI / 180),   // Converted from degrees to radians
    longitudeOfAscendingNode: 74.22988 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 96.998857 * (Math.PI / 180), // Converted from degrees to radians
  },
  Neptune: {
    semiMajorAxis: 30.110386,    // AU
    semiMinorAxis: 30.109458,    // Calculated value
    eccentricity: 0.00867760,    // Actual value
    inclination: 1.7691704 * (Math.PI / 180),   // Converted from degrees to radians
    longitudeOfAscendingNode: 131.72169 * (Math.PI / 180), // Converted from degrees to radians
    argumentOfPeriapsis: 276.0450 * (Math.PI / 180), // Converted from degrees to radians
  },
};