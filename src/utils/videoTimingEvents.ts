import record from '@fandom/tracking-metrics/timing/timings';

export const VIDEO_RECORD_EVENTS = {
	JW_PLAYER_INIT: 'jw-player-init',
	JW_PLAYER_SCRIPTS_LOAD_START: 'jw-player-scripts-load-start',
	JW_PLAYER_SCRIPTS_LOAD_READY: 'jw-player-scripts-load-ready',
	JW_PLAYER_PLAYING_AD: 'jw-player-playing-ad',
	JW_PLAYER_PLAYING_VIDEO: 'jw-player-playing-video',
};

export function recordVideoEvent(event: string) {
	record(event);
}
