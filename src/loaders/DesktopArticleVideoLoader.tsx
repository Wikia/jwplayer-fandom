import React from 'react';
import JWDesktopArticleVideoPlayer from 'jwplayer/players/DesktopArticleVideoPlayer/DesktopArticleVideoPlayer';
import { DesktopArticleVideoLoaderProps } from 'loaders/types';

const DesktopArticleVideoLoader: React.FC<DesktopArticleVideoLoaderProps> = ({ videoDetails }) => {
	// Default to JW Player
	return <JWDesktopArticleVideoPlayer videoDetails={videoDetails} />;
};

export default DesktopArticleVideoLoader;
