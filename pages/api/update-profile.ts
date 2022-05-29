import { NextApiRequest, NextApiResponse } from 'next';
import createIdenticon, { AdditionalOptions } from 'cyber-circle-identicon';
import crypto from 'crypto';
import setDiscord from '../../lib/updateProfile/discord';
import setTwitter from '../../lib/updateProfile/twitter';
import setGravatar from '../../lib/updateProfile/gravatar';
import setReddit from '../../lib/updateProfile/reddit';

const UpdateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		res.writeHead(405, {
			Allow: 'Post',
		});
		res.end('Method Not Allowed, try with POST.');
		return;
	}

	
	const { authorization } = req.headers;
	
	if (authorization !== 'Bearer '+ process.env.API_SECRET_KEY) {
		res.writeHead(401);
		res.end('Unauthorized');
		return;
	}

	const identiconKey = crypto.randomBytes(8);
	const identiconSettings: AdditionalOptions = {
		size: 256,
		clipped: false,
		overrideData: {
			foregroundColors: {
				start: { r: 0, g: 192, b: 255 },
				end: { r: 0, g: 63, b: 255 },
			},
			backgroundColors: {
				start: { r: 255, g: 192, b: 0 },
				end: { r: 255, g: 63, b: 0 },
			}
		},
		compression: 6,
	};

	const identicon = createIdenticon(identiconKey.toString('utf8'), identiconSettings);
	
	try {
		const discordPromise = setDiscord(identicon);
		const twitterPromise = setTwitter(identicon);
		const gravatarPromise = setGravatar(identicon);
		const redditPromise = setReddit(identicon);
		
		await Promise.all([
			discordPromise,
			twitterPromise,
			gravatarPromise,
			redditPromise
		]);
	}
	catch (err) {
		res.writeHead(500);
		res.end('Internal Server Error - Error Message: ' + err);
	}

	res.writeHead(200);
	res.end('Performed cron job successfully');
	return;
};

export default UpdateProfile;