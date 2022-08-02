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
		
		const camera = new PerspectiveCamera(75, 1, 5, 800);
		const renderer = new WebGLRenderer({
			canvas: backgroundRef.current,
			alpha: false,
			antialias: false,
		});
		const scene = new Scene();

		// Saves and updates screen size.
		let width = Math.max(window.innerWidth, window.innerHeight);
		let height = width;
		const screenResizeTracker = () => {
			width = Math.max(window.innerWidth, window.innerHeight);
			height = width;
			renderer.setSize(width, height);
			renderer.setViewport((width - window.innerWidth) / -2, (height - window.innerHeight) / 2, width, height);
		};
		window.addEventListener('resize', screenResizeTracker);
		renderer.setSize(width, height);
		renderer.setViewport((width - window.innerWidth) / -2, (height - window.innerHeight) / 2, width, height);

		// Tracks the mouse position for later.
		const mousePosition: {x: number, y: number} = {x: window.innerWidth / 2, y: window.innerHeight / 2};
		const mouseMovementTracker = (event: MouseEvent) => {
			mousePosition.x = event.clientX;
			mousePosition.y = event.clientY;
		};
		document.addEventListener('mousemove', mouseMovementTracker);

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
			if (componentDetached) return;
			const startTimestamp = Date.now();

			// Sets the speed of the current frame.
			startingSpeed = startingSpeed / 1.01;
			const speed = 1 + startingSpeed;
			
			renderer.clear();

			// Recolor the scene's objects.
			if (colorThemeRef.current !== colorMode.name) {
				colorMode = COLOR_MODES.find(e => e.name === colorThemeRef.current) ?? COLOR_MODES[0];
				scene.background = new Color(colorMode?.secondary);
				layerResult.forEach((e) => e.recolor({colorMode}));
			}

			// Controls interactivity with the background.
			const screenX = document.documentElement.scrollLeft + (window.innerWidth / 2) - 1000;
			const screenY = document.documentElement.scrollTop + (window.innerHeight / 2) - 1000;
			camera.position.x = screenX * 0.01;
			camera.position.y = screenY * -0.01;
			const cursorX = mousePosition.x - (window.innerWidth / 2);
			const cursorY = mousePosition.y - (window.innerHeight / 2);
			camera.rotation.y = cursorX * -0.00001;
			camera.rotation.x = cursorY * -0.00001;

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

			requestAnimationFrame(render);
		};
		render();

		return () => {
			componentDetached = true;
			document.removeEventListener('mousemove', mouseMovementTracker);
			window.removeEventListener('resize', screenResizeTracker);
		};
	}, [setAutoGraphics]);

	return (
		<div style={{position: 'fixed', display: 'flex'}}>
			<canvas ref={backgroundRef}/>
		</div>
	);
};

export default Background;