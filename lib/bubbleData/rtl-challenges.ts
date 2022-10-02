import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About RTL Challenges',
		summary: 'RTL Challenges is a user-generated content website. Users create challenges they want other people to try for video games.',
		image: 'rtl-challenges',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 112,
		size: 'large'
	},
	{
		id: 'image',
		name: 'RTL Challenges Webpage',
		link: 'https://rtlchallenges.com/',
		image: 'rtl-challenges-page',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'RTL Challenges was my first web design experience. The site however, looks rather professional.',
		connection: 'about',
		radius: 104,
		size: 'medium'
	},
	{
		id: 'framework',
		name: 'Frameworks',
		summary: 'The website was built with React and Next. Database and authentification was built with Firebase. Backend testing with Mocha.',
		connection: 'development',
		radius: 104,
		size: 'small',
	},
	{
		id: 'lighthouse',
		name: 'Web Practices',
		summary: 'The site received 100% on best practices, accessibility, and SEO, with a 99% on performance on Google\'s Lighthouse.',
		connection: 'about',
		radius: 104,
		size: 'small'
	},
	{
		id: 'performance',
		name: 'Performance',
		summary: 'During development, I made performance a priority (mostly on the homepage and other shared pages). I considered hosting, http requests, promises, and many more.',
		connection: 'lighthouse',
		radius: 117,
		size: 'small'
	},
	{
		id: 'practices',
		name: 'Best Practices',
		summary: 'I researched what users love. Things like removing the flash of not styled content, and mobile optimization.',
		connection: 'lighthouse',
		radius: 101,
		size: 'small'
	},
	{
		id: 'accessibility',
		name: 'Accessibility',
		summary: 'I had always thought no disability should bar someone from accessing the website. All essential buttons are tabulable, all headings are properly tagged, and special theme settings.',
		connection: 'lighthouse',
		radius: 114,
		size: 'small'
	},
];

export default PadBubblePositions('rtl-challenges', bubbleData);