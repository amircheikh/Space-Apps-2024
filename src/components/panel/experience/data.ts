import { StaticImageData } from 'next/image';
import image1 from './images/image1.png';
import image2 from './images/image2.png';

export interface IExperience {
  title: string;
  companyName: string;
  companyImage: StaticImageData;
  date: string;
  points: string[];
}

export const experienceData: IExperience[] = [
  {
    title: 'Software Engineer',
    companyName: 'Google',
    companyImage: image1,
    date: 'Jan 2024 - Aug 2024',
    points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
  },

  {
    title: 'Fullstack Developer',
    companyName: 'Facebook',
    companyImage: image2,
    date: 'Dec 2022 - Apr 2023',
    points: ['Point 1', 'Point 2', 'Point 3', 'Point 4', 'Point 5'],
  },
];
