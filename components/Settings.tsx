import { FunctionComponent, useState } from 'react';
import Link from 'next/link';

const HomeSVG: FunctionComponent = () => {
	
	const [settingsOpen, setSettingsOpen] = useState(false);
	const toggleSettings = () =>  {
		setSettingsOpen(!settingsOpen);
	}

	return (
		<div id='Settings'>
			<button
				onClick = {toggleSettings}
				aria-label = 'DisplaySettings'
			>
				<svg width='50' height='50'>
					<path
						d='M4,4 L46,4
						M4,25 L46,25
						M4,46 L46,46'
						fill='transparent'
						strokeLinecap='round'
						strokeWidth={7}
						stroke='#000'
					/>
				</svg>
			</button>
			<div id='SettingsList' className={settingsOpen ? '': 'Hidden'}>
				<Link href='/'>To Home</Link>
			</div>
		</div>
	)
}

export default HomeSVG;