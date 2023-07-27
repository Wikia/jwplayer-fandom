import {
	DesktopArticleVideoPlayerProps,
	MobileArticleVideoPlayerProps,
	CanonicalVideoPlayerProps,
} from 'jwplayer/types';

export type DesktopArticleVideoLoaderProps = DesktopArticleVideoPlayerProps | undefined;
export type MobileArticleVideoLoaderProps = MobileArticleVideoPlayerProps | undefined;
export type CanonicalVideoLoaderProps = CanonicalVideoPlayerProps | undefined;

interface MWConfig {
	get: (key: string) => MWConfig;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW extends Window {
	mw: MW;
}
