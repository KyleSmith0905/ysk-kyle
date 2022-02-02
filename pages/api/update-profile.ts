import { NextApiRequest, NextApiResponse } from 'next';
import createIdenticon from 'cyber-circle-identicon';
import crypto from 'crypto';
import setDiscord from '../../lib/updateProfile/discord';
import setTwitter from '../../lib/updateProfile/twitter';
import setGravatar from '../../lib/updateProfile/gravatar';
import setYoutube from '../../lib/updateProfile/youtube';
// import setReddit from '../../lib/updateProfile/reddit';

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
	const identiconSettings = {
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
		}
	};

	const identicon = createIdenticon(identiconKey.toString('utf8'), identiconSettings);
	const clippedIdenticon = createIdenticon(identiconKey.toString('utf8'), {...identiconSettings, clipped: true});
	
	setDiscord(identicon).catch((err) => console.log(err));
	setYoutube(clippedIdenticon).catch((err) => console.log(err));
	setTwitter(identicon).catch((err) => console.log(err));
	setGravatar(identicon).catch((err) => console.log(err));
	// const redditPromise = setReddit(identicon).catch((err) => console.log(err));
	
	res.writeHead(200);
	res.end('Performed cron job successfully');
	return;
};

export default UpdateProfile;