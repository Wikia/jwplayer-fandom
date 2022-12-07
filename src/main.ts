export { default as JWVideoPlayer } from 'jwplayer/players/VideoPlayer';

export { default as JWDesktopArticleVideoPlayer } from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';

export { default as JWMobileArticleVideoPlayer } from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';

export { default as JWCanonicalVideoPlayer } from 'jwplayer/players/CanonicalVideoPlayer/CanonicalVideoPlayer';

export { default as YoutubeDesktopArticleVideoPlayer } from 'youtube/players/YoutubeDesktopArticleVideoPlayer';

export { default as JWDesktopReskinnedArticleVideoPlayer } from 'experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayer';

export { default as YoutubeMobileArticleVideoPlayer } from 'youtube/players/YoutubeMobileArticleVideoPlayer';

export { default as DesktopArticleVideoLoader } from 'loaders/DesktopArticleVideoLoader';

export { default as MobileArticleVideoLoader } from 'loaders/MobileArticleVideoLoader';

export { default as CanonicalVideoLoader } from 'loaders/CanonicalVideoLoader';

// @ts-ignore
window.__fandom_jw_player_version = process.env.VIDEO_VERSION;
export function getVideoPlayerVersion() {
	return process.env.VIDEO_VERSION;
}
