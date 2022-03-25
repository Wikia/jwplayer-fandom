import { Player as Player$1, Embedder as Embedder$1, WirewaxPluginOptions as WirewaxPluginOptions$1, SeekedEmbedderEventData as SeekedEmbedderEventData$1, HotspotClickEmbedderEventData as HotspotClickEmbedderEventData$1, OverlayShowEmbedderEventData as OverlayShowEmbedderEventData$1, OverlayHideEmbedderEventData as OverlayHideEmbedderEventData$1 } from 'types';

declare class FandomWirewaxPlugin {
	isPlayerRegistered: boolean;
	rootId: string;
	options: Record<string, unknown>;
	player: Player$1;
	autoPlay: boolean;
	embedder: Embedder$1;
	vidId: string;
	container: HTMLElement;
	animationId: number;
	setWIREWAXCurrentTime: () => void;

	constructor(rootId: string, options: WirewaxPluginOptions$1) {
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
		console.log('JW -> WIREWAX: play');
		this.startTimeUpdate();

		try {
			this.embedder.play();
		} catch (error) {
			console.warn(error);
		}
	};

	JWPauseHandler: () => void = () => {
		console.log('JW -> WIREWAX: pause');
		this.stopTimeUpdate();

		try {
			this.embedder.pause();
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
		console.log('WIREWAX -> JW: play');

		try {
			this.player.play();
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxPauseHandler: () => void = () => {
		console.log('WIREWAX -> JW: pause');

		try {
			this.player.pause();
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxSeekedHandler: (event: SeekedEmbedderEventData$1) => void = (event) => {
		console.log('WIREWAX -> JW: seek', event);

		try {
			this.player.seek(event.seekTo);
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxHotspotClickHandler: (event: HotspotClickEmbedderEventData$1) => void = (event) => {
		console.log('hotspot click', { event });
	};

	WirewaxOverlayShowHandler: (event: OverlayShowEmbedderEventData$1) => void = (event) => {
		console.log('overlay open', { event });
	};

	WirewaxOverlayHideHandler: (event: OverlayHideEmbedderEventData$1) => void = (event) => {
		console.log('overlay close', { event });
	};
}

// export type FeaturedVideoApi = (targetContainer: string, playerURL: string) => void;
type JWPlayerApi = (target?: string) => Player;
type PlayerConfig = {
	playlist?: Playlist;
	plugins?: Record<string, unknown>;
	playlistItem?: { mediaid: string; videoId: string };
	mediaElement?: HTMLVideoElement;
	autostart?: boolean;
};

type Playlist = PlaylistItem | PlaylistItem[] | string | string[];

type PlaylistItem = {
	title: string;
	duration: number;
	mediaid?: string;
	file?: string;
	image?: string;
	playlist?: PlaylistItem[];
};

interface PlaylistItemPlayerEventData {
	index?: number;
	item: PlaylistItem;
}

interface PlayPlayerEventData {
	oldState?: string;
	viewable?: number;
	playReason?: string;
}

interface PausePlayerEventData {
	oldState?: string;
	viewable?: number;
	pauseReason?: string;
}

interface TimePlayerEventData {
	duration?: number;
	postion?: number;
	viewable?: number;
}

interface ReadyPlayerEventData {
	setupTime?: number;
	viewable?: number;
}

type JwEventData =
	| PlayPlayerEventData
	| PausePlayerEventData
	| TimePlayerEventData
	| ReadyPlayerEventData
	| PlaylistItemPlayerEventData;
type JwEventHandler = (event?: JwEventData) => void;

type Player = {
	playToggle: () => null;
	pause: () => null;
	play: () => null;
	setMute: (mute: boolean | null) => null;
	setFullscreen: () => null;
	getPlaylistItem: () => PlaylistItem;
	on: (name: string, handler: JwEventHandler) => null;
	off: (name: string, handler: JwEventHandler) => null;
	getState: () => string;
	getMute: () => boolean;
	setup(options: PlayerConfig): Player;
	registerPlugin(name: string, version: string, plugin: Record<string, unknown> | typeof FandomWirewaxPlugin);
	getConfig: () => PlayerConfig;
	getContainer: () => HTMLElement;
	seek: (seekTo: number) => void;
};
type CreateWirewaxEmbedder = () => Embedder;
type WirewaxPluginOptions = {
	player: Player;
	ready: JwEventData;
};

interface SeekedEmbedderEventData {
	seekTo: number;
}

interface OverlayShowEmbedderEventData {
	customRef: string;
	hotspotName: string;
	overlayId: number;
	spriteId: number;
}

interface OverlayHideEmbedderEventData {
	customRef: string;
	hotspotName: string;
	overlayId: number;
	spriteId: number;
}

interface HotspotClickEmbedderEventData {
	action: string;
	actionRef: string;
	customRef: string;
	hotspotName: string;
	spriteId: number;
}

type EmbedderEventData =
	| SeekedEmbedderEventData
	| OverlayShowEmbedderEventData
	| OverlayHideEmbedderEventData
	| HotspotClickEmbedderEventData
	| undefined;
type EmbedderEventHandler = (event?: EmbedderEventData) => void;

type Embedder = {
	createEl: (
		container: HTMLElement,
		embedOptions: {
			isPlugin: boolean;
			videoId: string;
			rootId: string;
		},
	) => null;
	dispose: () => null;
	setCurrentTime: (number) => void;
	ready: () => void;
	play: () => void;
	on: (name: string, handler: EmbedderEventHandler) => null;
	pause: () => void;
};


interface VideoPlayerProps {
	playlist: Playlist;
}

export { CreateWirewaxEmbedder, Embedder, JWPlayerApi, Player, PlayerConfig, Playlist, PlaylistItem, VideoPlayerProps, WirewaxPluginOptions };
