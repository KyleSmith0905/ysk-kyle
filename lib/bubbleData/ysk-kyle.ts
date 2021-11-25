import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About YSK Kyle',
		summary: 'YSK Kyle is my portfolio website to display my experience with website design.',
		image: 'ysk-kyle',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 103,
	},
	{
		id: 'image',
		name: 'YSK Kyle Webpage',
		image: 'ysk-kyle-page',
		link: 'https://yskkyle.com/',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'developmentInfo',
		name: 'Development Info',
		summary: 'The code behind YSK Kyle is visible on GitHub. The repository does not allow contributions.',
		link: 'https://github.com/KyleSmith0905',
		connection: 'about',
		radius: 112,
	},
	{
		id: 'framework',
		name: 'Framework',
		summary: 'YSK Kyle was built with React and Next.',
		connection: 'developmentInfo',
		radius: 87,
	},
	{
		id: 'particalEngine',
		name: 'The Partical Engine',
		summary: 'The bubbles were simulated using a quick partical engine I wrote.',
		connection: 'developmentInfo',
		radius: 104,
	},
];

export default PadBubblePositions(bubbleData);