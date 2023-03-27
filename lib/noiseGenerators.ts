/**
 * Generate noise using sine waves. Outputs a value between 0 and 1.
 * @param offset - Noise offset.
 * @return The noise value.
 */
const noise2d = (offset: number): number => {
	const value = Math.sin(2 * offset) + Math.sin(Math.PI * offset);
	return value * 0.25 + 0.5;
};

export { noise2d };