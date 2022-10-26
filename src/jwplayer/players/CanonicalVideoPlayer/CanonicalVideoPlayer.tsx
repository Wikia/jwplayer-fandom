import React, { useEffect, useRef } from 'react';
import { CanonicalVideoPlayerProps } from 'jwplayer/types';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import LoadableVideoPlayerWrapper from 'jwplayer/players/shared/LoadableVideoPlayerWrapper';
import styled, { css } from 'styled-components';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import { communicationService } from 'jwplayer/utils/communication';
import { isLocalDevelopment, isOnBrowser } from 'jwplayer/utils/envs';

const CanonicalVideoTopPlaceholder = styled.div`
	width: 100%;
	position: relative;
`;

interface CanonicalVideoWrapperProps {
	isScrollPlayer: boolean;
}

const CanonicalVideoWrapper = styled.div<CanonicalVideoWrapperProps>`
	@media only screen and (max-width: 767px) {
		${(props) =>
			props.isScrollPlayer
				? css`
						box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
						position: fixed;
						top: 55px;
						width: 100%;
						z-index: 10;
				  `
				: css`
						transform: translateZ(0);
						-webkit-transform: translateZ(0);
						-webkit-transition: padding 0.3s;
						transition: padding 0.3s;
						padding: 0;
				  `}
	}
`;

const CanonicalVideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ currentVideo, videoDetails, onComplete }) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref, '0px', 1);
	const isScrollPlayer = !onScreen;

	useEffect(() => {
		const payload = {
			siteType: 'web',
			isProduction: isOnBrowser() && !isLocalDevelopment(),
		};

		// if the player's mounted communicate that the video platform is ready
		communicationService.dispatch({ type: '[F2] Configured', payload });
	}, []);

	return (
		<PlayerWrapper playerName="canonical-video-player">
			<CanonicalVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<CanonicalVideoWrapper isScrollPlayer={isScrollPlayer}>
						<LoadableVideoPlayerWrapper
							currentVideo={currentVideo}
							videoDetails={videoDetails}
							onComplete={onComplete}
						/>
					</CanonicalVideoWrapper>
				)}
			</CanonicalVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default CanonicalVideoPlayer;
