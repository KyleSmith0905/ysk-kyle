import { redirectMap } from '../redirects';
import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

// For route forwarding, we should have a page mainly to display all the links so I can use it later.
const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'forwarding',
		name: 'Forwarding Links',
		summary: 'A directory of various redirects maintained by my site used to shorten links. This is for personal use only.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 120,
		size: 'large',
	},
  ...redirectMap.map((redirectData): IBubbleWithoutPosition => ({
    id: redirectData.source.split('f/')[1],
    name: redirectData.name,
    summary: '',
    link: `https://www.yskkyle.com${redirectData.source}`,
    connection: 'forwarding',
    radius: 75,
    size: 'small',
  })),
];

export default PadBubblePositions('f', bubbleData);