import React, { useEffect, useRef, useState } from 'react';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useRvAdComplete from 'jwplayer/utils/useRvAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { RedVentureVideoPlayerProps } from 'jwplayer/types';
import CloseButton from 'jwplayer/players/shared/CloseButton/CloseButton';
import redVenturePlayerOnReady from 'jwplayer/players/RedVentureVideoPlayer/redVenturePlayerOnReady';
import { getRedVentureVideoConfig } from 'jwplayer/players/RedVentureVideoPlayer/getRedVentureVideoConfig';
import { disableTimingEventsSamplingRate } from 'jwplayer/utils/videoTimingEvents';

import clsx from 'clsx';

import styles from './redVentureVideoPlayer.module.scss';

interface RedVentureVideoWrapperProps extends RedVentureVideoPlayerProps {
	right?: number;
	width?: number;
}

const RedVentureVideoWrapper: React.FC<RedVentureVideoWrapperProps> = ({
	showScrollPlayer,
	videoDetails,
	jwPlayerContainerEmbedId,
	autoPlay,
	playerUrl,
	hasAds = true,
}) => {
	const placeholderRef = useRef<HTMLDivElement>(null);

	const adComplete = useRvAdComplete(hasAds);
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = showScrollPlayer ? !(dismissed || onScreen) : false;
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');

	useEffect(() => {
		// Remove this once the browser-tracking-metrics library (tracking-metrics package) is fixed,
		// and the proper App value is sourced.
		disableTimingEventsSamplingRate();
	}, []);

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
		<div className={styles.redVentureVideoTopPlaceholder} ref={placeholderRef}>
			<div
				className={clsx(
					isScrollPlayer ? styles.redVentureVideoWrapperIsScrollPlayer : styles.redVentureVideoWrapperIsNotScrollPlayer,
				)}
			>
				{adComplete && (
					<div>
						<div className={styles.topBar}>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && <CloseButton dismiss={() => setDismissed(true)} />}
						</div>
						<JwPlayerWrapper
							config={getRedVentureVideoConfig(videoDetails, autoPlay)}
							onReady={(playerInstance) => redVenturePlayerOnReady(videoDetails, playerInstance)}
							shouldLoadSponsoredContentList={true}
							jwPlayerContainerEmbedId={jwPlayerContainerEmbedId}
							playerUrl={playerUrl}
						/>
						{isScrollPlayer && <VideoDetails />}
					</div>
				)}
			</div>
		</div>
	);
};

const RedVentureVideoPlayer: React.FC<RedVentureVideoPlayerProps> = ({
	videoDetails,
	showScrollPlayer,
	jwPlayerContainerEmbedId,
	playerUrl,
	autoPlay,
	hasAds,
}) => {
	return (
		<PlayerWrapper playerName="jw-red-venture-video">
			<RedVentureVideoWrapper
				videoDetails={videoDetails}
				showScrollPlayer={showScrollPlayer}
				jwPlayerContainerEmbedId={jwPlayerContainerEmbedId}
				playerUrl={playerUrl}
				autoPlay={autoPlay}
				hasAds={hasAds}
			/>
		</PlayerWrapper>
	);
};

export default RedVentureVideoPlayer;
