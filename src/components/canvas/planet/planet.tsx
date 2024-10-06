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
  scale?: Vector3;
  onClick?: (position: Vector3) => void;
}

export function Planet(props: PlanetProps) {
  const { name, model, position, modelPosition, scale, onClick } = props;
  const starSize = 0.015;

  const groupRef = useRef<THREE.Group>();
  const shapeRef = useRef<THREE.Points>();
  const hitboxRef = useRef<THREE.Mesh>();
  const textRef = useRef<THREE.Group>();

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
      <primitive object={model.scene} scale={scale} position={modelPosition} />
      <Billboard>
        <Text ref={textRef} scale={0.1} position={[0, 0.1, 0]} anchorX='center' anchorY='middle' direction='rtl'>
          {name}
        </Text>
      </Billboard>
    </group>
  );
}
