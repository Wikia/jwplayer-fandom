import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import OffScreenOverlay from 'players/MobileArticleVideoPlayer/OffScreenOverlay/OffScreenOverlay';
import { Playlist } from 'types';
import Attribution from 'players/MobileArticleVideoPlayer/Attribution';

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
