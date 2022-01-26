import { objectToQueryString } from '../utils';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

const generateBanner = async (cyberCircle: Buffer): Promise<Buffer> => {
	registerFont(path.resolve('./public/fonts/Roboto-Bold.ttf'), {family: 'Roboto', weight: 'bold'});
	const bannerImg = await loadImage(path.resolve('./public/assets/youtube-banner.png'));
	const cyberCircleImg = await loadImage(cyberCircle);

	const canvas = createCanvas(2048, 1152);
	const ctx = canvas.getContext('2d');
	ctx.drawImage(bannerImg, 0, 0, 2048, 1152);
	ctx.drawImage(cyberCircleImg, 570, 448, 256, 256);
	ctx.font = 'bold 128px Roboto';
	ctx.fillStyle = '#ffffff';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'middle';
	ctx.fillText(process.env.GOOGLE_USERNAME ?? '', 850, 576);
	return canvas.toBuffer();
};

const ChangeProfile = async (picture: Buffer) => {
	if (
		process.env.GOOGLE_CLIENT_ID === undefined
		|| process.env.GOOGLE_CLIENT_SECRET === undefined
		|| process.env.GOOGLE_ACCOUNT_CODE === undefined
		|| process.env.GOOGLE_USERNAME === undefined
		|| process.env.GOOGLE_REFRESH_TOKEN === undefined
	) return;

	// /* To Authenticate an account to a Google app please uncomment this code */
	// const authQuery: {[key: string]: string} = {
	// 	client_id: process.env.GOOGLE_CLIENT_ID,
	// 	redirect_uri: 'https://yskkyle.com/',
	// 	response_type: 'code',
	// 	scope: 'https://www.googleapis.com/auth/youtube',
	// 	access_type: 'offline',
	// 	include_granted_scopes: 'true',
	// 	prompt: 'consent',
	// };
	// const authQueryString = objectToQueryString(authQuery);
	// console.log('VISIT THIS URL: https://accounts.google.com/o/oauth2/v2/auth?' + authQueryString);
	// return;
	
	// /* Than paste the code in the url into the GOOGLE_ACCOUNT_CODE variable and run it */
	// const oauthTokenBody = {
	// 	client_id: process.env.GOOGLE_CLIENT_ID,
	// 	client_secret: process.env.GOOGLE_CLIENT_SECRET,
	// 	code: process.env.GOOGLE_ACCOUNT_CODE,
	// 	grant_type: 'authorization_code',
	// 	redirect_uri: 'https://yskkyle.com/',
	// };
	// const oauthTokenRes = await fetch('https://oauth2.googleapis.com/token', {
	// 	method: 'POST',
	// 	headers: {
	// 		'Content-Type': 'application/x-www-form-urlencoded',
	// 	},
	// 	body: objectToQueryString(oauthTokenBody),
	// }).then(res => res.json());
	// console.log(oauthTokenRes); // Save refresh_token into process.env.GOOGLE_REFRESH_TOKEN
	// return;


	const refreshTokenBody = {
		client_id: process.env.GOOGLE_CLIENT_ID,
		client_secret: process.env.GOOGLE_CLIENT_SECRET,
		refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
		grant_type: 'refresh_token',
	};
	const refreshTokenRes = await fetch('https://www.googleapis.com/oauth2/v4/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: objectToQueryString(refreshTokenBody),
	}).then(res => res.json());

	const accessToken = refreshTokenRes.access_token;

	const insertBannerRes = await fetch('https://www.googleapis.com/upload/youtube/v3/channelBanners/insert', {
		method: 'POST',
		headers: {
			'Content-Type': 'image/png',
			'Authorization': 'Bearer ' + accessToken,
		},
		body: await generateBanner(picture),
	}).then(res => res.json());

	const updateChannelBody = {
		id: process.env.YOUTUBE_CHANNEL_ID,
		brandingSettings: {
			channel: {
				bannerExternalUrl: insertBannerRes.url,
			},
		},
	};
	fetch('https://www.googleapis.com/youtube/v3/channels', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + process.env.YOUTUBE_ACCESS_TOKEN,
		},
		body: JSON.stringify(updateChannelBody),
	});
};

export default ChangeProfile;