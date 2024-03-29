import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'center',
		name: 'Contact Info',
		summary: 'All of my active social media and contact information.',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 81,
		size: 'large',
	},
	{
		id: 'other',
		name: 'Other Methods',
		summary: 'Other traditional contact channels.',
		connection: 'center',
		radius: 80,
	},
	{
		id: 'phone',
		name: 'Phone Number',
		summary: 'My phone number is (941) 225-5815, I do not answer unanticipated calls. Please text me first.',
		connection: 'other',
		radius: 98,
		size: 'small',
	},
	{
		id: 'email',
		name: 'Email',
		summary: 'My professional email is kylesmith090502@gmail.com, I will read every email not marked as promotion or spam.',
		connection: 'other',
		radius: 110,
		size: 'small',
	},
	{
		id: 'social',
		name: 'Social Media',
		summary: 'The social media accounts I actively use.',
		connection: 'center',
		radius: 75,
	},
	{
		id: 'twitter',
		name: 'Twitter',
		summary: 'My Twitter name is KyleSmith0905, read my hot takes on the software industry!',
		link: 'https://twitter.com/KyleSmith0905',
		connection: 'social',
		radius: 86,
		size: 'small',
	},
	{
		id: 'linkedin',
		name: 'LinkedIn',
		summary: 'My LinkedIn custom url is KyleSmith0905, throw me a message anytime!',
		link: 'https://www.linkedin.com/in/KyleSmith0905/',
		connection: 'social',
		radius: 84,
		size: 'small',
	},
	{
		id: 'gitHub',
		name: 'GitHub',
		summary: 'My github name is KyleSmith0905, check out my repositories.',
		link:  'https://github.com/KyleSmith0905',
		connection: 'social',
		radius: 84,
		size: 'small',
	},
];

export default PadBubblePositions('contact', bubbleData);