import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ColorMode, GRAPHICS_HIGH_COLOR_MODES, GRAPHICS_LOW_COLOR_MODES } from '../lib/colorMode';
import { Cookies } from '../lib/cookies';
import { useEffect, useRef } from 'react';
import { AllProviders } from '../lib/hooks';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const currentColorMode = useRef<ColorMode>();

  useEffect(() => {
    const cookies = pageProps as Cookies;
    
    if (cookies.graphics === 'High') {
      currentColorMode.current = GRAPHICS_HIGH_COLOR_MODES.find(e => e.name === (cookies.colorTheme ?? 'Dark'));
    }
    else {
      currentColorMode.current = GRAPHICS_LOW_COLOR_MODES.find(e => e.name === (cookies.colorTheme ?? 'Dark'));
    }
  }, [pageProps]);
  
  return (
    <AllProviders>
      <Head>
        <meta charSet='utf-8' />
        <title>YSK Kyle - A portfolio website for Kyle Smith</title>
        <meta name='description' content='YSK Kyle is a portfolio website for Kyle Smith to showcase his web design and programming experience.' />
        <meta name='keywords' content='portfolio, programming, resume, web design, experience, frontend programmer' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content={currentColorMode.current?.primary} />
        <link rel='icon' type='image/ico' href='/icons/favicon.ico' />
        <link rel='apple-touch-icon' href='/icons/logo192.png' />
        <link rel='manifest' href='/manifest.json' />
        <meta name='HandheldFriendly' content='True' />
        {/* Open Graphics */}
        <meta property='og:site_name' content='YSK Kyle' />
        <meta property='og:url' content='https://yskkyle.com' />
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
      <div id='ColorTheme' className={currentColorMode.current?.name}>
        <Component {...pageProps} />
      </div>
    </AllProviders>
  );
};

export default MyApp;