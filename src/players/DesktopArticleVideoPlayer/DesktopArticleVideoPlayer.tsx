import React, { useRef, useState } from 'react';
import WDSVariables from '@fandom-frontend/design-system/dist/variables.json';
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
	z-index: 2;
`;

interface DesktopArticleVideoWrapperProps {
	isScrollPlayer: boolean;
}

const DesktopArticleVideoWrapper = styled.div<DesktopArticleVideoWrapperProps>`
	${(props) =>
		props.isScrollPlayer
			? css`
					left: auto;
					top: auto;
					bottom: 18px;
					right: 18px;
					width: 300px;
					z-index: ${Number(WDSVariables.z2) + 2};
					position: fixed;
					-webkit-transition: right 0.4s, bottom 0.4s, width 0.4s;
					transition: right 0.4s, bottom 0.4s, width 0.4s;
			  `
			: css`
					position: absolute;
					width: 100%;
					bottom: 0;
					right: 0;
					top: 0;
					left: 0;
					transform: translateZ(0);
					-webkit-transform: translateZ(0);
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
	const isScrollPlayer = !(dismissed || onScreen);

	return (
		<PlayerWrapper playerName="desktop-article-video">
			<DesktopArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<DesktopArticleVideoWrapper isScrollPlayer={isScrollPlayer}>
						<TopBar>
							{!isScrollPlayer && <UnmuteButton />}
							{isScrollPlayer && <CloseButton dismiss={() => setDismissed(true)} />}
						</TopBar>
						<JwPlayerWrapper playlist={playlist} />
						{isScrollPlayer && <VideoDetails />}
					</DesktopArticleVideoWrapper>
				)}
			</DesktopArticleVideoTopPlaceholder>
			<Attribution />
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
