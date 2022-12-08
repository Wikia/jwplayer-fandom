import React, { useRef, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import MobileReskinnedArticleVideoPlayerOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/MobileReskinnedArticleVideoPlayerOverlay';
// import useAdComplete from 'jwplayer/utils/useAdComplete';

const MobileReskinnedArticleVideoTopPlaceholder = styled.div`
	width: 100%;
	height: 56.25vw;
	position: relative;
`;

interface MobileReskinnedArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	right?: number;
	width?: number;
}

const MobileReskinnedArticleVideoWrapper = styled.div<MobileReskinnedArticleVideoWrapperProps>`
	${(props) =>
		props.isScrollPlayer
			? css`
					height: max-content;
					right: 1em;
					bottom: 1em;
					width: 50%;
					position: fixed;
			  `
			: css`
					transform: translateZ(0);
					-webkit-transform: translateZ(0);
					-webkit-transition: padding 0.3s;
					transition: padding 0.3s;
					padding: 0;
			  `}
`;

const MobileReskinnedVideoContentContainer = styled.div`
	position: relative;
	flex-grow: 2;
`;

const MobileReskinnedArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	// const adComplete = useAdComplete();
	const adComplete = true;
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	// const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(/* dismissed || */ onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();
	const right = boundingClientRect?.right;
	const width = boundingClientRect?.width;

	const hideOverlayTimeout = () => {
		const timeout: ReturnType<typeof setTimeout> = setTimeout(() => {
			setShowOverlay(false);
			setOverlayTimeout(undefined);
		}, 6000);
		return timeout;
	};

	const [showOverlay, setShowOverlay] = useState(false);
	const [overlayTimeout, setOverlayTimeout] = useState(undefined);

	useEffect(() => {
		setShowOverlay(true);
		setOverlayTimeout(hideOverlayTimeout());
	}, []);

	const resetOverlayTimeout = () => {
		clearTimeout(overlayTimeout);
		setOverlayTimeout(hideOverlayTimeout());
	};

	const handleClick = () => {
		if (overlayTimeout) {
			setShowOverlay(false);
			clearTimeout(overlayTimeout);
			setOverlayTimeout(undefined);
		} else {
			setShowOverlay(true);
			setOverlayTimeout(hideOverlayTimeout());
		}
	};

	return (
		<>
			<MobileReskinnedArticleVideoTopPlaceholder ref={placeholderRef}>
				{adComplete && (
					<MobileReskinnedArticleVideoWrapper
						className={'desktop-article-video-wrapper'}
						right={right}
						width={width}
						isScrollPlayer={isScrollPlayer}
					>
						<MobileReskinnedVideoContentContainer onClick={handleClick}>
							<MobileReskinnedArticleVideoPlayerOverlay
								isScrollPlayer={isScrollPlayer}
								showOverlay={showOverlay}
								resetOverlayTimeout={resetOverlayTimeout}
							/>
							<JwPlayerWrapper
								playerUrl={'https://cdn.jwplayer.com/libraries/v46VcUMb.js'}
								config={getArticleVideoConfig(videoDetails)}
								onReady={(playerInstance) => {
									articlePlayerOnReady(videoDetails, playerInstance);
								}}
							/>
						</MobileReskinnedVideoContentContainer>
					</MobileReskinnedArticleVideoWrapper>
				)}
			</MobileReskinnedArticleVideoTopPlaceholder>
			{/* <Attribution /> */}
		</>
	);
};

const MobileReskinnedArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	return (
		<PlayerWrapper playerName="jw-desktop-article-video">
			<MobileReskinnedArticleVideoPlayerContent videoDetails={videoDetails} />
		</PlayerWrapper>
	);
};

export default MobileReskinnedArticleVideoPlayer;
