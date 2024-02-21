import React, { useContext } from 'react';
import {
	JWPauseEvent,
	JWPlacementApi,
	JWPlayerApi,
	JWPlayEvent,
	JWPPlacementReadyResponse,
	Player,
} from 'jwplayer/types';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';
import { JwPlayerWrapperProps } from 'jwplayer/types';
import { jwPlayerPlaybackTracker, triggerVideoMetric } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import useBeforeJwpWrapperRendered from 'jwplayer/utils/useBeforeJwpWrapperRendered';
import useScript from 'jwplayer/utils/useScript';
import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';

interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
	jwplacements?: JWPlacementApi;
	jwDataStore?: Record<string, unknown>;
	sponsoredVideos?: string[];
}

declare let window: WindowJWPlayer;

const JwPlayerWrapperWithStrategyRules: React.FC<JwPlayerWrapperProps> = ({
	config,
	onReady,
	getDismissed = () => false,
	onComplete,
	className,
	shouldLoadSponsoredContentList = true,
	jwPlayerContainerEmbedId = 'featured-video__player',
	vastUrl,
	parentRef,
}) => {
	const { mediaId, playlistId } = config;
	const strategyRulesPlacementId = 'KmMLkvao';
	const recommendationPlaylistId = 'FOhaD53w';
	const communicationService = getCommunicationService();

	const registerEventHandlers = (playerInstance: Player) => {
		if (!playerInstance) {
			// when JWP loads other player than JWP for example ExCo
			return;
		}

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
		});

		if (typeof onComplete === 'function') {
			playerInstance.on(JWEvents.COMPLETE, () => onComplete());
		}
	};

	const jwPlayerLoaded = (payload: JWPPlacementReadyResponse) => {
		console.debug('Placement Embed Complete: ', payload.placementId, payload.player);
		console.debug('jwPlayerContainerEmbedId: ', payload.playerDivId);

		if (onReady) {
			onReady();
		}

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

		communicationService.dispatch({
			type: '[Video] Player rendered',
			payload: {
				renderedId: 'JW player',
				videoAdsOptions: {
					showAds: true,
				},
			},
		});
	};

	const initPlayer = () => {
		console.debug(
			'Strategy rules enabled: the embed will be loaded inline',
			mediaId,
			playlistId,
			recommendationPlaylistId,
			vastUrl,
		);
	};

	const { setPlayer, setConfig } = useContext(PlayerContext);
	useBeforeJwpWrapperRendered(initPlayer, shouldLoadSponsoredContentList);

	const prerollAdTag = vastUrl ? encodeURIComponent(vastUrl) : '';
	const playlistOrMediaKeyVal = playlistId ? `playlist_id=${playlistId}` : `media_id=${mediaId}`;
	const strategyRulesUrl = `https://cdn.jwplayer.com/v2/sites/cGlKNUnj/placements/${strategyRulesPlacementId}/embed.js?custom.${strategyRulesPlacementId}.${playlistOrMediaKeyVal}&custom.${strategyRulesPlacementId}.recommendations_playlist_id=${recommendationPlaylistId}&custom.${strategyRulesPlacementId}.preroll_ad_tag=${prerollAdTag}`;
	const onBeforeLoad = () => {
		recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });
	};
	const onLoad = () => {
		console.debug('Strategy rules embed loaded. Waiting for player...');
		window.jwplacements._getPlacementReadyPromise(strategyRulesPlacementId).then(jwPlayerLoaded);
	};

	useScript(strategyRulesUrl, parentRef.current, onBeforeLoad, {
		onLoad,
		className,
		id: jwPlayerContainerEmbedId,
	});

	return null;
};

export default React.memo(JwPlayerWrapperWithStrategyRules);
