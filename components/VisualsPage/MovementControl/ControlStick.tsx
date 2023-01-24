import { FunctionComponent, useEffect, useState } from 'react';
import { controlStickPhysics } from '../../../lib/controlStick';

const ControlStickMovement: FunctionComponent = () => {

	const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
		const handle = document.getElementById('ControlStickHandle');
		const base = document.getElementById('ControlStickBase');
		if (handle === null || base === null) return;

		let relativeMousePosition = [0, 0];
		let localIsGrabbing = false;

		const interactStartEvent = (e: MouseEvent | TouchEvent) => {
			e.preventDefault();
			localIsGrabbing = true;
			setIsGrabbing(true);
		};
		const interactEndEvent = () => {
			handle.style.transform = '';
			localIsGrabbing = false;
			setIsGrabbing(false);
		};
		const interactMoveEvent = (e: MouseEvent | TouchEvent) => {
			const position = e instanceof TouchEvent ? e.touches[0] : e;
			relativeMousePosition = [
				position.clientX - (base.offsetLeft + base.offsetWidth / 2),
				position.clientY - (base.offsetTop + base.offsetHeight / 2),
			];
		};
		handle.addEventListener('mousedown', interactStartEvent);
		document.addEventListener('mouseup', interactEndEvent);
		document.addEventListener('mousemove', interactMoveEvent);
		handle.addEventListener('touchstart', interactStartEvent);
		document.addEventListener('touchend', interactEndEvent);
		document.addEventListener('touchmove', interactMoveEvent);

		const interval = setInterval(() => {
			if (localIsGrabbing === false) return;

			const movePosition = controlStickPhysics(relativeMousePosition);

			scrollBy(movePosition[0] * 0.25, movePosition[1] * 0.25);
			handle.style.transform = 'translate(' +
				Math.round(movePosition[0]) + 'px,' +
				Math.round(movePosition[1]) + 'px)';
		}, 30);

		return () => {
			clearInterval(interval);
			handle.removeEventListener('mousedown', interactStartEvent);
			document.removeEventListener('mouseup', interactEndEvent);
			document.removeEventListener('mousemove', interactMoveEvent);
			handle.removeEventListener('touchstart', interactStartEvent);
			document.removeEventListener('touchend', interactEndEvent);
			document.removeEventListener('touchmove', interactMoveEvent);
		};

	}, []);

	const CircleLayer: FunctionComponent<{radius: number}> = ({radius})  => {
		return (
			<circle
				cx={80} cy={80}
				r={radius}
				fill='none'
				strokeWidth={5}
				stroke='var(--color-text)'
				opacity={0.2}
			/>
		);
	};

	return (
		<div id='ControlStickContainer'>
			<div id='ControlStickBase'/>
			<svg id='ControlStickHandle'
				className={isGrabbing ? 'GrabbingHandle' : ''}
				height={160}
				width={160}
			>
				<CircleLayer radius={70}/>
				<CircleLayer radius={49}/>
				<CircleLayer radius={25}/>
			</svg>
		</div>
	);
};

export default ControlStickMovement;