// export type FeaturedVideoApi = (targetContainer: string, playerURL: string) => void;
export type JWPlayerApi = (target?: string) => Player;
export type Player = {
	playToggle: () => null;
	pause(): () => null;
	play(): () => null;
	setMute: () => null;
	setFullscreen: () => null;
	getPlaylistItem: () => { title: string };
	on: (name: string, handler: (event?: string) => void) => null;
	getState: () => string;
	getMute(): () => boolean;
	setup(options: object): Player;
	registerPlugin(name: string, version: string, plugin: object)
};
