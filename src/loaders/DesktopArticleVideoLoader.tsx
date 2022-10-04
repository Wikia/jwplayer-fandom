import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import JWDesktopArticleVideoPlayer from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player && shouldLoadUcpPlayer()) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = () => {
		// By default just set the base player
		setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />);
	};

	return player;
};

export default DesktopArticleVideoLoader;
