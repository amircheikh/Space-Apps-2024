import { Html } from '@react-three/drei';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useSound from 'use-sound';
import fly1 from '../../sounds/fly-1.mp3';
import { BaseButton } from '../button';
import { useCameraMovement } from '../provider/camera';
import { Spinner } from './spinner';

interface StartScreenProps {
  onClose?: VoidFunction;
}
export function StartScreen(props: StartScreenProps) {
  const { onClose } = props;
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);
  const { handleResetCamera } = useCameraMovement();

  const [playFly] = useSound(fly1);

  const handleClose = () => {
    if(!onClose) return;
    playFly();
    handleResetCamera();
    onClose();
  };

  useEffect(() => {
    if (onClose) {
      setTimeout(() => setBackgroundOpacity(0.8), 500);
    }
  }, []);

  return (
    <Html className='flex text-center font-semibold' fullscreen style={{ zIndex: onClose ? 10 : 0 }}>
      <div
        className='absolute w-full h-full bg-black transition-all duration-1000'
        style={{ opacity: backgroundOpacity }}
      />
      <BaseButton
        className='flex flex-col size-full z-10 items-center justify-center overflow-hidden px-4 py-24'
        onClick={handleClose}
      >
        <div className='flex flex-col space-y-2 items-center'>
          <Image src={'/spongebob-chair.png'} height={200} width={150} alt={''} />

          <div className='text-textprimary text-4xl'>Nasa Space Apps 2024</div>

          <div className='text-textprimary/40 text-xl'>Created by Team Timmy</div>
        </div>

        <div className='flex flex-row space-x-2 items-center absolute bottom-20 '>
          {!onClose && <Spinner />}
          <div className='pointer-events-none text-2xl text-textprimary/60'>
            {onClose ? 'Press anywhere to begin' : 'Loading'}
          </div>
        </div>
      </BaseButton>
    </Html>
  );
}
