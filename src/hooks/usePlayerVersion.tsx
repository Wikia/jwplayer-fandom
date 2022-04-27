import { useEffect } from 'react';
import getVideoPlayerVersion from 'utils/getVideoPlayerVersion';

/* Temporarily use this hook to set the JWPlayer version, instead of setting it
 * in the main.ts file. The reason behind this is due to issues in UCP,
 * where both versions of the old and this new player are loaded, and the main.ts
 * file always executes. This will be reverted back in the future to be set in the main.ts file. */
const usePlayerVersion = () => {
	useEffect(() => {
		if (window) {
			console.debug('JWPlayer version set.');
			const playerVersion = getVideoPlayerVersion();
			/* eslint-disable */
			// @ts-ignore
			window.__fandom_jw_player_version = playerVersion;
			/* eslint-enable */
		} else {
			console.debug('Cannot set __fandom_jw_player_version on the server-side');
		}
	}, []);
};

export default usePlayerVersion;
