import { Dispatch, FunctionComponent, SetStateAction, useCallback, useState } from 'react';
import { GraphicsLowColorModes, GRAPHICS_LOW_COLOR_MODES, GraphicsHighColorModes, GRAPHICS_HIGH_COLOR_MODES } from '@lib/colorMode';
import { setCookie } from '@lib/cookies';
import { GraphicsLevels } from '@lib/graphicsLevel';
import { useGraphics } from '@lib/hooks';

const Settings: FunctionComponent<{
	setTravelMode: Dispatch<SetStateAction<string>>,
	travelMode: string,
	setGraphicsLowColorTheme: Dispatch<SetStateAction<GraphicsLowColorModes>>,
	graphicsLowColorTheme: GraphicsLowColorModes,
	setGraphicsHighColorTheme: Dispatch<SetStateAction<GraphicsHighColorModes>>,
	graphicsHighColorTheme: GraphicsHighColorModes,
  setAccessibility: Dispatch<SetStateAction<'Accessibility' | 'Visuals' | 'Undetermined'>>;
}> = ({
	setTravelMode, travelMode,
	setGraphicsLowColorTheme, graphicsLowColorTheme,
	setGraphicsHighColorTheme, graphicsHighColorTheme,
	setAccessibility,
}) => {
	const { autoGraphics, graphics, setGraphics} = useGraphics();
	const [settingsOpen, setSettingsOpen] = useState(true);

	const toggleSettings = () => setSettingsOpen(!settingsOpen);

	const graphicsLowColorThemes = GRAPHICS_LOW_COLOR_MODES.map((e) => e.name) as GraphicsLowColorModes[];
	const graphicsHighColorThemes = GRAPHICS_HIGH_COLOR_MODES.map((e) => e.name) as GraphicsHighColorModes[];
	const travelModes = ['Browser', 'Edge Scrolling', 'Control Stick', 'Panorama'];
	const graphicsLevels: GraphicsLevels[] = ['Auto', 'Flat', 'Space'];
	
	const handleColorThemeChange = () => {
		const root = document.getElementById('ColorTheme') as HTMLElement;
		if (!root) return;
		root.className = graphicsLowColorThemes[(graphicsLowColorThemes.indexOf(graphicsLowColorTheme) + 1) % graphicsLowColorThemes.length];
	};

	// Compares the user's graphics settings to a parameter.
	const isGraphics = useCallback((compareGraphics: GraphicsLevels) => {
		let activeGraphics = graphics === 'Auto' ? autoGraphics : graphics;
		if (activeGraphics === 'Assume-Space') activeGraphics = 'Space';
		return activeGraphics === compareGraphics;
	}, [graphics, autoGraphics]);

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
				<button onClick={() => {setAccessibility('Accessibility');}}>
					Accessibility: Visuals
				</button>
				<button onClick={() => {
					const newTravelMode = travelModes[(travelModes.indexOf(travelMode) + 1) % travelModes.length];
					setTravelMode(newTravelMode);
					setCookie('travelMode', newTravelMode);
				}}>
					Travel Mode: {travelMode}
				</button>
				{isGraphics('Flat') && (
					<button onClick={() => {
						const newColorTheme = graphicsLowColorThemes[(graphicsLowColorThemes.indexOf(graphicsLowColorTheme) + 1) % graphicsLowColorThemes.length];
						handleColorThemeChange();
						setGraphicsLowColorTheme(newColorTheme);
						setCookie('graphicsLowColorTheme', newColorTheme);
					}}>
						Color Theme: {graphicsLowColorTheme}
					</button>
				)}
				{isGraphics('Space') && (
					<button onClick={() => {
						const newColorTheme = graphicsHighColorThemes[(graphicsHighColorThemes.indexOf(graphicsHighColorTheme) + 1) % graphicsHighColorThemes.length];
						handleColorThemeChange();
						setGraphicsHighColorTheme(newColorTheme);
						setCookie('graphicsHighColorTheme', newColorTheme);
					}}>
						Color Theme: {graphicsHighColorTheme}
					</button>
				)}
				<button onClick={() => {
					const newGraphics = graphicsLevels[(graphicsLevels.indexOf(graphics) + 1) % graphicsLevels.length];
					setGraphics(newGraphics);
					setCookie('graphics', newGraphics);
				}}>
					Graphics Level: {graphics}
				</button>
			</div>
		</aside>
	);
};

export default Settings;