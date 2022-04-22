/**
 * This interface should only be used outside the context of react. In general, we want to use the PlayerContext instead
 * however, for tracking events we want to trigger those more outside of the declaractive scope that react adds which can
 * lead to bugs when working with an imperative API such as window.JWPlayer
 */
import { Player } from 'types';

export interface WindowWithJWPlayer {
	jwplayer: () => Player;
	currentPlaylistItemWirewax: boolean | null;
}

declare let window: WindowWithJWPlayer;

// Ensure all of these oeprations are safe
const withTryCatchDefault =
	(func: () => any, fallback = '') =>
	() => {
		try {
			return func();
		} catch (e) {
			return fallback;
		}
	};

export const getAutoPlayState = withTryCatchDefault(() => {
	return window.jwplayer().getConfig().autostart;
});

// TODO ENSURE this is the Playlist and not the video id
export const getPlayListId = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().mediaid;
});

export const getVideoVolume = withTryCatchDefault(() => {
	return window.jwplayer().getVolume();
});

// Continue with all functions here to enable everything in PROPERTY_NAMES

export const getPlayHeadPosition = withTryCatchDefault(() => {
	return window.jwplayer().getPosition();
});

export const getCurrentQuality = withTryCatchDefault(() => {
	return window.jwplayer().getCurrentQuality();
});

export const getIsCurrentlyViewable = withTryCatchDefault(() => {
	return !!window.jwplayer().getViewable();
});

export const getPlaylistPosition = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistIndex() + 1;
});

export const getDuration = withTryCatchDefault(() => {
	return window.jwplayer().getDuration();
});

export const getPlayerId = withTryCatchDefault(() => {
	return window.jwplayer().getConfig().pid;
});

export const getAssetTitle = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().title;
});

export const getAssetId = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().mediaid;
});

export const getPublishDate = withTryCatchDefault(() => {
	window.jwplayer().getPlaylistItem().pubdate;
});

export const getIsInteractable = withTryCatchDefault(() => {
	return !!window.currentPlaylistItemWirewax;
});

export const getJWAdBlockState = withTryCatchDefault(() => {
	return window.jwplayer().getAdBlock();
});

export const getJWViewState = withTryCatchDefault(() => {
	if (window.jwplayer().getFloating()) {
		return 'pip';
	}

	if (window.jwplayer().getFullScreen()) {
		return 'fullscreen';
	}

	// TODO Add this state
	if (document.querySelector('#check-for-the-mini-featured-player')) {
		return 'mini';
	}

	return 'standard';
});
