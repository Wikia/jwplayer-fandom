import React from 'react';
import JWMobileArticleVideoPlayer from 'jwplayer/players/MobileArticleVideoPlayer/MobileArticleVideoPlayer';
import { MobileArticleVideoLoaderProps } from 'loaders/types';
import checkIfUserInGeo from 'utils/experiments/checkIfUserInGeo';
import isUserAnon from 'utils/experiments/checkUserAnon';
import { jwPlayerExperimentTracker } from 'jwplayer/utils/videoTracking';

const MobileArticleVideoLoader: React.FC<MobileArticleVideoLoaderProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	// Disable video load if:
	if (
		// - user is in the US
		checkIfUserInGeo(['US']) &&
		// - user is anon
		isUserAnon()
	) {
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
