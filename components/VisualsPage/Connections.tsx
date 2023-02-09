import { FunctionComponent, useEffect } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { IsArrayNaN } from '../../lib/utils';

const Connections: FunctionComponent<{
	bubbles: IBubble[]
}> = ({bubbles}) => {

	useEffect(() => {
		let requestId = 0;

		const positionToString = (position: number[]): string => {
			return (position[0] * 20).toFixed(2) + ',' + (position[1] * 20).toFixed(2);
		};

		const renderBackground = () => {

			const backgroundPath = document.getElementById('ConnectionsPath');
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
			id='Connections'
			height={2000}
			width={2000}
			style={{width: '100%', position: 'absolute'}}
		>
			<path
				id='ConnectionsPath'
				d=''
				stroke='var(--color-text)'
				strokeWidth={2}
				fill='none'
			/>
		</svg>
	);
};

export default Connections;