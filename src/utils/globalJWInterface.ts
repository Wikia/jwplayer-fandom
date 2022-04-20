/**
 * This interface should only be used outside the context of react. In general, we want to use the PlayerContext instead
 * however, for tracking events we want to trigger those more outside of the declaractive scope that react adds which can
 * lead to bugs when working with an imperative API such as window.JWPlayer
 */
import { Player } from 'types';

export interface WindowWithJWPlayer {
	jwplayer: () => Player;
}

declare let window: WindowWithJWPlayer;

// Ensure all of these oeprations are safe
const withTryCatchDefault = (func: () => any, fallback = '') => {
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