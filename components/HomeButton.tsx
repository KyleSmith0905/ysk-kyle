import { Dispatch, FunctionComponent, MouseEventHandler, SetStateAction } from 'react';
import { IBubble } from '../lib/bubbleData/_shared';
import structuredClone from '@ungap/structured-clone';

const HomeButton: FunctionComponent<{
	bubbleScene: string;
	setBubbleScene: Dispatch<SetStateAction<string>>,
	setBubbles: Dispatch<SetStateAction<IBubble[]>>
}> = ({bubbleScene, setBubbleScene, setBubbles}) => {

	// Updates the route and content like a traditional page transition.
	const updateScene: MouseEventHandler<HTMLElement> = async (event) => {
		event.preventDefault();

		const bubbleDataImport = await import('../lib/bubbleData/index');
		const bubbles = bubbleDataImport.default;
		history.pushState({}, '', '/');
		setBubbleScene('index');
		setBubbles(structuredClone(bubbles.slice().reverse()));
	};

	if (bubbleScene === '/') return null;

	return (
		<nav id='HomeButton'>
			<button
				id='DisplaySettings'
				aria-label = 'DisplaySettings'
				onClick={updateScene}
			>
				<svg width='50' height='50'>
					<path
						d='M10,46 L40,46
						M10,46 L10,18
						M40,46 L40,18
						M4,22 L25,4 L46,22'
						fill='transparent'
						strokeLinecap='round'
						strokeWidth={7}
						stroke='var(--color-text)'
					/>
				</svg>
			</button>
		</nav>
	);
};

export default HomeButton;