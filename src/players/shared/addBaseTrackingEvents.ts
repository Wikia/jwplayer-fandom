import {
	FullScreenEventData,
	MutePlayerEventData,
	OnAdTimeEventData,
	OnErrorEventData,
	OnVideoTimeEventData,
	OnVolumeEventData,
	PausePlayerEventData,
	Player,
	PlayPlayerEventData,
} from 'types';
import JWEvents from 'players/shared/JWEvents';
import { jwPlayerVideoTracker, singleTrack } from 'utils/videoTracking';
import { recordMultipleVideoEvent, recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';

export default function addBaseTrackingEvents(playerInstance: Player) {
	const playList = playerInstance.getPlaylistItem();
	const mediaId = playList.mediaid;

	// Add MediaId to the dataLayer object to be used later
	const tracker = jwPlayerVideoTracker.extend({
		_mediaId: mediaId,
	});

	// Add events
	playerInstance
		.on(JWEvents.PLAY, (event: PlayPlayerEventData) => {
			if (!event.playReason) {
				console.warn('No play reason');
				return;
			}

			const playReason = event.playReason ?? '';

			const initialPlayEvent = 'jw-initial-play-event';

			// tracker({ action: 'play', label: playReason });

			if (playReason === 'interaction') {
				tracker({
					event_name: 'video_resume',
				});
			}

			recordMultipleVideoEvent('playing-video-time');
			// Only fire on the very first event
			if (singleTrack(initialPlayEvent)) {
				tracker({ event: 'video_content_start' });
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
			}
		})
		.on(JWEvents.TIME, (event: OnVideoTimeEventData) => {
			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-video-25' + mediaId)) {
				tracker({
					event_name: 'video_content_quartile_25',
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-video-50' + mediaId)) {
				tracker({
					event_name: 'video_content_quartile_50',
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-video-75' + mediaId)) {
				tracker({
					event_name: 'video_content_quartile_75',
				});
			}
		})
		.on(JWEvents.COMPLETE, () => {
			tracker({
				event_name: 'video_content_completed',
			});
		})
		// Controls
		.on(JWEvents.PAUSE, (event: PausePlayerEventData) => {
			if (event.pauseReason === 'interaction') {
				tracker({
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
				tracker.click({
					event_name: 'video_volume_change',
					_label: 'unmute',
				});
				return;
			}

			if (event.mute === true) {
				tracker.click({
					event_name: 'video_volume_change',
					_label: 'mute',
				});
			}
		})
		.on(JWEvents.VOLUME, (event: OnVolumeEventData) => {
			tracker({
				event_name: 'video_volume_change',
				value: event.volume,
			});
		})
		.on(JWEvents.NEXT, () => {
			tracker.click({
				event_name: 'video_select_next',
			});
		})

		.on(JWEvents.FLOAT, () => {
			tracker.click({
				event_name: 'video_pip',
			});
		})

		.on(JWEvents.FULLSCREEN, (event: FullScreenEventData) => {
			tracker.click({
				event_name: 'video_fullscreen_toggle',
				_label: `full-screen-${event.fullscreen}`,
			});
		})

		.on(JWEvents.SEEK, () => {
			tracker.click({
				event_name: 'video_seek',
			});
		})

		// Errors
		.on(JWEvents.ERROR, (event: OnErrorEventData) => {
			console.warn(event);

			tracker({
				event_name: 'video_player_error',
				_error_info: `${event.code} | ${event.message.slice(0, 20)}`,
			});
		})

		// Ads
		// .on(JWEvents.AD_PLAY, () => {
		// 	console.log('Ad Play');
		// })
		.on(JWEvents.AD_LOADED, () => {
			tracker({
				event_name: 'video_ad_loaded',
			});
		})
		.on(JWEvents.AD_STARTED, () => {
			tracker({
				event_name: 'video_ad_started',
			});
		})
		.on(JWEvents.AD_FINISHED, () => {
			tracker({
				event_name: 'video_ad_completed',
			});
		})
		.on(JWEvents.AD_TIME, (event: OnAdTimeEventData) => {
			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-ad-25')) {
				tracker({
					event_name: 'video_ad_quartile_25',
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-ad-50')) {
				tracker({
					event_name: 'video_ad_quartile_50',
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-ad-75')) {
				tracker({
					event_name: 'video_ad_quartile_75',
				});
			}
		});
}
