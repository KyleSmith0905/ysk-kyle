import { Dispatch, FunctionComponent, MouseEventHandler, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IBubble } from '../../lib/bubbleData/_shared';
import { driftAround, moveToPosition, spawnBubble, retreatToCenter} from '../../lib/bubblePhysics';
import { IsArrayNaN, IsArraysEqual, SetBubbleTransform } from '../../lib/utils';

interface BubbleProps {
	bubble: IBubble,
	bubbles: IBubble[],
	setBubbles: Dispatch<SetStateAction<IBubble[]>>,
	bubbleScene: string,
	setBubbleScene: Dispatch<SetStateAction<string>>,
	bubbleSceneReset: string,
	setBubbleSceneReset: Dispatch<SetStateAction<string>>,
}

const Bubble: FunctionComponent<BubbleProps> = ({bubble, bubbles, bubbleScene, bubbleSceneReset, setBubbleSceneReset, setBubbles}) => {

	const [hidden, setHidden] = useState(true);
  const [position, setPosition] = useState<[number, number]>([0, 0]);
  const [hover, setHover] = useState<boolean>(false);
	const bubbleElementRef = useRef(null);

	useEffect(() => {
		const loadTime = Date.now();
		
		let requestId: number;
		
		const showElement = () => {
			setHidden(false);
			SetBubbleTransform(bubble, bubbleElementRef.current);
		};
		
		const performPhysics = () => {
			const bubbleElement = document.getElementById(`Bubble_${bubble.id}`);
			const oldBubbleDeployPosition = bubble.deployPosition;

			// Attempts to spawn bubble
			if (IsArrayNaN(bubble.position)) {
				spawnBubble(bubble, bubbles, Date.now() - loadTime);
				SetBubbleTransform(bubble, bubbleElement);
				if (!IsArrayNaN(bubble.position)) showElement();
			}
			// Drift the bubble around, also move to deploy position if not there
			else {
				if (!IsArraysEqual(bubble.pivotPosition, bubble.deployPosition)) moveToPosition(bubble, bubbles);
				driftAround(bubble, bubbles);
			}
			// Updates the bubble's position
			if (bubbleElement) {
				SetBubbleTransform(bubble, bubbleElement);
				if (IsArraysEqual(oldBubbleDeployPosition, bubble.deployPosition)) setBubbles(bubbles);
			}

			// Exit condition for leaving the page
			if (bubbleScene !== bubbleSceneReset) return;

			requestId = requestAnimationFrame(performPhysics);
		};

		if (IsArrayNaN(bubble.position) === false) showElement();
		requestId = requestAnimationFrame(performPhysics);
		
		return () => cancelAnimationFrame(requestId);
	}, [bubble, bubbles, setBubbles, bubbleScene, bubbleSceneReset]);

	// Exit animation
	const isInAnimation = useRef(false);
	useEffect(() => {
		if (bubbleSceneReset === bubbleScene || isInAnimation.current) return;
		isInAnimation.current = true;

		const beginTime = Date.now();
		
		const performPhysics = () => {
			const bubbleElement = document.getElementById(`Bubble_${bubble.id}`);
			if (!bubbleElement) return;
			
			// Moves bubbles to center over a 1 second period
			const currentTime = Date.now();
			retreatToCenter(bubble, bubbles, (currentTime - beginTime) * 0.001);

			SetBubbleTransform(bubble, bubbleElement);
			requestAnimationFrame(performPhysics);
		};
		requestAnimationFrame(performPhysics);

	}, [bubbleSceneReset, bubbleScene, bubble, bubbles]);

	const BubbleTag = bubble.link === undefined ? 'div' : 'a';
	const isExternalSite = Boolean(bubble.link?.match(/^https?:\/\//));

	let sizeClass = '';
	if (bubble.size === 'small') sizeClass = 'BubbleSmall';
	else if (bubble.size === 'large') sizeClass = 'BubbleLarge';
	else sizeClass = 'BubbleMedium';

	// Updates the route and content like a traditional page transition.
	const updateScene: MouseEventHandler<HTMLElement> = async (event) => {
		if (!bubble.link || isExternalSite) return;
		event.preventDefault();
		if (!isInAnimation.current) setBubbleSceneReset(bubble.link);
	};

	// Functions related to mouse tracking
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

	const buttonCursorClass = ['buttonCursor'];
  if (!hover) buttonCursorClass.push('transparent');

	if (bubble.summary === undefined) return (
		<BubbleTag 
			id={`Bubble_${bubble.id}`}
			ref={bubbleElementRef}
			className={`Bubble ${sizeClass} ${hidden ? ' Hidden' : ''}`}
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
			onClick={updateScene}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
			tabIndex={0}
			style={{
				position: 'absolute',
				width: (bubble.radius * 2) + 'px',
				height: (bubble.radius * 2) + 'px',
			}}
		>
			<Image
				src={'/images/' + bubble.image + '.png'}
				alt={bubble.name}
				quality={50}
				priority={true}
				layout='intrinsic'
				width={bubble.radius * 2}
				height={bubble.radius * 2}
				objectFit='cover'
			/>
			<div
				className='circleBubbleCursorContainer'
				onMouseEnter={onEnter}
				onMouseMove={onMove}
				onMouseLeave={onLeave}
			>
				<div
					className={buttonCursorClass.join(' ')}
					style={{
						left: `calc(${position[0]}px - 2rem)`,
						top: `calc(${position[1]}px - 2rem)`,
					}}
				/>
			</div>
		</BubbleTag>
	);
	else return (
		<BubbleTag
			id={`Bubble_${bubble.id}`}
			ref={bubbleElementRef}
			className={`Bubble ${sizeClass} ${hidden ? ' Hidden' : ''}`}
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
			onClick={isExternalSite ? undefined : updateScene}
			tabIndex={0}
			style={{
				position: 'absolute',
				width: (bubble.radius * 2) + 'px',
				height: (bubble.radius * 2) + 'px',
			}}
		>
			<h2>
				{bubble.name}
			</h2>
			{bubble.summary !== '' && (
				<p>
					{bubble.summary}
				</p>
			)}
			{bubble.image &&
				<div className='BackgroundImageContainer'>
					<Image
						className='BackgroundImage'
						src={'/images/' + bubble.image + '.png'}
						alt=''
						quality={1}
						priority={false}
						width={bubble.radius * 2}
						height={bubble.radius * 2}
						layout='intrinsic'
						objectFit='cover'
					/>
				</div>
			}
			<div
				className='circleBubbleCursorContainer'
				onMouseEnter={onEnter}
				onMouseMove={onMove}
				onMouseLeave={onLeave}
			>
				<div
					className={buttonCursorClass.join(' ')}
					style={{
						left: `calc(${position[0]}px - 2rem)`,
						top: `calc(${position[1]}px - 2rem)`,
					}}
				/>
			</div>
		</BubbleTag>
	);
};

export default Bubble;