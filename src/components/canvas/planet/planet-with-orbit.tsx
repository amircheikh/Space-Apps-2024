import { useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { PlanetOrbit } from './orbit';
import { Planet } from './planet';
import { planetOrbitalData } from './types';

interface PlanetWithOrbitProps {
  modelUrl: string;
  name: keyof typeof planetOrbitalData;
  orbitPosition?: THREE.Vector3;
  orbitRotation?: THREE.Euler;
  modelPosition?: Vector3;
  scale?: Vector3;
  onClick?: (planetName: string) => void;
}

const planetColors = {
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

const hoverColor = {
  Mercury: '#714e81', 
  Venus: '#845b13',  
  Earth: '#007399',  
  Mars: '#733a13',   
  Jupiter: '#a36855', 
  Saturn: '#786d4c', 
  Uranus: '#4e99a3', 
  Neptune: '#5469AF', 
};

export function PlanetWithOrbit({
  modelUrl,
  name,
  orbitPosition = new THREE.Vector3(0, 0, 0),
  orbitRotation = new THREE.Euler(0, 0, 0),
  modelPosition,
  scale,
  onClick,
}: PlanetWithOrbitProps) {
  const planetModel = useGLTF(modelUrl);
  const [sMajor, setSMajor] = useState(1);
  const [sMinor, setSMinor] = useState(1);
  const [planetPos, setPlanetPos] = useState<[number, number, number]>([0, 0, 0]);

  useEffect(() => {
    const planetData = planetOrbitalData[name];
    if (planetData) {
      setSMajor(planetData.semiMajorAxis);
      setSMinor(planetData.semiMinorAxis);
    }

    const angle = Math.random() * 2 * Math.PI;
    const x = sMajor * Math.cos(angle);
    const z = sMinor * Math.sin(angle);

    setPlanetPos([x, 0, z]);
  }, [name, sMajor, sMinor]);

  return (
    <group>
      <Planet
        model={planetModel}
        position={planetPos}
        name={name}
        modelPosition={modelPosition}
        scale={scale}
        onClick={() => onClick(name)}
      />
      <PlanetOrbit
        sMajor={sMajor}
        sMinor={sMinor}
        position={orbitPosition}
        rotation={orbitRotation}
        color={planetColors[name]}
        hoverColor={hoverColor[name]} 
        onClick={() => onClick(name)}
      />
    </group>
  );
}
