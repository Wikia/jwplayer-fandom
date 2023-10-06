import { getArticleVideoServiceBaseUrl } from 'utils/getPandoraDetails';
import { getMediaWikiConfigDetails } from 'loaders/utils/GetMediaWikiConfigDetails';
import { TakeoverResponse } from 'loaders/types';

function getTakeoverUrl(wikiId: string): string {
	const articleVideoBaseUrl = getArticleVideoServiceBaseUrl();
	if (articleVideoBaseUrl.length === 0) {
		return articleVideoBaseUrl;
	}
	if (!wikiId) {
		return '';
	}
	return `${articleVideoBaseUrl}takeover/v1/takeover-mappings/${wikiId}`;
}

export async function getTakeoverDetails() {
	const { wikiId, isTier3Wiki } = getMediaWikiConfigDetails();
	if (!wikiId || isTier3Wiki) {
		return null;
	}

	const response: Response = await fetch(getTakeoverUrl(wikiId));
	const [data] = (await response.json()) as TakeoverResponse[];

	if (!data) {
		return;
	}

	return {
		type: data.youtube_take_over ? 'youtube' : 'vimeo',
		videoId: data.takeover_video_id,
	};
}
