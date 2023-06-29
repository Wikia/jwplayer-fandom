import { WindowWithMW } from 'youtube/types';

declare let window: WindowWithMW;

export function getMediaWikiConfigDetails() {
	const config = window?.mw?.config;
	const wikiId = config?.get('wgCityId');
	const isTier3Wiki = config?.get('wgArticleFeaturedVideo')?.tier3Mapping ?? false;

	return {
		wikiId,
		isTier3Wiki,
	};
}
