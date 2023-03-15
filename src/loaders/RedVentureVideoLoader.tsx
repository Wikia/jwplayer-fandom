import React, { useEffect, useState } from 'react';
import { RedVentureVideoLoaderProps } from 'loaders/types';

export const RedVentureVideoLoader: React.FC<RedVentureVideoLoaderProps> = ({
	videoDetails,
	showScrollPlayer,
	jwPlayerContainerEmbedId,
	playerUrl,
}) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}
	}, []);

	const getPlayer = async () => {
		const playerProps: RedVentureVideoLoaderProps = {
			videoDetails: videoDetails,
			showScrollPlayer: showScrollPlayer,
			jwPlayerContainerEmbedId: jwPlayerContainerEmbedId,
			playerUrl: playerUrl,
		};

		if (window.location.search.includes('rvexperimental=true')) {
			import('experimental/players/ExperimentalRedVentureVideoPlayer/ExperimentalRedVentureVideoPlayer').then(
				({ default: ExperimentalRedVentureVideoPlayer }) =>
					setPlayer(<ExperimentalRedVentureVideoPlayer {...playerProps} />),
			);
		} else {
			import('jwplayer/players/RedVentureVideoPlayer/RedVentureVideoPlayer').then(
				({ default: RedVentureVideoPlayer }) => setPlayer(<RedVentureVideoPlayer {...playerProps} />),
			);
		}
	};

	return player;
};

export default RedVentureVideoLoader;
