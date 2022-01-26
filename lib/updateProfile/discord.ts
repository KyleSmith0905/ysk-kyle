// OUT OF IMPLEMENTATION
// Self bots result in account termination.
const ChangeProfile = async (picture: Buffer) => {
	if (!process.env.DISCORD_TOKEN) return;

	fetch('https://discord.com/api/v9/users/@me', {
		method: 'PATCH',
		headers: {
			'Authorization': process.env.DISCORD_TOKEN ?? '',
			'Content-Type': 'application/json',
			'User-Agent': 'DiscordBot (https://yskkyle.com/, 1.0)',
		},
		body: JSON.stringify({
			avatar: 'data:image/png;base64,' + picture.toString('base64'),
		}),
	});
};

export default ChangeProfile;