import React from 'react';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import styled from 'styled-components';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';
import useAdImpression from 'jwplayer/utils/useAdImpression';

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
`;

const PrerollPlayerScrollOverlay: React.FC = () => {
	const adImpression = useAdImpression();

	return (
		<>
			<PlayStateContainer>
				<PlayStateWrapper iconColor={'#fff'} />
			</PlayStateContainer>
			<BottomControls>
				<VolumeStateWrapper iconColor={'#fff'} hasSlider={false} hasLabel={true} />
				<PlayerCTAButton
					isScrollPlayer={true}
					text={'Learn More'}
					onClick={() => {
						window.open(adImpression?.clickThroughUrl, '_blank').focus();
					}}
				/>
			</BottomControls>
		</>
	);
};

export default PrerollPlayerScrollOverlay;
