import { colors } from '@/constants/colors';
import { PointMaterial, Points, Text } from '@react-three/drei';
import { useFrame, Vector3 } from '@react-three/fiber';
import { StaticImageData } from 'next/image';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MathUtils } from 'three';
import useSound from 'use-sound';
import click from '../../sounds/click-1.mp3';
import fly from '../../sounds/fly-1.mp3';
import hover from '../../sounds/hover-1.mp3';

interface StarShapeProps {
  image: StaticImageData;
  position?: Vector3;
  text?: string;
  onClick?: (position: Vector3) => void;
}

function convertImageToVertices(imageSrc: string, threshold = 128) {
  return new Promise<Float32Array>((resolve) => {
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const data = imageData.data;

      const vertices = [];
      for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
          const index = (y * img.width + x) * 4;
          const alpha = data[index + 3];

          if (alpha > threshold) {
            const xPos = x / img.width - 0.5;
            const yPos = y / img.height - 0.5;
            vertices.push(xPos, -yPos, 0);
          }
        }
      }
      resolve(new Float32Array(vertices));
    };
  });
}

export function StarShape(props: StarShapeProps) {
  const { image, position, text, onClick } = props;
  const starSize = 0.015;

  const groupRef = useRef<THREE.Group>();
  const shapeRef = useRef<THREE.Points>();
  const starMaterialRef = useRef<THREE.PointsMaterial>();
  const hitboxRef = useRef<THREE.Mesh>();
  const textRef = useRef<THREE.PointsMaterial>();

  const [points, setPoints] = useState<Float32Array>();
  const [hovered, setHovered] = useState(false);
  const [textColor] = useState(new THREE.Color(colors.textsecondary));

  const [playHover] = useSound(hover);
  const [playClick] = useSound(click);
  const [playFly] = useSound(fly);

  useEffect(() => {
    const loadImage = async () => {
      convertImageToVertices(image.src).then((vertices) => {
        setPoints(vertices);
      });
    };
    loadImage();
  }, []);

  useFrame((state, delta) => {
    const hoverEffectSpeed = 15 * delta;
    const hoverScale = 1.1;

    const time = state.clock.getElapsedTime();
    const twinkleFactor = starSize + 0.001 * Math.sin(time * 2);

    shapeRef.current.rotation.x = Math.sin(time) / 3;
    shapeRef.current.rotation.y = Math.sin(time * 0.5) / 10;
    shapeRef.current.rotation.z = Math.sin(time) / 10;

    groupRef.current.scale.x = hovered
      ? MathUtils.lerp(groupRef.current.scale.x, hoverScale, hoverEffectSpeed)
      : MathUtils.lerp(groupRef.current.scale.x, 1, hoverEffectSpeed);

    groupRef.current.scale.y = hovered
      ? MathUtils.lerp(groupRef.current.scale.y, hoverScale, hoverEffectSpeed)
      : MathUtils.lerp(groupRef.current.scale.y, 1, hoverEffectSpeed);

    groupRef.current.scale.z = hovered
      ? MathUtils.lerp(groupRef.current.scale.z, hoverScale, hoverEffectSpeed)
      : MathUtils.lerp(groupRef.current.scale.z, 1, hoverEffectSpeed);

    starMaterialRef.current.size = twinkleFactor;

    const targetColor = hovered ? new THREE.Color(colors.textprimary) : new THREE.Color(colors.textsecondary);
    textColor.lerp(targetColor, 0.2);
    textRef.current.color = textColor;
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

      <Points ref={shapeRef} positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={starMaterialRef}
          transparent
          color={colors.star}
          size={starSize}
          sizeAttenuation={true}
          depthWrite={true}
        />
      </Points>
      <Text ref={textRef} scale={0.1} position={[0, -0.6, 0]}>
        {text}
      </Text>
    </group>
  );
}
