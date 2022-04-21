declare class FandomWirewaxPlugin {
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
	JWPlayHandler: (event: PlayPlayerEventData) => void = () => {
		this.startTimeUpdate();

		try {
			this.embedder.play();
			jwPlayerWirewaxTracker({
				action: PLAY_ACTION,
			});
		} catch (error) {
			console.warn(error);
		}
	};

	JWPauseHandler: (event: PausePlayerEventData) => void = () => {
		this.stopTimeUpdate();

		try {
			this.embedder.pause();
			jwPlayerWirewaxTracker({
				action: PAUSE_ACTION,
			});
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
		} catch (err) {
			console.log(err);
		}
	};

	WirewaxHotspotClickHandler: (event: HotspotClickEmbedderEventData) => void = () => {
		jwPlayerWirewaxTracker({
			action: HOTSPOT_CLICK_ACTION,
		});
	};

	WirewaxOverlayShowHandler: (event: OverlayShowEmbedderEventData) => void = () => {
		jwPlayerWirewaxTracker({
			action: OVERLAY_SHOW_ACTION,
		});
	};

	WirewaxOverlayHideHandler: (event: OverlayHideEmbedderEventData) => void = () => {
		jwPlayerWirewaxTracker({
			action: OVERLAY_HIDE_ACTION,
		});
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
	pid?: string;
};

type Playlist = PlaylistItem | PlaylistItem[] | string | string[];

type PlaylistItem = {
	title: string;
	duration: number;
	mediaid?: string;
	file?: string;
	image?: string;
	playlist?: PlaylistItem[];
	username?: string;
	userUrl?: string;
	pubdate?: number;
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

interface MutePlayerEventData {
	mute: boolean;
}

interface OnAdTimeEventData {
	client: string;
	creativetype: string;
	duration: number;
	position: number;
	sequence: number;
	tag: string;
	viewable: number;
}

interface OnVideoTimeEventData {
	duration: number;
	position: number;
	viewable: number;
}

interface OnErrorEventData {
	code: number;
	message: string;
	type: string;
}

interface OnVolumeEventData {
	volume: number;
}

interface FullScreenEventData {
	fullscreen: boolean;
}

interface SeekEventData {
	currentTime: number;
	duration: number;
	position: number;
	offset: number;
}

type JwEventData =
	| PlayPlayerEventData
	| PausePlayerEventData
	| TimePlayerEventData
	| ReadyPlayerEventData
	| PlaylistItemPlayerEventData
	| MutePlayerEventData
	| OnVideoTimeEventData
	| OnErrorEventData
	| OnVolumeEventData
	| FullScreenEventData
	| SeekEventData
	| OnAdTimeEventData;
type JwEventHandler = (event?: JwEventData) => void;

interface BasePluginInterface {
	on: (name: string, handler: JwEventHandler) => Player;
}

interface Plugins {
	sharing: BasePluginInterface;
}

type Player = {
	playToggle: () => null;
	pause: () => null;
	play: () => null;
	setMute: (mute: boolean | null) => null;
	setFullscreen: () => null;
	getPlaylistItem: () => PlaylistItem;
	on: (name: string, handler: JwEventHandler) => Player;
	off: (name: string, handler: JwEventHandler) => Player;
	getState: () => string;
	getMute: () => boolean;
	setup(options: PlayerConfig): Player;
	registerPlugin(name: string, version: string, plugin: Record<string, unknown> | typeof FandomWirewaxPlugin);
	getConfig: () => PlayerConfig;
	getContainer: () => HTMLElement;
	seek: (seekTo: number) => void;
	getVolume: () => number;
	getPosition: () => number;
	getCurrentQuality: () => number;
	getPlaylistIndex: () => number;
	getViewable: () => number;
	getDuration: () => number;
	getAdBlock: () => boolean;
	plugins: Plugins;
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

export { CreateWirewaxEmbedder, Embedder, FullScreenEventData, HotspotClickEmbedderEventData, JWPlayerApi, MutePlayerEventData, OnAdTimeEventData, OnErrorEventData, OnVideoTimeEventData, OnVolumeEventData, OverlayHideEmbedderEventData, OverlayShowEmbedderEventData, PausePlayerEventData, PlayPlayerEventData, Player, PlayerConfig, Playlist, PlaylistItem, SeekEventData, SeekedEmbedderEventData, VideoPlayerProps, WirewaxPluginOptions };
