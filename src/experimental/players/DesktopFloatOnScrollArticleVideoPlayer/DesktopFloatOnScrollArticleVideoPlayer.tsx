import React, { useRef } from 'react';
import UnmuteButton from 'jwplayer/players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'jwplayer/players/shared/JwPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'jwplayer/utils/useAdComplete';
import PlayerWrapper from 'jwplayer/players/shared/PlayerWrapper';
import { DesktopArticleVideoPlayerProps } from 'jwplayer/types';
import Attribution from 'jwplayer/players/DesktopArticleVideoPlayer/Attribution';
import { getArticleVideoConfig } from 'jwplayer/utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'jwplayer/utils/articleVideo/articlePlayerOnReady';

import styles from './DesktopFloatOnScrollArticleVideoPlayer.module.css';

const DesktopFloatOnScrollArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ videoDetails }) => {
	const placeholderRef = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(placeholderRef, '0px', 0.5);
	const controlbar = document.querySelector<HTMLElement>('.jw-controlbar');
	const shareIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-settings-sharing');
	const moreVideosIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-related-btn');
	const pipIcon = document.querySelector<HTMLElement>('.jw-controlbar .jw-button-container .jw-icon-pip');
	const jwWrapper = document.querySelector<HTMLElement>('.jw-wrapper.jw-reset');
	const floatingWrapper = document.querySelector<HTMLElement>('.jw-float-bar.jw-reset');

	if (onScreen) {
		if (controlbar) controlbar.style.background = 'rgba(0, 0, 0, 0.5)';
		if (shareIcon) shareIcon.style.display = 'flex';
		if (moreVideosIcon) moreVideosIcon.style.display = 'flex';
		if (pipIcon) pipIcon.style.display = 'flex';
		// Floating player experiment only. Needed to prevent wiki toolbar from cover the close button. This reset the styles once the player is not 'floating'.
		if (jwWrapper) jwWrapper.style.marginBottom = '';
		if (floatingWrapper) floatingWrapper.style.flexDirection = '';
	} else {
		if (controlbar) controlbar.style.background = 'linear-gradient(0,#000,transparent)';
		if (shareIcon) shareIcon.style.display = 'none';
		if (moreVideosIcon) moreVideosIcon.style.display = 'none';
		if (pipIcon) pipIcon.style.display = 'none';
		// Floating player experiment only. Needed to prevent wiki toolbar from cover the close button. This applies the styles once the player is 'floating'.
		if (jwWrapper) jwWrapper.style.marginBottom = '27px';
		if (floatingWrapper) floatingWrapper.style.flexDirection = 'row-reverse';
	}

	return (
		<PlayerWrapper playerName="jw-desktop-article-video">
			<div className={styles.desktopArticleVideoTopPlaceholder} ref={placeholderRef}>
				{adComplete && (
					<div className={styles.desktopArticleVideoWrapper}>
						<div className={styles.topBar}>{!onScreen && <UnmuteButton />}</div>
						<JwPlayerWrapper
							playerUrl={'https://cdn.jwplayer.com/libraries/UKcdkcuf.js'}
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							stopAutoAdvanceOnExitViewport={false}
						/>
					</div>
				)}
			</div>
			<Attribution />
		</PlayerWrapper>
	);
};

export default DesktopFloatOnScrollArticleVideoPlayer;
