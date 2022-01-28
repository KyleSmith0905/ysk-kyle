import { IBubbleWithoutPosition, PadBubblePositions } from './_shared';

const bubbleData: IBubbleWithoutPosition[] = [
	{
		id: 'about',
		name: 'About YSK Kyle',
		summary: 'YSK Kyle is my portfolio website to display my experience with website design.',
		image: 'ysk-kyle',
		connection: '.',
		position: [50, 50],
		pivotPosition: [50, 50],
		deployPosition: [50, 50],
		radius: 103,
	},
	{
		id: 'image',
		name: 'YSK Kyle Webpage',
		image: 'ysk-kyle-page',
		link: 'https://yskkyle.com/',
		connection: 'about',
		radius: 100,
	},
	{
		id: 'developmentInfo',
		name: 'Development Info',
		summary: 'The code behind YSK Kyle is visible on GitHub. The repository does not allow contributions.',
		link: 'https://github.com/KyleSmith0905',
		connection: 'about',
		radius: 112,
	},
	{
		id: 'framework',
		name: 'Framework',
		summary: 'YSK Kyle was built with React and Next.',
		connection: 'developmentInfo',
		radius: 87,
	},
	{
		id: 'particalEngine',
		name: 'The Partical Engine',
		summary: 'The bubbles were simulated using a quick partical engine I wrote.',
		connection: 'developmentInfo',
		radius: 103,
	},
	{
		id: 'updateProfile',
		name: 'Update Profile',
		summary: 'A script running from YSKKyle updates my profile pictures on all my major social media using REST API.',
		connection: 'about',
		radius: 97,
	},
	{
		id: 'updateTwitter',
		name: 'Twitter',
		summary: 'Twitter requires that API requests contain a nonce, and a hash using an API secret.',
		connection: 'updateProfile',
		radius: 90,
	},
	{
		id: 'updateGravatar',
		name: 'GitHub and StackOverflow',
		summary: 'GitHub and StackOverflow use Gravatar. I send XML-RPC messages through Gravatar to get, upload, delete, and pin images.',
		connection: 'updateProfile',
		radius: 115,
	},
	{
		id: 'updateReddit',
		name: 'Reddit',
		summary: 'Although Reddit API returns service temporary unavailable, it is fully capable of uploading profile pictures.',
		connection: 'updateProfile',
		radius: 97,
	},
	{
		id: 'updateDiscord',
		name: 'Discord',
		summary: 'Discord was simple: get authorization code from request, then throw it back to the server to update profile picture.',
		connection: 'updateProfile',
		radius: 98,
	},
];

export default PadBubblePositions(bubbleData);