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
`;

const ContentOverlayTimeSlider = styled(TimeSlider)`
	align-items: center;
	height: 17px;
`;

const BottomWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const ContentPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const upperText = 'Now Playing';
	const lowerText = playlistItem?.title;

	return (
		<PlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<BottomWrapper>
				<ContentOverlayTimeSlider railHeight={'2px'} />
				<ControlWrapper>
					<PlayVolumeWrapper>
						<PlayStateWrapper iconColor={'#fff'} />
						<VolumeStateWrapper iconColor={'#fff'} isScrollPlayer={false} hasLabel={false} />
						<TimeRemaining />
					</PlayVolumeWrapper>
					<PlayerCTAButton
						text={'Watch More'}
						onClick={() => {
							console.log('watch more');
						}}
					/>
				</ControlWrapper>
			</BottomWrapper>
		</PlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
