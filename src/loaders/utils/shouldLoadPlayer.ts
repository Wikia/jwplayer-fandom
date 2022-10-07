import { isLocalhost } from 'utils/getEnv';

interface WindowWithCanPlayVideo {
	canPlayVideo: () => boolean;
}

declare let window: WindowWithCanPlayVideo;

export const shouldLoadUcpPlayer = () => {
	const onLocalhost = isLocalhost();
	if (onLocalhost) {
		console.debug('On localhost. Player will load.');
		return true;
	}

	const isPlayVideoAFunction = typeof window?.canPlayVideo === 'function';
	console.debug('isPlayVideoAFunction: ', isPlayVideoAFunction);

	const canPlay = isPlayVideoAFunction && window?.canPlayVideo();
	console.debug('Can Play Video on UCP? ', canPlay);

	return canPlay;
};
