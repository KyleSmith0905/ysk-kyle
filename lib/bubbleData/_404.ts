import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'center',
		name: '404: Page Not Found',
		summary: 'The page you are looking for does not exist. Feel free to go back to the home page.',
		image: 'ysk-kyle-page',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 107,
	},
	{
		id: 'home1a',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'center',
		radius: 76,
	},
	{
		id: 'home2a',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'center',
		radius: 76,
	},
	{
		id: 'home1b',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1a',
		radius: 76,
	},
	{
		id: 'home2b',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2a',
		radius: 76,
	},
	{
		id: 'home1c',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1b',
		radius: 76,
	},
	{
		id: 'home2c',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2b',
		radius: 76,
	},
	{
		id: 'home1d',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1c',
		radius: 76,
	},
	{
		id: 'home2d',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2c',
		radius: 76,
	},
	{
		id: 'home1e',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1d',
		radius: 76,
	},
	{
		id: 'home2e',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2d',
		radius: 76,
	},
	{
		id: 'home1f',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1e',
		radius: 76,
	},
	{
		id: 'home2f',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2e',
		radius: 76,
	},
	{
		id: 'home1g',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1f',
		radius: 76,
	},
	{
		id: 'home2g',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2f',
		radius: 76,
	},
	{
		id: 'home1h',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1g',
		radius: 76,
	},
	{
		id: 'home2h',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2g',
		radius: 76,
	},
	{
		id: 'home1i',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1h',
		radius: 76,
	},
	{
		id: 'home2i',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2h',
		radius: 76,
	},
];

export default PadBubblePositions('404', bubbleData);