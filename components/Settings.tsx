import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HomeSVG: FunctionComponent<{setTravelMode: Dispatch<SetStateAction<number>>, travelMode: number}> = ({setTravelMode, travelMode}) => {
	const router = useRouter();

	const [settingsOpen, setSettingsOpen] = useState(false);
	const toggleSettings = () =>  {
		setSettingsOpen(!settingsOpen);
	}

	const travelModes = ['Browser', 'Edge Scrolling', 'Control Stick']

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
				<button onClick={() => setTravelMode((travelMode + 1) % travelModes.length)}>
					Travel Mode: {travelModes[travelMode]}
				</button>
				{router.pathname !== '/' &&
					<Link href='/'>Back To Home</Link>
				}
			</div>
		</div>
	)
}

export default HomeSVG;