import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import { IBubble } from '../lib/bubbleData/_shared';
import { driftAround, moveToPosition } from '../lib/bubblePhysics';


const Bubble: FunctionComponent<{bubble: IBubble, bubbles: IBubble[], setBubbles: Dispatch<SetStateAction<IBubble[]>>}> = ({bubble, bubbles, setBubbles}) => {
	
	const [timerID, setTimerID] = useState<NodeJS.Timer>();
	const [hidden, setHidden] = useState(true);

	const timerInterval = () => {		
		const timer = setInterval(() => {
			const bubbleElement = document.getElementById(bubble.id);
			
			moveToPosition(bubble, bubbles);
			driftAround(bubble, bubbles);
			
			
			if (isNaN(bubble.position[0]) === false) setHidden(false);
			if (bubbleElement === null) return;
			bubbleElement.style.transform = 'translate(' + (bubble.position[0] * 20 - bubble.radius) + 'px, ' + (bubble.position[1] * 20 - bubble.radius) + 'px)';
			setBubbles(bubbles);
		}, 30);

		setTimerID(timer);
	}

	useEffect(() => {
		if (isNaN(bubble.position[0]) === false) setHidden(false);
		timerInterval();
		
		return () => {
			if (timerID) clearInterval(timerID);
		}
	}, []);
	
	const BubbleTag = bubble.link === undefined ? 'div' : 'a';
	const isExternalSite = Boolean(bubble.link?.match(/^https?:\/\//));

	if (hidden) return <></>
	else if (bubble.summary === undefined) return (
		<BubbleTag 
			id={bubble.id}
			className='Bubble ImageBubble'
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
			style={{
				position: 'absolute',
				width: (bubble.radius * 2) + 'px',
				height: (bubble.radius * 2) + 'px',
			}}
		>
			<Image
				src={'/images/' + bubble.image + '.png'}
				alt={bubble.name}
				quality={75}
				placeholder='empty'
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
			id={bubble.id}
			className='Bubble'
			href={bubble.link}
			rel={isExternalSite ? 'nofollow noopener' : ''}
			target={isExternalSite ? '_blank' : '_self'}
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
						alt={bubble.name}
						quality={5}
						priority={false}
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