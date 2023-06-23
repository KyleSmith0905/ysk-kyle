import { clamp, pythagorean, IsUserMobileSafari } from '@lib/utils';
import { useRef, useState } from 'react';
import { FunctionComponent, useEffect } from 'react';

const PrototypeMovement: FunctionComponent = () => {

  const [isMobileSafari, setIsMobileSafari] = useState(false);

	const centerX = useRef(0);
	const centerY = useRef(0);
	const zoom = useRef(1);

  useEffect(() => {
    const isMobileSafari = IsUserMobileSafari();
    setIsMobileSafari(isMobileSafari);
    
		// Center screen to origin.
		const rootFontSizeValue = window.getComputedStyle(document.body).getPropertyValue('font-size');
		const rootFontSize = parseInt(rootFontSizeValue);
		scrollTo(
			(62.5 * rootFontSize) - (window.innerWidth / 2),
			(62.5 * rootFontSize) - (window.innerHeight / 2),
		);

		document.documentElement.style.setProperty('cursor', 'grab');
		document.documentElement.style.setProperty('user-select', 'none');
    if (!isMobileSafari) {
      document.documentElement.style.setProperty('overflow', 'hidden');
      document.body.style.setProperty('overflow', 'hidden');
      document.body.style.setProperty('width', '100%');
      document.body.style.setProperty('height', '100%');
      document.documentElement.classList.add('prevent-drag');
    }
    else {
      document.documentElement.style.setProperty('overflow', 'auto');
    }

    const getMousePosition = (e: MouseEvent | TouchEvent) => {
      if (e instanceof MouseEvent) {
        return { x: e.clientX, y: e.clientY };
      }
      else {
        const touchPosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        return touchPosition;
      }
    };

    const hydrateChanges = () => {
      const newTransformX = centerX.current;
      const newTransformY = centerY.current;

      const mainContent = document.querySelector<HTMLDivElement>('#BackgroundDisplay');
      mainContent?.style.setProperty('transform', `scale(${zoom.current}) translateX(${newTransformX}px) translateY(${newTransformY}px`);
    };

    const interactStartEvent = (e: MouseEvent | TouchEvent) => {
      let previousPosition = getMousePosition(e);
      let maxChange = 0;
      let totalDeltaX = 0;
      let totalDeltaY = 0;

      // User is holding mouse, user is intending to drag, not click
      const dragTimer = setTimeout(() => {
        document.body.style.setProperty('pointer-events', 'none');
      }, 500);

      const interactMoveEvent = (e: MouseEvent | TouchEvent) => {
        const position = getMousePosition(e);
        
        // Changes in scroll this current frame
        const deltaPositionX = previousPosition.x - position.x;
        const deltaPositionY = previousPosition.y - position.y;

        // The total amount of change since started dragging
        totalDeltaX = totalDeltaX + deltaPositionX;
        totalDeltaY = totalDeltaY + deltaPositionY;
        const change = Math.abs(pythagorean(totalDeltaX, totalDeltaY));

        // Save the furthest the user has dragged the mouse
        if (change > maxChange) {
          maxChange = change;
        }

        centerX.current = clamp(centerX.current - (deltaPositionX * (1 / zoom.current)), -1000, 1000);
        centerY.current = clamp(centerY.current - (deltaPositionY * (1 / zoom.current)), -1000, 1000);
        hydrateChanges();

        previousPosition = position;
        
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

      let deltaPositionX = 0;
      let deltaPositionY = 0;
      if (pressedKeys['ArrowLeft'] || pressedKeys['a']) deltaPositionX -= 15;
      if (pressedKeys['ArrowRight'] || pressedKeys['d']) deltaPositionX += 15;
      if (pressedKeys['ArrowUp'] || pressedKeys['w']) deltaPositionY -= 15;
      if (pressedKeys['ArrowDown'] || pressedKeys['s']) deltaPositionY += 15;

      centerX.current = clamp(centerX.current - (deltaPositionX * (1 / zoom.current)), -1000, 1000);
      centerY.current = clamp(centerY.current - (deltaPositionY * (1 / zoom.current)), -1000, 1000);
      hydrateChanges();

      const keyEndEvent = (e: KeyboardEvent) => {
        delete pressedKeys[e.key];
      };

      document.addEventListener('keyup', keyEndEvent);
    };

    const zoomStartEvent = (e: WheelEvent) => {
      const displayedDelta = e.deltaY / 2500;
      const newScale = clamp(zoom.current - displayedDelta, 0.5, 2.5);

      // If scale is not changing, do nothing
      if (zoom.current === newScale) return;

      zoom.current = newScale;

      hydrateChanges();
    };

    if (!isMobileSafari) {
      document.addEventListener('wheel', zoomStartEvent);
      document.addEventListener('keydown', keyStartEvent);
      document.addEventListener('mousedown', interactStartEvent);
      document.addEventListener('touchstart', interactStartEvent);
    }

    return () => {
      const mainContent = document.querySelector<HTMLDivElement>('#BackgroundDisplay');
      document.removeEventListener('wheel', zoomStartEvent);
      document.removeEventListener('keydown', keyStartEvent);
      document.removeEventListener('mousedown', interactStartEvent);
      document.removeEventListener('touchstart', interactStartEvent);
      
      mainContent?.style.removeProperty('transform');
      document.documentElement.style.removeProperty('cursor');
      document.documentElement.style.removeProperty('user-select');
      document.documentElement.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('width');
      document.documentElement.style.removeProperty('height');
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('height');
      document.documentElement.classList.remove('prevent-drag');
    };
  }, []);

  if (isMobileSafari) {
    return <div/>;
  }
	return (
		<></>
	);
};

export default PrototypeMovement;