import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopReskinnedExperiment = defineExperiment({
	name: 'desktop-reskinned-player',
	buckets: ['p'],
	// TODO: Change this before MERGING!! Used for testing purposes. The date will most likely be 2022-11-28
	startDate: Date.parse('2022-12-05T08:00:00'),
	endDate: Date.parse('2022-12-14T11:59:00'),
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
		const currentExperiment: Experiment = getExperiment([desktopReskinnedExperiment]);

		// By default if there is no experiment just set the base player
		if (!currentExperiment) {
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}

		if (currentExperiment?.name === desktopReskinnedExperiment?.name) {
			currentExperiment.log.info('Loading re-skinned Desktop Article Video Player');
			import('experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayer').then(
				({ default: JWDesktopReskinnedArticleVideoPlayer }) =>
					setPlayer(<JWDesktopReskinnedArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
