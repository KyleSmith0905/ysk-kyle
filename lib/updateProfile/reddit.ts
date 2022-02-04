import { Readable } from 'stream';
import FormData from 'form-data';

const ChangeProfile = async (picture: Buffer) => {
	if (!process.env.REDDIT_APP_SECRET
		|| !process.env.REDDIT_APP_ID
		|| !process.env.REDDIT_USERNAME
		|| !process.env.REDDIT_PASSWORD
	) return;

	const res = await fetch('https://www.reddit.com/api/v1/access_token', {
		method: 'POST',
		headers: {
			'Authorization': 'Basic ' + Buffer.from(process.env.REDDIT_APP_ID + ':' + process.env.REDDIT_APP_SECRET).toString('base64'),
			'Content-Type': 'application/x-www-form-urlencoded',
			'User-Agent': 'script:com.yskkyle.UpdateProfile:1.1 (by /u/' + process.env.REDDIT_USERNAME + ')',
		},
		body: 'grant_type=password&username=' + encodeURI(process.env.REDDIT_USERNAME) + '&password=' + encodeURI(process.env.REDDIT_PASSWORD),
	});

	const token = await res.json();
	
	const fileData: { [key: string]: string | Readable } = {
		upload_type: 'icon',
		img_type: 'png',
	};
	
	const requestBody = new FormData();
	Object.keys(fileData).forEach(key => requestBody.append(key, fileData[key]));
	
	const parsedImage = Readable.from(picture);
	requestBody.append('file', parsedImage, 'avatar.png');
	
	fetch('https://oauth.reddit.com/r/u_' + process.env.REDDIT_USERNAME + '/api/upload_sr_img', {
		method: 'POST',
		headers: {
			'Authorization': 'Bearer ' + token.access_token,
			'User-Agent': 'script:com.yskkyle.UpdateProfile:1.1 (by /u/' + process.env.REDDIT_USERNAME + ')',
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		body: requestBody,
	});
};

export default ChangeProfile;