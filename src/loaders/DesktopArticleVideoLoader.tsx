import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopPauseAfterPlayExperiment = defineExperiment({
	name: 'desktop-pause-after-play-player',
	buckets: ['j'],
	startDate: Date.parse('2023-2-13T08:00:00'),
	endDate: Date.parse('2023-2-20T11:59:00'),
});

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player && shouldLoadUcpPlayer()) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const currentExperiment: Experiment = getExperiment([desktopPauseAfterPlayExperiment]);

		// By default if there is no experiment just set the base player
		if (!currentExperiment) {
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}

		if (currentExperiment?.name === desktopPauseAfterPlayExperiment?.name) {
			currentExperiment.log.info('Loading pause after play Desktop Article Video Player');
			import('experimental/players/DesktopPauseAfterPlayPlayer/DesktopPauseAfterPlayPlayer').then(
				({ default: DesktopPauseAfterPlayPlayer }) =>
					setPlayer(<DesktopPauseAfterPlayPlayer videoDetails={videoDetails} />),
			);
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
