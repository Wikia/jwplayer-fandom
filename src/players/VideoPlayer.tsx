import React, { useRef } from 'react';
import { VideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import { baseVideoPlayerTracker } from 'utils/videoTracking';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlist }) => {
	const ref = useRef<HTMLDivElement>(null);
	baseVideoPlayerTracker.loaded();

	return (
		<PlayerWrapper playerName={'base-player'}>
			<div ref={ref}>
				<JwPlayerWrapper playlist={playlist} />
			</div>
		</PlayerWrapper>
	);
};

export default VideoPlayer;
