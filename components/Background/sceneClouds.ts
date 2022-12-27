import { Mesh, PlaneBufferGeometry, MathUtils, Color, Texture, MeshBasicMaterial } from 'three';
import { randomPointInTorus, SceneGenerator, sineSmooth } from './utility';

const getCloudColor = (primaryColor: Color) => {
	const cloudColor = new Color(0xffa500);
	cloudColor.setHSL(MathUtils.randFloat(0.04, 0.15), MathUtils.randFloat(0.8, 1), MathUtils.randFloat(0.45, 0.55));
	cloudColor.lerp(primaryColor, 0.4);
	return cloudColor;
};

const cloudGenerator: SceneGenerator = ({scene}) => {
	const meshes: Mesh<PlaneBufferGeometry, MeshBasicMaterial>[] = [];

	return {
		initial: async ({colorMode}) => {
			const planeGeometry = new PlaneBufferGeometry(11, 22, 1, 1);

			const image = new Image();
			image.src = 'noise-maps/noise-3.webp';
			await new Promise<void>((resolve) => (image.onload = () => resolve()));
			
			const colorModeBlend = new Color(colorMode.primary);

			for (let i = 0; i < 40; i++) {
				const cloudColor = getCloudColor(colorModeBlend);

				// Generates an orange cloud texture by cropping part a noise map.
				const canvas = document.createElement('canvas');
				canvas.width = 256;
				canvas.height = 512;
				const context = canvas.getContext('2d');
				if (!context) return;

				const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);
				gradient.addColorStop(0, '#fff');
				gradient.addColorStop(0.5, '#333');
				gradient.addColorStop(1, '#000');
				context.fillStyle = gradient;
				context.setTransform(0.5, 0, 0, 1, 0, 0);
				context.rect(0, 0, 512, 512);
				context.fill();
				context.globalCompositeOperation = 'darken';
				context.setTransform(1, 0, 0, 1, 0, 0);
				context.drawImage(image, MathUtils.randFloat(0, 384), MathUtils.randFloat(0, 384), 128, 128, 0, 0, 256, 512);

				const texture = new Texture(canvas);
				texture.needsUpdate = true;
				
				const cloudMaterial = new MeshBasicMaterial({
					color: cloudColor,
					opacity: 0.9,
					transparent: true,
					alphaMap: texture,
					depthTest: false,
					alphaTest: 0.02,
				});
				const planeMesh = new Mesh(planeGeometry, cloudMaterial);
				const position = randomPointInTorus(8, 14);
				planeMesh.position.set(position.x, position.y, MathUtils.randFloat(-15, -80));
				planeMesh.rotation.set(0, 0, position.angle);
				scene.add(planeMesh);
				meshes.push(planeMesh);
			}
		},
		loop: ({speed}) => {
			meshes.forEach((cloud) => {
				cloud.translateZ(0.02 * speed);
				cloud.material.opacity = sineSmooth(cloud.position.z, -75, -10, 0.9, 0);
				if (cloud.position.z > -10) {
					const position = randomPointInTorus(8, 14);
					cloud.position.set(position.x, position.y, MathUtils.randFloat(-75, -80));
					cloud.rotation.set(0, 0, position.angle);
				}
			});
		},
		recolor: ({colorMode}) => {
			const colorModeBlend = new Color(colorMode.primary);
			meshes.forEach((cloud) => {
				cloud.material.color = getCloudColor(colorModeBlend);
			});
		}
	};
};

export {cloudGenerator};