import React from 'react';
import CanonicalVideoPlayer from 'jwplayer/players/CanonicalVideoPlayer/CanonicalVideoPlayer';
import { CanonicalVideoLoaderProps } from 'loaders/types';

const CanonicalVideoLoader: React.FC<CanonicalVideoLoaderProps> = ({ currentVideo, onComplete }) => {
	// Nothing in here for now, largely a placeholder for future needs

	// Default to main Player
	return <CanonicalVideoPlayer currentVideo={currentVideo} onComplete={onComplete} />;
};

export default CanonicalVideoLoader;
