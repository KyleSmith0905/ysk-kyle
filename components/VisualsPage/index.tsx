import Head from 'next/head';
import { Dispatch, FunctionComponent, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { ColorModes, COLOR_MODES } from '../../lib/colorMode';
import { Cookies } from '../../lib/cookies';
import { GraphicsLevels } from '../../lib/graphicsLevel';
import Background from './Background';
import BackgroundConnections from './BackgroundConnections';
import Bubble from './Bubble';
import Connections from './Connections';
import HomeButton from './HomeButton';
import BrowserMovement from './MovementControl/Browser';
import ControlStickMovement from './MovementControl/ControlStick';
import EdgeScrollMovement from './MovementControl/EdgeScroll';
import PanoramaMovement from './MovementControl/Panorama';
import Settings from './Settings';

const VisualsPage: FunctionComponent<{
  slug: string;
  bubbles: IBubble[];
  isUserBot: boolean;
  setAccessibility: Dispatch<SetStateAction<'Accessibility' | 'Visuals' | 'Undetermined'>>;
  cookies?: Cookies;
}> = ({
  slug, bubbles: localBubble = [], isUserBot, setAccessibility, cookies,
}) => {
    const reverseBubbles = localBubble.slice().reverse();
    const [bubbleScene, setBubbleScene] = useState<string>(slug);
    const [bubbleSceneReset, setBubbleSceneReset] = useState<string>(slug);
    const [bubbles, setBubbles] = useState<IBubble[]>(structuredClone(reverseBubbles));
    const [travelMode, setTravelMode] = useState(cookies?.travelMode ?? 'Browser');
    const [colorTheme, setColorTheme] = useState<ColorModes>(cookies?.colorTheme ?? 'Dark');
    const [graphics, setGraphics] = useState<GraphicsLevels>(cookies?.graphics ?? 'Auto');
    const [autoGraphics, setAutoGraphics] = useState<GraphicsLevels | 'Assume-High'>('High');

    // Uses cookie values to save settings.
    useEffect(() => {
      const root = document.getElementById('ColorTheme');
      if (root) root.className = colorTheme;
    }, [cookies, colorTheme]);

    // When navigating site, wait a second after transition so animation can occur.
    const bubbleResetTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    useEffect(() => {
      if (!bubbleSceneReset || bubbleSceneReset === bubbleScene || bubbleResetTimeout.current) return;

      const timeout = setTimeout(async () => {
        const bubbleDataImport = await import('../../lib/bubbleData/' + bubbleSceneReset);
        const bubbles = bubbleDataImport.default;

        if (bubbleSceneReset === 'index') history.pushState({}, '', '/');
        else history.pushState({}, '', `/${bubbleSceneReset}`);

        setBubbleScene(bubbleSceneReset);
        setBubbles(structuredClone(bubbles.slice().reverse()));
        bubbleResetTimeout.current = null;
      }, 1000);

      bubbleResetTimeout.current = timeout;
    }, [bubbleSceneReset, bubbleScene]);

    // Compares the user's graphics settings to a parameter.
    const isGraphics = useCallback((compareGraphics: GraphicsLevels) => {
      let activeGraphics = graphics === 'Auto' ? autoGraphics : graphics;
      if (activeGraphics === 'Assume-High') activeGraphics = 'High';
      return activeGraphics === compareGraphics;
    }, [graphics, autoGraphics]);

    return (
      <>
        <Head>
          <meta name='theme-color' content={COLOR_MODES.find(e => e.name === colorTheme)?.primary} />
        </Head>
        {isGraphics('High') && (
          <Background setAutoGraphics={setAutoGraphics} colorTheme={colorTheme} bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} />
        )}
        {isGraphics('Low') && (<div id='Background'>
          <div className='fill' />
          <svg className='pattern' height="100%" width="100%">
            <defs>
              <pattern id="background-pattern" width="32" height="32" patternUnits="userSpaceOnUse" patternTransform="rotate(135)">
                <circle cx="16" cy="16" r="0.7" fill="var(--color-text)" />
              </pattern>
            </defs>
            <rect fill="url(#background-pattern)" height="200%" width="200%" />
          </svg>
        </div>
        )}
        <div id='Underlay'>
          <Connections bubbles={bubbles} />
          {isGraphics('Low') && <BackgroundConnections />}
        </div>
        <main id='MainContent'>
          {bubbles.map((bubble: IBubble) => (
            <Bubble
              key={bubble.id}
              setBubbleSceneReset={setBubbleSceneReset}
              setBubbleScene={setBubbleScene}
              setBubbles={setBubbles}
              bubbleSceneReset={bubbleSceneReset}
              bubbleScene={bubbleScene}
              bubbles={bubbles}
              bubble={bubble}
              isUserBot={isUserBot}
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
          setAccessibility={setAccessibility}
        />
        <HomeButton bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} setBubbleSceneReset={setBubbleSceneReset} />
      </>
    );
  };

export default VisualsPage;