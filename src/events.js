function wikiaJWPlayerEvents(playerInstance, willAutoplay, logger) {
	var state = getNewState(),
		wasAlreadyUnmuted = false,
		depth = 0,
		prefixes = {
			ad: 'ad',
			video: 'video'
		},
		isPlayerPaused = false;

	/**
	 * returns default state for video/ad
	 * @return {{wasFirstQuartileTriggered: boolean, wasMidPointTriggered: boolean, wasThirdQuartileTriggered: boolean, progress: {durationWatched: number, percentWatched: number}}}
	 */
	function getDefaultState() {
		return {
			wasFirstQuartileTriggered: false,
			wasMidPointTriggered: false,
			wasThirdQuartileTriggered: false,
			progress: {
				durationWatched: 0,
				percentWatched: 0
			}
		}
	}

	/**
	 * retruns new state for ad and video
	 * @return {{ad: {wasFirstQuartileTriggered: boolean, wasMidPointTriggered: boolean, wasThirdQuartileTriggered: boolean, progress: {durationWatched: number, percentWatched: number}}, video: {wasFirstQuartileTriggered: boolean, wasMidPointTriggered: boolean, wasThirdQuartileTriggered: boolean, progress: {durationWatched: number, percentWatched: number}}}}
	 */
	function getNewState() {
		return {
			ad: getDefaultState(),
			video: getDefaultState()
		}
	}

	/**
	 * Rounds a number to a 5
	 * e.g 42 -> 40; 58 -> 55
	 * @param {number} number 
	 */
	function roundTo5(number) {
		return Math.floor(number / 5) * 5;
	}

	/**
	 * triggers video/ad time-based events
	 * @param prefix
	 * @param data
	 */
	function handleTime(prefix, data) {
		var positionRounded = roundTo5(data.position),
			percentPlayedRounded = roundTo5((data.position / data.duration) * 100),
			playlistItem = playerInstance.getPlaylistItem();

		if (percentPlayedRounded > 100 && playlistItem) {
			data.mediaId = playlistItem.mediaid;

			logger.error('played-percentage', data);
		}

		if (positionRounded > state[prefix].progress.durationWatched && positionRounded % 5 === 0) {
			playerInstance.trigger(prefix + 'SecondsPlayed', {value: positionRounded});

			state[prefix].progress.durationWatched = positionRounded;
		}

		if (percentPlayedRounded >= 25 && !state[prefix].wasFirstQuartileTriggered) {
			playerInstance.trigger(prefix + 'FirstQuartile');
			state[prefix].wasFirstQuartileTriggered = true;
		}

		if (percentPlayedRounded >= 50 && !state[prefix].wasMidPointTriggered) {
			playerInstance.trigger(prefix + 'MidPoint');
			state[prefix].wasMidPointTriggered = true;
		}

		if (percentPlayedRounded >= 75 && !state[prefix].wasThirdQuartileTriggered) {
			playerInstance.trigger(prefix + 'ThirdQuartile');
			state[prefix].wasThirdQuartileTriggered = true;
		}

		if (percentPlayedRounded > state[prefix].progress.percentWatched && percentPlayedRounded % 10 === 0) {
			playerInstance.trigger(prefix + 'PercentPlayed', {value: percentPlayedRounded});

			state[prefix].progress.percentWatched = percentPlayedRounded;
		}
	}

	logger.info('before ready');
	playerInstance.once('ready', function () {
		logger.info('player ready');
		var relatedPlugin = playerInstance.getPlugin('related');

		relatedPlugin.on('open', function () {
			logger.info('related plugin open');
			playerInstance.trigger('relatedVideoImpression');
		});

		relatedPlugin.on('play', function (data) {
			logger.info('related plugin play');
			depth++;

			state[prefixes.video] = getDefaultState();
			playerInstance.trigger('relatedVideoPlay', {
				auto: data.auto,
				item: data.item,
				position: data.position,
				depth: depth
			});
		});
	});

	playerInstance.on('play', function (data) {
		if (isPlayerPaused) {
			playerInstance.trigger('videoResumed', data);
			logger.info('videoResumed triggered');
		}

		isPlayerPaused = false;
	});

	playerInstance.on('pause', function () {
		isPlayerPaused = true;
	});

	playerInstance.on('firstFrame', function () {
		if (depth === 0) {
			playerInstance.trigger('playerStart', {auto: willAutoplay});
			logger.info('playerStart triggered');
		}

		playerInstance.trigger('videoStart');
		logger.info('videoStart triggered');
	});

	playerInstance.on('mute', function () {
		if (!playerInstance.getMute() && !wasAlreadyUnmuted) {
			playerInstance.trigger('firstUnmute');
			wasAlreadyUnmuted = true;
		}
	});

	playerInstance.on('time', function (data) {
		handleTime(prefixes.video, data);
	});

	playerInstance.on('adTime', function (data) {
		handleTime(prefixes.ad, data);
	});

	playerInstance.on('adRequest', function () {
		state[prefixes.ad] = getDefaultState();
	});
}
