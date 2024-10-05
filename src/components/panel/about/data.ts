import { ILinkWithIcon } from '@/types';
import { faGithub, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';

export interface IAbout {
  name: string;
  links: ILinkWithIcon[];
  description: string;
}

export const aboutData: IAbout = {
  name: 'YOURNAME',
  links: [
    { icon: faGithub, url: 'https://github.com/' },
    { icon: faLinkedin, url: 'https://www.linkedin.com/in/' },
    { icon: faYoutube, url: 'https://www.youtube.com/' },
  ],
  description: `Hi, I'm YOURNAME—a computer science student. Don't hesitate to reach out through LinkedIn if you'd like to connect.`,
};
