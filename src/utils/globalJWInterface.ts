/**
 * This interface should only be used outside the context of react. In general, we want to use the PlayerContext instead
 * however, for tracking events we want to trigger those more outside of the declaractive scope that react adds which can
 * lead to bugs when working with an imperative API such as window.JWPlayer
 */
import { Player } from 'types';
import withTryCatchDefault from "utils/withTryCatchDefault";

export interface WindowWithJWPlayer extends Window {
	jwplayer: () => Player;
	currentPlaylistItemWirewax: boolean | null;
	__isDedicatedForArticle: boolean;
}

declare let window: WindowWithJWPlayer;

export const getAutoPlayState = withTryCatchDefault(() => {
	return !!window.jwplayer().getConfig().autostart;
});

// TODO ENSURE this is the Playlist and not the video id
export const getPlayListId = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().mediaid;
});

export const getVideoVolume = withTryCatchDefault(() => {
	if (window.jwplayer().getMute()) {
		return 0;
	}

	return window.jwplayer().getVolume();
});

export const getPlayHeadPosition = withTryCatchDefault(() => {
	return window.jwplayer().getPosition();
});

export const getCurrentQuality = withTryCatchDefault(() => {
	return window.jwplayer().getCurrentQuality();
});

export const getIsCurrentlyViewable = withTryCatchDefault(() => {
	return !!window.jwplayer().getViewable() ?? false;
});

export const getPlaylistPosition = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistIndex() + 1;
});

export const getDuration = withTryCatchDefault(() => {
	return window.jwplayer().getDuration();
});

export const getPlayerId = withTryCatchDefault(() => {
	return 'jw-' + window.jwplayer().getConfig().pid;
});

export const getAssetTitle = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().title;
});

export const getAssetId = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().mediaid;
});

export const getPublishDate = withTryCatchDefault(() => {
	return window.jwplayer().getPlaylistItem().pubdate;
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

	if (window.jwplayer().getFullscreen()) {
		return 'fullscreen';
	}

	if (document.querySelector('.featured-video.is-collapsed')) {
		return 'mini';
	}

	return 'standard';
});

// TODO Current not possible
export const getIsEmbed = withTryCatchDefault(() => {
	return false;
});

export const getJWQualityManifest = withTryCatchDefault(() => {
	return window
		.jwplayer()
		.getQualityLevels()
		.map((obj) => obj.label)
		.join(',');
});

// It reads to me like we'd generate that ourselves each time a new video is played, to tie together all the other events.' +
// ' Something like a hash that wouldn't need to be related to anything, just as long as all events for that CURRENT video have
// that dimension applied.
export const getUniqueStreamId = withTryCatchDefault(() => {
	// this should b
	return window;
});
