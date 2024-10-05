import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraMovement } from '../provider/camera';
import { Planet } from './Planet';
import { StarBackground } from './star-background';

import { useScreenSize } from '@/helpers/hooks/screen-size';
import { PlanetOrbit } from './planet-orbit';

interface SpaceProps {
  showStartScreen: boolean;
}

export function Space(props: SpaceProps) {
  const sun = useGLTF('/planets/sun/scene.gltf');
  const mercury = useGLTF('/planets/mercury/scene.gltf');
  const venus = useGLTF('/planets/venus/scene.gltf');
  const earth = useGLTF('/planets/earth/scene.gltf');
  const mars = useGLTF('/planets/mars/scene.gltf');
  const jupiter = useGLTF('/planets/jupiter/scene.gltf');
  const saturn = useGLTF('/planets/saturn/scene.gltf');
  const uranus = useGLTF('/planets/uranus/scene.gltf');
  const neptune = useGLTF('/planets/neptune/scene.gltf');

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
        {/* PUT PLANETS HERE */}
        <CameraControls ref={cameraControlRef} />
        <Planet model={sun} position={[0, 0, 0]} name='Sun' onClick={handleZoomCamera} />
        <Planet model={mercury} position={[0, 1, 0]} name='Mercury' onClick={handleZoomCamera} />
        <Planet model={venus} position={[0, 2, 0]} name='Venus' onClick={handleZoomCamera} />
        <Planet model={earth} position={[0, 3, 0]} name='Earth' onClick={handleZoomCamera} />
        <Planet model={mars} position={[0, 4, 0]} name='Mars' onClick={handleZoomCamera} />
        <Planet model={jupiter} position={[0, 5, 0]} name='Jupiter' onClick={handleZoomCamera} />
        <Planet model={saturn} position={[0, 6, 0]} name='Saturn' onClick={handleZoomCamera} />
        <Planet model={uranus} position={[0, 7, 0]} name='Uranus' onClick={handleZoomCamera} />
        <Planet model={neptune} position={[0, 8, 0]} name='Neptune' onClick={handleZoomCamera} />

        <PlanetOrbit lRad={2} wRad={2} roation={[2, 0, 0]} />
      </group>
    </group>
  );
}
