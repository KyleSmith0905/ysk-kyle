import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Cyber Circle Identicon',
		summary: 'Uses text to generate a circle design. Web apps can import the library and use it to generate default profile pictures.',
		image: 'cyber-circle-identicon',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 107,
	},
	{
		id: 'example',
		name: 'Examples',
		summary: 'Here are 3 examples of randomly generated Cyber Circles.',
		connection: 'about',
		radius: 81,
	},
	{
		id: 'example-1',
		name: 'Webpage',
		image: 'cc-identicon-example-1',
		connection: 'example',
		radius: 100,
	},
	{
		id: 'example-2',
		name: 'Webpage',
		image: 'cc-identicon-example-2',
		connection: 'example',
		radius: 100,
	},
	{
		id: 'example-3',
		name: 'Webpage',
		image: 'cc-identicon-example-3',
		connection: 'example',
		radius: 100,
	},
	{
		id: 'hashing',
		name: 'Hashing',
		summary: 'The text begins by being hashed, using a personal implementation of SHA-256.',
		connection: 'about',
		radius: 88,
	},
	{
		id: 'serialization',
		name: 'Serialization',
		summary: 'By reading the bytes of the hashed text, I generate random values for all the values I need.',
		connection: 'hashing',
		radius: 92,
	},
	{
		id: 'physics',
		name: 'Physics',
		summary: 'Using the values of the circle\'s element positions, I calculate the optimal place to locate each circle, I remove circles that doesn\'t fit.',
		connection: 'serialization',
		radius: 98,
	},
	{
		id: 'rendering',
		name: 'Rendering',
		summary: 'With the calculated circle\'s data, I generate a PNG by passing it through a render function I optimized for Cyber Circles.',
		connection: 'physics',
		radius: 96,
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'The NPM package was programmed in TypeScript and compiled with babel.',
		connection: 'about',
		link: 'https://github.com/KyleSmith0905/cyber-circle-identicon',
		radius: 100,
	},
	{
		id: 'documentation',
		name: 'Documentation',
		summary: 'The documentation is a NextJS app, it allows users to test out the package.',
		connection: 'development',
		link: 'https://ccidenticon.vercel.app/',
		radius: 99,
	},
];

export default PadBubblePositions(bubbleData);