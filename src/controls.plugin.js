function wikiaJWPlayerRecommendedControlsPlugin(player, config, div) {
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

	this.muteIcon.addEventListener('click', this.unmuteHandler);
	this.pauseIcon.addEventListener('click', this.pauseHandler);
	this.playIcon.addEventListener('click', this.playHandler);

	this.player.on('ready', this.onreadyHandler);
}

wikiaJWPlayerRecommendedControlsPlugin.prototype.onreadyHandler = function () {
	var isSmallScreen = this.player.getWidth() <= 200;
	var playerDiv = document.querySelector('.jwplayer');

	if (this.config.showSmallPlayerControls && isSmallScreen) {
		playerDiv.classList.add('wikia-jw-small-player-controls');
		this.container.appendChild(this.wikiaControlsElement);
	}
};

wikiaJWPlayerRecommendedControlsPlugin.prototype.unmuteHandler = function () {
	this.player.setVolume(50);
};

wikiaJWPlayerRecommendedControlsPlugin.prototype.pauseHandler = function () {
	var container = document.querySelector('#player_smallPlayerControls'),
		icon = container.firstChild.childNodes[1];

	icon.parentNode.replaceChild(this.playIcon, icon);
	this.player.pause();
};

wikiaJWPlayerRecommendedControlsPlugin.prototype.playHandler = function () {
	var container = document.querySelector('#player_smallPlayerControls'),
		icon = container.firstChild.childNodes[1];

	icon.parentNode.replaceChild(this.pauseIcon, icon);
	this.player.play();
};

wikiaJWPlayerRecommendedControlsPlugin.register = function () {
	jwplayer().registerPlugin('smallPlayerControls', '8.0.0', wikiaJWPlayerRecommendedControlsPlugin);
};