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
import { CommunicationService, JWPlayer, recordAndTrackDifference, STRATEGY_RULES_VIDEO_RECORD_EVENTS } from '@fandom/video-player'
import { JWPlayerWindow } from '@fandom/video-player/lib/jwplayer/types'
import JWEvents from 'jwplayer/players/shared/JWEvents';
import addBaseTrackingEvents from 'jwplayer/players/shared/addBaseTrackingEvents';
import useBeforeJwpWrapperRendered from 'jwplayer/utils/useBeforeJwpWrapperRendered';
import useScript from 'jwplayer/utils/useScript';
import { updateRVParam } from 'jwplayer/utils/updateRVParam';

declare let window: JWPlayerWindow;

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
	const communicationService = CommunicationService.getInstance();
	const prerollAdTag = vastUrl ?? '';
	const adIndexRef = React.useRef(1);
	const { setPlayer, setConfig } = useContext(PlayerContext);

	const jwPlayer = new JWPlayer('cGlKNUnj', strategyRulesPlacementId)

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
		});

		playerInstance.on(JWEvents.AD_IMPRESSION, () => {
			recordAndTrackDifference(
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_CONTENT_OR_AD,
				STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_READY,
			);

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

		// Set the max_resolution param for related videos
		if (typeof window?.jwplayer?.defaults?.related?.file === 'string') {
			window.jwplayer.defaults.related.file = window.jwplayer.defaults.related.file + '&max_resolution=1280';
		}

		jwPlayerPlaybackTracker({ event_name: 'video_player_load' });
		recordAndTrackDifference(
			STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_READY,
			STRATEGY_RULES_VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
		);

		setConfig(config);

		const playerInstance = payload.player;
		registerEventHandlers(playerInstance);
		setPlayer(playerInstance);

		communicationService.broadcast({
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

	const onBeforeLoad = () => {
		jwPlayer.onBeforeLoad()
		jwPlayer.mergeCustomParams({
			...(playlistId ? { playlist_id: playlistId } : { media_id: mediaId }),
			recommendations_playlist_id: recommendationPlaylistId,
			preroll_ad_tag: prerollAdTag,
			vastxml: vastXml,
		});
	};

	const onLoad = () => {
		console.debug('Strategy rules embed loaded. Waiting for player...');
		window.jwplacements._getPlacementReadyPromise(strategyRulesPlacementId).then(jwPlayerLoaded);
	};

	useScript(jwPlayer.strategyRulesUrl, parentRef.current, onBeforeLoad, {
		onLoad,
		className,
		id: jwPlayerContainerEmbedId,
	});

	return null;
};

export default React.memo(JwPlayerWrapperWithStrategyRules);
