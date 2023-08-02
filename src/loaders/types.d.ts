import {
	DesktopArticleVideoPlayerProps,
	MobileArticleVideoPlayerProps,
	CanonicalVideoPlayerProps,
} from 'jwplayer/types';

export type DesktopArticleVideoLoaderProps = DesktopArticleVideoPlayerProps | undefined;
export type MobileArticleVideoLoaderProps = MobileArticleVideoPlayerProps | undefined;
export type CanonicalVideoLoaderProps = CanonicalVideoPlayerProps | undefined;

interface MWConfig {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	get: (key: string) => any;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW extends Window {
	mw: MW;
}
