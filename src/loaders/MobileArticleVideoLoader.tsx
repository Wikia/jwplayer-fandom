import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const mobileReskinnedExperiment = defineExperiment({
	name: 'mobile-reskinned-player',
	buckets: ['p'],
	startDate: Date.parse('2023-02-09T08:00:00'),
	endDate: Date.parse('2023-02-20T11:59:00'),
});

const mobilePauseAfterThreePlaysExperiment = defineExperiment({
	name: 'mobile-pause-after-three-plays-player',
	buckets: ['q'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-01T11:59:00'),
});

const mobilePauseAfterFivePlaysExperiment = defineExperiment({
	name: 'mobile-pause-after-five-plays-player',
	buckets: ['r'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-01T11:59:00'),
});

const mobilePauseAfterTenPlaysExperiment = defineExperiment({
	name: 'mobile-pause-after-ten-plays-player',
	buckets: ['s'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-01T11:59:00'),
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
		const currentExperiment: Experiment = getExperiment([
			mobileReskinnedExperiment,
			mobilePauseAfterThreePlaysExperiment,
			mobilePauseAfterFivePlaysExperiment,
			mobilePauseAfterTenPlaysExperiment,
		]);

		// By default if there is no experiment just set the base player
		if (!currentExperiment) {
			import('jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer').then(
				({ default: JWMobileArticleVideoPlayer }) =>
					setPlayer(<JWMobileArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}

		if (currentExperiment?.name === mobileReskinnedExperiment?.name) {
			currentExperiment.log.info('Loading re-skinned Mobile Article Video Player');
			import('experimental/players/MobileReskinnedArticleVideoPlayer/MobileReskinnedArticleVideoPlayer').then(
				({ default: JWMobileReskinnedArticleVideoPlayer }) =>
					setPlayer(<JWMobileReskinnedArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}

		if (currentExperiment?.name === mobilePauseAfterThreePlaysExperiment?.name) {
			currentExperiment.log.info('Loading pause after three plays Mobile Article Video Player');
			import('experimental/players/MobilePauseAfterPlayPlayer/MobilePauseAfterPlayPlayer').then(
				({ default: MobilePauseAfterPlayPlayer }) =>
					setPlayer(
						<MobilePauseAfterPlayPlayer
							videoDetails={videoDetails}
							playerName="jw-mobile-article-video-pause-after-three-plays"
							playsBeforePause={3}
						/>,
					),
			);
		}

		if (currentExperiment?.name === mobilePauseAfterFivePlaysExperiment?.name) {
			currentExperiment.log.info('Loading pause after five plays Mobile Article Video Player');
			import('experimental/players/MobilePauseAfterPlayPlayer/MobilePauseAfterPlayPlayer').then(
				({ default: MobilePauseAfterPlayPlayer }) =>
					setPlayer(
						<MobilePauseAfterPlayPlayer
							videoDetails={videoDetails}
							playerName="jw-mobile-article-video-pause-after-five-plays"
							playsBeforePause={5}
						/>,
					),
			);
		}

		if (currentExperiment?.name === mobilePauseAfterTenPlaysExperiment?.name) {
			currentExperiment.log.info('Loading pause after ten plays Mobile Article Video Player');
			import('experimental/players/MobilePauseAfterPlayPlayer/MobilePauseAfterPlayPlayer').then(
				({ default: MobilePauseAfterPlayPlayer }) =>
					setPlayer(
						<MobilePauseAfterPlayPlayer
							videoDetails={videoDetails}
							playerName="jw-mobile-article-video-pause-after-ten-plays"
							playsBeforePause={10}
						/>,
					),
			);
		}
	};

	return player;
};

export default MobileArticleVideoLoader;
