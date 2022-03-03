import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import UnmuteButton from 'players/DesktopArticleVideoPlayer/UnmuteButton';
import UserFeedback from 'players/DesktopArticleVideoPlayer/UserFeedback/UserFeedback';
import JwPlayerWrapper from 'players/shared/JwPlayerWrapper';
import VideoDetails from 'players/DesktopArticleVideoPlayer/VideoDetails';
import useOnScreen from 'utils/useOnScreen';
import useAdComplete from 'utils/useAdComplete';
import PlayerWrapper from 'players/shared/PlayerWrapper';

const DesktopArticleVideoTopPlaceholder = styled.div`
	background-color: black;
	width: 100%;
	height: 100%;
`;

const UserActionTopBar = styled.div`
	padding: 5px 8px;
	position: absolute;
	top: 6px;
	z-index: 2;
	width: 100%;
`;

interface Props {
	visibleOnScreen: boolean;
}

const DesktopArticleVideoWrapper = styled.div<Props>`
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

const DesktopArticleVideoPlayer: React.FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const adComplete = useAdComplete();
	const onScreen = useOnScreen(ref);

	return (
		<PlayerWrapper>
			<DesktopArticleVideoTopPlaceholder ref={ref}>
				{adComplete && (
					<DesktopArticleVideoWrapper visibleOnScreen={onScreen}>
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
				)}
			</DesktopArticleVideoTopPlaceholder>
		</PlayerWrapper>
	);
};

export default DesktopArticleVideoPlayer;
