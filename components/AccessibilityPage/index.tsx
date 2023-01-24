import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { COLOR_MODES } from '../../lib/colorMode';
import { Cookies } from '../../lib/cookies';

interface RecursiveBubble {
  bubble: IBubble,
  children: RecursiveBubble[];
}

const InfoBlock: FunctionComponent<{
  recursiveBubble: RecursiveBubble;
}> = ({
  recursiveBubble,
}) => {
  const bubble = recursiveBubble.bubble;

  return (
    <div key={bubble.id} className='bubbleContainer'>
      {bubble.summary !== undefined && (
        <div>
          {bubble.size === 'large' && <h1>{bubble.name}</h1>}
          {(bubble.size === 'medium' || !bubble.size) && <h2>{bubble.name}</h2>}
          {bubble.size === 'small' && <h3>{bubble.name}</h3>}
          {bubble.link && <Link href={bubble.link}>[More Information]</Link>}
          <br />
          <p>{bubble.summary}</p>
        </div>
      )}
      {bubble.summary === undefined && (
        <div className='image'>
          <Image
            src={'/images/' + bubble.image + '.png'}
            alt={bubble.name}
            quality={50}
            priority={true}
            height={160}
            layout='fill'
            objectFit='contain'
          />
        </div>
      )}
      <div className='children'>
        <div className='connections'>

        </div>
        {recursiveBubble.children?.map((children) => (
          <InfoBlock key={children.bubble.id} recursiveBubble={children}/>
        ))}
      </div>
    </div>
  );
};

const AccessibilityPage: FunctionComponent<{
  slug: string;
  bubbles: IBubble[];
  setAccessibility: Dispatch<SetStateAction<'Accessibility' | 'Visuals' | 'Undetermined'>>
  cookies?: Cookies;
}> = ({
  bubbles: localBubble = [], setAccessibility, cookies,
}) => {

    const [reformattedBubbles, setReformattedBubbles] = useState<RecursiveBubble>();

    // Uses cookie values to save settings.
    useEffect(() => {
      const root = document.getElementById('ColorTheme');
      if (root) root.className = 'Light';
    }, [cookies]);

    // Reformats the bubble so they look like they're in the correct order.
    useEffect(() => {
      const unusedBubbles = [...localBubble];

      const centralBubble = unusedBubbles.findIndex((e) => e.connection === '.');
      const reformattedBubbles: RecursiveBubble = {bubble: unusedBubbles[centralBubble], children: []};

      // Keeps track of available spaces that could take children.
      let availableChildren: [string[][], IBubble[]] = [[], []];
      let nextAvailableChildren: [string[][], IBubble[]] = [[[]], [unusedBubbles[centralBubble]]];

      unusedBubbles.splice(centralBubble, 1);

      // Go through layers of heritage.
      for (let step = 0; step < localBubble.length; step++) {
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
    }, [localBubble]);

    return (
      <div className='accessibilityPage'>
        <Head>
          <meta name='theme-color' content={COLOR_MODES.find(e => e.name === 'Light')?.primary} />
        </Head>
        <header>
          <p className='logo'>YSK Kyle</p>
          <div className='buttonRow'>
            <Link href='/'>
              <button className='button'>Home Page</button>
            </Link>
            <button className='button' onClick={() => setAccessibility('Visuals')}>To Visual Page</button>
          </div>
        </header>
        <main>
          {reformattedBubbles && (
            <InfoBlock recursiveBubble={reformattedBubbles}/>
          )}
        </main>
        <svg></svg>
      </div>
    );
  };

export default AccessibilityPage;