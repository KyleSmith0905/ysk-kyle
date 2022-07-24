import { FunctionComponent, useEffect, useRef } from 'react';
import { MeshBasicMaterial, Scene, WebGLRenderer, Mesh, PerspectiveCamera, SphereGeometry, TextureLoader, MeshLambertMaterial, DirectionalLight, MathUtils, Color, PlaneBufferGeometry, SphereBufferGeometry, ShaderMaterial, NormalBlending } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const smoothing = (x: number, left: number, right: number, top: number, bottom: number) => {
	const value = MathUtils.clamp(x, right, left);
	const verticalTransform = -(top + bottom);
	const horizontalTransform = Math.cos(((value + left) * Math.PI) / ((left - right) * -0.25));
	return horizontalTransform * verticalTransform + top;
};

const randomPointInTorus = (minorRadius: number, majorRadius: number) => {
	const angle = MathUtils.randFloat(0, Math.PI * 2);
	const distance = MathUtils.randFloat(minorRadius, majorRadius);
	return {
		x: Math.cos(angle) * distance,
		y: Math.sin(angle) * distance,
	};
};

const layerGenerator: {[key: string]: (
	{camera, renderer, width, height}: {camera: PerspectiveCamera, renderer: WebGLRenderer, width: number, height: number}
) => {initial: () => void, loop: ({speed}: {speed: number}) => void}} = {
	
	stars: ({renderer, camera}) => {
		const starsMesh: Mesh<SphereGeometry, ShaderMaterial>[] = [];
		const scene = new Scene();

		return {
			initial: () => {
				for (let i = 0; i < 500; i++) {
					const geometry = new SphereBufferGeometry(MathUtils.randFloat(0.05, 0.15), 8, 5);
					geometry.computeBoundingBox();
					const material = new ShaderMaterial({
						uniforms: {
							color: {value: new Color(0xffffff)},
							boundingBox: {value: [geometry.boundingBox?.min, geometry.boundingBox?.max]}
						},
						transparent: true,
						blending: NormalBlending,
						vertexShader: `
							uniform vec3 boundingBox[2];
							varying vec2 vUv;
					
							void main() {
								vUv.y = (position.z - boundingBox[0].z) / (boundingBox[1].z - boundingBox[0].z);
								gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
							}
						`,
						fragmentShader: `
							uniform vec3 color; 
							varying vec2 vUv;
							
							void main() {
								float alpha = smoothstep(0.0, 1.0, vUv.y);

								gl_FragColor = vec4(color, alpha);
							}
						`
					});
					const sphere = new Mesh(geometry, material);
					const position = randomPointInTorus(50, 250);
					sphere.position.set(position.x, position.y, MathUtils.randFloat(-100, -550));
					scene.add(sphere);
					starsMesh.push(sphere);
				}
			},
			loop: ({speed}) => {
				starsMesh.forEach((star) => {
					star.translateZ(0.1 * speed);
					star.scale.setZ(speed * 4);
					if (star.position.z > 0) {
						const position = randomPointInTorus(50, 250);
						star.position.set(position.x, position.y,  MathUtils.randFloat(-350, -500));
					}
				});
				renderer.render(scene, camera);
			}
		};
	},
	ambientClouds: ({camera, renderer}) => {
		const scene = new Scene();
		const cloudsMesh: Mesh<PlaneBufferGeometry, MeshLambertMaterial>[] = [];

		return {
			initial: () => {
				const light = new DirectionalLight(0xffffff,0.5);
				light.position.set(-1,0,1);
				scene.add(light);
				const planeGeometry = new PlaneBufferGeometry(2500, 2500, 1, 1);
				const cloudTexture = new TextureLoader().load('/noise-maps/noise-1.webp');
				for (let i = 0; i < 8; i++) {
					const cloudColor = new Color(0xff5a00);
					cloudColor.setHSL(MathUtils.randFloat(0.5, 0.7), MathUtils.randFloat(0.8, 1), MathUtils.randFloat(0.4, 0.5));
					const cloudMaterial = new MeshLambertMaterial({color: cloudColor, opacity: 0, transparent: true, map: cloudTexture});
					const planeMesh = new Mesh(planeGeometry, cloudMaterial);
					planeMesh.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(-100, -300));
					planeMesh.rotateZ(MathUtils.randFloat(0, 360));
					scene.add(planeMesh);
					cloudsMesh.push(planeMesh);
				}
			},
			loop: ({speed}) => {
				cloudsMesh.forEach((cloud) => {
					cloud.translateZ(0.1 * speed);
					cloud.material.opacity = smoothing(cloud.position.z, 0, -200, 0.05, 0);
					if (cloud.position.z > 0) {
						cloud.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(-200, -300));
						cloud.rotateZ(MathUtils.randFloat(0, 360));
					}
				});
				renderer.render(scene, camera);
			}
		};
	}
};

const Background: FunctionComponent = () => {
	const backgroundRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		if (!backgroundRef.current) return;
		const width = document.documentElement.offsetWidth;
		const height = document.documentElement.offsetHeight;

		const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 5, 5000 );
		const renderer = new WebGLRenderer({canvas: backgroundRef.current});
		renderer.setSize(width, height);

		// Hydrates the scenes and prepares everything for animation.
		const layerResult = Object.values(layerGenerator).map(layer => layer({camera, renderer, width, height}));
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