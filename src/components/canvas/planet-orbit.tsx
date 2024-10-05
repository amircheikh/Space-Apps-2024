import { Line } from '@react-three/drei';
import { Euler, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';

interface PlanetOrbitProps {
  lRad: number;
  wRad: number;
  position?: Vector3;
  roation?: Euler;
}

export function PlanetOrbit(props: PlanetOrbitProps) {
  const { lRad, wRad, position, roation } = props;
  const ellipseCurve = new THREE.EllipseCurve(
    0, // Don't change
    0, // center of the ellipse. Don't change
    lRad,
    wRad,
    0, //IDK. Don't change
    2 * Math.PI, // start and end angles. Don't change
    false, // clockwise
    0, // Rotation. Don't change
  );
  const points = ellipseCurve.getPoints(50); // More points makes more detailed curve
  const ellipsePoints = points.map((point) => new THREE.Vector3(point.x, point.y, 0)); // Map to 3D

  return <Line position={position} rotation={roation} points={ellipsePoints} color='white' lineWidth={2} />;
}
