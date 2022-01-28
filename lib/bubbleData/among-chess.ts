import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Among Chess',
		summary: 'An Among Us mod for playing chess. All specials rules were implemented, such as: en passant, castling, and stalemating.',
		image: 'among-chess',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 115,
		size: 'large',
	},
	{
		id: 'image',
		name: 'Among Chess showcase',
		image: 'among-chess-showcase',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'settings',
		name: 'Variations',
		summary: 'The mod has many variations to spice up each game.',
		connection: 'about',
		radius: 77,
		size: 'medium',
	},
	{
		id: 'realTime',
		name: 'Real Time',
		summary: 'The real time variation allows both players to play without taking turns, it\'s very action pack.',
		connection: 'settings',
		radius: 90,
		size: 'small',
	},
	{
		id: 'chess960',
		name: 'Chess 960',
		summary: 'Chess 960 board randomizes the pieces positions, every game is different.',
		connection: 'settings',
		radius: 87,
		size: 'small',
	},
	{
		id: 'development',
		name: 'Development Info',
		summary: 'The mod is open source and on GitHub. I am the only contributor.',
		link: 'https://github.com/KyleSmith0905/Among-Chess',
		connection: 'about',
		radius: 93,
		size: 'medium',
	},
	{
		id: 'framework',
		name: 'Framework',
		summary: 'The mod was built on Reactor, an Among Us modding API. Reactor uses BepInEx and Harmony.',
		connection: 'development',
		radius: 94,
		size: 'small',
	},
];

export default PadBubblePositions(bubbleData);