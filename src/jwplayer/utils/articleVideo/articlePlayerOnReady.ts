import { getCommunicationService } from 'jwplayer/utils/communication';
import { setVideoSeenInSession } from 'jwplayer/utils/articleVideo/articleVideoSession';
import { willAutoplay, willMute } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { ArticleVideoDetails, Player } from 'jwplayer/types';

export default function useOnArticlePlayerReady(videoDetails: ArticleVideoDetails, playerInstance: Player): void {
	const playerKey = 'aeJWPlayerKey';
	const communicationService = getCommunicationService();

	if (!videoDetails.isDedicatedForArticle) {
		setVideoSeenInSession();
	}

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	window[playerKey] = playerInstance;

	recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_PLAYER_READY_DISPATCH);

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
			videoId: videoDetails.playlist[0].mediaid,
		},
	});
}
