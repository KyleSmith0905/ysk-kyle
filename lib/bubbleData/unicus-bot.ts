import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Unicus Bot',
		summary: 'Unicus bot is a multi-functional Discord chat bot. The chat bot replaced all other essential bots that would be in a Discord server. It could moderate messages, play games, and greets users.',
		image: 'unicus-bot',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 125,
	},
	{
		id: 'commands',
		name: 'Commands',
		summary: 'Unicus receives messages receives chat messages and sends back an embed or image, mostly with side effects.',
		connection: 'about',
		radius: 106,
	},
	{
		id: 'gameCommands',
		name: 'Game Commands',
		summary: 'Unicus allows two users to play live games of Chess, pictionary, and a deception game against each other.',
		image: 'fun-commands',
		connection: 'commands',
		radius: 108,
	},
	{
		id: 'jobCommands',
		name: 'Job Commands',
		summary: 'Unicus has commands for users to establish corporations and recruit other users to work for them. Jobs require you to decode information from an image.',
		image: 'job-commands',
		connection: 'commands',
		radius: 118,
	},
	{
		id: 'governmentCommands',
		name: 'Government Commands',
		summary: 'Unicus\'s main goal was to recreate democracy. Any user can join an election for governer of a subregion.',
		image: 'government-commands',
		connection: 'commands',
		radius: 110,
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'Unicus is open source and on GitHub. The code is deprecated and unorganized.',
		connection: 'about',
		radius: 104,
	},
	{
		id: 'framework',
		name: 'Frameworks',
		summary: 'Unicus is built on Eris Discord Library on NodeJS, and stores data with Mongoose.',
		connection: 'development',
		radius: 97,
	},
	{
		id: 'images',
		name: 'Generating Images',
		summary: 'Unicus uses canvas to draw images dynamically.',
		image: 'stock-graph',
		connection: 'development',
		radius: 85,
	},
];

export default PadBubblePositions(bubbleData);