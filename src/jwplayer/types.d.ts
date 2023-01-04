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

export interface TimeEventData {
	duration: number;
	position: number;
	viewable: number;
}

interface Bidder {
	id: number;
	name: string;
	priceInCents: number;
	result: string;
	tagKey: number;
	timeforBidResponse: number;
	winner: boolean;
}

export interface AdImpressionEventData {
	adposition: string;
	adsystem: string;
	adtitle: string;
	bidders: Bidder[];
	clickThroughUrl: string;
	client: string;
	creativetype: string;
	duration: number;
	linear: string;
	tag: string;
	timeLoading: number;
	viewable: number;
}

export interface OnPlaylistItemEventData {
	index: number;
	item: PlaylistItem;
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
	| ShareEventData
	| TimeEventData
	| AdImpressionEventData
	| OnPlaylistItemEventData;

type JwEventHandler = (event?: JwEventData) => void;

interface BasePluginInterface {
	on: (name: string, handler: (method: JwEventData) => void) => Player;
	close?: () => void;
	open?: () => void;
}

interface Plugins {
	sharing: BasePluginInterface;
	related: BasePluginInterface;
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
	stop: () => null;
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
	setVolume: (volume: number) => void;
	getPosition: () => number;
	getCurrentQuality: () => number;
	getPlaylistIndex: () => number;
	getViewable: () => number;
	getDuration: () => number;
	getAdBlock: () => boolean;
	getFullscreen: () => boolean;
	getFloating: () => boolean;
	plugins: Plugins;
	getPlugin: (name: string) => BasePluginInterface;
	getQualityLevels: () => QualityObject[];
	load: (playlist: string | Playlist) => null;
	setPlaylistItemCallback: (PlaylistItemCallbackData) => void;
	pauseAd: (state: boolean) => null;
};
export type CreateWirewaxEmbedder = () => Embedder;
export type WirewaxPluginOptions = {
	player: Player;
	ready: JwEventData;
};

export interface AdTimeData {
	client: string;
	creativetype: string;
	duration: number;
	position: number;
	sequence: number;
	tag: string;
	viewable: number;
}

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

export interface CanonicalVideoDetails {
	title: string;
	feedid: string;
	description?: string;
	duration: number;
	mediaid: string;
	link: string;
	image: string;
	images?: Array<JWImages>;
	sources?: Array<Source>;
	tracks?: Array<Track>;
	pubdate: number;
	tags?: Array<string>;
}

/** JWPlayer's video source definition  */
type Source = {
	file: string;
	type: string;
};

/** JWPlayer's video track definition  */
type Track = {
	file: string;
	kind: string;
};

/** JWPlayer's image object definition  */
type JWImages = {
	src: string;
	type: number;
	width: number;
};

export interface CanonicalVideoPlayerProps {
	currentVideo: string;
	videoDetails: CanonicalVideoDetails;
	onComplete: () => void;
}

export interface JwPlayerWrapperProps {
	config?: PlayerConfig;
	playerUrl?: string;
	onReady?: (playerInstance: Player) => void;
	onComplete?: () => void;
	className?: string;
	stopAutoAdvanceOnExitViewport?: boolean;
	shouldLoadSponsoredContentList?: boolean;
}

export interface LoadableVideoPlayerWrapperProps {
	currentVideo: string;
	videoDetails: CanonicalVideoDetails;
	config?: PlayerConfig;
	playerUrl?: string;
	onReady?: (playerInstance: Player) => void;
	onComplete?: () => void;
}

export interface DesktopArticleVideoPlayerProps {
	videoDetails: ArticleVideoDetails;
}

export interface RedVentureVideoPlayerProps {
	videoDetails: ArticleVideoDetails;
	showScrollPlayer: boolean;
}

export interface MobileArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
	videoDetails: ArticleVideoDetails;
}
