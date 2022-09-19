import React, { useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css, keyframes } from 'styled-components';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
// import useAdBreak from 'jwplayer/utils/useAdBreak';
import ContentPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/content/ContentPlayerOverlay';
import PrerollPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/overlays/preroll/PrerollPlayerOverlay';

import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';

/* import useAdComplete from 'jwplayer/utils/useAdComplete'; */

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
		bottom: 45px;
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

const DesktopReskinnedArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	/* TODO: FIX THIS - This is used to test the player locally ONLY */
	const adComplete = true;
	const onScreen = useOnScreen(placeholderRef, '0px', 0.1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');
	// const adBreak = useAdBreak();
	const [adBreak, setAdBreak] = useState(false);

	if (onScreen) {
		if (controlbar) controlbar.style.background = 'rgba(0, 0, 0, 0.5)';
		if (shareIcon) shareIcon.style.display = 'flex';
		if (moreVideosIcon) moreVideosIcon.style.display = 'flex';
		if (pipIcon) pipIcon.style.display = 'flex';
	} else {
		if (controlbar) controlbar.style.background = 'linear-gradient(0,#000,transparent)';
		if (shareIcon) shareIcon.style.display = 'none';
		if (moreVideosIcon) moreVideosIcon.style.display = 'none';
		if (pipIcon) pipIcon.style.display = 'none';
	}

	return (
		<PlayerWrapper playerName="jw-desktop-article-video">
			<DesktopArticleVideoTopPlaceholder ref={placeholderRef}>
				{adComplete && (
					<DesktopArticleVideoWrapper
						className={'desktop-article-video-wrapper'}
						right={right}
						width={width}
						isScrollPlayer={isScrollPlayer}
					>
						{adBreak ? (
							<PrerollPlayerOverlay />
						) : (
							<ContentPlayerOverlay isScrollPlayer={isScrollPlayer} setDismissed={setDismissed} />
						)}
						<JwPlayerWrapper
							playerUrl={'https://cdn.jwplayer.com/libraries/FEZLNIW0.js'}
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => {
								articlePlayerOnReady(videoDetails, playerInstance);
							}}
						/>
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution /> {/* TODO: will need to check here as well */}
			<button style={{ position: 'absolute', bottom: 0 }} onClick={() => setAdBreak(!adBreak)}>
				TEST
			</button>
		</PlayerWrapper>
	);
};

export default DesktopReskinnedArticleVideoPlayer;
