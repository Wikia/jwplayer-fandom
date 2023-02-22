import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from './utils/GetYoutubeTakeoverDetails';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const mobileReskinnedExperiment = defineExperiment({
	name: 'mobile-reskinned-player',
	buckets: ['p'],
	startDate: Date.parse('2023-02-09T08:00:00'),
	endDate: Date.parse('2023-02-20T11:59:00'),
});

export const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player && shouldLoadUcpPlayer()) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const currentExperiment: Experiment = getExperiment([mobileReskinnedExperiment]);

		if (currentExperiment?.name === mobileReskinnedExperiment?.name) {
			currentExperiment.log.info('Loading re-skinned Mobile Article Video Player');
			import('experimental/players/MobileReskinnedArticleVideoPlayer/MobileReskinnedArticleVideoPlayer').then(
				({ default: JWMobileReskinnedArticleVideoPlayer }) =>
					setPlayer(<JWMobileReskinnedArticleVideoPlayer videoDetails={videoDetails} />),
			);
			return;
		}

		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'mobile' });

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Mobile youtube embed.');
			import('youtube/players/YoutubeMobileArticleVideoPlayer').then(({ default: YoutubeMobileArticleVideoPlayer }) =>
				setPlayer(<YoutubeMobileArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
			return;
		}

		// By default if there is no experiment just set the base player
		if (!currentExperiment) {
			import('jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer').then(
				({ default: JWMobileArticleVideoPlayer }) =>
					setPlayer(<JWMobileArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}
	};

	return player;
};

export default MobileArticleVideoLoader;
