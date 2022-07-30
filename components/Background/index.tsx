import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef } from 'react';
import { WebGLRenderer, PerspectiveCamera, Scene, Color } from 'three';
import { ambianceGenerator } from './sceneAmbience';
import { starGenerator } from './sceneStars';
import { cloudGenerator } from './sceneClouds';
import { SceneGenerator } from './utility';
import { GraphicsLevels } from '../../lib/graphicsLevel';
import { ColorModes, COLOR_MODES } from '../../lib/colorMode';

const Background: FunctionComponent<{
	setAutoGraphics: Dispatch<SetStateAction<GraphicsLevels | 'Assume-High'>>,
	colorTheme: ColorModes,
}> = ({setAutoGraphics, colorTheme}) => {
	const backgroundRef = useRef<HTMLCanvasElement>(null);
	const colorThemeRef = useRef<string>();

	useEffect(() => {
		colorThemeRef.current = colorTheme;
	}, [colorTheme]);

	useEffect(() => {
		if (!backgroundRef.current) return;
		let componentDetached = false;

		const width = document.documentElement.offsetWidth;
		const height = document.documentElement.offsetHeight;

		const camera = new PerspectiveCamera(75, 1, 5, 800);
		const renderer = new WebGLRenderer({
			canvas: backgroundRef.current,
			alpha: false,
			antialias: false,
		});
		renderer.setSize(width, height);
		const scene = new Scene();
		let colorMode = COLOR_MODES.find(e => e.name === colorTheme) ?? COLOR_MODES[0];
		scene.background = new Color(colorMode?.secondary);

		const sceneGenerators: {[key: string]: SceneGenerator} = {
			star: starGenerator,
			ambiance: ambianceGenerator,
			cloud: cloudGenerator,
		};

		// Hydrates the scenes and prepares everything for animation.
		const layerResult = Object.values(sceneGenerators).map(layer => layer({scene, width, height}));
		layerResult.forEach((e) => e.initial({colorMode}));
		
		camera.position.z = 5;
		
		renderer.autoClear = false;
		
		const lastFiveAnimationTimes = [0, 0, 0, 0, 0];

		let startingSpeed = 25;
		const render = () => {
			const startTimestamp = Date.now();

			if (componentDetached) return;
			startingSpeed = startingSpeed / 1.01;
			const speed = 1 + startingSpeed;
			
			renderer.clear();

			// Animate the scenes.
			layerResult.forEach((e) => e.loop({speed}));
			renderer.render(scene, camera);

			// Determine if the scene is slow on the user's device.
			const endTimestamp = Date.now();
			const animationTime = startTimestamp - endTimestamp;
			lastFiveAnimationTimes.push(animationTime);
			lastFiveAnimationTimes.shift();
			if (lastFiveAnimationTimes.every((time) => time < -30)) {
				setAutoGraphics('Low');
			}

			// Recolor the scene's objects.
			if (colorThemeRef.current !== colorMode.name) {
				colorMode = COLOR_MODES.find(e => e.name === colorThemeRef.current) ?? COLOR_MODES[0];
				scene.background = new Color(colorMode?.secondary);
				layerResult.forEach((e) => e.recolor({colorMode}));
			}

			requestAnimationFrame(render);
		};
		render();

		return () => {
			componentDetached = true;
		};
	}, [setAutoGraphics]);

	return (
		<div style={{position: 'absolute', display: 'flex'}}>
			<canvas ref={backgroundRef}/>
		</div>
	);
};

export default Background;