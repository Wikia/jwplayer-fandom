import React, { useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css } from 'styled-components';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import DesktopReskinnedArticleVideoPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayerOverlay';
import DesktopScrollVideoTopContent from 'experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopScrollVideoTopContent';

const DesktopArticleVideoTopPlaceholder = styled.div`
	z-index: ${Number(WDSVariables.z2) + 2};
	position: absolute;
	width: 100%;
	padding-top: 56.25%;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
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
					right: 18px;
					bottom: 45px;
					width: 300px;
					position: fixed;
			  `
			: css`
					position: absolute;
					bottom: 0;
					right: 0;
					top: 0;
					left: 0;
			  `}
`;

const DesktopReskinnedArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	/* TODO: FIX THIS - This is used to test the player locally ONLY */
	const adComplete = true;
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	return (
		<>
			<DesktopArticleVideoTopPlaceholder ref={placeholderRef}>
				{adComplete && (
					<DesktopArticleVideoWrapper
						className={'desktop-article-video-wrapper'}
						right={right}
						width={width}
						isScrollPlayer={isScrollPlayer}
					>
						<DesktopScrollVideoTopContent isScrollPlayer={isScrollPlayer} onCloseClick={() => setDismissed(true)} />
						<DesktopReskinnedArticleVideoPlayerOverlay isScrollPlayer={isScrollPlayer} />
						<JwPlayerWrapper
							playerUrl={'https://cdn.jwplayer.com/libraries/v46VcUMb.js'}
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => {
								articlePlayerOnReady(videoDetails, playerInstance);
							}}
						/>
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution />
		</>
	);
};

const DesktopReskinnedArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	return (
		<PlayerWrapper playerName="jw-desktop-article-video">
			<DesktopReskinnedArticleVideoPlayerContent videoDetails={videoDetails} />
		</PlayerWrapper>
	);
};

export default DesktopReskinnedArticleVideoPlayer;
