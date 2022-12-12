import { communicationService } from 'jwplayer/utils/communication';
import { setVideoSeenInSession } from 'jwplayer/utils/articleVideo/articleVideoSession';
import { willAutoplay, willMute } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';

export default function useOnArticlePlayerReady(videoDetails, playerInstance): void {
	const playerKey = 'aeJWPlayerKey';

	if (!videoDetails.isDedicatedForArticle) {
		setVideoSeenInSession();
	}

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
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
