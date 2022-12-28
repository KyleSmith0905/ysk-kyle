import { Color, MathUtils, Mesh, MeshBasicMaterial, PlaneBufferGeometry, Texture } from 'three';
import { SceneGenerator, sineSmooth } from './utility';

const getCloudColor = (primaryColor: Color) => {
	const cloudColor = new Color(0x005aff);
	cloudColor.setHSL(MathUtils.randFloat(0.5, 0.7), MathUtils.randFloat(0.8, 1), MathUtils.randFloat(0.45, 0.55));
	cloudColor.lerp(primaryColor, 0.7);
	return cloudColor;
};

const ambianceGenerator: SceneGenerator = ({scene}) => {
	const cloudsMesh: Mesh<PlaneBufferGeometry, MeshBasicMaterial>[] = [];

	return {
		initial: async ({colorMode}) => {
			const planeGeometry = new PlaneBufferGeometry(200, 200, 1, 1);
			const colorModeBlend = new Color(colorMode.primary);

			const image = new Image();
			image.src = 'noise-maps/noise-1.webp';
			await new Promise<void>((resolve) => (image.onload = () => resolve()));

			for (let i = 0; i < 10; i++) {
				const cloudColor = getCloudColor(colorModeBlend);

				// Generates an orange cloud texture by cropping part a noise map.
				const canvas = document.createElement('canvas');
				canvas.width = 512;
				canvas.height = 512;
				const context = canvas.getContext('2d');
				if (!context) return;

				const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
				gradient.addColorStop(0, '#fff');
				gradient.addColorStop(0.9, '#eee');
				gradient.addColorStop(1, '#000');
				context.fillStyle = gradient;
				context.rect(0, 0, 512, 512);
				context.fill();
				context.globalCompositeOperation = 'darken';
				context.filter = 'brightness(75%) contrast(300%)';
				context.drawImage(image, 0, 0, 512, 512, 0, 0, 512, 512);
				
				const texture = new Texture(canvas);
				texture.needsUpdate = true;
				
				const cloudMaterial = new MeshBasicMaterial({
					color: cloudColor,
					opacity: 0,
					transparent: true,
					alphaMap: texture,
					alphaTest: 0.01,
				});
				const planeMesh = new Mesh(planeGeometry, cloudMaterial);
				planeMesh.position.set(MathUtils.randFloatSpread(5), MathUtils.randFloatSpread(5), MathUtils.randFloat(-60, 0));
				planeMesh.rotateZ(MathUtils.randFloat(0, 360));
				scene.add(planeMesh);
				cloudsMesh.push(planeMesh);
			}
		},
		loop: ({speed}) => {
			cloudsMesh.forEach((cloud) => {
				cloud.translateZ(0.02 * speed);

				cloud.material.opacity = sineSmooth(cloud.position.z, -60, 0, 0.2, 0);

				// Loops clouds around to make it feel infinite.
				if (cloud.position.z > 10) {
					cloud.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(-70, -60));
					cloud.rotateZ(MathUtils.randFloat(0, 360));
				}
				else if (cloud.position.z < -70) {
					cloud.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(0, 10));
					cloud.rotateZ(MathUtils.randFloat(0, 360));
				}
			});
		},
		recolor: ({colorMode}) => {
			const colorModeBlend = new Color(colorMode.primary);
			cloudsMesh.forEach((cloud) => {
				cloud.material.color = getCloudColor(colorModeBlend);
			});
		}
	};
};

export {ambianceGenerator};