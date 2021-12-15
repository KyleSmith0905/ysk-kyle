import { FunctionComponent, useEffect, useState } from 'react';
import { controlStickPhysics } from '../../lib/controlStick';

const ControlStickMovement: FunctionComponent = () => {

	const [isGrabbing, setIsGrabbing] = useState(false);

  useEffect(() => {
		const handle = document.getElementById('ControlStickHandle');
		const base = document.getElementById('ControlStickBase');
		if (handle === null || base === null) return;

		let relativeMousePosition = [0, 0];
		let localIsGrabbing = false;

		const mouseDownEvent = (e: MouseEvent) => {
			e.preventDefault();
			localIsGrabbing = true;
			setIsGrabbing(true);
		};
		const mouseUpEvent = () => {
			handle.style.transform = '';
			localIsGrabbing = false;
			setIsGrabbing(false);
		};
		const mouseMoveEvent = (e: MouseEvent) => {
			const baseBounding = base.getBoundingClientRect();
			relativeMousePosition = [
				e.clientX - (baseBounding.left + baseBounding.width / 2),
				e.clientY - (baseBounding.top + baseBounding.height / 2),
			];
		};			
		handle.addEventListener('mousedown', mouseDownEvent);
		document.addEventListener('mouseup', mouseUpEvent);
		document.addEventListener('mousemove', mouseMoveEvent);

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
			handle.removeEventListener('mousedown', mouseDownEvent);
			document.removeEventListener('mouseup', mouseUpEvent);
			document.removeEventListener('mousemove', mouseMoveEvent);
		};

	}, []);

	const CircleLayer: FunctionComponent<{radius: number}> = ({radius})  => {
		return (
			<circle
				cx={80} cy={80}
				r={radius}
				fill='none'
				strokeWidth={5}
				stroke='#ccc'
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