import React, { useRef, useContext } from 'react';
import styled, { css } from 'styled-components';
import UnmuteButton from 'src/players/DesktopArticleVideoPlayer/UnmuteButton';
import UserFeedback from 'src/players/DesktopArticleVideoPlayer/UserFeedback/UserFeedback';
import JwPlayerWrapper from 'src/players/shared/JwPlayerWrapper';
import VideoDetails from 'src/players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'src/utils/useOnScreen';
import PlayerWrapper from '../shared/PlayerWrapper';
import { PlayerContext } from 'src/players/shared/PlayerContext';

const DesktopArticleVideoTopPlaceholder = styled.div`
	height: 500px;
	width: 500px;
	background-color: black;
`;

const UserActionTopBar = styled.div`
	padding: 5px 8px;
	position: absolute;
	top: 6px;
	z-index: 2;
	display: flex;
	justify-content: space-between;
	width: 100%;
`;

interface Props {
	onScreen: boolean;
}

const DesktopArticleVideoWrapper = styled.div<Props>`
	${(props) =>
		!props.onScreen &&
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

const DesktopArticleVideoPlayer = () => {
	const ref = useRef<HTMLDivElement>(null);
	const onScreen = useOnScreen(ref);

	return (
		<PlayerWrapper>
			<DesktopArticleVideoTopPlaceholder ref={ref}>
				<DesktopArticleVideoWrapper onScreen={onScreen}>
					<UserActionTopBar>
						{onScreen ? (
							<>
								{/* Default muted, once unmuted do not show again */}
								<UnmuteButton />
								<UserFeedback />
							</>
						) : (
							// TODO: close icon on right
							<div></div>
						)}
					</UserActionTopBar>
					<JwPlayerWrapper />
					{!onScreen && <VideoDetails />}
				</DesktopArticleVideoWrapper>
			</DesktopArticleVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
