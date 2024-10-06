import { HorizonsResponse } from '@/helpers/hooks/api/nasa/types';
import { useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { PlanetOrbit } from '../orbit';
import { Planet } from '../planet';
import { planetOrbitalData } from './types';
import { calculatePlanetPosition } from './utils';

interface PlanetAndOrbitProps {
  modelUrl: string;
  name: keyof typeof planetOrbitalData;
  horizonData: HorizonsResponse;
  orbitPosition?: THREE.Vector3;
  orbitRotation?: THREE.Euler;
  modelPosition?: Vector3;
  scale?: Vector3;
  onClick?: (position: Vector3) => void;
}

export function PlanetAndOrbit({
  modelUrl,
  name,
  horizonData,
  orbitPosition = new THREE.Vector3(0, 0, 0),
  orbitRotation = new THREE.Euler(0, 0, 0),
  modelPosition,
  scale,
  onClick,
}: PlanetAndOrbitProps) {
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

    if (horizonData && horizonData.routes?.length) {
      const latestPositionData = horizonData.routes[0];
      const calculatedPosition = calculatePlanetPosition(latestPositionData);
      setPlanetPos(calculatedPosition);
    } else {
      // this is a fallback to a random orbit position when Horizon data is not available
      console.log('FALLBACK HAS RUN FOR: ', name);
      const angle = Math.random() * 2 * Math.PI;
      const x = sMajor * Math.cos(angle);
      const y = sMinor * Math.sin(angle);
      setPlanetPos([x, y, 0]);
    }
  }, [name, horizonData, sMajor, sMinor]);

  return (
    <group>
      <Planet
        model={planetModel}
        position={planetPos}
        name={name}
        modelPosition={modelPosition}
        scale={scale}
        onClick={onClick}
      />
      <PlanetOrbit sMajor={sMajor} sMinor={sMinor} position={orbitPosition} rotation={orbitRotation} />
    </group>
  );
}
