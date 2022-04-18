import trackerFactoryDataLayer from '@fandom/tracking-metrics/tracking/';
import { TrackData } from '@fandom/tracking-metrics/tracking/dataLayer';

const baseTrackParams: TrackData = {
	event: 'video-player-event',
};

const baseVideoTracker = trackerFactoryDataLayer(baseTrackParams);

export function trackerWithNewCategory(category: string) {
	return baseVideoTracker.extend({ category });
}

export const CATEGORIES = {
	BASE_VIDEO_PLAYER: 'base-video-player', // simple skin
	MOBILE_ARTICLE_VIDEO_PLAYER: 'mobile-video-player', // mobile skin
	DESKTOP_ARTICLE_VIDEO_PLAYER: 'desktop-video-player', // desktop skin
	JW_PLAYER: 'jw-video-player', // base JW level data
};

export const baseVideoPlayerTracker = trackerWithNewCategory(CATEGORIES.BASE_VIDEO_PLAYER);
export const mobileArticleVideoPlayerTracker = trackerWithNewCategory(CATEGORIES.MOBILE_ARTICLE_VIDEO_PLAYER);
export const desktopArticleVideoPlayerTracker = trackerWithNewCategory(CATEGORIES.DESKTOP_ARTICLE_VIDEO_PLAYER);
export const jwPlayerVideoTracker = trackerWithNewCategory(CATEGORIES.JW_PLAYER);

const mappings = new Set<string>();
export function shouldTriggerImpression(eventName: string) {
	if (mappings.has(eventName)) {
		return false;
	}

	mappings.add(eventName);
	return true;
}

export default baseVideoTracker;
