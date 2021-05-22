var loadJWCallbacks = [];
var loadWWCallbacks = [];

window.wikiaJWPlayer = function (elementId, options, callback) {
	function afterLoad(elementId, options, callback) {
		// LOAD WW SCRIPTS IF ENABLED AND NOT IN HEAD
		if (typeof WIREWAX === 'undefined') {
			var script = document.createElement('script');
			script.src = 'https://edge-player5.wirewax.com/plugins/prod/jwplayer/jw-wirewax.js';
			script.onload = function () {
				afterLoad2(elementId, options, callback)
			}
			document.getElementsByTagName('head')[0].appendChild(script);
		} else {
			afterLoad2(elementId, options, callback)
		}
	}

	function afterLoad2(elementId, options, callback) {
		// CREATE PLAYER
		// Delete in case it exists
		jwplayer(elementId).remove();
		var logger = wikiaJWPlayerLogger(options),
			lang = options.lang || 'en',
			i18n = wikiaJWPlayeri18n[lang] || wikiaJWPlayeri18n['en'],
			playerInstance = jwplayer(elementId),
			videoId = options.videoDetails.playlist[0].mediaid,
			willAutoplay = options.autoplay,
			// IMA supports two-letter ISO 639-1 code
			langForAds = lang.substr(0, 2),
			playerSetup = {
				advertising: {
					admessage: i18n.admessage,
					autoplayadsmuted: willAutoplay,
					client: 'googima',
					cuetext: i18n.cuetext,
					loadVideoTimeout: 16000,
					maxRedirects: 8,
					requestTimeout: 11500,
					setLocale: langForAds,
					skipmessage: i18n.skipmessage,
					skiptext: i18n.skiptext,
					truncateMacros: false,
					vastLoadTimeout: 11000,
					vpaidcontrols: true
				},
				autostart: willAutoplay && !document.hidden,
				description: options.videoDetails.description,
				image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
				mute: options.mute,
				playlist: options.videoDetails.playlist,
				title: options.videoDetails.title,
				localization: i18n,
				repeat: options.repeat
			};

		playerSetup.plugins = {};

		if (options.settings) {
			playerSetup.plugins['wikiaSettings'] = {
				showAutoplayToggle: options.settings.showAutoplayToggle,
				showQuality: options.settings.showQuality,
				showCaptions: options.settings.showCaptions,
				autoplay: options.autoplay,
				selectedCaptionsLanguage: options.selectedCaptionsLanguage,
				i18n: i18n
			};
		}

		if (options.sharing) {
			playerSetup.plugins['wikiaSharing'] = {
				i18n: i18n
			};
		}

		if (options.related) {
			playerSetup.related = {
				autoplaytimer: options.related.time || 3,
				file: '//cdn.jwplayer.com/v2/playlists/' + options.related.playlistId + '?related_media_id=' + videoId,
				oncomplete: options.related.autoplay ? 'autoplay' : 'show',
				autoplaymessage: i18n.nextUpInSeconds
			};
		}

		if (options.watermark !== false) {
			playerSetup.plugins['wikiaWatermark'] = {};
		}

		if (options.showSmallPlayerControls) {
			playerSetup.plugins['smallPlayerControls'] = {};
		}

		logger.info('setupPlayer');
		playerInstance.setup(playerSetup);
		logger.info('after setup');
		logger.subscribeToPlayerErrors(playerInstance);

		wikiaJWPlayerIdleScreen(playerInstance, i18n);
		wikiaJWPlayerReplaceIcons(playerInstance);
		wikiaJWPlayerEvents(playerInstance, options.autoplay, logger);

		if (options.related) {
			wikiaJWPlayerRelatedVideoSound(playerInstance);
		}

		if (options.tracking) {
			options.tracking.pixel = options.videoDetails.playlist[0].pixel;
			wikiaJWPlayerTracking(playerInstance, options.autoplay, options.tracking);
		}

		wikiaJWPlayerHandleTabNotActive(playerInstance, options.autoplay);

		wikiaJWPlayerAllowControllOnTouchDevices(playerInstance);

		wikiaJWPlayerUserIntendedPlayControl(
			options.shouldForceUserIntendedPlay,
			playerInstance,
			options.tracking,
			options.autoplay
		);

		if(options.watermark !== false) {
			WikiaJWPlayerWatermarkPlugin.register();
		}
		
		// ATTACH WW
		new WIREWAX.Embedder(elementId, {
			player: playerInstance,
		});

		if (callback) {
			callback(playerInstance);
		}
	}

	if (typeof jwplayer === 'undefined') {
		var script = document.createElement('script');

		script.onload = function () {
			wikiaJWPlayerSettingsPlugin.register();

			if (options.sharing) {
				wikiaJWPlayerSharingPlugin.register();
			}

			if (options.showSmallPlayerControls) {
				wikiaJWPlayerSmallPlayerControls.register();
			}

			afterLoad(elementId, options, callback);
		};
		// script.src = playerURL || 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
		script.src = 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
		document.getElementsByTagName('head')[0].appendChild(script);
	} else {
		afterLoad(elementId, options, callback);
	}
};
