/**
 * This interface should only be used outside the context of react. In general, we want to use the PlayerContext instead
 * however, for tracking events we want to trigger those more outside of the declaractive scope that react adds which can
 * lead to bugs when working with an imperative API such as window.JWPlayer
 */
import { Player } from 'jwplayer/types';

export interface WindowWithJWPlayer {
	jwplayer: () => Player;
	currentPlaylistItemWirewax: boolean | null;
}

declare let window: WindowWithJWPlayer;

// Ensure all of these operations are safe
const withTryCatchDefault =
	<T>(func: () => T, fallback = '') =>
	() => {
		// JWPLayer not yet ready
		if (typeof window === 'undefined' || !window.jwplayer || typeof window.jwplayer !== 'function') {
			return '';
		}

		try {
			return func();
		} catch (e) {
			return fallback;
		}
	};

export const getAutoPlayState = withTryCatchDefault<boolean | undefined>(() => {
	return window.jwplayer().getConfig().autostart;
});

// TODO ENSURE this is the Playlist and not the video id
export const getPlayListId = withTryCatchDefault<string>(() => {
	return window.jwplayer().getPlaylistItem().mediaid;
});

export const getVideoVolume = withTryCatchDefault<number>(() => {
	if (window.jwplayer().getMute()) {
		return 0;
	}

	return window.jwplayer().getVolume();
});

// Continue with all functions here to enable everything in PROPERTY_NAMES

export const getPlayHeadPosition = withTryCatchDefault<number>(() => {
	return window.jwplayer().getPosition();
});

export const getCurrentQuality = withTryCatchDefault<number>(() => {
	return window.jwplayer().getCurrentQuality();
});

export const getIsCurrentlyViewable = withTryCatchDefault<number | boolean>(() => {
	return !!window.jwplayer().getViewable() ?? false;
});

export const getPlaylistPosition = withTryCatchDefault<number>(() => {
	return window.jwplayer().getPlaylistIndex() + 1;
});

export const getDuration = withTryCatchDefault<number>(() => {
	return window.jwplayer().getDuration();
});

export const getPlayerId = withTryCatchDefault<string | undefined>(() => {
	return 'jw-' + window.jwplayer().getConfig().pid;
});

export const getAssetTitle = withTryCatchDefault<string>(() => {
	return window.jwplayer().getPlaylistItem().title;
});

export const getAssetId = withTryCatchDefault<string | undefined>(() => {
	return window.jwplayer().getPlaylistItem().mediaid;
});

export const getPublishDate = withTryCatchDefault<number | undefined>(() => {
	return window.jwplayer().getPlaylistItem().pubdate;
});

export const getIsInteractable = withTryCatchDefault<boolean | null>(() => {
	return !!window.currentPlaylistItemWirewax;
});

export const getJWAdBlockState = withTryCatchDefault<boolean>(() => {
	return window.jwplayer().getAdBlock();
});

export const getJWViewState = withTryCatchDefault<string>(() => {
	if (window.jwplayer().getFloating()) {
		return 'pip';
	}

	if (window.jwplayer().getFullscreen()) {
		return 'fullscreen';
	}

	if (document.querySelector('.featured-video.is-collapsed')) {
		return 'mini';
	}

	return 'standard';
});

// TODO Current not possible
export const getIsEmbed = withTryCatchDefault<false>(() => {
	return false;
});

export const getJWQualityManifest = withTryCatchDefault<string>(() => {
	return window
		.jwplayer()
		.getQualityLevels()
		.map((obj) => obj.label)
		.join(',');
});

// It reads to me like we'd generate that ourselves each time a new video is played, to tie together all the other events.' +
// ' Something like a hash that wouldn't need to be related to anything, just as long as all events for that CURRENT video have
// that dimension applied.
export const getUniqueStreamId = withTryCatchDefault<WindowWithJWPlayer>(() => {
	// this should b
	return window;
});
