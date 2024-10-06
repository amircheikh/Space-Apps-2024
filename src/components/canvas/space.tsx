import { useHorizonsRouteQuery } from '@/helpers/hooks/nasa/query';
import { useScreenSize } from '@/helpers/hooks/screen-size';
import { CameraControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { useCameraMovement } from '../provider/camera';
import { Planet } from './planet/planet';
import { StarBackground } from './star-background';

import { Vector3 } from 'three';

import { useFrame } from '@react-three/fiber';
import useSound from 'use-sound';
import click from '../../sounds/click-1.mp3';
import fly from '../../sounds/fly-1.mp3';
import { MAX_DOLLY_DISTANCE, PLANET_SCALES } from './planet/constants';
import { PlanetAndOrbit } from './planet/planet-with-orbit/planet-and-orbit';

import { onLoadable } from '@/helpers/hooks/api/query'; // Import onLoadable

export interface SpaceProps {
  showStartScreen: boolean;
  onPlanetClick: (planetName: string) => void;
}

export function Space(props: SpaceProps) {
  const sun = useGLTF('/planets/sun/scene.glb');

  const { showStartScreen, onPlanetClick } = props;

  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const { cameraControlRef, cameraDefaultRotation, handleZoomCamera } = useCameraMovement();

  const horizonDataLoadable = useHorizonsRouteQuery({ enabled: true }); // Fetch horizon data

  const screenSize = useScreenSize();
  const isSmallScreen = screenSize.width < 1280;

  const [playClick] = useSound(click, { interrupt: true });
  const [playFly] = useSound(fly, { interrupt: true });

  const handlePlanetClick = (planetName: string, position: Vector3, scale?: number) => {
    if (position) {
      playClick();
      playFly();
      handleZoomCamera(position, scale);
      onPlanetClick(planetName);
    } else {
      console.warn(`Unknown planet: ${planetName}`);
    }
  };

  useFrame(() => {
    console.log(cameraRef.current?.rotation);
  });

  return onLoadable(horizonDataLoadable)(
    () => null, // Loading state
    () => null, // Error state
    (horizonData) => (
      <group>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={[0, 0, 1]}
          rotation={cameraDefaultRotation}
          far={10000000}
        />

        <StarBackground />
        <ambientLight intensity={0.2} />
        <group>
          <CameraControls maxDistance={MAX_DOLLY_DISTANCE} ref={cameraControlRef} />

          {/* Sun */}
          <Planet
            model={sun}
            position={new Vector3(0, 0, 0)}
            scale={1} // Sun's base scale
            name='Sun'
            onClick={(pos) => handlePlanetClick('Sun', pos, PLANET_SCALES.SUN)}
          />

          <pointLight position={[0, 0, 0]} intensity={5} distance={0} decay={0} castShadow={true} />

          {/* Mercury */}
          <PlanetAndOrbit
            modelUrl='/planets/mercury/scene.glb'
            scale={0.0035} // Mercury scale: 0.0035x
            name='Mercury'
            horizonData={horizonData.data['Mercury']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Mercury', pos, PLANET_SCALES.MERCURY)}
          />

          {/* Venus */}
          <PlanetAndOrbit
            modelUrl='/planets/venus/scene.glb'
            scale={0.0087} // Venus scale: 0.0087x
            name='Venus'
            horizonData={horizonData.data['Venus']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Venus', pos, PLANET_SCALES.VENUS)}
          />

          {/* Earth */}
          <PlanetAndOrbit
            modelUrl='/planets/earth/scene.glb'
            scale={0.0092} // Earth scale: 0.0092x
            name='Earth'
            horizonData={horizonData.data['Earth']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Earth', pos, PLANET_SCALES.EARTH)}
          />

          {/* Mars */}
          <PlanetAndOrbit
            modelUrl='/planets/mars/scene.glb'
            scale={0.0049} // Mars scale: 0.0049x
            name='Mars'
            horizonData={horizonData.data['Mars']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Mars', pos, PLANET_SCALES.MARS)}
          />

          {/* Jupiter */}
          <PlanetAndOrbit
            modelUrl='/planets/jupiter/scene.glb'
            scale={0.1005} // Jupiter scale: 0.1005x
            name='Jupiter'
            horizonData={horizonData.data['Jupiter']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Jupiter', pos, PLANET_SCALES.JUPITER)}
          />

          {/* Saturn */}
          <PlanetAndOrbit
            modelUrl='/planets/saturn/scene.glb'
            scale={0.0837} // Saturn scale: 0.0837x
            name='Saturn'
            horizonData={horizonData.data['Saturn']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Saturn', pos, PLANET_SCALES.SATURN)}
          />

          {/* Uranus */}
          <PlanetAndOrbit
            modelUrl='/planets/uranus/scene.glb'
            name='Uranus'
            scale={0.0365} // Uranus scale: 0.0365x
            horizonData={horizonData.data['Uranus']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Uranus', pos, PLANET_SCALES.URANUS)}
          />

          {/* Neptune */}
          <PlanetAndOrbit
            modelUrl='/planets/neptune/scene.glb'
            scale={0.0354} // Neptune scale: 0.0354x
            name='Neptune'
            horizonData={horizonData.data['Neptune']} // Pass horizonData
            onClick={(pos) => handlePlanetClick('Neptune', pos, PLANET_SCALES.NEPTUNE)}
          />
        </group>
      </group>
    ),
  );
}
