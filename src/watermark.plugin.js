function WikiaJWPlayerWatermarkPlugin(player, config, div) {
	this.player = player;
	this.container = div;
	this.config = config;
	this.watermarkElement = this.getWatermarkElement();
	this.watermarkElement.addEventListener('click', function () {
		player.trigger('watermarkClicked');
	});

	this.container.classList.add('wikia-watermark-container');

	this.isEnabled = config.show;

	this.player.on('play', this.show.bind(this));
	this.player.on('pause', this.hide.bind(this));
	this.player.on('relatedVideoPlay', this.onVideoChange.bind(this));
}

/**
 * prepares watermark link with icon
 */
WikiaJWPlayerWatermarkPlugin.prototype.getWatermarkElement = function () {
	var watermarkImage = wikiaJWPlayerIcons['fandomLogo'];

	var watermarkElement = document.createElement('a');
	watermarkElement.classList.add('wikia-watermark');
	watermarkElement.innerHTML = watermarkImage;
	watermarkElement.href = 'https://fandom.com';

	return watermarkElement;
};

/**
 * hides the entire plugin (button and settings menu)
 */
WikiaJWPlayerWatermarkPlugin.prototype.hide = function () {
	if (this.watermarkElement.parentElement) {
		this.container.innerHTML = '';
	}
};

/**
 * shows back the entire plugin (adds button back)
 */
WikiaJWPlayerWatermarkPlugin.prototype.show = function () {
	if (!this.watermarkElement.parentElement && this.isEnabled) {
		this.container.appendChild(this.watermarkElement);
	}
};

/**
 * hides the entire plugin (button and settings menu)
 */
WikiaJWPlayerWatermarkPlugin.prototype.onVideoChange = function (data) {
	this.isEnabled = !!data.item.watermark;
};

WikiaJWPlayerWatermarkPlugin.register = function () {
	jwplayer().registerPlugin('wikiaWatermark', '8.0.0', WikiaJWPlayerWatermarkPlugin);
};
