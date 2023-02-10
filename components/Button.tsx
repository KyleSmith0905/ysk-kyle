import { CSSProperties, FunctionComponent, MouseEventHandler, ReactNode, useState } from 'react';

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

  const buttonCursorContainerClass = ['buttonCursorContainer'];
  if (!hover) buttonCursorContainerClass.push('transparent');

  return (
    <button
      className={buttonClass.join(' ')}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
      <div className='buttonBackground'/>
      <div
        className={buttonCursorContainerClass.join(' ')}
        style={{
          '--border-radius': '1.2rem',
          '--left': `${position[0]}px`,
          '--top': `${position[1]}px`,
        } as CSSProperties}
      >
        <div className='buttonCursorBorder' />
        <div className='buttonCursor' />
      </div>
    </button>
  );
};

export { Button };