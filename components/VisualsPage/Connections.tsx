import { FunctionComponent, useEffect, useRef } from 'react';
import { IBubble } from '../../lib/bubbleData/_shared';
import { IsArrayNaN } from '../../lib/utils';

const Connections: FunctionComponent<{
	bubbles: IBubble[]
}> = ({bubbles}) => {
	const connectionsContainerRef = useRef<SVGSVGElement>(null);
	const SvgDefinitionsRef = useRef<SVGDefsElement>(null);
	const GradientDefaultRef = useRef<SVGLinearGradientElement>(null);

	useEffect(() => {
		let requestId = 0;
		
		// Removes the element to prevent it from rendering twice
		connectionsContainerRef.current?.querySelectorAll('path').forEach(e => e.remove());
		SvgDefinitionsRef.current?.querySelectorAll('linearGradient:not(#Default_ConnectionsGradient)').forEach(e => e.remove());

		const bubblesPathMap: Record<string, {element: SVGPathElement, gradient: SVGLinearGradientElement}> = {};
		for (const bubble of bubbles) {
			if (!bubble.connection) return;
			// Find the amount of parents in this linked list.
			let numberOfParents = 0;
			let parentBubble: IBubble | undefined = bubble;
			while (parentBubble.connection !== '.') {
				parentBubble = bubbles.find(e => e.id === parentBubble?.connection);
				if (!parentBubble) {
					break;
				}
				numberOfParents++;
			}

			// Create a path element to later manipulate
			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', '');
			path.setAttribute('stroke', `url(#${bubble.id}_ConnectionsGradient)`);
			path.setAttribute('stroke-width', '0.1');
			path.setAttribute('class', 'bubbleConnectionsPaths');
			connectionsContainerRef.current?.appendChild(path);

			// Create a path element to later manipulate
			const gradient = GradientDefaultRef.current?.cloneNode(true) as SVGLinearGradientElement;
			gradient.setAttribute('id', `${bubble.id}_ConnectionsGradient`);
			gradient.querySelectorAll('animate').forEach(e => e.setAttribute('begin', `${numberOfParents * 3.33}s`));
			SvgDefinitionsRef.current?.appendChild(gradient);

			bubblesPathMap[bubble.id] = {element: path, gradient: gradient};
		}
		
		const positionToString = (position: number[]): string => {
			return `${(position[0]).toFixed(2)},${(position[1]).toFixed(2)} `;
		};

		// A renderer that runs every frame to update the lines to connect the bubbles
		const renderBackground = () => {
			for (let i = 0; i < bubbles.length; i++) {
				const bubble = bubbles[i];
				const connection = bubbles.find(e => e.id === bubble.connection);
				if (
					connection === undefined ||
					IsArrayNaN(connection.position) ||
					IsArrayNaN(bubble.position) ||
					!bubblesPathMap[bubble.id].element
				) continue;

				// Updates the connection line to connect the two elements
				const path = 'M' + positionToString(connection.position) + 'L' + positionToString(bubble.position);
				bubblesPathMap[bubble.id].gradient.setAttribute('x1', `${connection.position[0]}`);
				bubblesPathMap[bubble.id].gradient.setAttribute('y1', `${connection.position[1]}`);
				bubblesPathMap[bubble.id].gradient.setAttribute('x2', `${bubble.position[0]}`);
				bubblesPathMap[bubble.id].gradient.setAttribute('y2', `${bubble.position[1]}`);
				bubblesPathMap[bubble.id].element.setAttribute('d', path);
			}
			
			requestId = requestAnimationFrame(renderBackground);
		};

		requestId = requestAnimationFrame(renderBackground);
		return () => cancelAnimationFrame(requestId);
	}, [bubbles]);

	return (
		<svg
			ref={connectionsContainerRef}
			height='125rem'
			width='125rem'
			viewBox='0 0 100 100'
			style={{position: 'absolute'}}
		>
			<defs ref={SvgDefinitionsRef}>
				<linearGradient id="Default_ConnectionsGradient" ref={GradientDefaultRef} gradientUnits="userSpaceOnUse">
					<stop stopColor="var(--color-text)" offset={0}>
						<animate
							attributeName="stop-opacity"
							values="0.5;0.2"
							dur="10s"
							calcMode="spline"
							keySplines='0.5 0 0.8 1'
							repeatCount="indefinite"
						/>
					</stop>
					<stop stopColor="var(--color-text)">
						<animate
							attributeName="stop-opacity"
							values="1;0.1"
							dur="10s"
							calcMode="spline"
							keySplines='0.5 0 0.8 1'
							repeatCount="indefinite"
						/>
						<animate
							attributeName="offset"
							values="0;1"
							dur="10s"
							calcMode="spline"
							keySplines='0 0.3 0.7 1'
							repeatCount="indefinite"
						/>
					</stop>
					<stop stopColor="var(--color-text)" stopOpacity={0.2}>
						<animate
							attributeName="offset"
							values="0;1"
							dur="10s"
							calcMode="spline"
							keySplines='0 0.3 0.7 1'
							repeatCount="indefinite"
						/>
					</stop>
					<stop stopColor="var(--color-text)" offset={1} stopOpacity={0.1}/>
				</linearGradient>
			</defs>
		</svg>
	);
};

export default Connections;