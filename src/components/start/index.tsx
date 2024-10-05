import { Html } from '@react-three/drei';
import useSound from 'use-sound';
import fly1 from '../../sounds/fly-1.mp3';
import { BaseButton } from '../button';
import { useCameraMovement } from '../provider/camera';

export function StartScreen(props: { onClose: VoidFunction }) {
  const { onClose } = props;

  const { handleResetCamera } = useCameraMovement();

  const [playFly] = useSound(fly1);

  const handleClose = () => {
    playFly();
    handleResetCamera();
    onClose();
  };

  return (
    <Html className='text-center text-3xl font-medium text-textprimary md:text-4xl' fullscreen>
      <BaseButton
        className='flex size-full items-end justify-center overflow-hidden px-4 py-24'
        onClick={handleClose}
      >
        <div className='pointer-events-none'>Press anywhere to begin</div>
      </BaseButton>
    </Html>
  );
}
