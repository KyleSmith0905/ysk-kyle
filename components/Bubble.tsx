import { Dispatch, FunctionComponent, SetStateAction, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { IBubble } from '../lib/bubbleData/_shared';
import { driftAround, moveToPosition, spawnBubble, setRandomPosition} from '../lib/bubblePhysics';
import { IsArrayNaN, IsArraysEqual, SetBubbleTransform } from '../lib/utils';

interface BubbleProps {
	bubble: IBubble,
	bubbles: IBubble[],
	setBubbles: Dispatch<SetStateAction<IBubble[]>>,
	isUserBot: boolean,
}

const Bubble: FunctionComponent<BubbleProps> = ({bubble, bubbles, setBubbles, isUserBot}) => {

	const [hidden, setHidden] = useState(!isUserBot);
	const bubbleElement = useRef(null);

	useEffect(() => {
		const loadTime = Date.now();
		
		let requestId = 0;

		if (isUserBot) {
			const bubbleElement = document.getElementById('Bubble' + bubble.id);
			setRandomPosition(bubble);
			SetBubbleTransform(bubble, bubbleElement);
			return;
		}
		
		const showElement = () => {
			setHidden(false);
			SetBubbleTransform(bubble, bubbleElement.current);
		};

		const performPhysics = () => {
			const bubbleElement = document.getElementById('Bubble' + bubble.id);
			const oldBubbleDeployPosition = bubble.deployPosition;

			if (IsArrayNaN(bubble.position)) {
				spawnBubble(bubble, bubbles, Date.now() - loadTime);
				SetBubbleTransform(bubble, bubbleElement);
				if (IsArrayNaN(bubble.position) === false) showElement();
			}
			else {
				if (!IsArraysEqual(bubble.pivotPosition, bubble.deployPosition)) moveToPosition(bubble, bubbles);
				driftAround(bubble, bubbles);
			}
			
			if (bubbleElement) {
				SetBubbleTransform(bubble, bubbleElement);
				if (IsArraysEqual(oldBubbleDeployPosition, bubble.deployPosition)) setBubbles(bubbles);
			}

			requestId = requestAnimationFrame(performPhysics);
		};

		if (IsArrayNaN(bubble.position) === false) showElement();
		requestId = requestAnimationFrame(performPhysics);
		
		return () => cancelAnimationFrame(requestId);
	}, [isUserBot, bubble, bubbles, setBubbles]);

	const BubbleTag = bubble.link === undefined ? 'div' : 'a';
	const isExternalSite = Boolean(bubble.link?.match(/^https?:\/\//));

	let sizeClass = '';
	if (bubble.size === 'small') sizeClass = 'BubbleSmall';
	else if (bubble.size === 'large') sizeClass = 'BubbleLarge';
	else sizeClass = 'BubbleMedium';

	if (bubble.summary === undefined) return (
		<BubbleTag 
			id={'Bubble' + bubble.id}
			ref={bubbleElement}
			className={'Bubble ImageBubble ' + sizeClass + (hidden ? ' Hidden' : '')}
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
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
		</BubbleTag>
	);
	else return (
		<BubbleTag
			id={'Bubble' + bubble.id}
			ref={bubbleElement}
			className={'Bubble ' + sizeClass + (hidden ? ' Hidden' : '')}
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
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
		</BubbleTag>
	);
};

export default Bubble;