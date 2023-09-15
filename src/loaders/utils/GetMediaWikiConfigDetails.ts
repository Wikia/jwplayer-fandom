import { WindowWithMW } from '../types';

declare let window: WindowWithMW;

interface MediaWikiConfigDetails {
	wikiId: string;
	isTier3Wiki: boolean;
}

interface WgArticleFeaturedVideo {
	lang: string;
	mediaId: string;
	isDedicatedForArticle: boolean;
	impressionsPerSession: number;
	tier3Mapping: boolean;
}

export function getMediaWikiConfigDetails(): MediaWikiConfigDetails {
	const config = window?.mw?.config;
	const wikiId = config?.get<string>('wgCityId');
	const isTier3Wiki = config?.get<WgArticleFeaturedVideo>('wgArticleFeaturedVideo')?.tier3Mapping ?? false;

	return {
		wikiId,
		isTier3Wiki,
	};
}
