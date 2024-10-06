import { CameraControls, PerspectiveCamera } from '@react-three/drei';
import { useRef } from 'react';

import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { useCameraMovement } from '../provider/camera';
import { StarBackground } from './star-background';

import { useScreenSize } from '@/helpers/hooks/screen-size';
import { Planet } from './planet/planet';
import { PlanetAndOrbitWithQuery } from './planet/planet-with-orbit/planet-and-orbit-query';
import { Vector3 } from 'three';

import { MAX_DOLLY_DISTANCE, PLANET_SCALES } from './planet/constants';
import { useFrame } from '@react-three/fiber';
import click from '../../sounds/click-1.mp3'
import fly from '../../sounds/fly-1.mp3'
import useSound from 'use-sound';

export interface SpaceProps {
  showStartScreen: boolean;
  onPlanetClick: (planetName: string) => void;
}

export function Space(props: SpaceProps) {
  const sun = useGLTF('/planets/sun/scene.glb');

  const { showStartScreen, onPlanetClick } = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const { cameraControlRef, cameraDefaultRotation, handleZoomCamera } = useCameraMovement();

  const screenSize = useScreenSize();
  const isSmallScreen = screenSize.width < 1280;

  const [playClick] = useSound(click, { interrupt: true });
  const [playFly] = useSound(fly, { interrupt: true });

  const handlePlanetClick = (planetName: string, position: Vector3, scale?: number) => {
    
    if (position) {
      playClick()
      playFly()
      handleZoomCamera(position, scale);
      onPlanetClick(planetName);
    } else {
      console.warn(`Unknown planet: ${planetName}`);
    }
  };

  useFrame(() => {
    console.log(cameraRef.current.rotation);
  });

  return (
    <group>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 0, 1]}
        rotation={cameraDefaultRotation}
        far={10000000}
      />

      <ambientLight intensity={0.5} />
      <StarBackground />

      <group>
        <CameraControls maxDistance={MAX_DOLLY_DISTANCE} ref={cameraControlRef} />

        <Planet
          model={sun}
          position={new Vector3(0, 0, 0)}
          scale={1} // Sun's base scale
          name='Sun'
          onClick={(pos) => handlePlanetClick('Sun', pos, PLANET_SCALES.SUN)}
        />

        <PlanetAndOrbitWithQuery
          modelUrl='/planets/mercury/scene.glb'
          scale={0.0035} // Mercury scale: 0.0035x
          name='Mercury'
          onClick={(pos) => handlePlanetClick('Mercury', pos, PLANET_SCALES.MERCURY)}
        />

        {/* Venus */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/venus/scene.glb'
          scale={0.0087} // Venus scale: 0.0087x
          name='Venus'
          onClick={(pos) => handlePlanetClick('Venus', pos, PLANET_SCALES.VENUS)}
        />

        {/* Earth */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/earth/scene.glb'
          scale={0.0092} // Earth scale: 0.0092x
          name='Earth'
          onClick={(pos) => handlePlanetClick('Earth', pos, PLANET_SCALES.EARTH)}
        />

        {/* Mars */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/mars/scene.glb'
          scale={0.0049} // Mars scale: 0.0049x
          name='Mars'
          onClick={(pos) => handlePlanetClick('Mars', pos, PLANET_SCALES.MARS)}
        />

        {/* Jupiter */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/jupiter/scene.glb'
          scale={0.1005}
          name='Jupiter' // Jupiter scale: 0.1005x
          onClick={(pos) => handlePlanetClick('Jupiter', pos, PLANET_SCALES.JUPITER)}
        />

        {/* Saturn */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/saturn/scene.glb'
          scale={0.0837} // Saturn scale: 0.0837x
          name='Saturn'
          onClick={(pos) => handlePlanetClick('Saturn', pos, PLANET_SCALES.SATURN)}
        />

        {/* Uranus */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/uranus/scene.glb'
          name='Uranus'
          scale={0.0365} // Uranus scale: 0.0365x
          onClick={(pos) => handlePlanetClick('Uranus', pos, PLANET_SCALES.URANUS)}
        />

        {/* Neptune */}
        <PlanetAndOrbitWithQuery
          modelUrl='/planets/neptune/scene.glb'
          scale={0.0354} // Neptune scale: 0.0354x
          name='Neptune'
          onClick={(pos) => handlePlanetClick('Neptune', pos, PLANET_SCALES.NEPTUNE)}
        />
      </group>
    </group>
  );
}
