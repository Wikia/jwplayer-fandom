import React, { useEffect, useState } from 'react';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const isReskinned = true; // TODO: add logic for experiment check

		if (isReskinned) {
			console.log('Loading re-skinned Desktop Article Video Player');
			import('experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayer').then(
				({ default: JWDesktopReskinnedArticleVideoPlayer }) =>
					setPlayer(<JWDesktopReskinnedArticleVideoPlayer videoDetails={videoDetails} />),
			);
		} else {
			console.log('Loading plain Desktop Article Video Player');
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
