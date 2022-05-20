import { recordOnce, recordMultiple, difference } from '@fandom/tracking-metrics/timing/timings';

const PREFIX = 'jw-player-';

export const VIDEO_RECORD_EVENTS = {
	JW_PLAYER_RENDER: PREFIX + 'render-*',
	JW_PLAYER_INIT_RENDER: PREFIX + 'render-init',
	JW_PLAYER_SCRIPTS_LOAD_START: PREFIX + 'scripts-load-start',
	JW_PLAYER_SCRIPTS_LOAD_READY: PREFIX + 'scripts-load-ready',
	JW_PLAYER_READY: PREFIX + 'ready',
	JW_PLAYER_PLAYING_AD: PREFIX + 'playing-ad',
	JW_PLAYER_PLAYING_VIDEO: PREFIX + 'playing-initial-video',
};

const recordOptions = { sampleRate: 0.2 };

export function recordVideoEvent(event: string) {
	return recordOnce(event, recordOptions);
}

export function recordMultipleVideoEvent(event: string) {
	return recordMultiple(event, recordOptions);
}

export function getVideoStartupTime() {
	return difference(
		VIDEO_RECORD_EVENTS.JW_PLAYER_SCRIPTS_LOAD_START,
		VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO,
		recordOptions,
	);
}
