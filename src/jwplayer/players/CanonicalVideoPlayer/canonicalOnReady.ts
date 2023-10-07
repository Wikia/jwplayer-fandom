import { getCommunicationService } from 'jwplayer/utils/communication';
import { willAutoplay, willMute } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { CanonicalVideoDetails, Player } from 'jwplayer/types';

interface WindowWithAEJWPlayerKey extends Window {
	aeJWPlayerKey: Player;
}

declare let window: WindowWithAEJWPlayerKey;

export default function canonicalOnReady(videoDetails: CanonicalVideoDetails, playerInstance: Player): void {
	const playerKey = 'aeJWPlayerKey';
	const communicationService = getCommunicationService();

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
	window[playerKey] = playerInstance;

	recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_PLAYER_READY_DISPATCH);

	communicationService.dispatch({
		type: '[JWPlayer] Player Ready',
		playerKey,
		targeting: {
			plist: videoDetails.feedid || '',
			vtags: videoDetails.tags || '',
		},
		options: {
			audio: !willMute(),
			ctp: !willAutoplay(),
			featured: false,
			videoId: videoDetails.mediaid,
		},
	});
}
