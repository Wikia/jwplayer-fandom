import { TrackData } from '@fandom/tracking-metrics/tracking/dataLayer';

interface MWConfig {
	get: (key: string) => unknown;
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
	USER_ID: 'user_id',

	// MW Specific
	COMMUNITY_ID: 'c',
	COMMUNITY_NAME: 'x',
	SKIN: 's',
	ARTICLE_ID: 'a',

	// Not in doc
	CONTENT_LANG: 'en', // TODO consider changing name
};

function getDefaultsFromMWConfig(): TrackData {
	const config = window.mw.config;
	const defaultTrackData: TrackData = {};

	// Add base tracking from mw
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
		// Set sane defaults
		defaultProps[GLOBAL_PROPS.SKIN] = 'unknown';

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
