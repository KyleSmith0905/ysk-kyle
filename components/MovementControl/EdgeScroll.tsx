import { FunctionComponent, useEffect, useState } from 'react';
import { DrawEdgeScroller, EdgeScrolling } from '../../lib/edgeScrolling';

const EdgeScrollMovement: FunctionComponent = () => {

	const [displayVignette, setDisplayVignette] = useState(false);

  useEffect(() => {
		const settingsList = document.getElementById('SettingsList');
		const displaySettings = document.getElementById('DisplaySettings');
		if (settingsList === null || displaySettings === null) return;
		let activeMoving = false;
		let mousePosition = {x: 0, y: 0};

		DrawEdgeScroller();
		
		const resizeEvent = () => DrawEdgeScroller();
		const interactMoveEvent = (e: MouseEvent | TouchEvent) => {
			const position = e instanceof TouchEvent ? e.touches[0] : e;
			mousePosition = {x: position.clientX, y: position.clientY};
		};
		const interactStartEvent = () => {
			activeMoving = true;
			setDisplayVignette(true);
		};
		const interactEndEvent = () => {
			activeMoving = false;
			setDisplayVignette(false);
		};

		window.addEventListener('resize', resizeEvent);
		document.addEventListener('mousemove', interactMoveEvent);
		document.addEventListener('touchmove', interactMoveEvent);
		document.addEventListener('mouseenter', interactStartEvent);
		document.addEventListener('touchstart', interactStartEvent);
		document.addEventListener('mouseleave', interactEndEvent);
		document.addEventListener('touchend', interactEndEvent);
		settingsList.addEventListener('mouseleave', interactStartEvent);
		settingsList.addEventListener('touchstart', interactStartEvent);
		settingsList.addEventListener('mousemove', interactEndEvent);
		settingsList.addEventListener('touchend', interactEndEvent);
		displaySettings.addEventListener('mouseleave', interactStartEvent);
		displaySettings.addEventListener('touchstart', interactStartEvent);
		displaySettings.addEventListener('mousemove', interactEndEvent);
		displaySettings.addEventListener('touchend', interactEndEvent);
		
    const interval = setInterval(() => {
			if (activeMoving === false) return;
      EdgeScrolling(mousePosition);
    }, 30);
		
    return () => {
			window.removeEventListener('resize', resizeEvent);
			document.removeEventListener('mousemove', interactMoveEvent);
			document.removeEventListener('touchmove', interactMoveEvent);
			document.removeEventListener('mouseenter', interactStartEvent);
			document.removeEventListener('touchstart', interactStartEvent);
			document.removeEventListener('mouseleave', interactEndEvent);
			document.removeEventListener('touchend', interactEndEvent);
			settingsList.removeEventListener('mouseleave', interactStartEvent);
			settingsList.removeEventListener('touchstart', interactStartEvent);
			settingsList.removeEventListener('mousemove', interactEndEvent);
			settingsList.removeEventListener('touchend', interactEndEvent);
			displaySettings.removeEventListener('mouseleave', interactStartEvent);
			displaySettings.removeEventListener('touchstart', interactStartEvent);
			displaySettings.removeEventListener('mousemove', interactEndEvent);
			displaySettings.removeEventListener('touchend', interactEndEvent);
			clearInterval(interval);
		};
  }, []);

	return (
		<canvas id='EdgeScroller' className={displayVignette ? 'DisplayVignette' : ''}/>
	);
};

export default EdgeScrollMovement;