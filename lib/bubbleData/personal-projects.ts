import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'projects',
		name: 'My Personal Projects',
		summary: 'Read about all the personal projects I made a substantial contribution in.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 98,
		size: 'large',
	},
	{
		id: 'rtlChallenges',
		name: 'RTL Challenges',
		summary: 'A website for posting challenges on video games.',
		link: 'rtl-challenges',
		image: 'rtl-challenges',
		connection: 'projects',
		radius: 85,
		size: 'small',
	},
	{
		id: 'sortingAlgorithm',
		name: 'Sorting Visualizer',
		summary: 'A website for watching sorting algorithms.',
		link: 'sorting-algorithm-visualizer',
		image: 'sorting-algorithm-visualizer',
		connection: 'projects',
		radius: 83,
		size: 'small',
	},
	{
		id: 'cyberCircleIdenticon',
		name: 'Cyber Circle Identicon',
		summary: 'An identicon-generator node package.',
		link: 'cyber-circle-identicon',
		image: 'cyber-circle-identicon',
		connection: 'projects',
		radius: 87,
		size: 'small',
	},
	{
		id: 'devsUs',
		name: 'Devs Us',
		summary: 'An open source developer community.',
		link: 'devs-us',
		image: 'devs-us',
		connection: 'projects',
		radius: 76,
		size: 'medium',
	},
	{
		id: 'epicColors',
		name: 'Epic Colors',
		summary: 'A cosmetic mod for Among Us.',
		link: 'epic-colors',
		image: 'epic-colors',
		connection: 'devsUs',
		radius: 75,
		size: 'small',
	},
	{
		id: 'cursedAmongUs',
		name: 'Cursed Among Us',
		summary: 'A was-popular Among Us mod.',
		link: 'cursed-among-us',
		image: 'cursed-among-us',
		connection: 'devsUs',
		radius: 81,
		size: 'small',
	},
	{
		id: 'amongChess',
		name: 'Among Chess',
		summary: 'An Among Us implementation of Chess.',
		link: 'among-chess',
		image: 'among-chess',
		connection: 'devsUs',
		radius: 83,
		size: 'small',
	},
	{
		id: 'unicusBot',
		name: 'Unicus Bot',
		summary: 'A Discord bot I learned programming with.',
		link: 'unicus-bot',
		image: 'unicus-bot',
		connection: 'projects',
		radius: 81,
		size: 'small',
	},
	{
		id: 'yskKyle',
		name: 'YSK Kyle',
		summary: 'A portfolio site for me (Kyle Smith).',
		link: 'ysk-kyle',
		image: 'ysk-kyle',
		connection: 'projects',
		radius: 78,
		size: 'small',
	},
	{
		id: 'yskKyleOne',
		name: '1st YSK Kyle',
		summary: 'An outdated portfolio site for myself.',
		link: 'old-ysk-kyle',
		image: 'old-ysk-kyle',
		connection: 'projects',
		radius: 79,
		size: 'small',
	},
];

export default PadBubblePositions('personal-projects', bubbleData);