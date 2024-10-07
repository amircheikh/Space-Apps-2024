import { Line } from '@react-three/drei';
import { Euler, Vector3 } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';
import useSound from 'use-sound';
import hover from '../../../sounds/hover-1.mp3';
import { PLANET_OFFSETS, ORBIT_MULTIPLIER } from './constants';

interface PlanetOrbitProps {
  name?: string;
  sMajor: number;
  sMinor: number;
  position?: Vector3;
  rotation?: Euler;
  color?: string;
  hoverColor?: string;
  lineWidth?: number;
  inclination?: number;
  longitudeOfAscendingNode?: number;
  argumentOfPeriapsis?: number;
  onClick?: VoidFunction;
}

export function PlanetOrbit(props: PlanetOrbitProps) {
  const {
    name,
    sMajor,
    sMinor,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = 'white',
    hoverColor = '',
    lineWidth = 2,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
    inclination,
    onClick,
  } = props;

  // Get the offset for the planet and multiply by ORBIT_MULTIPLIER
  const offset = PLANET_OFFSETS[name] * ORBIT_MULTIPLIER * -1;

  const ellipseCurve = new THREE.EllipseCurve(
    offset, // center X (relative to orbit center)
    0, // center Y (relative to orbit center)
    sMajor, // semi-major axis
    sMinor, // semi-minor axis
    0, // start angle
    2 * Math.PI, // end angle (full orbit)
    false, // clockwise
    0, // rotation angle
  );

  const points = ellipseCurve.getPoints(100);
  const ellipsePoints = points.map((point) => new THREE.Vector3(point.x, point.y, 0));

  const apply3DRotations = (
    points: THREE.Vector3[],
    inclination: number,
    longitudeOfAscendingNode: number,
    argumentOfPeriapsis: number,
  ) => {
    const rotationMatrix = new THREE.Matrix4();

    // Apply argument of periapsis (ω) rotation around Z-axis
    rotationMatrix.makeRotationZ(argumentOfPeriapsis);
    points.forEach((point) => point.applyMatrix4(rotationMatrix));

    // Apply inclination (i) rotation around X-axis
    rotationMatrix.makeRotationX(inclination);
    points.forEach((point) => point.applyMatrix4(rotationMatrix));

    // Apply longitude of ascending node (Ω) rotation around Z-axis
    rotationMatrix.makeRotationZ(longitudeOfAscendingNode);
    points.forEach((point) => point.applyMatrix4(rotationMatrix));

    return points;
  };

  const rotatedEllipsePoints = apply3DRotations(
    ellipsePoints,
    inclination,
    longitudeOfAscendingNode,
    argumentOfPeriapsis,
  );

  const [currentColor, setCurrentColor] = useState(color);
  const [currentLineWidth, setCurrentLineWidth] = useState(lineWidth);

  const [playHover] = useSound(hover, { volume: 0.2 });

  return (
    <group position={position} rotation={rotation}>
      <Line points={rotatedEllipsePoints} color={currentColor} lineWidth={currentLineWidth} onClick={onClick} />

      <Line
        points={rotatedEllipsePoints}
        color={currentColor}
        visible={false}
        lineWidth={lineWidth + 25}
        onPointerOver={() => {
          playHover({ playbackRate: 0.7 + Math.random() * (1.1 - 0.7) });
          setCurrentColor(hoverColor);
          setCurrentLineWidth(lineWidth + 2);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setCurrentColor(color);
          setCurrentLineWidth(lineWidth);
          document.body.style.cursor = 'auto';
        }}
        onClick={onClick}
      />
    </group>
  );
}
