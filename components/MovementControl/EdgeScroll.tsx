import { FunctionComponent, useEffect, useState } from 'react';
import { drawEdgeScroller, edgeScrolling } from '../../lib/edgeScrolling';

const EdgeScrollMovement: FunctionComponent = () => {

	const [displayVignette, setDisplayVignette] = useState(false);

  useEffect(() => {
		let mousePosition = {x: 0, y: 0};

		drawEdgeScroller();
		
		const resizeEvent = () => drawEdgeScroller();
		const mouseMoveEvent = (e: MouseEvent) => mousePosition = {x: e.clientX, y: e.clientY};
		const mouseEnterEvent = () => setDisplayVignette(false);
		const mouseLeaveEvent = () => {
			mousePosition = {x: window.innerWidth * 0.5, y: window.innerHeight * 0.5};
			setDisplayVignette(true);
		};

		window.addEventListener('resize', resizeEvent);
		document.addEventListener('mousemove', mouseMoveEvent);
		document.addEventListener('mouseenter', mouseEnterEvent);
		document.addEventListener('mouseleave', mouseLeaveEvent);
		
    const interval = setInterval(() => {
      edgeScrolling(mousePosition);
    }, 30)

    return () => {
			window.removeEventListener('resize', resizeEvent);
			document.removeEventListener('mousemove', mouseMoveEvent);
			document.removeEventListener('mouseenter', mouseEnterEvent);
			document.removeEventListener('mouseleave', mouseLeaveEvent);
			clearInterval(interval);
		};
  }, []);

	return (
		<canvas id='EdgeScroller' className={displayVignette ? '' : 'DisplayVignette'}/>
	)
}

export default EdgeScrollMovement;