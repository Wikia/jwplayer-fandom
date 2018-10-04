function wikiaJWPlayerHandleTabNotActive(playerInstance) {
	var isPausedByBrowserTabSwitch = false;

	function onBrowserTabFocus() {
		if (isPausedByBrowserTabSwitch) {
			isPausedByBrowserTabSwitch = false;
			playerInstance.play();
			playerInstance.trigger('playerResumedByBrowserTabSwitch');
		}
	}

	function onBrowserTabBlur() {
		if (playerInstance.getState() === 'playing') {
			isPausedByBrowserTabSwitch = true;
			playerInstance.pause();
			playerInstance.trigger('playerPausedByBrowserTabSwitch');
		}
	}

	window.addEventListener('blur', onBrowserTabBlur);
	window.addEventListener('focus', onBrowserTabFocus);
}
