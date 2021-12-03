import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { IBubble } from '../lib/bubbleData/_shared';
import { driftAround, moveToPosition } from '../lib/bubblePhysics';
import { IsArraysEqual } from '../lib/utils';


const Bubble: FunctionComponent<{bubble: IBubble, bubbles: IBubble[], setBubbles: Dispatch<SetStateAction<IBubble[]>>}> = ({bubble, bubbles, setBubbles}) => {
	
	const [position, setPosition] = useState(bubble.position);
	const [timerID, setTimerID] = useState<NodeJS.Timer>();

	const timerInterval = (speed: number) => {		
		const timer = setInterval(() => {
			setPosition(moveToPosition(bubble, bubbles));
			setPosition(driftAround(bubble, bubbles));
			setBubbles(bubbles);

			if (speed === 30 && IsArraysEqual(bubble.pivotPosition, bubble.deployPosition)) {
				clearInterval(timer)
				timerInterval(60);
			}
		}, speed);

		setTimerID(timer);
	}

	useEffect(() => {		
		timerInterval(30);
		
		return () => {
			if (timerID) clearInterval(timerID);
		}
	}, []);
	
	const BubbleTag = bubble.link === undefined ? 'div' : 'a';
	const isExternalSite = Boolean(bubble.link?.match(/^https?:\/\//));

	if (isNaN(position[0]) === true) return <></>
	else if (bubble.summary === undefined) return (
		<BubbleTag 
			className='Bubble ImageBubble'
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
			style={{
				position: 'absolute',
				left: ((position[0] * 20) - bubble.radius) + 'px',
				top: ((position[1] * 20) - bubble.radius) + 'px',
				width: (bubble.radius * 2) + 'px',
				height: (bubble.radius * 2) + 'px',
			}}
		>
			<Image
				src={'/images/' + bubble.image + '.png'}
				alt={bubble.name}
				quality={75}
				priority={true}
				layout='intrinsic'
				width={bubble.radius * 2}
				height={bubble.radius * 2}
				objectFit='cover'
			/>
		</BubbleTag>
	)
	else return (
		<BubbleTag
			className='Bubble'
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
			style={{
				position: 'absolute',
				left: ((position[0] * 20) - bubble.radius) + 'px',
				top: ((position[1] * 20) - bubble.radius) + 'px',
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
						alt={bubble.name}
						quality={5}
						priority={true}
						width={bubble.radius * 2}
						height={bubble.radius * 2}
						layout='intrinsic'
						objectFit='cover'
					/>
				</div>
			}
		</BubbleTag>
	)
}

export default Bubble;