'use client';

import { Header } from '@/components/canvas/Header';
import { Space } from '@/components/canvas/space';
import { View } from '@/components/canvas/View';
import { Panel } from '@/components/panel';
import { CameraMovementContextProvider } from '@/components/provider/camera';
import { StartScreen } from '@/components/start';
import { Hud } from '@react-three/drei';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState } from 'react';
import useSound from 'use-sound';
import ambience from '../src/sounds/ambience.mp3';

export default function Page() {
  const [showStartScreen, setShowStartScreen] = useState(true);
  const [selectedPlanet, setSelectedPlanet] = useState<string | null>(null);

  useSound(ambience, { loop: true, autoplay: true });
  const queryClient = new QueryClient();

  const handleShowPanel = (planetName: string) => {
    switch (planetName) {
      case 'Sun':
      case 'Mercury':
      case 'Venus':
      case 'Earth':
      case 'Mars':
      case 'Jupiter':
      case 'Saturn':
      case 'Uranus':
      case 'Neptune':
        setSelectedPlanet(planetName);
        break;
      default:
        console.warn(`Unknown planet: ${planetName}`);
    }
  };

  const handleClosePanel = () => {
    setSelectedPlanet(null);
  };

  return (
    <div className='flex size-full overflow-hidden bg-black'>
      {!showStartScreen && (
        <div className='absolute top-0 z-10 w-full'>
          <Header />
        </div>
      )}

      <View className='size-full overflow-hidden'>
        <QueryClientProvider client={queryClient}>
          <CameraMovementContextProvider>
            <Suspense fallback={<StartScreen />}>
              <Space showStartScreen={showStartScreen} onPlanetClick={handleShowPanel} />
            
            <Hud>
              {showStartScreen && <StartScreen onClose={() => setShowStartScreen(false)} />}
              {selectedPlanet && <Panel selectedPlanet={selectedPlanet} onClose={handleClosePanel} />}
            </Hud>
            </Suspense>
          </CameraMovementContextProvider>
        </QueryClientProvider>
      </View>
    </div>
  );
}
