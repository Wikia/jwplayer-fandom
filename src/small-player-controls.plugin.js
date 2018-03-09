function wikiaJWPlayerSmallPlayerControls(player, config, div) {
	var parser = new DOMParser();

	this.player = player;
	this.container = div;
	this.config = config;
	this.muteIcon = parser.parseFromString(wikiaJWPlayerIcons.volumeOff, 'image/svg+xml').documentElement;
	this.playIcon = parser.parseFromString(wikiaJWPlayerIcons.play, 'image/svg+xml').documentElement;
	this.pauseIcon = parser.parseFromString(wikiaJWPlayerIcons.pause, 'image/svg+xml').documentElement;
	this.wikiaControlsElement = document.createElement('div');
	this.wikiaControlsElement.appendChild(this.muteIcon);
	this.wikiaControlsElement.appendChild(this.pauseIcon);

	this.unmuteHandler = this.unmuteHandler.bind(this);
	this.playHandler = this.playHandler.bind(this);
	this.pauseHandler = this.pauseHandler.bind(this);
	this.onreadyHandler = this.onreadyHandler.bind(this);
	this.resizeHandler = this.resizeHandler.bind(this);


	this.muteIcon.addEventListener('click', this.unmuteHandler);
	this.pauseIcon.addEventListener('click', this.pauseHandler);
	this.playIcon.addEventListener('click', this.playHandler);
	window.addEventListener('resize', this.resizeHandler);


	this.player.on('ready', this.onreadyHandler);
}

wikiaJWPlayerSmallPlayerControls.prototype.onreadyHandler = function () {
	var isSmallScreen = this.player.getWidth() <= 200;

	if (isSmallScreen) {
		this.player.getContainer().classList.add('wikia-jw-small-player-controls');
		this.container.appendChild(this.wikiaControlsElement);
	}
};

wikiaJWPlayerSmallPlayerControls.prototype.unmuteHandler = function () {
	this.player.setMute(false);
};

wikiaJWPlayerSmallPlayerControls.prototype.pauseHandler = function () {
	var icon = this.container.firstChild.childNodes[1];

	icon.parentNode.replaceChild(this.playIcon, icon);
	this.player.pause();
};

wikiaJWPlayerSmallPlayerControls.prototype.playHandler = function () {
	var icon = this.container.firstChild.childNodes[1];

	icon.parentNode.replaceChild(this.pauseIcon, icon);
	this.player.play();
};

wikiaJWPlayerSmallPlayerControls.prototype.resizeHandler = function () {
	var isBigScreen = this.player.getWidth() > 200;

	if (isBigScreen) {
		this.player.getContainer().classList.remove('wikia-jw-small-player-controls');
	}
};

wikiaJWPlayerSmallPlayerControls.register = function () {
	jwplayer().registerPlugin('smallPlayerControls', '8.0.0', wikiaJWPlayerSmallPlayerControls);
};