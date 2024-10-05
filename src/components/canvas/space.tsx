import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MathUtils } from 'three';
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
  const { showStartScreen } = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();

  const { cameraInitialPos, cameraDefaultRotation, targetPosition, targetRotation, cameraSpeed, handleZoomCamera } =
    useCameraMovement();

  const screenSize = useScreenSize();
  const isSmallScreen = screenSize.width < 1280;

  useFrame((_, delta) => {
    if (!cameraRef.current) return;
    cameraRef.current.position.lerp(targetPosition, cameraSpeed * delta);

    cameraRef.current.rotation.x = MathUtils.lerp(cameraRef.current.rotation.x, targetRotation.x, cameraSpeed * delta);
    cameraRef.current.rotation.y = MathUtils.lerp(cameraRef.current.rotation.y, targetRotation.y, cameraSpeed * delta);
    cameraRef.current.rotation.z = MathUtils.lerp(cameraRef.current.rotation.z, targetRotation.z, cameraSpeed * delta);
  });

  return (
    <group>
      <PerspectiveCamera ref={cameraRef} makeDefault position={cameraInitialPos} rotation={cameraDefaultRotation} />
      <ambientLight intensity={0.5} />
      <StarBackground />

      <group visible={!showStartScreen}>
        <OrbitControls />
        {/* PUT PLANETS HERE */}
        <Planet model={sun} position={[0, 0, 0]} name='Sun' onClick={handleZoomCamera} />
        <Planet model={mercury} position={[0, 1, 0]} name='Mercury' onClick={handleZoomCamera} />
        <Planet model={venus} position={[0, 2, 0]} name='Venus' onClick={handleZoomCamera} />
        <Planet model={earth} position={[0, 3, 0]} name='Earth' onClick={handleZoomCamera} />

        <primitive object={sun.scene} scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]} />
        <PlanetOrbit lRad={2} wRad={2} roation={[2, 0, 0]} />
      </group>
    </group>
  );
}
