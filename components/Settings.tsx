import { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ColorModes, COLOR_MODES } from '../lib/colorMode';
import { setCookie } from '../lib/cookies';
import { GraphicsLevels } from '../lib/graphicsLevel';

const HomeSVG: FunctionComponent<{
	setTravelMode: Dispatch<SetStateAction<string>>,
	travelMode: string,
	setColorTheme: Dispatch<SetStateAction<ColorModes>>,
	colorTheme: ColorModes,
	setGraphics: Dispatch<SetStateAction<GraphicsLevels>>
	graphics: GraphicsLevels,
}> = ({
	setTravelMode, travelMode,
	setColorTheme, colorTheme,
	setGraphics, graphics,
}) => {

	const router = useRouter();

	const [settingsOpen, setSettingsOpen] = useState(true);

	const toggleSettings = () => setSettingsOpen(!settingsOpen);

	const colorThemes = COLOR_MODES.map((e) => e.name) as ColorModes[];
	const travelModes = ['Browser', 'Edge Scrolling', 'Control Stick', 'Panorama'];
	const graphicsLevels: GraphicsLevels[] = ['Auto', 'Low', 'High'];
	
	const handleColorThemeChange = () => {
		const root = document.getElementById('ColorTheme') as HTMLElement;
		if (!root) return;
		root.className = colorThemes[(colorThemes.indexOf(colorTheme) + 1) % colorThemes.length];
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
				<button onClick={() => {
					const newTravelMode = travelModes[(travelModes.indexOf(travelMode) + 1) % travelModes.length];
					setTravelMode(newTravelMode);
					setCookie('travelMode', newTravelMode);
				}}>
					Travel Mode: {travelMode}
				</button>
				<button onClick={() => {
					const newColorTheme = colorThemes[(colorThemes.indexOf(colorTheme) + 1) % colorThemes.length];
					handleColorThemeChange();
					setColorTheme(newColorTheme);
					setCookie('colorTheme', newColorTheme);
				}}>
					Color Theme: {colorTheme}
				</button>
				<button onClick={() => {
					const newGraphics = graphicsLevels[(graphicsLevels.indexOf(graphics) + 1) % graphicsLevels.length];
					setGraphics(newGraphics);
					setCookie('graphics', newGraphics);
					console.log(newGraphics);
				}}>
					Graphics Level: {graphics}
				</button>
			</div>
		</aside>
	);
};

export default HomeSVG;