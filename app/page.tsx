'use client';

import { Space } from '@/components/canvas/space';
import { View } from '@/components/canvas/View';
import { CameraMovementContextProvider } from '@/components/provider/camera';
import { StartScreen } from '@/components/start';
import { Html, Hud } from '@react-three/drei';
import { Suspense, useState } from 'react';
import useSound from 'use-sound';
import ambience from '../src/sounds/ambience.mp3';

export default function Page() {
  const [showStartScreen, setShowStartScreen] = useState(true);

  useSound(ambience, { loop: true, autoplay: true });

  return (
    <div className='flex size-full overflow-hidden bg-black'>
      <View className='size-full overflow-hidden'>
        <CameraMovementContextProvider >
          <Suspense
            fallback={
              <Html fullscreen>
                <div className='flex size-full flex-col items-center justify-center bg-black text-textprimary'>
                  loading...
                </div>
              </Html>
            }
          >
            <Space
              showStartScreen={showStartScreen}
            />
          </Suspense>
          <Hud>
            {showStartScreen && <StartScreen onClose={() => setShowStartScreen(false)} />}
              {/* ALL 2D ELEMENTS GO HERE */}
          </Hud>
        </CameraMovementContextProvider>
      </View>
    </div>
  );
}
