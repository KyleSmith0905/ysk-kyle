import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import { IBubble } from '../lib/bubbleData/_shared';
import { COLOR_MODES } from '../lib/colorMode';
import { Cookies } from '../lib/cookies';

const AccessibilityPage: FunctionComponent<{
  slug: string;
  bubbles: IBubble[];
  setAccessibility: Dispatch<SetStateAction<"Accessibility" | "Visuals" | "Undetermined">>
  cookies?: Cookies;
}> = ({
  bubbles: localBubble = [], setAccessibility, cookies,
}) => {

  const [reformattedBubbles, setReformattedBubbles] = useState(localBubble);

  // Uses cookie values to save settings.
  useEffect(() => {
    const root = document.getElementById('ColorTheme');
    if (root) root.className = 'Light';
  }, [cookies]);

  // Reformats the bubble so they look like they're in the correct order.
  useEffect(() => {
    const bubbleSortingPoints: Record<number, IBubble> = {};
    const core = localBubble.find((e) => e.connection === '.');

    // Any bubble that is small connect to a core should be first, then any medium ones.
    for (const bubble of localBubble) {
      const connection = localBubble.find((e) => e.id === bubble.connection)
    }

    setReformattedBubbles(localBubble);
  }, [localBubble])

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
        {reformattedBubbles.map((bubble) => (
          <div key={bubble.id} className='bubbleContainer'>
            {bubble.summary !== undefined && (
              <>
                {bubble.size === 'large' && <h1>{bubble.name}</h1>}
                {(bubble.size === 'medium' || !bubble.size) && <h2>{bubble.name}</h2>}
                {bubble.size === 'small' && <h3>{bubble.name}</h3>}
                {bubble.link && <Link href={bubble.link}>[More Information]</Link>}
                <br/>
                <p>{bubble.summary}</p>
              </>
            )}
            {bubble.summary === undefined && (
              <div className='image'>
                <Image
                  src={'/images/' + bubble.image + '.png'}
                  alt={bubble.name}
                  quality={50}
                  priority={true}
                  layout='fill'
                  objectFit='contain'
                />
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  )
};

export default AccessibilityPage;