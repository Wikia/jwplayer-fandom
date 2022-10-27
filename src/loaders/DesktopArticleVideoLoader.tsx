import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-bucketing/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-bucketing/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-bucketing/types';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopReskinnedExperiment = defineExperiment({
	name: 'desktop-reskinned-player',
	buckets: ['p', 'q'],
});

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const currentExperiment: Experiment = getExperiment([desktopReskinnedExperiment]);

		// By default just set the base player
		if (!currentExperiment) {
			console.log('Loading plain Desktop Article Video Player');
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}

		if (currentExperiment?.name === desktopReskinnedExperiment?.name) {
			console.log('Loading re-skinned Desktop Article Video Player');
			import('experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayer').then(
				({ default: JWDesktopReskinnedArticleVideoPlayer }) =>
					setPlayer(<JWDesktopReskinnedArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}
	};

	console.log('Returning player: ', player);
	return player;
};

export default DesktopArticleVideoLoader;
