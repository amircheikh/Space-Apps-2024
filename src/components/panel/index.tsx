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
      <div className=' max-h-[90%] flex flex-col rounded-2xl px-5 py-5 bg-panel/10 space-y-2 overflow-hidden'>
        <div className='h-fit text-textprimary font-medium text-start flex flex-col items-center text-3xl md:text-5xl'>
          <div className='flex flex-row w-full justify-between'>
            <div>{title}</div>
            <BaseButton onClick={handleClose} isBack={true}>
              <FontAwesomeIcon icon={faTimes} color={colors.textsecondary} size={'sm'} />
            </BaseButton>
          </div>
          <div className='w-full h-[1px] mt-4 bg-textsecondary/30' />
        </div>
        {children}
      </div>
    </Html>
  );
}
