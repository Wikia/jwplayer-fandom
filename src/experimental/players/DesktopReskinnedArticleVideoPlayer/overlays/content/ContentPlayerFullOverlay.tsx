import React from 'react';
import styled from 'styled-components';
import TimeSlider from 'experimental/shared/TimeSlider';
import ControlBarWrapper, {
	ControlBarButtonWrapper,
	ControlBarLeftAlignedButtonContainer,
	ControlBarRightAlignedButtonContainer,
} from 'experimental/shared/ControlBar';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import PlayerOverlay from 'experimental/shared/PlayerOverlay';

const PlayerOverlayStyled = styled(PlayerOverlay)`
	padding: 1em 1.6em;
`;

const ContentOverlayTimeSlider = styled(TimeSlider)`
	padding: 0 12px;
	align-items: center;
	height: 17px;
`;

const ContentPlayerFullOverlay: React.FC = () => {
	return (
		<PlayerOverlayStyled>
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
		</PlayerOverlayStyled>
	);
};

export default ContentPlayerFullOverlay;
