import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';
import Background from '../components/Background';
import Bubble from '../components/Bubble';
import BrowserMovement from '../components/MovementControl/Browser';
import ControlStickMovement from '../components/MovementControl/ControlStick';
import EdgeScrollMovement from '../components/MovementControl/EdgeScroll';
import PanoramaMovement from '../components/MovementControl/Panorama';
import Settings from '../components/Settings';
import { IBubble } from '../lib/bubbleData/_shared';


const BubblePage: NextPage<{slug: string}> | FunctionComponent<{slug: string}> = ({slug}) => {
  const slugFormated = slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');

  const [bubbles, setBubbles] = useState<IBubble[]>([]);
  const [travelMode, setTravelMode] = useState(0);
  
  useEffect(() => {
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
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
      <Background
        bubbles={bubbles}
      />
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
      {travelMode === 0 && <BrowserMovement/>}
      {travelMode === 1 && <EdgeScrollMovement/>}
      {travelMode === 2 && <ControlStickMovement/>}
      {travelMode === 3 && <PanoramaMovement/>}
      <Settings
        setTravelMode={setTravelMode}
        travelMode={travelMode}
      />
    </>
  );
};

export default BubblePage;

export const getStaticPaths: GetStaticPaths = async () => {
  let allPaths = readdirSync('lib/bubbleData');
  
	allPaths = allPaths.map(path => path.split('.')[0]);
  allPaths = allPaths.filter(path => !path.startsWith('_'));
  allPaths = allPaths.filter(path => path !== '404');
	allPaths = allPaths.filter(path => path !== 'index');

  const paramsFormat = allPaths.map(path => ({ params: { slug: path } }));

  return {
    paths: [...paramsFormat],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      slug: params?.slug,
    },
  };
};