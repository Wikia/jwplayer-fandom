interface WindowLibVersion {
	__fandom_jw_player_version: string;
}

declare let window: WindowLibVersion;

export function getVideoPlayerVersion() {
	return process.env.VIDEO_VERSION;
}

export function setVersionWindowVar() {
	window.__fandom_jw_player_version = process.env.VIDEO_VERSION;
}
