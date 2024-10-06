import { colors } from '@/constants/colors';
import solarSystemData from '@/data/solarSystem.json';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Html } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { BaseButton } from '../button';
import { useCameraMovement } from '../provider/camera';

interface PanelProps {
  onClose?: VoidFunction;
  selectedPlanet: string;
}

export function Panel(props: PanelProps) {
  const { onClose, selectedPlanet } = props;
  const [opacity, setOpacity] = useState(0);
  const { handleResetCamera } = useCameraMovement();

  const handleEntrance = () => {
    setTimeout(() => setOpacity(1), 400);
  };

  const handleClose = () => {
    handleResetCamera();
    onClose?.();
  };

  useEffect(() => {
    handleEntrance();
  }, []);

  const celestialBody = solarSystemData.solarSystem.find(
    (body) => body.name.toLowerCase() === selectedPlanet.toLowerCase()
  );

  const planetColors = {
    Sun: '#f7f4df',
    Mercury: '#9768ac', 
    Venus: '#b07919',  
    Earth: '#09c',  
    Mars: '#9a4e19',   
    Jupiter: '#da8b72', 
    Saturn: '#d5c187', 
    Uranus: '#68ccda', 
    Neptune: '#708ce3', 
  };

  const planetColor = planetColors[selectedPlanet] || colors.textsecondary;

  return (
    <Html
      className='flex items-center justify-start transition-opacity duration-1000 ease-in-out pl-10'
      style={{ opacity }}
      fullscreen
    >
      <div
        className={`relative flex flex-col space-y-6 h-[80vh] w-[50vw] max-w-sm p-6 rounded-2xl border-1.2 transition-colors duration-500 bg-black bg-opacity-60`}
        style={{
          borderColor: planetColor,
          boxShadow: `0 0 5px ${planetColor}`,
        }}
      >
        <div className='relative flex items-center justify-between w-full'>
          <div className='text-3xl font-semibold text-gray-100 text-left brightness-60' style={{ color: planetColor }}>
            {celestialBody?.name}
          </div>
          <BaseButton 
            onClick={handleClose} 
            isBack={true} 
            className="rounded-full p-2 transition-colors duration-200 w-10 h-10 flex items-center justify-center"
            style={{ backgroundColor: 'transparent' }}
          >
            <FontAwesomeIcon 
              icon={faTimes} 
              color={planetColor}  // Set the 'X' icon color to planetColor
              size={'lg'} 
            />
          </BaseButton>
        </div>

        <div
          className='h-px w-full brightness-50'
          style={{
            backgroundColor: planetColor, 
            boxShadow: `0 0 10px ${planetColor}, 0 0 20px ${planetColor}`,
          }}
        />

        <div className='flex-grow overflow-y-auto pr-4 text-gray-300 space-y-8'>
          {celestialBody ? (
            <div className="space-y-3">
              <p className="text-left"><strong style={{ color: planetColor }}>Type:</strong> <span className="text-gray-100">{celestialBody.type}</span></p>
              <p className="text-left"><strong style={{ color: planetColor }}>Description:</strong> <span className="text-gray-100">{celestialBody.description}</span></p>
              <p className="text-left"><strong style={{ color: planetColor }}>Temperature:</strong> <span className="text-gray-100">{celestialBody.temperature}</span></p>
              <p className="text-left"><strong style={{ color: planetColor }}>Diameter:</strong> <span className="text-gray-100">{celestialBody.diameter}</span></p>
              <p className="text-left"><strong style={{ color: planetColor }}>Mass:</strong> <span className="text-gray-100">{celestialBody.mass}</span></p>
              {celestialBody.orbitalPeriod && (
                <p className="text-left"><strong style={{ color: planetColor }}>Orbital Period:</strong> <span className="text-gray-100">{celestialBody.orbitalPeriod}</span></p>
              )}
              {celestialBody.gravity && (
                <p className="text-left"><strong style={{ color: planetColor }}>Gravity:</strong> <span className="text-gray-100">{celestialBody.gravity}</span></p>
              )}
              {celestialBody.expeditions && (
                <p className="text-left"><strong style={{ color: planetColor }}>Expeditions:</strong> <span className="text-gray-100">{celestialBody.expeditions}</span></p>
              )}
              {celestialBody.age && (
                <p className="text-left"><strong style={{ color: planetColor }}>Age:</strong> <span className="text-gray-100">{celestialBody.age}</span></p>
              )}
            </div>
          ) : (
            <p>No information available for the selected planet.</p>
          )}
        </div>
      </div>
    </Html>
  );
}
