import { pythagorean } from './utils';

/**
 * Calculates where to scroll to based on the current scroll position and scrolls automatically.
 * @param mousePosition - The current mouse position.
 */
export const EdgeScrolling = (mousePosition: {x: number, y: number}) => {
	
	const percentagePosition = {
		x: mousePosition.x/window.innerWidth,
		y: mousePosition.y/window.innerHeight
	};

	const distance = pythagorean(
		percentagePosition.x - 0.5, percentagePosition.y - 0.5
	);

	if (distance > 0.35) {
		const angle = Math.atan2(percentagePosition.y - 0.5, percentagePosition.x - 0.5);
		const scalar = (Math.min(distance, 0.47) - 0.35) * 50;

		window.scrollBy(Math.cos(angle) * scalar, Math.sin(angle) * scalar);
	}
};

/**
 * Draws the edge scroller vignette.
 */
export const DrawEdgeScroller = () => {
	const background = document.getElementById('EdgeScroller') as HTMLCanvasElement;
	if (background === undefined) return;

	background.width = window.innerWidth;
	background.height = window.innerHeight;
	const aspectRatio = background.width / background.height;

	const context = background.getContext('2d');
	if (context === null) return;
	context.clearRect(0, 0, background.width, background.height);
	
	context.rect(0, 0, background.width, background.height);

	const grd = context.createRadialGradient(
		background.width / 2, background.height / 2, background.width * 0.35,
		background.width / 2, background.height / 2, background.width * 0.47
	);

	grd.addColorStop(0, 'rgba(47, 47, 47, 0)');
	grd.addColorStop(1, 'rgba(47, 47, 47, 0.13)');
	context.fillStyle = grd;

	context.scale(1, 1 / aspectRatio);
	context.translate(0, background.height * (aspectRatio - 1) * 0.5);

	context.fill();
};