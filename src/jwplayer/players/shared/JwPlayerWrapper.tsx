import React, { useEffect, useContext } from 'react';
import { JWPlayerApi, PlaylistItem } from 'jwplayer/types';
import FandomWirewaxPlugin from 'jwplayer/plugins/fandom-wirewax.plugin';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import { jwPlayerPlaybackTracker, triggerVideoMetric } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import slugify from 'jwplayer/utils/slugify';
import getSponsoredVideos from 'utils/getSponsoredVideos';
interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
	sponsoredVideos?: string[];
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

const JwPlayerWrapper: React.FC<JwPlayerWrapperProps> = ({
	config,
	playerUrl,
	onReady,
	onComplete,
  className,
	stopAutoAdvanceOnExitViewport,
}) => {
	const { setPlayer, setConfig } = useContext(PlayerContext);
	const videoIndexRef = React.useRef(0);
	const defaultConfig = {
		plugins: { fandomWirewax: {} },
	};

	useEffect(() => {
		const retrieveSponsoredVideo = async () => {
			const sponsoredVideoResponse = await getSponsoredVideos();
			if (sponsoredVideoResponse && typeof window !== undefined) {
				window.sponsoredVideos = sponsoredVideoResponse;
			} else {
				console.debug('Could not set sponsored videos. Either window the fetched sponsoredVideo list were undefined.');
			}
		};
		retrieveSponsoredVideo().catch((e) => {
			console.error('There was an issue with retrieving Sponsored Videos. ', e);
		});
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_INIT_RENDER);
		initPlayer('featured-video__player', playerUrl);
	}, []);

	const initPlayer = (elementId: string, playerUrl?: string) => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });

		const onload = () => {
			jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY);
			triggerVideoMetric('loaded');
			const registerPlugin = window.jwplayer().registerPlugin;
			registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);

			setConfig(config);

			const playerInstance = window.jwplayer(elementId).setup({
				...defaultConfig,
				...config,
			});

			playerInstance.on(JWEvents.READY, (event) => {
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_READY);
				triggerVideoMetric('ready');
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

				// Incrementing videos watched count
				videoIndexRef.current += 1;

				// if stopAutoAdvanceOnExitViewport is false then we don't want to stop the auto advance, keep normal behavior
				if (!stopAutoAdvanceOnExitViewport) {
					return;
				}

				// if the video is on its 2nd+ play, pause the video if its not on the viewport
				if (videoIndexRef.current >= 1 && (playerInstance.getViewable() === 0 || document.hasFocus() === false)) {
					// send tracking event
					jwPlayerPlaybackTracker({ event_name: 'video_player_pause_not_viewable' });

					// close the related UI to stop auto advancement, and then re-open it for users to click on
					setTimeout(() => {
						window.jwplayer(elementId).getPlugin('related').close();
						window.jwplayer(elementId).getPlugin('related').open();
					}, 1000);
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
		<div className={className}>
			<div id="featured-video__player" />
		</div>
	);
};

export default React.memo(JwPlayerWrapper);
