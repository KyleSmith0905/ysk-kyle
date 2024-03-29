import { useGraphics } from '@lib/hooks';
import Head from 'next/head';
import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { GRAPHICS_FLAT_COLOR_MODES, GRAPHICS_SPACE_COLOR_MODES, GraphicsSpaceColorModes, GraphicsFlatColorModes, ColorMode, GraphicsParticlesColorModes } from '../../lib/colorMode';
import { Cookies } from '../../lib/cookies';
import SpaceBackground from './Backgrounds/space';
import Bubble from './Bubble';
import Connections from './Connections';
import HomeButton from './HomeButton';
import BrowserMovement from './MovementControl/Browser';
import ControlStickMovement from './MovementControl/ControlStick';
import EdgeScrollMovement from './MovementControl/EdgeScroll';
import PanoramaMovement from './MovementControl/Panorama';
import Settings from './Settings';
import FlatBackground from './Backgrounds/flat';
import ParticlesBackground from './Backgrounds/particles';
import PrototypeMovement from './MovementControl/Prototype';

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
  const [travelMode, setTravelMode] = useState(cookies?.travelMode ?? 'Prototype');
  const [graphicsSpaceColorTheme, setGraphicsSpaceColorTheme] = useState<GraphicsSpaceColorModes>(cookies?.graphicsSpaceColorTheme ?? 'Dark');
  const [graphicsFlatColorTheme, setGraphicsFlatColorTheme] = useState<GraphicsFlatColorModes>(cookies?.graphicsFlatColorTheme ?? 'Light');
  const [graphicsParticlesColorTheme, setGraphicsParticlesColorTheme] = useState<GraphicsParticlesColorModes>(cookies?.graphicsParticlesColorTheme ?? 'Iconic');

  const {effectiveGraphics} = useGraphics();

  // Modifies the page's color theme setting.
  useEffect(() => {
    const root = document.getElementById('ColorTheme');
    if (!root) return;

    let colorMode: ColorMode | undefined;

    if (effectiveGraphics === 'Space') {
      colorMode = GRAPHICS_SPACE_COLOR_MODES.find(e => e.name === (graphicsSpaceColorTheme ?? 'Dark'));
    }
    else if (effectiveGraphics === 'Particles') {
      colorMode = GRAPHICS_SPACE_COLOR_MODES.find(e => e.name === (graphicsSpaceColorTheme ?? 'Dark'));
    }
    else {
      colorMode = GRAPHICS_FLAT_COLOR_MODES.find(e => e.name === (graphicsFlatColorTheme ?? 'Light'));
    }

    if (!colorMode) return;

    root.className = colorMode.name;

    root.style.setProperty('--color-primary', colorMode?.primary);
    root.style.setProperty('--color-secondary', colorMode?.secondary);
    root.style.setProperty('--color-text', colorMode?.text);
  }, [effectiveGraphics, graphicsSpaceColorTheme, graphicsFlatColorTheme]);

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

  // Overrides the browser back button to allow for a smooth transition.
  useEffect(() => {
    const popState = () => {
      setBubbleSceneReset(location.pathname === '/' ? 'index' : location.pathname.substring(1));
      return;
    };

    addEventListener('popstate', popState);
    return () => {
      removeEventListener('popstate', popState);
    };
  }, []);

  // Determines theme color
  let color: string | undefined = 'hsl(0, 0%, 6%)';
  if (effectiveGraphics === 'Flat') color = GRAPHICS_FLAT_COLOR_MODES.find(e => e.name === graphicsFlatColorTheme)?.primary;
  else color = GRAPHICS_SPACE_COLOR_MODES.find(e => e.name === graphicsSpaceColorTheme)?.primary;

  return (
    <>
      <Head>
        <meta name='theme-color' content={color} />
      </Head>
      {effectiveGraphics === 'Space' && (
        <SpaceBackground colorTheme={graphicsSpaceColorTheme} bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} />
      )}
      {effectiveGraphics === 'Particles' && (
        <ParticlesBackground colorTheme={graphicsParticlesColorTheme} bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} />
      )}
      <div id='BackgroundDisplay'>
        {effectiveGraphics === 'Flat' && (
          <FlatBackground />
        )}
        <div id='Underlay'>
          <Connections bubbles={bubbles} />
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
      </div>
      <div id='OverlayDisplay'>
        <HomeButton bubbleScene={bubbleScene} bubbleSceneReset={bubbleSceneReset} setBubbleSceneReset={setBubbleSceneReset} />
        <Settings
          setTravelMode={setTravelMode}
          travelMode={travelMode}
          setGraphicsSpaceColorTheme={setGraphicsSpaceColorTheme}
          graphicsSpaceColorTheme={graphicsSpaceColorTheme}
          setGraphicsFlatColorTheme={setGraphicsFlatColorTheme}
          graphicsFlatColorTheme={graphicsFlatColorTheme}
          setGraphicsParticlesColorTheme={setGraphicsParticlesColorTheme}
          graphicsParticlesColorTheme={graphicsParticlesColorTheme}
          setAccessibility={setAccessibility}
        />
        {travelMode === 'Browser' && <BrowserMovement />}
        {travelMode === 'Edge Scrolling' && <EdgeScrollMovement />}
        {travelMode === 'Control Stick' && <ControlStickMovement />}
        {travelMode === 'Panorama' && <PanoramaMovement />}
        {travelMode === 'Prototype' && <PrototypeMovement />}
      </div>
    </>
  );
};

export default VisualsPage;