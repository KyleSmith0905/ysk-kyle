import { readdir, readdirSync } from 'fs';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Background from '../components/Background';
import Bubble from '../components/Bubble';
import BrowserMovement from '../components/MovementControl/Browser';
import EdgeScrollMovement from '../components/MovementControl/EdgeScroll';
import Settings from '../components/Settings';
import { IBubble } from '../lib/bubbleData/_shared';


const BubblePage: NextPage = () => {
  const router = useRouter();

  const [bubbles, setBubbles] = useState<IBubble[]>([]);
  const [travelMode, setTravelMode] = useState(0);
  
  useEffect(() => {
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
  }, []);

  useEffect(() => {
    let projectPath = router.query.slug;
    if (router.pathname === '/') projectPath = 'homepage';
    else if (router.pathname === '/404') projectPath = '404';
    if (projectPath === undefined) return;

    setBubbles(require('../lib/bubbleData/' + projectPath).default.reverse());
  }, [router.query, router.pathname]);

  return (
    <>
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