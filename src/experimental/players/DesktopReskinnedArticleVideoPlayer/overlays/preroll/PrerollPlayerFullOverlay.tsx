import React from 'react';
import styled from 'styled-components';
import PlayStateWrapper from 'experimental/shared/play-state/PlayStateWrapper';
import usePlaylistItem from 'jwplayer/utils/usePlaylistItem';
import VolumeStateWrapper from 'experimental/shared/volume-state/VolumeStateWrapper';
import useAdTime from 'jwplayer/utils/useAdTime';
import PlayerCTAButton from 'experimental/shared/PlayerCTAButton';
import PlayerFullOverlayTopText from 'experimental/shared/FullOverlay/PlayerFullOverlayTopText';
import { PlayerFullOverlayWrapper } from 'experimental/shared/FullOverlay/PlayerFullOverlayWrapper';
import useAdImpression from 'jwplayer/utils/useAdImpression';

const ControlWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const PlayVolumeWrapper = styled.div`
	display: flex;
	pointer-events: auto;
`;

const PrerollPlayerFullOverlay: React.FC = () => {
	const playlistItem = usePlaylistItem();
	const adTime = useAdTime();
	const adImpression = useAdImpression();
	const upperText = `Up next in ${Math.trunc(adTime?.duration - adTime?.position)} seconds`;
	const lowerText = playlistItem?.title;

	return (
		<PlayerFullOverlayWrapper>
			<PlayerFullOverlayTopText upperText={upperText} lowerText={lowerText} />
			<ControlWrapper>
				<PlayVolumeWrapper>
					<PlayStateWrapper iconColor={'#fff'} isAd={true} />
					<VolumeStateWrapper iconColor={'#fff'} sliderColor={'#FFC500'} hasSlider={true} hasLabel={false} />
				</PlayVolumeWrapper>
				<PlayerCTAButton
					text={'Learn More'}
					onClick={() => {
						window.open(adImpression?.clickThroughUrl, '_blank').focus();
					}}
				/>
			</ControlWrapper>
		</PlayerFullOverlayWrapper>
	);
};

export default PrerollPlayerFullOverlay;
