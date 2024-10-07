export const ORBIT_MULTIPLIER = 1700;
export const MAX_VISIBLE_DISTANCE = 2000; // CHANGE THIS LATER
export const MIN_VISIBLE_DISTANCE = 24000; // CHANGE THIS LATER
export const MIN_DOLLY_DISTANCE = 0
export const MAX_DOLLY_DISTANCE = 150000
export const MIN_RADIUS = 10;

export const PLANET_SCALES = {
   SUN: 1,                  // Base scale for the Sun
   MERCURY: 0.0035,         // Scale relative to Sun
   VENUS: 0.0087,
   EARTH: 0.0092,
   MARS: 0.0049,
   JUPITER: 0.1005,
   SATURN: 0.0837,
   URANUS: 0.0365,
   NEPTUNE: 0.0354,
 };

 export const PLANET_OFFSETS = {
  Mercury: 0.0796,
  Venus: 0.0049,
  Earth: 0.0167,
  Mars: 0.1423,
  Jupiter: 0.2543,
  Saturn: 0.5386,
  Uranus: 0.8905,
  Neptune: 0.2608,
};

 export const planetColors = {
  Sun: '#f7f4df',
  Mercury: '#9768ac', 
  Venus: '#b07919',  
  Earth: '#09c',  
  Mars: '#9a4e19',   
  Jupiter: '#da8b72', 
  Saturn: '#d5c187', 
  Uranus: '#68ccda', 
  Neptune: '#708ce3', 
};

export const hoverColor = {
  Mercury: '#714e81', 
  Venus: '#845b13',  
  Earth: '#007399',  
  Mars: '#733a13',   
  Jupiter: '#a36855', 
  Saturn: '#786d4c', 
  Uranus: '#4e99a3', 
  Neptune: '#5469AF', 
};
