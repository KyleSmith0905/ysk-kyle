import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About Devs Us',
		summary: 'An Among Us development group involved with creating many small open-source mods. The team consisted of artists, public relations, and programmers from all around the world.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 119,
	},
	{
		id: 'image',
		name: 'Devs Us logo',
		image: 'devs-us',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'modsDeveloped',
		name: 'Mods Developed',
		summary: 'Devs Us used their talented minds to create a few popular mods.',
		link: 'https://github.com/Devs-Us',
		connection: 'about',
		radius: 90,
	},
	{
		id: 'cursedAmongUs',
		name: 'Cursed Among Us',
		summary: 'The flagship Devs Us mod.',
		image: 'cursed-among-us',
		connection: 'modsDeveloped',
		link: 'cursed-among-us',
		radius: 75,
	},
	{
		id: 'epicColors',
		name: 'Epic Colors',
		summary: 'A cosmetic mod.',
		image: 'epic-colors',
		connection: 'modsDeveloped',
		link: 'epic-colors',
		radius: 68,
	},
	{
		id: 'role',
		name: 'My Role',
		summary: 'After a few major contributions, I went from programmer to an owner of Devs Us.',
		connection: 'about',
		radius: 92,
	},
];

export default PadBubblePositions(bubbleData);