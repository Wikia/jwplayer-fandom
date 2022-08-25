import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		// By default set the base player
		import('jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer').then(
			({ default: JWMobileArticleVideoPlayer }) =>
				setPlayer(
					<JWMobileArticleVideoPlayer
						hasPartnerSlot={hasPartnerSlot}
						videoDetails={videoDetails}
						isFullScreen={isFullScreen}
					/>,
				),
		);
	};

	return player;
};

export default MobileArticleVideoLoader;
