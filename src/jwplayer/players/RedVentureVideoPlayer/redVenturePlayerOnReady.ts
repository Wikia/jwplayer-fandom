import { getCommunicationService } from 'jwplayer/utils/communication';
import { RedVentureVideoDetails } from 'jwplayer/types';

export default function useOnRedVenturePlayerReady(videoDetails: RedVentureVideoDetails, playerInstance): void {
	const playerKey = playerInstance.id;
	const communicationService = getCommunicationService();

	window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: playerInstance }));
	window[playerKey] = playerInstance;

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
