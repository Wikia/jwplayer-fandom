import { isLocalhost } from 'utils/getEnv';

interface WindowWithCanPlayVideo {
	canPlayVideo: () => boolean;
}

declare let window: WindowWithCanPlayVideo;

export const shouldLoadUcpPlayer = () => {
	const isPlayVideoAFunction = typeof window?.canPlayVideo === 'function';
	console.debug('isPlayVideoAFunction: ', isPlayVideoAFunction);

	const canPlay = isPlayVideoAFunction && window?.canPlayVideo();
	console.debug('Can Play Video on UCP? ', canPlay);
	console.debug('Can play Video on UCP with localhost: ', isLocalhost());

	// TODO: Check if this should be removed
	const finalResult = canPlay || isLocalhost();
	console.debug('Can play Video final result: ', finalResult);
	return finalResult;
};
