// export type FeaturedVideoApi = (targetContainer: string, playerURL: string) => void;
export type JWPlayerApi = (target?: string) => PlayerFunctions;
export type PlayerFunctions = {
	playToggle: () => null;
	pause(): () => null;
	play(): () => null;
	setMute: () => null;
	setFullscreen: () => null;
	getPlaylistItem: () => { title: string };
	on: (name: string, handler: (event?: string) => void) => null;
	getState: () => string;
	getMute(): () => boolean;
	setup(options: object): PlayerFunctions;
	registerPlugin(name: string, version: string, plugin: object)
};
