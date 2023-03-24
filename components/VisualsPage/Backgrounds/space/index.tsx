import { FunctionComponent, useEffect, useRef } from 'react';
import { WebGLRenderer, PerspectiveCamera, Scene, Color, sRGBEncoding, Clock } from 'three';
import { ambianceGenerator } from './sceneAmbience';
import { starGenerator } from './sceneStars';
import { cloudGenerator } from './sceneClouds';
import { SceneGenerator } from './utility';
import { GraphicsSpaceColorModes, GRAPHICS_SPACE_COLOR_MODES } from '@lib/colorMode';
import WebGl from 'three/examples/jsm/capabilities/WebGL';
import { useGraphics } from '@lib/hooks';

const SpaceBackground: FunctionComponent<{
	bubbleScene: string,
	bubbleSceneReset: string,
	colorTheme: GraphicsSpaceColorModes,
}> = ({colorTheme, bubbleSceneReset, bubbleScene}) => {
  const {setAutoGraphics} = useGraphics();
	const backgroundRef = useRef<HTMLCanvasElement>(null);
	const colorThemeRef = useRef<string>();
	const startingSpeedRef = useRef(15);

	useEffect(() => {
		colorThemeRef.current = colorTheme;
	}, [colorTheme]);
	
	// Boosts after every transition
	useEffect(() => {
		let animationFrame = 0;
		let startAnimationTime = performance.now();

		const speedUp = () => {
			// Records the movement based off of elapsed time
			const endAnimationTime = performance.now();
			const movement = (endAnimationTime - startAnimationTime) / 50;
			startAnimationTime = performance.now();

			if (bubbleSceneReset === bubbleScene) return;
			if (bubbleSceneReset === 'index') {
				// If going back to home page, make it look like you're going back
				startingSpeedRef.current -= movement;
			}
			else {
				startingSpeedRef.current += movement;
			}

			animationFrame = requestAnimationFrame(speedUp);
		};
		animationFrame = requestAnimationFrame(speedUp);

		return () => cancelAnimationFrame(animationFrame);
	}, [bubbleSceneReset, bubbleScene]);

	useEffect(() => {
		if (!backgroundRef.current) return;
		else if (!WebGl.isWebGLAvailable()) {
			return setAutoGraphics('Flat');
		}
		let componentDetached = false;
		
		// Creates the scene and camera.
		const camera = new PerspectiveCamera(50, 1, 5, 210);
		const renderer = new WebGLRenderer({
			canvas: backgroundRef.current,
			alpha: false,
			antialias: false,
		});
		renderer.outputEncoding = sRGBEncoding;
		renderer.autoClear = false;
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
		window.addEventListener('gesturechange', screenResizeTracker);
		window.addEventListener('gestureend', screenResizeTracker);
		renderer.setSize(width, height);
		renderer.setViewport((width - window.innerWidth) / -2, (height - window.innerHeight) / 2, width, height);

		// Tracks the mouse position for later.
		const mousePosition: {x: number, y: number} = {x: window.innerWidth / 2, y: window.innerHeight / 2};
		const mouseMovementTracker = (event: MouseEvent) => {
			mousePosition.x = event.clientX;
			mousePosition.y = event.clientY;
		};
		document.addEventListener('mousemove', mouseMovementTracker);

		let colorMode = GRAPHICS_SPACE_COLOR_MODES.find((e) => e.name === colorThemeRef.current) ?? GRAPHICS_SPACE_COLOR_MODES[0];
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

		const clock = new Clock();
		const lastAnimationTimes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		let frameNumber = 0;

		// Render animation loop.
		const render = () => {
			if (componentDetached) return;

			frameNumber++;

			clock.stop();
			const elapsedTime = clock.getElapsedTime() * 1000;
			lastAnimationTimes.push(elapsedTime);
			lastAnimationTimes.shift();

			const minimumSpeed = Math.min(...lastAnimationTimes);
			const averageSpeed = lastAnimationTimes.reduce((a, b) => a + b) / lastAnimationTimes.length;

			// Sets the speed of the current frame.
			startingSpeedRef.current = startingSpeedRef.current / (1 + (averageSpeed / 1000));
			const speed = (1 + startingSpeedRef.current) * (averageSpeed / 10);
			
			renderer.clear();

			// Recolor the scene's objects.
			if (colorThemeRef.current !== colorMode.name) {
				colorMode = GRAPHICS_SPACE_COLOR_MODES.find(e => e.name === colorThemeRef.current) ?? GRAPHICS_SPACE_COLOR_MODES[0];
				scene.background = new Color(colorMode?.secondary);
				layerResult.forEach((e) => e.recolor({colorMode}));
			}

			// Controls interactivity with the background.
			const screenX = document.documentElement.scrollLeft * 0.1 + (window.innerWidth / 10) - 200;
			const screenY = document.documentElement.scrollTop * 0.1 + (window.innerHeight / 10) - 200;
			camera.position.x = screenX * 0.01;
			camera.position.y = screenY * -0.01;
			const cursorX = mousePosition.x * 0.5 - (window.innerWidth / 4);
			const cursorY = mousePosition.y * 0.5 - (window.innerHeight / 4);
			camera.rotation.y = cursorX * -0.00001;
			camera.rotation.x = cursorY * -0.00001;

			// Animate the scenes.
			layerResult.forEach((e) => e.loop({speed, colorMode}));
			renderer.render(scene, camera);

			// Determine if the scene is slow on the user's device.
			if (frameNumber < 100) {
				if (minimumSpeed > 40 || averageSpeed > 100) {
					setAutoGraphics('Flat');
				}
				if (frameNumber < 99) clock.start();
			}

			requestAnimationFrame(render);
		};
		render();

		return () => {
			componentDetached = true;
			document.removeEventListener('mousemove', mouseMovementTracker);
			window.removeEventListener('gesturechange', screenResizeTracker);
			window.removeEventListener('gestureend', screenResizeTracker);
			window.removeEventListener('resize', screenResizeTracker);
		};
	}, [setAutoGraphics]);

	return (
		<div style={{position: 'fixed', display: 'flex'}}>
			<canvas ref={backgroundRef}/>
		</div>
	);
};

export default SpaceBackground;