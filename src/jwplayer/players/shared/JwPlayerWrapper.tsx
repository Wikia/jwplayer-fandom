import React, { useContext } from 'react';
import { JWPauseEvent, JWPlayerApi, JWPlayEvent } from 'jwplayer/types';
import FandomWirewaxPlugin from 'jwplayer/plugins/fandom-wirewax.plugin';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import { jwPlayerPlaybackTracker, triggerVideoMetric } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import useBeforeJwpWrapperRendered from 'jwplayer/utils/useBeforeJwpWrapperRendered';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import slugify from 'jwplayer/utils/slugify';

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
	getDismissed = () => false,
	onComplete,
	className,
	stopAutoAdvanceOnExitViewport,
	shouldLoadSponsoredContentList = true,
	jwPlayerContainerEmbedId = 'featured-video__player',
}) => {
	const { setPlayer, setConfig } = useContext(PlayerContext);
	const { playlistUrl } = config;
	const videoIndexRef = React.useRef(0);
	const defaultConfig = {
		plugins: { fandomWirewax: {} },
	};
	console.debug('jwPlayerContainerEmbedId: ', jwPlayerContainerEmbedId);

	useBeforeJwpWrapperRendered(() => {
		initPlayer(jwPlayerContainerEmbedId, playerUrl);
	}, shouldLoadSponsoredContentList);

	const initPlayer = (elementId: string, playerUrl?: string) => {
		console.debug('Legacy wrapper enabled: the embed will be loaded in head', playlistUrl);

		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });

		const onload = () => {
			// Set the max_resolution param for related videos
			if (typeof window?.jwplayer?.defaults?.related?.file === 'string') {
				window.jwplayer.defaults.related.file = window.jwplayer.defaults.related.file + '&max_resolution=1280';
			}

			jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY);
			triggerVideoMetric('loaded');

			const registerPlugin = window.jwplayer().registerPlugin;
			registerPlugin('wirewax', '8.0', FandomWirewaxPlugin);

			setConfig(config);

			// The following logic prevents JW Player to call for a poster image
			// This is meant to be an experiment
			// For the long term this should be probably handled on the backend (Article-video pandora service)
			const { image, ...configWithoutImage } = config; // eslint-disable-line

			const playerInstance = window.jwplayer(elementId).setup({
				...defaultConfig,
				...configWithoutImage,
			});

			playerInstance.on(JWEvents.AD_PAUSE, ({ pauseReason, viewable }: JWPauseEvent) => {
				// Keep playing the ad when the user closed the mini player
				if (viewable === 0 && pauseReason === 'external') {
					playerInstance.play();
				}
			});

			playerInstance.on(JWEvents.PLAY, ({ playReason, viewable }: JWPlayEvent) => {
				const dismissed = getDismissed();
				// Pause the content play when the user closed the mini player playing the ad
				if (dismissed && viewable === 0 && playReason === 'autostart') {
					playerInstance.pause();
				}
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
				/*
				// Temporarily removed since this was tanking the sponsored content views
				if (videoIndexRef.current >= 1 && (playerInstance.getViewable() === 0 || document.hasFocus() === false)) {
					// send tracking event
					jwPlayerPlaybackTracker({ event_name: 'video_player_pause_not_viewable' });

					// close the related UI to stop auto advancement, and then re-open it for users to click on
					setTimeout(() => {
						window.jwplayer(elementId).getPlugin('related').close();
						window.jwplayer(elementId).getPlugin('related').open();
					}, 1000);
				} */
			});

			playerInstance.setPlaylistItemCallback((item) => {
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
			<div id={jwPlayerContainerEmbedId} />
		</div>
	);
};

export default React.memo(JwPlayerWrapper);
