import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About EStack Industries',
		summary: 'Estack Industries is a subsidary of TeckLink with the goal of developing a Real Estate web app.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 104,
	},
	{
		id: 'image',
		name: 'Estack Industries logo',
		image: 'estack-industries',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'worklife',
		name: 'Life Working At Estack',
		summary: 'Here are a few bubbles to describe my work life experience.',
		connection: 'about',
		radius: 91,
	},
	{
		id: 'meetings',
		name: 'Meetings',
		summary: 'Meetings were held remotely twice a week. We updated each other on the progress we made that week.',
		connection: 'worklife',
		radius: 91,
	},
	{
		id: 'communication',
		name: 'Communication',
		summary: 'Personally, I communicated often with team members. I often notice co-workers could benefit from reusable components (or code) from previous tasks.',
		connection: 'worklife',
		radius: 110,
	},
	{
		id: 'tasks',
		name: 'Tasks',
		summary: 'Weekly, we are assigned a task. Most often, it\'s to make a webpage on the website.',
		connection: 'worklife',
		radius: 84,
	},
	{
		id: 'accomplishments',
		name: 'Accomplishments',
		summary: 'During my time at Estack, I accomplished many things. Here are some of the most important accomplishments.',
		connection: 'about',
		radius: 108,
	},
	{
		id: 'linkage',
		name: 'Linkage',
		summary: 'I connected the entire frontend to itself and to the backend.',
		connection: 'accomplishments',
		radius: 75,
	},
	{
		id: 'background',
		name: 'Nav Background',
		summary: 'After noticing no page had the background design from figma, I built a component that generated the background. Over time, the component grew to acquire more features.',
		connection: 'accomplishments',
		radius: 118,
	},
	{
		id: 'accountpage',
		name: 'Account Page',
		summary: 'I was assigned to build an account page, this featured a working message box, statistics dashboard, and many other functionalities.',
		connection: 'accomplishments',
		radius: 110,
	},
];

export default PadBubblePositions(bubbleData);