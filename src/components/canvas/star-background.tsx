import { PointMaterial, Points } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { random } from 'maath';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export function StarBackground() {
  const ref = useRef<THREE.Points>();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 100 }));

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 300;
    ref.current.rotation.y -= delta / 350;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled>
        <PointMaterial transparent color='#f272c8' size={0.006} sizeAttenuation={true} depthWrite={true} />
      </Points>
    </group>
  );
}
