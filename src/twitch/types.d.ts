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

// export type Embed = () =>
