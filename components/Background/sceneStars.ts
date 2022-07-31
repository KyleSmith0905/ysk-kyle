import { Color, MathUtils, Mesh, ShaderMaterial, SphereBufferGeometry, SphereGeometry } from 'three';
import { randomPointInTorus, SceneGenerator, sineSmooth } from './utility';

const starGenerator: SceneGenerator = ({scene}) => {
	const starsMesh: Mesh<SphereGeometry, ShaderMaterial>[] = [];
	
	return {
		initial: ({colorMode}) => {
			for (let i = 0; i < 300; i++) {
				const geometry = new SphereBufferGeometry(MathUtils.randFloat(0.15, 0.3), 6, 4);
				geometry.computeBoundingBox();
				const material = new ShaderMaterial({
					uniforms: {
						color: {value: new Color(colorMode.text)},
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
				const position = randomPointInTorus(40, 200);
				sphere.position.set(position.x, position.y, MathUtils.randFloat(-100, -550));
				scene.add(sphere);
				starsMesh.push(sphere);
			}
		},
		loop: ({speed}) => {
			starsMesh.forEach((star) => {
				star.translateZ(0.1 * speed);
				star.scale.setZ(speed * 4);

				let opacity = 0;
				if (star.position.z > -50) opacity = sineSmooth(star.position.z, 0, -100, 1, 0);
				else if (star.position.z < -300) opacity = sineSmooth(star.position.z, -250, -350, 1, 0);
				else opacity = 1;
				star.material.uniforms.opacity.value = opacity;
				
				if (star.position.z > 0) {
					const position = randomPointInTorus(40, 250);
					star.position.set(position.x, position.y,  MathUtils.randFloat(-350, -500));
				}
			});
		},
		recolor: ({colorMode}) => {
			starsMesh.forEach((star) => {
				star.material.uniforms.color.value = new Color(colorMode.text);
			});
		}
	};
};

export {starGenerator};