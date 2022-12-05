import React from 'react';
import styled from 'styled-components';
import TimeSlider from 'experimental/shared/TimeSlider';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/shared/FullOverlay/PlayerFullOverlayTopText';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';
import TimeRemaining from 'experimental/shared/TimeRemaining';

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 5px;
`;

const PlayVolumeWrapper = styled.div`
	display: flex;
	position: relative;
	left: -15px;
`;

const ContentOverlayTimeSlider = styled(TimeSlider)`
	align-items: center;
	height: 17px;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const TimeRemainingPadded = styled(TimeRemaining)`
	padding-left: 10px;
`;

const ContentPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const upperText = 'Now Playing';
	const lowerText = playlistItem?.title;

	return (
		<PlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<PlayStateWrapper iconColor={'#fff'} />
			<BottomWrapper>
				<ContentOverlayTimeSlider railHeight={'2px'} isMobile={true} />
				<ControlWrapper>
					<PlayVolumeWrapper>
						<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={false} />
						<TimeRemainingPadded />
					</PlayVolumeWrapper>
					<PlayerCTAButton
						text={'Watch More'}
						onClick={() => {
							window.open(`https://www.fandom.com/video/${playlistItem.mediaid}`, '_blank');
						}}
					/>
				</ControlWrapper>
			</BottomWrapper>
		</PlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
