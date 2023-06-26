import { isServerSide } from 'utils/getEnv';
import getValueFromQuery from 'utils/getValuefromQuery';
import { VimeoTakeOverDetails } from 'vimeo/types';

export async function getVimeoTakeoverDetails() {
	const vimeoDetails: VimeoTakeOverDetails = { isVimeoTakeover: false, videoId: null };
	if (isServerSide()) {
		return vimeoDetails;
	}

	const forcedVimeoEmbedVideoId = getValueFromQuery('vimeo_embed_video_id');
	if (forcedVimeoEmbedVideoId) {
		// If we can extract a youtube video id from the URL query params, then we can assume we want the youtube takeover
		console.debug(
			`Vimeo Takeover: Found the vimeo_embed_video_id query param, with a value of ${forcedVimeoEmbedVideoId}`,
		);
		vimeoDetails.isVimeoTakeover = true;
		vimeoDetails.videoId = forcedVimeoEmbedVideoId;
		return vimeoDetails;
	}
}

export const eligibleForVimeoTakeover = (vimeoDetails: VimeoTakeOverDetails) => {
	const youtubeTakeoverFlag = vimeoDetails.isVimeoTakeover;
	const isVideoIdValidLength = vimeoDetails?.videoId && vimeoDetails?.videoId?.length !== 0;

	return youtubeTakeoverFlag && isVideoIdValidLength;
};
