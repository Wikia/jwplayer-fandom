import React, { useEffect, useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css } from 'styled-components';
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

const MobileArticleVideoTopPlaceholder = styled.div`
	width: 100%;
	height: 56.25vw;
	position: relative;
`;

interface MobileArticleVideoWrapperProps {
	isScrollPlayer: boolean;
	topPosition: string;
}

const MobileArticleVideoWrapper = styled.div<MobileArticleVideoWrapperProps>`
	${(props) =>
		props.isScrollPlayer
			? css`
					box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
					position: fixed;
					top: ${props.topPosition};
					width: 100%;
					z-index: ${Number(WDSVariables.z2) + 1};
			  `
			: css`
					transform: translateZ(0);
					-webkit-transform: translateZ(0);
					-webkit-transition: padding 0.3s;
					transition: padding 0.3s;
					padding: 0;
			  `}
`;

const MobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	hasPartnerSlot,
	isFullScreen,
	videoDetails,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref, '0px', 1);
	const [dismissed, setDismissed] = useState(false);
	const isScrollPlayer = !(dismissed || onScreen);

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
			return;
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
		<PlayerWrapper playerName="jw-mobile-article-video">
			<MobileArticleVideoTopPlaceholder className={isScrollPlayer ? ' is-on-scroll-active ' : ''} ref={ref}>
				{adComplete && (
					<MobileArticleVideoWrapper
						className={'mobile-article-video-wrapper'}
						isScrollPlayer={isScrollPlayer}
						topPosition={getTopPosition()}
					>
						<JwPlayerWrapper
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
							playerUrl={'https://cdn.jwplayer.com/libraries/ZqDOepgu.js'}
						/>
						<OffScreenOverlay isScrollPlayer={isScrollPlayer} dismiss={() => setDismissed(true)} />
					</MobileArticleVideoWrapper>
				)}
			</MobileArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default MobileArticleVideoPlayer;
