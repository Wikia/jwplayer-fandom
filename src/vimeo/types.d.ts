export interface VimeoTakeOverDetails {
	isVimeoTakeover?: boolean;
	videoId?: string;
}

export interface VimeoArticleVideoPlayerTrackingProps {
	deviceType: 'desktop' | 'mobile';
}

export interface VimeoArticleVideoPlayerProps {
	vimeoDetails: VimeoTakeOverDetails;
}

export interface PlayerInstance {
	// To fill with needed player methods...
	getMuted: () => boolean;
}

export type Player = (playerDivId: string, height: number, width: number, parent?: string[]) => PlayerInstance;
