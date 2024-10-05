import { BaseButton } from '@/components/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useState } from 'react';
import { Panel } from '..';
import { aboutData } from './data';

export function AboutPanel(props: { onClose: VoidFunction }) {
  const { onClose } = props;

  const { name, links, description } = aboutData;

  const [rotate, setRotate] = useState(0);

  return (
    <Panel title='About' onClose={onClose}>
      <div className='w-[85vw] md:w-[50vw] 2xl:w-[30vw] flex flex-col px-2 py-2  overflow-y-scroll scrollbar-hide'>
        <div className='w-full  flex flex-col bg-panel/20 px-3 py-3 rounded-2xl'>
          <div className='flex flex-col items-center space-y-1'>
            {/* NOTE: Your image is taken from /face.png. The same image that is used for the spinning face */}
            <Image
              src={'/face.png'}
              className='rounded-full bg-panel p-1.5 transition-all duration-700'
              onMouseEnter={() => setRotate(rotate + 360)}
              style={{ rotate: `${rotate}deg` }}
              width={200}
              height={200}
              alt={''}
            />
            <div className='text-textprimary text-5xl font-bold '>{name}</div>
          </div>

          <div className='text-panel font-medium text-center text-lg mt-5'>{description}</div>
          <div className='flex flex-row space-x-6 mt-4 items-center justify-center w-full'>
            {links.map((link) => (
              <BaseButton onClick={() => window.open(link.url, '_blank', 'noopener,noreferrer')} key={link.url}>
                <FontAwesomeIcon href={link.url} icon={link.icon} size='2x' color='white' />
              </BaseButton>
            ))}
          </div>
        </div>
      </div>
    </Panel>
  );
}
