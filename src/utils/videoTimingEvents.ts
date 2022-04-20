import { recordOnce, recordMultiple } from '@fandom/tracking-metrics/timing/timings';

const PREFIX = 'jw-player-';

export const VIDEO_RECORD_EVENTS = {
	JW_PLAYER_RENDER: 'render-*',
	JW_PLAYER_INIT_RENDER: 'render-init',
	JW_PLAYER_SCRIPTS_LOAD_START: 'scripts-load-start',
	JW_PLAYER_SCRIPTS_LOAD_READY: 'scripts-load-ready',
	JW_PLAYER_READY: 'ready',
	JW_PLAYER_PLAYING_AD: 'playing-ad',
	JW_PLAYER_PLAYING_VIDEO: 'playing-initial-video',
};

export function recordVideoEvent(event: string) {
	recordOnce(PREFIX + event);
}

export function recordMultipleVideoEvent(event: string) {
	recordMultiple(PREFIX + event);
}
