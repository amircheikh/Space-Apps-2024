import { CameraControls } from '@react-three/drei';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import { Euler, Vector3 } from 'three';

interface ICameraMovementContext {
  cameraControlRef: React.MutableRefObject<CameraControls>;
  cameraDefaultRotation: Euler;
  cameraDefaultSpeed: number;
  handleResetCamera: VoidFunction;
  handleZoomCamera: (to: Vector3) => void;
}

export const CameraMovementContext = createContext<ICameraMovementContext>({} as ICameraMovementContext);

export function CameraMovementContextProvider(props: { children: React.ReactNode }) {
  const cameraDefaultRotation = useMemo(() => new Euler(0, 0, 0), []);
  const cameraDefaultSpeed = useMemo(() => 8, []);

  const cameraControlRef = useRef<CameraControls>();

  const handleZoomCamera = (to: Vector3) => {
    const finalPos = new Vector3(to.x, to.y, to.z);
    cameraControlRef.current.moveTo(finalPos.x, finalPos.y, finalPos.z, true);
    cameraControlRef.current.dollyTo(1, true);
  };

  const handleResetCamera = () => {
    cameraControlRef.current.moveTo(0, 0, 0);
    cameraControlRef.current.dollyTo(4, true);
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
