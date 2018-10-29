function wikiaJWPlayerUserIntendedPlayControl(isInitiallyUserIntendedPlay, playerInstance, tracker, willAutoplay) {
	var isUserIntendedPlay = null;
	var userIntendedPlayReason = null;
	var wasPausedByUserInteraction = false;
	var reasonsForUserIntendedPlay = {
		unpausing: 'unpausing',
		fullScreen: 'fullscreen',
		unmuting: 'unmuting',
		videoThumbnailInsidePlayer: 'videothumbnailinsideplayer',
		clickToPlay: 'clicktoplay',
		playerInitializedByUserInteraction: 'playerinitializedbyuserinteraction'
	};

	function setUserIntendedPlay(isUserIntended, userIntendedReason, immediate) {
		if (isUserIntendedPlay === isUserIntended) {
			return;
		}

		isUserIntendedPlay = isUserIntended;

		if (isUserIntended) {
			userIntendedPlayReason = userIntendedReason;
		} else {
			userIntendedReason = null;
		}

		if (typeof tracker.setCustomDimension !== 'function') {
			return;
		}

		if (immediate) {
			tracker.setCustomDimension(39, isUserIntended ? 'user-intended' : 'not-user-intended');
		} else {
			// Related video impression happens just before the potential subsequent video play
			playerInstance.on('relatedVideoImpression', function () {
				tracker.setCustomDimension(39, isUserIntended ? 'user-intended' : 'not-user-intended');
			});
		}
	}

	function onPause(data) {
		if (data.pauseReason === 'interaction') {
			wasPausedByUserInteraction = true;
		}
	}

	function onPlay(data) {
		if (wasPausedByUserInteraction) {
			setUserIntendedPlay(true, reasonsForUserIntendedPlay.unpausing);
		}
	}

	function onFullScreen() {
		setUserIntendedPlay(true, reasonsForUserIntendedPlay.fullScreen);
	}

	function onUnmute() {
		setUserIntendedPlay(true, reasonsForUserIntendedPlay.unmuting);
	}

	function onMute() {
		if (isUserIntendedPlay && userIntendedPlayReason === reasonsForUserIntendedPlay.unmuting) {
			setUserIntendedPlay(false);
		}
	}

	function onVideoThumbnailInsidePlayerClicked() {
		setUserIntendedPlay(true, reasonsForUserIntendedPlay.videoThumbnailInsidePlayer, true);
	}

	function init() {
		playerInstance.on('mute', function () {
			if (playerInstance.getMute()) {
				onMute();
			} else {
				onUnmute();
			}
		});

		playerInstance.on('pause', onPause);
		playerInstance.on('play', onPlay);
		playerInstance.on('fullscreen', onFullScreen);

		playerInstance.on('relatedVideoPlay', function (data) {
			if (!data.auto) {
				onVideoThumbnailInsidePlayerClicked();
			}
		});

		if (!willAutoplay) {
			setUserIntendedPlay(true, reasonsForUserIntendedPlay.clickToPlay, true);
		} else if (isInitiallyUserIntendedPlay) {
			setUserIntendedPlay(true, reasonsForUserIntendedPlay.playerInitializedByUserInteraction, true);
		} else {
			setUserIntendedPlay(false, null, true);
		}
	}

	playerInstance.once('ready', function () {
		init();
	});
}

window.wikiaJWPlayerUserIntendedPlayControl = wikiaJWPlayerUserIntendedPlayControl;
