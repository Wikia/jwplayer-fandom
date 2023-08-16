import { communicationService } from 'jwplayer/utils/communication';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { RedVentureVideoDetails } from 'jwplayer/types';

export default function useOnRedVenturePlayerReady(videoDetails: RedVentureVideoDetails, playerInstance): void {
	const playerKey = playerInstance.id;

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
	window[playerKey] = playerInstance;

	recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_AD_ENG_PLAYER_READY_DISPATCH);

	communicationService.dispatch({
		type: '[JWPlayer] Player Ready',
		playerKey,
		targeting: {
			plist: videoDetails.feed_instance_id || '',
		},
		options: {
			videoId: videoDetails.playlist[0].mediaid,
		},
	});
}
