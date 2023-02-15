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
		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'desktop' });

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Desktop youtube embed.');
			import('youtube/players/YoutubeDesktopArticleVideoPlayer').then(({ default: YoutubeDesktopArticleVideoPlayer }) =>
				setPlayer(<YoutubeDesktopArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
			return;
		} else {
			// By default if there is no experiment or youtube embed, then just set the base player
			console.debug('Loading plain Desktop Article Video Player');
			import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
				({ default: JWDesktopArticleVideoPlayer }) =>
					setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
			);
			return;
		}
	};

	return player;
};

export default DesktopArticleVideoLoader;
