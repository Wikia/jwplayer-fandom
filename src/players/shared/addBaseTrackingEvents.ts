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
	SeekEventData,
} from 'types';
import JWEvents from 'players/shared/JWEvents';
import { CONTROLS_CATEGORY, jwPlayerVideoTracker, singleTrack } from 'utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';

const AD_TIME_CATEGORY = 'ad';
const AD_ACTION = 'ad-playing';

const VIDEO_TIME_CATEGORY = 'video';
const VIDEO_TIME_ACTION = 'playing';

export default function addBaseTrackingEvents(playerInstance: Player) {
	const playList = playerInstance.getPlaylistItem();
	const mediaId = playList.mediaid;

	// Add MediaId to the dataLayer object to be used later
	const tracker = jwPlayerVideoTracker.extend({
		mediaId: mediaId,
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

			tracker({ action: 'play', label: playReason });

			if (playReason === 'interaction') {
				tracker.click({
					category: CONTROLS_CATEGORY,
					label: 'play',
				});
			}

			// Only fire on the very first event
			if (singleTrack(initialPlayEvent)) {
				tracker({ action: 'play', label: playReason });
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
			}
		})
		.on(JWEvents.TIME, (event: OnVideoTimeEventData) => {
			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-video-25' + mediaId)) {
				tracker({
					category: VIDEO_TIME_CATEGORY,
					action: VIDEO_TIME_ACTION,
					label: 'video-quartile-25',
					value: 0.25,
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-video-50' + mediaId)) {
				tracker({
					category: VIDEO_TIME_CATEGORY,
					action: VIDEO_TIME_ACTION,
					label: 'video-quartile-50',
					value: 0.5,
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-video-75' + mediaId)) {
				tracker({
					category: VIDEO_TIME_CATEGORY,
					action: VIDEO_TIME_ACTION,
					label: 'video-quartile-75',
					value: 0.75,
				});
			}
		})
		.on(JWEvents.COMPLETE, () => {
			tracker({
				category: 'video',
				action: 'completed',
			});
		})
		// Controls
		.on(JWEvents.PAUSE, (event: PausePlayerEventData) => {
			if (event.pauseReason === 'interaction') {
				tracker.click({
					category: CONTROLS_CATEGORY,
					label: 'pause',
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
					category: CONTROLS_CATEGORY,
					label: 'unmute',
				});
				return;
			}

			if (event.mute === true) {
				tracker.click({
					category: CONTROLS_CATEGORY,
					label: 'mute',
				});
			}
		})
		.on(JWEvents.VOLUME, (event: OnVolumeEventData) => {
			tracker({
				category: CONTROLS_CATEGORY,
				action: 'volume-change',
				label: `volume-level-${event.volume}`,
				value: event.volume,
			});
		})
		.on(JWEvents.NEXT, () => {
			tracker.click({
				category: CONTROLS_CATEGORY,
				label: 'next-video',
			});
		})

		.on(JWEvents.FLOAT, () => {
			tracker.click({
				category: CONTROLS_CATEGORY,
				label: 'picture-in-picture',
			});
		})

		.on(JWEvents.FULLSCREEN, (event: FullScreenEventData) => {
			tracker.click({
				category: CONTROLS_CATEGORY,
				label: `full-screen-${event.fullscreen}`,
			});
		})

		.on(JWEvents.SEEK, (event: SeekEventData) => {
			tracker.click({
				category: CONTROLS_CATEGORY,
				label: `seek | ${event.position} | ${event.offset}`,
				value: event.offset,
			});
		})

		// Errors
		.on(JWEvents.ERROR, (event: OnErrorEventData) => {
			console.warn(event);

			tracker({
				action: 'error',
				category: `${event.code} | ${event.message.slice(0, 20)}`,
				label: 'jw-player-error',
			});
		})

		// Ads
		// .on(JWEvents.AD_PLAY, () => {
		// 	console.log('Ad Play');
		// })
		.on(JWEvents.AD_LOADED, () => {
			tracker({
				category: AD_TIME_CATEGORY,
				action: 'ad-loaded',
				label: 'ad-quartile-0',
				value: 0,
			});
		})
		.on(JWEvents.AD_STARTED, () => {
			tracker({
				category: AD_TIME_CATEGORY,
				action: 'ad-started',
				label: 'ad-quartile-0',
				value: 0,
			});
		})
		.on(JWEvents.AD_FINISHED, () => {
			tracker({
				category: AD_TIME_CATEGORY,
				action: 'ad-completed',
				label: 'ad-quartile-100',
				value: 1,
			});
		})
		.on(JWEvents.AD_TIME, (event: OnAdTimeEventData) => {
			if (event.position >= event.duration * 0.25 && singleTrack('jw-player-ad-25')) {
				tracker({
					category: AD_TIME_CATEGORY,
					action: AD_ACTION,
					label: 'ad-quartile-25',
					value: 0.25,
				});
			}

			if (event.position >= event.duration * 0.5 && singleTrack('jw-player-ad-50')) {
				tracker({
					category: AD_TIME_CATEGORY,
					action: AD_ACTION,
					label: 'ad-quartile-50',
					value: 0.5,
				});
			}

			if (event.position >= event.duration * 0.75 && singleTrack('jw-player-ad-75')) {
				tracker({
					category: AD_TIME_CATEGORY,
					action: AD_ACTION,
					label: 'ad-quartile-75',
					value: 0.75,
				});
			}
		});
}
