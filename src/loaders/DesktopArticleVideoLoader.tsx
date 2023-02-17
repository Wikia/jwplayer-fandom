import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import checkUserGeo from 'utils/experiments/checkUserGeo';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopReskinnedExperiment = defineExperiment({
	name: 'desktop-reskinned-player',
	buckets: ['p'],
	startDate: Date.parse('2022-12-05T08:00:00'),
	endDate: Date.parse('2022-12-14T11:59:00'),
});

const desktopJwFloatOnScrollExperiment = defineExperiment({
	name: 'desktop-jw-float-on-scroll-experiment',
	buckets: ['u'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-03T11:59:00'),
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
		const currentExperiment: Experiment = getExperiment([desktopReskinnedExperiment, desktopJwFloatOnScrollExperiment]);

		// By default if there is no experiment just set the base player
		if (!currentExperiment) {
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}

		if (currentExperiment?.name === desktopJwFloatOnScrollExperiment?.name && checkUserGeo(['us'])) {
			import('experimental/players/DesktopFloatOnScrollArticleVideoPlayer/DesktopFloatOnScrollArticleVideoPlayer').then(
				({ default: DesktopFloatOnScrollArticleVideoPlayer }) =>
					setPlayer(<DesktopFloatOnScrollArticleVideoPlayer videoDetails={videoDetails} />),
			);
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
