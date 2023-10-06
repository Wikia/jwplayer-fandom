import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';
import { Experiment } from '@fandom/pathfinder-lite/types';
import checkUserGeo from 'utils/experiments/checkUserGeo';
import { getTakeoverDetails } from 'loaders/utils/GetTakeoverDetails';

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

		const takeoverDetails = await getTakeoverDetails({ deviceType: 'desktop' });

		if (takeoverDetails?.type === 'youtube') {
			console.debug('Youtube takeover - loading Desktop youtube embed.');
			import('youtube/players/YoutubeDesktopArticleVideoPlayer').then(({ default: YoutubeDesktopArticleVideoPlayer }) =>
				setPlayer(<YoutubeDesktopArticleVideoPlayer youtubeTakeoverDetails={takeoverDetails} />),
			);
			return;
		} else if (takeoverDetails?.type === 'vimeo') {
			console.debug('Vimeo takeover - loading Desktop vimeo embed.');
			import('vimeo/players/VimeoDesktopArticleVideoPlayer').then(({ default: VimeoDesktopArticleVideoPlayer }) =>
				setPlayer(<VimeoDesktopArticleVideoPlayer vimeoDetails={takeoverDetails} />),
			);
			return;
		} else if (currentExperiment?.name === desktopJwFloatOnScrollExperiment?.name && checkUserGeo(['us'])) {
			import('experimental/players/DesktopFloatOnScrollArticleVideoPlayer/DesktopFloatOnScrollArticleVideoPlayer').then(
				({ default: DesktopFloatOnScrollArticleVideoPlayer }) =>
					setPlayer(<DesktopFloatOnScrollArticleVideoPlayer videoDetails={videoDetails} />),
			);
		} else {
			console.debug('Loading default Desktop Article Video Player');
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
