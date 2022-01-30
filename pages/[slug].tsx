/* eslint-disable react-hooks/exhaustive-deps */
import { readdirSync } from 'fs';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';
import Connections from '../components/Connections';
import Background from '../components/Background';
import Bubble from '../components/Bubble';
import BrowserMovement from '../components/MovementControl/Browser';
import ControlStickMovement from '../components/MovementControl/ControlStick';
import EdgeScrollMovement from '../components/MovementControl/EdgeScroll';
import PanoramaMovement from '../components/MovementControl/Panorama';
import Settings from '../components/Settings';
import { IBubble } from '../lib/bubbleData/_shared';
import { Cookies, getCookie } from '../lib/cookies';


const BubblePage:
  NextPage<{slug: string, cookies?: Cookies}> |
  FunctionComponent<{slug: string, cookies?: Cookies}> = ({
    slug, cookies = {}
}) => {

  const slugFormated = slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

  const [bubbles, setBubbles] = useState<IBubble[]>([]);
  const [travelMode, setTravelMode] = useState(cookies.travelMode ?? 'Browser');
  const [colorTheme, setColorTheme] = useState(cookies.colorTheme ?? 'Light');
  
  useEffect(() => {
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
    if (Object.keys(cookies).length === 0) {
      const travelMode = getCookie('travelMode');
      if (travelMode) setTravelMode(travelMode);
      const colorTheme = getCookie('colorTheme');
      if (colorTheme) setColorTheme(colorTheme);
      const root = document.getElementById('ColorTheme') as HTMLElement;
      if (root && colorTheme) root.className = colorTheme;
    }
  }, []);

  useEffect(() => {
    (async () => {
      const imported = (await import('../lib/bubbleData/' + slug));
      setBubbles(imported.default.reverse());
    })();
  }, [slug]);

  return (
    <>
      <Head>
        <title>{slugFormated + ' | YSK Kyle - A portfolio website for Kyle Smith'}</title>
        <meta property='og:title' content={slugFormated + ' | YSK Kyle - A portfolio website for Kyle Smith'} />
        <meta name='twitter:title' content={slugFormated + ' | YSK Kyle - A portfolio website for Kyle Smith'} />
      </Head>
      <div id='Background' />
      <div id='Underlay'>
        <Connections bubbles={bubbles} />
        <Background />
      </div>
      <main id='MainContent'>
        {bubbles.map((bubble: IBubble, index: number) => (
          <Bubble
            setBubbles={setBubbles}
            bubbles={bubbles}
            bubble={bubble}
            key={index}
          />
        ))}
      </main>
      {travelMode === 'Browser' && <BrowserMovement />}
      {travelMode === 'Edge Scrolling' && <EdgeScrollMovement />}
      {travelMode === 'Control Stick' && <ControlStickMovement />}
      {travelMode === 'Panorama' && <PanoramaMovement />}
      <Settings
        setTravelMode={setTravelMode}
        travelMode={travelMode}
        setColorTheme={setColorTheme}
        colorTheme={colorTheme}
      />
    </>
  );
};

export default BubblePage;

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  let slug = params?.slug ?? '';
  if (Array.isArray(slug)) slug = slug.join('/');

  let allPaths = readdirSync('lib/bubbleData');
  
	allPaths = allPaths.map(path => path.split('.')[0]);
  allPaths = allPaths.filter(path => !path.startsWith('_'));
  allPaths = allPaths.filter(path => path !== '404');
	allPaths = allPaths.filter(path => path !== 'index');

  return {
    props: {
      slug: params?.slug,
      cookies: req.cookies,
    },
    notFound: !allPaths.includes(slug),
  };
};