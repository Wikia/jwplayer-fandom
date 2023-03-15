import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from './utils/GetYoutubeTakeoverDetails';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const mobilePauseAfterThreePlaysExperiment = defineExperiment({
	name: 'mobile-pause-after-three-plays-player',
	buckets: ['q'],
	startDate: Date.parse('2023-03-02T08:00:00'),
	endDate: Date.parse('2023-03-10T11:59:00'),
});

const mobilePauseAfterFivePlaysExperiment = defineExperiment({
	name: 'mobile-pause-after-five-plays-player',
	buckets: ['r'],
	startDate: Date.parse('2023-03-02T08:00:00'),
	endDate: Date.parse('2023-03-10T11:59:00'),
});

const mobilePauseAfterTenPlaysExperiment = defineExperiment({
	name: 'mobile-pause-after-ten-plays-player',
	buckets: ['s'],
	startDate: Date.parse('2023-03-02T08:00:00'),
	endDate: Date.parse('2023-03-10T11:59:00'),
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
			mobilePauseAfterThreePlaysExperiment,
			mobilePauseAfterFivePlaysExperiment,
			mobilePauseAfterTenPlaysExperiment,
		]);

		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'mobile' });

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Mobile youtube embed.');
			import('youtube/players/YoutubeMobileArticleVideoPlayer').then(({ default: YoutubeMobileArticleVideoPlayer }) =>
				setPlayer(<YoutubeMobileArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
			return;
		} else {
			switch (currentExperiment?.name) {
				case mobilePauseAfterThreePlaysExperiment.name:
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
					break;
				case mobilePauseAfterFivePlaysExperiment.name:
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
					break;
				case mobilePauseAfterTenPlaysExperiment.name:
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
					break;
				default:
					console.debug('Loading default Mobile Article Video Player');
					import('jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer').then(
						({ default: JWMobileArticleVideoPlayer }) =>
							setPlayer(<JWMobileArticleVideoPlayer videoDetails={videoDetails} />),
					);
			}
		}
	};

	return player;
};

export default MobileArticleVideoLoader;
