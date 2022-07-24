import { FunctionComponent, useEffect, useRef } from 'react';
import { WebGLRenderer, PerspectiveCamera } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ambianceGenerator } from './sceneAmbience';
import { starGenerator } from './sceneStars';
import { SceneGenerator } from './utility';

const Background: FunctionComponent = () => {
	const backgroundRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!backgroundRef.current) return;
		const width = document.documentElement.offsetWidth;
		const height = document.documentElement.offsetHeight;

		const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 5, 5000 );
		const renderer = new WebGLRenderer({canvas: backgroundRef.current});
		renderer.setSize(width, height);

		const sceneGenerators: {[key: string]: SceneGenerator} = {
			star: starGenerator,
			ambiance: ambianceGenerator,
		};

		// Hydrates the scenes and prepares everything for animation.
		const layerResult = Object.values(sceneGenerators).map(layer => layer({camera, renderer, width, height}));
		layerResult.forEach((e) => e.initial());
		
		camera.position.z = 5;
		camera.rotateX(1);
		camera.rotateY(0);
		let startingSpeed = 20;
		
		// TEMP
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.update();
		
		renderer.autoClear = false;
		
		const render = () => {
			startingSpeed = startingSpeed / 1.01;
			const speed = 1 + startingSpeed;
			
			renderer.clear();

			// Animate the scenes.
			layerResult.forEach((e) => e.loop({speed}));

			// TEMP
			controls.update();

			requestAnimationFrame(render);
		};
		render();
	}, []);

	return (
		<div style={{position: 'absolute'}}>
			<canvas ref={backgroundRef}/>
		</div>
	);
};

export default Background;