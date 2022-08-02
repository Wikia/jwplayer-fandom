export default function getVideoPlayerVersion() {
	try {
		return process.env.VIDEO_VERSION;
	} catch (e) {
		return 'unknown';
	}
}
