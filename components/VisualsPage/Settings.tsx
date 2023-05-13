import { Dispatch, FunctionComponent, SetStateAction, useCallback, useState } from 'react';
import { GraphicsFlatColorModes, GRAPHICS_FLAT_COLOR_MODES, GraphicsSpaceColorModes, GRAPHICS_SPACE_COLOR_MODES, GraphicsParticlesColorModes, GRAPHICS_PARTICLES_COLOR_MODES } from '@lib/colorMode';
import { setCookie } from '@lib/cookies';
import { GraphicsLevels } from '@lib/graphicsLevel';
import { useGraphics } from '@lib/hooks';

const Settings: FunctionComponent<{
	setTravelMode: Dispatch<SetStateAction<string>>,
	travelMode: string,
	setGraphicsFlatColorTheme: Dispatch<SetStateAction<GraphicsFlatColorModes>>,
	graphicsFlatColorTheme: GraphicsFlatColorModes,
	setGraphicsSpaceColorTheme: Dispatch<SetStateAction<GraphicsSpaceColorModes>>,
	graphicsSpaceColorTheme: GraphicsSpaceColorModes,
	setGraphicsParticlesColorTheme: Dispatch<SetStateAction<GraphicsParticlesColorModes>>,
	graphicsParticlesColorTheme: GraphicsParticlesColorModes,
  setAccessibility: Dispatch<SetStateAction<'Accessibility' | 'Visuals' | 'Undetermined'>>;
}> = ({
	setTravelMode, travelMode,
	setGraphicsFlatColorTheme, graphicsFlatColorTheme,
	setGraphicsSpaceColorTheme, graphicsSpaceColorTheme,
	setGraphicsParticlesColorTheme, graphicsParticlesColorTheme,
	setAccessibility,
}) => {
	const { autoGraphics, graphics, setGraphics} = useGraphics();
	const [settingsOpen, setSettingsOpen] = useState(true);

	const toggleSettings = () => setSettingsOpen(!settingsOpen);

	const graphicsFlatColorThemes = GRAPHICS_FLAT_COLOR_MODES.map((e) => e.name) as GraphicsFlatColorModes[];
	const graphicsSpaceColorThemes = GRAPHICS_SPACE_COLOR_MODES.map((e) => e.name) as GraphicsSpaceColorModes[];
	const graphicsParticlesColorThemes = GRAPHICS_PARTICLES_COLOR_MODES.map((e) => e.name) as GraphicsParticlesColorModes[];
	const travelModes = ['Browser', 'Edge Scrolling', 'Control Stick', 'Panorama', 'Prototype'];
	const graphicsLevels: GraphicsLevels[] = ['Auto', 'Flat', 'Space', 'Particles'];
	
	const handleColorThemeChange = () => {
		const root = document.getElementById('ColorTheme') as HTMLElement;
		if (!root) return;
		root.className = graphicsFlatColorThemes[(graphicsFlatColorThemes.indexOf(graphicsFlatColorTheme) + 1) % graphicsFlatColorThemes.length];
	};

	// Compares the user's graphics settings to a parameter.
	const isGraphics = useCallback((compareGraphics: GraphicsLevels) => {
		let activeGraphics = graphics === 'Auto' ? autoGraphics : graphics;
		if (activeGraphics === 'Assume-Space') activeGraphics = 'Flat';
		return activeGraphics === compareGraphics;
	}, [graphics, autoGraphics]);

	return (
		<aside id='Settings'>
			<button
				onClick={toggleSettings}
				className='dimensionalBox'
				id='DisplaySettings'
				aria-label = 'Display Settings'
			>
				<svg viewBox='0 0 50 50' width='35' height='35'>
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
			<div id='SettingsList' className={settingsOpen ? 'dimensionalBox': 'Hidden dimensionalBox'}>
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
						const newColorTheme = graphicsFlatColorThemes[(graphicsFlatColorThemes.indexOf(graphicsFlatColorTheme) + 1) % graphicsFlatColorThemes.length];
						handleColorThemeChange();
						setGraphicsFlatColorTheme(newColorTheme);
						setCookie('graphicsFlatColorTheme', newColorTheme);
					}}>
						Color Theme: {graphicsFlatColorTheme}
					</button>
				)}
				{isGraphics('Space') && (
					<button onClick={() => {
						const newColorTheme = graphicsSpaceColorThemes[(graphicsSpaceColorThemes.indexOf(graphicsSpaceColorTheme) + 1) % graphicsSpaceColorThemes.length];
						handleColorThemeChange();
						setGraphicsSpaceColorTheme(newColorTheme);
						setCookie('graphicsSpaceColorTheme', newColorTheme);
					}}>
						Color Theme: {graphicsSpaceColorTheme}
					</button>
				)}
				{isGraphics('Particles') && (
					<button onClick={() => {
						const newColorTheme = graphicsParticlesColorThemes[(graphicsParticlesColorThemes.indexOf(graphicsParticlesColorTheme) + 1) % graphicsParticlesColorThemes.length];
						handleColorThemeChange();
						setGraphicsParticlesColorTheme(newColorTheme);
						setCookie('graphicsParticlesColorTheme', newColorTheme);
					}}>
						Color Theme: {graphicsParticlesColorTheme}
					</button>
				)}
				<button onClick={() => {
					// Remove the "Auto" option as that is usually not a defined option.
					const autoLessGraphicsLevels = graphicsLevels.slice(1);
					const newGraphics = autoLessGraphicsLevels[(autoLessGraphicsLevels.indexOf(graphics) + 1) % autoLessGraphicsLevels.length];
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