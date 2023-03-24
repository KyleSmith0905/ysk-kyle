import { Color, MathUtils, Mesh, MeshBasicMaterial, PlaneBufferGeometry, Texture } from 'three';
import { SceneGenerator, sineSmooth } from './utility';

const getCloudColor = (primaryColor?: string) => {
	if (primaryColor === 'rainbow') {
		const cloudColor = new Color('#ffffff');
		cloudColor.setHSL(MathUtils.randFloat(0, 1), MathUtils.randFloat(0.9, 1), MathUtils.randFloat(0.495, 0.505));
		return cloudColor;
	}
	else {
		const cloudColor = new Color(primaryColor);
		cloudColor.offsetHSL(MathUtils.randFloat(-0.1, 0.1), MathUtils.randFloat(-0.2, 0.2), MathUtils.randFloat(-0.05, 0.05));
		return cloudColor;
	}
};

const ambianceGenerator: SceneGenerator = ({scene}) => {
	const cloudsMesh: Mesh<PlaneBufferGeometry, MeshBasicMaterial>[] = [];

	return {
		initial: async ({colorMode}) => {
			const planeGeometry = new PlaneBufferGeometry(200, 200, 1, 1);

			const image = new Image();
			image.src = 'noise-maps/noise-1.webp';
			await new Promise<void>((resolve) => (image.onload = () => resolve()));

			for (let i = 0; i < 10; i++) {
				const cloudColor = getCloudColor(colorMode.space?.ambience);

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
		loop: ({speed, colorMode}) => {
			cloudsMesh.forEach((cloud) => {
				cloud.translateZ(0.02 * speed);

				cloud.material.opacity = sineSmooth(cloud.position.z, -60, 0, 0.2, 0);

				// Loops clouds around to make it feel infinite.
				if (cloud.position.z > 10) {
					cloud.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(-70, -60));
					cloud.rotateZ(MathUtils.randFloat(0, 360));
					cloud.material.color = getCloudColor(colorMode.space?.ambience);
				}
				else if (cloud.position.z < -70) {
					cloud.position.set(MathUtils.randFloatSpread(50), MathUtils.randFloatSpread(50), MathUtils.randFloat(0, 10));
					cloud.rotateZ(MathUtils.randFloat(0, 360));
				cloud.material.color = getCloudColor(colorMode.space?.ambience);
				}
			});
		},
		recolor: ({colorMode}) => {
			cloudsMesh.forEach((cloud) => {
				cloud.material.color = getCloudColor(colorMode.space?.ambience);
			});
		}
	};
};

export {ambianceGenerator};