import { Text } from '@react-three/drei';
import { ObjectMap, Vector3 } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import useSound from 'use-sound';
import click from '../../sounds/click-1.mp3';
import fly from '../../sounds/fly-1.mp3';
import hover from '../../sounds/hover-1.mp3';

interface PlanetProps {
  model?: GLTF & ObjectMap;
  position?: Vector3;
  name?: string;
  onClick?: (position: Vector3) => void;
}

export function Planet(props: PlanetProps) {
  const { name, model, position, onClick } = props;
  const starSize = 0.015;

  const groupRef = useRef<THREE.Group>();
  const shapeRef = useRef<THREE.Points>();
  const hitboxRef = useRef<THREE.Mesh>();
  const textRef = useRef<THREE.PointsMaterial>();

  const [hovered, setHovered] = useState(false);

  const [playHover] = useSound(hover);
  const [playClick] = useSound(click);
  const [playFly] = useSound(fly);

  //   useFrame((state, delta) => {
  //     const hoverEffectSpeed = 15 * delta;
  //     const hoverScale = 1.1;

  //     const time = state.clock.getElapsedTime();

  //     shapeRef.current.rotation.x = Math.sin(time) / 3;
  //     shapeRef.current.rotation.y = Math.sin(time * 0.5) / 10;
  //     shapeRef.current.rotation.z = Math.sin(time) / 10;

  //     groupRef.current.scale.x = hovered
  //       ? MathUtils.lerp(groupRef.current.scale.x, hoverScale, hoverEffectSpeed)
  //       : MathUtils.lerp(groupRef.current.scale.x, 1, hoverEffectSpeed);

  //     groupRef.current.scale.y = hovered
  //       ? MathUtils.lerp(groupRef.current.scale.y, hoverScale, hoverEffectSpeed)
  //       : MathUtils.lerp(groupRef.current.scale.y, 1, hoverEffectSpeed);

  //     groupRef.current.scale.z = hovered
  //       ? MathUtils.lerp(groupRef.current.scale.z, hoverScale, hoverEffectSpeed)
  //       : MathUtils.lerp(groupRef.current.scale.z, 1, hoverEffectSpeed);
  //   });

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
    <group ref={groupRef} position={position}>
      {/* This mesh is used as a hitbox for pointer detection */}
      <mesh
        ref={hitboxRef}
        onClick={handleClick}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      >
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial opacity={0} transparent depthWrite={false} />
      </mesh>

      <primitive object={model.scene} scale={[0.1, 0.1, 0.1]} position={[0, 0, 0]} />

      <Text ref={textRef} scale={0.1} position={[0, -0.6, 0]}>
        {name}
      </Text>
    </group>
  );
}
