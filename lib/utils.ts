/**
 * Checks if a number is between two values
 * @param {number} value - The number to check.
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @return {boolean} Returns true if value is between min and max.
 */
const IsNumberBetween = (value: number, min: number, max: number): boolean => {
	return value < max && value > min;
};

/**
 * Checks all numbers in array to see if any are NaN.
 * @param {array} coordinates - An array of numbers.
 * @return {boolean} Returns true if any value in array is NaN.
 */
const IsArrayNaN = (coordinates: number[]): boolean => {
	return coordinates.some(coordinate => isNaN(coordinate));
};

/**
 * Compares two arrays of any data type.
 * @param {array} array1 - The first array to compare.
 * @param {array} array2 - The second array to compare.
 * @return {boolean} Returns true if arrays are equal.
 */
const IsArraysEqual = (array1: any[] | undefined, array2: any[] | undefined): boolean => {
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
 * Calculates the distance between two points (one from the center, one at (x, y)) using pythagorean theorem.
 * @param {number} x - The x coordinate.
 * @param {number} y - The y coordinate.
 * @return {number} Returns the distance between two points.
 */
const Pythagorean = (x: number, y: number): number => {
	return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};

/**
 * Compares a bubble with all other bubbles to see if it may overlap.
 * @param {[number, number]} bubble - The coordinates to check.
 * @param {array} bubbles - The array of coordinates to check against.
 * @param {number} distance - The distance between bubbles.
 * @return {array} Returns indexes of bubbles that overlap.
 */
const CoordinateCollisions = (bubble: [number, number, number], bubbles: [number, number, number][]): number[] => {
	let overlapping = [];

	for (let i = 0; i < bubbles.length; i++) {
		const collisionDistance = (bubble[2] + bubbles[i][2]) / 20;
		if (Pythagorean(bubbles[i][0] - bubble[0], bubbles[i][1] - bubble[1]) < collisionDistance + 0.5) {
			overlapping.push(i);
		}
	}

	return overlapping;
};

/**
 * Compares a bubble with all other bubbles to see if it may overlap.
 * @param {[number, number]} bubble - The coordinates to check.
 * @param {array} bubbles - The array of coordinates to check against.
 * @param {number} distance - The distance between bubbles.
 * @return {boolean} Returns true if bubbles collide.
*/
const IsCollideWithBubbles = (bubble: [number, number, number], bubbles: [number, number, number][]): boolean => {
	return CoordinateCollisions(bubble, bubbles).length > 0;
};


export {IsNumberBetween, IsArrayNaN, IsArraysEqual, Pythagorean, CoordinateCollisions, IsCollideWithBubbles};