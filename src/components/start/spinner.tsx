import { faEarth } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MoonLoader } from 'react-spinners';

export function Spinner() {
  return (
    <div className='flex items-center justify-center '>
      <MoonLoader className='absolute' color='white' size={35} />
      <FontAwesomeIcon className='absolute' color='gray' icon={faEarth} size='xl' />
    </div>
  );
}
