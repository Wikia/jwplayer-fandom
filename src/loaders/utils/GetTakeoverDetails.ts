import { isServerSide } from 'utils/getEnv';
import { getArticleVideoServiceBaseUrl } from 'utils/getPandoraDetails';
import { trackYoutubeTakeoverDetails, YoutubePlayerTrackingProps } from 'youtube/players/shared/youtubeTrackingEvents';
import { getMediaWikiConfigDetails } from 'loaders/utils/GetMediaWikiConfigDetails';
import { TakeoverDetails, TakeoverResponse } from 'loaders/types';

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

export async function getTakeoverDetails({ deviceType }: YoutubePlayerTrackingProps) {
	const { wikiId, isTier3Wiki } = getMediaWikiConfigDetails();
	if (!wikiId || isTier3Wiki) {
		return null;
	}

	const response: Response = await fetch(getTakeoverUrl(wikiId));
	const dataArray: TakeoverResponse[] = await response.json();
	const takeoverDetails: TakeoverDetails = { videoId: null, type: null };

	if (dataArray.length === 0 || !dataArray || isServerSide()) {
		return takeoverDetails;
	}

	if (dataArray[0].youtube_take_over) {
		takeoverDetails.type = 'youtube';
		takeoverDetails.videoId = dataArray[0].takeover_video_id;
	}
	if (dataArray[0].vimeo_take_over) {
		takeoverDetails.type = 'vimeo';
		takeoverDetails.videoId = dataArray[0].takeover_video_id;
	}

	switch (takeoverDetails.type) {
		case 'youtube': {
			console.debug('Youtube Takeover: Eligible for youtube takeover based on the targeting params.', takeoverDetails);
			trackYoutubeTakeoverDetails({ deviceType, youtubeVideoId: takeoverDetails.videoId });
			break;
		}
		case 'vimeo': {
			console.debug('Vimeo Takeover: Eligible for vimeo takeover based on the targeting params.', takeoverDetails);
			break;
		}
		default: {
			return takeoverDetails;
		}
	}

	return takeoverDetails;
}
