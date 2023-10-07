import { getCommunicationService } from 'jwplayer/utils/communication';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { Player, RedVentureVideoDetails } from 'jwplayer/types';

export default function useOnRedVenturePlayerReady(videoDetails: RedVentureVideoDetails, playerInstance: Player): void {
	const playerKey = playerInstance.id;
	const communicationService = getCommunicationService();

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
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
