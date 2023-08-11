import 'react';

// eslint-disable-line @typescript-eslint/no-unused-vars
declare module 'react' {
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	export interface IframeHTMLAttributes<T> {
		enablejsapi?: '0' | '1';
		autoplay?: '0' | '1';
	}
}

interface MWConfig {
	get: (key: string) => unknown;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW extends Window {
	mw: MW;
}

export interface YoutubeTakeoverResponse {
	product: string;
	id: string;
	impression_per_session: number;
	youtube_take_over: boolean;
	takeover_video_id: string;
}

export interface YoutubeTakeOverDetails {
	isYoutubeTakeover?: boolean;
	youtubeVideoId?: string;
}

export interface PlayerInstance {
	// To fill with needed player methods...
	getMuted: () => boolean;
}

export interface YoutubeArticleVideoPlayerProps {
	youtubeTakeoverDetails: YoutubeTakeOverDetails;
}

export type Player = (playerDivId: string, height: number, width: number, parent?: string[]) => PlayerInstance;
