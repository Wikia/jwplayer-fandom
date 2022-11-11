import 'react';

// eslint-disable-line @typescript-eslint/no-unused-vars
declare module 'react' {
	/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
	export interface IframeHTMLAttributes<T> {
		enablejsapi?: '0' | '1';
	}
}

export interface TwitchApi {
	Player;
}

export interface PlayerInstance {
	// To fill with needed player methods...
	getMuted: () => boolean;
}

export type Player = (
	playerDivId: string,
	channel: string,
	height: number,
	width: number,
	parent?: string[],
) => PlayerInstance;
