import FandomWirewaxPlugin from './plugins/fandom-wirewax.plugin';

// export type FeaturedVideoApi = (targetContainer: string, playerURL: string) => void;
export type JWPlayerApi = (target?: string) => Player;
export type PlayerConfig = {
	playlist?: Playlist;
	plugins?: Record<string, unknown>;
	playlistItem?: { mediaid: string; videoId: string };
	mediaElement?: HTMLVideoElement;
	autostart?: boolean;
	pid?: string;
	image?: string;
	mute?: boolean;
	description?: string;
	title?: string;
	lang?: string;
};

export type Playlist = PlaylistItem | PlaylistItem[] | string | string[];

export type PlaylistItem = {
	title: string;
	duration: number;
	mediaid?: string;
	file?: string;
	image?: string;
	playlist?: PlaylistItem[];
	username?: string;
	userUrl?: string;
	pubdate?: number;
	link?: string;
};

interface PlaylistItemPlayerEventData {
	index?: number;
	item: PlaylistItem;
}

export interface PlayPlayerEventData {
	oldState?: string;
	viewable?: number;
	playReason?: string;
}

export interface PausePlayerEventData {
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

export interface MutePlayerEventData {
	mute: boolean;
}

export interface AdEvents {
	adId: string;
	advertiser: string;
	adPosition: string;
	adtitle: string;
	duration: number;
	creativeAdId: string;
}

export interface OnAdTimeEventData extends AdEvents {
	client: string;
	creativetype: string;
	position: number;
	sequence: number;
	tag: string;
	viewable: number;
}

export interface OnVideoTimeEventData {
	duration: number;
	position: number;
	viewable: number;
}

export interface OnErrorEventData {
	code: number;
	message: string;
	type: string;
}

export interface OnVolumeEventData {
	volume: number;
}

export interface FullScreenEventData {
	fullscreen: boolean;
}

export interface SeekRange {
	end: number;
	start: number;
}

export interface SeekEventData {
	currentTime: number;
	duration: number;
	position: number;
	offset: number;
	seekRange: SeekRange;
	type: string;
}

export interface ShareEventData {
	method: string;
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
	| AdEvents
	| OnAdTimeEventData
	| ShareEventData;
type JwEventHandler = (event?: JwEventData) => void;

interface BasePluginInterface {
	on: (name: string, handler: (method: JwEventData) => void) => Player;
}

interface Plugins {
	sharing: BasePluginInterface;
}

interface QualityObject {
	bitrate: number;
	label: string;
	width: number;
	height: number;
}

interface PlaylistItemCallbackData {
	item?: PlaylistItem;
	index?: number;
}

export type Player = {
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
	getFullscreen: () => boolean;
	getFloating: () => boolean;
	plugins: Plugins;
	getQualityLevels: () => QualityObject[];
	load: (playlist: string | Playlist) => null;
	setPlaylistItemCallback: (PlaylistItemCallbackData) => void;
};
export type CreateWirewaxEmbedder = () => Embedder;
export type WirewaxPluginOptions = {
	player: Player;
	ready: JwEventData;
};

export interface SeekedEmbedderEventData {
	seekTo: number;
}

export interface OverlayShowEmbedderEventData {
	customRef: string;
	hotspotName: string;
	overlayId: number;
	spriteId: number;
}

export interface OverlayHideEmbedderEventData {
	customRef: string;
	hotspotName: string;
	overlayId: number;
	spriteId: number;
}

export interface HotspotClickEmbedderEventData {
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
	on: (name: string, handler: EmbedderEventHandler) => null;
	pause: () => void;
};
export interface VideoPlayerProps {
	playlist: Playlist;
}

interface ArticleVideoMetadata {
	contentUrl: string;
	description: string;
	duration: string;
	name: string;
	thumbnailUrl: string;
	uploadDate: string;
}

export interface ArticleVideoDetails {
	description: string;
	duration: string;
	feed_instance_id: string;
	impressionsPerSession: number;
	isDedicatedForArticle: boolean;
	kind: string;
	lang: string;
	mediaId: string;
	metadata: ArticleVideoMetadata;
	playlist: Playlist;
	title: string;
	videoTags: string;
}

export interface CanonicalVideoPlayerProps {
	currentVideo: string;
	onComplete: () => void;
}

export interface JwPlayerWrapperProps {
	config?: PlayerConfig;
	playerUrl?: string;
	onReady?: (playerInstance: Player) => void;
	onComplete?: () => void;
}

export interface LoadableVideoPlayerWrapperProps {
	currentVideo: string;
	config?: PlayerConfig;
	playerUrl?: string;
	onReady?: (playerInstance: Player) => void;
	onComplete?: () => void;
}

export interface DesktopArticleVideoPlayerProps {
	videoDetails: ArticleVideoDetails;
}
