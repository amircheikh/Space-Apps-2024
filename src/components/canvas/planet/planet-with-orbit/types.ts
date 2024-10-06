export const planetOrbitalData = {
  Mercury: {
    semiMajorAxis: 0.387098,   // AU
    semiMinorAxis: 0.379505,   // Calculated from semi-major and eccentricity
    eccentricity: 0.205630,    // Actual value
    inclination: 7.00487 * (Math.PI / 180),  // Converted from degrees to radians
  },
  Venus: {
    semiMajorAxis: 0.723332,   // AU
    semiMinorAxis: 0.723318,   // Slightly less than the semi-major due to small eccentricity
    eccentricity: 0.006772,    // Actual value
    inclination: 3.39471 * (Math.PI / 180),  // Converted from degrees to radians
  },
  Earth: {
    semiMajorAxis: 1.000000,   // AU (defined as 1 AU)
    semiMinorAxis: 0.999862,   // Calculated value
    eccentricity: 0.016710,    // Actual value
    inclination: 0.00005 * (Math.PI / 180),  // Earth's inclination is almost 0
  },
  Mars: {
    semiMajorAxis: 1.523679,   // AU
    semiMinorAxis: 1.517504,   // Calculated value
    eccentricity: 0.093400,    // Actual value
    inclination: 1.85061 * (Math.PI / 180),  // Converted from degrees to radians
  },
  Jupiter: {
    semiMajorAxis: 5.202603,   // AU
    semiMinorAxis: 5.193828,   // Calculated value
    eccentricity: 0.048900,    // Actual value
    inclination: 1.30530 * (Math.PI / 180),  // Converted from degrees to radians
  },
  Saturn: {
    semiMajorAxis: 9.537070,   // AU
    semiMinorAxis: 9.517243,   // Calculated value
    eccentricity: 0.056500,    // Actual value
    inclination: 2.48446 * (Math.PI / 180),  // Converted from degrees to radians
  },
  Uranus: {
    semiMajorAxis: 19.191263,  // AU
    semiMinorAxis: 19.159073,  // Calculated value
    eccentricity: 0.046381,    // Actual value
    inclination: 0.76986 * (Math.PI / 180),  // Converted from degrees to radians
  },
  Neptune: {
    semiMajorAxis: 30.068963,  // AU
    semiMinorAxis: 30.068654,  // Calculated value
    eccentricity: 0.008678,    // Actual value
    inclination: 1.76917 * (Math.PI / 180),  // Converted from degrees to radians
  },
};

