import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from 'loaders/utils/GetYoutubeTakeoverDetails';
import { eligibleForVimeoTakeover, getVimeoTakeoverDetails } from 'loaders/utils/GetVimeoTakeoverDetails';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player && shouldLoadUcpPlayer()) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
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
