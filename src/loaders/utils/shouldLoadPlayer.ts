interface WindowWithCanPlayVideo {
	canPlayVideo: () => boolean;
}

declare let window: WindowWithCanPlayVideo;

export const shouldLoadUcpPlayer = () => {
	const isPlayVideoAFunction = typeof window?.canPlayVideo === 'function';
	console.debug('isPlayVideoAFunction: ', isPlayVideoAFunction);

	const canPlay = isPlayVideoAFunction && window?.canPlayVideo();
	console.debug('Can Play Video on UCP? ', canPlay);

	return canPlay;
};
