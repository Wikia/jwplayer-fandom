import trackerFactoryDataLayer, { ModuleTrackingFunction } from '@fandom/tracking-metrics/tracking/';
import { TrackData } from '@fandom/tracking-metrics/tracking/dataLayer';

const baseTrackParams: TrackData = {
	event: 'video-player-event',
};

export const CONTROLS_CATEGORY = 'controls';

const baseVideoTracker = trackerFactoryDataLayer(baseTrackParams);

export function trackerWithNewCategory(category: string) {
	return baseVideoTracker.extend({ categoryPrefixer: (cat) => category + cat });
}

export const CATEGORIES = {
	BASE_VIDEO_PLAYER: 'FandomVideoPlayer: mobile-article-video-', // simple skin
	MOBILE_ARTICLE_VIDEO_PLAYER: 'FandomVideoPlayer: mobile-article-video-', // mobile skin
	DESKTOP_ARTICLE_VIDEO_PLAYER: 'FandomVideoPlayer: desktop-article-video-', // desktop skin
	JW_PLAYER: 'FandomVideoPlayer: ', // Generic Events
};

export const baseVideoPlayerTracker = trackerWithNewCategory(CATEGORIES.BASE_VIDEO_PLAYER);
export const mobileArticleVideoPlayerTracker = trackerWithNewCategory(CATEGORIES.MOBILE_ARTICLE_VIDEO_PLAYER);
export const desktopArticleVideoPlayerTracker = trackerWithNewCategory(CATEGORIES.DESKTOP_ARTICLE_VIDEO_PLAYER);
export const jwPlayerVideoTracker = trackerWithNewCategory(CATEGORIES.JW_PLAYER);

export function withPlayerName(trackingFunction: ModuleTrackingFunction, playerName: string) {
	return trackingFunction.extend({
		playerName: playerName,
	});
}

const mappings = new Set<string>();
export function singleTrack(eventName: string) {
	if (mappings.has(eventName)) {
		return false;
	}

	mappings.add(eventName);
	return true;
}

export default baseVideoTracker;
