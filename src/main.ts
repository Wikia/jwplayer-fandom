export { default as JWVideoPlayer } from './jwplayer/players/VideoPlayer';
export * from './jwplayer/players/VideoPlayer';

export { default as JWDesktopArticleVideoPlayer } from './jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
export * from './jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';

export { default as JWMobileArticleVideoPlayer } from './jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
export * from './jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';

export { default as JWCanonicalVideoPlayer } from './jwplayer/players/CanonicalVideoPlayer/CanonicalVideoPlayer';
export * from './jwplayer/players/CanonicalVideoPlayer/CanonicalVideoPlayer';

export { default as TwitchDesktopArticleVideoPlayer } from './twitch/players/DesktopArticleVideoPlayer';
export * from './twitch/players/DesktopArticleVideoPlayer';

export { default as TwitchMobileArticleVideoPlayer } from './twitch/players/MobileArticleVideoPlayer';
export * from './twitch/players/MobileArticleVideoPlayer';

// @ts-ignore
window.__fandom_jw_player_version = process.env.VIDEO_VERSION;
export function getVideoPlayerVersion() {
	return process.env.VIDEO_VERSION;
}
