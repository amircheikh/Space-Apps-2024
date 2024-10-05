import { useFrame, useLoader, Vector3 } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

interface FaceSquareProps {
  position?: Vector3;
}
export function FaceSquare(props: FaceSquareProps) {
  const { position } = props;

  const texture = useLoader(THREE.TextureLoader, '/face.png');
  const meshRef = useRef<THREE.Mesh>();

  useFrame((state) => {
    meshRef.current.rotation.y = state.clock.elapsedTime;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <hemisphereLight intensity={1} groundColor='black' />
      <pointLight intensity={0} />
      <boxGeometry args={[1, 1, 0.05]} />

      <meshStandardMaterial attach='material-4' map={texture} />
      <meshStandardMaterial attach='material-5' map={texture} />
    </mesh>
  );
}
