import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'center',
		name: 'Merry Christmas Miranda!',
		summary: 'I hope you have a wonderful holiday season! I built you a page on my website to show you how much I love you.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 117,
	},
	{
		id: 'whatIsThis',
		name: 'What is this?',
		summary: 'This is a website about my programming. But this page is for you!',
		connection: 'center',
		radius: 91,
	},
	{
		id: 'expire',
		name: 'Expiration',
		summary: 'After the holiday season I will remove this page.',
		connection: 'whatIsThis',
		radius: 77,
	},
	{
		id: 'code',
		name: 'The Code',
		summary: 'This page was built with programming. You\'re probably not interested in the code, but click this bubble to see it.',
		link: 'https://github.com/KyleSmith0905/ysk-kyle',
		connection: 'whatIsThis',
		radius: 102,
	},
	{
		id: 'lily',
		name: 'Lily',
		summary: 'I hope lily is doing well in school! I last saw her about ~5 years ago!',
		connection: 'center',
		radius: 80,
	},
	{
		id: 'thankful',
		name: 'Thankful For',
		summary: 'I am thankful for being your son.',
		connection: 'center',
		radius: 80,
	},
	{
		id: 'companionship',
		name: 'Companionship',
		summary: 'I am thankful for having you in my life.',
		connection: 'thankful',
		radius: 90,
	},
	{
		id: 'compassion',
		name: 'Compassion',
		summary: 'I am thankful you are always looking after me.',
		connection: 'thankful',
		radius: 81,
	},
	{
		id: 'coaching',
		name: 'Coaching',
		summary: 'I am thankful for parenting 2 other perfect kids.',
		connection: 'thankful',
		radius: 76,
	},
];

export default PadBubblePositions(bubbleData);