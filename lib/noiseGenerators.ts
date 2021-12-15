/**
 * Generate noise using sine waves.
 * @param {number} offset - Noise offset.
 * @return {number} - The noise value.
 */
const Noise2D = (offset: number): number => {
	const value = Math.sin(2 * offset) + Math.sin(Math.PI * offset);
	return value * 0.25 + 0.5;
};

export { Noise2D };