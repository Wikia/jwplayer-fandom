import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';

const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}
	}, []);

	const getPlayer = async () => {
		// By default just set the base player
		import('jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer').then(
			({ default: JWDesktopArticleVideoPlayer }) =>
				setPlayer(<JWDesktopArticleVideoPlayer videoDetails={videoDetails} />),
		);
	};

	return player;
};

export default DesktopArticleVideoLoader;
