import { isServerSide } from 'utils/getEnv';
import getValueFromQuery from 'utils/getValuefromQuery';
import { getArticleVideoServiceBaseUrl } from 'utils/getPandoraDetails';
import { trackYoutubeTakeoverDetails, YoutubePlayerTrackingProps } from 'youtube/players/shared/youtubeTrackingEvents';

function getYoutubeTakeoverUrl(wikiId?: string): string {
	const articleVideoBaseUrl = getArticleVideoServiceBaseUrl();
	if (articleVideoBaseUrl.length === 0) {
		return articleVideoBaseUrl;
	}
	if (!wikiId) {
		return '';
	}
	return `${articleVideoBaseUrl}youtube/v1/youtube-takeover-mappings/${wikiId}`;
}

interface MWConfig {
	get: (key: string) => any;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW extends Window {
	mw: MW;
}

export interface YoutubeTakeoverResponse {
	product: string;
	id: string;
	impression_per_session: number;
	youtube_take_over: boolean;
	youtube_video_id: string;
}

export interface YoutubeTakeOverDetails {
	isYoutubeTakeover?: boolean;
	youtubeVideoId?: string;
}

declare let window: WindowWithMW;

export async function getYoutubeTakeoverDetails({
	deviceType,
}: YoutubePlayerTrackingProps): Promise<YoutubeTakeOverDetails> {
	const youtubeTakeoverDetails: YoutubeTakeOverDetails = { isYoutubeTakeover: false };
	if (isServerSide()) {
		return youtubeTakeoverDetails;
	}

	const forcedYoutubeEmbedVideoId = getValueFromQuery('youtube_embed_video_id');
	if (forcedYoutubeEmbedVideoId) {
		// If we can extract a youtube video id from the URL query params, then we can assume we want the youtube takeover
		youtubeTakeoverDetails.isYoutubeTakeover = true;
		youtubeTakeoverDetails.youtubeVideoId = forcedYoutubeEmbedVideoId;
		return youtubeTakeoverDetails;
	}

	const config = window?.mw?.config;
	const wikiId = config?.get('wgCityId');
	const isTier3Wiki = config?.get('wgArticleFeaturedVideo')?.tier3Mapping ?? false;

	if (!wikiId || !isTier3Wiki) {
		return youtubeTakeoverDetails;
	}

	const response = await fetch(getYoutubeTakeoverUrl(wikiId));
	const data = (await response.json()) as YoutubeTakeoverResponse;

	if (data?.youtube_take_over && data?.youtube_video_id?.trim().length !== 0) {
		youtubeTakeoverDetails.isYoutubeTakeover = data.youtube_take_over;
		youtubeTakeoverDetails.youtubeVideoId = data.youtube_video_id;
		trackYoutubeTakeoverDetails({ deviceType: deviceType, youtubeVideoId: youtubeTakeoverDetails.youtubeVideoId });
	}

	return youtubeTakeoverDetails;
}

export const eligibleForYoutubeTakeover = (youtubeTakeoverDetails: YoutubeTakeOverDetails) => {
	return youtubeTakeoverDetails.isYoutubeTakeover && youtubeTakeoverDetails?.youtubeVideoId?.length !== 0;
};
