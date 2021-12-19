import { IBubble } from './bubbleData/_shared';
import { Noise2D } from './noiseGenerators';
import { IsArrayNaN, Pythagorean, IsCollideWithBubbles, IsNumberBetween } from './utils';

/**
 * Slightly moves position around a bubble's pivot position to simulate slight fluid motion.
 * @param bubble - The bubble's information.
 * @param bubbles - All bubbles' information.
 * @return The new bubble's position.
*/
const driftAround = (bubble: IBubble, bubbles: IBubble[]): [number, number] => {
	if (IsArrayNaN(bubble.position)) {
		return bubble.position;
	}
	
	const index = bubbles.findIndex(e => e.id === bubble.id);
	
	const position: [number, number] = [...bubble.position];
	
	const currentAngle = Math.atan2(
		bubble.position[1] - bubble.pivotPosition[1],
		bubble.position[0] - bubble.pivotPosition[0],
	);
		
	const offset = index * 60000;
	
	const angle = currentAngle + ((Noise2D(Date.now() * 1e-4 - offset) - 0.5) * 0.025);
	const distance = Noise2D(Date.now() * 2e-6 - offset + 30000) * bubble.radius * 0.005;
	

	position[0] = bubble.pivotPosition[0] + Math.cos(angle) * distance;
	position[1] = bubble.pivotPosition[1] + Math.sin(angle) * distance;

	bubble.position = position;
	
	return position;
};

/**
 * Spawns a bubble around it's connection and assigns a position.
 * @param bubble - The bubble's information.
 * @param bubbles - All bubbles' information.
 */
const spawnBubble = (bubble: IBubble, bubbles: IBubble[], elapsedTime: number): void => {
	const connection = bubbles.find(e => e.id === bubble.connection);
	if (connection === undefined) return;
	
	if (IsArrayNaN(connection.position)) return;

	const pivotAngle = Math.random() * Math.PI * 2;
	const deployAngle = pivotAngle + (Math.random() - 0.5) * Math.PI * 0.25;

	const distance = ((bubble.radius + connection.radius) / 20 + 0.5 + Math.random() * 4) + (elapsedTime / 2500);

	const pivotPosition: [number, number] = [connection.pivotPosition[0], connection.pivotPosition[1]];

	const deployPosition: [number, number] = [
		connection.deployPosition[0] + Math.cos(deployAngle) * distance,
		connection.deployPosition[1] + Math.sin(deployAngle) * distance,
	];

	if (IsCollideWithBubbles([...deployPosition, bubble.radius], bubbles.map(e => [...e.deployPosition, e.radius]))) {
		return;
	}

	bubble.pivotPosition = pivotPosition;
	bubble.deployPosition = deployPosition;
	bubble.position = pivotPosition;
};

/**
 * Slides a bubble from pivot position to deploy position.
 * @param bubble - The bubble's information.
 * @param bubbles - All bubbles' information.
 */
const moveToPosition = (bubble: IBubble, bubbles: IBubble[]): [number, number] => {
	const orbitBubble = bubbles.find(e => e.id === bubble.connection);
	
	if (orbitBubble === undefined) return bubble.position;

	const relativeDeployPosition = [
		bubble.deployPosition[0] - orbitBubble.pivotPosition[0],
		bubble.deployPosition[1] - orbitBubble.pivotPosition[1],
	];
	const relativePivotPosition = [
		bubble.pivotPosition[0] - orbitBubble.pivotPosition[0],
		bubble.pivotPosition[1] - orbitBubble.pivotPosition[1],
	];

	let deployAngle = Math.atan2(relativeDeployPosition[1], relativeDeployPosition[0]);
	let pivotAngle = Math.atan2(relativePivotPosition[1], relativePivotPosition[0]);

	if (pivotAngle > Math.PI / 2 && deployAngle < -Math.PI / 2) {
		deployAngle += Math.PI * 2;
	}
	if (deployAngle > Math.PI / 2 && pivotAngle < -Math.PI / 2) {
		pivotAngle += Math.PI * 2;
	}

	const deployDistance = Pythagorean(relativeDeployPosition[0], relativeDeployPosition[1]);
	const pivotDistance = Pythagorean(relativePivotPosition[0], relativePivotPosition[1]);

	const differenceAngle = deployAngle - pivotAngle;
	const differenceDistance = deployDistance - pivotDistance;

	bubble.pivotPosition[0] = (
		orbitBubble.pivotPosition[0]
		+ Math.cos(pivotAngle + (differenceAngle * 0.013))
		* (pivotDistance + (differenceDistance * 0.013))
	);
	bubble.pivotPosition[1] = (
		orbitBubble.pivotPosition[1]
		+ Math.sin(pivotAngle + (differenceAngle * 0.013))
		* (pivotDistance + (differenceDistance * 0.013))
	);

	bubble.position = bubble.pivotPosition;

	if (
		IsNumberBetween(differenceAngle, -0.0005, 0.0005)
		&& IsNumberBetween(differenceDistance, -0.001, 0.001)
	) {
		bubble.deployPosition = bubble.pivotPosition;
	}

	return bubble.position;
};


export {driftAround, spawnBubble, moveToPosition};