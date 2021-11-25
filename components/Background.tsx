import { FunctionComponent, useEffect } from 'react';
import { IBubble } from '../lib/bubbleData/_shared';
import { IsArrayNaN } from '../lib/utils';

const Circle: FunctionComponent<{bubbles: IBubble[]}> = ({bubbles}) => {

	useEffect(() => {		
		const timer = setInterval(() => {
			const background = document.getElementById('Background') as HTMLCanvasElement;

			background.width = document.body.clientWidth;
			background.height = document.body.clientHeight;
	
			const context = background.getContext('2d');
			if (context === null) return
			context.clearRect(0, 0, background.width, background.height);
	
			context.beginPath();
			for (let i = 0; i < bubbles.length; i++) {
				const bubble = bubbles[i];
				const connection = bubbles.find(e => e.id === bubble.connection);
				if (connection === undefined || IsArrayNaN(connection.position) || IsArrayNaN(bubble.position)) continue;

				context.moveTo(bubble.position[0] * 20, bubble.position[1] * 20);
				context.lineTo(connection.position[0] * 20, connection.position[1] * 20);
			}
			context.stroke();
		}, 30);
		
		return () => clearInterval(timer);
	});

	return (
		<canvas id='Background'/>
	)
}

export default Circle;