import { CSSProperties, FunctionComponent, HTMLAttributeAnchorTarget, MouseEventHandler, ReactNode, useState } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLElement>;
  size?: 'small';
  polymorphic?: 'a' | 'button';
  target?: HTMLAttributeAnchorTarget;
  href?: string;
  className?: string;
  tabIndex?: number;
}

/**
 * A standard button component with directional hover effects.
 */
const Button: FunctionComponent<ButtonProps> = ({children, onClick, size, polymorphic = 'button', target, href, className, tabIndex}) => {

  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [hover, setHover] = useState<boolean>(false);

  const onEnter: MouseEventHandler<HTMLElement> = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    setHover(true);
    if (boundingRect) {
      setPosition([event.clientX - boundingRect.left, event.clientY - boundingRect.top]);
    }
  };

  const onMove: MouseEventHandler<HTMLElement> = (event) => {
    const boundingRect = event.currentTarget.getBoundingClientRect();
    setHover(true);
    if (boundingRect) {
      setPosition([event.clientX - boundingRect.left, event.clientY - boundingRect.top]);
    }
  };

  const onLeave: MouseEventHandler<HTMLElement> = () => {
    setHover(false);
  };

  // Add classes to the button
  const buttonClass = [];
  if (className) buttonClass.push(className);
  if (size === 'small') buttonClass.push('smallButton');
  else buttonClass.push('button');

  const buttonCursorContainerClass = ['buttonCursorContainer'];
  if (!hover) buttonCursorContainerClass.push('transparent');

  // Change button to inputted polymorphic component
  const PolymorphicComponent = polymorphic;

  return (
    <PolymorphicComponent
      className={buttonClass.join(' ')}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      target={target}
      href={href}
      tabIndex={tabIndex}
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
    </PolymorphicComponent>
  );
};

export { Button };