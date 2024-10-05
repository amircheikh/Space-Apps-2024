import { useGLTF } from '@react-three/drei';
import { Vector3 } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { PlanetOrbit } from './Orbit';
import { Planet } from './Planet';
import { planetOrbitalData } from './types';

interface PlanetWithOrbitProps {
  modelUrl: string;
  name: keyof typeof planetOrbitalData;
  orbitPosition?: THREE.Vector3;
  orbitRotation?: THREE.Euler;
  planetPosition?: [number, number, number];
  onClick?: (position: Vector3) => void;
}

export function PlanetWithOrbit({
  modelUrl,
  name,
  orbitPosition = new THREE.Vector3(0, 0, 0),
  orbitRotation = new THREE.Euler(0, 0, 0),
  planetPosition,
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
      <Planet model={planetModel} position={planetPos} name={name} onClick={onClick} />
      <PlanetOrbit sMajor={sMajor} sMinor={sMinor} position={orbitPosition} rotation={orbitRotation} />
    </group>
  );
}
