import React, { useEffect, useContext } from 'react';
import { JWPlayerApi, PlaylistItem } from 'types';
import FandomWirewaxPlugin from 'plugins/fandom-wirewax.plugin';
import { PlayerContext } from 'players/shared/PlayerContext';
import { PlayerConfig, Player } from 'types';
import { jwPlayerPlaybackTracker } from 'utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';
import JWEvents from 'players/shared/JWEvents';
import addBaseTrackingEvents from 'players/shared/addBaseTrackingEvents';
import slugify from 'utils/slugify';

interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
}

declare let window: WindowJWPlayer;

/**
 * gets the android player if user is on an android device browser
 */
const getDefaultPlayerUrl = () => {
	return navigator.userAgent.match(/android/i)
		? 'https://cdn.jwplayer.com/libraries/MFqndUHM.js'
		: 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
};

interface JwPlayerWrapperProps {
	config?: PlayerConfig;
	playerUrl?: string;
	onReady?: (playerInstance: Player) => void;
	onComplete?: () => void;
}

const JwPlayerWrapper: React.FC<JwPlayerWrapperProps> = ({ config, playerUrl, onReady, onComplete }) => {
	const { setPlayer, setConfig } = useContext(PlayerContext);
	const defaultConfig = {
		plugins: { fandomWirewax: {} },
	};

	useEffect(() => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_INIT_RENDER);
		initPlayer('featured-video__player', playerUrl);
	}, []);

	const initPlayer = (elementId: string, playerUrl?: string) => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });

		const onload = () => {
			jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY);
			const registerPlugin = window.jwplayer().registerPlugin;
			registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);

			setConfig(config);

			const playerInstance = window.jwplayer(elementId).setup({
				...defaultConfig,
				...config,
			});

			playerInstance.on(JWEvents.READY, (event) => {
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_READY);
				// only add the events after the player is ready
				jwPlayerPlaybackTracker({ event_name: 'video_player_ready' });
				addBaseTrackingEvents(playerInstance);
				new FandomWirewaxPlugin(elementId, {
					player: window.jwplayer(elementId),
					ready: event,
				});

				if (onReady) {
					onReady(playerInstance);
				}
			});

			playerInstance.on(JWEvents.COMPLETE, () => {
				if (typeof onComplete === 'function') {
					onComplete();
				}
			});

			playerInstance.setPlaylistItemCallback((item: PlaylistItem) => {
				item.link = `https://www.fandom.com/newvideopage/${item.mediaid}/${slugify(item.title)}`;
				return;
			});

			setPlayer(playerInstance);
		};

		if (typeof window.jwplayer === 'function') {
			onload();
		} else {
			const script = document.createElement('script');
			script.async = true;
			script.src = playerUrl || getDefaultPlayerUrl();
			script.onload = onload;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};

	return (
		<div>
			<div id="featured-video__player" />
		</div>
	);
};

export default React.memo(JwPlayerWrapper);
