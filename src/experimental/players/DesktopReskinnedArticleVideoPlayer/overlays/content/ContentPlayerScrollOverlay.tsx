import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import styled from 'styled-components';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';

const PlayStateContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const BottomControls = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 11px;
`;

const ContentPlayerScrollOverlay: React.FC = () => {
	return (
		<>
			<PlayStateContainer>
				<PlayStateWrapper iconColor={'#fff'} />
			</PlayStateContainer>
			<BottomControls>
				<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={true} />
				<PlayerCTAButton
					isScrollPlayer={true}
					text={'Watch More'}
					onClick={() => {
						console.log('watch more');
					}}
				/>
			</BottomControls>
			<OverlayTimeSliderBottom />
		</>
	);
};

export default ContentPlayerScrollOverlay;
