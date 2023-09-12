import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { shouldLoadUcpPlayer } from 'loaders/utils/shouldLoadPlayer';
import { MobileArticleVideoContext } from 'contexts/MobileArticleVideoContext';

import { eligibleForYoutubeTakeover, getYoutubeTakeoverDetails } from './utils/GetYoutubeTakeoverDetails';
import { eligibleForVimeoTakeover, getVimeoTakeoverDetails } from './utils/GetVimeoTakeoverDetails';

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
		const youtubeTakeoverDetails = await getYoutubeTakeoverDetails({ deviceType: 'mobile' });
		const vimeoTakeoverDetails = await getVimeoTakeoverDetails();

		if (eligibleForYoutubeTakeover(youtubeTakeoverDetails)) {
			console.debug('Youtube takeover - loading Mobile youtube embed.');
			import('youtube/players/YoutubeMobileArticleVideoPlayer').then(({ default: YoutubeMobileArticleVideoPlayer }) =>
				setPlayer(<YoutubeMobileArticleVideoPlayer youtubeTakeoverDetails={youtubeTakeoverDetails} />),
			);
			return;
		} else if (eligibleForVimeoTakeover(vimeoTakeoverDetails)) {
			console.debug('Vimeo takeover - loading mobile vimeo embed.');
			import('vimeo/players/VimeoMobileArticleVideoPlayer').then(({ default: VimeoMobileArticleVideoPlayer }) =>
				setPlayer(<VimeoMobileArticleVideoPlayer vimeoDetails={vimeoTakeoverDetails} />),
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
