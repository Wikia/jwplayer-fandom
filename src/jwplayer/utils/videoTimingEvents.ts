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
	JW_PLAYER_AD_ENG_OPT_IN_LISTEN_START: PREFIX + 'ad-eng-opt-in-listen-start',
	JW_PLAYER_AD_ENG_OPT_IN_MESSAGE_RECIEVED: PREFIX + 'ad-eng-opt-in-message-recieved',
	JW_PLAYER_AD_ENG_CONFIG_LISTEN_START: PREFIX + 'ad-eng-config-listen-start',
	JW_PLAYER_AD_ENG_CONFIG_MESSAGE_RECIEVED: PREFIX + 'ad-eng-config-message-recieved',
	JW_PLAYER_AD_ENG_SETUP_JW_LISTEN_START: PREFIX + 'ad-eng-setup-jw-listen-start',
	JW_PLAYER_AD_ENG_SETUP_JW_MESSAGE_RECIEVED: PREFIX + 'ad-eng-setup-jw-message-recieved',
	JW_PLAYER_AD_ENG_PLAYER_READY_DISPATCH: PREFIX + 'ad-eng-player-ready-dispatch',
};

const recordOptions = { sampleRate: 0.3 };

export function disableTimingEventsSamplingRate() {
	delete recordOptions.sampleRate;
}

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
