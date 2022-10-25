import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import styled from 'styled-components';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';

const PlayStateContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const PlayStateWrapperClickable = styled(PlayStateWrapper)`
	pointer-events: auto;
`;

const BottomControls = styled.div`
	display: flex;
	position: absolute;
	bottom: 0;
	width: 100%;
	justify-content: space-between;
	margin-bottom: 11px;
	pointer-events: auto;
`;

const PrerollPlayerScrollOverlay: React.FC = () => {
	return (
		<>
			<PlayStateContainer>
				<PlayStateWrapperClickable iconColor={'#fff'} isAd={true} />
			</PlayStateContainer>
			<BottomControls>
				<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={true} />
			</BottomControls>
		</>
	);
};

export default PrerollPlayerScrollOverlay;
