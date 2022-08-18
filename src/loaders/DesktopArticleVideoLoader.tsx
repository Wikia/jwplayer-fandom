import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { checkIfUserInNoVideoExperiment } from 'utils/experiments/experiments';
import { jwPlayerExperimentTracker } from 'jwplayer/utils/videoTracking';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		console.log('loading video player');
		if (!player) {
			console.log('video player is not loaded, so we are loading it');
			if (checkIfUserInNoVideoExperiment()) {
				console.log('experiment was hit, so no player');
				jwPlayerExperimentTracker.singleTrack('desktop-no-video-experiment');
			} else {
				console.log('load the player since we are not in the experiment');
				getPlayer();
			}
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		// By default just set the base player
		import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
			({ default: JWDesktopArticleVideoPlayer }) =>
				setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
		);
	};

	return player;
};

export default DesktopArticleVideoLoader;
