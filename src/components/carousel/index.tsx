import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { BaseButton } from '../button';

export function Carousel(props: { children: React.ReactNode[] }) {
  const { children } = props;
  const [curr, setCurr] = useState(0);

  const prev = () => setCurr((curr) => (curr == 0 ? children.length - 1 : curr - 1));

  const next = () => setCurr((curr) => (curr == children.length - 1 ? 0 : curr + 1));

  return (
    <div className='overflow-hidden flex relative rounded-2xl'>
      <div
        className='flex flex-row transition-transform ease-out duration-500 '
        style={{ transform: `translateX(-${curr * 100}%)` }}
      >
        {children}
      </div>

      <div className='absolute pointer-events-none inset-0 flex items-center justify-between p-4'>
        <BaseButton
          onClick={prev}
          isBack={true}
          className='flex items-center justify-center p-1 pointer-events-auto rounded-full transition-all bg-white/50 hover:bg-white'
        >
          <FontAwesomeIcon icon={faChevronLeft} size='2x' />
        </BaseButton>

        <BaseButton
          onClick={next}
          className='flex items-center justify-center p-1 pointer-events-auto rounded-full transition-all bg-white/50 hover:bg-white'
        >
          <FontAwesomeIcon icon={faChevronRight} size='2x' />
        </BaseButton>
      </div>

      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-2'>
          {children.map((_, i) => (
            <BaseButton onClick={() => setCurr(i)} key={i}>
              <div
                className={`transition-all w-3 h-3 outline-black outline outline-1 bg-white rounded-full ${curr == i ? 'p-2' : 'bg-opacity-20'}`}
              />
            </BaseButton>
          ))}
        </div>
      </div>
    </div>
  );
}
