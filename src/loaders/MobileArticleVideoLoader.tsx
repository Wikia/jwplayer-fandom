import React from 'react';
import JWMobileArticleVideoPlayer from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import { jwPlayerExperimentTracker } from 'jwplayer/utils/videoTracking';
import { checkIfUserInNoVideoExperiment } from 'utils/experiments/experiments';

const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	if (checkIfUserInNoVideoExperiment()) {
		jwPlayerExperimentTracker.singleTrack('no-video-experiment');
		return null;
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
