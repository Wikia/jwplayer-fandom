// function insertJWPlayerScript(playerElement) {
// 	var jwPlayerScript = document.createElement('script');
//
// 	jwPlayerScript.src = 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
// 	playerElement.parentNode.insertBefore(jwPlayerScript, playerElement.nextSibling);
// }

function setupPlayer(elementId, options) {
	var playerInstance = jwplayer(elementId),
		videoId = options.videoDetails.playlist[0].mediaid,
		willAutoplay = JWPlayerAutoplay.willAutoplay(),
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
					showToggle: options.autoplay.showToggle
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
	// var playerElement = document.getElementById(elementId);
	// insertJWPlayerScript(playerElement);
	JWPlayerAutoplay.showToggle = options.autoplay.showToggle;
	JWPlayerAutoplay.enabled = options.autoplay.enabled;
	var playerInstance = setupPlayer(elementId, options);
	JWPlayerEvents(playerInstance, JWPlayerAutoplay.willAutoplay());
	if (options.tracking) {
		JWPlayerTracking(playerInstance, JWPlayerAutoplay.willAutoplay(), 'feautred-video', options.tracking);
	}
}

init('player', {
	tracking: {
		track: function (data) {
			console.log('track', data);
		},
		setCustomDimension: function () {
			console.log('setCustomDimension', arguments);
		},
		comscore: true
	},
	autoplay: {
		showToggle: true,
		enabled: true,
	},
	related: {
		time: 3,
		playlistId: 'Y2RWCKuS', //recommendedPlaylist: 'Y2RWCKuS',
		autoplay: true // inNextVideoAutoplayCountries: true
	},
	videoDetails: {
		description: 'description',
		title: 'title',
		playlist: [{
			"labels": "\/Fandom,\/Fandom\/Movies,\/Fandom\/Specialized,\/Fandom\/wiki,",
			"mediaid": "LnqN4iBt",
			"description": "From Accio to Wingardium Leviosa, magical spells are a vital part of the Wizarding World of Harry Potter. Join us as we take a look at the five best spells from the Harry Potter Universe.",
			"pubdate": 1486075388,
			"tags": "Wiki,Movies,Fandom,Harry Potter,Specialized",
			"image": "https:\/\/cdn.jwplayer.com\/thumbs\/LnqN4iBt-720.jpg",
			"title": "5 Best Spells in the Harry Potter Universe",
			"sources": [{
				"type": "application\/vnd.apple.mpegurl",
				"file": "https:\/\/cdn.jwplayer.com\/manifests\/LnqN4iBt.m3u8"
			}, {
				"width": 320,
				"height": 180,
				"type": "video\/mp4",
				"file": "https:\/\/cdn.jwplayer.com\/videos\/LnqN4iBt-TI0yeHZW.mp4",
				"label": "180p"
			}, {
				"width": 480,
				"height": 270,
				"type": "video\/mp4",
				"file": "https:\/\/cdn.jwplayer.com\/videos\/LnqN4iBt-DnzUC89Y.mp4",
				"label": "270p"
			}, {
				"width": 720,
				"height": 406,
				"type": "video\/mp4",
				"file": "https:\/\/cdn.jwplayer.com\/videos\/LnqN4iBt-xhZUqUI6.mp4",
				"label": "406p"
			}, {
				"width": 1280,
				"height": 720,
				"type": "video\/mp4",
				"file": "https:\/\/cdn.jwplayer.com\/videos\/LnqN4iBt-1lt3rSsE.mp4",
				"label": "720p"
			}, {
				"type": "audio\/mp4",
				"file": "https:\/\/cdn.jwplayer.com\/videos\/LnqN4iBt-LiJWxqIn.m4a",
				"label": "AAC Audio"
			}, {
				"width": 1920,
				"height": 1080,
				"type": "video\/mp4",
				"file": "https:\/\/cdn.jwplayer.com\/videos\/LnqN4iBt-cSpmBcaY.mp4",
				"label": "1080p"
			}],
			"tracks": [{
				"kind": "thumbnails",
				"file": "https:\/\/cdn.jwplayer.com\/strips\/LnqN4iBt-120.vtt"
			}],
			"link": "https:\/\/cdn.jwplayer.com\/previews\/LnqN4iBt",
			"duration": 159,
			"originalName": "020217_Harry Potter_FINAL_no watermark.mp4",
			"ooyalaEmbed": "hwM2FkOTE6R_fZR9uu5jvOy9FHm3NS1O"
		}]
	}
});
