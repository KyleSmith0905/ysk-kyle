import Link from 'next/link';
import { useRouter } from 'next/router';
import { FunctionComponent } from 'react';

const HomeButton: FunctionComponent = () => {
	const {pathname} = useRouter();

	if (pathname === '/') return null;

	return (
		<nav id='HomeButton'>
			<Link href='/'>
				<button
					id='DisplaySettings'
					aria-label = 'DisplaySettings'
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
			</Link>
		</nav>
	);
};

export default HomeButton;