import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { getTakeoverDetails } from 'loaders/utils/GetTakeoverDetails';
import { eligibleTracker } from 'loaders/utils/tracking';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState<React.ReactElement | null>(null);

	useEffect(() => {
		if (!player) {
			void getPlayer();
		}

		setVersionWindowVar();
		eligibleTracker.impression();
	}, []);

	const getPlayer = async () => {
		const takeoverDetails = await getTakeoverDetails();

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
