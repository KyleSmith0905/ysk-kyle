import { FunctionComponent, useEffect } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { IsArrayNaN } from '../../lib/utils';

const Connections: FunctionComponent<{
	bubbles: IBubble[]
}> = ({bubbles}) => {

	useEffect(() => {
		let requestId = 0;

		const positionToString = (position: number[]): string => {
			return `${(position[0]).toFixed(2)},${(position[1]).toFixed(2)} `;
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
			height='125rem'
			width='125rem'
			viewBox='0 0 100 100'
			style={{position: 'absolute'}}
		>
			<defs>
				<radialGradient id="ConnectionsGradient" gradientUnits="userSpaceOnUse">
					<stop offset="0%" stopColor="var(--color-text)" stopOpacity={0}/>
					<stop offset="100%" stopColor="var(--color-text)" stopOpacity={1}/>
				</radialGradient>
			</defs>
			<path
				id='ConnectionsPath'
				stroke="url(#ConnectionsGradient)"
				d=''
				strokeWidth={0.2}
				// stroke='var(--color-text)'
				// fill="none"
			/>
		</svg>
	);
};

export default Connections;