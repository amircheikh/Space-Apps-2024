import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraMovement } from '../provider/camera';
import { StarBackground } from './star-background';

import { useScreenSize } from '@/helpers/hooks/screen-size';
import { Planet } from './planet/planet';
import { PlanetWithOrbit } from './planet/planet-with-orbit';

interface SpaceProps {
  showStartScreen: boolean;
}

export function Space(props: SpaceProps) {
  const sun = useGLTF('/planets/sun/scene.gltf');

  const { showStartScreen } = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const { cameraControlRef, cameraDefaultRotation, handleZoomCamera } = useCameraMovement();

  const screenSize = useScreenSize();
  const isSmallScreen = screenSize.width < 1280;

  return (
    <group>
      <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 1]} rotation={cameraDefaultRotation} />

      <ambientLight intensity={0.5} />
      <StarBackground />

      <group visible={!showStartScreen}>
        <CameraControls ref={cameraControlRef} />

        {/* Sun */}
        <Planet model={sun} position={[0, 0, 0]} scale={[0.1, 0.1, 0.1]} name='Sun' onClick={handleZoomCamera} />

        {/* Mercury */}
        <PlanetWithOrbit
          modelUrl='/planets/mercury/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Mercury'
          onClick={handleZoomCamera}
        />

        {/* Venus */}
        <PlanetWithOrbit
          modelUrl='/planets/venus/scene.glb'
          scale={[0.1, 0.1, 0.1]}
          name='Venus'
          onClick={handleZoomCamera}
        />

        {/* Earth */}
        <PlanetWithOrbit
          modelUrl='/planets/earth/scene.glb'
          scale={[0.1, 0.1, 0.1]}
          name='Earth'
          onClick={handleZoomCamera}
        />

        {/* Mars */}
        <PlanetWithOrbit
          modelUrl='/planets/mars/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Mars'
          onClick={handleZoomCamera}
        />

        {/* Jupiter */}
        <PlanetWithOrbit
          modelUrl='/planets/jupiter/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Jupiter'
          onClick={handleZoomCamera}
        />

        {/* Saturn */}
        <PlanetWithOrbit
          modelUrl='/planets/saturn/scene.gltf'
          scale={[0.1, 0.1, 0.1]}
          name='Saturn'
          onClick={handleZoomCamera}
        />

        {/* Uranus */}
        <PlanetWithOrbit
          modelUrl='/planets/uranus/scene.gltf'
          name='Uranus'
          scale={[0.1, 0.1, 0.1]}
          onClick={handleZoomCamera}
        />

        {/* Neptune */}
        <PlanetWithOrbit
          modelUrl='/planets/neptune/scene.glb'
          name='Neptune'
          scale={[0.1, 0.1, 0.1]}
          onClick={handleZoomCamera}
        />
      </group>
    </group>
  );
}
