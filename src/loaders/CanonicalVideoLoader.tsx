import React, { useEffect, useState } from 'react';
import { CanonicalVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const CanonicalVideoLoader: React.FC<CanonicalVideoLoaderProps> = ({
	currentVideo,
	videoDetails,
	onComplete,
}) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	// Since the player is lazy loaded, change the player again when there is a new video prop
	useEffect(() => {
		getPlayer();
	}, [currentVideo]);

	const getPlayer = async () => {
		// By default just set the base player
		import('jwplayer/players/CanonicalVideoPlayer/CanonicalVideoPlayer').then(({ default: CanonicalVideoPlayer }) =>
			setPlayer(
				<CanonicalVideoPlayer currentVideo={currentVideo} onComplete={onComplete} videoDetails={videoDetails} />,
			),
		);
	};

	return player;
};

export default CanonicalVideoLoader;
