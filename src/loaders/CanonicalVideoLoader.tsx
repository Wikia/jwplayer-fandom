import React, { useEffect, useState } from 'react';
import { CanonicalVideoLoaderProps } from 'loaders/types';

const CanonicalVideoLoader: React.FC<CanonicalVideoLoaderProps> = ({ currentVideo, onComplete }) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}
	}, []);

	const getPlayer = async () => {
		// By default just set the base player
		import('jwplayer/players/CanonicalVideoPlayer/CanonicalVideoPlayer').then(({ default: CanonicalVideoPlayer }) =>
			setPlayer(<CanonicalVideoPlayer currentVideo={currentVideo} onComplete={onComplete} />),
		);
	};

	return player;
};

export default CanonicalVideoLoader;
