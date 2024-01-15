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
import { useOptimizelyVariation } from 'optimizely/useOptimizelyVariation';
import { useOptimizelyTrack } from 'optimizely/useOptimizelyTrack';

import { getCommunicationService } from 'jwplayer/utils/communication/communicationService';
import { iasTracker } from 'jwplayer/utils/iasTracker';

import styles from './DesktopArticleVideoPlayer.module.scss';

export const DesktopArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adEngineComplete = useAdEngineComplete();
	const communicationService = getCommunicationService();
	const jwpAdsSetupComplete = useJwpAdsSetupComplete();
	const onScrollVariation = useOptimizelyVariation(ON_SCROLL_EXPERIMENT_ID);
	useOptimizelyTrack(ON_SCROLL_EXPERIMENT_ID);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const [isPlayerReady, setIsPlayerReady] = useState(false);
	const shouldUsePlayerWithOnScroll = onScrollVariation === ON_SCROLL_JWPLAYER_UX;
	const isScrollPlayer = !(dismissed || onScreen) && isPlayerReady && !shouldUsePlayerWithOnScroll;
	const shouldRenderVideoDetails =
		isScrollPlayer &&
		(!onScrollVariation ||
			[ON_SCROLL_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID, ON_SCROLL_LARGER_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID].includes(
				onScrollVariation,
			));
	const shouldRenderWideOnScrollPlayer =
		isScrollPlayer &&
		[
			ON_SCROLL_LARGER_CUSTOM_UX_WITH_TITLE_BAR_VARIANT_ID,
			ON_SCROLL_LARGER_CUSTOM_UX_WITHOUT_TITLE_BAR_VARIANT_ID,
		].includes(onScrollVariation);

	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

	const inputName = 'isDismissed';
	const getDismissed = getDismissedFn(inputName);

	const onPlayerInstanceReady = (playerInstance) => {
		articlePlayerOnReady(videoDetails, playerInstance);
		communicationService.on('[JWPlayer] Player Ready', async () => {
			await iasTracker.loadIasTrackerIfEnabled('fandomdesktop');
		});
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
										vastXml={jwpAdsSetupComplete.vastXml}
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
