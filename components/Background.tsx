import { FunctionComponent, useEffect } from 'react';
import { IBubble } from '../lib/bubbleData/_shared';
import { IsArrayNaN } from '../lib/utils';

const Circle: FunctionComponent<{bubbles: IBubble[]}> = ({bubbles}) => {

	useEffect(() => {
		let requestId = 0;

		const positionToString = (position: number[]): string => {
			return (position[0] * 20).toFixed(2) + ',' + (position[1] * 20).toFixed(2);
		}

		const renderBackground = () => {

			const backgroundPath = document.getElementById('BackgroundPath');
			if (backgroundPath === null) return;

			let localPath = '';

			for (let i = 0; i < bubbles.length; i++) {
				const bubble = bubbles[i];
				const connection = bubbles.find(e => e.id === bubble.connection);
				if (connection === undefined || IsArrayNaN(connection.position) || IsArrayNaN(bubble.position)) continue;

				localPath += 'M' + positionToString(connection.position) + 'L' + positionToString(bubble.position);
			}
			
			backgroundPath.setAttribute('d', localPath);
			requestId = requestAnimationFrame(renderBackground);
		};

		requestId = requestAnimationFrame(renderBackground);
		return () => cancelAnimationFrame(requestId);
	});

	return (
		<svg
			id='Background'
			height={2000}
			width={2000}
		>
			<path
				id='BackgroundPath'
				d=''
				stroke='black'
				strokeWidth={2}
				fill='none'
			/>
		</svg>
	)
}

export default Circle;