import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'center',
		name: 'An Error Occurred!',
		summary: 'An error occurred while loading the page. Make sure you are visiting the correct URL.',
		image: 'ysk-kyle-page',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 106,
	},
	{
		id: 'home1',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'center',
		radius: 76,
	},
	{
		id: 'home1a',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1',
		radius: 76,
	},
	{
		id: 'home1b',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1',
		radius: 76,
	},
	{
		id: 'home1c',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home1',
		radius: 76,
	},
	{
		id: 'home2',
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
		connection: 'home2',
		radius: 76,
	},
	{
		id: 'home2b',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2',
		radius: 76,
	},
	{
		id: 'home2c',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home2',
		radius: 76,
	},
	{
		id: 'home3',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'center',
		radius: 76,
	},
	{
		id: 'home3a',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home3',
		radius: 76,
	},
	{
		id: 'home3b',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home3',
		radius: 76,
	},
	{
		id: 'home3c',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home3',
		radius: 76,
	},
	{
		id: 'home4',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'center',
		radius: 76,
	},
	{
		id: 'home4a',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home4',
		radius: 76,
	},
	{
		id: 'home4b',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home4',
		radius: 76,
	},
	{
		id: 'home4c',
		name: 'To Home',
		summary: 'Click here to go back to the homepage.',
		link: '/',
		connection: 'home4',
		radius: 76,
	},
];

export default PadBubblePositions(bubbleData);