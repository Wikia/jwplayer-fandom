import { MutePlayerEventData, Player, PlayPlayerEventData } from "types";
import JWEvents, { PLAY_REASONS } from "players/shared/JWEvents";
import { jwPlayerVideoTracker, singleTrack } from "utils/videoTracking";
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from "utils/videoTimingEvents";

export default function addBaseTrackingEvents(playerInstance: Player) {
	const playList = playerInstance.getPlaylistItem();

	const mediaId = playList.mediaid;

	// Add events
	playerInstance
		.on(JWEvents.PLAY, (event: PlayPlayerEventData) => {
			console.log('play', event);

			if (!event.playReason) {
				console.warn('No play reason');
				return;
			}

			const playReason = event.playReason;

			const initialPlayEvent = 'jw-initial-play-event';

			jwPlayerVideoTracker({action: playReason, label: playReason});

			// Only fire on the very first event
			if (singleTrack(initialPlayEvent)) {
				jwPlayerVideoTracker({ action: 'play', label: mediaId });
				recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
				return;
			}

			// Additional plays
		})
		.on(JWEvents.COMPLETE, () => {
			console.log('complete');
		})
		.on(JWEvents.PAUSE, () => {
			console.log('pause');
		})
		.on(JWEvents.MUTE, (event: MutePlayerEventData) => {
			if (event.mute === undefined) {
				console.warn('mute undefeind');
				return;
			}

			if (event.mute === false) {
				console.log('unmute', event);
				return;
			}

			if (event.mute === true) {
				console.log('mute', event);
			}
		})

		// Ads
		.on(JWEvents.AD_PLAY, () => {
			console.log('Ad Play');
		})
		.on(JWEvents.AD_FINISHED, () => {
			console.log('ad finished');
		});
}
