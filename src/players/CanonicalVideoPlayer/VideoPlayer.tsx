import React, { useEffect, useContext } from 'react';
import { CanonicalVideoPlayerProps } from 'types';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import { PlayerContext } from 'players/shared/PlayerContext';

const VideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ currentVideo, onComplete }) => {
	const { player, config } = useContext(PlayerContext);
	const playerConfig = config || { playlist: currentVideo };
	useEffect(() => {
		if (player !== null) {
			player.load(currentVideo);
			player.play();
		}
	}, [currentVideo]);

	return (
		<JwPlayerWrapper
			config={playerConfig}
			playerUrl={'https://content.jwplatform.com/libraries/tcoydixg.js'}
			onComplete={onComplete}
		/>
	);
};

export default VideoPlayer;
