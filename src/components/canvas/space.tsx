import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraMovement } from '../provider/camera';
import { StarBackground } from './star-background';

import { useScreenSize } from '@/helpers/hooks/screen-size';
import { Planet } from './planet/planet';
import { PlanetWithOrbit } from './planet/planet-with-orbit';

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
  const sun = useGLTF('/planets/sun/scene.glb');

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

        <Planet
          model={sun}
          position={[0, 0, 0]}
          scale={1} // Sun's base scale
          name='Sun'
          onClick={() => handlePlanetClick('Sun')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/mercury/scene.glb'
          scale={0.0035} // Mercury scale: 0.0035x
          name='Mercury'
          onClick={() => handlePlanetClick('Mercury')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/venus/scene.glb'
          scale={0.0087} // Venus scale: 0.0087x
          name='Venus'
          onClick={() => handlePlanetClick('Venus')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/earth/scene.glb'
          scale={0.0092} // Earth scale: 0.0092x
          name='Earth'
          onClick={() => handlePlanetClick('Earth')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/mars/scene.glb'
          scale={0.0049} // Mars scale: 0.0049x
          name='Mars'
          onClick={() => handlePlanetClick('Mars')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/jupiter/scene.glb'
          scale={0.1005} // Jupiter scale: 0.1005x
          name='Jupiter'
          onClick={() => handlePlanetClick('Jupiter')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/saturn/scene.glb'
          scale={0.0837} // Saturn scale: 0.0837x
          name='Saturn'
          onClick={() => handlePlanetClick('Saturn')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/uranus/scene.glb'
          scale={0.0365} // Uranus scale: 0.0365x
          name='Uranus'
          onClick={() => handlePlanetClick('Uranus')}
        />

        <PlanetWithOrbit
          modelUrl='/planets/neptune/scene.glb'
          scale={0.0354} // Neptune scale: 0.0354x
          name='Neptune'
          onClick={() => handlePlanetClick('Neptune')}
        />
      </group>
    </group>
  );
}
