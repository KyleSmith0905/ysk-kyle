interface ColorMode {
	name: string
	primary: string;
	secondary: string;
	text: string;
}

const COLOR_MODES: ColorMode[] = [
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

export { COLOR_MODES };