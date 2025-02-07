import { recordOnce, recordMultiple, difference } from '@fandom/tracking-metrics/timing/timings';

export const VIDEO_RECORD_EVENTS = {
	FEATURED_VIDEO_INIT: 'featured-video-init',
	JW_PLAYER_SCRIPTS_LOAD_START: 'jw-player-scripts-load-start',
	JW_PLAYER_SCRIPTS_LOAD_READY: 'jw-player-scripts-load-ready',
	JW_PLAYER_READY: 'jw-player-ready',
	JW_PLAYER_PLAYING_VIDEO_CONTENT: 'jw-player-playing-initial-video',
	JW_PLAYER_PLAYING_CONTENT_OR_AD: 'jw-player-playing-content-or-ad',
	JW_PLAYER_PLAYING_AD: 'jw-player-playing-ad',
};

export const STRATEGY_RULES_VIDEO_RECORD_EVENTS = {
	FEATURED_VIDEO_INIT: 'featured-video-init',
	JW_PLAYER_SCRIPTS_LOAD_START: 'jw-sr-player-scripts-load-start',
	JW_PLAYER_SCRIPTS_LOAD_READY: 'jw-sr-player-scripts-load-ready',
	JW_PLAYER_READY: 'jw-sr-player-ready',
	JW_PLAYER_PLAYING_VIDEO_CONTENT: 'jw-sr-player-playing-initial-video',
	JW_PLAYER_PLAYING_CONTENT_OR_AD: 'jw-sr-player-playing-content-or-ad',
	JW_PLAYER_PLAYING_AD: 'jw-sr-player-playing-ad',
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
