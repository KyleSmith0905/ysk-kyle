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
		const mouseMoveEvent = (e: MouseEvent) => mousePosition = {x: e.clientX, y: e.clientY};
		const mouseEnterEvent = () => {
			activeMoving = true;
			setDisplayVignette(true);
		};
		const mouseLeaveEvent = () => {
			activeMoving = false;
			setDisplayVignette(false);
		};

		window.addEventListener('resize', resizeEvent);
		document.addEventListener('mousemove', mouseMoveEvent);
		document.addEventListener('mouseenter', mouseEnterEvent);
		document.addEventListener('mouseleave', mouseLeaveEvent);
		settingsList.addEventListener('mousemove', mouseLeaveEvent);
		settingsList.addEventListener('mouseleave', mouseEnterEvent);
		displaySettings.addEventListener('mousemove', mouseLeaveEvent);
		displaySettings.addEventListener('mouseleave', mouseEnterEvent);
		
    const interval = setInterval(() => {
			if (activeMoving === false) return;
      EdgeScrolling(mousePosition);
    }, 30);
		
    return () => {
			window.removeEventListener('resize', resizeEvent);
			document.removeEventListener('mousemove', mouseMoveEvent);
			document.removeEventListener('mouseenter', mouseEnterEvent);
			document.removeEventListener('mouseleave', mouseLeaveEvent);
			settingsList.removeEventListener('mousemove', mouseLeaveEvent);
			settingsList.removeEventListener('mouseleave', mouseEnterEvent);
			displaySettings.removeEventListener('mousemove', mouseLeaveEvent);
			displaySettings.removeEventListener('mouseleave', mouseEnterEvent);
			clearInterval(interval);
		};
  }, []);

	return (
		<canvas id='EdgeScroller' className={displayVignette ? 'DisplayVignette' : ''}/>
	);
};

export default EdgeScrollMovement;