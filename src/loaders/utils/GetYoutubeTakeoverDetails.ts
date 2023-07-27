import { isServerSide } from 'utils/getEnv';
import getValueFromQuery from 'utils/getValuefromQuery';
import { getArticleVideoServiceBaseUrl } from 'utils/getPandoraDetails';
import { trackYoutubeTakeoverDetails, YoutubePlayerTrackingProps } from 'youtube/players/shared/youtubeTrackingEvents';
import { YoutubeTakeOverDetails, YoutubeTakeoverResponse } from 'youtube/types';
import { getMediaWikiConfigDetails } from 'loaders/utils/GetMediaWikiConfigDetails';

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

export async function getYoutubeTakeoverDetails({
	deviceType,
}: YoutubePlayerTrackingProps): Promise<YoutubeTakeOverDetails> {
	const youtubeTakeoverDetails: YoutubeTakeOverDetails = { isYoutubeTakeover: false };
	if (isServerSide()) {
		return youtubeTakeoverDetails;
	}

	const forcedYoutubeEmbedVideoId = getValueFromQuery('youtube_embed_video_id');
	if (forcedYoutubeEmbedVideoId) {
		youtubeTakeoverDetails.isYoutubeTakeover = true;
		youtubeTakeoverDetails.youtubeVideoId = forcedYoutubeEmbedVideoId;
		console.debug('Youtube Takeover: Found the youtube_embed_video_id query param', youtubeTakeoverDetails);
		return youtubeTakeoverDetails;
	}

	const { wikiId, isTier3Wiki } = getMediaWikiConfigDetails();
	// If the wikiId is not found for some reason or if the wiki is a tier3 wiki,
	// then just return the default youtubeTakeoverDetails that include the isYoutubeTakeover set to false
	if (!wikiId || isTier3Wiki) {
		return youtubeTakeoverDetails;
	}

	const response = await fetch(getYoutubeTakeoverUrl(wikiId));
	const dataArray = (await response.json()) as YoutubeTakeoverResponse[];
	const wikiYoutubeTakeoverDetails = dataArray?.length === 1 ? dataArray[0] : null;

	if (
		wikiYoutubeTakeoverDetails?.youtube_take_over &&
		wikiYoutubeTakeoverDetails?.takeover_video_id?.trim().length !== 0
	) {
		youtubeTakeoverDetails.isYoutubeTakeover = wikiYoutubeTakeoverDetails.youtube_take_over;
		youtubeTakeoverDetails.youtubeVideoId = wikiYoutubeTakeoverDetails.takeover_video_id;
		console.debug(
			'Youtube Takeover: Eligible for youtube takeover based on the targeting params.',
			youtubeTakeoverDetails,
			wikiYoutubeTakeoverDetails,
		);
		trackYoutubeTakeoverDetails({ deviceType, youtubeVideoId: youtubeTakeoverDetails.youtubeVideoId });
	}

	return youtubeTakeoverDetails;
}

export const eligibleForYoutubeTakeover = (youtubeTakeoverDetails: YoutubeTakeOverDetails) => {
	const youtubeTakeoverFlag = youtubeTakeoverDetails.isYoutubeTakeover;
	const isVideoIdValidLength =
		youtubeTakeoverDetails?.youtubeVideoId && youtubeTakeoverDetails?.youtubeVideoId?.length !== 0;
	return youtubeTakeoverFlag && isVideoIdValidLength;
};
