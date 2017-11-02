function wikiaJWPlayerSound(playerInstance) {
	playerInstance.on('relatedVideoPlay', function (data) {
		if (!data.auto) {
			playerInstance.setMute(false);
		}
	});
}
