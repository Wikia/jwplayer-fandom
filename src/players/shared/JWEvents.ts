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

	// Ad Events
	AD_LOADED: 'adLoaded',
	AD_PLAY: 'adPlay',
	AD_FINISHED: 'adComplete',

	// Playlist
	PLAYLIST_LOADED: 'playlist',
	PLAYLIST_CHANGE: 'playlistItem',
};

// •autostart
//  • external (API usage)
//  • interaction (click, touch, keyboard)
//  • playlist (due to autoadvancing)
//  • related-auto (auto-advancing JW Recommendations
export const PLAY_REASONS = {
	AUTOSTART: 'autostart',
	EXTERNAL: 'external',
	INTERACTION: 'interaction',
	PLAYLIST: 'playlist',
	RELATED_AUTO: 'related-auto',
};

export default JWEvents;
