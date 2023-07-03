import '../styles/globals.css';
import '../styles/utils.css';
import '../styles/components.css';
import '../styles/accessibilityPage.css';
import '../styles/visualsPage.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorMode, GRAPHICS_SPACE_COLOR_MODES, GRAPHICS_FLAT_COLOR_MODES } from '../lib/colorMode';
import { Cookies } from '../lib/cookies';
import { CSSProperties, useRef } from 'react';
import { AllProviders } from '../lib/hooks';

const determineColorMode = (cookies: Cookies) => {
  // If there are no cookies at all, the page loaded is guaranteed to be default settings.
  if (!cookies) {
    return GRAPHICS_SPACE_COLOR_MODES.find(e => e.name === 'Light');
  }
  // Accessibility mode only has light option available.
  else if (cookies.accessibility === 'Accessibility') {
    return GRAPHICS_FLAT_COLOR_MODES.find(e => e.name === 'Light');
  }
  else if (cookies.graphics === 'Space') {
    return GRAPHICS_SPACE_COLOR_MODES.find(e => e.name === (cookies.graphicsSpaceColorTheme ?? 'Dark'));
  }
  else {
    return GRAPHICS_FLAT_COLOR_MODES.find(e => e.name === (cookies.graphicsFlatColorTheme ?? 'Light'));
  }
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cookies = (pageProps as any).cookies as Cookies;

  // Current color state, defaults to dark (since that is what the site is usually loaded on).
  const currentColorMode = useRef<ColorMode | undefined>((() => {
    return determineColorMode(cookies);
  })());
  const currentColorStyles = useRef<Record<string, string | undefined>>((() => {
    const colorMode = determineColorMode(cookies);
    return {
      '--color-primary': colorMode?.primary,
      '--color-secondary': colorMode?.secondary,
      '--color-text': colorMode?.text,
    };
  })());

  return (
    <AllProviders cookies={cookies}>
      <Head>
        <meta charSet='utf-8' />
        <title>YSK Kyle - A portfolio website for Kyle Smith</title>
        <meta name='description' content='YSK Kyle is a portfolio website for Kyle Smith to showcase his web design and programming experience.' />
        <meta name='keywords' content='portfolio, programming, resume, web design, experience, frontend programmer' />
        <meta name="viewport" content="initial-scale=1, maximum-scale=2.5, minimum-scale=0.5, width=device-width, height=device-height" />
        <meta name='theme-color' content={currentColorMode.current?.primary} />
        <link rel='icon' type='image/ico' href='/icons/favicon.ico' />
        <link rel='apple-touch-icon' href='/icons/logo192.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='HandheldFriendly' content='True' />
        {/* Open Graphics */}
        <meta property='og:site_name' content='YSK Kyle' />
        <meta property='og:url' content='https://www.yskkyle.com' />
        <meta property='og:keywords' content='portfolio, programming, resume, web design, experience, frontend programmer' />
        <meta property='og:locale' content='en-US' />
        <meta property='og:type' content='website' />
        <meta property='og:image:url' content='/icons/logo512.png' />
        <meta property='og:image:alt' content='YSK Kyle logo' />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='512' />
        <meta property='og:image:height' content='512' />
        <meta property='og:title' content='YSK Kyle - A portfolio website for Kyle Smith' />
        <meta property='og:description' content='YSK Kyle is a portfolio website for Kyle Smith to showcase his web design and programming experience.' />
        {/* Twitter */}
        <meta name='twitter:card' content='summary' />
        <meta name='twitter:image' content='/icons/logo512.png' />
        <meta name='twitter:image:alt' content='YSK Kyle logo' />
        <meta name='twitter:title' content='YSK Kyle - A portfolio website for Kyle Smith' />
        <meta name='twitter:description' content='YSK Kyle is a portfolio website for Kyle Smith to showcase his web design and programming experience.' />
      </Head>
      <div id='ColorTheme' className={currentColorMode.current?.name} style={currentColorStyles?.current as CSSProperties}>
        <Component {...pageProps} />
      </div>
    </AllProviders>
  );
};

export default MyApp;