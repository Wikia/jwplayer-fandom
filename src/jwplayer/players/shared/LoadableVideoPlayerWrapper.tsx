import React, { useEffect, useContext } from 'react';
import { LoadableVideoPlayerWrapperProps } from 'jwplayer/types';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

const LoadableVideoPlayerWrapper: React.FC<LoadableVideoPlayerWrapperProps> = ({ currentVideo, onComplete }) => {
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
			stopAutoAdvanceOnExitViewport={false}
		/>
	);
};

export default LoadableVideoPlayerWrapper;
