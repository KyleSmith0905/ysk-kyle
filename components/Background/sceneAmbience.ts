import { Color, DirectionalLight, MathUtils, Mesh, MeshLambertMaterial, PlaneBufferGeometry, Scene, TextureLoader } from 'three';
import { SceneGenerator, sineSmooth } from './utility';

const ambianceGenerator: SceneGenerator = ({camera, renderer}) => {
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
				cloud.material.opacity = sineSmooth(cloud.position.z, 0, -200, 0.05, 0);
				if (cloud.position.z > 0) {
					cloud.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(-200, -300));
					cloud.rotateZ(MathUtils.randFloat(0, 360));
				}
			});
			renderer.render(scene, camera);
		}
	};
};

export {ambianceGenerator};