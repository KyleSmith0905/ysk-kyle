import { Color, MathUtils, Mesh, ShaderMaterial, SphereBufferGeometry, SphereGeometry } from 'three';
import { randomPointInTorus, SceneGenerator, sineSmooth } from './utility';

const starGenerator: SceneGenerator = ({scene}) => {
	const starsMesh: Mesh<SphereGeometry, ShaderMaterial>[] = [];
	
	return {
		initial: ({colorMode}) => {
			for (let i = 0; i < 250; i++) {
				const geometry = new SphereBufferGeometry(MathUtils.randFloat(0.05, 0.08), 6, 4);
				geometry.computeBoundingBox();
				const material = new ShaderMaterial({
					uniforms: {
						color: {value: new Color(colorMode.highGraphics?.stars)},
						boundingBox: {value: [geometry.boundingBox?.min, geometry.boundingBox?.max]},
						opacity: {value: 1},
					},
					transparent: true,
					alphaTest: 0.1,
					vertexShader: `
						uniform vec3 boundingBox[2];
						varying vec2 vUv;
				
						void main() {
							vUv.y = (position.z - boundingBox[0].z) / (boundingBox[1].z - boundingBox[0].z);
							gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
						}
					`,
					fragmentShader: `
						uniform vec3 color; 
						uniform float opacity;
						varying vec2 vUv;
						
						void main() {
							float alpha = smoothstep(0.0, 1.0, vUv.y);

							gl_FragColor = vec4(color, min(alpha, opacity));
						}
					`
				});
				const sphere = new Mesh(geometry, material);
				const position = randomPointInTorus(17, 55);
				sphere.position.set(position.x, position.y, MathUtils.randFloat(0, -200));
				scene.add(sphere);
				starsMesh.push(sphere);
			}
		},
		loop: ({speed, colorMode}) => {
			starsMesh.forEach((star) => {
				star.translateZ(0.02 * speed);
				star.scale.setZ(speed * 2);

				let opacity = 0;
				if (star.position.z > -20) opacity = sineSmooth(star.position.z, -40, 0, 1, 0);
				else if (star.position.z < -180) opacity = sineSmooth(star.position.z, -160, -200, 1, 0);
				else opacity = 1;
				star.material.uniforms.opacity.value = opacity;
				
				// Loops stars around to make it feel infinite.
				if (star.position.z > -10) {
					const position = randomPointInTorus(17, 55);
					star.position.set(position.x, position.y,  MathUtils.randFloat(-210, -200));
					star.material.uniforms.color.value = new Color(colorMode.highGraphics?.stars);
				}
				else if (star.position.z < -210) {
					const position = randomPointInTorus(17, 55);
					star.position.set(position.x, position.y,  MathUtils.randFloat(0, -10));
					star.material.uniforms.color.value = new Color(colorMode.highGraphics?.stars);
				}
			});
		},
		recolor: ({colorMode}) => {
			starsMesh.forEach((star) => {
				star.material.uniforms.color.value = new Color(colorMode.highGraphics?.stars);
			});
		}
	};
};

export {starGenerator};