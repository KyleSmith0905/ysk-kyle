import { pythagorean } from '@lib/utils';
import { FunctionComponent, useEffect } from 'react';

const BrowserMovement: FunctionComponent = () => {
  useEffect(() => {
		document.documentElement.style.setProperty('cursor', 'grab');
		document.documentElement.style.setProperty('user-select', 'none');
		document.documentElement.classList.add('prevent-drag');

    const getMousePosition = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        return { x: e.clientX, y: e.clientY };
      }
      else {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const interactStartEvent = (e: MouseEvent | TouchEvent) => {
      const startPosition = getMousePosition(e);
      const startScrollX = scrollX;
      const startScrollY = scrollY;
      let maxChange = 0;

      // User is holding mouse, user is intending to drag, not click
      const dragTimer = setTimeout(() => {
        document.body.style.setProperty('pointer-events', 'none');
      }, 500);

      const interactMoveEvent = (e: MouseEvent | TouchEvent) => {
        const position = getMousePosition(e);
        const deltaPosition = {
          x: startPosition.x - position.x,
          y: startPosition.y - position.y,
        };
        const change = pythagorean(deltaPosition.x, deltaPosition.y);
        if (change > maxChange) {
          maxChange = change;
        }

        scrollTo(
          startScrollX + deltaPosition.x,
          startScrollY + deltaPosition.y,
        );

        // User is dragging mouse around, prevent any clicks
        if (maxChange > 75) {
          document.body.style.setProperty('pointer-events', 'none');
        }
      };

      const interactEndEvent = () => {
        clearTimeout(dragTimer);
        document.body.style.removeProperty('pointer-events');
        
        document.removeEventListener('mousemove', interactMoveEvent);
        document.removeEventListener('touchmove', interactMoveEvent);
        document.removeEventListener('mouseup', interactEndEvent);
        document.removeEventListener('touchend', interactEndEvent);
        document.removeEventListener('click', interactEndEvent);
      };

      document.addEventListener('mousemove', interactMoveEvent);
      document.addEventListener('touchmove', interactMoveEvent);
      document.addEventListener('mouseup', interactEndEvent);
      document.addEventListener('touchend', interactEndEvent);
      document.addEventListener('click', interactEndEvent);
		};

    const pressedKeys: Record<string, true> = {};
    const keyStartEvent = (e: KeyboardEvent) => {
      pressedKeys[e.key] = true;
      if (pressedKeys['ArrowLeft'] || pressedKeys['a']) scrollBy({left: -10});
      if (pressedKeys['ArrowRight'] || pressedKeys['d']) scrollBy({left: 10});
      if (pressedKeys['ArrowUp'] || pressedKeys['w']) scrollBy({top: -10});
      if (pressedKeys['ArrowDown'] || pressedKeys['s']) scrollBy({top: 10});
      
      const keyEndEvent = (e: KeyboardEvent) => {
        delete pressedKeys[e.key];
      };

      document.addEventListener('keyup', keyEndEvent);
    };

    const zoomStartEvent = (e: WheelEvent) => {
      const mainContent = document.querySelector<HTMLDivElement>('#BackgroundDisplay');
      const zoom = parseFloat(mainContent?.style.getPropertyValue('zoom') || '1');
      const displayedDelta = e.deltaY / 5000;
      mainContent?.style.setProperty('zoom', `${zoom + displayedDelta}`);

      // Correct zoom in to ensure zoom is proportional
      const mainContentRect = mainContent?.getBoundingClientRect();
      const ratioChange = displayedDelta / zoom;
      console.log(ratioChange); 
      window.scrollTo({
        left: scrollX + (mainContentRect?.width ?? 0) * ratioChange,
        top: scrollY + window.innerHeight * ratioChange,
      });
    };

		document.addEventListener('wheel', zoomStartEvent);
		document.addEventListener('keydown', keyStartEvent);
		document.addEventListener('mousedown', interactStartEvent);
		document.addEventListener('touchstart', interactStartEvent);

    return () => {
      document.documentElement.style.removeProperty('cursor');
      document.documentElement.style.removeProperty('user-select');
      document.documentElement.classList.remove('prevent-drag');
    };
  }, []);

	return (
		<></>
	);
};

export default BrowserMovement;