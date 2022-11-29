import React, { useRef, useState, useEffect } from 'react';
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
import useAdComplete from 'jwplayer/utils/useAdComplete';

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
	display: flex;
	flex-direction: column;
	justify-content: space-between;

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

const DesktopReskinnedVideoContentContainer = styled.div`
	position: relative;
	flex-grow: 2;
`;

const JwPlayerWrapperStyled = styled(JwPlayerWrapper)`
	cursor: pointer;
`;

const DesktopReskinnedArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	const hideOverlayTimeout = () => {
		const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
			setShowOverlay(false);
			setOverlayTimeout(undefined);
		}, 2000);
		return timeout;
	};

	const [showOverlay, setShowOverlay] = useState(false);
	const [overlayTimeout, setOverlayTimeout] = useState(undefined);

	useEffect(() => {
		setShowOverlay(true);
		setOverlayTimeout(hideOverlayTimeout());
	}, []);

	const handleMouseEnter = () => {
		if (overlayTimeout) {
			clearTimeout(overlayTimeout);
			setOverlayTimeout(undefined);
		}

		setShowOverlay(true);
	};

	const handleMouseLeave = () => {
		if (overlayTimeout) {
			clearTimeout(overlayTimeout);
		}
		setOverlayTimeout(hideOverlayTimeout());
	};

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
						<DesktopScrollVideoTopContent
							isScrollPlayer={isScrollPlayer}
							onCloseClick={() => setDismissed(true)}
							handleClick={() => placeholderRef.current.scrollIntoView()}
						/>
						<DesktopReskinnedVideoContentContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
							<DesktopReskinnedArticleVideoPlayerOverlay isScrollPlayer={isScrollPlayer} showOverlay={showOverlay} />
							<JwPlayerWrapperStyled
								playerUrl={'https://cdn.jwplayer.com/libraries/v46VcUMb.js'}
								config={getArticleVideoConfig(videoDetails)}
								onReady={(playerInstance) => {
									articlePlayerOnReady(videoDetails, playerInstance);
								}}
							/>
						</DesktopReskinnedVideoContentContainer>
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
