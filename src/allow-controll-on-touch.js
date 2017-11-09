function wikiaJWPlayerAllowControllOnTouchDevices(playerInstance) {
	playerInstance.on('playerStart', function () {
		var unmuteIcon = document.querySelector('.jw-autostart-mute'),
			jwPlayerClassList = playerInstance.getContainer().classList;

		jwPlayerClassList.remove('jw-flag-autostart');
		unmuteIcon.style.display = 'none';
	});
}
