import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { BaseButton } from '../button';
import { Transition } from '@headlessui/react';

// interface HeaderProps {

// }

export function Header() {
  const [infoOpen, setInfoOpen] = useState(false);

  return (
    <div className='w-full h-16 items-center flex px-10 gap-6 justify-between'>
      <div className='items-center flex px-10 gap-6 z-1'>
        <img src='/spongebob-chair.png' className='h-8 w-auto' />
        <h1 className='text-2xl font-semibold text-white'>Nasa Space Apps 2024</h1>
      </div>
      <BaseButton onClick={() => setInfoOpen(!infoOpen)}>
        <FontAwesomeIcon icon={faCircleInfo} className='text-white/60 h-8' />
      </BaseButton>
      {infoOpen && (
        <button onClick={() => setInfoOpen(!infoOpen)} className='fixed h-[100vh] w-[100vw] inset-0 '></button>
      )}
      <Transition show={infoOpen}>
        <div className='absolute right-0 top-16 flex flex-col z-50  bg-[#252525] border text-white border-white/50 rounded-lg p-4 w-[20rem] gap-4 items-center transition duration-300 ease-in data-[closed]:opacity-0'>
          <h1 className='text-3xl font-semibold'>About</h1>
          <hr className='border-white w-full' />
          <div className='flex flex-col gap-2'>
            <h2 className='text-lg'>
              <span className='font-semibold'>Team Timmy</span> - NASA Space Apps Challenge
            </h2>
            <p>
              We’re Team Timmy, and our project is an Orrery Web App that brings the solar system to life! Built with
              React and react-three, our app lets you explore planets and Near-Earth Objects (NEOs) in an immersive 3D
              experience. Whether you’re tracking planetary orbits or just enjoying the cosmic view, our app makes space
              exploration fun and interactive!
            </p>
          </div>
        </div>
      </Transition>
    </div>
  );
}
