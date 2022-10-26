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
		const experimentPromise = new Promise((resolve) => {
			console.log('Should be inside promise.');
			let isReskinned = false;
			const currentExperiment: Experiment = getExperiment([desktopReskinnedExperiment]);
			console.log('defined experiment: ', desktopReskinnedExperiment);
			console.log(`experiment: ${currentExperiment}`);
			if (currentExperiment && currentExperiment?.name === desktopReskinnedExperiment?.name) {
				console.log('Should be inside experiment.');
				isReskinned = true;
			} else {
				console.log('Not inside experiment');
			}
			resolve(isReskinned);
		})
			.then((isReskinned: boolean) => {
				console.log('Inside promise then statement with passed down isReskinned value');
				console.log('Is reskinned is: ', isReskinned);
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
			})
			.then(() => {
				console.log('Should return player from Promise: ', player);
				return player;
			});

		return await experimentPromise;
		// TODO: add logic for experiment check
	};

	console.log('Returning player: ', player);
	return player;
};

export default DesktopArticleVideoLoader;
