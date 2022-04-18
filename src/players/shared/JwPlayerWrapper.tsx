import React, { useEffect, useContext } from 'react';
import { JWPlayerApi } from 'types';
import FandomWirewaxPlugin from 'plugins/fandom-wirewax.plugin';
import { PlayerContext } from 'players/shared/PlayerContext';
import { Playlist } from 'types';
import { jwPlayerVideoTracker } from 'utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';
import JWEvents from 'players/shared/JWEvents';
import addBaseTrackingEvents from 'players/shared/addBaseTrackingEvents';

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
	playlist: Playlist;
	playerUrl?: string;
}

const JwPlayerWrapper: React.FC<JwPlayerWrapperProps> = ({ playlist, playerUrl }) => {
	recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_RENDER); // TODO Find an earlier spot?
	const { setPlayer } = useContext(PlayerContext);

	useEffect(() => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_INIT_RENDER);
		// TODO: check if jwplayer is already loaded
		initPlayer('featured-video__player', playerUrl);
	}, []);

	function initPlayer(elementId: string, playerUrl?: string) {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		const script = document.createElement('script');
		jwPlayerVideoTracker({ label: 'video-id-here', action: 'loading-scripts' });

		script.async = true;
		script.src = playerUrl || getDefaultPlayerUrl();
		script.onload = () => {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY);
			const registerPlugin = window.jwplayer().registerPlugin;
			registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);
			jwPlayerVideoTracker({ label: 'video-id-here', action: 'wirewax-registered' });

			const playerInstance = window.jwplayer(elementId).setup({
				playlist: playlist,
				plugins: { fandomWirewax: {} },
			});

			playerInstance.on(JWEvents.READY, (event) => {
				// only add the events after the player is ready
				addBaseTrackingEvents(playerInstance);
				jwPlayerVideoTracker.loaded({ label: 'video-id-here' }); // TODO Send playing video id?
				new FandomWirewaxPlugin(elementId, {
					player: window.jwplayer(elementId),
					ready: event,
				});
			});

			setPlayer(playerInstance);

			console.log(playerInstance);
		};

		document.getElementsByTagName('head')[0].appendChild(script);
	}

	return (
		<div>
			<div id="featured-video__player" />
		</div>
	);
};

export default JwPlayerWrapper;
