import { Dispatch, FunctionComponent, MouseEventHandler, SetStateAction } from 'react';

const HomeButton: FunctionComponent<{
	bubbleScene: string;
	bubbleSceneReset: string;
	setBubbleSceneReset: Dispatch<SetStateAction<string>>,
}> = ({bubbleScene, bubbleSceneReset, setBubbleSceneReset}) => {

	// Updates the route and content like a traditional page transition
	const updateScene: MouseEventHandler<HTMLElement> = async (event) => {
		// Ensure user cannot press home button during transition
		if (bubbleSceneReset !== bubbleScene) return;
		
		event.preventDefault();
		setBubbleSceneReset('index');
	};

	if (bubbleScene === 'index') return null;

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