import { useGraphics } from '@lib/hooks';
import Head from 'next/head';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { GRAPHICS_LOW_COLOR_MODES, GRAPHICS_HIGH_COLOR_MODES, GraphicsHighColorModes, GraphicsLowColorModes, ColorMode } from '../../lib/colorMode';
import { Cookies } from '../../lib/cookies';
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
  setBubbles: Dispatch<SetStateAction<IBubble[]>>;
  setAccessibility: Dispatch<SetStateAction<'Accessibility' | 'Visuals' | 'Undetermined'>>;
  cookies?: Cookies;
}> = ({
  slug, bubbles, setBubbles, setAccessibility, cookies,
}) => {
    const [bubbleScene, setBubbleScene] = useState<string>(slug);
    const [bubbleSceneReset, setBubbleSceneReset] = useState<string>(slug);
    const [travelMode, setTravelMode] = useState(cookies?.travelMode ?? 'Browser');
    const [graphicsHighColorTheme, setGraphicsHighColorTheme] = useState<GraphicsHighColorModes>(cookies?.graphicsHighColorTheme ?? 'Dark');
    const [graphicsLowColorTheme, setGraphicsLowColorTheme] = useState<GraphicsLowColorModes>(cookies?.graphicsLowColorTheme ?? 'Light');

    const {effectiveGraphics} = useGraphics();

    // Modifies the page's color theme setting.
    useEffect(() => {
      const root = document.getElementById('ColorTheme');
      if (!root) return;

      let colorMode: ColorMode | undefined;
  
      if (effectiveGraphics === 'High') {
        colorMode = GRAPHICS_HIGH_COLOR_MODES.find(e => e.name === (graphicsHighColorTheme ?? 'Dark'));
      }
      else {
        colorMode = GRAPHICS_LOW_COLOR_MODES.find(e => e.name === (graphicsLowColorTheme ?? 'Light'));
      }

      if (!colorMode) return;
  
      root.className = colorMode.name;
  
      root.style.setProperty('--color-primary', colorMode?.primary);
      root.style.setProperty('--color-secondary', colorMode?.secondary);
      root.style.setProperty('--color-text', colorMode?.text);
    }, [effectiveGraphics, graphicsHighColorTheme, graphicsLowColorTheme]);

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
    }, [bubbleSceneReset, bubbleScene, setBubbles]);

    // Determines theme color
    let color: string | undefined = 'hsl(0, 0%, 6%)';
    if (effectiveGraphics === 'Low') color = GRAPHICS_LOW_COLOR_MODES.find(e => e.name === graphicsLowColorTheme)?.primary;
    else color = GRAPHICS_HIGH_COLOR_MODES.find(e => e.name === graphicsHighColorTheme)?.primary;

    return (
      <>
        <Head>
          <meta name='theme-color' content={color} />
        </Head>
        {effectiveGraphics === 'High' && (
          <Background colorTheme={graphicsHighColorTheme} bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} />
        )}
        {effectiveGraphics === 'Low' && (<div id='Background'>
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
          {effectiveGraphics === 'Low' && <BackgroundConnections />}
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
          setGraphicsHighColorTheme={setGraphicsHighColorTheme}
          graphicsHighColorTheme={graphicsHighColorTheme}
          setGraphicsLowColorTheme={setGraphicsLowColorTheme}
          graphicsLowColorTheme={graphicsLowColorTheme}
          setAccessibility={setAccessibility}
        />
        <HomeButton bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} setBubbleSceneReset={setBubbleSceneReset} />
      </>
    );
  };

export default VisualsPage;