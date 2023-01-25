import React, { useMemo, useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css } from 'styled-components';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import CloseButton from 'jwplayer/players/shared/CloseButton';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import defineExperiment from '@fandom/pathfinder-lite/experiments/defineExperiment';
import getExperiment from '@fandom/pathfinder-lite/experiments/getExperiment';

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
					position: fixed;
					right: 18px;
					bottom: 45px;
					width: 300px;
			  `
			: css`
					position: absolute;
					bottom: 0;
					right: 0;
					top: 0;
					left: 0;
			  `}
`;

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

const CloseButtonPositioned = styled(CloseButton)`
	position: absolute;
	right: 0;
	top: 0;
`;

const desktopJwFloatOnScrollExperiment = defineExperiment({
	name: 'desktop-jw-float-on-scroll-experiment',
	buckets: ['q'],
	// startDate: Date.parse('2023-01-30T08:00:00'),
	startDate: Date.parse('2023-01-24T08:00:00'),
	endDate: Date.parse('2023-02-06T11:59:00'),
});

console.log('outside desktopJwFloatOnScrollExperiment: ', desktopJwFloatOnScrollExperiment);

function isFloatOnScrollExperiment(): boolean {
	const currentExperiment = getExperiment([desktopJwFloatOnScrollExperiment]);
	console.log('currentExperiment: ', currentExperiment);
	console.log('desktopJwFloatOnScrollExperiment:', desktopJwFloatOnScrollExperiment);
	return currentExperiment?.name === desktopJwFloatOnScrollExperiment.name;
}

const DesktopArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	// Memoize this value so its not always re-computed
	const isExperiment = useMemo(isFloatOnScrollExperiment, []);
	console.log('isFloatOnScroll experiment: ', isExperiment);

	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

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
						isScrollPlayer={!isExperiment && isScrollPlayer}
					>
						<TopBar>
							{!isScrollPlayer && <UnmuteButton />}
							{!isExperiment && isScrollPlayer && <CloseButtonPositioned dismiss={() => setDismissed(true)} />}
						</TopBar>
						<JwPlayerWrapper
							playerUrl={isExperiment ? 'https://cdn.jwplayer.com/libraries/UKcdkcuf.js' : undefined}
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							stopAutoAdvanceOnExitViewport={false}
						/>
						{!isExperiment && isScrollPlayer && <VideoDetails />}
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
