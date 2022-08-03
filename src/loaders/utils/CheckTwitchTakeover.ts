function getTwitchTakeoverUrl() {
	return 'https://services.fandom.com/article-video/twitch/v1/twitch-takeover-mappings';
}

export async function checkTwitchTakeover() {
	const response = await fetch(getTwitchTakeoverUrl());
	const data = response.json();

	return data[0]['twitch_take_over'];
}
