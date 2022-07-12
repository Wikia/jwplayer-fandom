import React, { useEffect, useContext } from 'react';
import { TwitchApi } from 'twitch/types';
import { PlayerContext } from 'twitch/players/shared/PlayerContext';
// import { JwPlayerWrapperProps } from 'jwplayer/types';
// import { jwPlayerPlaybackTracker } from 'jwplayer/utils/videoTracking';
// import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
// import JWEvents from 'jwplayer/players/shared/JWEvents';
// import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
// import slugify from 'jwplayer/utils/slugify';

interface WindowTwitch extends Window {
	Twitch?: TwitchApi;
}

declare let window: WindowTwitch;

const TwitchPlayerWrapper: React.FC = () => {
	const { setPlayer } = useContext(PlayerContext);
	const defaultOptions = {
		width: 600,
		height: 400,
		channel: 'fandom',
	};

	useEffect(() => {
		initPlayer('twitch-video__player');
	}, []);

	const initPlayer = (elementId: string) => {
		const onload = () => {
			const player = new window.Twitch.Player(elementId, defaultOptions);
			setPlayer(player);
		};

		if (typeof window.Twitch === 'function') {
			onload();
		} else {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://player.twitch.tv/js/embed/v1.js';
			script.onload = onload;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};

	return <div id="twitch-video__player" />;
};

export default React.memo(TwitchPlayerWrapper);
