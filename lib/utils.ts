import { IBubble } from './bubbleData/_shared';

/**
 * Checks if a number is between two values
 * @param value - The number to check
 * @param min - The minimum value
 * @param max - The maximum value
 * @return Returns true if value is between min and max
 */
const IsNumberBetween = (value: number, min: number, max: number): boolean => {
	return value < max && value > min;
};

/**
 * Clamps a number between two values. If the number is outside of bounds of two numbers, it will lock it to one ends
 * @param value - The number to clamp
 * @param min - The minimum value
 * @param max - The maximum value
 * @returns A number in between the minimum and maximum value.
 */
const clamp = (value: number, min: number, max: number): number => {
	return Math.min(Math.max(value, min), max);
};

/**
 * Checks all numbers in array to see if any are NaN
 * @param coordinates - An array of numbers
 * @return Returns true if any value in array is NaN
 */
const IsArrayNaN = (coordinates: number[]): boolean => {
	return coordinates.some(coordinate => {
		return isNaN(coordinate) || coordinate === null;
	});
};

/**
 * Compares two arrays of any data type
 * @param array1 - The first array to compare
 * @param array2 - The second array to compare
 * @return Returns true if arrays are equal
 */
const IsArraysEqual = <arrayType>(array1: arrayType[] | undefined, array2: arrayType[] | undefined): boolean => {
	if (
		array1 === undefined
		|| array2 === undefined
		|| array1.length !== array2.length
	) {
		return false;
	}

	for (let i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) {
			return false;
		}
	}

	return true;
};

/**
 * Calculates the distance between two points (one from the center, one at (x, y)) using pythagorean theorem
 * @param x - The x coordinate
 * @param y - The y coordinate
 * @return Returns the distance between two points
 */
const Pythagorean = (x: number, y: number): number => {
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

/**
 * Compares a bubble with all other bubbles to see if it may overlap
 * @param bubble - The coordinates to check
 * @param bubbles - The array of coordinates to check against
 * @return Returns indexes of bubbles that overlap
 */
const CoordinateCollisions = (bubble: [number, number, number], bubbles: [number, number, number][]): number[] => {
	const overlapping = [];

	for (let i = 0; i < bubbles.length; i++) {
		const collisionDistance = (bubble[2] + bubbles[i][2]) / 20;
		if (Pythagorean(bubbles[i][0] - bubble[0], bubbles[i][1] - bubble[1]) < collisionDistance + 0.5) {
			overlapping.push(i);
		}
	}

	return overlapping;
};

/**
 * Compares a bubble with all other bubbles to see if it may overlap
 * @param bubble - The coordinates and the radiusto check
 * @param bubbles - The array of coordinates and radius to check against
 * @return Returns true if bubbles collide
*/
const IsCollideWithBubbles = (bubble: [number, number, number], bubbles: [number, number, number][]): boolean => {
	return CoordinateCollisions(bubble, bubbles).length > 0;
};

const UserAgentIsBot = (userAgent: string): boolean => {
	userAgent = userAgent.toLowerCase();
	const COMMON_BOT_NAMES = ['bot', 'crawl', 'spider', 'slurp', 'archiver'];
	if (COMMON_BOT_NAMES.some(bot => userAgent.includes(bot))) {
		return true;
	}
	else return false;
};

/**
 * Detects if the user is a self-identified robot, crawler, or anything else
 * @returns Whether the user is a userbot
 */
const IsUserBot = (userAgent?: string): boolean => {
	if (userAgent) {
		return UserAgentIsBot(userAgent);
	}
	else if (typeof window === 'undefined') { 
		return false;
	}
	else {
		return UserAgentIsBot(window.navigator.userAgent);
	}
};

const SetBubbleTransform = (bubble: IBubble, bubbleElement: HTMLElement | null): void => {
	if (bubbleElement) bubbleElement.style.transform = 'translate('
	+ (bubble.position[0] * 20 - bubble.radius) + 'px,'
	+ (bubble.position[1] * 20 - bubble.radius) + 'px)';
};

const objectToQueryString = (obj: {[key: string]: string | undefined}): string => {
	return Object.keys(obj).map(key => encodeURI(key) + '=' + encodeURI(obj[key] ?? '')).join('&');
};

export {
	IsNumberBetween,
	clamp,
	IsArrayNaN,
	IsArraysEqual,
	Pythagorean,
	CoordinateCollisions,
	IsCollideWithBubbles,
	IsUserBot,
	SetBubbleTransform,
	objectToQueryString
};