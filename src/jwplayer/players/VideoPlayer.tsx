import React, { useRef } from 'react';
import { VideoPlayerProps } from 'jwplayer/types';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';

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
