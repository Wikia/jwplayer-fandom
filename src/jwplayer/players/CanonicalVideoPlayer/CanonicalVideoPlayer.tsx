import React, { useEffect, useRef } from 'react';
import { CanonicalVideoPlayerProps } from 'jwplayer/types';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import LoadableVideoPlayerWrapper from 'jwplayer/players/shared/LoadableVideoPlayerWrapper';
import useAdEngineComplete from 'jwplayer/utils/useAdEngineComplete';
import { getCommunicationService } from 'jwplayer/utils/communication';
import { isLocalDevelopment, isOnBrowser } from 'jwplayer/utils/envs';

import styles from './canonicalVideoPlayer.module.scss';

const CanonicalVideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ currentVideo, videoDetails, onComplete }) => {
	const ref = useRef<HTMLDivElement>(null);
	const communicationService = getCommunicationService();
	const adComplete = useAdEngineComplete();

	useEffect(() => {
		const payload = {
			siteType: 'web',
			isProduction: isOnBrowser() && !isLocalDevelopment(),
		};

		// if the player's mounted communicate that the video platform is ready
		communicationService.dispatch({ type: '[F2] Configured', ...payload });
	}, []);

	return (
		<PlayerWrapper playerName="canonical-video-player">
			<div className={styles.canonicalVideoTopPlaceholder} ref={ref}>
				{adComplete && (
					<LoadableVideoPlayerWrapper currentVideo={currentVideo} videoDetails={videoDetails} onComplete={onComplete} />
				)}
			</div>
		</PlayerWrapper>
	);
};

export default CanonicalVideoPlayer;
