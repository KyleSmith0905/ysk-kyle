import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

// A custom page with a little bit of everything to run tests
const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'core',
		name: 'End To End Testing!',
		summary: 'A custom page with a little bit of everything to run automated tests.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 100,
		size: 'large',
	},
	{
		id: 'backgroundImage',
		name: 'Example Background Image',
		summary: 'An example external link for automated testing.',
		image: 'ysk-kyle',
		connection: 'core',
		radius: 100,
		size: 'medium',
	},
	{
		id: 'image',
		name: 'Example image',
		image: 'ysk-kyle',
		connection: 'core',
		radius: 100,
		size: 'medium',
	},
	{
		id: 'internalLink',
		name: 'Example Internal Link',
		summary: 'An example internal link for automated testing.',
		connection: 'core',
    link: 'index',
		radius: 100,
		size: 'medium',
	},
	{
		id: 'externalLink',
		name: 'Example External Link',
		summary: 'An example external link for automated testing.',
		connection: 'core',
    link: 'https://blog.yskkyle.com',
		radius: 100,
		size: 'medium',
	},
];

export default PadBubblePositions('e2e', bubbleData);