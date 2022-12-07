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
		console.debug(
			`Youtube Takeover: Found the youtube_embed_video_id query param, with a value of ${forcedYoutubeEmbedVideoId}`,
		);
		youtubeTakeoverDetails.isYoutubeTakeover = true;
		youtubeTakeoverDetails.youtubeVideoId = forcedYoutubeEmbedVideoId;
		return youtubeTakeoverDetails;
	}

	const config = window?.mw?.config;
	const wikiId = config?.get('wgCityId');
	const isTier3Wiki = config?.get('wgArticleFeaturedVideo')?.tier3Mapping ?? false;

	// If the wikiId is not found for some reason or if the wiki is a tier3 wiki,
	// then just return the default youtubeTakeoverDetails that include the isYoutubeTakeover set to false
	if (!wikiId || isTier3Wiki) {
		console.debug(`Youtube Takeover: Youtube video embed check. wikiId: ${wikiId} | isTier3Wiki: ${isTier3Wiki}`);
		return youtubeTakeoverDetails;
	}

	const response = await fetch(getYoutubeTakeoverUrl(wikiId));
	const dataArray = (await response.json()) as YoutubeTakeoverResponse[];
	console.debug(`Youtube Takeover: dataArray - ${dataArray}`);
	const wikiYoutubeTakeoverDetails = dataArray?.length === 1 ? dataArray[0] : null;
	console.debug(`Youtube Takeover: wikiYoutubeTakeoverDetails - ${wikiYoutubeTakeoverDetails}`);

	if (
		wikiYoutubeTakeoverDetails?.youtube_take_over &&
		wikiYoutubeTakeoverDetails?.youtube_video_id?.trim().length !== 0
	) {
		console.debug('Youtube Takeover: Eligible for youtube takeover based on the targeting params.');
		youtubeTakeoverDetails.isYoutubeTakeover = wikiYoutubeTakeoverDetails.youtube_take_over;
		youtubeTakeoverDetails.youtubeVideoId = wikiYoutubeTakeoverDetails.youtube_video_id;
		trackYoutubeTakeoverDetails({ deviceType: deviceType, youtubeVideoId: youtubeTakeoverDetails.youtubeVideoId });
	}

	return youtubeTakeoverDetails;
}

export const eligibleForYoutubeTakeover = (youtubeTakeoverDetails: YoutubeTakeOverDetails) => {
	const youtubeTakeoverFlag = youtubeTakeoverDetails.isYoutubeTakeover;
	const isVideoIdValidLength =
		youtubeTakeoverDetails?.youtubeVideoId && youtubeTakeoverDetails?.youtubeVideoId?.length !== 0;
	console.log(
		`Youtube Takeover: eligibleForYoutubeTakeover - youtubeTakeoverFlag: ${youtubeTakeoverFlag} | isVideoIdValidLength: ${isVideoIdValidLength}`,
	);
	return youtubeTakeoverFlag && isVideoIdValidLength;
};
