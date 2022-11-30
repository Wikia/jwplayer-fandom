import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from 'loaders/utils/GetYoutubeTakeoverDetails';

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
		// By default just set the base player
		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'desktop' });

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Desktop youtube embed.');
			import('youtube/players/YoutubeDesktopArticleVideoPlayer').then(({ default: YoutubeDesktopArticleVideoPlayer }) =>
				setPlayer(<YoutubeDesktopArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
		} else {
			console.debug('Loading plain Desktop Article Video Player');
			// By default just set the base player
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
