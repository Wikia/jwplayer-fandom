import { communicationService } from 'utils/communication';
import { setVideoSeenInSession } from 'utils/articleVideo/articleVideoSession';
import { willAutoplay, willMute } from 'utils/articleVideo/articleVideoConfig';

export default function useOnArticlePlayerReady(videoDetails, playerInstance): void {
	const player = playerInstance;
	const playerKey = 'aeJWPlayerKey';

	player?.on('ready', () => {
		if (!videoDetails.isDedicatedForArticle) {
			setVideoSeenInSession();
		}

		window.dispatchEvent(new CustomEvent('wikia.jwplayer.instanceReady', { detail: player }));
		window[playerKey] = player;

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

		// player.on('autoplayToggle', function (data) {
		//     articleVideoCookieService.setAutoplay(data.enabled ? '1' : '0');
		// });

		// player.on('captionsSelected', function (data) {
		//     articleVideoCookieService.setCaptions(data.selectedLang);
		// });
	});
}
