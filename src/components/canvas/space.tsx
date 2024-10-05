import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { useCameraMovement } from '../provider/camera';
import { StarBackground } from './star-background';

import { useScreenSize } from '@/helpers/hooks/screen-size';

interface SpaceProps {
  showStartScreen: boolean;

}

export function Space(props: SpaceProps) {
  const { showStartScreen} = props;

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
      {/* PUT PLANETS HERE */}
      </group>
    </group>
  );
}
