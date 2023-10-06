import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import { MobileArticleVideoContext } from 'contexts/MobileArticleVideoContext';
import {
	eligibleForYoutubeTakeover,
	eligibleForVimeoTakeover,
	getTakeoverDetails,
} from 'loaders/utils/GetTakeoverDetails';
import { YoutubeTakeOverDetails } from 'youtube/types';
import { VimeoTakeOverDetails } from 'vimeo/types';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	videoDetails,
	scrollTopPosition = '55px',
}) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player && shouldLoadUcpPlayer()) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const takeoverDetails = await getTakeoverDetails({ deviceType: 'mobile' });

		if (eligibleForYoutubeTakeover(takeoverDetails as YoutubeTakeOverDetails)) {
			console.debug('Youtube takeover - loading Mobile youtube embed.');
			import('youtube/players/YoutubeMobileArticleVideoPlayer').then(({ default: YoutubeMobileArticleVideoPlayer }) =>
				setPlayer(
					<YoutubeMobileArticleVideoPlayer youtubeTakeoverDetails={takeoverDetails as YoutubeTakeOverDetails} />,
				),
			);
			return;
		} else if (eligibleForVimeoTakeover(takeoverDetails as VimeoTakeOverDetails)) {
			console.debug('Vimeo takeover - loading mobile vimeo embed.');
			import('vimeo/players/VimeoMobileArticleVideoPlayer').then(({ default: VimeoMobileArticleVideoPlayer }) =>
				setPlayer(<VimeoMobileArticleVideoPlayer vimeoDetails={takeoverDetails as VimeoTakeOverDetails} />),
			);
			return;
		} else {
			console.debug('Loading default Mobile Article Video Player');
			import('jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer').then(
				({ default: JWMobileArticleVideoPlayer }) =>
					setPlayer(<JWMobileArticleVideoPlayer videoDetails={videoDetails} />),
			);
		}
	};

	return (
		<MobileArticleVideoContext.Provider value={{ scrollTopPosition }}>{player}</MobileArticleVideoContext.Provider>
	);
};

export default MobileArticleVideoLoader;
