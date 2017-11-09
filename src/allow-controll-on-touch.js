function wikiaJWPlayerAllowControllOnTouchDevices(elementId, playerInstance) {
	playerInstance.on('playerStart', function () {
		var unmuteIcon = document.querySelector('.jw-autostart-mute'),
			jwPlayerClassList = document.getElementById(elementId).classList;

		jwPlayerClassList.remove('jw-flag-autostart');
		unmuteIcon.remove();
	});
}
