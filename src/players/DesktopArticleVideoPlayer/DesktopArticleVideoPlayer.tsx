import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import UnmuteButton from 'players/DesktopArticleVideoPlayer/UnmuteButton';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import VideoDetails from 'players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';
import { PlaylistItem } from 'types';

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

interface TopBarProps {
	visible: boolean;
}

const TopBar = styled.div<TopBarProps>`
	width: 100%;
	position: relative;
	display: ${(props) => (props.visible ? 'block' : 'none')};
`;

interface DesktopArticleVideoPlayerProps {
	playlist: string | PlaylistItem[];
}

const DesktopArticleVideoPlayer: React.FC<DesktopArticleVideoPlayerProps> = ({ playlist }) => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref);

	return (
		<PlayerWrapper>
			<DesktopArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<DesktopArticleVideoWrapper visibleOnScreen={onScreen}>
						<TopBar visible={onScreen}>
							<UnmuteButton />
						</TopBar>
						<JwPlayerWrapper playlist={playlist} />
						{!onScreen && <VideoDetails />}
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
