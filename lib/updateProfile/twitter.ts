import crypto from 'crypto';

const sortText = (a: {key: string}, b: {key: string}) => {
	if (a.key < b.key) return -1;
	if (a.key > b.key) return 1;
	return 0;
};

const ChangeProfile = async (picture: Buffer) => {	
	if (!process.env.TWITTER_API_KEY
		|| !process.env.TWITTER_API_KEY_SECRET
		|| !process.env.TWITTER_ACCESS_TOKEN
		|| !process.env.TWITTER_ACCESS_TOKEN_SECRET
	) return;

	const url = 'https://api.twitter.com/1.1/account/update_profile_image.json';

	const oauthNonce = crypto.randomBytes(32).toString('base64');
	const auth = {
		oauth_consumer_key: process.env.TWITTER_API_KEY,
		oauth_token: process.env.TWITTER_ACCESS_TOKEN,
		oauth_nonce: oauthNonce,
		oauth_signature_method:'HMAC-SHA1',
		oauth_timestamp: Math.floor(Date.now() / 1000).toString(), 
		oauth_version: '1.0',
		image: picture.toString('base64'),
	};

	const authArray = Object.keys(auth).map((key, i) => {
		return {key: key, value: Object.values(auth)[i]};
	});
	for (let i = 0; i < authArray.length; i++) {
		authArray[i].value = encodeURIComponent(authArray[i].value);
	}
	authArray.sort(sortText);
	const authString = authArray.map((item) => {
		return item.key + '=' + item.value;
	}).join('&');

	const signatureBase = 'POST&' + encodeURIComponent(url) + '&' + encodeURIComponent(authString);
	const signingKey = encodeURIComponent(process.env.TWITTER_API_KEY_SECRET) + '&' + encodeURIComponent(process.env.TWITTER_ACCESS_TOKEN_SECRET);
	const signature = crypto.createHmac('sha1', signingKey).update(signatureBase).digest('base64');

	authArray.push({key: 'oauth_signature', value: encodeURIComponent(signature)});
	authArray.sort(sortText);
	authArray.splice(0, 1);

	const authHeader = 'OAuth ' + authArray.map((item) => {
		return item.key + '="' + item.value + '"';
	}).join(', ');

	fetch(url, {
		method: 'POST',
		headers: {
			'Authorization': authHeader,
			'User-Agent': 'YSKKyle/1.0',
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'image=' + encodeURIComponent(picture.toString('base64')),
	});
};

export default ChangeProfile;