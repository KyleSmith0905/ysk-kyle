import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'center',
		name: 'Merry Christmas!',
		summary: 'Merry Christmas Spencer, Aubrey, Doggie, and Ciri! I hope you are doing wonderful this holiday season!',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 99,
	},
	{
		id: 'whatIsThis',
		name: 'What is this?',
		summary: 'This is a website about my programming. But this page is for you four!',
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
		summary: 'This page was built with programming. Spencer might be interested in the code. Click this bubble to see the code.',
		link: 'https://github.com/KyleSmith0905/ysk-kyle',
		connection: 'whatIsThis',
		radius: 102,
	},
	{
		id: 'everyone',
		name: 'Everyone',
		summary: 'I love all four of you! My memories are filled with you all!',
		connection: 'center',
		radius: 78,
	},
	{
		id: 'spencer',
		name: 'Spencer',
		summary: 'You make every game hilarious. Your advice seems to always hit the spot. You balanced fun and serious very well.',
		connection: 'everyone',
		radius: 98,
	},
	{
		id: 'aubrey',
		name: 'Aubrey',
		summary: 'When you surprise, prank, or socialize with others, it will always be huge and elaborate.',
		connection: 'everyone',
		radius: 84,
	},
	{
		id: 'doggie',
		name: 'Doggie',
		summary: 'You made me love dogs. You will never be tired of play fighting with your unlimited energy.',
		connection: 'everyone',
		radius: 89,
	},
	{
		id: 'ciri',
		name: 'Ciri',
		summary: 'You are a new member. I hope you find your mate eventually.',
		connection: 'everyone',
		radius: 78,
	},
	{
		id: 'travel',
		name: 'Travel',
		summary: 'I hope I could travel to you again! Like always, it will be an unforgettable journey!',
		connection: 'center',
		radius: 95,
	},
];

export default PadBubblePositions(bubbleData);