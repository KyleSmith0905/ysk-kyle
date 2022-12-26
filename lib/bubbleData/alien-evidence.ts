import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Alien Evidence',
		summary: 'A yellow-press publication for deceiving Alien Evidence papers.',
		image: 'among-chess',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 108,
		size: 'large',
	},
	{
		id: 'image',
		name: 'Alien Evidence showcase',
		image: 'alien-evidence-showcase',
        link: 'https://alienevidence.vercel.app/',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'Alien Evidence was built with NextJS, MongoDB, and AWS.',
		connection: 'about',
		radius: 104,
		size: 'medium',
	},
	{
		id: 'cronJobs',
		name: 'Scheduled Functions',
		summary: 'On a regular schedule all projects are ranked on popularity. There are hard protections to prevent someone from boosting an article to popularity.',
		connection: 'development',
		radius: 116,
		size: 'small',
	},
];

export default PadBubblePositions('among-chess', bubbleData);