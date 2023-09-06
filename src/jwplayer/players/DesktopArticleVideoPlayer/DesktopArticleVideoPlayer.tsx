import React, { useRef } from 'react';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';
import { getDismissedFn } from 'jwplayer/utils/utils';

import styles from './DesktopArticleVideoPlayer.module.css';

export const DesktopArticleVideoPlayerContent: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');
	const inputName = 'isDismissed';

	const getDismissed = getDismissedFn(inputName);

	if (controlbar) controlbar.style.background = 'rgba(0, 0, 0, 0.5)';
	if (shareIcon) shareIcon.style.display = 'flex';
	if (moreVideosIcon) moreVideosIcon.style.display = 'flex';
	if (pipIcon) pipIcon.style.display = 'flex';

	return (
		<>
			<div className={styles.desktopArticleVideoTopPlaceholder} ref={placeholderRef}>
				{adComplete && (
					<div className={styles.desktopArticleVideoWrapper}>
						<div className={styles.topBar}>
							<UnmuteButton />
						</div>
						<JwPlayerWrapper
							getDismissed={getDismissed}
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							stopAutoAdvanceOnExitViewport={false}
						/>
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
