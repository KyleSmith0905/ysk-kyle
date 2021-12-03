import { FunctionComponent, useEffect, useState } from 'react';
import { drawEdgeScroller, edgeScrolling } from '../../lib/edgeScrolling';

const EdgeScrollMovement: FunctionComponent = () => {

	const [displayVignette, setDisplayVignette] = useState(false);

  useEffect(() => {
		document.documentElement.style.overflow = 'hidden';
		let mousePosition = {x: 0, y: 0};

		drawEdgeScroller();
		
		window.addEventListener('resize', () => {
			drawEdgeScroller();
		})
		document.addEventListener('mousemove', (e) => {
			mousePosition = {x: e.clientX, y: e.clientY};
		});
		document.addEventListener('mouseleave', () => {
			mousePosition = {x: window.innerWidth * 0.5, y: window.innerHeight * 0.5};
			setDisplayVignette(true);
		});
		document.addEventListener('mouseenter', () => {
			setDisplayVignette(false);
		});

    const interval = setInterval(() => {
      edgeScrolling(mousePosition);
    }, 30)

    return () => clearInterval(interval);
  }, []);

	return (
		<canvas id='EdgeScroller' className={displayVignette ? '' : 'DisplayVignette'}/>
	)
}

export default EdgeScrollMovement;