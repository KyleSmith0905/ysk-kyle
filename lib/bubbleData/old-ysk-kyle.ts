import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About the Old YSK Kyle',
		summary: 'The old YSK Kyle displayed information about my personality as well as my portfolio.',
		image: 'old-ysk-kyle',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 105,
		size: 'large',
	},
	{
		id: 'image',
		name: 'Former YSK Kyle Webpage',
		image: 'old-ysk-kyle-page',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'The website was built on a Wordpress theme. I heavily modified the CSS to customize it to my theme.',
		connection: 'about',
		radius: 108,
		size: 'medium',
	},
	{
		id: 'flaw',
		name: 'Overlooked Flaw',
		summary: 'For a Wordpress site, it lacked the customization I wanted.',
		connection: 'about',
		radius: 97,
		size: 'small',
	},
];

export default PadBubblePositions(bubbleData);