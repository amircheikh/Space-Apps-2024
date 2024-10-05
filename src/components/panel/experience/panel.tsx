import Image from 'next/image';
import { Panel } from '..';
import { experienceData, IExperience } from './data';

export function ExperiencePanel(props: { onClose: VoidFunction }) {
  const { onClose } = props;
  return (
    <Panel title='Experience' onClose={onClose}>
      <div className='w-[85vw] md:w-[40vw] 2xl:w-[35vw] flex flex-col px-2 py-2 space-y-7 overflow-y-scroll scrollbar-hide'>
        {experienceData.map((job, i) => (
          <Experience job={job} key={i} />
        ))}
      </div>
    </Panel>
  );
}

function Experience(props: { job: IExperience }) {
  const { title, companyName, companyImage, date, points } = props.job;

  return (
    <div className='w-full flex flex-col bg-panel/20 px-4 py-4 rounded-2xl'>
      <div className='flex flex-row space-x-4 justify-center items-center'>
        <Image className='rounded-2xl' height={64} src={companyImage} alt={''} />
        <div className='text-textprimary text-3xl font-bold'>{companyName}</div>
      </div>

      <div className='text-2xl md:text-3xl mt-6 text-textprimary font-bold'>{title}</div>
      <div className='mt-0.5 text-textsecondary text-lg  font-semibold'>{date}</div>

      <ul className='flex flex-col mt-3 space-y-2 list-disc ml-4'>
        {points.map((point) => (
          <li className='text-panel font-semibold text-lg' key={point}>
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
