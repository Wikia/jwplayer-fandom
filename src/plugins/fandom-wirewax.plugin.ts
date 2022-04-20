import {
	CreateWirewaxEmbedder,
	Player,
	Embedder,
	WirewaxPluginOptions,
	OverlayShowEmbedderEventData,
	OverlayHideEmbedderEventData,
	HotspotClickEmbedderEventData,
	SeekedEmbedderEventData,
} from '../types';

interface WindowWirewax extends Window {
	createWirewaxEmbedder?: CreateWirewaxEmbedder;
	currentPlaylistItemWirewax: boolean;
}

declare let window: WindowWirewax;

// Utilities
const fetchWIREWAXVidId = async (mediaid: string): Promise<string> => {
	if (!mediaid) {
		throw new TypeError('No JW media id is specified.');
	}

	const response = await fetch(`https://edge-player.wirewax.com/jwPlayerData/${mediaid}.txt`);

	if (response.status !== 200) {
		window.currentPlaylistItemWirewax = false;
		throw new Error('No vidId is mapped with this mediaid');
	}

	const vidId: string = (await response.json()) as string;

	window.currentPlaylistItemWirewax = true;

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
	isPlayerRegistered: boolean;
	rootId: string;
	options: Record<string, unknown>;
	player: Player;
	autoPlay: boolean;
	embedder: Embedder;
	vidId: string;
	container: HTMLElement;
	animationId: number;
	setWIREWAXCurrentTime: () => void;

	constructor(rootId: string, options: WirewaxPluginOptions) {
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
				.then((vidId: string) => {
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

	// on(event, callback) {
	// 	// ...
	// }

	async setupEmbedder(): Promise<void> {
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

	registerEvents(): void {
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

	startTimeUpdate(): void {
		window.cancelAnimationFrame(this.animationId);
		this.animationId = window.requestAnimationFrame(this.setWIREWAXCurrentTime);
	}

	stopTimeUpdate(): void {
		window.cancelAnimationFrame(this.animationId);
	}

	// ES6
	JWPlayHandler: () => void = () => {
		this.startTimeUpdate();

		try {
			this.embedder.play();
			// TODO: reaplace with tracking
			console.log('wirewax play');
		} catch (error) {
			console.warn(error);
		}
	};

	JWPauseHandler: () => void = () => {
		this.stopTimeUpdate();

		try {
			this.embedder.pause();
			// TODO: reaplace with tracking
			console.log('wirewax pause');
		} catch (error) {
			console.warn(error);
		}
	};

	JWSeekHandler: (event: Record<string, number>) => void = (event) => {
		console.log('JW -> WIREWAX: seek');

		try {
			this.embedder.setCurrentTime(event.offset);
		} catch (error) {
			console.warn(error);
		}
	};

	WirewaxPlayHandler: () => void = () => {
		try {
			if (this.player.getState() !== 'playing') {
				this.player.play();
			}
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxPauseHandler: () => void = () => {
		try {
			if (this.player.getState() !== 'paused') {
				this.player.pause();
			}
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxSeekedHandler: (event: SeekedEmbedderEventData) => void = (event) => {
		try {
			if (typeof event === 'number') {
				this.player.seek(event);
			} else if (typeof event.seekTo === 'number') {
				this.player.seek(event.seekTo);
			}
			// TODO: reaplace with tracking
			console.log('wirewax seek', { event });
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxHotspotClickHandler: (event: HotspotClickEmbedderEventData) => void = (event) => {
		// TODO: reaplace with tracking
		console.log('wirewax hotspot click', { event });
	};

	WirewaxOverlayShowHandler: (event: OverlayShowEmbedderEventData) => void = (event) => {
		// TODO: reaplace with tracking
		console.log('wirewax overlay open', { event });
	};

	WirewaxOverlayHideHandler: (event: OverlayHideEmbedderEventData) => void = (event) => {
		// TODO: reaplace with tracking
		console.log('wirewax overlay close', { event });
	};
}

export default FandomWirewaxPlugin;
