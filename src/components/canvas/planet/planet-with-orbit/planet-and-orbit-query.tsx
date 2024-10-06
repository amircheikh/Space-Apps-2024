import { onLoadable } from '@/helpers/hooks/api/query';
import { useHorizonsRouteQuery } from '@/helpers/hooks/nasa/query';
import { Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { PlanetAndOrbit } from './planet-and-orbit';
import { PlanetEnum, planetOrbitalData } from './types';

export interface PlanetAndOrbitPropsWithQuery {
  modelUrl: string;
  name: keyof typeof planetOrbitalData;
  orbitPosition?: THREE.Vector3;
  orbitRotation?: THREE.Euler;
  modelPosition?: Vector3;
  scale?: Vector3;
  onClick?: (position: Vector3) => void;
}

export function PlanetAndOrbitWithQuery({
  modelUrl,
  name,
  orbitPosition = new THREE.Vector3(0, 0, 0),
  orbitRotation = new THREE.Euler(0, 0, 0),
  modelPosition,
  scale,
  onClick,
}: PlanetAndOrbitPropsWithQuery) {
  const input = {
    COMMAND: PlanetEnum[name],
    CENTER: '500@10',
    START_TIME: '2024-10-01',
    STOP_TIME: '2024-10-02',
    STEP_SIZE: '1 d',
  };

  const horizonData = useHorizonsRouteQuery(input, { enabled: true });

  return onLoadable(horizonData)(
    () => null,
    () => null,
    (horizonData) => (
      <PlanetAndOrbit
        modelUrl={modelUrl}
        name={name}
        horizonData={horizonData}
        orbitPosition={orbitPosition}
        orbitRotation={orbitRotation}
        modelPosition={modelPosition}
        scale={scale}
        onClick={onClick}
      />
    ),
  );
}
