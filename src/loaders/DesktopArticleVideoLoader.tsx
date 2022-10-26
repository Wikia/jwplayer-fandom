import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-bucketing/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-bucketing/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-bucketing/types';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopReskinnedExperiment = defineExperiment({
	name: 'desktop-reskinned-player',
	buckets: ['z', 'a'],
});

const currentExperimentBeforeLoad: Experiment = getExperiment([desktopReskinnedExperiment]);

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const isReskinned = true; // TODO: add logic for experiment check
		const currentExperiment: Experiment = getExperiment([desktopReskinnedExperiment]);
		console.log('defined experiment: ', desktopReskinnedExperiment);
		console.log(`experiment: ${currentExperiment}`);
		console.log(`experiment before load value: ${currentExperimentBeforeLoad}`);
		if (currentExperiment?.name === desktopReskinnedExperiment?.name) {
			console.log('Should be inside experiment.');
		} else {
			console.log('Not inside experiment');
		}

		if (isReskinned) {
			console.log('Loading re-skinned Desktop Article Video Player');
			import('experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayer').then(
				({ default: JWDesktopReskinnedArticleVideoPlayer }) =>
					setPlayer(<JWDesktopReskinnedArticleVideoPlayer videoDetails={videoDetails} />),
			);
		} else {
			console.log('Loading plain Desktop Article Video Player');
			// By default just set the base player
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
