function getTwitchTakeoverUrl() {
	// TODO: check if dev
	// if (true) {
	// 	return 'https://services.fandom-dev.us/article-video/twitch/v1/twitch-takeover-mappings';
	// }

	return 'https://services.fandom.com/article-video/twitch/v1/twitch-takeover-mappings';
}

export async function checkTwitchTakeover() {
	const response = await fetch(getTwitchTakeoverUrl());
	const data = response.json();

	return data[0]['twitch_take_over'];
}
