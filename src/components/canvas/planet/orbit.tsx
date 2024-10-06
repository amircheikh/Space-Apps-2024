import { Line } from '@react-three/drei';
import { Euler, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { useState } from 'react';

interface PlanetOrbitProps {
  sMajor: number;
  sMinor: number;
  position?: Vector3;
  rotation?: Euler;
  color?: string;
  hoverColor?: string;
  lineWidth?: number;
  onClick?: () => void;
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

  // Define the elliptical orbit path
  const ellipseCurve = new THREE.EllipseCurve(
    0, // center X (relative to orbit center)
    0, // center Y (relative to orbit center)
    sMajor, // semi-major axis
    sMinor, // semi-minor axis
    0, // start angle
    2 * Math.PI, // end angle (full orbit)
    false, // clockwise
    0 // rotation angle
  );

  const points = ellipseCurve.getPoints(50);
  const ellipsePoints = points.map((point) => new THREE.Vector3(point.x, point.y, 0));

  const [currentColor, setCurrentColor] = useState(color);
  const [currentLineWidth, setCurrentLineWidth] = useState(lineWidth);

  return (
    <group>
      <Line
        position={position}
        rotation={rotation}
        points={ellipsePoints}
        color={currentColor}
        lineWidth={currentLineWidth} 
        onClick={onClick}
      />

      <Line
        position={position}
        rotation={rotation}
        points={ellipsePoints}
        color={currentColor}
        visible={false} 
        lineWidth={lineWidth + 25} 
        onPointerOver={() => {
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
