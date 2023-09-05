import React, { useEffect, useRef } from 'react';
import { CanonicalVideoPlayerProps } from 'jwplayer/types';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import LoadableVideoPlayerWrapper from 'jwplayer/players/shared/LoadableVideoPlayerWrapper';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import { communicationService } from 'jwplayer/utils/communication';
import { isLocalDevelopment, isOnBrowser } from 'jwplayer/utils/envs';

import clsx from 'clsx';

import styles from './canonicalVideoPlayer.module.scss';

const CanonicalVideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ currentVideo, videoDetails, onComplete }) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const isScrollPlayer = false; // we use default JWP "float on scroll" feature

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
					<div
						className={clsx(
							isScrollPlayer
								? styles.canonicalVideoWrapperIsScrollPlayer
								: styles.canonicalVideoWrapperIsNotScrollPlayer,
						)}
					>
						<LoadableVideoPlayerWrapper
							currentVideo={currentVideo}
							videoDetails={videoDetails}
							onComplete={onComplete}
						/>
					</div>
				)}
			</div>
		</PlayerWrapper>
	);
};

export default CanonicalVideoPlayer;
