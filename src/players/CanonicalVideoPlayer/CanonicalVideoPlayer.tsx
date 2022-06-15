import React from 'react';
import { CanonicalVideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import VideoPlayer from 'players/CanonicalVideoPlayer/VideoPlayer';

const CanonicalVideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ currentVideo, onComplete }) => {
	return (
		<PlayerWrapper playerName={'base-player'}>
			<VideoPlayer currentVideo={currentVideo} onComplete={onComplete} />
		</PlayerWrapper>
	);
};

export default CanonicalVideoPlayer;
