function wikiaJWPlayerAllowControllOnTouchDevices(elementId, playerInstance) {
	var adStarted = false;

	playerInstance.on('adStarted', function () {
		adStarted = true;
	});

	if (adStarted) {
		removeMuteButton(playerInstance, elementId, 'adComplete');
	} else {
		removeMuteButton(playerInstance, elementId, 'firstFrame');
	}

}

function removeMuteButton(playerInstance, elementId, event) {
	playerInstance.on(event, function() {
		var unmuteIcon = document.querySelector('.jw-autostart-mute'),
			jwPlayerNode = document.getElementById(elementId);

		jwPlayerNode.classList.remove('jw-flag-autostart');
		jwPlayerNode.lastChild.removeChild(unmuteIcon);
	})
}
