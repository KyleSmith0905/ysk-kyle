import { FunctionComponent } from 'react';

const PathCross = () => 'M1000,0V2000M0,1000H2000';

const PathCircle = (size: number) => {
	const twiceSize = size * 2;
	const radii = size + ',' + size;
	const startLocation = 'M1000,' + (1000 - size);
	const firstArc = 'a' + radii + ' 0 1,0 0,' + twiceSize;
	const secondArc = 'a' + radii + ' 0 1,0 0,' + (-twiceSize);
	return startLocation + firstArc + secondArc;
};

const Circle: FunctionComponent = () => {

	return (
		<svg
			id='Background'
			height={2000}
			width={2000}
		>
			<path
				id='BackgroundPath'
				d={PathCross() + PathCircle(333) + PathCircle(666) + PathCircle(999)}
				stroke='var(--color-text)'
				opacity={0.1}
				strokeWidth={0.5}
				fill='none'
			/>
		</svg>
	);
};

export default Circle;