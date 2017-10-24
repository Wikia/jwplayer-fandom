function setupPlayer(elementId, options) {
	var playerInstance = jwplayer(elementId),
		videoId = options.videoDetails.playlist[0].mediaid,
		willAutoplay = options.autoplay.enabled,
		playerSetup = {
			advertising: {
				autoplayadsmuted: willAutoplay,
				client: 'googima'
			},
			autostart: willAutoplay && !document.hidden,
			description: options.videoDetails.description,
			image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
			mute: willAutoplay,
			playlist: options.videoDetails.playlist,
			title: options.videoDetails.title,
			plugins: {
				wikiaSettings: {
					showToggle: options.autoplay.showToggle,
					autoplay: options.autoplay.enabled
				}
			}
		};

	if (options.related) {
		playerSetup.related = {
			autoplaytimer: options.related.time || 3,
			file: 'https://cdn.jwplayer.com/v2/playlists/' + options.related.playlistId + '?related_media_id=' + videoId,
			oncomplete: options.related.autoplay ? 'autoplay' : 'show'
		};
	}

	playerInstance.setup(playerSetup);

	return playerInstance;
}

function init(elementId, options) {
	var playerInstance = setupPlayer(elementId, options);
	JWPlayerIcons(playerInstance);
	JWPlayerEvents(playerInstance, options.autoplay.enabled);
	if (options.tracking) {
		JWPlayerTracking(playerInstance, options.autoplay.enabled, 'feautred-video', options.tracking);
	}
}

window.WikiaJWPlayer = init;
