interface WindowWithCanPlayVideo extends Window {
	canPlayVideo: () => boolean;
}

declare let window: WindowWithCanPlayVideo;

export const shouldLoadUcpPlayer = () => {
	if (typeof window === 'undefined') {
		return false;
	}
	if (window.location.search.indexOf('jw_always_display=true') > -1) {
		console.debug(
			'jw_always_display=true was set. Player will always show up, even if the canPlayVideo() function evaluates to false.',
		);
		return true;
	}

	const isPlayVideoAFunction = typeof window?.canPlayVideo === 'function';
	console.debug('isPlayVideoAFunction: ', isPlayVideoAFunction);

	const canPlay = isPlayVideoAFunction && window?.canPlayVideo();
	console.debug('Can Play Video on UCP? ', canPlay);

	return canPlay;
};
