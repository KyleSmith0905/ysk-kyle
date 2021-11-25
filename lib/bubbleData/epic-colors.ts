import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Epic Colors',
		summary: 'Epic Colors is an Among Us cosmetics mod. Players could change their character\'s color.',
		image: 'epic-colors',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 105,
	},
	{
		id: 'image',
		name: 'Epic Colors Image',
		image: 'epic-colors-example',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'The mod was built on Reactor, an Among Us modding API. Reactor was built on BepInEx, a Unity game patcher. BepInEx was built on Harmony, a C# patcher.',
		link: 'https://github.com/Devs-Us/EpicColors',
		connection: 'about',
		radius: 119,
	},
	{
		id: 'contribution',
		name: 'My Contributions',
		summary: 'I was a major GitHub contributor. I introduced a variety of features.',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'refactor',
		name: 'Refactor',
		summary: 'To make it a lot easier to add new colors, I introduced a reusable way to add colors. I moved everything from arrays, to classes.',
		connection: 'contribution',
		radius: 98,
	},
	{
		id: 'autoBuild',
		name: 'Auto Template',
		summary: 'Before our team introduced a feature allowing everyone to make a template of their favorite colors. I foresaw some minor issues, particularly with ease-of-use. Solution: I made the template build automatically.',
		connection: 'contribution',
		radius: 123,
	},
	{
		id: 'animated',
		name: 'Animated Colors',
		summary: 'To make Epic Colors stand out, we introduced animated colors.',
		connection: 'contribution',
		radius: 91,
	},
	{
		id: 'hueAnimated',
		name: 'Hue',
		summary: 'Gradually change through colors of the rainbow over a set period of time.',
		connection: 'animated',
		radius: 88,
	},
	{
		id: 'refreshAnimated',
		name: 'Refresh',
		summary: 'Instantly swap to another color every set period of time.',
		connection: 'animated',
		radius: 83,
	},
];

export default PadBubblePositions(bubbleData);