import React, { useEffect, useRef, useState } from 'react';
import useOnScreen from 'utils/useOnScreen';
import useAdEngineComplete from 'jwplayer/utils/useAdEngineComplete';
import useJwpAdsSetupComplete from 'jwplayer/utils/useJwpAdsSetupComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import OffScreenOverlay from 'jwplayer/players/MobileArticleVideoPlayer/OffScreenOverlay/OffScreenOverlay';
import { VideoPlaceholder } from 'jwplayer/players/shared/VideoPlaceholder/VideoPlaceholder';
import { MobileArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/MobileArticleVideoPlayer/Attribution';
import { singleTrack } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import { getDismissedFn } from 'jwplayer/utils/utils';
import { useMobileArticleVideoContext } from 'contexts/MobileArticleVideoContext';

import clsx from 'clsx';

import { StrategyRulesWrapper } from 'jwplayer/players/shared/StrategyRulesWrapper';

import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';

import styles from './mobileArticleVideoPlayer.module.scss';

interface MobileArticleVideoWrapperProps {
	isScrollPlayer: boolean;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({ isScrollPlayer, children }) => {
	const { scrollTopPosition } = useMobileArticleVideoContext();

	return (
		<div
			className={clsx(
				`mobile-article-video-wrapper`,
				isScrollPlayer
					? styles.mobileArticleVideoWrapperIsScrollPlayer
					: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
			)}
			style={{
				...(isScrollPlayer && { top: scrollTopPosition }),
			}}
		>
			{children}
		</div>
	);
};

export const MobileArticleVideoPlayerContent: React.FC<MobileArticleVideoPlayerProps> = ({ videoDetails }) => {
	const ref = useRef<HTMLDivElement>(null);
	const adEngineComplete = useAdEngineComplete();
	const jwpAdsSetupComplete = useJwpAdsSetupComplete();
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const inputName = 'isDismissed';
	const relatedContainer = document.getElementById('featured-video__player_related') as HTMLDivElement | null;
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	const getDismissed = getDismissedFn(inputName);

	const onPlayerInstanceReady = (playerInstance) => {
		articlePlayerOnReady(videoDetails, playerInstance);
		setIsPlayerReady(true);
	};

	useEffect(() => {
		if (!onScreen) {
			if (relatedContainer) {
				relatedContainer.style.display = 'none';
			}
			return;
		}

		if (relatedContainer) {
			relatedContainer.style.display = '';
		}

		if (!adEngineComplete && singleTrack('ad-mobile-video-player-impression')) {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_AD);
			return;
		}

		if (singleTrack('mobile-video-player-impression')) {
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
			return;
		}
	}, [onScreen, adEngineComplete]);

	return (
		<>
			<div ref={ref} className={clsx(styles.mobileArticleVideoTopPlaceholder, isScrollPlayer && `is-on-scroll-active`)}>
				<MobileArticleVideoWrapper isScrollPlayer={isScrollPlayer}>
					{jwpAdsSetupComplete.strategyRulesEnabled ? (
						<>
							<StrategyRulesWrapper
								getDismissed={getDismissed}
								config={getArticleVideoConfig(videoDetails)}
								onReady={onPlayerInstanceReady}
								stopAutoAdvanceOnExitViewport={false}
							/>
							<input type="hidden" value={String(dismissed)} name={inputName} />

							{isPlayerReady && <OffScreenOverlay isScrollPlayer={isScrollPlayer} dismiss={() => setDismissed(true)} />}
						</>
					) : (
						adEngineComplete && (
							<>
								<JwPlayerWrapper
									getDismissed={getDismissed}
									config={getArticleVideoConfig(videoDetails)}
									onReady={onPlayerInstanceReady}
									stopAutoAdvanceOnExitViewport={false}
								/>
								<input type="hidden" value={String(dismissed)} name={inputName} />

								{isPlayerReady && (
									<OffScreenOverlay isScrollPlayer={isScrollPlayer} dismiss={() => setDismissed(true)} />
								)}
							</>
						)
					)}
					{!isPlayerReady && <VideoPlaceholder isScrollPlayer={isScrollPlayer} />}{' '}
				</MobileArticleVideoWrapper>
			</div>
			<Attribution />
		</>
	);
};

export const MobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({ videoDetails }) => (
	<PlayerWrapper playerName="jw-mobile-article-video">
		<MobileArticleVideoPlayerContent videoDetails={videoDetails} />
	</PlayerWrapper>
);

export default MobileArticleVideoPlayer;
