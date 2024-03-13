import { recordOnce, recordMultiple, difference } from '@fandom/tracking-metrics/timing/timings';

const PREFIX = 'jw-player-';

export const VIDEO_RECORD_EVENTS = {
	FEATURED_VIDEO_INIT: 'featured-video-init',
	JW_PLAYER_SCRIPTS_LOAD_START: PREFIX + 'scripts-load-start',
	JW_PLAYER_SCRIPTS_LOAD_READY: PREFIX + 'scripts-load-ready',
	JW_PLAYER_READY: PREFIX + 'ready',
	JW_PLAYER_PLAYING_VIDEO_CONTENT: PREFIX + 'playing-initial-video',
	JW_PLAYER_PLAYING_CONTENT_OR_AD: PREFIX + 'playing-content-or-ad',
};

const recordOptions = { sampleRate: 1 };

export function disableTimingEventsSamplingRate() {
	delete recordOptions.sampleRate;
}

export function recordVideoEvent(event: string) {
	return recordOnce(event, recordOptions);
}

export function recordAndTrackDifference(eventToRecord: string, eventToDiff: string) {
	const time = recordVideoEvent(eventToRecord);

	// track the difference only if the event was recorded
	if (time !== null) {
		difference(eventToDiff, eventToRecord, recordOptions);
	}
}

export function recordMultipleVideoEvent(event: string) {
	return recordMultiple(event, recordOptions);
}

export function getVideoStartupTime() {
	return difference(
		VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
		VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO_CONTENT,
		recordOptions,
	);
}
