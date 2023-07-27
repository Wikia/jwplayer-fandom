import { isServerSide } from 'utils/getEnv';
import getValueFromQuery from 'utils/getValuefromQuery';
import { VimeoTakeOverDetails, VimeoTakeoverResponse } from 'vimeo/types';
import { getMediaWikiConfigDetails } from 'loaders/utils/GetMediaWikiConfigDetails';
import { getArticleVideoServiceBaseUrl } from 'utils/getPandoraDetails';

function getVimeoTakeoverUrl(wikiId?: string): string {
	const articleVideoBaseUrl = getArticleVideoServiceBaseUrl();
	if (articleVideoBaseUrl.length === 0) {
		return articleVideoBaseUrl;
	}
	if (!wikiId) {
		return '';
	}
	return `${articleVideoBaseUrl}vimeo/v1/vimeo-takeover-mappings/${wikiId}`;
}

export async function getVimeoTakeoverDetails() {
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

	const { wikiId, isTier3Wiki } = getMediaWikiConfigDetails();
	// If the wikiId is not found for some reason or if the wiki is a tier3 wiki,
	// then just return the default youtubeTakeoverDetails that include the isYoutubeTakeover set to false
	if (!wikiId || isTier3Wiki) {
		return vimeoDetails;
	}

	const response = await fetch(getVimeoTakeoverUrl(wikiId));
	const dataArray = (await response.json()) as VimeoTakeoverResponse[];
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

export const eligibleForVimeoTakeover = (vimeoDetails: VimeoTakeOverDetails) => {
	const vimeoTakeoverFlag = vimeoDetails.isVimeoTakeover;
	const isVideoIdValidLength = vimeoDetails?.videoId && vimeoDetails?.videoId?.length !== 0;

	return vimeoTakeoverFlag && isVideoIdValidLength;
};
