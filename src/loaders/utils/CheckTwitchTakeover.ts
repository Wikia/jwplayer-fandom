import { useEffect, useState } from 'react';

function getTwitchTakeoverUrl() {
	return 'https://services.fandom.com/article-video/twitch/v1/twitch-takeover-mappings';
}

interface MWConfig {
	get: (key: string) => any;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW {
	mw: MW;
}

declare let window: WindowWithMW;

export default function checkTwitchTakeover() {
	const [twitchTakeover, setTwitchTakeover] = useState(undefined);
	const config = window.mw.config;

	useEffect(() => {
		async function getTwitchTakeoverData() {
			const response = await fetch(getTwitchTakeoverUrl());
			const data = await response.json();
			const currentWikiData = data.find((wiki) => wiki.product === config.get('wgCityId'));

			setTwitchTakeover(!!currentWikiData?.twitch_take_over);
		}

		getTwitchTakeoverData();
	}, []);

	return twitchTakeover;
}
