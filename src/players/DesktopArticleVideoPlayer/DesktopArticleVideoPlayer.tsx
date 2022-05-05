import React, { useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css, keyframes } from 'styled-components';
import UnmuteButton from 'players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import VideoDetails from 'players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import { Playlist } from 'types';
import CloseButton from 'players/shared/CloseButton';
import Attribution from 'players/DesktopArticleVideoPlayer/Attribution';

const DesktopArticleVideoTopPlaceholder = styled.div`
	position: absolute;
	width: 100%;
	padding-top: 56.25%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
`;

const moveDownAnimation = (right: number, width: number) => keyframes`
	from {
		right: ${right}px;
		bottom: 100%;
		width: ${width}px;
	}

	to {
		right: 18px;
		bottom: 18px;
		width: 300px;  
	}
`;

interface DesktopArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	right?: number;
	width?: number;
}

const DesktopArticleVideoWrapper = styled.div<DesktopArticleVideoWrapperProps>`
	height: max-content;
	${(props) =>
		props.isScrollPlayer
			? css`
					z-index: ${Number(WDSVariables.z2) + 2};
					position: fixed;
					animation: ${moveDownAnimation(props.right, props.width)} 0.4s normal forwards;
			  `
			: css`
					position: absolute;
					bottom: 0;
					right: 0;
					top: 0;
					left: 0;
					transform: translateZ(0);
					-webkit-transform: translateZ(0);
			  `}
`;

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

interface DesktopArticleVideoPlayerProps {
	playlist: Playlist;
}

const DesktopArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ playlist }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');

	if (onScreen) {
		if (controlbar) controlbar.style.background = 'rgba(0, 0, 0, 0.5)';
	} else {
		if (controlbar) controlbar.style.background = 'linear-gradient(0,#000,transparent)';
	}

	return (
		<PlayerWrapper playerName="desktop-article-video">
			<DesktopArticleVideoTopPlaceholder ref={placeholderRef}>
				{adComplete && (
					<DesktopArticleVideoWrapper right={right} width={width} isScrollPlayer={isScrollPlayer}>
						<TopBar>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && <CloseButton dismiss={() => setDismissed(true)} />}
						</TopBar>
						<JwPlayerWrapper playlist={playlist} />
						{isScrollPlayer && <VideoDetails />}
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
