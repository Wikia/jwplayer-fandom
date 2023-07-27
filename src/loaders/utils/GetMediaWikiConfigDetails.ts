import { WindowWithMW } from '../types';

declare let window: WindowWithMW;

interface MediaWikiConfigDetails {
	wikiId: string;
	isTier3Wiki: boolean;
}

export function getMediaWikiConfigDetails(): MediaWikiConfigDetails {
	const config = window?.mw?.config;
	const wikiId = config?.get('wgCityId');
	const isTier3Wiki = config?.get('wgArticleFeaturedVideo')?.tier3Mapping ?? false;

	return {
		wikiId,
		isTier3Wiki,
	};
}
