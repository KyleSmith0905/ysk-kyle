import { MathUtils, Scene } from 'three';
import { ColorMode } from '../../lib/colorMode';

type SceneGenerator = (
	{scene, width, height}: {
		scene: Scene,
		width: number,
		height: number,
	}
) => {
	initial: ({colorMode}: {colorMode: ColorMode}) => void,
	loop: ({speed}: {speed: number}) => void,
	recolor: ({colorMode}: {colorMode: ColorMode}) => void,
}

const randomPointInTorus = (minorRadius: number, majorRadius: number) => {
	const angle = MathUtils.randFloat(0, Math.PI * 2);
	const distance = MathUtils.randFloat(minorRadius, majorRadius);
	return {
		x: Math.cos(angle) * distance,
		y: Math.sin(angle) * distance,
		distance: distance,
		angle: angle,
	};
};

/**
 * Creates a sine wave that is one full wave. Note: This if you want half of a sine wave, extend the length by 2.
 * @param x - The current value of the function
 * @param left - The input minimum value
 * @param right - The input maximum value
 * @param top - The output maximum value
 * @param bottom - The output minimum value
 */
const sineSmooth = (x: number, left: number, right: number, top: number, bottom: number) => {
	const value = MathUtils.clamp(x, left, right);
	// How to scale and translate the value after applying trigonometry
	const verticalScale = (top + bottom) * -0.5;
	const verticalTranslate = top * 0.5;
	// How to scale and transform the value before applying trigonometry
	const horizontalTranslate = right * -1;
	const horizontalScale = 2 * Math.PI / (left - right);
	return Math.cos((value + horizontalTranslate) * horizontalScale) * verticalScale + verticalTranslate;
};

export { randomPointInTorus, sineSmooth };
export type { SceneGenerator };
