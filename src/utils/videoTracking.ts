import trackerFactoryDataLayer, { ModuleTrackingFunction } from '@fandom/tracking-metrics/tracking/';
import { TrackData } from '@fandom/tracking-metrics/tracking/dataLayer';
import { Player } from 'types';
import {
	getAutoPlayState,
	getCurrentQuality,
	getIsCurrentlyViewable,
	getPlayHeadPosition,
	getVideoVolume,
} from 'utils/globalJWInterface';

export interface WindowWithJWPlayer {
	jwplayer: Player;
}

// https://docs.google.com/spreadsheets/d/1jEn61uIP8dYE8KQP3nrMG3nePFArgxrs3Q4lxTcArZQ/edit#gid=1564524057
export const PROPERTY_NAMES = {
	// Base
	EVENT_NAME: 'event_name',

	VIDEO_AUTO_PLAY_STATE: 'video_autoplay_state', // done
	VIDEO_PLAYLIST_ID: 'video_playlist_id', // done
	VIDEO_PLACEMENT: 'video_placement',

	// WARREN
	VIDEO_PLAYLIST_POSITION: 'video_playlist_position',
	VIDEO_COLLECTION: 'video_collection',
	VIDEO_IS_INTERACTABLE: 'video_is_interactable',
	VIDEO_PLAYER: 'video_player',
	VIDEO_SERIES_NAME: 'video_series_name',
	VIDEO_SERIES_ID: 'video_series_id',
	VIDEO_ASSET_TITLE: 'video_asset_title',
	VIDEO_ASSET_ID: 'video_asset_id',
	VIDEO_VOLUME_LEVEL: 'video_volume_level', // done
	VIDEO_PUBLISH_DATE: 'video_publish_date',
	VIDEO_DURATION: 'video_duration',

	// JOSH
	VIDEO_PLAYHEAD_POSITION: 'video_playhead_position', // done
	VIDEO_JW_AD_BLOCK_STATE: 'video_jw_adblock_state',
	VIDEO_IS_EMBEDDED: 'video_is_embedded',
	VIDEO_QUALITY_MANIFEST: 'video_quality_manifest',
	VIDEO_CURRENT_QUALITY: 'video_current_quality', // done
	VIDEO_VIEW_STATE: 'video_view_state',
	VIDEO_IS_VIEWABLE: 'video_player_is_viewable', //
	VIDEO_STREAM_ID: 'video_stream_id',

	// GA
	GA_VISITOR_ID: 'ga_visitor_id',

	// Ad Stuff
	VIDEO_AD_POD_TYPE: 'video_ad_pod_type',
	VIDEO_AD_POD_DURATION: 'video_ad_pod_duration',
	VIDEO_AD_CREATIVE_NAME: 'video_ad_creative_name',
	VIDEO_AD_CREATIVE_ID: 'video_ad_creative_id',
	VIDEO_AD_ADVERTISER_NAME: 'video_ad_advertiser_name',
	VIDEO_AD_DURATION: 'video_ad_duration',
	VIDEO_AD_SECONDS_VIEWED: 'video_ad_seconds_viewed',

	VIDEO_ERROR_CODE: 'video_player_error_code',
	VIDEO_SHARE_METHOD: 'video_share_method',

	/** BELOW EVENTS SHOULD NOT BE TRACKED IN GA * */
	VIDEO_CONTENT_SECONDS_VIEWED: 'video_content_seconds_viewed',

	// Seeking
	VIDEO_SEEK_START_POSITION: 'video_seek_start_position',
	VIDEO_SEEK_END_POSITION: 'video_seek_end_position',
	VIDEO_SEEK_METHOD: 'video_seek_method',

	// General Performance
	VIDEO_TIME_TO_FIRST_FRAME: 'video_time_to_first_frame',
	VIDEO_STARTUP_TIME: 'video_startup_time',
};

function addRunTimeParams(trackingParams: TrackData): TrackData {
	const trackDataObject: TrackData = { ...trackingParams };

	trackDataObject[PROPERTY_NAMES.VIDEO_AUTO_PLAY_STATE] = getAutoPlayState();
	trackDataObject[PROPERTY_NAMES.VIDEO_VOLUME_LEVEL] = getVideoVolume();

	// Josh
	trackDataObject[PROPERTY_NAMES.VIDEO_CURRENT_QUALITY] = getCurrentQuality();
	trackDataObject[PROPERTY_NAMES.VIDEO_PLAYHEAD_POSITION] = getPlayHeadPosition();
	trackDataObject[PROPERTY_NAMES.VIDEO_IS_VIEWABLE] = getIsCurrentlyViewable();

	// ... TODO add them all here

	return trackDataObject;
}

const baseTrackParams: TrackData = {
	event: 'video-player-event',
	withRunTimeParams: addRunTimeParams,
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
