import React from 'react';
import JWMobileArticleVideoPlayer from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
import TwitchMobileArticleVideoPlayer from 'twitch/players/MobileArticleVideoPlayer';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { checkTwitchTakeover } from 'loaders/utils/CheckTwitchTakeover';

const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	if (checkTwitchTakeover()) {
		return <TwitchMobileArticleVideoPlayer />;
	}

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
