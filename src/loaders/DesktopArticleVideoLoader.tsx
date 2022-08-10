import React from 'react';
import JWDesktopArticleVideoPlayer from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import checkIfUserInGeo from 'utils/experiments/checkIfUserInGeo';
import isUserAnon from 'utils/experiments/checkUserAnon';
import checkUserDevice, { UserDeviceType } from 'utils/experiments/checkUserDevice';
import { jwPlayerExperimentTracker } from 'jwplayer/utils/videoTracking';

const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	// Disable video load if:
	if (
		// - user is in the US
		checkIfUserInGeo(['US']) &&
		// - user is anon
		isUserAnon() &&
		// - user is desktop or mobile
		UserDeviceType.Desktop === checkUserDevice()
	) {
		jwPlayerExperimentTracker.singleTrack('video_load_disabled');
		return null;
	}

	// Default to JW Player
	return <JWDesktopArticleVideoPlayer videoDetails={videoDetails} />;
};

export default DesktopArticleVideoLoader;
