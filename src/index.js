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
			lang = options.lang || 'en',
			// IMA supports two-letter ISO 639-1 code
			langForAds = lang.substr(0, 2),
			i18n = wikiaJWPlayeri18n[lang],
			playerSetup = {
				advertising: {
					autoplayadsmuted: willAutoplay,
					client: 'googima',
					vpaidcontrols: true,
					admessage: i18n.admessage,
					cuetext: i18n.cuetext,
					skipmessage: i18n.skipmessage,
					skiptext: i18n.skiptext,
					setLocale: langForAds,
					tag: 'https://pubads.g.doubleclick.net/gampad/ads?output=xml_vast3&env=vp&gdfp_req=1&unviewed_position_start=1&iu=%2F5441%2Fwka1a.VIDEO%2Ffeatured%2Fdesktop%2Foasis-fv-article%2F_project43-life&sz=640x480&url=http%3A%2F%2Fproject43.wikia.com%2Fwiki%2FSyntheticTests%2FPremium%2FFeaturedVideo&description_url=http%3A%2F%2Fproject43.wikia.com%2Fwiki%2FSyntheticTests%2FPremium%2FFeaturedVideo&correlator=3963673052804965&cust_params=wsi%3Doxax%26s0%3Dlife%26s0v%3Dlifestyle%26s0c%3Dtech%26s1%3D_project43%26s2%3Dfv-article%26ab%3D52_170%26ar%3D4%3A3%26artid%3D355%26dmn%3Dwikiacom%26hostpre%3Dproject43%26skin%3Doasis%26lang%3Den%26wpage%3Dsynthetictests%2Fpremium%2Ffeaturedvideo%26ref%3Ddirect%26esrb%3Dteen%26geo%3DPL%26pv%3D2%26u%3Dsc90y5n97%26ksgmnt%3D%26top%3D1k%26passback%3Djwplayer%26pos%3DFEATURED%26rv%3D1%26src%3Dtest&vpos=preroll&vid_t=Synthetic%20green%20(16%3A9)&eid=420706081&sdkv=h.3.184.2&sdki=3c0d&scor=3955968595252502&adk=1486223052&u_so=l&osd=2&frm=0&sdr=1&vpa=auto&mpt=jwplayer&mpv=8.0.0&afvsz=200x200%2C250x250%2C300x250%2C336x280%2C450x50%2C468x60%2C480x70&ged=ve4_td4_tt1_pd4_la4000_er353.114.505.414_vi0.0.923.945_vp100_eb24171'
					// tag: 'https://pubads.g.doubleclick.net/gampad/ads?output=xml_vast3&env=vp&gdfp_req=1&unviewed_position_start=1&iu=%2F5441%2Fwka1a.VIDEO%2Ffeatured%2Fdesktop%2Foasis-fv-article%2F_project43-life&sz=640x480&url=http%3A%2F%2Fsandbox-xw1.project43.wikia.com%2Fwiki%2FSyntheticTests%2FPremium%2FFeaturedVideo%2FCoD%3Flog_level%3Ddebug%26log_group%3Dwikia.articleVideo.featuredVideo.ads&description_url=http%3A%2F%2Fsandbox-xw1.project43.wikia.com%2Fwiki%2FSyntheticTests%2FPremium%2FFeaturedVideo%2FCoD%3Flog_level%3Ddebug%26log_group%3Dwikia.articleVideo.featuredVideo.ads&correlator=1531892329411442&cust_params=wsi%3Doxax%26s0%3Dlife%26s0v%3Dlifestyle%26s0c%3Dtech%26s1%3D_project43%26s2%3Dfv-article%26ab%3D52_170%26ar%3D3%3A4%26artid%3D451%26dmn%3Dwikiacom%26hostpre%3Dsandbox-xw1%26skin%3Doasis%26lang%3Den%26wpage%3Dsynthetictests%2Fpremium%2Ffeaturedvideo%2Fcod%26ref%3Ddirect%26esrb%3Dteen%26geo%3DUS%26pv%3D21%26u%3Dsc3g051dx%26ksgmnt%3D%26top%3D1k%26passback%3Djwplayer%26pos%3DFEATURED%26rv%3D1%26src%3Dtest&vpos=preroll&vid_t=Synthetic%20green%20(16%3A9)&sdkv=h.3.184.1&sdki=3c0d&scor=3861023004270693&adk=87358093&u_so=l&osd=2&frm=0&sdr=1&vpa=auto&mpt=jwplayer&mpv=8.0.0&afvsz=200x200%2C250x250%2C300x250%2C336x280%2C450x50%2C468x60%2C480x70&ged=ve4_td11_tt2_pd11_la1000_er353.25.505.325_vi196.0.1089.756_vp100_eb24171'
				},
				autostart: willAutoplay && !document.hidden,
				description: options.videoDetails.description,
				image: '//content.jwplatform.com/thumbs/' + videoId + '-640.jpg',
				mute: options.mute,
				playlist: options.videoDetails.playlist,
				title: options.videoDetails.title,
				localization: i18n
			};

		if (options.settings) {
			playerSetup.plugins = {
				wikiaSettings: {
					showAutoplayToggle: options.settings.showAutoplayToggle,
					showQuality: options.settings.showQuality,
					autoplay: options.autoplay,
					i18n: i18n
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

		if (callback) {
			callback(playerInstance);
		}
	});
};
