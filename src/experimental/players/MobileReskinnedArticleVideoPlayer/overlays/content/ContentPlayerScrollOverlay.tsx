import React from 'react';
import styled from 'styled-components';
import OverlayTimeSliderBottom from 'experimental/shared/OverlayTimeSliderBottom';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import { MobileContentPlayerOverlay } from 'experimental/types';

const ScrollOverlayWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
`;

const PlayPauseWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const PlayStateWrapperStyled = styled(PlayStateWrapper)``;

const VolumeStateWrapperStyled = styled(VolumeStateWrapper)``;

const ContentPlayerScrollOverlay: React.FC<MobileContentPlayerOverlay> = ({ resetOverlayTimeout }) => {
	const playPauseCallback = { onClickCallback: resetOverlayTimeout };

	return (
		<ScrollOverlayWrapper>
			<PlayPauseWrapper>
				<PlayStateWrapperStyled playConfig={playPauseCallback} pauseConfig={playPauseCallback} iconColor={'#fff'} />
				<VolumeStateWrapperStyled
					iconColor={'#fff'}
					hasSlider={false}
					hasLabel={false}
					callback={resetOverlayTimeout}
				/>
			</PlayPauseWrapper>
			<OverlayTimeSliderBottom canSeek={false} />
		</ScrollOverlayWrapper>
	);
};

export default ContentPlayerScrollOverlay;
