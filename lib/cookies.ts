import { GraphicsHighColorModes, GraphicsLowColorModes } from './colorMode';
import { GraphicsLevels } from './graphicsLevel';

interface Cookies {
	graphicsHighColorTheme: GraphicsHighColorModes
	graphicsLowColorTheme: GraphicsLowColorModes;
	travelMode: string;
	graphics: GraphicsLevels;
	accessibility: 'Accessibility' | 'Visuals' | 'Undetermined';
}

const getCookie = (name: string) => {
	const cookies = document.cookie.split(';');
	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i].split('=');
		if (cookie[0].trim() === name) return cookie[1];
	}
	return null;
};

const setCookie = (name: string, value: string, options: {[key: string]: string} = {}) => {
	document.cookie = name + '=' + value + ';' + Object.keys(options).map(key => key + '=' + options[key]).join(';');
};

export { getCookie, setCookie };
export type { Cookies };