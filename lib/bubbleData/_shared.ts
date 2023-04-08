interface IBubble {
	id: string; // Unique identifier
	name: string; // Heading
	summary?: string; // Short summary
	link?: string; // Link to the further information
	image?: string; // Image to display
	connection: string; // Connections to other bubbles
	position: [number, number]; // Position on the map
	pivotPosition: [number, number]; // Position without drift
	deployPosition: [number, number]; // Position of the bubble when deployed
	radius: number; // Radius of the bubble
	size?: 'small' | 'medium' | 'large'; // Size of the bubble
}

interface IBubbleWithoutPosition extends Omit<IBubble, 'position' | 'pivotPosition' | 'deployPosition'> {
	position?: [number, number];
	pivotPosition?: [number, number];
	deployPosition?: [number, number];
}

const SetValuesElseNaN = (value: [number, number] | undefined): [number, number] => {
	if (value === undefined) {
		return [Number.NaN, Number.NaN];
	}
	else {
		return value;
	}
};

export const PadBubblePositions = (originId: string, bubbles: IBubbleWithoutPosition[]): IBubble[] => {
	const output: IBubble[] = bubbles.map(bubble => {
		const newProperties = {
			position: SetValuesElseNaN(bubble.position),
			pivotPosition: SetValuesElseNaN(bubble.pivotPosition),
			deployPosition: SetValuesElseNaN(bubble.deployPosition),
			id: `${originId}_${bubble.id}`,
		};
		if (bubble.connection !== '.') bubble.connection = `${originId}_${bubble.connection}`;

		if (bubble.size === 'small') bubble.radius = bubble.radius * 1;
		else if (bubble.size === 'large') bubble.radius = bubble.radius * 1.2;
		else bubble.radius = bubble.radius * 1.1;
		return Object.assign(bubble, newProperties);
	});
	return output;
};

export type {IBubble, IBubbleWithoutPosition};