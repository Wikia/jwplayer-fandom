import React, { useEffect, useState } from 'react';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { setVersionWindowVar } from 'loaders/utils/GetVersion';
import { MobileArticleVideoContext } from 'contexts/MobileArticleVideoContext';
import { getTakeoverDetails } from 'loaders/utils/GetTakeoverDetails';

export { getVideoPlayerVersion } from 'loaders/utils/GetVersion';

export const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	videoDetails,
	scrollTopPosition = '55px',
}) => {
	const [player, setPlayer] = useState(undefined);

	useEffect(() => {
		if (!player) {
			getPlayer();
		}

		setVersionWindowVar();
	}, []);

	const getPlayer = async () => {
		const takeoverDetails = await getTakeoverDetails();

		if (takeoverDetails?.type === 'youtube') {
			console.debug('Youtube takeover - loading Mobile youtube embed.');
			import('youtube/players/YoutubeMobileArticleVideoPlayer').then(({ default: YoutubeMobileArticleVideoPlayer }) =>
				setPlayer(<YoutubeMobileArticleVideoPlayer youtubeTakeoverDetails={takeoverDetails} />),
			);
			return;
		} else if (takeoverDetails?.type === 'vimeo') {
			console.debug('Vimeo takeover - loading mobile vimeo embed.');
			import('vimeo/players/VimeoMobileArticleVideoPlayer').then(({ default: VimeoMobileArticleVideoPlayer }) =>
				setPlayer(<VimeoMobileArticleVideoPlayer vimeoDetails={takeoverDetails} />),
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
