import { colors } from '@/constants/colors';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Html } from '@react-three/drei';
import React, { useEffect, useState } from 'react';
import { BaseButton } from '../button';
import { useCameraMovement } from '../provider/camera';

interface PanelProps {
  title?: string;
  children?: React.ReactNode;
  onClose?: VoidFunction;
}

export function Panel(props: PanelProps) {
  const { title, children, onClose } = props;

  const [opacity, setOpacity] = useState(0);

  const { handleResetCamera } = useCameraMovement();

  const handleEntrance = () => {
    setTimeout(() => setOpacity(1), 400);
  };

  const handleClose = () => {
    handleResetCamera();
    onClose();
  };

  useEffect(() => {
    handleEntrance();
  }, []);

  return (
    <Html
      className='flex items-center justify-center overflow-hidden backdrop-blur-md transition-all duration-1000 '
      style={{ opacity }}
      fullscreen
    >
      <div className=' flex max-h-[90%] flex-col space-y-2 overflow-hidden rounded-2xl bg-panel/10 p-5'>
        <div className='flex h-fit flex-col items-center text-start text-3xl font-medium text-textprimary md:text-5xl'>
          <div className='flex w-full flex-row justify-between'>
            <div>{title}</div>
            <BaseButton onClick={handleClose} isBack={true}>
              <FontAwesomeIcon icon={faTimes} color={colors.textsecondary} size={'sm'} />
            </BaseButton>
          </div>
          <div className='mt-4 h-px w-full bg-textsecondary/30' />
        </div>
        {children}
      </div>
    </Html>
  );
}
