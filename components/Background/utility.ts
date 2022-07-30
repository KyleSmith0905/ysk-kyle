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

const sineSmooth = (x: number, left: number, right: number, top: number, bottom: number) => {
	const value = MathUtils.clamp(x, right, left);
	const verticalScale = (top + bottom) * -0.5;
	const verticalTranslate = top * 0.5;
	const horizontalTranslate = right * -1;
	const horizontalScale = 2 * Math.PI / (left - right);
	return Math.cos((value + horizontalTranslate) * horizontalScale) * verticalScale + verticalTranslate;
};

export { randomPointInTorus, sineSmooth };
export type { SceneGenerator };
