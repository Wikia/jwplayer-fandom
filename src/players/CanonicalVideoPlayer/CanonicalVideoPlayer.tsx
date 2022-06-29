import React, { useRef } from 'react';
import { CanonicalVideoPlayerProps } from 'types';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import LoadableVideoPlayerWrapper from 'players/shared/LoadableVideoPlayerWrapper';
import styled, { css } from 'styled-components';
import useOnScreen from 'utils/useOnScreen';

const CanonicalVideoTopPlaceholder = styled.div`
	width: 100%;
	height: 56.25vw;
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

const CanonicalVideoPlayer: React.FC<CanonicalVideoPlayerProps> = ({ currentVideo, onComplete }) => {
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref, '0px', 1);
	const isScrollPlayer = !onScreen;

	return (
		<PlayerWrapper playerName="canonical-video-player">
			<CanonicalVideoTopPlaceholder ref={ref}>
				<CanonicalVideoWrapper isScrollPlayer={isScrollPlayer}>
					<LoadableVideoPlayerWrapper currentVideo={currentVideo} onComplete={onComplete} />
				</CanonicalVideoWrapper>
			</CanonicalVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default CanonicalVideoPlayer;
