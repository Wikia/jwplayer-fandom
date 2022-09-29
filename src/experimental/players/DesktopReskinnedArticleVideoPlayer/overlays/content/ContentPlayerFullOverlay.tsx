import React from 'react';
import styled from 'styled-components';
import TimeSlider from 'experimental/shared/TimeSlider';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import PlayerFullOverlayTopText from 'experimental/shared/FullOverlay/PlayerFullOverlayTopText';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const PlayVolumeWrapper = styled.div`
	display: flex;
`;

const ContentOverlayTimeSlider = styled(TimeSlider)`
	padding: 0 12px;
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
				<ContentOverlayTimeSlider />
				<ControlWrapper>
					<PlayVolumeWrapper>
						<PlayStateWrapper iconColor={'#fff'} />
						<VolumeStateWrapper iconColor={'#fff'} hasSlider={true} hasLabel={false} />
					</PlayVolumeWrapper>
				</ControlWrapper>
				<PlayerCTAButton
					text={'Watch More'}
					onClick={() => {
						console.log('watch more');
					}}
				/>
			</BottomWrapper>
		</PlayerFullOverlayWrapper>
	);
};

export default ContentPlayerFullOverlay;
