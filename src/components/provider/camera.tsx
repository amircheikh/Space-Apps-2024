import React, { createContext, useContext, useMemo, useState } from 'react';
import { Euler, Vector3 } from 'three';

interface ICameraMovementContext {
  cameraInitialPos: Vector3;
  cameraDefaultPos: Vector3;
  cameraDefaultRotation: Euler;
  cameraDefaultSpeed: number;
  targetPosition: Vector3;
  targetRotation: Euler;
  cameraSpeed: number;
  setTargetPosition: (pos: Vector3) => void;
  setTargetRotation: (rot: Euler) => void;
  setCameraSpeed: (speed: number) => void;
  handleResetCamera: VoidFunction;
  handleZoomCamera: (to: Vector3) => void;
}

export const CameraMovementContext = createContext<ICameraMovementContext>({} as ICameraMovementContext);

export function CameraMovementContextProvider(props: { children: React.ReactNode }) {
  //Initial pos is the starting position when zoomed in on face
  const cameraInitialPos = useMemo(() => new Vector3(0, 0, 0), []);

  //Default pos is the position that shows all icons. Zoomed out from face
  const cameraDefaultPos = useMemo(() => new Vector3(0, 0, 4), []);
  const cameraDefaultRotation = useMemo(() => new Euler(0, 0, 0), []);
  const cameraDefaultSpeed = useMemo(() => 8, []);

  const [targetPosition, setTargetPosition] = useState(cameraInitialPos);
  const [targetRotation, setTargetRotation] = useState(cameraDefaultRotation);
  const [cameraSpeed, setCameraSpeed] = useState(cameraDefaultSpeed);

  const handleZoomCamera = (to: Vector3) => {
    const finalPos = new Vector3(to.x, to.y, to.z + 3);

    setCameraSpeed(3);
    setTargetRotation(new Euler(0, 0, -0.2));
    setTargetPosition(new Vector3(0, 0, cameraDefaultPos.z + 4));

    setTimeout(() => {
      setCameraSpeed(cameraDefaultSpeed);
      setTargetPosition(finalPos);
      setTargetRotation(cameraDefaultRotation);
    }, 150);
  };

  const handleResetCamera = () => {
    setCameraSpeed(cameraDefaultSpeed);
    setTargetPosition(cameraDefaultPos);
    setTargetRotation(cameraDefaultRotation);
  };

  const memoizedContext = useMemo(
    () => ({
      cameraInitialPos,
      cameraDefaultPos,
      cameraDefaultRotation,
      cameraDefaultSpeed,
      setTargetPosition,
      setTargetRotation,
      setCameraSpeed,
      handleResetCamera,
      handleZoomCamera,
    }),
    [],
  );

  return (
    <CameraMovementContext.Provider value={{ targetPosition, targetRotation, cameraSpeed, ...memoizedContext }}>
      {props.children}
    </CameraMovementContext.Provider>
  );
}

export function useCameraMovement() {
  return useContext(CameraMovementContext);
}
