import FandomWirewaxPlugin from './plugins/fandom-wirewax.plugin';

// export type FeaturedVideoApi = (targetContainer: string, playerURL: string) => void;
export type JWPlayerApi = (target?: string) => Player;
export type PlayerConfig = {
	playlist?: string;
	plugins?: Record<string, unknown>;
	playlistItem?: { mediaid: string; videoId: string };
	mediaElement?: HTMLVideoElement;
};
export type PlaylistItem = {
	title?: string;
	duration?: number;
};

interface OnPlaylistItem {
	index?: number;
	item: PlaylistItem;
}

interface OnPlay {
	oldState?: string;
	viewable?: number;
	playReason?: string;
}

interface OnPause {
	oldState?: string;
	viewable?: number;
	pauseReason?: string;
}

interface OnTime {
	duration?: number;
	postion?: number;
	viewable?: number;
}

interface OnReady {
	setupTime?: number;
	viewable?: number;
}

type JwEventData = OnPlay | OnPause | OnTime | OnReady | OnPlaylistItem;
type JwEventHandler = (event?: JwEventData) => void;

export type Player = {
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
export type CreateWirewaxEmbedder = () => Embedder;
export type WirewaxPluginOptions = {
	player: Player;
	ready: JwEventData;
};
export type Embedder = {
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
	on: (name: string, handler: (event?: string | Record<string, number> | Record<string, string>) => void) => null;
	pause: () => void;
};
