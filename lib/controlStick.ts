import { Pythagorean } from './utils';

/**
 * Calculates where the control stick is moving towards.
 * @param mousePosition - Relative mouse position.
 * @return Movement position.
 */
export const controlStickPhysics = (mousePosition: number[]): [number, number] => {
	const angle = Math.atan2(mousePosition[1], mousePosition[0]);
	const distance = Math.min(30, Pythagorean(mousePosition[0], mousePosition[1]));

	if (distance < 5) return [0, 0];

	return [Math.cos(angle) * distance, Math.sin(angle) * distance];
};