import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { checkIfUserInNoVideoExperiment } from 'utils/experiments/experiments';
import { jwPlayerExperimentTracker } from 'jwplayer/utils/videoTracking';
import { ExperimentWindowInterface } from 'utils/experiments/bucketingUtils';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

declare let window: ExperimentWindowInterface;

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			if (checkIfUserInNoVideoExperiment()) {
				window.__user_in_no_video_experiment = true;
				jwPlayerExperimentTracker.singleTrack('desktop-no-video-experiment');
			} else {
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
