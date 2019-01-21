function wikiaJWPlayerHandleTabNotActive(playerInstance, willAutoplay) {
	var pausedOnRelated = false;

	function playVideoOnTabSwitch() {
		if (['playing', 'paused', 'complete'].indexOf(playerInstance.getState()) === -1 || pausedOnRelated) {
			if (willAutoplay) {
				playerInstance.play();
				pausedOnRelated = false;
				playerInstance.trigger('playerResumedByBrowserTabSwitch');
			} else {
				playerInstance.setMute(false);
			}
		}
	}

	playerInstance.once('ready', function () {
		document.addEventListener('visibilitychange', playVideoOnTabSwitch, false);
	});

	playerInstance.on('relatedVideoPlay', function () {
		if (document.hidden) {
			playerInstance.once('play', function () {
				playerInstance.pause();
				pausedOnRelated = true;
				playerInstance.trigger('playerPausedByBrowserTabSwitch');
			});
		}
	});
}
