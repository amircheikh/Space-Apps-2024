import { ILinkWithIcon } from '@/types';
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { StaticImageData } from 'next/image';
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';

export interface IProject {
  name: string;
  description: string;
  images: StaticImageData[];
  links: ILinkWithIcon[];
}

export const projectsData: IProject[] = [
  {
    name: 'AI Robot Project',
    description: 'My super cool robot!',
    images: [image1, image2, image3],
    links: [
      {
        icon: faGithub,
        url: 'https://github.com/',
      },
      {
        icon: faYoutube,
        url: 'https://youtube.com',
      },
    ],
  },
  {
    name: 'Personal Website',
    description: 'Very awesome NextJS website!',
    images: [image1, image2, image3],
    links: [
      {
        icon: faGithub,
        url: 'https://github.com/',
      },
      {
        icon: faYoutube,
        url: 'https://youtube.com',
      },
    ],
  },
  {
    name: 'Another AI Project',
    description: 'I love making AI stuff!',
    images: [image1, image2, image3],
    links: [
      {
        icon: faGithub,
        url: 'https://github.com/',
      },
    ],
  },
];
