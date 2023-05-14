import { readdirSync } from 'fs';
import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { FunctionComponent, useEffect, useState } from 'react';
import { IBubble } from '../lib/bubbleData/_shared';
import { Cookies, getCookie, setCookie } from '../lib/cookies';
import { conditionallySetInert, IsUserBot } from '../lib/utils';
import { welcomeMessage } from '../lib/consoleMessages';
import AccessibilityPage from '../components/AccessibilityPage';
import { Button } from '../components/Button';
import VisualsPage from '../components/VisualsPage';
import structuredClone from '@ungap/structured-clone';

interface BubblePageProps {
	slug: string;
	cookies?: Cookies;
	isUserBot?: boolean;
	bubbles: IBubble[];
}

const BubblePage:
	| NextPage<BubblePageProps>
	| FunctionComponent<BubblePageProps> = ({
	slug,
	cookies,
	bubbles: localBubble = [],
	isUserBot = false,
}) => {
	const slugFormatted = slug
		.split('-')
		.map((s: string) => s.charAt(0).toUpperCase() + s.substring(1))
		.join(' ');

	const reverseBubbles = localBubble.slice().reverse();
	const [bubbles, setBubbles] = useState<IBubble[]>(
		structuredClone(reverseBubbles)
	);
	const [accessibility, setAccessibility] = useState<
		'Accessibility' | 'Visuals' | 'Undetermined'
	>(() => {
		if (isUserBot) return 'Accessibility';
		return cookies?.accessibility ?? 'Undetermined';
	});

	useEffect(() => {
		// Center screen to origin.
		const rootFontSizeValue = window.getComputedStyle(document.body).getPropertyValue('font-size');
		const rootFontSize = parseInt(rootFontSizeValue);
		scrollTo(
			(62.5 * rootFontSize) - (window.innerWidth / 2),
			(62.5 * rootFontSize) - (window.innerHeight / 2),
		);
		// Display a message in chat.
		console.log(welcomeMessage());
	}, []);

	// Uses cookie values to save settings.
	useEffect(() => {
		if (cookies && Object.keys(cookies).length === 0) {
			const accessibilityCookie = getCookie(
				'accessibility'
			) as typeof accessibility;
			if (accessibilityCookie) setAccessibility(accessibilityCookie);
		}
	}, [cookies]);

	// Saves accessibility settings for next time.
	useEffect(() => {
		if (accessibility === 'Undetermined') return;
		setCookie('accessibility', accessibility);
	}, [accessibility]);

	return (
		<>
			<Head>
				<title>
					{slugFormatted + ' | YSK Kyle - A portfolio website for Kyle Smith'}
				</title>
				<meta
					property='og:title'
					content={
						slugFormatted + ' | YSK Kyle - A portfolio website for Kyle Smith'
					}
				/>
				<meta
					name='twitter:title'
					content={
						slugFormatted + ' | YSK Kyle - A portfolio website for Kyle Smith'
					}
				/>
			</Head>
			<div className={accessibility === 'Undetermined' ? 'alertContainer' : 'alertContainer Hidden'}>
					<div className='alertBox dimensionalBox'>
						<h1 style={{ marginTop: '0rem' }}>Hello Visitor!</h1>
						<p>This page is highly animated and could be distracting.</p>
						<p>Select whether you prefer an accessible or visual experience.</p>
						<div style={{ marginTop: '2rem' }} className='buttonRow'>
							<Button onClick={() => setAccessibility('Accessibility')}>
								Accessibility
							</Button>
							<Button onClick={() => setAccessibility('Visuals')}>
								Visuals
							</Button>
						</div>
					</div>
				</div>
			{accessibility === 'Accessibility' && (
        <AccessibilityPage
          cookies={cookies}
          slug={slug}
          bubbles={bubbles}
          setBubbles={setBubbles}
          setAccessibility={setAccessibility}
        />
			)}
			{accessibility !== 'Accessibility' && (
        <div ref={conditionallySetInert(accessibility === 'Visuals')}>
          <VisualsPage
            cookies={cookies}
            slug={slug}
            bubbles={bubbles}
            setBubbles={setBubbles}
            setAccessibility={setAccessibility}
          />
        </div>
			)}
		</>
	);
};

export default BubblePage;

export const getServerSideProps: GetServerSideProps = async ({
	params,
	req,
}) => {
	let slug = params?.slug ?? '';
	if (Array.isArray(slug)) slug = slug.join('/');

	let allPaths = readdirSync('lib/bubbleData');

	allPaths = allPaths.map((path) => path.split('.')[0]);
	allPaths = allPaths.filter((path) => !path.startsWith('_'));
	allPaths = allPaths.filter((path) => path !== '404');
	allPaths = allPaths.filter((path) => path !== 'index');

	const notFound = !allPaths.includes(slug);

	const bubbleDataImport = notFound
		? {}
		: await import('../lib/bubbleData/' + slug);
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
