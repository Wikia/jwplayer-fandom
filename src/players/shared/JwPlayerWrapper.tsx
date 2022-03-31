import React, { useEffect, useContext } from 'react';
import { JWPlayerApi } from 'types';
import FandomWirewaxPlugin from 'plugins/fandom-wirewax.plugin';
import { PlayerContext } from 'players/shared/PlayerContext';
import { Playlist } from 'types';

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
}

const JwPlayerWrapper: React.FC<JwPlayerWrapperProps> = ({ playlist }) => {
	const { setPlayer } = useContext(PlayerContext);

	useEffect(() => {
		// TODO: check if jwplayer is already loaded
		initPlayer('featured-video__player', getDefaultPlayerUrl());
	}, []);

	function initPlayer(elementId: string, playerURL?: string) {
		const script = document.createElement('script');

		script.async = true;
		script.src = playerURL || getDefaultPlayerUrl();
		script.onload = () => {
			const registerPlugin = window.jwplayer().registerPlugin;
			registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);

			const playerInstance = window
				.jwplayer(elementId)
				.setup({
					playlist: playlist,
					plugins: { fandomWirewax: {} },
				})
				.on('ready', (event) => {
					new FandomWirewaxPlugin(elementId, {
						player: window.jwplayer(elementId),
						ready: event,
					});
				});
			setPlayer(playerInstance);
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
