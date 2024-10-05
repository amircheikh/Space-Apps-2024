import { PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MathUtils, Vector3 } from 'three';
import { useCameraMovement } from '../provider/camera';
import { FaceSquare } from './face';
import { StarBackground } from './star-background';
import image1 from './star-image-templates/image-1.png';
import image2 from './star-image-templates/image-2.png';
import image3 from './star-image-templates/image-3.png';
import image4 from './star-image-templates/image-4.png';

import { useScreenSize } from '@/helpers/hooks/screen-size';
import { StarShape } from './star-shape';

interface SpaceProps {
  showStartScreen: boolean;
  onClickAbout: VoidFunction;
  onClickExperience: VoidFunction;
  onClickProjects: VoidFunction;
  onClickResume: VoidFunction;
}

export function Space(props: SpaceProps) {
  const { showStartScreen, onClickAbout, onClickExperience, onClickProjects, onClickResume } = props;

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

  const handleClickAbout = (position: Vector3) => {
    handleZoomCamera(position);
    onClickAbout();
  };

  const handleClickExperience = (position: Vector3) => {
    handleZoomCamera(position);
    onClickExperience();
  };

  const handleClickProjects = (position: Vector3) => {
    handleZoomCamera(position);
    onClickProjects();
  };

  const handleClickResume = () => {
    onClickResume();
  };

  return (
    <group>
      <PerspectiveCamera ref={cameraRef} makeDefault position={cameraInitialPos} rotation={cameraDefaultRotation} />
      <ambientLight intensity={0.5} />

      <StarBackground />
      <FaceSquare position={isSmallScreen ? [0, 0, -4] : [0, 0, -2]} />

      <group visible={!showStartScreen}>
        <StarShape
          image={image1}
          position={isSmallScreen ? [-1, 0, -3] : [-3, 0, -1]}
          text='About'
          onClick={handleClickAbout}
        />
        <StarShape
          image={image2}
          position={isSmallScreen ? [0, 2, -3] : [0, 1.5, -1]}
          text='Experience'
          onClick={handleClickExperience}
        />
        <StarShape
          image={image3}
          position={isSmallScreen ? [1, 0, -3] : [3, 0, -1]}
          text='Projects'
          onClick={handleClickProjects}
        />
        <StarShape
          image={image4}
          position={isSmallScreen ? [0, -2, -3] : [0, -1.5, -1]}
          text='Resume'
          onClick={handleClickResume}
        />
      </group>
    </group>
  );
}
