import React, { useEffect, useContext } from 'react';
import { JWPauseEvent, JWPlacementApi, JWPlayerApi, JWPlayEvent, JWPPlacementReadyResponse } from 'jwplayer/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import { jwPlayerPlaybackTracker, triggerVideoMetric } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import getSponsoredVideos from 'utils/getSponsoredVideos';

interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
	jwplacements?: JWPlacementApi;
	sponsoredVideos?: string[];
}

declare let window: WindowJWPlayer;

const JwPlayerWrapperWithStrategyRules: React.FC<JwPlayerWrapperProps> = ({
	config,
	onReady,
	getDismissed = () => false,
	onComplete,
	className,
	stopAutoAdvanceOnExitViewport,
	shouldLoadSponsoredContentList = true,
	jwPlayerContainerEmbedId = 'featured-video__player',
	vastUrl,
}) => {
	const { setPlayer, setConfig } = useContext(PlayerContext);
	const videoIndexRef = React.useRef(0);
	const strategyRulesPlacementId = '21rL5wJF';
	const recommendationPlaylistId = 'FOhaD53w';

	useEffect(() => {
		if (shouldLoadSponsoredContentList) {
			const retrieveSponsoredVideo = async () => {
				if (window?.sponsoredVideos?.length > 0) {
					console.debug('sponsoredVideos already retrieved');
					return;
				}

				const sponsoredVideoResponse = await getSponsoredVideos();
				if (sponsoredVideoResponse && typeof window !== undefined) {
					window.sponsoredVideos = sponsoredVideoResponse;
					console.debug('Retrieved sponsoredVideos list');
				} else {
					console.debug(
						'Could not set sponsored videos. Either window the fetched sponsoredVideo list were undefined.',
					);
				}
			};
			retrieveSponsoredVideo().catch((e) => {
				console.error('There was an issue with retrieving Sponsored Videos. ', e);
			});
		} else {
			console.debug('Loading of Sponsored Content Video List was disabled.');
		}
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_INIT_RENDER);
		initPlayer();
	}, []);

	const registerEventHandlers = (playerInstance) => {
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

		playerInstance.on(JWEvents.READY, () => {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_READY);
			triggerVideoMetric('ready');
			// only add the events after the player is ready
			jwPlayerPlaybackTracker({ event_name: 'video_player_ready' });
			addBaseTrackingEvents(playerInstance);

			if (onReady) {
				console.debug('Player ready...');
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
		});
	};

	const isJWPlayerReady = () => {
		return typeof window.jwplayer === 'function';
	};

	const jwPlayerLoaded = (payload: JWPPlacementReadyResponse) => {
		console.debug('Placement Embed Complete: ', payload.placementId, payload.playerDivId, payload.player);

		// Set the max_resolution param for related videos
		if (typeof window?.jwplayer?.defaults?.related?.file === 'string') {
			window.jwplayer.defaults.related.file = window.jwplayer.defaults.related.file + '&max_resolution=1280';
		}

		jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY);
		triggerVideoMetric('loaded');

		setConfig(config);

		const playerInstance = payload.player;
		registerEventHandlers(playerInstance);
		setPlayer(playerInstance);
	};

	const initPlayer = () => {
		console.debug('initPlayer...');
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });

		const onload = () => {
			console.debug('Strategy rules embed loaded. Waiting for player...');

			window.jwplacements._getPlacementReadyPromise(strategyRulesPlacementId).then(jwPlayerLoaded);
		};

		if (isJWPlayerReady()) {
			onload();
		} else {
			const script = document.createElement('script');
			script.async = true;
			script.src = 'https://cdn.jwplayer.com/v2/sites/cGlKNUnj/placements/embed.js';
			script.onload = onload;
			document.getElementsByTagName('head')[0].appendChild(script);
		}
	};

	return (
		<div className={className}>
			<div
				id={jwPlayerContainerEmbedId}
				data-jw-placement-id={strategyRulesPlacementId}
				data-jw-playlist={config.playlistUrl}
				data-jw-recommendations_playlist_id={recommendationPlaylistId}
				data-jw-preroll_ad_tag={vastUrl}
			/>
		</div>
	);
};

export default React.memo(JwPlayerWrapperWithStrategyRules);
