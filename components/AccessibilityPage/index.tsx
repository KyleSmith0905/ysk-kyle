import Head from 'next/head';
import Image from 'next/future/image';
import Link from 'next/link';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { Cookies } from '../../lib/cookies';
import { Button } from '../Button';
import Connections from './connections';
import InfoBlock, { RecursiveBubble } from './infoBlock';

const AccessibilityPage: FunctionComponent<{
  slug: string;
  bubbles: IBubble[];
  setBubbles: Dispatch<SetStateAction<IBubble[]>>;
  setAccessibility: Dispatch<SetStateAction<'Accessibility' | 'Visuals' | 'Undetermined'>>
  cookies?: Cookies;
}> = ({
  slug, bubbles = [], setBubbles, setAccessibility, cookies,
}) => {

  const [reformattedBubbles, setReformattedBubbles] = useState<RecursiveBubble>();

  // Uses cookie values to save settings.
  useEffect(() => {
    const root = document.getElementById('ColorTheme');
    if (!root) return;

    root.className = 'Light';
      
    root.style.setProperty('--color-primary', 'hsl(0, 0%, 100%)');
    root.style.setProperty('--color-secondary', 'hsl(0, 0%, 95%)');
    root.style.setProperty('--color-text', 'hsl(0, 0%, 0%)');
  }, [cookies]);

  // Reformats the bubble so they look like they're in the correct order.
  useEffect(() => {
    const unusedBubbles = [...bubbles];

    const centralBubble = unusedBubbles.findIndex((e) => e.connection === '.');
    const reformattedBubbles: RecursiveBubble = {bubble: unusedBubbles[centralBubble], children: []};

    // Keeps track of available spaces that could take children.
    let availableChildren: [string[][], IBubble[]] = [[], []];
    let nextAvailableChildren: [string[][], IBubble[]] = [[[]], [unusedBubbles[centralBubble]]];

    unusedBubbles.splice(centralBubble, 1);

    // Go through layers of heritage.
    for (let step = 0; step < bubbles.length; step++) {
      availableChildren = nextAvailableChildren;
      nextAvailableChildren = [[], []];
      
      // Go through the list of bubbles needing a parent.
      for (let i = 0; i < unusedBubbles.length; i++) {
        const currentBubble = unusedBubbles[i];
        
        // Go through the list of bubbles needing a child.
        for (let j = 0; j < availableChildren[0].length; j++) {
          const routeToBubble = availableChildren[0][j];
          const routeBubble = availableChildren[1][j];
          
          // Connect parent with child.
          if (currentBubble.connection === routeBubble.id) {
            let bubbleSearch: RecursiveBubble = reformattedBubbles;
            
            for (let pathIndex = 0; pathIndex < routeToBubble.length; pathIndex++) {
              const pathSegment = routeToBubble[pathIndex];

              const newBubbleSearch = bubbleSearch.children.find((e) => e.bubble.id === pathSegment);
              if (newBubbleSearch) bubbleSearch = newBubbleSearch;
            }
            
            bubbleSearch.children.push({bubble: currentBubble, children: []});
            nextAvailableChildren[0].push([...routeToBubble, currentBubble.id]);
            nextAvailableChildren[1].push(currentBubble);
          }
        }
      }
      if (!nextAvailableChildren[0]) break;
    }

    setReformattedBubbles(reformattedBubbles);
  }, [bubbles]);

  const changePage = async (bubbleScene: string) => {
    const bubbleDataImport = await import('../../lib/bubbleData/' + bubbleScene);
    const bubbles = bubbleDataImport.default;
    setBubbles(structuredClone(bubbles.slice().reverse()));
  };

  return (
    <div id='accessibilityPage' className='accessibilityPage'>
      <Head>
        <meta name='theme-color' content='hsl(0, 0%, 100%)' />
      </Head>
      <header>
        <div className='buttonRow'>
          <Image src='/icons/logo.svg' width={40} height={40} alt=''/>
          <p className='logo'>YSK Kyle</p>
        </div>
        <div className='buttonRow'>
          <Link href='/'>
            <span>
              <Button onClick={() => changePage('index')}>Home Page</Button>
            </span>
          </Link>
          <Button onClick={() => setAccessibility('Visuals')}>To Visual Page</Button>
        </div>
      </header>
      <main>
        {reformattedBubbles && (
          <>
            <InfoBlock recursiveBubble={reformattedBubbles} setBubbles={setBubbles} slug={slug}/>
            <Connections recursiveBubble={reformattedBubbles} slug={slug}/>
          </>
        )}
      </main>
    </div>
  );
};

export default AccessibilityPage;