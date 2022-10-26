import React, { useEffect, useContext } from 'react';
import { LoadableVideoPlayerWrapperProps } from 'jwplayer/types';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import { PlayerContext } from 'jwplayer/players/shared/PlayerContext';

import getCanonicalVideoConfig from 'jwplayer/utils/canonicalVideoConfig';

import canonicalOnReady from '../CanonicalVideoPlayer/canonicalOnReady';

const LoadableVideoPlayerWrapper: React.FC<LoadableVideoPlayerWrapperProps> = ({
	currentVideo,
	videoDetails,
	onComplete,
}) => {
	const { player } = useContext(PlayerContext);

	useEffect(() => {
		if (player !== null) {
			player.load(currentVideo);
			player.play();
		}
	}, [currentVideo]);

	return (
		<JwPlayerWrapper
			config={getCanonicalVideoConfig(videoDetails)}
			playerUrl={'https://content.jwplatform.com/libraries/tcoydixg.js'}
			onComplete={onComplete}
			onReady={(playerInstance) => canonicalOnReady(videoDetails, playerInstance)}
		/>
	);
};

export default LoadableVideoPlayerWrapper;
