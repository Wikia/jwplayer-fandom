function allowControllOnTouchDevices(elementId, playerInstance) {
	playerInstance.on('ready', function() {
		var unmuteIcon = document.querySelector('.jw-autostart-mute');
		document.getElementById(elementId).classList.remove('jw-flag-autostart');
		document.getElementById(elementId).lastChild.removeChild(unmuteIcon);
	})
}
