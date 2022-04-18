import React, { useRef } from 'react';
import { VideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import { baseVideoPlayerTracker } from 'utils/videoTracking';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlist }) => {
	console.log('main video player update Joshy 123 345');

	const ref = useRef<HTMLDivElement>(null);
	baseVideoPlayerTracker.loaded();

	return (
		<PlayerWrapper>
			<div ref={ref}>
				<JwPlayerWrapper playlist={playlist} />
			</div>
		</PlayerWrapper>
	);
};

export default VideoPlayer;
