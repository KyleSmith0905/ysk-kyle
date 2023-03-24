import { FunctionComponent } from 'react';

const PathCross = () => 'M1000,0V2000M0,1000H2000';

const PathCircle = (size: number) => {
	const twiceSize = size * 2;
	const radii = `${size},${size}`;
	const startLocation = `M1000,${1000 - size}`;
	const firstArc = `a${radii} 0 1,0 0, ${twiceSize}`;
	const secondArc = `a${radii} 0 1,0 0, ${-twiceSize}`;
	return `${startLocation}${firstArc}${secondArc}`;
};

const BackgroundConnections: FunctionComponent = () => {

	return (
		<svg
			height='125rem'
			width='125rem'
			style={{width: '100%', position: 'absolute'}}
		>
			<path
				d={PathCross() + PathCircle(333) + PathCircle(666) + PathCircle(999) + PathCircle(1332)}
				stroke='var(--color-text)'
				opacity={0.15}
				strokeWidth={1}
				fill='none'
			/>
		</svg>
	);
};

export default BackgroundConnections;