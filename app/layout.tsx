import { Layout } from '@/components/dom/Layout';
import '@/global.css';

export const metadata = {
  title: 'YOURNAME | Portfolio',
  description: `YOURNAME's personal portfolio website. Made with Next.js and Three.js (React Three)`,
};

export default function RootLayout({ children }) {
  return (
    <html lang='en' className='antialiased'>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head>
        <link rel='icon' href='/icons/favicon.ico' sizes='any' />
        <link rel='icon' type='image/png' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='apple-touch-icon' href='/icons/apple-touch-icon.png' />
        <link rel='apple-touch-icon' sizes='16x16' href='/icons/favicon-16x16.png' />
        <link rel='apple-touch-icon' sizes='32x32' href='/icons/favicon-32x32.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />
        <link rel='mask-icon' color='#000000' href='/icons/safari-pinned-tab.svg' />
        <link rel='apple-touch-startup-image' href='/startup.png' />
      </head>
      <body>
        {/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
