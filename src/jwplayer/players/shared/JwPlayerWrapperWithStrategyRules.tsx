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
import { jwPlayerPlaybackTracker } from 'jwplayer/utils/videoTracking';
import { recordAndTrackDifference, STRATEGY_RULES_VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import useBeforeJwpWrapperRendered from 'jwplayer/utils/useBeforeJwpWrapperRendered';
import useScript from 'jwplayer/utils/useScript';
import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';
import { updateRVParam } from 'jwplayer/utils/updateRVParam';
import { difference } from '@fandom/tracking-metrics/timing/timings';

interface WindowJWPlayer extends Window {
	jwplayer?: JWPlayerApi;
	jwplacements?: JWPlacementApi;
	jwDataStore?: Record<string, unknown>;
	sponsoredVideos?: string[];
}

declare let window: WindowJWPlayer;

function recordNewRelicTimeAction(eventName: string, time: number) {
	window.newrelic.addPageAction('videoPlayerEvent', {
		eventName,
		time,
	});
}

const JwPlayerWrapperWithStrategyRules: React.FC<JwPlayerWrapperProps> = ({
	config,
	onReady,
	getDismissed = () => false,
	onComplete,
	className,
	shouldLoadSponsoredContentList = true,
	jwPlayerContainerEmbedId = 'featured-video__player',
	vastUrl,
	vastXml,
	parentRef,
}) => {
	const { mediaId, playlistId } = config;
	const searchParams = new URLSearchParams(window.location.search);
	const strategyRulesPlacementId = searchParams.get('jwp_placement_id') ?? 'KmMLkvao';
	const recommendationPlaylistId = 'FOhaD53w';
	const communicationService = getCommunicationService();
	const prerollAdTag = vastUrl ?? '';
	const adIndexRef = React.useRef(1);
	const { setPlayer, setConfig } = useContext(PlayerContext);

	const registerEventHandlers = (playerInstance: Player) => {
		if (!playerInstance) {
			// when JWP loads other player than JWP for example ExCo
			return;
		}

		playerInstance.on(JWEvents.REMOVE, () => {
			setPlayer(undefined);
		});

		playerInstance.on(JWEvents.AD_PAUSE, ({ pauseReason, viewable }: JWPauseEvent) => {
			// Keep playing the ad when the user closed the mini player
			if (viewable === 0 && pauseReason === 'external') {
				playerInstance.play();
			}
		});

		playerInstance.on(JWEvents.PLAY, ({ playReason, viewable }: JWPlayEvent) => {
			recordAndTrackDifference(
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_CONTENT_OR_AD,
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
			);

			if (window.newrelic) {
				const contentOrAdTime = +difference(
					STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
					STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_CONTENT_OR_AD,
				);
				recordNewRelicTimeAction('video_player_play', contentOrAdTime);
			}

			const dismissed = getDismissed();
			// Pause the content play when the user closed the mini player playing the ad
			if (dismissed && viewable === 0 && playReason === 'autostart') {
				playerInstance.pause();
			}
		});

		playerInstance.on(JWEvents.READY, () => {
			recordAndTrackDifference(
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY,
			);
			// only add the events after the player is ready
			jwPlayerPlaybackTracker({ event_name: 'video_player_ready' });
			addBaseTrackingEvents(playerInstance);
			if (window.newrelic) {
				const playerReadyTime = +difference(
					STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY,
					STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
				);
				recordNewRelicTimeAction('video_player_ready', playerReadyTime);
			}
		});

		playerInstance.on(JWEvents.AD_IMPRESSION, () => {
			recordAndTrackDifference(
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_CONTENT_OR_AD,
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
			);

			if (window.newrelic) {
				const contentOrAdTime = +difference(
					STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
					STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_CONTENT_OR_AD,
				);
				recordNewRelicTimeAction('video_player_play', contentOrAdTime);
			}

			const newAdIndex = adIndexRef.current + 1;
			const newPrerollAdTag = updateRVParam(prerollAdTag, newAdIndex);
			adIndexRef.current = newAdIndex;
			const jwDataStore = window.jwDataStore || { custom: {} };
			jwDataStore.custom[strategyRulesPlacementId] = jwDataStore.custom[strategyRulesPlacementId] || {};
			jwDataStore.custom[strategyRulesPlacementId].preroll_ad_tag = newPrerollAdTag;
			window.jwDataStore = jwDataStore;
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

		if (payload.player && window.nrvideo && window.newrelic) {
			window.nrvideo.Core.addTracker(new window.nrvideo.JwplayerTracker(payload.player));
		}

		// Set the max_resolution param for related videos
		if (typeof window?.jwplayer?.defaults?.related?.file === 'string') {
			window.jwplayer.defaults.related.file = window.jwplayer.defaults.related.file + '&max_resolution=1280';
		}

		jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
		recordAndTrackDifference(
			STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY,
			STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
		);

		if (window.newrelic) {
			const playerLoadTime = +difference(
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY,
			);
			recordNewRelicTimeAction('video_player_load', playerLoadTime);
		}

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

	useBeforeJwpWrapperRendered(initPlayer, shouldLoadSponsoredContentList);

	const strategyRulesURL = `https://cdn.jwplayer.com/v2/sites/cGlKNUnj/placements/${strategyRulesPlacementId}/embed.js`;
	const newRelicVideoURL =
		'https://script.wikia.nocookie.net/fandom-ae-assets/temp/nandy/newrelic-video-jwplayer.min.js';
	const onBeforeLoad = () => {
		recordAndTrackDifference(
			STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
			STRATEGY_RULES_VIDEO_RECORD_EVENTS.FEATURED_VIDEO_INIT,
		);
		jwPlayerPlaybackTracker({ event_name: 'video_player_start_load' });
		if (window.newrelic) {
			const playerStartLoadTime = +difference(
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.FEATURED_VIDEO_INIT,
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
			);
			recordNewRelicTimeAction('video_player_start_load', playerStartLoadTime);
		}

		window.jwDataStore = window.jwDataStore || { custom: {} };
		window.jwDataStore.custom[strategyRulesPlacementId] = window.jwDataStore.custom[strategyRulesPlacementId] || {};

		const customParams = window.jwDataStore.custom[strategyRulesPlacementId];

		if (playlistId) {
			customParams.playlist_id = playlistId;
		} else {
			customParams.media_id = mediaId;
		}
		customParams.recommendations_playlist_id = recommendationPlaylistId;
		customParams.preroll_ad_tag = prerollAdTag;
		customParams.vastxml = vastXml;
	};
	const onLoad = () => {
		console.debug('Strategy rules embed loaded. Waiting for player...');
		window.jwplacements._getPlacementReadyPromise(strategyRulesPlacementId).then(jwPlayerLoaded);
	};

	useScript(newRelicVideoURL, parentRef.current, null, {
		id: 'nr-video',
	});
	useScript(strategyRulesURL, parentRef.current, onBeforeLoad, {
		onLoad,
		className,
		id: jwPlayerContainerEmbedId,
	});

	return null;
};

export default React.memo(JwPlayerWrapperWithStrategyRules);
