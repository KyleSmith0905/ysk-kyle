import { Dispatch, FunctionComponent, MouseEventHandler, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { COLOR_MODES } from '../lib/colorMode';

const HomeSVG: FunctionComponent<{setTravelMode: Dispatch<SetStateAction<number>>, travelMode: number}> = ({setTravelMode, travelMode}) => {
	const router = useRouter();

	const [settingsOpen, setSettingsOpen] = useState(true);
	const [colorTheme, setColorTheme] = useState(0);

	const toggleSettings = () => setSettingsOpen(!settingsOpen);

	const colorThemes = COLOR_MODES.map((e) => e.name);
	const travelModes = ['Browser', 'Edge Scrolling', 'Control Stick', 'Panorama'];

	const handleColorThemeChange: MouseEventHandler<HTMLButtonElement> = (): void => {
		const root = document.querySelector(':root') as HTMLElement;
		if (!root) return;

		const newColorTheme = (colorTheme + 1) % colorThemes.length;
		const newColorThemeColors = COLOR_MODES[newColorTheme];
		setColorTheme(newColorTheme);

		root.style.setProperty('--color-primary', newColorThemeColors.primary);
		root.style.setProperty('--color-secondary', newColorThemeColors.secondary);
		root.style.setProperty('--color-text', newColorThemeColors.text);
	};

	return (
		<aside id='Settings'>
			<button
				onClick={toggleSettings}
				id='DisplaySettings'
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
						stroke='var(--color-text)'
					/>
				</svg>
			</button>
			<div id='SettingsList' className={settingsOpen ? '': 'Hidden'}>
				{router.pathname !== '/' &&
					<Link href='/'>Back To Home</Link>
				}
				<button onClick={() => setTravelMode((travelMode + 1) % travelModes.length)}>
					Travel Mode: {travelModes[travelMode]}
				</button>
				<button onClick={handleColorThemeChange}>
					Color Theme: {colorThemes[colorTheme]}
				</button>
			</div>
		</aside>
	);
};

export default HomeSVG;