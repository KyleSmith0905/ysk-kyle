import { MathUtils, PerspectiveCamera, WebGLRenderer } from 'three';

type SceneGenerator = (
	{camera, renderer, width, height}: {
		camera: PerspectiveCamera,
		renderer: WebGLRenderer,
		width: number,
		height: number
	}
) => {
	initial: () => void,
	loop: ({speed}: {speed: number}) => void
}

const randomPointInTorus = (minorRadius: number, majorRadius: number) => {
	const angle = MathUtils.randFloat(0, Math.PI * 2);
	const distance = MathUtils.randFloat(minorRadius, majorRadius);
	return {
		x: Math.cos(angle) * distance,
		y: Math.sin(angle) * distance,
	};
};

const sineSmooth = (x: number, left: number, right: number, top: number, bottom: number) => {
	const value = MathUtils.clamp(x, right, left);
	const verticalTransform = -(top + bottom);
	const horizontalTransform = Math.cos(((value + left) * Math.PI) / ((left - right) * -0.25));
	return horizontalTransform * verticalTransform + top;
};

export { randomPointInTorus, sineSmooth };
export type { SceneGenerator };
