import React, { useRef } from 'react';
import { PlaylistItem } from 'types';

import PlayerWrapper from 'players/shared/PlayerWrapper';

import JwPlayerWrapper from './shared/JwPlayerWrapper';

interface VideoPlayerProps {
	playlist: string | PlaylistItem[];
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ playlist }) => {
	const ref = useRef<HTMLDivElement>(null);

	return (
		<PlayerWrapper>
			<div ref={ref}>
				<JwPlayerWrapper playlist={playlist} />;
			</div>
		</PlayerWrapper>
	);
};

export default VideoPlayer;
