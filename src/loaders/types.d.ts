import {
	DesktopArticleVideoPlayerProps,
	MobileArticleVideoPlayerProps,
	CanonicalVideoPlayerProps,
} from 'jwplayer/types';

export type DesktopArticleVideoLoaderProps = DesktopArticleVideoPlayerProps | undefined;
export type MobileArticleVideoLoaderProps =
	| (MobileArticleVideoPlayerProps & {
			scrollTopPosition?: string;
	  })
	| undefined;
export type CanonicalVideoLoaderProps = CanonicalVideoPlayerProps | undefined;

interface MWConfig {
	// eslint-disable-next-line  @typescript-eslint/no-explicit-any
	get: <T = unknown>(key: string) => T;
}

interface MW {
	config: MWConfig;
}

interface WindowWithMW extends Window {
	mw: MW;
}
