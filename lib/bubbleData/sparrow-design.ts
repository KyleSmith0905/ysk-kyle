import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Sparrow Design',
		summary: 'Sparrow Design is a small web design agency working with many clients, small and large.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 103,
		size: 'large',
	},
	{
		id: 'image',
		name: 'Sparrow Design logo',
		image: 'sparrow-design',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'worklife',
		name: 'Life Working At Sparrow Design',
		summary: 'I enjoyed working at Sparrow Design a lot.',
		connection: 'about',
		radius: 98,
		size: 'medium',
	},
	{
		id: 'inPerson',
		name: 'In Person',
		summary: 'I love having an office to work at. At Sparrow Design, I worked with the same few employees in an office. We bonded greatly together.',
		connection: 'worklife',
		radius: 102,
		size: 'small',
	},
	{
		id: 'learning',
		name: 'Learning',
		summary: 'At Sparrow Design I was given an opportunity to learn new technologies. I quickly became efficient with the tools within days or weeks.',
		connection: 'worklife',
		radius: 101,
		size: 'small',
	},
	{
		id: 'duties',
		name: 'Duties',
		summary: 'I had a small but valuable amount of freedom. I was able to become productive by switching between tasks whenever a task became unexpectedly exhausting.',
		connection: 'worklife',
		radius: 112,
		size: 'small',
	},
	{
		id: 'accomplishments',
		name: 'Accomplishments',
		summary: 'During my time at Sparrow Design, I accomplished many things. Here are some of the most important accomplishments.',
		connection: 'about',
		radius: 113,
		size: 'medium',
	},
	{
		id: 'proForex',
		name: 'proForexTrades',
		summary: 'Adapting to the code in only a week, I programmed a redesigned landing page for new users. I built a coupon code functionality to kickstart the mobile release. I also refactored an not optimized class and shrunk it\'s code size by ~20x.',
		connection: 'accomplishments',
		radius: 134,
		size: 'small',
	},
	{
		id: 'prankTube',
		name: 'Prank Tube',
		summary: 'Designed, programmed, and prepared a near fully-functioning youtube-like app to present to a client.',
		connection: 'accomplishments',
		radius: 97,
		size: 'small',
	},
	{
		id: 'friends',
		name: 'Friends',
		summary: 'The greatest accomplishment was the friends we have made along the way.',
		connection: 'accomplishments',
		radius: 91,
		size: 'small',
	},
];

export default PadBubblePositions(bubbleData);