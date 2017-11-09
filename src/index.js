var loadCallbacks = [];

window.wikiaJWPlayer = function (elementId, options, callback) {

	/**
	 * adds script tag
	 * @param elementId
	 * @param playerURL
	 */
	function createScriptTag(elementId, playerURL) {
		var script = document.createElement('script'),
			playerElement = document.getElementById(elementId);

		script.onload = function () {
			wikiaJWPlayerSettingsPlugin.register();
			loadCallbacks.forEach(function (callback) {
				callback();
			});
		};
		script.async = true;
		script.src = playerURL || 'https://content.jwplatform.com/libraries/VXc5h4Tf.js';
		// insert script node just after player element
		playerElement.parentNode.insertBefore(script, playerElement.nextSibling);
	}

	/**
	 * loads jwplayer library
	 * @param elementId
	 * @param playerURL
	 * @param callback
	 */
	function loadJWPlayerScript(elementId, playerURL, callback) {
		if (typeof jwplayer !== 'undefined') {
			callback();
		} else {
			loadCallbacks.push(callback);

			// we don't want to load multiple jwplayer libraries
			if (loadCallbacks.length === 1) {
				createScriptTag(elementId, playerURL);
			}
		}
	}

	/**
	 * setups player
	 * @param elementId
	 * @param options
	 * @param logger
	 * @return {*}
	 */
	function setupPlayer(elementId, options, logger) {
		var playerInstance = jwplayer(elementId),
			videoId = options.videoDetails.playlist[0].mediaid,
			willAutoplay = options.autoplay,
			playerSetup = {
				advertising: {
					autoplayadsmuted: willAutoplay,
					client: 'googima',
					vpaidcontrols: true,
					//tag:
					// 'https://pubads.g.doubleclick.net/gampad/ads?output=xml_vast3&env=vp&gdfp_req=1&unviewed_position_start=1&iu=%2F5441%2Fwka1a.VIDEO%2Ffeatured%2Fsmartphone%2Fmercury-fv-article-ic%2F_project43-life&sz=640x480&url=http%3A%2F%2Fsandbox-so.project43.wikia.com%2Fwiki%2FSyntheticTests%2FPremium%2FFeaturedVideo&description_url=http%3A%2F%2Fsandbox-so.project43.wikia.com%2Fwiki%2FSyntheticTests%2FPremium%2FFeaturedVideo&correlator=2870076516136183&cust_params=wsi%3Dmxax%26s0%3Dlife%26s0v%3Dlifestyle%26s0c%3Dtech%26s1%3D_project43%26s2%3Dfv-article%26ab%3D52_170%26ar%3D3%3A4%26artid%3D355%26dmn%3Dwikiacom%26hostpre%3Dsandbox-so%26skin%3Dmercury%26lang%3Den%26wpage%3Dsynthetictests%2Fpremium%2Ffeaturedvideo%26ref%3Ddirect%26esrb%3Dteen%26geo%3DPL%26pv%3D4%26u%3Dsddavhq8d%26ksgmnt%3D%26top%3D1k%26passback%3Djwplayer%26pos%3DFEATURED%26rv%3D1%26src%3Dtest&vpos=preroll&vid_t=Synthetic%20green%20(16%3A9)&eid=31061775%2C509445015&sdkv=h.3.184.2&sdki=3c0d&scor=2816083339846417&adk=663970154&u_so=l&osd=2&frm=0&sdr=1&vpa=click&mpt=jwplayer&mpv=8.0.1&ged=ve4_td4_tt1_pd4_la4000_er123.0.275.300_vi0.0.732.412_vp100_ts0_eb24171_ct120'
				},
				autostart: willAutoplay && !document.hidden,
				description: options.videoDetails.description,
				image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
				mute: options.mute,
				playlist: options.videoDetails.playlist,
				title: options.videoDetails.title
			};

		if (options.settings) {
			playerSetup.plugins = {
				wikiaSettings: {
					showAutoplayToggle: options.settings.showAutoplayToggle,
					showQuality: options.settings.showQuality,
					autoplay: options.autoplay
				}
			};
		}

		if (options.related) {
			playerSetup.related = {
				autoplaytimer: options.related.time || 3,
				file: '//cdn.jwplayer.com/v2/playlists/' + options.related.playlistId + '?related_media_id=' + videoId,
				oncomplete: options.related.autoplay ? 'autoplay' : 'show'
			};
		}

		logger.info('setupPlayer');
		playerInstance.setup(playerSetup);
		logger.info('after setup');
		logger.subscribeToPlayerErrors(playerInstance);

		return playerInstance;
	}

	loadJWPlayerScript(elementId, options.playerURL, function () {
		var logger = wikiaJWPlayerLogger(options),
			playerInstance = setupPlayer(elementId, options, logger);

		wikiaJWPlayerReplaceIcons(playerInstance);
		wikiaJWPlayerEvents(playerInstance, options.autoplay, logger);
		if (options.related) {
			wikiaJWPlayerRelatedVideoSound(playerInstance);
		}

		if (options.tracking) {
			wikiaJWPlayerTracking(playerInstance, options.autoplay, options.tracking);
		}

		wikiaJWPlayerHandleTabNotActive(playerInstance, options.autoplay);

		wikiaJWPlayerAllowControllOnTouchDevices(elementId, playerInstance);

		if (callback) {
			callback(playerInstance);
		}
	});
};
