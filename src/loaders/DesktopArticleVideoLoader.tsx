import React from 'react';
import JWDesktopArticleVideoPlayer from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import { jwPlayerExperimentTracker } from 'jwplayer/utils/videoTracking';
import { checkIfUserInNoVideoExperiment } from 'utils/experiments/experiments';

const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	// Disable video load if:
	if (checkIfUserInNoVideoExperiment()) {
		jwPlayerExperimentTracker.singleTrack('no-video-experiment');
		return null;
	}

	// Default to JW Player
	return <JWDesktopArticleVideoPlayer videoDetails={videoDetails} />;
};

export default DesktopArticleVideoLoader;
