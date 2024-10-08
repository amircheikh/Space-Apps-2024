import { Line } from '@react-three/drei';
import { Euler, Vector3 } from '@react-three/fiber';
import { useState } from 'react';
import * as THREE from 'three';
import useSound from 'use-sound';
import hover from '../../../sounds/hover-1.mp3';

interface PlanetOrbitProps {
  sMajor: number;
  sMinor: number;
  position?: Vector3;
  rotation?: Euler;
  color?: string;
  hoverColor?: string;
  lineWidth?: number;
  onClick?: VoidFunction;
}

export function PlanetOrbit(props: PlanetOrbitProps) {
  const {
    sMajor,
    sMinor,
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    color = 'white',
    hoverColor = '',
    lineWidth = 2,
    onClick,
  } = props;

  const ellipseCurve = new THREE.EllipseCurve(
    0, // center X (relative to orbit center)
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

  const [currentColor, setCurrentColor] = useState(color);
  const [currentLineWidth, setCurrentLineWidth] = useState(lineWidth);

  const [playHover] = useSound(hover, { volume: 0.2 });

  return (
    <group position={position} rotation={rotation}>
      <Line points={ellipsePoints} color={currentColor} lineWidth={currentLineWidth} onClick={onClick} />

      <Line
        points={ellipsePoints}
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
