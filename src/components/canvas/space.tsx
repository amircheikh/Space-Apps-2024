import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraMovement } from '../provider/camera';
import { StarBackground } from './star-background';

import { useScreenSize } from '@/helpers/hooks/screen-size';
import { Planet } from './planet/planet';
import { PlanetAndOrbitWithQuery } from './planet/planet-with-orbit/planet-and-orbit-query';

export interface SpaceProps {
  showStartScreen: boolean;
  onPlanetClick: (planetName: string) => void;
}

const planetPositions: { [key: string]: THREE.Vector3 } = {
  Sun: new THREE.Vector3(0, 0, 0),
  Mercury: new THREE.Vector3(0, 1, 0),
  Venus: new THREE.Vector3(0, 2, 0),
  Earth: new THREE.Vector3(0, 3, 0),
  Mars: new THREE.Vector3(0, 4, 0),
  Jupiter: new THREE.Vector3(0, 5, 0),
  Saturn: new THREE.Vector3(0, 6, 0),
  Uranus: new THREE.Vector3(0, 7, 0),
  Neptune: new THREE.Vector3(0, 8, 0),
};

export function Space(props: SpaceProps) {
  const sun = useGLTF('/planets/sun/scene.gltf');

  const { showStartScreen, onPlanetClick } = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const { cameraControlRef, cameraDefaultRotation, handleZoomCamera } = useCameraMovement();

  const screenSize = useScreenSize();
  const isSmallScreen = screenSize.width < 1280;

  const handlePlanetClick = (planetName: string) => {
    const position = planetPositions[planetName];
    if (position) {
      handleZoomCamera(position);
      onPlanetClick(planetName);
    } else {
      console.warn(`Unknown planet: ${planetName}`);
    }
  };

  return (
    <group>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 1]} rotation={cameraDefaultRotation} />

      <ambientLight intensity={0.5} />
      <StarBackground />

      <group visible={!showStartScreen}>
        <CameraControls ref={cameraControlRef} />

        {/* Sun */}
        <Planet
          model={sun}
          position={[0, 0, 0]}
          scale={[0.01, 0.01, 0.01]}
          name='Sun'
          onClick={() => handlePlanetClick('Sun')}
        />

        <PlanetAndOrbitWithQuery
          modelUrl='/planets/mercury/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Mercury'
          onClick={() => handlePlanetClick('Mercury')}
        />

        {/* Venus */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/venus/scene.glb'
          scale={[0.1, 0.1, 0.1]}
          name='Venus'
          onClick={() => handlePlanetClick('Venus')}
        />

        {/* Earth */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/earth/scene.glb'
          scale={[0.1, 0.1, 0.1]}
          name='Earth'
          onClick={() => handlePlanetClick('Earth')}
        />

        {/* Mars */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/mars/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Mars'
          onClick={() => handlePlanetClick('Mars')}
        />

        {/* Jupiter */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/jupiter/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Jupiter'
          onClick={() => handlePlanetClick('Jupiter')}
        />

        {/* Saturn */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/saturn/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Saturn'
          onClick={() => handlePlanetClick('Saturn')}
        />

        {/* Uranus */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/uranus/scene.gltf'
          name='Uranus'
          scale={[0.001, 0.001, 0.001]}
          onClick={() => handlePlanetClick('Uranus')}
        />

        {/* Neptune */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/neptune/scene.glb'
          name='Neptune'
          scale={[0.001, 0.001, 0.001]}
          onClick={() => handlePlanetClick('Neptune')}
        />
      </group>
    </group>
  );
}
