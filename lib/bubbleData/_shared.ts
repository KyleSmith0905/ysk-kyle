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
}

export const PadBubblePositions = (bubbles: IBubbleWithoutPosition[]): IBubble[] => {
	// @ts-ignore
	const output: IBubble[] = bubbles.map(obj => {
		const newProperties = {
			position: SetValuesElseNaN(obj.position),
			pivotPosition: SetValuesElseNaN(obj.pivotPosition),
			deployPosition: SetValuesElseNaN(obj.deployPosition),
		}
		return Object.assign(obj, newProperties);
	});
	return output;
}

export type {IBubble, IBubbleWithoutPosition}