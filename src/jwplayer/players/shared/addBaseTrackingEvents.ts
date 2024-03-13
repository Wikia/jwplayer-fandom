import {
	AdEvents,
	FullScreenEventData,
	MutePlayerEventData,
	OnAdTimeEventData,
	OnErrorEventData,
	OnVideoTimeEventData,
	OnVolumeEventData,
	PausePlayerEventData,
	Player,
	PlayPlayerEventData,
	SeekEventData,
	ShareEventData,
} from 'jwplayer/types';
import JWEvents from 'jwplayer/players/shared/JWEvents';
import {
	jwPlayerPlaybackTracker,
	jwPlayerAdTracker,
	jwPlayerContentTracker,
	singleTrack,
	triggerVideoMetric,
} from 'jwplayer/utils/videoTracking';
import { getVideoStartupTime, recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { getAssetId } from 'jwplayer/utils/globalJWInterface';
import { isInGallery } from 'jwplayer/utils/utils';

function getAdPropsFromAdEvent(event: AdEvents) {
	if (!event) {
		return {};
	}

	return {
		video_ad_pod_type: event.adId ?? '',
		video_ad_pod_duration: event.duration ?? '',
		video_ad_creative_name: event.adtitle ?? '',
		video_ad_creative_id: event.creativeAdId ?? '',
		video_ad_advertiser_name: event.advertiser ?? '',
		video_ad_duration: event.duration ?? '',
	};
}

export default function addBaseTrackingEvents(playerInstance: Player) {
	// Add events
	playerInstance
		.on(JWEvents.PLAY, (event: PlayPlayerEventData) => {
			if (!event.playReason) {
				console.warn('No play reason');
				return;
			}

			const playReason = event.playReason ?? '';

			const initialPlayEvent = 'jw-initial-play-event';

			if (playReason === 'interaction') {
				jwPlayerPlaybackTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_resume',
				});
			}

			// Fire at the start of each video
			if (singleTrack(initialPlayEvent + getAssetId(playerInstance.id))) {
				const timeToFirstFrame = recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO_CONTENT);
				jwPlayerPlaybackTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_content_start',
					video_time_to_first_frame: timeToFirstFrame,
					video_startup_time: getVideoStartupTime(),
				});
				triggerVideoMetric('started');
			}
		})
		.on(JWEvents.TIME, (event: OnVideoTimeEventData) => {
			const mediaId = getAssetId(playerInstance.id);
			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-video-25' + mediaId)) {
				jwPlayerContentTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_content_quartile_25',
				});
				triggerVideoMetric('25-percent');
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-video-50' + mediaId)) {
				jwPlayerContentTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_content_quartile_50',
				});
				triggerVideoMetric('50-percent');
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-video-75' + mediaId)) {
				jwPlayerContentTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_content_quartile_75',
				});
				triggerVideoMetric('75-percent');
			}

			// 10s interval events firing
			if (event.position < 60 && event.position >= 10) {
				const tenSecondBucket = Math.floor(event.position / 10);

				if (singleTrack(`jw-player-heartbeat-second-${mediaId}-${tenSecondBucket}`)) {
					jwPlayerContentTracker({
						player_element_id: playerInstance.id,
						event_name: 'video_content_playing',
						video_content_seconds_viewed: 10,
					});
				}
			}

			if (event.position > 60) {
				const minuteBucket = Math.floor(event.position / 60);

				if (singleTrack(`jw-player-heartbeat-min-${mediaId}-${minuteBucket}`)) {
					jwPlayerContentTracker({
						player_element_id: playerInstance.id,
						event_name: 'video_content_playing',
						video_content_seconds_viewed: 60,
					});
				}
			}
		})
		.on(JWEvents.COMPLETE, () => {
			jwPlayerContentTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_content_completed',
			});
			triggerVideoMetric('100-percent');
		})
		// Controls
		.on(JWEvents.PAUSE, (event: PausePlayerEventData) => {
			if (event.pauseReason === 'interaction') {
				jwPlayerPlaybackTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_pause',
				});
				triggerVideoMetric('paused');
			}
		})
		.on(JWEvents.MUTE, (event: MutePlayerEventData) => {
			if (event.mute === undefined) {
				console.warn('mute undefined');
				return;
			}

			if (event.mute === false) {
				jwPlayerPlaybackTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_volume_change',
					_label: 'unmute',
				});
				return;
			}

			if (event.mute === true) {
				jwPlayerPlaybackTracker({
					player_element_id: playerInstance.id,
					event_name: 'video_volume_change',
					_label: 'mute',
				});
			}
		})
		.on(JWEvents.VOLUME, (event: OnVolumeEventData) => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_volume_change',
				value: event.volume,
			});
		})
		.on(JWEvents.NEXT, () => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_select_next',
			});
		})

		.on(JWEvents.FLOAT, () => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_pip',
			});
		})

		.on(JWEvents.VIEWABLE, () => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_player_viewability_state',
			});
		})

		.on(JWEvents.FULLSCREEN, (event: FullScreenEventData) => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_fullscreen_toggle',
				_label: `full-screen-${event.fullscreen}`,
			});
		})

		.on(JWEvents.SEEK, (seekEventData: SeekEventData) => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_seek',
				video_seek_start_position: seekEventData.position,
				video_seek_end_position: seekEventData.offset,
				video_seek_method: seekEventData.type,
			});
		})

		// Errors
		.on(JWEvents.ERROR, (event: OnErrorEventData) => {
			console.warn(event);
			triggerVideoMetric('error', event.code.toString());

			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_player_error',
				video_player_error_code: event.code,
			});
		})

		// Ads
		.on(JWEvents.AD_LOADED, (event: AdEvents) => {
			jwPlayerAdTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_ad_loaded',
				video_ad_is_in_gallery: isInGallery(),
				...getAdPropsFromAdEvent(event),
			});
		})
		.on(JWEvents.AD_STARTED, (event: AdEvents) => {
			jwPlayerAdTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_ad_started',
				video_ad_is_in_gallery: isInGallery(),
				...getAdPropsFromAdEvent(event),
			});
			triggerVideoMetric('adstarted');
		})
		.on(JWEvents.AD_FINISHED, (event: AdEvents) => {
			jwPlayerAdTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_ad_completed',
				video_ad_is_in_gallery: isInGallery(),
				...getAdPropsFromAdEvent(event),
			});
			triggerVideoMetric('adfinished');
		})
		.on(JWEvents.AD_TIME, (event: OnAdTimeEventData) => {
			const mediaId = getAssetId(playerInstance.id);
			const additionalAdProps = {
				video_ad_is_in_gallery: isInGallery(),
				...getAdPropsFromAdEvent(event),
			};

			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-ad-25-' + mediaId)) {
				jwPlayerAdTracker({
					player_element_id: playerInstance.id,
					...additionalAdProps,
					event_name: 'video_ad_quartile_25',
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-ad-50' + mediaId)) {
				jwPlayerAdTracker({
					player_element_id: playerInstance.id,
					...additionalAdProps,
					event_name: 'video_ad_quartile_50',
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-ad-75' + mediaId)) {
				jwPlayerAdTracker({
					player_element_id: playerInstance.id,
					...additionalAdProps,
					event_name: 'video_ad_quartile_75',
				});
			}

			// 10s interval events firing
			if (event.position < 10) {
				const oneSecondBucket = Math.floor(event.position);

				if (singleTrack(`jw-player-ad-heartbeat-second-${mediaId}-${oneSecondBucket}`)) {
					jwPlayerContentTracker({
						player_element_id: playerInstance.id,
						...additionalAdProps,
						event_name: 'video_ad_playing',
						video_ad_seconds_viewed: 1,
					});
				}
			}

			if (event.position > 10) {
				const tenSecondBucket = Math.floor(event.position / 10);

				if (singleTrack(`jw-player-ad-heartbeat-min-${mediaId}-${tenSecondBucket}`)) {
					jwPlayerContentTracker({
						player_element_id: playerInstance.id,
						...additionalAdProps,
						event_name: 'video_ad_playing',
						video_ad_seconds_viewed: 10,
					});
				}
			}
		});

	// Safety check for sharing plugin
	if (playerInstance.plugins && playerInstance.plugins.sharing && playerInstance.plugins.sharing.on) {
		playerInstance.plugins.sharing.on('click', (method: ShareEventData) => {
			jwPlayerPlaybackTracker({
				player_element_id: playerInstance.id,
				event_name: 'video_share',
				video_share_method: method.method.toString(),
			});
		});
	} else {
		console.error('Sharing plugin not configured');
	}
}
