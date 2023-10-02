import React, { useRef, useState, useEffect } from 'react';
import useOnScreen from 'utils/useOnScreen';
import clsx from 'clsx';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import DesktopReskinnedArticleVideoPlayerOverlay from 'experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopReskinnedArticleVideoPlayerOverlay';
import DesktopScrollVideoTopContent from 'experimental/players/DesktopReskinnedArticleVideoPlayer/DesktopScrollVideoTopContent';
import useAdEngineComplete from 'jwplayer/utils/useAdEngineComplete';

import styles from './DesktopReskinnedArticleVideoPlayer.module.css';

const DesktopReskinnedArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdEngineComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const boundingClientRect = placeholderRef.current?.getBoundingClientRect();

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

	const scrollToPlaceholder = () => {
		const y = boundingClientRect.top - 91;

		window.scrollTo({ top: y, behavior: 'smooth' });
	};

	return (
		<>
			<div className={styles.desktopArticleVideoTopPlaceholder} ref={placeholderRef}>
				{adComplete && (
					<div
						className={clsx(styles.desktopArticleVideoWrapper, {
							[styles.desktopArticleVideoWrapperScrollPlayer]: isScrollPlayer,
						})}
					>
						<DesktopScrollVideoTopContent
							isScrollPlayer={isScrollPlayer}
							onCloseClick={() => setDismissed(true)}
							handleClick={scrollToPlaceholder}
						/>
						<div
							className={styles.desktopReskinnedVideoContentContainer}
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<DesktopReskinnedArticleVideoPlayerOverlay isScrollPlayer={isScrollPlayer} showOverlay={showOverlay} />
							<JwPlayerWrapper
								className={styles.jwPlayerWrapper}
								playerUrl={'https://cdn.jwplayer.com/libraries/v46VcUMb.js'}
								config={getArticleVideoConfig(videoDetails)}
								onReady={(playerInstance) => {
									articlePlayerOnReady(videoDetails, playerInstance);
								}}
							/>
						</div>
					</div>
				)}
			</div>
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
