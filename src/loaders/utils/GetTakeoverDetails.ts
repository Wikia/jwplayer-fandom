import { isServerSide } from 'utils/getEnv';
import getValueFromQuery from 'utils/getValuefromQuery';
import { getArticleVideoServiceBaseUrl } from 'utils/getPandoraDetails';
import { trackYoutubeTakeoverDetails, YoutubePlayerTrackingProps } from 'youtube/players/shared/youtubeTrackingEvents';
import { YoutubeTakeOverDetails } from 'youtube/types';
import { getMediaWikiConfigDetails } from 'loaders/utils/GetMediaWikiConfigDetails';
import { VimeoTakeOverDetails } from 'vimeo/types';

function getTakeoverUrl(wikiId?: string): string {
	const articleVideoBaseUrl = getArticleVideoServiceBaseUrl();
	if (articleVideoBaseUrl.length === 0) {
		return articleVideoBaseUrl;
	}
	if (!wikiId) {
		return '';
	}
	return `${articleVideoBaseUrl}takeover/v1/takeover-mappings/${wikiId}`;
}

export async function getTakeoverDetails({ deviceType }: YoutubePlayerTrackingProps) {
	const { wikiId, isTier3Wiki } = getMediaWikiConfigDetails();
	const response = await fetch(getTakeoverUrl(wikiId));
	const dataArray = await response.json();

	if (dataArray[0].youtube_take_over) {
		const youtubeDetails: YoutubeTakeOverDetails = { isYoutubeTakeover: false };
		if (isServerSide()) {
			return youtubeDetails;
		}

		const forcedYoutubeEmbedVideoId = getValueFromQuery('youtube_embed_video_id');
		if (forcedYoutubeEmbedVideoId) {
			youtubeDetails.isYoutubeTakeover = true;
			youtubeDetails.youtubeVideoId = forcedYoutubeEmbedVideoId;
			console.debug('Youtube Takeover: Found the youtube_embed_video_id query param', youtubeDetails);
			return youtubeDetails;
		}

		if (!wikiId || isTier3Wiki) {
			return youtubeDetails;
		}

		const wikiYoutubeTakeoverDetails = dataArray?.length === 1 ? dataArray[0] : null;

		if (
			wikiYoutubeTakeoverDetails?.youtube_take_over &&
			wikiYoutubeTakeoverDetails?.takeover_video_id?.trim().length !== 0
		) {
			youtubeDetails.isYoutubeTakeover = wikiYoutubeTakeoverDetails.youtube_take_over;
			youtubeDetails.youtubeVideoId = wikiYoutubeTakeoverDetails.takeover_video_id;
			console.debug(
				'Youtube Takeover: Eligible for youtube takeover based on the targeting params.',
				youtubeDetails,
				wikiYoutubeTakeoverDetails,
			);
			trackYoutubeTakeoverDetails({ deviceType, youtubeVideoId: youtubeDetails.youtubeVideoId });
		}

		return youtubeDetails;
	} else if (dataArray[0].vimeo_take_over) {
		const vimeoDetails: VimeoTakeOverDetails = { isVimeoTakeover: false, videoId: null };
		if (isServerSide()) {
			return vimeoDetails;
		}

		const forcedVimeoEmbedVideoId = getValueFromQuery('vimeo_embed_video_id');
		if (forcedVimeoEmbedVideoId) {
			vimeoDetails.isVimeoTakeover = true;
			vimeoDetails.videoId = forcedVimeoEmbedVideoId;
			console.debug('Vimeo Takeover: Found the vimeo_embed_video_id query param', vimeoDetails);
			return vimeoDetails;
		}

		if (!wikiId || isTier3Wiki) {
			return vimeoDetails;
		}

		const wikiVimeoTakeoverDetails = dataArray?.length === 1 ? dataArray[0] : null;

		if (wikiVimeoTakeoverDetails?.vimeo_take_over && wikiVimeoTakeoverDetails?.takeover_video_id?.trim().length !== 0) {
			vimeoDetails.isVimeoTakeover = wikiVimeoTakeoverDetails.vimeo_take_over;
			vimeoDetails.videoId = wikiVimeoTakeoverDetails.takeover_video_id;
			console.debug(
				'Vimeo Takeover: Eligible for vimeo takeover based on the targeting params.',
				vimeoDetails,
				wikiVimeoTakeoverDetails,
			);
		}

		return vimeoDetails;
	}
}

export const eligibleForYoutubeTakeover = (youtubeTakeoverDetails: YoutubeTakeOverDetails) => {
	if (youtubeTakeoverDetails.isYoutubeTakeover !== undefined) {
		const youtubeTakeoverFlag = youtubeTakeoverDetails.isYoutubeTakeover;
		const isVideoIdValidLength =
			youtubeTakeoverDetails?.youtubeVideoId && youtubeTakeoverDetails?.youtubeVideoId?.length !== 0;
		return youtubeTakeoverFlag && isVideoIdValidLength;
	}

	return false;
};

export const eligibleForVimeoTakeover = (vimeoDetails: VimeoTakeOverDetails) => {
	if (vimeoDetails.isVimeoTakeover !== undefined) {
		const vimeoTakeoverFlag = vimeoDetails.isVimeoTakeover;
		const isVideoIdValidLength = vimeoDetails?.videoId && vimeoDetails?.videoId?.length !== 0;

		return vimeoTakeoverFlag && isVideoIdValidLength;
	}
};
