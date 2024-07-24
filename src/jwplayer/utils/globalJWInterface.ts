/**
 * This interface should only be used outside the context of react. In general, we want to use the PlayerContext instead
 * however, for tracking events we want to trigger those more outside of the declaractive scope that react adds which can
 * lead to bugs when working with an imperative API such as window.JWPlayer
 */
import { Player } from 'jwplayer/types';

export interface WindowWithJWPlayer {
	jwplayer: (playerId: string | null) => Player;
}

declare let window: WindowWithJWPlayer;

// Ensure all of these operations are safe
const withTryCatchDefault =
	<T>(func: (playerId: string) => T, fallback = '') =>
	(playerId: string) => {
		// JWPLayer not yet ready
		if (typeof window === 'undefined' || !window.jwplayer || typeof window.jwplayer !== 'function') {
			return '';
		}

		try {
			return func(playerId);
		} catch (e) {
			return fallback;
		}
	};

export const getAutoPlayState = withTryCatchDefault<boolean | undefined>((playerId: string) => {
	return window.jwplayer(playerId).getConfig().autostart;
});

// TODO ENSURE this is the Playlist and not the video id
export const getPlayListId = withTryCatchDefault<string>((playerId: string) => {
	return window.jwplayer(playerId).getPlaylistItem().mediaid;
});

export const getVideoVolume = withTryCatchDefault<number>((playerId: string) => {
	if (window.jwplayer(playerId).getMute()) {
		return 0;
	}

	return window.jwplayer(playerId).getVolume();
});

// Continue with all functions here to enable everything in PROPERTY_NAMES

export const getPlayHeadPosition = withTryCatchDefault<number>((playerId: string) => {
	return window.jwplayer(playerId).getPosition();
});

export const getCurrentQuality = withTryCatchDefault<number>((playerId: string) => {
	return window.jwplayer(playerId).getCurrentQuality();
});

export const getIsCurrentlyViewable = withTryCatchDefault<number | boolean>((playerId: string) => {
	return !!window.jwplayer(playerId).getViewable() ?? false;
});

export const getPlaylistPosition = withTryCatchDefault<number>((playerId: string) => {
	return window.jwplayer(playerId).getPlaylistIndex() + 1;
});

export const getDuration = withTryCatchDefault<number>((playerId: string) => {
	return window.jwplayer(playerId).getDuration();
});

export const getPlayerId = withTryCatchDefault<string | undefined>((playerId: string) => {
	return 'jw-' + window.jwplayer(playerId).getConfig().pid;
});

export const getAssetTitle = withTryCatchDefault<string>((playerId: string) => {
	return !playerId ? '' : window.jwplayer(playerId).getPlaylistItem().title;
});

export const getAssetId = withTryCatchDefault<string | undefined>((playerId: string) => {
	return !playerId ? '' : window.jwplayer(playerId).getPlaylistItem().mediaid;
});

export const getPublishDate = withTryCatchDefault<number | undefined>((playerId: string) => {
	return window.jwplayer(playerId).getPlaylistItem().pubdate;
});

export const getIsInteractable = withTryCatchDefault<boolean | null>(() => {
	return false;
});

export const getJWAdBlockState = withTryCatchDefault<boolean>((playerId: string) => {
	return window.jwplayer(playerId).getAdBlock();
});

export const getJWViewState = withTryCatchDefault<string>((playerId: string) => {
	if (window.jwplayer(playerId).getFloating()) {
		return 'pip';
	}

	if (window.jwplayer(playerId).getFullscreen()) {
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

export const getJWQualityManifest = withTryCatchDefault<string>((playerId: string) => {
	return window
		.jwplayer(playerId)
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
