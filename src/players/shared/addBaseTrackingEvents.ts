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
} from 'types';
import JWEvents from 'players/shared/JWEvents';
import { jwPlayerPlaybackTracker, jwPlayerAdTracker, jwPlayerContentTracker, singleTrack } from 'utils/videoTracking';
import { getVideoStartupTime, recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';
import { getAssetId } from 'utils/globalJWInterface';

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
					event_name: 'video_resume',
				});
			}

			// Only fire on the very first event
			if (singleTrack(initialPlayEvent)) {
				const timeToFirstFrame = recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
				jwPlayerPlaybackTracker({
					event_name: 'video_content_start',
					video_time_to_first_frame: timeToFirstFrame,
					video_startup_time: getVideoStartupTime(),
				});
			}
		})
		.on(JWEvents.TIME, (event: OnVideoTimeEventData) => {
			const mediaId = getAssetId();
			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-video-25' + mediaId)) {
				jwPlayerContentTracker({
					event_name: 'video_content_quartile_25',
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-video-50' + mediaId)) {
				jwPlayerContentTracker({
					event_name: 'video_content_quartile_50',
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-video-75' + mediaId)) {
				jwPlayerContentTracker({
					event_name: 'video_content_quartile_75',
				});
			}

			// 10s interval events firing
			if (event.position < 60 && event.position >= 10) {
				const tenSecondBucket = Math.floor(event.position / 10);

				if (singleTrack(`jw-player-heartbeat-second-${mediaId}-${tenSecondBucket}`)) {
					jwPlayerContentTracker({
						event_name: 'video_content_playing',
						video_content_seconds_viewed: 10,
					});
				}
			}

			if (event.position > 60) {
				const minuteBucket = Math.floor(event.position / 60);

				if (singleTrack(`jw-player-heartbeat-min-${mediaId}-${minuteBucket}`)) {
					jwPlayerContentTracker({
						event_name: 'video_content_playing',
						video_content_seconds_viewed: 60,
					});
				}
			}
		})
		.on(JWEvents.COMPLETE, () => {
			jwPlayerContentTracker({
				event_name: 'video_content_completed',
			});
		})
		// Controls
		.on(JWEvents.PAUSE, (event: PausePlayerEventData) => {
			if (event.pauseReason === 'interaction') {
				jwPlayerPlaybackTracker({
					event_name: 'video_pause',
				});
			}
		})
		.on(JWEvents.MUTE, (event: MutePlayerEventData) => {
			if (event.mute === undefined) {
				console.warn('mute undefined');
				return;
			}

			if (event.mute === false) {
				jwPlayerPlaybackTracker({
					event_name: 'video_volume_change',
					_label: 'unmute',
				});
				return;
			}

			if (event.mute === true) {
				jwPlayerPlaybackTracker({
					event_name: 'video_volume_change',
					_label: 'mute',
				});
			}
		})
		.on(JWEvents.VOLUME, (event: OnVolumeEventData) => {
			jwPlayerPlaybackTracker({
				event_name: 'video_volume_change',
				value: event.volume,
			});
		})
		.on(JWEvents.NEXT, () => {
			jwPlayerPlaybackTracker({
				event_name: 'video_select_next',
			});
		})

		.on(JWEvents.FLOAT, () => {
			jwPlayerPlaybackTracker({
				event_name: 'video_pip',
			});
		})

		.on(JWEvents.VIEWABLE, () => {
			jwPlayerPlaybackTracker({
				event_name: 'video_player_viewability_state',
			});
		})

		.on(JWEvents.FULLSCREEN, (event: FullScreenEventData) => {
			jwPlayerPlaybackTracker({
				event_name: 'video_fullscreen_toggle',
				_label: `full-screen-${event.fullscreen}`,
			});
		})

		.on(JWEvents.SEEK, (seekEventData: SeekEventData) => {
			jwPlayerPlaybackTracker({
				event_name: 'video_seek',
				video_seek_start_position: seekEventData.position,
				video_seek_end_position: seekEventData.offset,
				video_seek_method: seekEventData.type,
			});
		})

		// Errors
		.on(JWEvents.ERROR, (event: OnErrorEventData) => {
			console.warn(event);

			jwPlayerPlaybackTracker({
				event_name: 'video_player_error',
				video_player_error_code: event.code,
			});
		})

		// Ads TODO - Ask if we need this
		// .on(JWEvents.AD_PLAY, () => {
		// 	console.log('Ad Play');
		// })

		.on(JWEvents.AD_LOADED, (event: AdEvents) => {
			console.log('ads', event);
			jwPlayerAdTracker({
				event_name: 'video_ad_loaded',
				...getAdPropsFromAdEvent(event),
			});
		})
		.on(JWEvents.AD_STARTED, (event: AdEvents) => {
			console.log('ad_started', event);
			jwPlayerAdTracker({
				event_name: 'video_ad_started',
				...getAdPropsFromAdEvent(event),
			});
		})
		.on(JWEvents.AD_FINISHED, (event: AdEvents) => {
			console.log('ad_finished', event);
			jwPlayerAdTracker({
				event_name: 'video_ad_completed',
				...getAdPropsFromAdEvent(event),
			});
		})
		.on(JWEvents.AD_TIME, (event: OnAdTimeEventData) => {
			const mediaId = getAssetId();
			console.log('ad_time', event);
			const additionalAdProps = getAdPropsFromAdEvent(event);

			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-ad-25-' + mediaId)) {
				jwPlayerAdTracker({
					...additionalAdProps,
					event_name: 'video_ad_quartile_25',
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-ad-50' + mediaId)) {
				jwPlayerAdTracker({
					...additionalAdProps,
					event_name: 'video_ad_quartile_50',
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-ad-75' + mediaId)) {
				jwPlayerAdTracker({
					...additionalAdProps,
					event_name: 'video_ad_quartile_75',
				});
			}

			// 10s interval events firing
			if (event.position < 10) {
				const oneSecondBucket = Math.floor(event.position);

				if (singleTrack(`jw-player-ad-heartbeat-second-${mediaId}-${oneSecondBucket}`)) {
					jwPlayerContentTracker({
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
				event_name: 'video_share',
				video_share_method: method.method.toString(),
			});
		});
	} else {
		console.error('Sharing plugin not configured');
	}
}
