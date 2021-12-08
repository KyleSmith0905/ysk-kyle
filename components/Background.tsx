import { FunctionComponent, useEffect, useState } from 'react';
import { IBubble } from '../lib/bubbleData/_shared';
import { IsArrayNaN } from '../lib/utils';

const Circle: FunctionComponent<{bubbles: IBubble[]}> = ({bubbles}) => {

	const [path, setPath] = useState('');

	useEffect(() => {
		let requestId = 0;

		const positionToString = (position: number[]): string => {
			return (position[0] * 20).toFixed(2) + ',' + (position[1] * 20).toFixed(2);
		}

		const renderBackground = () => {

			let localPath = '';

			for (let i = 0; i < bubbles.length; i++) {
				const bubble = bubbles[i];
				const connection = bubbles.find(e => e.id === bubble.connection);
				if (connection === undefined || IsArrayNaN(connection.position) || IsArrayNaN(bubble.position)) continue;

				localPath += 'M' + positionToString(connection.position) + 'L' + positionToString(bubble.position);
			}
			
			setPath(localPath);
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
				d={path}
				stroke='black'
				strokeWidth={2}
			/>
		</svg>
	)
}

export default Circle;