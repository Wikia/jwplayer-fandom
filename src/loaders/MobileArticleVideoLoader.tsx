import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';

import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from './utils/GetYoutubeTakeoverDetails';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player && shouldLoadUcpPlayer()) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		// By default just set the base player
		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'mobile' });

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Mobile youtube embed.');
			import('youtube/players/YoutubeMobileArticleVideoPlayer').then(({ default: YoutubeMobileArticleVideoPlayer }) =>
				setPlayer(<YoutubeMobileArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
		} else {
			console.debug('Loading plain Mobile Article Video Player');
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
		}
	};

	return player;
};

export default MobileArticleVideoLoader;
