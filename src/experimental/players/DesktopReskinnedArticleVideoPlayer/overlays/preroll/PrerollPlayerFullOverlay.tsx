import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
// import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';

const PrerollPlayerFullOverlayWrapper = styled.div`
	padding: 20px;
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	box-sizing: border-box;
`;

const TopWrapper = styled.div``;

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
`;
const PrerollPlayerFullOverlay: React.FC = () => {
	return (
		<PrerollPlayerFullOverlayWrapper>
			<TopWrapper>TOP TEXT</TopWrapper>
			<ControlWrapper>
				<PlayStateWrapper iconColor={'#fff'} />
				{/* <VolumeStateWrapper /> */}
			</ControlWrapper>
		</PrerollPlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
