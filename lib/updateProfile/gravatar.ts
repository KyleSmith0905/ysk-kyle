import { createHash } from 'crypto';

const textInside = (text: string, start: string, end: string, index?: number) => {
	let startIndex = text.indexOf(start);
	let endIndex = text.indexOf(end);
	if (index) {
		for (let i = 0; i < index; i++) {
			startIndex = text.indexOf(start, startIndex + 1);
			endIndex = text.indexOf(end, endIndex + 1);
		}
	}
	return text.substring(startIndex + start.length, endIndex);
};

const xmlrpcGenerator = (methodName: string, params: {[key: string]: string | number | string[]}) => {
	const paramsString = Object.keys(params).map(param => {
		let dataType = 'string';
		if (typeof params[param] === 'number') dataType = 'int';
		else if (typeof params[param] === 'boolean') dataType = 'boolean';
		else if (Array.isArray(params[param])) {
			dataType = 'array';
			const arrayData = (params[param] as string[]).map(item => (
				'<value>'
				+		'<string>'
				+			item
				+		'</string>'
				+	'</value>'
			)).join('');

			params[param] = (
				'<data>'
				+ arrayData
				+ '</data>'
			);
		}
		return (
			'<member>'
			+		'<name>'
			+			param
			+ 	'</name>'
			+		'<value>'
			+			'<' + dataType + '>'
			+				params[param]
			+			'</' + dataType + '>'
			+		'</value>'
			+	'</member>'
		);
	}).join('');

	return (
		'<?xml version="1.0"?>'
		+	'<methodCall>'
		+		'<methodName>'
		+			methodName
		+		'</methodName>'
		+		'<params>'
		+			'<param>'
		+				'<value>'
		+					'<struct>'
		+						paramsString
		+					'</struct>'
		+				'</value>'
		+			'</param>'
		+		'</params>'
		+	'</methodCall>'
	);
};

const ChangeProfile = async (picture: Buffer) => {
	if (!process.env.GRAVATAR_EMAILS
		|| !process.env.GRAVATAR_MAIN_EMAIL
		|| !process.env.GRAVATAR_PASSWORD
	) return;
	
	const formattedEmail = process.env.GRAVATAR_MAIN_EMAIL.toLowerCase().trim();
	const emailHash = createHash('md5').update(formattedEmail).digest('hex');

	const resUpload = await fetch('https://secure.gravatar.com/xmlrpc?user=' + encodeURI(emailHash), {
		method: 'POST',
		body: xmlrpcGenerator(
			'grav.saveData',
			{data: picture.toString('base64'), rating: 0, password: process.env.GRAVATAR_PASSWORD}
		),
	});

	const newImageId = textInside(await resUpload.text(), '<string>', '</string>');

	fetch('https://secure.gravatar.com/xmlrpc?user=' + encodeURI(emailHash), {
		method: 'POST',
		body: xmlrpcGenerator(
			'grav.useUserimage',
			{userimage: newImageId, addresses: process.env.GRAVATAR_EMAILS.split(','), password: process.env.GRAVATAR_PASSWORD}
		),
	});

	const resGetImages = await fetch('https://secure.gravatar.com/xmlrpc?user=' + encodeURI(emailHash), {
		method: 'POST',
		body: xmlrpcGenerator(
			'grav.userimages',
			{password: process.env.GRAVATAR_PASSWORD}
		),
	});

	const resGetImagesText = await resGetImages.text();

	const imageCount = resGetImagesText.split('<name>').length - 1;
	for (let i = 0; i < imageCount; i++) {
		const address = textInside(resGetImagesText, '<name>', '</name>', i);
		if (address === newImageId) continue;

		fetch('https://secure.gravatar.com/xmlrpc?user=' + encodeURI(emailHash), {
			method: 'POST',
			body: xmlrpcGenerator(
				'grav.deleteUserimage',
				{userimage: address, password: process.env.GRAVATAR_PASSWORD}
			),
		});
	}
};

export default ChangeProfile;