import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import OffScreenOverlay from 'players/MobileArticleVideoPlayer/OffScreenOverlay/OffScreenOverlay';
import { Playlist } from 'types';
import Attribution from 'players/MobileArticleVideoPlayer/Attribution';
import { shouldTriggerImpression, mobileArticleVideoPlayerTracker } from 'utils/videoTracking';
import { recordVideoEvent, VIDEO_RECORD_EVENTS } from 'utils/videoTimingEvents';

const MobileArticleVideoTopPlaceholder = styled.div`
	background-color: black;
	width: 100%;
	height: 100%;
`;

interface MobileArticleVideoWrapperProps {
	visibleOnScreen: boolean;
	topPosition: string;
}

const MobileArticleVideoWrapper = styled.div<MobileArticleVideoWrapperProps>`
	${(props) =>
		!props.visibleOnScreen &&
		`
			box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
			position: fixed;
			top: ${props.topPosition};
			width: 100%;
		`}
`;

interface MobileArticleVideoPlayerProps {
	playlist: Playlist;
	hasPartnerSlot?: boolean;
	isFullScreen?: boolean;
}

const MobileArticleVideoPlayer: React.FC<MobileArticleVideoPlayerProps> = ({
	playlist,
	hasPartnerSlot,
	isFullScreen,
}) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref);
	const [dismissed, setDismissed] = useState(false);
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
		mobileArticleVideoPlayerTracker.loaded();
	}, []);

	useEffect(() => {
		if (!onScreen) {
			return;
		}

		if (!adComplete && shouldTriggerImpression('ad-mobile-video-player-impression')) {
			mobileArticleVideoPlayerTracker.impression({ label: 'ad' }); // todo figure out label
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_AD);
			return;
		}

		if (shouldTriggerImpression('mobile-video-player-impression')) {
			mobileArticleVideoPlayerTracker.impression({ label: 'post-ad' }); // todo figure out label
			recordVideoEvent(VIDEO_RECORD_EVENTS.JW_PLAYER_PLAYING_VIDEO);
			return;
		}
	}, [onScreen, adComplete]);

	return (
		<PlayerWrapper>
			<MobileArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<MobileArticleVideoWrapper visibleOnScreen={onScreen || dismissed} topPosition={getTopPosition()}>
						<JwPlayerWrapper playlist={playlist} />
						{!onScreen && !dismissed && <OffScreenOverlay dismiss={() => setDismissed(true)} />}
					</MobileArticleVideoWrapper>
				)}
			</MobileArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default MobileArticleVideoPlayer;
