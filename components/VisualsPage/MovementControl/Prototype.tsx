import { clamp, pythagorean } from '@lib/utils';
import { FunctionComponent, useEffect } from 'react';

const BrowserMovement: FunctionComponent = () => {
  useEffect(() => {
		document.documentElement.style.setProperty('cursor', 'grab');
		document.documentElement.style.setProperty('user-select', 'none');
		document.documentElement.style.setProperty('overflow', 'hidden');
		document.body.style.setProperty('overflow', 'hidden');
		document.body.style.setProperty('width', '100%');
		document.body.style.setProperty('height', '100%');
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
      const rootFontSizeValue = window.getComputedStyle(document.body).getPropertyValue('font-size');
      const rootFontSize = parseInt(rootFontSizeValue);
      const rootDocumentSize = rootFontSize * 125;

      const mainContent = document.querySelector<HTMLDivElement>('#BackgroundDisplay');
      const scale = parseFloat(mainContent?.style.getPropertyValue('transform')?.split('scale(')[1]?.split(')')[0] || '1');
      const displayedDelta = e.deltaY / 2500;
      const newScale = clamp(scale - displayedDelta, 0.5, 2.5);
      // If scale is not changing, do nothing
      if (scale === newScale) return;
      
      // The amount to translate to center zoom
      const newTransform = {
        x: 1000 * newScale - 1000,
        y: (1 / (newScale * -0.001)) + 1000,
      };
      
      // Zooms in and ensure page resizes to the content
      const newPageWidth = Math.max(rootDocumentSize * newScale, window.innerWidth);
      const newPageHeight = Math.max(rootDocumentSize * newScale, window.innerHeight);
      document.documentElement.style.setProperty('width', `${newPageWidth}px`);
      document.documentElement.style.setProperty('height', `${newPageHeight}px`);
      mainContent?.style.setProperty('transform', `scale(${newScale}) translateX(${newTransform.x}px) translateY(${newTransform.y}px`);

      // Adjusts for scale and transform changes
      const ratioChange = newScale / scale;
      const distanceChanged = {
        x: rootDocumentSize * scale * (1 - ratioChange),
        y: rootDocumentSize * scale * (1 - ratioChange),
      };
      const scaleCorrection = {
        x: distanceChanged.x * -0.5,
        y: distanceChanged.y * -0.5,
      };

      // Gets center point of screen
      const center = {
        x: scrollX + window.innerWidth / 2,
        y: scrollY + window.innerHeight / 2,
      };
      // Get change that will be applied to the center point
      const centerCorrection = {
        x: ((rootDocumentSize * scale / 2) - center.x) * (1 - ratioChange),
        y: ((rootDocumentSize * scale / 2) - center.y) * (1 - ratioChange),
      };

      console.log(`${(rootDocumentSize * scale) * (1 - ratioChange)}\n${rootDocumentSize * scale}\n${1 - ratioChange}`);

      scrollTo({
        left: scrollX + scaleCorrection.x + centerCorrection.x,
        top: scrollY + scaleCorrection.y + centerCorrection.y,
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