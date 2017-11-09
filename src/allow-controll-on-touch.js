function wikiaJWPlayerAllowControllOnTouchDevices(elementId, playerInstance) {
	playerInstance.on('playerStart', function () {
		var unmuteIcon = document.querySelector('.jw-autostart-mute'),
			jwPlayerNode = document.getElementById(elementId);

		jwPlayerNode.classList.remove('jw-flag-autostart');
		jwPlayerNode.lastChild.removeChild(unmuteIcon);
	});
}
