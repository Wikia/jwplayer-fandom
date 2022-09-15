import React, { useRef } from 'react';
import styled from 'styled-components';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';

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

interface DesktopArticleVideoWrapperProps {
	right?: number;
	width?: number;
}

const DesktopArticleVideoWrapper = styled.div<DesktopArticleVideoWrapperProps>`
	height: max-content;
	position: absolute;
	bottom: 0;
	right: 0;
	top: 0;
	left: 0;
	transform: translateZ(0);
	-webkit-transform: translateZ(0);
`;

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

const DesktopArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

	if (controlbar) controlbar.style.background = 'linear-gradient(0,#000,transparent)';
	if (shareIcon) shareIcon.style.display = 'none';
	if (moreVideosIcon) moreVideosIcon.style.display = 'none';
	if (pipIcon) pipIcon.style.display = 'none';

	return (
		<PlayerWrapper playerName="jw-desktop-article-video">
			<DesktopArticleVideoTopPlaceholder ref={placeholderRef}>
				{adComplete && (
					<DesktopArticleVideoWrapper className={'desktop-article-video-wrapper'} right={right} width={width}>
						<TopBar>
							<UnmuteButton />
						</TopBar>
						<JwPlayerWrapper
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							playerUrl={'https://cdn.jwplayer.com/libraries/VXc5h4Tf.js'}
						/>
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
