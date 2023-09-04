import React, { useEffect, useRef, useState } from 'react';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import OffScreenOverlay from 'jwplayer/players/MobileArticleVideoPlayer/OffScreenOverlay/OffScreenOverlay';
import { MobileArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/MobileArticleVideoPlayer/Attribution';
import { singleTrack } from 'jwplayer/utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'jwplayer/utils/videoTimingEvents';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import { getDismissedFn } from 'jwplayer/utils/utils';
import { VideoPlaceholder } from 'jwplayer/players/shared/VideoPlaceholder/VideoPlaceholder';
import clsx from 'clsx';

import styles from './mobileArticleVideoPlayer.module.scss';

interface MobileArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	topPosition: string;
}

const MobileArticleVideoWrapper: React.FC<MobileArticleVideoWrapperProps> = ({
	isScrollPlayer,
	topPosition,
	children,
}) => (
	<div
		className={clsx(
			`mobile-article-video-wrapper`,
			isScrollPlayer
				? styles.mobileArticleVideoWrapperIsScrollPlayer
				: styles.mobileArticleVideoWrapperIsNotScrollPlayer,
		)}
		style={{
			...(isScrollPlayer && { top: topPosition }),
		}}
	>
		{children}
	</div>
);

export const MobileArticleVideoPlayerContent: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);
	const inputName = 'isDismissed';
	const relatedContainer = document.getElementById('featured-video__player_related') as HTMLDivElement | null;
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	const getDismissed = getDismissedFn(inputName);

	const getTopPosition = () => {
		if (isFullScreen) {
			return '0px';
		}

		if (hasPartnerSlot) {
			return '75px';
		}

		return '55px';
	};

	useEffect(() => {
		// mobileArticleVideoPlayerTracker.loaded();
	}, []);

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

		if (!adComplete && singleTrack('ad-mobile-video-player-impression')) {
			// mobileArticleVideoPlayerTracker.impression({ label: 'ad' }); // todo figure out label
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_AD);
			return;
		}

		if (singleTrack('mobile-video-player-impression')) {
			// mobileArticleVideoPlayerTracker.impression({ label: 'post-ad' }); // todo figure out label
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
			return;
		}
	}, [onScreen, adComplete]);

	return (
		<>
			<div ref={ref} className={clsx(styles.mobileArticleVideoTopPlaceholder, isScrollPlayer && `is-on-scroll-active`)}>
				<MobileArticleVideoWrapper isScrollPlayer={isScrollPlayer} topPosition={getTopPosition()}>
					{adComplete && (
						<>
							<JwPlayerWrapper
								getDismissed={getDismissed}
								config={getArticleVideoConfig(videoDetails)}
								onReady={(playerInstance) => {
									articlePlayerOnReady(videoDetails, playerInstance);
									setIsPlayerReady(true);
								}}
								stopAutoAdvanceOnExitViewport={false}
							/>
							<input type="hidden" value={String(dismissed)} name={inputName} />

							{isPlayerReady && <OffScreenOverlay isScrollPlayer={isScrollPlayer} dismiss={() => setDismissed(true)} />}
						</>
					)}
					{!isPlayerReady && <VideoPlaceholder isScrollPlayer={isScrollPlayer} />}
				</MobileArticleVideoWrapper>
			</div>
			<Attribution />
		</>
	);
};

export const MobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => (
	<PlayerWrapper playerName="jw-mobile-article-video">
		<MobileArticleVideoPlayerContent
			hasPartnerSlot={hasPartnerSlot}
			isFullScreen={isFullScreen}
			videoDetails={videoDetails}
		/>
	</PlayerWrapper>
);

export default MobileArticleVideoPlayer;
