function wikiaJWPlayerUserIntendedPlayControl(isInitiallyUserIntendedPlay, playerInstance, tracker, willAutoplay) {
	var isUserIntendedPlay = null;
	var isUserIntendedByUnmuting = false;
	var wasPausedByUserInteraction = false;
	var customDimensionNumber = 39;
	var customDimensionValueWhenIntended = 'user-intended';
	var customDimensionValueWhenNotIntended = 'not-user-intended';

	function setUserIntendedPlay(isUserIntended, immediate) {
		if (isUserIntendedPlay === isUserIntended) {
			return;
		}

		isUserIntendedPlay = isUserIntended;

		if (typeof tracker.setCustomDimension !== 'function') {
			return;
		}

		if (immediate) {
			tracker.setCustomDimension(
				customDimensionNumber, isUserIntended ?customDimensionValueWhenIntended : customDimensionValueWhenNotIntended
			);
		} else {
			// Related video impression happens just before the potential subsequent video play
			playerInstance.on('relatedVideoImpression', function () {
				tracker.setCustomDimension(
					customDimensionNumber, isUserIntended ? customDimensionValueWhenIntended : customDimensionValueWhenNotIntended
				);
			});
		}
	}

	function onPause(data) {
		if (data.pauseReason === 'interaction') {
			wasPausedByUserInteraction = true;
		}
	}

	function onPlay() {
		if (wasPausedByUserInteraction) {
			setUserIntendedPlay(true);
		}
	}

	function onFullScreen() {
		setUserIntendedPlay(true);
	}

	function onUnmute() {
		setUserIntendedPlay(true);
		isUserIntendedByUnmuting = true;
	}

	function onMute() {
		if (isUserIntendedPlay && isUserIntendedByUnmuting) {
			setUserIntendedPlay(false);
		}
	}

	function onVideoThumbnailInsidePlayerClicked() {
		setUserIntendedPlay(true, true);
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
			setUserIntendedPlay(true, true);
		} else if (isInitiallyUserIntendedPlay) {
			setUserIntendedPlay(true, true);
		} else {
			setUserIntendedPlay(false, true);
		}
	}

	playerInstance.once('ready', init);
}

window.wikiaJWPlayerUserIntendedPlayControl = wikiaJWPlayerUserIntendedPlayControl;
