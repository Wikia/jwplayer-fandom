import React, { useRef, useState } from 'react';
import clsx from 'clsx';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import { StrategyRulesWrapper } from 'jwplayer/players/shared/StrategyRulesWrapper';
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
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import {
	ON_SCROLL_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID,
	ON_SCROLL_EXPERIMENT_ID,
	ON_SCROLL_JWPLAYER_UX,
	ON_SCROLL_LARGER_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID,
	ON_SCROLL_LARGER_CUSTOM_UX_WITHOUT_TITLE_BAR_VARIANT_ID,
	PLAYER_WITH_ON_SCROLL_ENABLED_URL,
} from 'utils/experiments/onScrollExperiment';
import { isOptimizelyExperimentActive, isOptimizelyVariationActive } from 'utils/optimizely';

import styles from './DesktopArticleVideoPlayer.module.scss';

export const DesktopArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adEngineComplete = useAdEngineComplete();
	const jwpAdsSetupComplete = useJwpAdsSetupComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	const shouldUsePlayerWithOnScroll = isOptimizelyVariationActive(ON_SCROLL_EXPERIMENT_ID, ON_SCROLL_JWPLAYER_UX); // 400x225 player
	const isScrollPlayer = !(dismissed || onScreen) && isPlayerReady && !shouldUsePlayerWithOnScroll;
	const shouldRenderVideoDetails =
		isScrollPlayer &&
		(!isOptimizelyExperimentActive(ON_SCROLL_EXPERIMENT_ID) ||
			isOptimizelyVariationActive(ON_SCROLL_EXPERIMENT_ID, [
				ON_SCROLL_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID,
				ON_SCROLL_LARGER_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID,
			]));
	const shouldRenderWideOnScrollPlayer =
		isScrollPlayer &&
		isOptimizelyVariationActive(ON_SCROLL_EXPERIMENT_ID, [
			ON_SCROLL_LARGER_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID,
			ON_SCROLL_LARGER_CUSTOM_UX_WITHOUT_TITLE_BAR_VARIANT_ID,
		]);

	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

	const inputName = 'isDismissed';
	const getDismissed = getDismissedFn(inputName);

	const onPlayerInstanceReady = (playerInstance) => {
		articlePlayerOnReady(videoDetails, playerInstance);
		setIsPlayerReady(true);
	};

	if (isScrollPlayer) {
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
						className={clsx({
							[styles.desktopArticleVideoWrapper]: !isScrollPlayer,
							[styles.desktopArticleVideoWrapperScrollPlayer]: isScrollPlayer,
							[styles.isWideVariant]: shouldRenderWideOnScrollPlayer,
						})}
					>
						{jwpAdsSetupComplete.strategyRulesEnabled ? (
							<div>
								<div className={styles.topBar}>
									{!isScrollPlayer && <UnmuteButton />}
									{isScrollPlayer && (
										<CloseButton dismiss={() => setDismissed(true)} iconColor={'#fff'} className={styles.closeButton} />
									)}
								</div>
								<StrategyRulesWrapper
									getDismissed={getDismissed}
									config={getArticleVideoConfig(videoDetails)}
									onReady={onPlayerInstanceReady}
								/>
								<input type="hidden" value={String(dismissed)} name={inputName} />
							</div>
						) : (
							adEngineComplete && (
								<div>
									<div className={styles.topBar}>
										{!isScrollPlayer && <UnmuteButton />}
										{isScrollPlayer && (
											<CloseButton
												dismiss={() => setDismissed(true)}
												iconColor={'#fff'}
												className={styles.closeButton}
											/>
										)}
									</div>
									<JwPlayerWrapper
										getDismissed={getDismissed}
										config={getArticleVideoConfig(videoDetails)}
										onReady={onPlayerInstanceReady}
										stopAutoAdvanceOnExitViewport={false}
										playerUrl={shouldUsePlayerWithOnScroll ? PLAYER_WITH_ON_SCROLL_ENABLED_URL : undefined}
									/>
									{shouldRenderVideoDetails && <VideoDetails />}
									<input type="hidden" value={String(dismissed)} name={inputName} />
								</div>
							)
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
