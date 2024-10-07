import { PointMaterial, Points } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { random } from 'maath';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { MAX_DOLLY_DISTANCE, MIN_RADIUS } from './planet/constants';

export function StarBackground() {
  const ref = useRef<THREE.Points>();
  const [sphere] = useState(() => {
    const positions = new Float32Array(5001 * 3); // 5001 points, each with x, y, z
    let index = 0;

    while (index < positions.length) {
      const point = random.inSphere(new Float32Array(3), { radius: MAX_DOLLY_DISTANCE });
      const distance = Math.sqrt(point[0] ** 2 + point[1] ** 2 + point[2] ** 2);

      if (distance >= MIN_RADIUS) {
        positions[index] = point[0];
        positions[index + 1] = point[1];
        positions[index + 2] = point[2];
        index += 3;
      }
    }

    return positions;
  });

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 300;
    ref.current.rotation.y -= delta / 350;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere as Float32Array} stride={3} frustumCulled>
        <PointMaterial transparent color='#f272c8' size={0.1} sizeAttenuation={true} depthWrite={true} />
      </Points>
    </group>
  );
}
