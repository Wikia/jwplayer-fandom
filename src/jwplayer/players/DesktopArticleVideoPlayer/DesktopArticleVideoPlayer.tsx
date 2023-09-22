import React, { useRef, useState } from 'react';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import JwPlayerWrapperWithStrategyRules from 'jwplayer/players/shared/JwPlayerWrapperWithStrategyRules';
import useOnScreen from 'utils/useOnScreen';
import useAdEngineComplete from 'jwplayer/utils/useAdEngineComplete';
import useJwpAdsSetupComplete from 'jwplayer/utils/useJwpAdsSetupComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { VideoPlaceholder } from 'jwplayer/players/shared/VideoPlaceholder/VideoPlaceholder';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import { getDismissedFn } from 'jwplayer/utils/utils';

import styles from './DesktopArticleVideoPlayer.module.scss';

export const DesktopArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adEngineComplete = useAdEngineComplete();
	const jwpAdsSetupComplete = useJwpAdsSetupComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');
	const inputName = 'isDismissed';
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	const getDismissed = getDismissedFn(inputName);

	const onPlayerInstanceReady = (playerInstance) => {
		articlePlayerOnReady(videoDetails, playerInstance);
		setIsPlayerReady(true);
	};

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
				{
					<div
						className={
							isScrollPlayer ? styles.desktopArticleVideoWrapperScrollPlayer : styles.desktopArticleVideoWrapper
						}
					>
						{adEngineComplete && (
							<div>
								<div className={styles.topBar}>
									{!isScrollPlayer && <UnmuteButton />}
									{isScrollPlayer && (
										<CloseButton dismiss={() => setDismissed(true)} iconColor={'#fff'} className={styles.closeButton} />
									)}
								</div>
								{jwpAdsSetupComplete.strategyRulesEnabled && <div className="strategyRulesWrapper" />}
								{jwpAdsSetupComplete.complete && jwpAdsSetupComplete.strategyRulesEnabled ? (
									<JwPlayerWrapperWithStrategyRules
										getDismissed={getDismissed}
										config={getArticleVideoConfig(videoDetails)}
										onReady={onPlayerInstanceReady}
										vastUrl={jwpAdsSetupComplete.vastUrl}
										parentClassName={styles.desktopArticleVideoTopPlaceholder}
									/>
								) : (
									<JwPlayerWrapper
										getDismissed={getDismissed}
										config={getArticleVideoConfig(videoDetails)}
										onReady={onPlayerInstanceReady}
										stopAutoAdvanceOnExitViewport={false}
									/>
								)}
								<input type="hidden" value={String(dismissed)} name={inputName} />
							</div>
						)}
						{!isPlayerReady && <VideoPlaceholder isScrollPlayer={isScrollPlayer} />}
					</div>
				}
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
