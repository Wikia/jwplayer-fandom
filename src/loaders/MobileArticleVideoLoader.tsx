import React from 'react';
import JWMobileArticleVideoPlayer from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
import { MobileArticleVideoLoaderProps } from 'loaders/types';

const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	// Default to JW Player
	return (
		<JWMobileArticleVideoPlayer
			hasPartnerSlot={hasPartnerSlot}
			videoDetails={videoDetails}
			isFullScreen={isFullScreen}
		/>
	);
};

export default MobileArticleVideoLoader;
