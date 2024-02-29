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
	canPlayVideo?: () => boolean;
}

interface TakeoverResponse {
	product: string;
	id: string;
	impressions_per_session: number;
	youtube_take_over: boolean;
	vimeo_take_over: boolean;
	takeover_video_id: string;
}

interface TakeoverDetails {
	videoId?: string;
	type?: 'youtube' | 'vimeo';
}
