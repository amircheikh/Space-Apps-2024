import { Billboard, Text } from '@react-three/drei';
import { ObjectMap, useFrame, Vector3 } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';
import { GLTF } from 'three-stdlib';
import useSound from 'use-sound';
import click from '../../../sounds/click-1.mp3';
import fly from '../../../sounds/fly-1.mp3';
import hover from '../../../sounds/hover-1.mp3';

interface PlanetProps {
  model?: GLTF & ObjectMap;
  position?: Vector3;
  name?: string;
  modelPosition?: Vector3;
  scale?: number;
  onClick?: (position: Vector3) => void;
}

const MAX_VISIBLE_DISTANCE = 2000; // CHANGE THIS LATER
const MIN_VISIBLE_DISTANCE = 100; // CHANGE THIS LATER

export function Planet(props: PlanetProps) {
  const { name, model, position, modelPosition, scale, onClick } = props;
  const starSize = 0.015;

  const groupRef = useRef<THREE.Group>();
  const shapeRef = useRef<THREE.Points>();
  const hitboxRef = useRef<THREE.Mesh>();
  const textRef = useRef<THREE.Group>();
  const circleRef = useRef<THREE.Mesh>();

  const [hovered, setHovered] = useState(false);

  const [playHover] = useSound(hover);
  const [playClick] = useSound(click, { interrupt: true });
  const [playFly] = useSound(fly, { interrupt: true });

  useFrame((state, delta) => {
    const hoverEffectSpeed = 15 * delta;
    const hoverScale = 1.1;

    //Use for autorotation
    // const time = state.clock.getElapsedTime();
    // shapeRef.current.rotation.x = Math.sin(time) / 3;
    // shapeRef.current.rotation.y = Math.sin(time * 0.5) / 10;
    // shapeRef.current.rotation.z = Math.sin(time) / 10;

    groupRef.current.scale.x = hovered
      ? MathUtils.lerp(groupRef.current.scale.x, hoverScale, hoverEffectSpeed)
      : MathUtils.lerp(groupRef.current.scale.x, 1, hoverEffectSpeed);

    groupRef.current.scale.y = hovered
      ? MathUtils.lerp(groupRef.current.scale.y, hoverScale, hoverEffectSpeed)
      : MathUtils.lerp(groupRef.current.scale.y, 1, hoverEffectSpeed);

    groupRef.current.scale.z = hovered
      ? MathUtils.lerp(groupRef.current.scale.z, hoverScale, hoverEffectSpeed)
      : MathUtils.lerp(groupRef.current.scale.z, 1, hoverEffectSpeed);

    const distance = state.camera.position.distanceTo(textRef.current.position);
    textRef.current.scale.setScalar(distance * 0.03);
    circleRef.current.scale.setScalar(distance * 0.01);

    const adjustedMaxDistance = MAX_VISIBLE_DISTANCE * scale;
    const adjustedMinDistance = MIN_VISIBLE_DISTANCE * scale;
    const isRingVisible = distance <= adjustedMaxDistance && distance >= adjustedMinDistance;
    const isTextVisible = distance <= adjustedMaxDistance && distance >= adjustedMinDistance;

    textRef.current.visible = isTextVisible;
    circleRef.current.visible = isRingVisible;
    // textRef.current.size =
  });

  const handlePointerEnter = () => {
    playHover({ playbackRate: 0.7 + Math.random() * (1.1 - 0.7) });
    setHovered(true);
  };

  const handlePointerLeave = () => {
    setHovered(false);
  };

  const handleClick = () => {
    playClick();
    playFly();
    onClick(groupRef.current.position);
  };

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <primitive object={model.scene} scale={[0.01 * scale, 0.01 * scale, 0.01 * scale]} position={modelPosition} />
      <Billboard>
        <Text
          ref={textRef}
          scale={0.1}
          position={[5 * scale, 6 * scale, 0]}
          anchorX='left'
          anchorY='top'
          font='/Montserrat-SemiBold.ttf'
          fontWeight='medium'
        >
          {name.toUpperCase()}
        </Text>

        <mesh ref={circleRef} position={[0, 0, 0]} scale={0.1}>
          <ringGeometry args={[1, 1.1, 64]} />
          <meshBasicMaterial color='white' side={THREE.DoubleSide} />
        </mesh>
      </Billboard>
    </group>
  );
}
