import { TakeoverDetails } from 'loaders/types';

export interface VimeoArticleVideoPlayerTrackingProps {
	deviceType: 'desktop' | 'mobile';
}

export interface VimeoArticleVideoPlayerProps {
	vimeoDetails: TakeoverDetails;
}

export interface PlayerInstance {
	// To fill with needed player methods...
	getMuted: () => boolean;
}

export type Player = (playerDivId: string, height: number, width: number, parent?: string[]) => PlayerInstance;
