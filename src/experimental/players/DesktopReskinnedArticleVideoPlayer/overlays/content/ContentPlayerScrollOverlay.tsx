import React from 'react';
import styled from 'styled-components';
import VideoDetails from 'jwplayer/players/DesktopArticleVideoPlayer/VideoDetails';
import CloseButton from 'jwplayer/players/shared/CloseButton';
import TimeSlider from 'experimental/shared/TimeSlider';
import ControlBarWrapper, {
	ControlBarButtonWrapper,
	ControlBarLeftAlignedButtonContainer,
	ControlBarRightAlignedButtonContainer,
} from 'experimental/shared/ControlBar';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';

const TopBar = styled.div`
	width: 100%;
	position: relative;
`;

const PlayerOverlayStyled = styled(PlayerOverlay)`
	padding: 1em 1.6em;
`;

const ContentOverlayTimeSlider = styled(TimeSlider)`
	padding: 0 12px;
	align-items: center;
	height: 17px;
`;

const ContentPlayerScrollOverlay: React.FC = () => {
	return (
		<PlayerOverlayStyled>
			<TopBar>
				<CloseButton
					dismiss={() => {
						console.log('dismissed');
					}}
				/>
			</TopBar>
			<ControlBarWrapper id={'control-bar-wrapper'}>
				<ContentOverlayTimeSlider />
				<ControlBarButtonWrapper>
					<ControlBarLeftAlignedButtonContainer>
						<PlayStateWrapper />
					</ControlBarLeftAlignedButtonContainer>
					<ControlBarLeftAlignedButtonContainer>1</ControlBarLeftAlignedButtonContainer>
					<ControlBarRightAlignedButtonContainer>2</ControlBarRightAlignedButtonContainer>
				</ControlBarButtonWrapper>
			</ControlBarWrapper>
			<VideoDetails />
		</PlayerOverlayStyled>
	);
};

export default ContentPlayerScrollOverlay;
