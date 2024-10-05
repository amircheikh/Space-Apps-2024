'use client';

import { Three } from '@/helpers/components/Three';
import { OrbitControls, View as ViewImpl } from '@react-three/drei';
import { forwardRef, useImperativeHandle, useRef } from 'react';

const View = forwardRef(({ children, orbit, ...props }: any, ref) => {
  const localRef = useRef(null);
  useImperativeHandle(ref, () => localRef.current);

  return (
    <>
      <div ref={localRef} {...props} />
      <Three>
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </Three>
    </>
  );
});
View.displayName = 'View';

export { View };
