const JWEvents = {
	// Main Events
	READY: 'ready',
	PLAY: 'play',
	PAUSE: 'pause',
	ERROR: 'error',
	WARNING: 'warning',
	MUTE: 'mute',
	VOLUME: 'volume',
	SEEK: 'seek',
	COMPLETE: 'complete',
	TIME: 'time',
	VIEWABLE: 'viewable',
	BUFFER_CHANGE: 'bufferChange',
	REMOVE: 'remove',

	// Navigation
	NEXT: 'nextClick',
	FLOAT: 'float',
	FULLSCREEN: 'fullscreen',

	// Ad Events
	AD_LOADED: 'adLoaded',
	AD_PLAY: 'adPlay',
	AD_PAUSE: 'adPause',
	AD_STARTED: 'adStarted',
	AD_FINISHED: 'adComplete',
	AD_TIME: 'adTime',
	AD_BREAK_START: 'adBreakStart',
	AD_BREAK_END: 'adBreakEnd',
	AD_IMPRESSION: 'adImpression',
	AD_COMPLETE: 'adComplete',
	AD_SKIPPED: 'adSkipped',

	// Playlist
	PLAYLIST_LOADED: 'playlist',
	PLAYLIST_ITEM: 'playlistItem',

	// Playback
	FIRST_FRAME: 'firstFrame',
};

export const PLAY_REASONS = {
	AUTOSTART: 'autostart',
	EXTERNAL: 'external',
	INTERACTION: 'interaction',
	PLAYLIST: 'playlist',
	RELATED_AUTO: 'related-auto',
};

export default JWEvents;
