import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import UnmuteButton from 'players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import VideoDetails from 'players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import { Playlist } from 'types';
import CloseButton from 'players/shared/CloseButton';
import Attribution from 'players/DesktopArticleVideoPlayer/Attribution';

const DesktopArticleVideoTopPlaceholder = styled.div`
	background-color: black;
	width: 100%;
	height: 100%;
`;

interface DesktopArticleVideoWrapperProps {
	visibleOnScreen: boolean;
}

const DesktopArticleVideoWrapper = styled.div<DesktopArticleVideoWrapperProps>`
	${(props) =>
		!props.visibleOnScreen &&
		css`
			bottom: 18px;
			left: auto;
			position: fixed;
			right: 18px;
			top: auto;
			-webkit-transition: right 0.4s, bottom 0.4s, width 0.4s;
			transition: right 0.4s, bottom 0.4s, width 0.4s;
			width: 300px;
		`}
`;

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

interface DesktopArticleVideoPlayerProps {
	playlist: Playlist;
}

const DesktopArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ playlist }) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref);
	const [dismissed, setDismissed] = useState(false);

	return (
		<PlayerWrapper>
			<DesktopArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<DesktopArticleVideoWrapper visibleOnScreen={onScreen || dismissed}>
						<TopBar>
							{onScreen && <UnmuteButton />}
							{!(dismissed || onScreen) && <CloseButton dismiss={() => setDismissed(true)} />}
						</TopBar>
						<JwPlayerWrapper playlist={playlist} />
						{!onScreen && <VideoDetails />}
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
