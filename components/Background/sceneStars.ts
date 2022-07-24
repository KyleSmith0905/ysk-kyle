import { Color, MathUtils, Mesh, NormalBlending, Scene, ShaderMaterial, SphereBufferGeometry, SphereGeometry } from 'three';
import { randomPointInTorus, SceneGenerator } from './utility';

const starGenerator: SceneGenerator = ({renderer, camera}) => {
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
};

export {starGenerator};