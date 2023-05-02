import React, { useRef, useState, useEffect } from 'react';
import useOnScreen from 'utils/useOnScreen';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import MobileReskinnedArticleVideoPlayerOverlay from 'experimental/players/MobileReskinnedArticleVideoPlayer/MobileReskinnedArticleVideoPlayerOverlay';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import useAdComplete from 'jwplayer/utils/useAdComplete';

import clsx from 'clsx';

import styles from './MobileReskinnedArticleVideoPlayer.module.css';

const MobileReskinnedArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);

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
			<div className={styles.mobileReskinnedArticleVideoTopPlaceholder} ref={placeholderRef}>
				{adComplete && (
					<div
						className={clsx(
							'mobile-article-video-wrapper',
							isScrollPlayer
								? styles.mobileReskinnedArticleVideoWrapperScrollPlayer
								: styles.mobileReskinnedArticleVideoWrapper,
						)}
					>
						<div onClick={handleClick} className={styles.MobileReskinnedVideoContentContainer}>
							{isScrollPlayer && (
								<CloseButton
									className={styles.closeButtonCorner}
									iconColor={'#000'}
									dismiss={() => setDismissed(true)}
									iconSize={'10px'}
								/>
							)}
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
						</div>
					</div>
				)}
			</div>
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
