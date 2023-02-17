import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopPauseAfterThreePlaysExperiment = defineExperiment({
	name: 'desktop-pause-after-three-plays-player',
	buckets: ['q'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-01T11:59:00'),
});

const desktopPauseAfterFivePlaysExperiment = defineExperiment({
	name: 'desktop-pause-after-five-plays-player',
	buckets: ['r'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-01T11:59:00'),
});

const desktopPauseAfterTenPlaysExperiment = defineExperiment({
	name: 'desktop-pause-after-ten-plays-player',
	buckets: ['s'],
	startDate: Date.parse('2023-02-22T08:00:00'),
	endDate: Date.parse('2023-03-01T11:59:00'),
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
		const currentExperiment: Experiment = getExperiment([
			desktopPauseAfterThreePlaysExperiment,
			desktopPauseAfterFivePlaysExperiment,
			desktopPauseAfterTenPlaysExperiment,
		]);

		// By default if there is no experiment just set the base player
		if (!currentExperiment) {
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);

			return;
		}

		if (currentExperiment?.name === desktopPauseAfterThreePlaysExperiment?.name) {
			currentExperiment.log.info('Loading pause after three plays Desktop Article Video Player');
			import('experimental/players/DesktopPauseAfterPlayPlayer/DesktopPauseAfterPlayPlayer').then(
				({ default: DesktopPauseAfterPlayPlayer }) =>
					setPlayer(
						<DesktopPauseAfterPlayPlayer
							videoDetails={videoDetails}
							playerName="jw-desktop-article-video-pause-after-three-plays"
							playsBeforePause={3}
						/>,
					),
			);
		}

		if (currentExperiment?.name === desktopPauseAfterFivePlaysExperiment?.name) {
			currentExperiment.log.info('Loading pause after five plays Desktop Article Video Player');
			import('experimental/players/DesktopPauseAfterPlayPlayer/DesktopPauseAfterPlayPlayer').then(
				({ default: DesktopPauseAfterPlayPlayer }) =>
					setPlayer(
						<DesktopPauseAfterPlayPlayer
							videoDetails={videoDetails}
							playerName="jw-desktop-article-video-pause-after-five-plays"
							playsBeforePause={5}
						/>,
					),
			);
		}

		if (currentExperiment?.name === desktopPauseAfterTenPlaysExperiment?.name) {
			currentExperiment.log.info('Loading pause after ten plays Desktop Article Video Player');
			import('experimental/players/DesktopPauseAfterPlayPlayer/DesktopPauseAfterPlayPlayer').then(
				({ default: DesktopPauseAfterPlayPlayer }) =>
					setPlayer(
						<DesktopPauseAfterPlayPlayer
							videoDetails={videoDetails}
							playerName="jw-desktop-article-video-pause-after-ten-plays"
							playsBeforePause={10}
						/>,
					),
			);
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
