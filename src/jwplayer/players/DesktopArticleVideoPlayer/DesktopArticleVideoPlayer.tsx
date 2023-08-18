import React, { useRef, useState } from 'react';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import { getDismissedFn } from 'jwplayer/utils/utils';

import styles from './DesktopArticleVideoPlayer.module.css';

export const DesktopArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const searchParams = new URLSearchParams(document.location.search);
	const playerWithAdsEnabled = !!searchParams?.get('player_with_ads');

	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = playerWithAdsEnabled ? true : useAdComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');
	const inputName = 'isDismissed';

	const getDismissed = getDismissedFn(inputName);

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
		<>
			<div className={styles.desktopArticleVideoTopPlaceholder} ref={placeholderRef}>
				{adComplete && playerWithAdsEnabled && (
					<div
						className={
							isScrollPlayer ? styles.desktopArticleVideoWrapperScrollPlayer : styles.desktopArticleVideoWrapper
						}
					>
						<div className={styles.topBar}>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && (
								<CloseButton dismiss={() => setDismissed(true)} iconColor={'#fff'} className={styles.closeButton} />
							)}
						</div>
						<JwPlayerWrapper
							getDismissed={getDismissed}
							config={getArticleVideoConfig(videoDetails, playerWithAdsEnabled)}
							playerUrl={'https://cdn.jwplayer.com/libraries/ZDCnuHA6.js'}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							stopAutoAdvanceOnExitViewport={false}
						/>
						{isScrollPlayer && <VideoDetails />}
						<input type="hidden" value={String(dismissed)} name={inputName} />
					</div>
				)}
				{adComplete && (
					<div
						className={
							isScrollPlayer ? styles.desktopArticleVideoWrapperScrollPlayer : styles.desktopArticleVideoWrapper
						}
					>
						<div className={styles.topBar}>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && (
								<CloseButton dismiss={() => setDismissed(true)} iconColor={'#fff'} className={styles.closeButton} />
							)}
						</div>
						<JwPlayerWrapper
							getDismissed={getDismissed}
							config={getArticleVideoConfig(videoDetails, playerWithAdsEnabled)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							stopAutoAdvanceOnExitViewport={false}
						/>
						{isScrollPlayer && <VideoDetails />}
						<input type="hidden" value={String(dismissed)} name={inputName} />
					</div>
				)}
			</div>
			<Attribution />
		</>
	);
};

export const DesktopArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => (
	<PlayerWrapper playerName="jw-desktop-article-video">
		<DesktopArticleVideoPlayerContent videoDetails={videoDetails} />
	</PlayerWrapper>
);

export default DesktopArticleVideoPlayer;
