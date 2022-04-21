import { TrackData } from '@fandom/tracking-metrics/tracking/dataLayer';
import getCookieValue from 'utils/getCookieValue';

interface MWConfig {
	get: (key: string) => any;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW {
	mw: MW;
}

declare let window: WindowWithMW;

export const GLOBAL_PROPS = {
	// Confirmed
	BEACON_ID: 'beacon',
	BEACON_ID2: 'b2',
	PAGE_VIEW_ID: 'pv_unique_id',
	TIMESTAMP: 'timestamp', // acts as cache buster too
	USER_ID: 'userId',

	// MW Specific
	COMMUNITY_ID: 'c', // TODO Consider changing name
	COMMUNITY_NAME: 'x', // TODO Consider changing name
	CONTENT_LANG: 'en', // TODO consider changing name
	SKIN: 's', // TODO Consider changing name
	ARTICLE_ID: 'a', // TODO Consider changing name
};

function getDefaultsFromMWConfig(): TrackData {
	const config = window.mw.config;
	const defaultTrackData: TrackData = {};

	// Add base tracking from mw
	defaultTrackData[GLOBAL_PROPS.BEACON_ID] = config.get('beaconId');
	defaultTrackData[GLOBAL_PROPS.BEACON_ID2] = config.get('b2');
	defaultTrackData[GLOBAL_PROPS.PAGE_VIEW_ID] = config.get('pvUID');
	defaultTrackData[GLOBAL_PROPS.USER_ID] = config.get('wgUserId');
	defaultTrackData[GLOBAL_PROPS.COMMUNITY_ID] = config.get('wgCityId');
	defaultTrackData[GLOBAL_PROPS.COMMUNITY_NAME] = config.get('wgDBname');
	defaultTrackData[GLOBAL_PROPS.CONTENT_LANG] = config.get('wgContentLanguage');
	defaultTrackData[GLOBAL_PROPS.SKIN] = config.get('skin');
	defaultTrackData[GLOBAL_PROPS.ARTICLE_ID] = config.get('wgArticleId');

	return defaultTrackData;
}

export default function addGlobalProps(): TrackData {
	try {
		let defaultProps: TrackData = {};

		// Add base ones consistent from any app
		defaultProps[GLOBAL_PROPS.TIMESTAMP] = Date.now().toString();
		defaultProps[GLOBAL_PROPS.BEACON_ID] = getCookieValue('wikia_beacon_id');
		defaultProps[GLOBAL_PROPS.BEACON_ID2] = getCookieValue('_b2');

		// If we are on MW lets add them this way
		if (window && window.mw && window.mw.config) {
			defaultProps = { ...defaultProps, ...getDefaultsFromMWConfig() };
		}

		return defaultProps;
	} catch (e) {
		console.error('Failed to add global props', e);
		return {};
	}
}
