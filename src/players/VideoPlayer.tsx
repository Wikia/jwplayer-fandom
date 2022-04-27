import React, { useRef } from 'react';
import { VideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import usePlayerVersion from 'hooks/usePlayerVersion';

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlist }) => {
	usePlayerVersion();
	const ref = useRef<HTMLDivElement>(null);

	return (
		<PlayerWrapper playerName={'base-player'}>
			<div ref={ref}>
				<JwPlayerWrapper playlist={playlist} />
			</div>
		</PlayerWrapper>
	);
};

export default VideoPlayer;
