import { FunctionComponent, MouseEventHandler, ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: 'small';
}

/**
 * A standard button component with directional hover effects.
 */
const Button: FunctionComponent<ButtonProps> = ({children, onClick, size}) => {

  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [hover, setHover] = useState<boolean>(false);

  const onEnter: MouseEventHandler<HTMLButtonElement> = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    setHover(true);
    if (boundingRect) {
      setPosition([event.clientX - boundingRect.left, event.clientY - boundingRect.top]);
    }
  };

  const onMove: MouseEventHandler<HTMLButtonElement> = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    setHover(true);
    if (boundingRect) {
      setPosition([event.clientX - boundingRect.left, event.clientY - boundingRect.top]);
    }
  };

  const onLeave: MouseEventHandler<HTMLButtonElement> = () => {
    setHover(false);
  };

  const buttonClass = [];
  if (size === 'small') buttonClass.push('smallButton');
  else buttonClass.push('button');

  const buttonCursorClass = ['buttonCursor'];
  if (!hover) buttonCursorClass.push('transparent');

  return (
    <button
      className={buttonClass.join(' ')}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div
        className={buttonCursorClass.join(' ')}
        style={{
          left: `calc(${position[0]}px - 2rem)`,
          top: `calc(${position[1]}px - 2rem)`,
        }}
      />
    </button>
  );
};

export { Button };