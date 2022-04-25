import { trackerFactoryWithoutDevPrefix } from '@fandom/tracking-metrics/tracking/';
import { TrackData } from '@fandom/tracking-metrics/tracking/dataLayer';
import {
	getAutoPlayState,
	getCurrentQuality,
	getIsCurrentlyViewable,
	getPlayHeadPosition,
	getVideoVolume,
	getPlaylistPosition,
	getDuration,
	getPlayerId,
	getAssetTitle,
	getAssetId,
	getPublishDate,
	getIsInteractable,
	getJWAdBlockState,
	getJWViewState,
	getIsEmbed,
	getJWQualityManifest,
} from 'utils/globalJWInterface';
import addGlobalProps from 'utils/videoTrackingGlobalProps';
import getVideoPlayerVersion from 'utils/getVideoPlayerVersion';

// https://docs.google.com/spreadsheets/d/1jEn61uIP8dYE8KQP3nrMG3nePFArgxrs3Q4lxTcArZQ/edit#gid=1564524057
export const PROPERTY_NAMES = {
	// Ready
	VIDEO_ASSET_ID: 'video_asset_id',
	VIDEO_ASSET_TITLE: 'video_asset_title',
	VIDEO_AUTO_PLAY_STATE: 'video_autoplay_state',
	VIDEO_CURRENT_QUALITY: 'video_current_quality',
	VIDEO_DURATION: 'video_duration',
	VIDEO_IS_INTERACTABLE: 'video_is_interactable',
	VIDEO_IS_VIEWABLE: 'video_player_is_viewable',
	VIDEO_JW_AD_BLOCK_STATE: 'video_jw_adblock_state',
	VIDEO_PLAYER: 'video_player',
	VIDEO_PLAYHEAD_POSITION: 'video_playhead_position',
	VIDEO_PLAYLIST_ID: 'video_playlist_id',
	VIDEO_PLAYLIST_POSITION: 'video_playlist_position',
	VIDEO_PUBLISH_DATE: 'video_publish_date',
	VIDEO_VOLUME_LEVEL: 'video_volume_level',

	// TODO - Not yet implemented
	VIDEO_STREAM_ID: 'video_stream_id',
	VIDEO_QUALITY_MANIFEST: 'video_quality_manifest',
	VIDEO_IS_EMBEDDED: 'video_is_embedded',
	VIDEO_PLACEMENT: 'video_placement',
	VIDEO_COLLECTION: 'video_collection',
	VIDEO_SERIES_NAME: 'video_series_name',
	VIDEO_SERIES_ID: 'video_series_id',
	VIDEO_VIEW_STATE: 'video_view_state',

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
	const trackDataObject: TrackData = { ...addGlobalProps(), ...trackingParams };

	trackDataObject[PROPERTY_NAMES.VIDEO_AUTO_PLAY_STATE] = getAutoPlayState();
	trackDataObject[PROPERTY_NAMES.VIDEO_VOLUME_LEVEL] = getVideoVolume();
	trackDataObject[PROPERTY_NAMES.VIDEO_CURRENT_QUALITY] = getCurrentQuality();
	trackDataObject[PROPERTY_NAMES.VIDEO_PLAYHEAD_POSITION] = getPlayHeadPosition();
	trackDataObject[PROPERTY_NAMES.VIDEO_IS_VIEWABLE] = getIsCurrentlyViewable();
	trackDataObject[PROPERTY_NAMES.VIDEO_JW_AD_BLOCK_STATE] = getJWAdBlockState();
	trackDataObject[PROPERTY_NAMES.VIDEO_PLAYLIST_POSITION] = getPlaylistPosition();
	trackDataObject[PROPERTY_NAMES.VIDEO_IS_INTERACTABLE] = getIsInteractable();
	trackDataObject[PROPERTY_NAMES.VIDEO_ASSET_TITLE] = getAssetTitle();
	trackDataObject[PROPERTY_NAMES.VIDEO_ASSET_ID] = getAssetId();
	trackDataObject[PROPERTY_NAMES.VIDEO_PUBLISH_DATE] = getPublishDate();
	trackDataObject[PROPERTY_NAMES.VIDEO_DURATION] = getDuration();
	trackDataObject[PROPERTY_NAMES.VIDEO_PLAYER] = getPlayerId();
	trackDataObject[PROPERTY_NAMES.VIDEO_VIEW_STATE] = getJWViewState();
	trackDataObject[PROPERTY_NAMES.VIDEO_IS_EMBEDDED] = getIsEmbed();
	trackDataObject[PROPERTY_NAMES.VIDEO_QUALITY_MANIFEST] = getJWQualityManifest();

	// TO BE ADDED LATER
	// trackDataObject[PROPERTY_NAMES.VIDEO_COLLECTION] = getCollection();
	// trackDataObject[PROPERTY_NAMES.VIDEO_SERIES_NAME] = getSeriesName()
	// trackDataObject[PROPERTY_NAMES.VIDEO_SERIES_ID] = getSeriesId();

	// TODO Move this to GTM or Tracking library
	try {
		const query = new URLSearchParams();

		// Delete some stuff we don't want to send to DW
		try {
			delete trackDataObject.withRunTimeParams;
			delete trackDataObject.isDebug;
		} catch (e) {
			// ignore
		}

		const keyValues = Object.entries(trackDataObject);

		keyValues.forEach((pairs: [string, any]) => {
			query.append(pairs[0], pairs[1]);
		});

		if (navigator && typeof navigator.sendBeacon === 'function') {
			navigator.sendBeacon('https://beacon.wikia-services.com/__track/special/video?' + query.toString());
		} else {
			fetch('https://beacon.wikia-services.com/__track/special/video?' + query.toString()).catch(console.error);
		}
	} catch (e) {
		console.error('Error sending beacon event', e);
	}

	return trackDataObject;
}

const baseTrackParams: TrackData = {
	event: 'video-player-event',
	video_player_version: getVideoPlayerVersion(),
	withRunTimeParams: addRunTimeParams,
	video_player: 'jw',
};

const baseVideoTracker = trackerFactoryWithoutDevPrefix(baseTrackParams);

export function trackerWithNewCategory(category: string) {
	return baseVideoTracker.extend({ category: category });
}

export const EVENT_CATEGORIES = {
	PLAYBACK: 'playback',
	AD: 'ad',
	CONTENT: 'content',
	WIREWAX: 'wirewax',
};

export const jwPlayerPlaybackTracker = trackerWithNewCategory(EVENT_CATEGORIES.PLAYBACK);
export const jwPlayerAdTracker = trackerWithNewCategory(EVENT_CATEGORIES.AD);
export const jwPlayerContentTracker = trackerWithNewCategory(EVENT_CATEGORIES.CONTENT);
export const jwPlayerWirewaxTracker = trackerWithNewCategory(EVENT_CATEGORIES.WIREWAX);

const mappings = new Set<string>();
export function singleTrack(eventName: string) {
	if (mappings.has(eventName)) {
		return false;
	}

	mappings.add(eventName);
	return true;
}
