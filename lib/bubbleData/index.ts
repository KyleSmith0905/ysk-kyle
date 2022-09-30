import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'welcome',
		name: 'You Should Know Kyle!',
		summary: 'Click on a bubble to show more about that project.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 93,
		size: 'large',
	},
	{
		id: 'contact',
		name: 'Contact',
		summary: 'My phone number, email, social media, and other communication channels.',
		connection: 'welcome',
		link: 'contact',
		radius: 88,
	},
	{
		id: 'projects',
		name: 'Personal Projects',
		summary: 'Projects built to train myself on new technology.',
		connection: 'welcome',
		radius: 89,
		size: 'medium',
	},
	{
		id: 'rtlChallenges',
		name: 'RTL Challenges',
		summary: 'A website for posting challenges on video games.',
		link: 'rtl-challenges',
		image: 'rtl-challenges',
		connection: 'projects',
		radius: 85,
		size: 'small',
	},
	{
		id: 'sortingAlgorithm',
		name: 'Sorting Visualizer',
		summary: 'A website for watching sorting algorithms.',
		link: 'sorting-algorithm-visualizer',
		image: 'sorting-algorithm-visualizer',
		connection: 'projects',
		radius: 83,
		size: 'small',
	},
	{
		id: 'moreProjects',
		name: 'View All Projects',
		summary: '',
		link: 'personal-projects',
		connection: 'projects',
		radius: 68,
		size: 'small',
	},
	{
		id: 'professional',
		name: 'Professional Experience',
		summary: 'Projects worked on as part of formal work experience.',
		connection: 'welcome',
		radius: 89,
		size: 'small',
	},
	{
		id: 'estack',
		name: 'Estack Industries',
		summary: 'Intern frontend developer to build a real estate app.',
		connection: 'professional',
		link: 'estack-industries',
		image: 'estack-industries',
		radius: 89,
		size: 'small',
	},
	{
		id: 'sparrow',
		name: 'Sparrow Design',
		summary: 'Full-time full stack developer at an mobile/web development agency.',
		connection: 'professional',
		link: 'sparrow-design',
		image: 'sparrow-design',
		radius: 97,
		size: 'small',
	},
];

export default PadBubblePositions(bubbleData);