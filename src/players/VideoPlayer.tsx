import React, { useRef } from 'react';
import { VideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlist }) => {
	const ref = useRef<HTMLDivElement>(null);
	const config = {
		playlist: playlist,
	};

	return (
		<PlayerWrapper playerName={'base-player'}>
			<div ref={ref}>
				<JwPlayerWrapper config={config} />
			</div>
		</PlayerWrapper>
	);
};

export default VideoPlayer;
