import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { IBubble } from '../lib/bubbleData/_shared';
import { driftAround, moveToPosition, spawnBubble, setRandomPosition} from '../lib/bubblePhysics';
import { IsArrayNaN, IsArraysEqual, IsUserBot, SetBubbleTransform } from '../lib/utils';


const Bubble: FunctionComponent<{bubble: IBubble, bubbles: IBubble[], setBubbles: Dispatch<SetStateAction<IBubble[]>>}> = ({bubble, bubbles, setBubbles}) => {

	const [hidden, setHidden] = useState(!IsUserBot());
	
	
	useEffect(() => {
		const loadTime = Date.now();
		
		let requestId = 0;

		if (IsUserBot()) {
			const bubbleElement = document.getElementById(bubble.id);
			setRandomPosition(bubble);
			SetBubbleTransform(bubble, bubbleElement);
			return;
		}
		
		const performPhysics = () => {
			const bubbleElement = document.getElementById(bubble.id);
			const oldBubbleDeployPosition = bubble.deployPosition;

			if (IsArrayNaN(bubble.position)) spawnBubble(bubble, bubbles, Date.now() - loadTime);
			else if (!IsArraysEqual(bubble.pivotPosition, bubble.deployPosition)) moveToPosition(bubble, bubbles);
			driftAround(bubble, bubbles);
			
			if (isNaN(bubble.position[0]) === false) setHidden(false);
			if (bubbleElement === null) return requestId = requestAnimationFrame(performPhysics);

			SetBubbleTransform(bubble, bubbleElement);
			if (IsArraysEqual(oldBubbleDeployPosition, bubble.deployPosition)) setBubbles(bubbles);

			requestId = requestAnimationFrame(performPhysics);
		};

		if (isNaN(bubble.position[0]) === false) setHidden(false);
		requestId = requestAnimationFrame(performPhysics);
		
		return () => cancelAnimationFrame(requestId);
	}, [bubble, bubbles, setBubbles]);

	const BubbleTag = bubble.link === undefined ? 'div' : 'a';
	const isExternalSite = Boolean(bubble.link?.match(/^https?:\/\//));
	let sizeClass = '';
	if (bubble.size === 'small') sizeClass = 'BubbleSmall';
	else if (bubble.size === 'large') sizeClass = 'BubbleLarge';
	else sizeClass = 'BubbleMedium';

	if (hidden) return <></>;
	else if (bubble.summary === undefined) return (
		<BubbleTag 
			id={bubble.id}
			className={'Bubble ImageBubble ' + sizeClass}
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
			id={bubble.id}
			className={'Bubble ' + sizeClass}
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
			tabIndex={0}
			style={{
				position: 'absolute',
				width: (bubble.radius * 2) + 'px',
				height: (bubble.radius * 2) + 'px',
			}
		}>
			<h2>
				{bubble.name}
			</h2>
			<p>
				{bubble.summary}
			</p>
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