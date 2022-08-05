import React from 'react';
import JWDesktopArticleVideoPlayer from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
import TwitchDesktopArticleVideoPlayer from 'twitch/players/DesktopArticleVideoPlayer';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';
import checkTwitchTakeover from 'loaders/utils/CheckTwitchTakeover';

const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	const twitchTakeover = checkTwitchTakeover();

	if (twitchTakeover) {
		return <TwitchDesktopArticleVideoPlayer />;
	}

	// Default to JW Player
	return <JWDesktopArticleVideoPlayer videoDetails={videoDetails} />;
};

export default DesktopArticleVideoLoader;
