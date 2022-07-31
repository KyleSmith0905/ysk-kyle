import { readdirSync } from 'fs';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Connections from '../components/Connections';
import Bubble from '../components/Bubble';
import BrowserMovement from '../components/MovementControl/Browser';
import ControlStickMovement from '../components/MovementControl/ControlStick';
import EdgeScrollMovement from '../components/MovementControl/EdgeScroll';
import PanoramaMovement from '../components/MovementControl/Panorama';
import Settings from '../components/Settings';
import { IBubble } from '../lib/bubbleData/_shared';
import { Cookies, getCookie } from '../lib/cookies';
import { IsUserBot } from '../lib/utils';
import Background from '../components/Background';
import BackgroundConnections from '../components/BackgroundConnections';
import { ColorModes, COLOR_MODES } from '../lib/colorMode';
import { GraphicsLevels } from '../lib/graphicsLevel';
import HomeButton from '../components/HomeButton';
import { welcomeMessage } from '../lib/consoleMessages';

interface BubblePageProps {
  slug: string;
  bubbles: IBubble[];
  cookies?: Cookies;
  isUserBot?: boolean;
}

const BubblePage:
  NextPage<BubblePageProps> |
  FunctionComponent<BubblePageProps> = ({
    slug, cookies, bubbles: localBubble = [], isUserBot = false
}) => {
  const slugFormatted = slug.split('-').map((s: string) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
  
  const reverseBubbles = localBubble.slice().reverse();
  const [bubbles, setBubbles] = useState<IBubble[]>(reverseBubbles);
  const [travelMode, setTravelMode] = useState(cookies?.travelMode ?? 'Browser');
  const [colorTheme, setColorTheme] = useState<ColorModes>(cookies?.colorTheme ?? 'Dark');
  const [graphics, setGraphics] = useState<GraphicsLevels>(cookies?.graphics ?? 'Auto');
  const [autoGraphics, setAutoGraphics] = useState<GraphicsLevels | 'Assume-High'>('High');
  
  useEffect(() =>{
    scrollTo(1000 - (window.innerWidth / 2), 1000 - (window.innerHeight / 2));
    console.log(welcomeMessage());
  }, []);

  useEffect(() => {
    if (cookies && Object.keys(cookies).length === 0) {
      const travelMode = getCookie('travelMode');
      if (travelMode) setTravelMode(travelMode);
      const graphics = getCookie('graphics') as GraphicsLevels;
      if (graphics) setGraphics(graphics);
      const colorTheme = getCookie('colorTheme') as ColorModes;
      if (colorTheme) setColorTheme(colorTheme);
      const root = document.getElementById('ColorTheme');
      if (root && colorTheme) root.className = colorTheme;
    }
  }, [cookies]);

  // Compares the user's graphics settings to a parameter.
  const isGraphics = useCallback((compareGraphics: GraphicsLevels) => {
    let activeGraphics = graphics === 'Auto' ? autoGraphics : graphics;
    if (activeGraphics === 'Assume-High') activeGraphics = 'High';
    return activeGraphics === compareGraphics;
  }, [graphics, autoGraphics]);

  return (
    <>
      <Head>
        <title>{slugFormatted + ' | YSK Kyle - A portfolio website for Kyle Smith'}</title>
        <meta property='og:title' content={slugFormatted + ' | YSK Kyle - A portfolio website for Kyle Smith'} />
        <meta name='twitter:title' content={slugFormatted + ' | YSK Kyle - A portfolio website for Kyle Smith'} />
        <meta name='theme-color' content={COLOR_MODES.find(e => e.name === colorTheme)?.primary} />
      </Head>
      {isGraphics('High') && (
        <Background setAutoGraphics={setAutoGraphics} colorTheme={colorTheme}/>
      )}
      {isGraphics('Low') && (<div id='Background'>
        <div className='fill'/>
          <svg className='pattern' height="100%" width="100%">
            <defs>
              <pattern id="background-pattern" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                <circle cx="16" cy="16" r="0.7" fill="var(--color-text)"/>
              </pattern>
            </defs>
            <rect fill="url(#background-pattern)" height="200%" width="200%"/>
          </svg>
        </div>
      )}
      <div id='Underlay'>
        <Connections bubbles={bubbles} />
        {isGraphics('Low') && <BackgroundConnections />}
      </div>
      <main id='MainContent'>
        {bubbles.map((bubble: IBubble, index: number) => (
          <Bubble
            setBubbles={setBubbles}
            bubbles={bubbles}
            bubble={bubble}
            isUserBot={isUserBot}
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
        setGraphics={setGraphics}
        graphics={graphics}
      />
      <HomeButton/>
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

  const notFound = !allPaths.includes(slug);

  const bubbleDataImport = notFound ? {} : (await import('../lib/bubbleData/' + slug));
  const bubbles = bubbleDataImport.default;

  return {
    props: {
      slug: params?.slug,
      cookies: req.cookies,
      bubbles: bubbles,
      isUserBot: IsUserBot(req.headers['user-agent']),
    },
    notFound: !allPaths.includes(slug),
  };
};