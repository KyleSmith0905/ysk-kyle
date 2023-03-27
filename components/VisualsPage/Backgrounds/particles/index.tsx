import { FunctionComponent, useEffect, useRef } from 'react';
import { GraphicsParticlesColorModes } from '@lib/colorMode';
import { useGraphics } from '@lib/hooks';
import { Clock } from 'three';
import { particleGenerator } from './particle';
import { streamGenerator } from './stream';
import { pythagorean } from '@lib/utils';

const ParticlesBackground: FunctionComponent<{
	bubbleScene: string,
	bubbleSceneReset: string,
	colorTheme: GraphicsParticlesColorModes,
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
		let componentDetached = false;

		const context = backgroundRef.current?.getContext('2d') as CanvasRenderingContext2D;
		
		// Saves and updates screen size.
		let width = 0;
		let height = 0;
		const screenResizeTracker = () => {
			width = Math.max(document.documentElement.offsetWidth, document.documentElement.offsetHeight);
			height = width;
			if (backgroundRef.current) {
				backgroundRef.current.width = width;
				backgroundRef.current.height = height;
			}
		};
		screenResizeTracker();
		window.addEventListener('resize', screenResizeTracker);
		window.addEventListener('gesturechange', screenResizeTracker);
		window.addEventListener('gestureend', screenResizeTracker);

		// Tracks the mouse position for later.
		const mouseMovementTracker = (event: MouseEvent) => {
			const newMousePosition: [number, number] = [
				(event.pageX / (document.documentElement.offsetWidth * 0.5)) - 1,
				(event.pageY / (document.documentElement.offsetHeight	* 0.5)) - 1,
			];
			stream.startAngle = Math.atan2(stream.mousePosition[1], stream.mousePosition[0]);

			if (stream.mousePosition) {
				const mouseMoveDifference = pythagorean(newMousePosition[0] - stream.mousePosition[0], newMousePosition[1] - stream.mousePosition[1]);
				stream.angleSqueeze = Math.min(Math.PI * 2, stream.angleSqueeze + mouseMoveDifference * 2);
			}

			stream.mousePosition = newMousePosition;
		};
		document.addEventListener('mousemove', mouseMovementTracker);

		const clock = new Clock();
		const lastAnimationTimes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

		let frameNumber = 0;

		const image = new Image();
		image.src = '/artifacts/dot-glow.png';

		// Stream data
		const stream = streamGenerator();

		// Initialize the particles
		const particles: ReturnType<typeof particleGenerator>[] = [];
		for (let i = 0; i < 1000; i++) {
			particles.push(particleGenerator([width, height], stream));
		}

		// Render animation loop
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
			// startingSpeedRef.current = startingSpeedRef.current / (1 + (averageSpeed / 1000));
			// const speed = (1 + startingSpeedRef.current) * (averageSpeed / 10);
			
			// Animate the scenes.
			context.clearRect(0, 0, width, height);
      context.fillStyle = 'cyan';
			stream.animate();
			for (let i = 0; i < particles.length; i ++) {
				const particle = particles[i];
				particle.animate(stream);
				particle.render(context, image);
			}

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
		<div style={{position: 'absolute', display: 'flex'}}>
			<canvas ref={backgroundRef} style={{filter: 'drop-shadow(0px 0px 1px cyan)'}}/>
		</div>
	);
};

export default ParticlesBackground;