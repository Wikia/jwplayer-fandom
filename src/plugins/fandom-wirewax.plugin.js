// fandom-jw-plugin.js

console.log('FandomPlugin loaded');

// Utilities
const fetchWIREWAXVidId = async (mediaid) => {
	if (!mediaid) {
		throw new TypeError('No JW media id is specified.');
	}

	const response = await fetch(`https://edge-player.wirewax.com/jwPlayerData/${mediaid}.txt`);

	if (response.status !== 200) {
		throw new Error('No vidId is mapped with this mediaid');
	}

	const vidId = await response.json();

	return vidId;
};

const injectEmbedderSDK = () => {
	if (window.createWirewaxEmbedder) {
		console.warn('Embedder SDK is already loaded');

		return;
	}

	const fandomSDKUrl = 'https://edge-assets-wirewax.wikia-services.com/creativeData/sdk-fandom/wirewax-embedder-sdk.js';

	console.log('inject WIREWAX embedder SDK fandom build', fandomSDKUrl);

	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src = fandomSDKUrl;
		script.addEventListener('load', resolve);
		script.addEventListener('error', (e) => reject(e.error));
		document.head.appendChild(script);
	});
};

class FandomWirewaxPlugin {
	constructor(rootId, options) {
		this.isPlayerRegistered = false;
		this.rootId = rootId;
		this.options = options;
		this.player = options.player;

		this.autoPlay = true;

		this.player.on('playlistItem', () => {
			if (this.embedder) {
				this.stopTimeUpdate();

				// Dispose pre video interaction
				try {
					this.embedder.dispose();
				} catch (error) {
					console.log(error);
				}
			}

			// Search JW media id
			const mediaId = this.player.getConfig().playlistItem.mediaid || this.player.getConfig().playlistItem.videoId;

			// validate interaction
			fetchWIREWAXVidId(mediaId)
				.then((vidId) => {
					this.vidId = vidId;

					// Inject SDK
					return injectEmbedderSDK();
				})
				.then(() => this.setupEmbedder())
				.then(() => this.registerEvents())
				.catch((error) => {
					console.warn(error);
				});
		});

		return this;
	}

	on(event, callback) {
		// ...
	}

	async setupEmbedder() {
		if (!this.embedder) {
			// Create a container
			this.container = document.createElement('div');
			this.container.classList.add('vjs-wirewax-container');
			this.container.setAttribute(
				'style',
				'position: absolute; height: 100%; width: 100%; top: 0; pointer-events: none',
			);
			this.player.getContainer().appendChild(this.container);

			// Initialize embedder
			this.embedder = window.createWirewaxEmbedder();
		}

		// Create video-less WIREWAX player
		this.embedder.createEl(this.container, {
			isPlugin: true,
			videoId: this.vidId,
			rootId: this.rootId,
		});

		return this.embedder.ready();
	}

	registerEvents() {
		// Custom time sync handler
		const HTML5VideoEl = this.player.getConfig().mediaElement;
		this.setWIREWAXCurrentTime = () => {
			this.embedder.setCurrentTime(HTML5VideoEl.currentTime);
			this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
		};

		// Handle the delay caused by injecting script
		const isPlaying = this.player.getState() === 'playing';
		if (isPlaying || this.autoPlay) {
			this.startTimeUpdate();
			this.embedder.play();
		}

		if (this.isPlayerRegistered) return;

		// Bind WIREWAX to JW player events
		this.player.on('play', this.JWPlayHandler);
		this.player.on('pause', this.JWPauseHandler);
		this.player.on('seek', this.JWSeekHandler);

		// Bind JW to WIREWAX events
		this.embedder.on('play', this.WirewaxPlayHandler);
		this.embedder.on('pause', this.WirewaxPauseHandler);
		this.embedder.on('seeked', this.WirewaxSeekedHandler);
		this.embedder.on('overlayshow', this.WirewaxOverlayShowHandler);
		this.embedder.on('overlayhide', this.WirewaxOverlayHideHandler);
		this.embedder.on('hotspotclick', this.WirewaxHotspotClickHandler);

		this.isPlayerRegistered = true;
	}

	startTimeUpdate() {
		window.cancelAnimationFrame(this.animationId);
		this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
	}

	stopTimeUpdate() {
		window.cancelAnimationFrame(this.animationId);
	}

	// ES6
	JWPlayHandler = () => {
		console.log('JW -> WIREWAX: play');
		this.startTimeUpdate();

		try {
			this.embedder.play();
		} catch (error) {
			console.warn(error);
		}
	};

	JWPauseHandler = () => {
		console.log('JW -> WIREWAX: pause');
		this.stopTimeUpdate();

		try {
			this.embedder.pause();
		} catch (error) {
			console.warn(error);
		}
	};

	JWSeekHandler = (event) => {
		console.log('JW -> WIREWAX: seek');

		try {
			this.embedder.setCurrentTime(event.offset);
		} catch (error) {
			console.warn(error);
		}
	};

	WirewaxPlayHandler = () => {
		console.log('WIREWAX -> JW: play');

		try {
			this.player.play();
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxPauseHandler = () => {
		console.log('WIREWAX -> JW: pause');

		try {
			this.player.pause();
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxSeekedHandler = ({ seekTo }) => {
		console.log('WIREWAX -> JW: seek');

		try {
			this.player.seek(seekTo);
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxHotspotClickHandler = (event) => {
		console.log('hotspot click', { event });
	};

	WirewaxOverlayShowHandler = (event) => {
		console.log('overlay open', { event });
	};

	WirewaxOverlayHideHandler = (event) => {
		console.log('overlay close', { event });
	};
}

export default FandomWirewaxPlugin;
