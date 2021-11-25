import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import Background from '../components/Background';
import Bubble from '../components/Bubble';
import Settings from '../components/Settings';
import { IBubble } from '../lib/bubbleData/_shared';


const BubblePage: NextPage = () => {
  const router = useRouter();

  const [bubbles, setBubbles] = React.useState<IBubble[]>([]);

  
  useEffect(() => {
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
  }, []);
  
  useEffect(() => {
    let projectPath = router.query.slug;
    if (router.pathname === '/') projectPath = 'homepage';
    if (projectPath === undefined) return;

    setBubbles(require('../lib/bubbleData/' + projectPath).default.reverse());
  }, [router.query, router.pathname]);

  return (
    <>
      <Background bubbles={bubbles}/>
      <Settings/>
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
    </>
  )
}

export default BubblePage;