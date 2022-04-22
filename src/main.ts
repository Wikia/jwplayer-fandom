export { default as VideoPlayer } from './players/VideoPlayer';
export * from './players/VideoPlayer';

export { default as DesktopArticleVideoPlayer } from './players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
export * from './players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';

export { default as MobileArticleVideoPlayer } from './players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
export * from './players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';

// @ts-ignore
window.__fandom_jw_player_version = process.env.VIDEO_VERSION;
export function getVideoPlayerVersion() {
	return process.env.VIDEO_VERSION;
}
