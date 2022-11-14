import 'react';
import { YoutubeTakeOverDetails } from 'loaders/utils/GetYoutubeTakeoverDetails';

// eslint-disable-line @typescript-eslint/no-unused-vars
declare module 'react' {
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	export interface IframeHTMLAttributes<T> {
		enablejsapi?: '0' | '1';
		autoplay?: '0' | '1';
	}
}

export interface TwitchApi {
	Player;
}

export interface PlayerInstance {
	// To fill with needed player methods...
	getMuted: () => boolean;
}

export interface YoutubeArticleVideoPlayerProps {
	youtubeTakeoverDetails: YoutubeTakeOverDetails;
}

export type Player = (
	playerDivId: string,
	channel: string,
	height: number,
	width: number,
	parent?: string[],
) => PlayerInstance;
