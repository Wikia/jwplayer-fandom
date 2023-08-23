import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from 'loaders/utils/GetYoutubeTakeoverDetails';
import { eligibleForVimeoTakeover, getVimeoTakeoverDetails } from 'loaders/utils/GetVimeoTakeoverDetails';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

const desktopPauseAfterThreePlaysExperiment = defineExperiment({
	name: 'desktop-pause-after-three-plays-player',
	buckets: ['q'],
	startDate: Date.parse('2023-03-02T08:00:00'),
	endDate: Date.parse('2023-03-10T11:59:00'),
});

const desktopPauseAfterFivePlaysExperiment = defineExperiment({
	name: 'desktop-pause-after-five-plays-player',
	buckets: ['r'],
	startDate: Date.parse('2023-03-02T08:00:00'),
	endDate: Date.parse('2023-03-10T11:59:00'),
});

const desktopPauseAfterTenPlaysExperiment = defineExperiment({
	name: 'desktop-pause-after-ten-plays-player',
	buckets: ['s'],
	startDate: Date.parse('2023-03-02T08:00:00'),
	endDate: Date.parse('2023-03-10T11:59:00'),
});

const desktopJwFloatOnScrollExperiment = defineExperiment({
	name: 'desktop-jw-float-on-scroll-experiment',
	buckets: ['u'],
	startDate: Date.parse('2023-03-13T06:00:00'),
	endDate: Date.parse('2023-03-19T11:59:00'),
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
			desktopJwFloatOnScrollExperiment,
		]);

		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'desktop' });
		const vimeoTakeoverDetails = await getVimeoTakeoverDetails();

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Desktop youtube embed.');
			import('youtube/players/YoutubeDesktopArticleVideoPlayer').then(({ default: YoutubeDesktopArticleVideoPlayer }) =>
				setPlayer(<YoutubeDesktopArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
			return;
		} else if (eligibleForVimeoTakeover(vimeoTakeoverDetails)) {
			console.debug('Vimeo takeover - loading Desktop vimeo embed.');
			import('vimeo/players/VimeoDesktopArticleVideoPlayer').then(({ default: VimeoDesktopArticleVideoPlayer }) =>
				setPlayer(<VimeoDesktopArticleVideoPlayer vimeoDetails={vimeoTakeoverDetails} />),
			);
			return;
		} else {
			switch (currentExperiment?.name) {
				case desktopPauseAfterThreePlaysExperiment.name:
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
					break;
				case desktopPauseAfterFivePlaysExperiment.name:
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
					break;
				case desktopPauseAfterTenPlaysExperiment.name:
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
					break;
				default:
					console.debug('Loading default Desktop Article Video Player');
					import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
						({ default: JWDesktopArticleVideoPlayer }) =>
							setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
					);
			}
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
