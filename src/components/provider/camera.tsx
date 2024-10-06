import { CameraControls } from '@react-three/drei';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { Euler, Quaternion, Vector3 } from 'three';
import { PLANET_SCALES } from '../canvas/planet/constants';
import { quart } from 'maath/dist/declarations/src/easing';

interface ICameraMovementContext {
  cameraControlRef: React.MutableRefObject<CameraControls>;
  cameraDefaultRotation: Euler;
  cameraDefaultSpeed: number;
  handleResetCamera: VoidFunction;
  handleZoomCamera: (to: Vector3, scale?: number) => void;
}

export const CameraMovementContext = createContext<ICameraMovementContext>({} as ICameraMovementContext);

export function CameraMovementContextProvider(props: { children: React.ReactNode }) {
  const cameraDefaultRotation = useMemo(() => new Euler(0, 0, 0), []);
  const cameraDefaultSpeed = useMemo(() => 8, []);

  const cameraControlRef = useRef<CameraControls>();

  const handleZoomCamera = (to: Vector3, scale?: number) => {
    const finalPos = new Vector3(to.x, to.y, to.z);
    cameraControlRef.current.moveTo(finalPos.x, finalPos.y, finalPos.z, true);
    cameraControlRef.current.dollyTo(200 * scale, true);
  };

  const handleResetCamera = () => {
    cameraControlRef.current.moveTo(0, 0, 0);
    cameraControlRef.current.rotateTo(Math.atan(0.17776231976659118 / 0.7818591576087148), 2.2); // azimuthAngle, polarAngle
    cameraControlRef.current.dollyTo(2500, true);
  };

  const memoizedContext = useMemo(
    () => ({
      cameraControlRef,
      cameraDefaultRotation,
      cameraDefaultSpeed,
      handleResetCamera,
      handleZoomCamera,
    }),
    [],
  );

  return (
    <CameraMovementContext.Provider value={{ ...memoizedContext }}>{props.children}</CameraMovementContext.Provider>
  );
}

export function useCameraMovement() {
  return useContext(CameraMovementContext);
}
