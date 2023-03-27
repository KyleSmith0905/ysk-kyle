interface ColorMode {
	name: string
	primary: string;
	secondary: string;
	text: string;
	space?: {
		ambience: string;
		clouds: 'rainbow' | string;
		stars: string;
	}
	particles?: {
		something: ''
	}
}

type GraphicsFlatColorModes = 'Light' | 'Dark' | 'Iconic';

type GraphicsSpaceColorModes = 'Dark' | 'Rainbow';

type GraphicsParticlesColorModes = 'Iconic' | 'Rainbow';

const GRAPHICS_FLAT_COLOR_MODES: ColorMode[] = [
	{
		name: 'Light',
		primary: 'hsl(0, 0%, 100%)',
		secondary: 'hsl(0, 0%, 95%)',
		text: 'hsl(0, 0%, 0%)',
	},
	{
		name: 'Dark',
		primary: 'hsl(0, 0%, 6%)',
		secondary: 'hsl(0, 0%, 0%)',
		text: 'hsl(0, 0%, 100%)',
	},
	{
		name: 'Iconic',
		primary: 'hsl(220, 100%, 50%)',
		secondary: 'hsl(40, 100%, 50%)',
		text: 'hsl(0, 0%, 100%)',
	},
];

const GRAPHICS_SPACE_COLOR_MODES: ColorMode[] = [
	{
		name: 'Dark',
		primary: 'hsl(0, 0%, 6%)',
		secondary: 'hsl(0, 0%, 0%)',
		text: 'hsl(0, 0%, 100%)',
		space: {
			ambience: 'hsl(220, 100%, 50%)',
			clouds: 'hsl(40, 100%, 50%)',
			stars: 'hsl(0, 0%, 100%)',
		}
	},
	{
		name: 'Rainbow',
		primary: 'hsl(0, 0%, 6%)',
		secondary: 'hsl(0, 0%, 0%)',
		text: 'hsl(0, 0%, 100%)',
		space: {
			ambience: 'rainbow',
			clouds: 'rainbow',
			stars: 'hsl(0, 0%, 100%)',
		}
	},
];

const GRAPHICS_PARTICLES_COLOR_MODES: ColorMode[] = [
	{
		name: 'Dark',
		primary: 'hsl(0, 0%, 6%)',
		secondary: 'hsl(0, 0%, 0%)',
		text: 'hsl(0, 0%, 100%)',
		particles: {
			something: '',
		}
	},
];

export { GRAPHICS_SPACE_COLOR_MODES, GRAPHICS_FLAT_COLOR_MODES, GRAPHICS_PARTICLES_COLOR_MODES };
export type { GraphicsFlatColorModes, GraphicsSpaceColorModes, GraphicsParticlesColorModes, ColorMode };
