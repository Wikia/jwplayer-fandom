import { getCommunicationService } from 'jwplayer/utils/communication';
import { willAutoplay, willMute } from 'jwplayer/utils/articleVideo/articleVideoConfig';

export default function useOnArticlePlayerReady(videoDetails, playerInstance): void {
	const playerKey = 'aeJWPlayerKey';
	const communicationService = getCommunicationService();

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
	window[playerKey] = playerInstance;

	communicationService.dispatch({
		type: '[JWPlayer] Player Ready',
		playerKey,
		targeting: {
			plist: videoDetails.feedid || '',
			vtags: videoDetails.videoTags || '',
			videoScope: videoDetails.isDedicatedForArticle ? 'article' : 'wiki',
		},
		options: {
			audio: !willMute(),
			ctp: !willAutoplay(),
			slotName: 'featured',
			videoId: videoDetails && videoDetails?.playlist?.length > 0 ? videoDetails.playlist[0].mediaid : '',
		},
	});
}
