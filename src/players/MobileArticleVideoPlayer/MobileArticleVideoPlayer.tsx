import React, { useEffect, useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
import styled, { css } from 'styled-components';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import OffScreenOverlay from 'players/MobileArticleVideoPlayer/OffScreenOverlay/OffScreenOverlay';
import { ArticleVideoDetails, CanPlayVideo } from 'types';
import Attribution from 'players/MobileArticleVideoPlayer/Attribution';
import { singleTrack } from 'utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';
import { getArticleVideoConfig } from 'utils/articleVideo/articleVideoConfig';
import articlePlayerOnReady from 'utils/articleVideo/articlePlayerOnReady';

interface WindowDesktopArticlePlayer extends Window {
	canPlayVideo?: CanPlayVideo;
}

declare let window: WindowDesktopArticlePlayer;

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

interface MobileArticleVideoPlayerProps {
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
	videoDetails: ArticleVideoDetails;
}

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

	if (!window.canPlayVideo()) return null;

	return (
		<PlayerWrapper playerName="mobile-article-video">
			<MobileArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<MobileArticleVideoWrapper isScrollPlayer={isScrollPlayer} topPosition={getTopPosition()}>
						<JwPlayerWrapper
							config={getArticleVideoConfig(videoDetails)}
							onReady={(playerInstance) => articlePlayerOnReady(videoDetails, playerInstance)}
						/>
						{isScrollPlayer && <OffScreenOverlay dismiss={() => setDismissed(true)} />}
					</MobileArticleVideoWrapper>
				)}
			</MobileArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default MobileArticleVideoPlayer;
