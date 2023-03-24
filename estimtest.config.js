/** @type {import('estimtest-utils/config').EstimtestConfig} */
const config = {
	experiments: [
    {
      name: 'Small Font Size',
      description: 'Some users might change their browser to have small browser font size for a variety of reason: Their screen is small which requires smaller fonts to fit everything, or the user might just prefer it more.',
      fontSize: 12,
    },
		{
			name: 'Large Font Size',
			description:
				'Many users have difficulty reading text at the default size. Users often solve this issue by increasing the browser\'s font size. To accommodate these users, it is suggested to use `rem` instead of `px` for `font-size`.',
			fontSize: 24,
		},
		{
			name: 'Achromatopsia Color Blind',
			description: 'Achromatopsia is the most severe version of colorblindness. People with Achromatopsia do not see any color, instead they see shades of gray.',
			colorBlind: 'achromatopsia',
		},
		{
			name: 'Keyboard Navigation',
			description: `
Many users may use keyboard navigation for a variety of reasons such as: Motor impairment, saving time, and more.\\
Here is a list of useful shortcuts for Chromium.
---
**Browse clickable items moving forward**\\
\`Tab\`\\
**Browse clickable items moving backward**\\
\`Shift + Tab\`\\
**Scroll down a webpage, a screen at a time**\\
\`Space\`\\
**Scroll up a webpage, a screen at a time**\\
\`Shift + Space\`
			`,
			keyboardOnly: true,
		},
	],
};

module.exports = config;