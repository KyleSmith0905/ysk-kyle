import { readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Background from '../components/Background';
import Bubble from '../components/Bubble';
import BrowserMovement from '../components/MovementControl/Browser';
import ControlStickMovement from '../components/MovementControl/ControlStick';
import EdgeScrollMovement from '../components/MovementControl/EdgeScroll';
import PanoramaMovement from '../components/MovementControl/Panorama';
import Settings from '../components/Settings';
import { IBubble } from '../lib/bubbleData/_shared';


const BubblePage: NextPage = () => {
  const router = useRouter();
  let slug = router.query.slug;
  if (router.asPath === '/') slug = 'homepage';
  else if (typeof(slug) !== 'string') slug = '404';
  const slugFormated = slug.split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

  const [bubbles, setBubbles] = useState<IBubble[]>([]);
  const [travelMode, setTravelMode] = useState(0);
  
  useEffect(() => {
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
  }, []);

  useEffect(() => {
    let projectPath = slug;
    if (projectPath === undefined) return;

    setBubbles(require('../lib/bubbleData/' + projectPath).default.reverse());
  }, [slug, router.pathname]);

  return (
    <>
      <Head>
        <title>{slugFormated} | YSK Kyle - A portfolio website for Kyle Smith</title>
        <meta property='og:title' content={slugFormated + ' | YSK Kyle - A portfolio website for Kyle Smith'} />
        <meta name='twitter:title' content={slugFormated + ' | YSK Kyle - A portfolio website for Kyle Smith'} />
        <link rel='canonical' href={'https://yskkyle/' + slug}/>
      </Head>
      <Background
        bubbles={bubbles}
      />
      <div id='MainContent'>
        {bubbles.map((bubble: IBubble, index: number) => (
          <Bubble
            setBubbles={setBubbles}
            bubbles={bubbles}
            bubble={bubble}
            key={index}
          />
        ))}
      </div>
      {travelMode === 0 && <BrowserMovement/>}
      {travelMode === 1 && <EdgeScrollMovement/>}
      {travelMode === 2 && <ControlStickMovement/>}
      {travelMode === 3 && <PanoramaMovement/>}
      <Settings
        setTravelMode={setTravelMode}
        travelMode={travelMode}
      />
    </>
  )
}

export default BubblePage;

export const getStaticPaths: GetStaticPaths = async () => {
  const allPaths = readdirSync('lib/bubbleData')
  const paramsFormat = allPaths.filter(path => !path.startsWith('_')).map(path => ({ params: { slug: path.replace('.ts', '') } }));

  return {
    paths: [...paramsFormat],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return {
    props: {
      slug: params?.slug,
    },
  }
}